use std::borrow::ToOwned;
use std::error::Error;
use std::fmt;
use std::io;

use xml;
use xml::reader::XmlEvent as x;

use schema;

pub use xml::attribute::OwnedAttribute as XmlAttribute;
pub use xml::name::OwnedName as XmlName;
pub use xml::namespace::Namespace as XmlNamespace;
pub use self::events::NestedEvent;

#[derive(Debug)]
pub enum DecodeError {
    XmlError(xml::reader::Error),
    UnexpectedEvent { event: xml::reader::XmlEvent, depth: usize },
    NoResult,
    AttributeNotFound(String),
    SchemaError(schema::SchemaError),
}

impl fmt::Display for DecodeError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        try!(write!(f, "{}", self.description()));
        match *self {
            DecodeError::UnexpectedEvent { ref event, .. } => {
                try!(write!(f, ": {:?}", event));
            },
            DecodeError::AttributeNotFound(ref attr) => {
                try!(write!(f, ": {}", attr));
            }
            _ => { }
        }
        if let Some(cause) = self.cause() {
            try!(write!(f, " caused by `{}`", cause));
        }
        Ok(())
    }
}

impl Error for DecodeError {
    fn description(&self) -> &str {
        match *self {
            DecodeError::XmlError(..) => "XML parsing error",
            DecodeError::UnexpectedEvent { .. } => "Met an unexpected event",
            DecodeError::NoResult => "No result",
            DecodeError::AttributeNotFound(..) => "Attribute not found",
            DecodeError::SchemaError(..) => "Schema error",
        }
    }
}

pub type DecodeResult<T> = Result<T, DecodeError>;


impl From<schema::SchemaError> for DecodeError {
    fn from(e: schema::SchemaError) -> DecodeError {
        DecodeError::SchemaError(e)
    }
}

impl From<xml::reader::Error> for DecodeError {
    fn from(e: xml::reader::Error) -> DecodeError {
        DecodeError::XmlError(e)
    }
}


pub struct XmlElement<'a, B: io::Read + 'a> {
    pub attributes: Vec<XmlAttribute>,
    pub namespace: XmlNamespace,
    pub children: NestedEventReader<'a, B>,
}

impl<'a, B: io::BufRead + 'a> XmlElement<'a, B> {
    pub fn get_attr(&self, key: &str) -> DecodeResult<&str> {
        let find_result = self.attributes.iter()
            .find(|&attr| attr.name.local_name == key);
        match find_result {
            Some(e) => Ok(&e.value),
            None => Err(DecodeError::AttributeNotFound(key.to_owned()))
        }
    }

    pub fn read_whole_text(mut self) -> DecodeResult<String> {
        let mut text = String::new();
        loop {
            let c = if let Some(c) = self.children.next() {
                c
            } else {
                break;
            };
            if let NestedEvent::Characters(s) = try!(c) {
                text.push_str(&s);
            }
        }
        Ok(text)
    }
}

impl<'a, 'b, A, B> PartialEq<XmlElement<'b, B>> for XmlElement<'a, A>
    where A: io::Read + 'a, B: io::Read + 'b
{
    fn eq(&self, other: &XmlElement<'b, B>) -> bool {
        self.attributes == other.attributes &&
            self.namespace == other.namespace
    }
}

impl<'a, B: io::Read + 'a> fmt::Debug for XmlElement<'a, B> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        try!(write!(f, "Element("));
        let ns = &self.namespace.0;
        if !ns.is_empty() {
            try!(write!(f, "["));
            let mut first = true;
            for (key, value) in ns.iter() {
                if first { first = false } else { try!(write!(f, ", ")) }
                try!(write!(f, "{:?}=\"{:?}\"", key, value));
            }
            try!(write!(f, "]"));
        }
        if !self.attributes.is_empty() {
            try!(write!(f, ", "));
            let mut first = true;
            for attr in self.attributes.iter() {
                if first { first = false } else { try!(write!(f, ", ")) }
                try!(write!(f, "{:?}=\"{:?}\"", attr.name, attr.value));
            }
        }
        write!(f, ")")
    }
}

pub struct NestedEventReader<'a, B: io::Read + 'a> {
    reader: &'a mut xml::EventReader<B>,
    finished: bool,
}

impl<'a, B: io::Read> NestedEventReader<'a, B> {
    pub fn new(reader: &'a mut xml::EventReader<B>) -> NestedEventReader<'a, B> {
        NestedEventReader { reader: reader, finished: false }
    }

    #[inline]
    pub fn next(&mut self) -> Option<DecodeResult<events::NestedEvent<B>>> {
        if self.finished {
            None
        } else {
            use self::NestedEvent as n;
            let ev = match self.reader.next() {
                Ok(ev) => ev,
                Err(e) => {
                    self.finished = true;
                    return Some(Err(From::from(e)));
                }
            };
            let ev = match ev {
                x::StartDocument { version, encoding, standalone } =>
                n::StartDocument { version: version,
                                   encoding: encoding,
                                   standalone: standalone },

                x::EndDocument => {
                    self.finished = true;
                    n::EndDocument
                }

                x::ProcessingInstruction { name, data } =>
                n::ProcessingInstruction { name: name, data: data },

                x::StartElement { name, attributes, namespace } => {
                    n::Nested {
                        name: name,
                        element: XmlElement {
                            attributes: attributes,
                            namespace: namespace,
                            children: NestedEventReader::new(self.reader)
                        }
                    }
                }

                x::EndElement { .. } => {
                    self.finished = true;
                    return None;
                }

                x::CData(c) => n::CData(c),
                x::Comment(c) => n::Comment(c),
                x::Characters(c) => n::Characters(c),
                x::Whitespace(c) => n::Whitespace(c),
            };
            Some(Ok(ev))
        }
    }
}

impl<'a, B: io::Read + 'a> Drop for NestedEventReader<'a, B> {
    #[allow(unused_assignments)]
    #[inline]
    fn drop(&mut self) {
        if self.finished {
            return;
        }
        // drain all remained events
        loop {
            let mut depth = 0;
            match self.reader.next() {
                Err(_) => break,
                Ok(x::EndDocument) => break,
                Ok(x::EndElement { .. }) if depth <= 0 => break,
                Ok(x::EndElement { .. }) => { depth -= 1; }
                Ok(x::StartElement { .. }) => { depth += 1; }
                _ => { }
            }
        }
    }
}

mod events {
    use std::fmt;
    use std::io;

    use xml::common::XmlVersion;
    use xml::reader::XmlEvent as x;
    use self::NestedEvent as n;

    use super::{XmlElement, XmlName};

    #[derive(PartialEq)]
    pub enum NestedEvent<'a, B: io::Read + 'a> {
        StartDocument {
            version: XmlVersion,
            encoding: String,
            standalone: Option<bool>
        },
        EndDocument,
        ProcessingInstruction { 
            name: String, 
            data: Option<String> 
        },
        Nested {
            name: XmlName,
            element: XmlElement<'a, B>
        },
        CData(String),
        Comment(String),
        Characters(String),
        Whitespace(String),
    }

    impl<'a, B: io::Read> PartialEq<x> for NestedEvent<'a, B> {
        fn eq(&self, other: &x) -> bool {
            match (self, other) {
                (&n::StartDocument { version: ref v1,
                                     encoding: ref e1,
                                     standalone: ref s1 },
                 &x::StartDocument { version: ref v2,
                                     encoding: ref e2,
                                     standalone: ref s2 }) => {
                    v1 == v2 && e1 == e2 && s1 == s2
                }
                (&n::EndDocument, &x::EndDocument) => { true }
                (&n::ProcessingInstruction { name: ref n1, data: ref d1 },
                 &x::ProcessingInstruction { name: ref n2, data: ref d2 }) => {
                    n1 == n2 && d1 == d2
                }
                (&n::Nested { name: ref n1,
                              element: XmlElement { attributes: ref a1,
                                                    namespace: ref ns1, .. } },
                 &x::StartElement { name: ref n2,
                                    attributes: ref a2,
                                    namespace: ref ns2 }) => {
                    n1 == n2 && a1 == a2 && ns1 == ns2
                }
                (&n::CData(ref c1),      &x::CData(ref c2)     ) => { c1 == c2 }
                (&n::Comment(ref c1),    &x::Comment(ref c2)   ) => { c1 == c2 }
                (&n::Characters(ref c1), &x::Characters(ref c2)) => { c1 == c2 }
                (&n::Whitespace(ref c1), &x::Whitespace(ref c2)) => { c1 == c2 }
                (_, _) => { false }
            }
        }
    }

    impl<'a, B: io::Read> PartialEq<NestedEvent<'a, B>> for x {
        fn eq(&self, other: &NestedEvent<'a, B>) -> bool { other == self }
    }

    impl<'a, B: io::Read> fmt::Debug for NestedEvent<'a, B> {
        fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
            match *self {
                n::StartDocument { ref version, ref encoding, ref standalone } =>
                    write!(f, "StartDocument({}, {:?}, {:?})",
                           version, *encoding, *standalone),
                n::EndDocument =>
                    write!(f, "EndDocument"),
                n::ProcessingInstruction { ref name, ref data } => {
                    try!(write!(f, "ProcessingInstruction({:?}", *name));
                    if let Some(ref data) = *data {
                        try!(write!(f, ", {:?}", data));
                    }
                    write!(f, ")")
                }
                n::Nested { ref name, ref element } =>
                    write!(f, "Nested({:?}, {:?})", name, element),
                n::Comment(ref data) =>
                    write!(f, "Comment({:?})", data),
                n::CData(ref data) =>
                    write!(f, "CData({:?})", data),
                n::Characters(ref data) =>
                    write!(f, "Characters({:?})", data),
                n::Whitespace(ref data) =>
                    write!(f, "Whitespace({:?})", data),
            }
        }
    }
}
