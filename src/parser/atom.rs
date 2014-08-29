use std::collections::hashmap::HashMap;

use xml;
use xml::common::{Name, Attribute};
use xml::namespace::Namespace;
use xml::reader::events::{StartElement};

use super::base::{Element, ParserBuilder, ParserBase};
use feed;

static ATOM_XMLNS_SET: [&'static str, ..2] = [
    "http://www.w3.org/2005/Atom",
    "http://purl.org/atom/ns#",
];

static XML_XMLNS: &'static str = "http://www.w3.org/XML/1998/namespace";

pub struct CrawlerHint;

#[deriving(Clone)]
struct AtomSession {
    xml_base: String,
    element_ns: String,
}

fn get_xml_base<'a>(attributes: &'a [Attribute]) -> Option<&'a str> {
    attributes.iter().find(|&attr| {
        attr.name.namespace_ref().map_or(false, |ns| ns == XML_XMLNS)
    }).map(|attr| attr.value.as_slice())
}

type ChildMap = HashMap<String, Vec<feed::ElementValue>>;

fn parse_feed(_element: &Element, _children: ChildMap, _session: AtomSession) -> feed::ElementValue {
    feed::Elem(feed::Element::new("feed".to_string()))
}

fn reset_xml_base(element: &Element, session: &mut AtomSession) {
    for new_base in get_xml_base(element.attributes.as_slice()).move_iter() {
        session.xml_base = new_base.into_string();
    }
}

fn parse_icon(element: &Element, _children: ChildMap, session: AtomSession) -> feed::ElementValue {
    feed::Str(session.xml_base.append(element.text.as_slice()))
}

fn parse_text_construct(element: &Element, _children: ChildMap, _session: AtomSession) -> feed::ElementValue {
    let mut text = feed::Element::new("text".to_string());
    let text_type = element.attributes.iter().find(|&attr| attr.name.local_name.as_slice() == "type");
    let text_type = match text_type.map(|e| e.value.as_slice()) {
        Some("text/plaln") => "text",
        Some("text/html") => "html",
        _ => "text",
    };
    if ["text", "html"].contains(&text_type) {
        text.fields.insert("value".to_string(), feed::Str(element.text.clone()));
    } else if text_type == "xhtml" {
        text.fields.insert("value".to_string(), feed::Str("".to_string()));  // TODO
    }
    text.fields.insert("type".to_string(), feed::Str(text_type.to_string()));
    feed::Elem(text)
}

fn parse_person_construct(_element: &Element, mut children: ChildMap, session: AtomSession) -> feed::ElementValue {
    let mut person = feed::Element::new("person".to_string());
    let person_name = children.pop(&"name".to_string()).and_then(|mut e| e.remove(0));
    let person_uri = children.pop(&"uri".to_string()).and_then(|mut e| e.remove(0));
    let person_email = children.pop(&"email".to_string()).and_then(|mut e| e.remove(0));
    let person_name = match (person_name, &person_email, &person_uri) {
        (Some(name), _,                _             ) => name,
        (None,       &Some(ref email), _             ) => email.clone(),
        (None,       &None,            &Some(ref uri)) => uri.clone(),
        _ => { fail!("return None을 하고 싶은데 노답"); }
    };
    person.fields.insert("name".to_string(), person_name);
    for email in person_email.move_iter() { person.fields.insert("email".to_string(), email); }
    for uri in person_uri.move_iter() { person.fields.insert("uri".to_string(), uri); }
    feed::Elem(person)
}

fn parse_link(element: &Element, children: ChildMap, session: AtomSession) -> feed::ElementValue {
    let mut link = feed::Element::new("link".to_string());
    link.fields.insert("uri".to_string(), feed::Str(element.get("href").unwrap().to_string()));
    link.fields.insert("mimetype".to_string(), feed::Str(element.get("type").unwrap().to_string()));
    link.fields.insert("language".to_string(), feed::Str(element.get("hreflang").unwrap().to_string()));
    link.fields.insert("title".to_string(), feed::Str(element.get("title").unwrap().to_string()));
    link.fields.insert("byte_size".to_string(), feed::Str(element.get("length").unwrap().to_string()));
    for rel in element.get("rel").move_iter() {
        link.fields.insert("relation".to_string(), feed::Str(rel.to_string()));
    }
    feed::Elem(link)
}

fn build_feed_parser() -> ParserBase<AtomSession, feed::ElementValue> {
    ParserBuilder::new()
        .path("feed", parse_feed)
            .path("id", parse_icon).on_start(reset_xml_base).end()
            .path("icon", parse_icon).on_start(reset_xml_base).end()
            .path("logo", parse_icon).on_start(reset_xml_base).end()
            .path("title", parse_text_construct).end()
            .path("rights", parse_text_construct).end()
            .path("subtitle", parse_text_construct).end()
            .path("author", parse_person_construct)
                .attr_name("authors".to_string())
                .on_start(reset_xml_base)
            .end()
            .path("contributor", parse_person_construct)
                .attr_name("contributors".to_string())
                .on_start(reset_xml_base)
            .end()
            .path("link", parse_link).on_start(reset_xml_base).end()
        .end()
    .build()
}

pub fn parse_atom<B: Buffer>(xml: B, feed_url: &str, parse_entry: bool) -> (feed::Element, Option<CrawlerHint>) {
    enum ParseState { FindRoot, FindEntries(&'static str) }
    let mut parser = xml::EventReader::new(xml);
    let mut state = FindRoot;
    'm: for event in parser.events() {
        match state {
            FindRoot => match event {
                StartElement{ name, attributes, .. } => {
                    let atom_xmlns = ATOM_XMLNS_SET.iter().find(|&&atom_xmlns| {
                        name.namespace_ref().map_or(false, |n| n == atom_xmlns)
                    }).unwrap();
                    let xml_base = get_xml_base(attributes.as_slice()).unwrap_or(feed_url);
                    let session = AtomSession { xml_base: xml_base.into_string(),
                                                element_ns: atom_xmlns.into_string() };
                    build_feed_parser().parse(&mut parser.events(), session);
                    state = FindEntries(*atom_xmlns);
                }
                _ => {}
            },
            FindEntries(namespace) => match event {
                _ => {}
            }
        }
    }
    fail!();
    // let feed_data = atom_get_feed_data(parser, feed_url, atom_xmlns);
    // (feed_data, None)
}
