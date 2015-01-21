#![unstable]

use std::borrow::ToOwned;
use std::default::Default;
use std::fmt;
use std::ops::Deref;

use html::{Html};
use sanitizer::escape;

/// Person construct defined in RFC 4287 (section 3.2).
///
/// RFC: <https://tools.ietf.org/html/rfc4287#section-3.2>
#[unstable]
#[derive(PartialEq, Eq, Hash, Show)]
pub struct Person {
    /// The human-readable name for the person.  It corresponds to
    /// `atom:name` element of [RFC 4287 (section 3.2.1)][rfc-person-1].
    ///
    /// [rfc-person-1]: https://tools.ietf.org/html/rfc4287#section-3.2.1
    pub name: String,

    /// The optional URI associated with the person.  It corresponds to
    /// `atom:uri` element of [RFC 4287 (section 3.2.2)][rfc-person-2].
    ///
    /// [rfc-person-2]: https://tools.ietf.org/html/rfc4287#section-3.2.2
    pub uri: Option<String>,

    /// The optional email address associated with the person.  It
    /// corresponds to ``atom:email`` element of [RFC 4287 (section 3.2.3)
    /// ][rfc-person-3].
    ///
    /// [rfc-person-3]: https://tools.ietf.org/html/rfc4287#section-3.2.3
    pub email: Option<String>,
}

impl Person {
    pub fn new<T, S: ?Sized>(name: T) -> Person
        where T: Deref<Target=S>, S: ToOwned<String>
    {
        Person { name: name.to_owned(), uri: None, email: None }
    }
}

impl Default for Person {
    fn default() -> Person { Person::new("") }
}

impl fmt::String for Person {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        try!(write!(f, "{}", self.name));
        if let Some(ref r) = self.uri.as_ref().or(self.email.as_ref()) {
            try!(write!(f, " <{}>", r));
        }
        Ok(())
    }
}

impl Html for Person {
    fn fmt_html(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let name = escape(&self.name[], true);
        if let Some(ref r) = self.uri.as_ref().or(self.email.as_ref()) {
            let scheme = if self.email.is_some() { "mailto" } else { "" };
            try!(write!(f, "<a href=\"{2}{1}\">{0}</a>",
                        name, escape(&r[], true), scheme));
        } else {
            try!(write!(f, "{}", name));
        }
        Ok(())
    }
}

#[cfg(test)]
mod test {
    use super::{Person};

    use html::{HtmlExt};

    #[test]
    fn test_person_str() {
        assert_eq!(Person { name: "Hong Minhee".to_string(),
                            uri: None, email: None }.to_string(),
                   "Hong Minhee");
        assert_eq!(Person { name: "Hong Minhee".to_string(),
                            uri: Some("http://dahlia.kr/".to_string()),
                            email: None }.to_string(),
                   "Hong Minhee <http://dahlia.kr/>");
        let email = concat!("\x6d\x69\x6e\x68\x65\x65\x40\x64",
                            "\x61\x68\x6c\x69\x61\x2e\x6b\x72");
        assert_eq!(Person { name: "Hong Minhee".to_string(),
                            uri: None,
                            email: Some(email.to_string()) }.to_string(),
                   format!("Hong Minhee <{}>", email));
        assert_eq!("홍민희 <http://dahlia.kr/>",
                   Person {
                       name: "홍민희".to_string(),
                       uri: Some("http://dahlia.kr/".to_string()),
                       email: Some(email.to_string()),
                   }.to_string());
    }

    #[ignore]
    #[test]
    fn test_person_html() {
        assert_html!(Person::new("Hong \"Test\" Minhee"),
                     "Hong &quot;Test&quot; Minhee");
        assert_html!(Person { name: "Hong Minhee".to_string(),
                              uri: Some("http://dahlia.kr/".to_string()),
                              email: None },
                     "<a href=\"http://dahlia.kr/\">Hong Minhee</a>");
        let email = concat!("\x6d\x69\x6e\x68\x65\x65\x40\x64",
                            "\x61\x68\x6c\x69\x61\x2e\x6b\x72");
        assert_html!(Person { name: "Hong Minhee".to_string(),
                              uri: None,
                              email: Some(email.to_string()) },
                     format!("<a href=\"mailto:{}\">Hong Minhee</a>",
                             email));
        assert_html!(Person { name: "홍민희".to_string(),
                              uri: Some("http://dahlia.kr/".to_string()),
                              email: Some(email.to_string()) },
                     "<a href=\"http://dahlia.kr/\">홍민희</a>");
    }
}
