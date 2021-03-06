use std::borrow::{Borrow, ToOwned};
use std::default::Default;
use std::fmt;
use std::io;
use std::iter::{FromIterator, IntoIterator};
use std::mem::swap;
use std::ops::{Deref, DerefMut};
use std::str::FromStr;

use regex::Regex;

use html::ForHtml;
use parser::base::{DecodeResult, XmlElement};
use schema::{FromSchemaReader, Mergeable};
use util::merge_vec;

/// Link element defined in RFC 4287 (section 4.2.7).
///
/// RFC: <https://tools.ietf.org/html/rfc4287#section-4.2.7>.
#[derive(Clone, PartialEq, Eq, Hash, Debug)]
pub struct Link {
    /// The link's required URI.  It corresponds to `href` attribute of
    /// [RFC 4287 (section 4.2.7.1)][rfc-link-1].
    ///
    /// [rfc-link-1]: https://tools.ietf.org/html/rfc4287#section-4.2.7.1
    pub uri: String,

    /// The relation type of the link.  It corresponds to `rel` attribute
    /// of [RFC 4287 (section 4.2.7.2)][rfc-link-2].
    ///
    /// ### See also
    ///
    /// * [Existing rel values][rel-values] --- Microformats Wiki
    ///
    ///   This page contains tables of known HTML ``rel`` values from
    ///   specifications, formats, proposals, brainstorms, and non-trivial
    ///   [POSH][] usage in the wild.  In addition, dropped and rejected
    ///   values are listed at the end for comprehensiveness.
    ///
    /// [rfc-link-2]: https://tools.ietf.org/html/rfc4287#section-4.2.7.2
    /// [rel-values]: http://microformats.org/wiki/existing-rel-values
    /// [POSH]: http://microformats.org/wiki/POSH
    pub relation: String,

    /// The optional hint for the MIME media type of the linked content.
    /// It corresponds to `type` attribute of
    /// [RFC 4287 (section 4.2.7.3)][rfc-link-3].
    ///
    /// [rfc-link-3]: https://tools.ietf.org/html/rfc4287#section-4.2.7.3
    pub mimetype: Option<String>,

    /// The language of the linked content.  It corresponds to `hreflang`
    /// attribute of [RFC 4287 (section 4.2.7.4)][rfc-link-4].
    ///
    /// [rfc-link-4]: https://tools.ietf.org/html/rfc4287#section-4.2.7.4
    pub language: Option<String>,

    /// The title of the linked resource.  It corresponds to `title`
    /// attribute of [RFC 4287 (section 4.2.7.5)][rfc-link-5].
    ///
    /// [rfc-link-5]: https://tools.ietf.org/html/rfc4287#section-4.2.7.5
    pub title: Option<String>,

    /// The optional hint for the length of the linked content in octets.
    /// It corresponds to `length` attribute of [RFC 4287 (section 4.2.7.6)
    /// ][rfc-link-6].
    ///
    /// [rfc-link-6]: https://tools.ietf.org/html/rfc4287#section-4.2.7.6
    pub byte_size: Option<u64>,
}

impl Link {
    pub fn new<T>(uri: T) -> Link
        where T: Into<String>
    {
        Link {
            uri: uri.into(), relation: "alternate".to_owned(),
            mimetype: None, language: None, title: None, byte_size: None
        }   
    }

    /// Whether its `mimetype` is HTML (or XHTML).
    pub fn is_html(&self) -> bool {
        if let Some(ref mimetype) = self.mimetype {
            let pat = Regex::new(r#"^\s*([^;/\s]+/[^;/\s]+)\s*(?:;\s*.*)?$"#).unwrap();
            if let Some(c) = pat.captures(&mimetype[..]) {
                if let Some(mimetype) = c.at(1) {
                    return ["text/html", "application/xhtml+xml"]
                        .contains(&mimetype);
                }
            }
        }
        false
    }
}

impl Default for Link {
    fn default() -> Link { Link::new("") }
}

impl fmt::Display for Link {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.uri)
    }
}

impl<'a> fmt::Display for ForHtml<'a, Link> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        try!(write!(f, "<link rel=\"{}\"", self.relation));
        if let Some(ref mimetype) = self.mimetype {
            try!(write!(f, " type=\"{}\"", mimetype));
        }
        if let Some(ref language) = self.language {
            try!(write!(f, " hreflang=\"{}\"", language));
        }
        try!(write!(f, " href=\"{}\"", self.uri));
        if let Some(ref title) = self.title {
            try!(write!(f, " title=\"{}\"", title));
        }
        write!(f, ">")
    }
}

impl FromSchemaReader for Link {
    fn read_from<B: io::BufRead>(&mut self, element: XmlElement<B>)
                                 -> DecodeResult<()>
    {
        self.uri = try!(element.get_attr("href")).to_owned();
        self.relation = element.get_attr("rel")
                               .unwrap_or("alternate").to_owned();
        self.mimetype = element.get_attr("type").ok()
                               .map(ToOwned::to_owned);
        self.language = element.get_attr("hreflang").ok()
                               .map(ToOwned::to_owned);
        self.title = element.get_attr("title").ok()
                            .map(ToOwned::to_owned);
        self.byte_size = element.get_attr("length").ok()
                                .and_then(|v| FromStr::from_str(v).ok());
        Ok(())
    }
}

pub struct FilterByMimeType<'a, I, T> where I: Iterator<Item=T>, T: Borrow<Link> {
    inner: I,
    condition: Condition<'a>,
}

pub enum Condition<'a> {
    Regex(Regex),
    Simple(&'a str),
}

impl<'a, I, T> Iterator for FilterByMimeType<'a, I, T>
    where I: Iterator<Item=T>, T: Borrow<Link>
{
    type Item = T;

    fn next(&mut self) -> Option<T> {
        loop {
            if let Some(link) = self.inner.next() {
                let matched = if let Some(t) = link.borrow().mimetype.as_ref() {
                    match self.condition {
                        Condition::Regex(ref r) => r.is_match(t),
                        Condition::Simple(ref s) => s == t,
                    }
                } else {
                    false
                };
                if matched {
                    return Some(link);
                }
            } else {
                return None;
            }
        }
    }

    fn size_hint(&self) -> (usize, Option<usize>) {
        (0, self.inner.size_hint().1)
    }
}


pub trait LinkIteratorExt<'a>: Iterator<Item=&'a Link> + Sized {
    /// Filter links by their `mimetype` e.g.:
    ///
    /// ```
    /// # use earth::feed::{LinkList, LinkIteratorExt};
    /// # let links = LinkList(Vec::new());
    /// links.iter().filter_by_mimetype("text/html")
    /// # ;
    /// ```
    ///
    /// `pattern` can include wildcards (`*`) as well e.g.:
    ///
    /// ```
    /// # use earth::feed::{LinkList, LinkIteratorExt};
    /// # let links = LinkList(Vec::new());
    /// links.iter().filter_by_mimetype("application/xml+*")
    /// # ;
    /// ```
    fn filter_by_mimetype<'b>(self, pattern: &'b str) ->
        FilterByMimeType<Self, &'a Link>
    {
        use regex;
        let cond = if pattern.contains('*') {
            let mut regex_str = "^".to_string();
            let mut first = true;
            for part in pattern.split('*') {
                if first {
                    first = false
                } else {
                    regex_str.push_str(".+?")
                }
                regex_str.push_str(&regex::quote(part));
            }
            regex_str.push('$');
            let regex = Regex::new(&regex_str);
            let regex = regex.unwrap();
            Condition::Regex(regex)
        } else {
            Condition::Simple(pattern)
        };
        FilterByMimeType { inner: self, condition: cond }
    }

    fn permalink(self) -> Option<&'a Link> {
        let mut result = None;
        let mut score = (false, false);
        for link in self {
            let rel_is_alternate = link.relation == "alternate";
            let new_score = (link.is_html(), rel_is_alternate);
            if score < new_score {
                result = Some(link);
                score = new_score;
            }
        }
        result
    }

    fn favicon(self) -> Option<&'a Link> {
        for link in self {
            if link.relation.split(' ').any(|i| i == "icon") {
                return Some(link);
            }
        }
        None
    }
}

impl<'a, I: Iterator<Item=&'a Link>> LinkIteratorExt<'a> for I { }


#[derive(Default, Debug)]
pub struct LinkList(pub Vec<Link>);

impl LinkList {
    pub fn new() -> LinkList { LinkList(Vec::new()) }
}

impl Deref for LinkList {
    type Target = Vec<Link>;
    fn deref(&self) -> &Vec<Link> { &self.0 }
}

impl DerefMut for LinkList {
    fn deref_mut(&mut self) -> &mut Vec<Link> { &mut self.0 }
}

impl FromIterator<Link> for LinkList {
    fn from_iter<T: IntoIterator<Item=Link>>(iterator: T) -> Self {
        LinkList(FromIterator::from_iter(iterator))
    }
}

impl Mergeable for Vec<Link> {
    fn merge_with(&mut self, mut other: Vec<Link>) {
        swap(self, &mut other);
        merge_vec(self, other.into_iter());
    }
}


#[cfg(test)]
mod test {
    use super::{Link, LinkIteratorExt};

    use std::default::Default;

    use html::ToHtml;

    #[test]
    fn test_link_html_property() {
        let mut link = Link::new("http://dahlia.kr/");
        link.mimetype = Some("text/html".to_string());
        assert!(link.is_html());
        link.mimetype = Some("application/xhtml+xml".to_string());
        assert!(link.is_html());
        link.mimetype = Some("application/xml".to_string());
        assert!(!link.is_html());
    }

    #[test]
    fn test_link_str() {
        let link = Link {
            uri: "http://dahlia.kr/".to_string(),
            relation: "alternate".to_string(),
            mimetype: Some("text/html".to_string()),
            title: Some("Hong Minhee's website".to_string()),
            language: None, byte_size: None,
        };
        assert_eq!(link.to_string(), "http://dahlia.kr/");
    }

    #[test]
    fn test_link_html_method() {
        let link = Link::new("http://dahlia.kr/");
        assert_html!(link,
                     "<link rel=\"alternate\" href=\"http://dahlia.kr/\">");
        let link = Link {
            uri: "http://dahlia.kr/".to_string(),
            relation: "alternate".to_string(),
            mimetype: Some("text/html".to_string()),
            title: Some("Hong Minhee's website".to_string()),
            language: Some("en".to_string()),
            byte_size: None
        };
        assert_html!(link,
                     concat!("<link rel=\"alternate\" type=\"text/html\" ",
                             "hreflang=\"en\" href=\"http://dahlia.kr/\" ",
                             "title=\"Hong Minhee\'s website\">"));
    }

    fn fx_feed_links() -> Vec<Link> {
        vec![
            Link::new("http://example.org/"),
            Link {
                relation: "alternate".to_string(),
                mimetype: Some("text/html".to_string()),
                uri: "http://example.com/index.html".to_string(),
                title: None, language: None, byte_size: None,
            },
            Link {
                relation: "alternate".to_string(),
                mimetype: Some("text/html".to_string()),
                uri: "http://example.com/index2.html".to_string(),
                title: None, language: None, byte_size: None,
            },
            Link {
                relation: "alternate".to_string(),
                mimetype: Some("text/xml".to_string()),
                uri: "http://example.com/index.xml".to_string(),
                title: None, language: None, byte_size: None,
            },
            Link {
                relation: "alternate".to_string(),
                mimetype: Some("application/json".to_string()),
                uri: "http://example.com/index.json".to_string(),
                title: None, language: None, byte_size: None,
            },
            Link {
                relation: "alternate".to_string(),
                mimetype: Some("text/javascript".to_string()),
                uri: "http://example.com/index.js".to_string(),
                title: None, language: None, byte_size: None,
            },
            Link {
                relation: "alternate".to_string(),
                mimetype: Some("application/xml+atom".to_string()),
                uri: "http://example.com/index.atom".to_string(),
                title: None, language: None, byte_size: None,
            },
            Link {
                relation: "alternate".to_string(),  // remove it if available
                mimetype: Some("application/xml+rss".to_string()),
                uri: "http://example.com/index.atom".to_string(),
                title: None, language: None, byte_size: None,
            },
            Link {
                relation: "icon".to_string(),
                mimetype: Some("image/png".to_string()),
                uri: "http://example.com/favicon.png".to_string(),
                title: None, language: None, byte_size: None,
            },
        ]
    }

    #[test]
    fn test_link_list_filter_by_mimetype() {
        let links = fx_feed_links();
        let result: Vec<_> = links.iter()
            .filter_by_mimetype("text/html")
            .collect();
        assert_eq!(result.len(), 2);
        assert_eq!(result.iter()
                   .map(|link| &link.mimetype.as_ref().unwrap()[..])
                   .collect::<Vec<_>>(),
                   ["text/html", "text/html"]);
        let result: Vec<_> = links.iter()
            .filter_by_mimetype("application/*")
            .collect();
        assert_eq!(result.len(), 3);
        assert_eq!(result.iter()
                   .map(|link| &link.mimetype.as_ref().unwrap()[..])
                   .collect::<Vec<_>>(),
                   ["application/json",
                    "application/xml+atom",
                    "application/xml+rss"]);
    }

    #[test]
    fn test_link_list_permalink() {
        let mut links = fx_feed_links();
        let mut other_link = Link::new("http://example.com/");
        other_link.relation = "other".to_string();
        let mut html_link = Link::new("http://example.com/");
        html_link.relation = "other".to_string();
        html_link.mimetype = Some("text/html".to_string());
        links.extend(vec![other_link, html_link.clone()].into_iter());
        assert_eq!(links.iter().permalink(), Some(&links[1]));
        links.remove(1);
        links.remove(1);
        assert_eq!(links.iter().permalink(), Some(&html_link));
        links.pop();
        assert_eq!(links.iter().permalink(), Some(&links[0]));
        assert_eq!(links[links.len() - 1..].iter().permalink(), None);
    }

    #[test]
    fn test_link_list_favicon() {
        let mut links = fx_feed_links();
        assert_eq!(links.iter().favicon(), links.last());
        links[0] = Link {
            relation: "shortcut icon".to_string(),
            uri: "http://example.com/favicon.ico".to_string(),
            ..Default::default()
        };
        assert_eq!(links.iter().favicon(), links.first());
    }
}
