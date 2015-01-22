var searchIndex = {};
searchIndex['earth'] = {"items":[[0,"","earth","**rust-earth** is an alternative library of [libearth][], the shared common\nlibrary for various [Earth Reader][] apps."],[0,"codecs","","Provides commonly used codecs to parse RSS-related standard formats."],[1,"RFC3339","earth::codecs",""],[1,"Boolean","",""],[10,"encode","","",0],[10,"decode","","",0],[10,"new","","",1],[10,"default","","",1],[10,"encode","","",1],[10,"decode","","",1],[0,"feed","earth","Data structures for feeds."],[0,"category","earth::feed",""],[1,"Category","earth::feed::category","Category element defined in :rfc:`4287#section-4.2.2` (section 4.2.2)."],[11,"term","","The required machine-readable identifier string of the cateogry.\nIt corresponds to ``term`` attribute of :rfc:`4287#section-4.2.2.1` (section 4.2.2.1).",2],[11,"scheme_uri","","The URI that identifies a categorization scheme.  It corresponds to\n``scheme`` attribute of :rfc:`4287#section-4.2.2.2` (section 4.2.2.2).",2],[11,"label","","The optional human-readable label for display in end-user\napplications.  It corresponds to ``label`` attribute of :rfc:`4287#section-4.2.2.3` (section 4.2.2.3).",2],[10,"fmt","","",2],[10,"default","","",2],[10,"merge_entities","","",2],[10,"fmt","","",2],[10,"read_from","","",2],[0,"content","earth::feed",""],[1,"Content","earth::feed::content","Content construct defined in :rfc:`4287#section-4.1.3` (section 4.1.3)."],[10,"fmt","","",3],[10,"clone","","",3],[10,"new","","",3],[10,"from_str","","",3],[10,"source_uri","","",3],[10,"mimetype","","",3],[10,"is_text","","",3],[10,"as_bytes","","",3],[10,"as_str","","",3],[10,"sanitized_html","","",3],[10,"default","","",3],[10,"eq","","",3],[10,"read_from","","",3],[0,"entry","earth::feed",""],[1,"Entry","earth::feed::entry","Represent an individual entry, acting as a container for metadata and data\nassociated with the entry.  It corresponds to `atom:entry` element of\n:rfc:`4287#section-4.1.2` (section 4.1.2)."],[11,"metadata","","",4],[11,"published_at","","The datetime value with a fixed timezone offset, indicating an instant\nin time associated with an event early in the life cycle of the entry.\nTypically, `published_at` will be associated with the initial creation\nor first availability of the resource.\nIt corresponds to `atom:published` element of :rfc:`4287#section-4.2.9`\n(section 4.2.9).",4],[11,"summary","","The text field that conveys a short summary, abstract, or excerpt of\nthe entry.  It corresponds to ``atom:summary`` element of\n:rfc:`4287#section-4.2.13` (section 4.2.13).",4],[11,"content","","It either contains or links to the content of the entry.\nIt corresponds to ``atom:content`` element of :rfc:`4287#section-4.1.3`\n(section 4.1.3).",4],[11,"source","","If an entry is copied from one feed into another feed, then the source\nfeed's metadata may be preserved within the copied entry by adding\n`source` if it is not already present in the entry, and including some\nor all of the source feed's metadata as the `source`'s data.",4],[11,"read","","Whether and when it's read or unread.",4],[11,"starred","","Whether and when it's starred or unstarred.",4],[10,"default","","",4],[4,"Target","",""],[10,"deref","","",4],[10,"deref_mut","","",4],[10,"new_inherited","","",4],[10,"new","","",4],[10,"tag","","",4],[10,"xmlns","","",4],[10,"match_child","","",4],[10,"merge_entities","","",4],[0,"feed","earth::feed",""],[1,"Feed","earth::feed::feed","Atom feed document, acting as a container for metadata and data associated\nwith the feed."],[11,"source","","",5],[11,"entries","","The list of `Entry` values that represent an individual entry, acting\nas a container for metadata and data associated with the entry.\nIt corresponds to ``atom:entry`` element of :rfc:`4287#section-4.1.2`\n(section 4.1.2).",5],[3,"read_feed","",""],[10,"default","","",5],[4,"Target","",""],[10,"deref","","",5],[10,"deref_mut","","",5],[10,"new_inherited","","",5],[10,"new","","",5],[10,"tag","","",5],[10,"xmlns","","",5],[10,"match_child","","",5],[0,"generator","earth::feed",""],[1,"Generator","earth::feed::generator","Identify the agent used to generate a feed, for debugging and other\npurposes.  It's corresponds to ``atom:generator`` element of\n:rfc:`4287#section-4.2.4` (section 4.2.4)."],[11,"uri","","A URI that represents something relavent to the agent.",6],[11,"version","","The version of the generating agent.",6],[11,"value","","The human-readable name for the generating agent.",6],[10,"eq","","",6],[10,"ne","","",6],[10,"default","","",6],[10,"fmt","","",6],[10,"read_from","","",6],[0,"link","earth::feed",""],[1,"Link","earth::feed::link","Link element defined in RFC 4287 (section 4.2.7)."],[11,"uri","","The link's required URI.  It corresponds to `href` attribute of\n[RFC 4287 (section 4.2.7.1)][rfc-link-1].",7],[11,"relation","","The relation type of the link.  It corresponds to `rel` attribute\nof [RFC 4287 (section 4.2.7.2)][rfc-link-2].",7],[11,"mimetype","","The optional hint for the MIME media type of the linked content.\nIt corresponds to `type` attribute of\n[RFC 4287 (section 4.2.7.3)][rfc-link-3].",7],[11,"language","","The language of the linked content.  It corresponds to `hreflang`\nattribute of [RFC 4287 (section 4.2.7.4)][rfc-link-4].",7],[11,"title","","The title of the linked resource.  It corresponds to `title`\nattribute of [RFC 4287 (section 4.2.7.5)][rfc-link-5].",7],[11,"byte_size","","The optional hint for the length of the linked content in octets.\nIt corresponds to `length` attribute of [RFC 4287 (section 4.2.7.6)\n][rfc-link-6].",7],[1,"LinkList","",""],[2,"Predicate","",""],[6,"LinkIteratorExt","",""],[10,"filter_by_mimetype","","Filter links by their `mimetype` e.g.:",8],[10,"permalink","","",8],[10,"favicon","","",8],[10,"fmt","","",7],[10,"hash","","",7],[10,"eq","","",7],[10,"ne","","",7],[10,"clone","","",7],[10,"new","","",7],[10,"is_html","","Whether its `mimetype` is HTML (or XHTML).",7],[10,"default","","",7],[10,"fmt","","",7],[10,"read_from","","",7],[10,"call","","",9],[10,"fmt","","",10],[10,"default","","",10],[10,"new","","",10],[4,"Target","",""],[10,"deref","","",10],[10,"deref_mut","","",10],[10,"from_iter","","",10],[0,"mark","earth::feed",""],[1,"Mark","earth::feed::mark","Represent whether the entry is read, starred, or tagged by user."],[11,"marked","","Whether it's marked or not.",11],[11,"updated_at","","Updated time.",11],[10,"fmt","","",11],[10,"hash","","",11],[10,"eq","","",11],[10,"ne","","",11],[10,"default","","",11],[10,"merge_entities","","",11],[10,"read_from","","",11],[0,"metadata","earth::feed",""],[1,"Metadata","earth::feed::metadata","Common metadata shared by `Source`, `Entry`, and `Feed`."],[11,"id","","The URI that conveys a permanent, universally unique identifier for an\nentry or feed.  It corresponds to `atom:id` element of :rfc:`4287#section-4.2.6` (section 4.2.6).",12],[11,"title","","The human-readable title for an entry or feed.\nIt corresponds to `atom:title` element of :rfc:`4287#section-4.2.14` (section 4.2.14).",12],[11,"links","","The list of :class:`Link` objects that define a reference from an entry\nor feed to a web resource.  It corresponds to `atom:link` element of\n:rfc:`4287#section-4.2.7` (section 4.2.7).",12],[11,"updated_at","","The datetime value with a fixed timezone offset, indicating the most\nrecent instant in time when the entry was modified in a way the\npublisher considers significant.  Therefore, not all modifications\nnecessarily result in a changed `updated_at` value.\nIt corresponds to `atom:updated` element of :rfc:`4287#section-4.2.15` (section 4.2.15).",12],[11,"authors","","The list of `Person` values which indicates the author of the entry or\nfeed.  It corresponds to `atom:author` element of :rfc:`4287#section-4.2.1` (section 4.2.1).",12],[11,"contributors","","The list of `Person` values which indicates a person or other entity\nwho contributed to the entry or feed.  It corresponds to\n`atom:contributor` element of :rfc:`4287#section-4.2.3` (section 4.2.3).",12],[11,"categories","","The list of `Category` values that conveys information about categories\nassociated with an entry or feed.  It corresponds to `atom:category`\nelement of :rfc:`4287#section-4.2.2` (section 4.2.2).",12],[11,"rights","","The text field that conveys information about rights held in and of an\nentry or feed.  It corresponds to `atom:rights` element of\n:rfc:`4287#section-4.2.10` (section 4.2.10).",12],[10,"new_inherited","","",12],[10,"default","","",12],[10,"match_child","","",12],[0,"person","earth::feed",""],[1,"Person","earth::feed::person","Person construct defined in RFC 4287 (section 3.2)."],[11,"name","","The human-readable name for the person.  It corresponds to\n`atom:name` element of [RFC 4287 (section 3.2.1)][rfc-person-1].",13],[11,"uri","","The optional URI associated with the person.  It corresponds to\n`atom:uri` element of [RFC 4287 (section 3.2.2)][rfc-person-2].",13],[11,"email","","The optional email address associated with the person.  It\ncorresponds to ``atom:email`` element of [RFC 4287 (section 3.2.3)\n][rfc-person-3].",13],[10,"fmt","","",13],[10,"hash","","",13],[10,"eq","","",13],[10,"ne","","",13],[10,"new","","",13],[10,"default","","",13],[10,"fmt","","",13],[10,"read_from","core::option","",14],[10,"match_child","","",14],[0,"source","earth::feed",""],[1,"Source","earth::feed::source","All metadata for `Feed` excepting `Feed.entries`.\nIt corresponds to `atom:source` element of :rfc:`4287#section-4.2.10`\n(section 4.2.10)."],[11,"metadata","","",15],[11,"subtitle","","A text that conveys a human-readable description or subtitle for a\nfeed.  It corresponds to `atom:subtitle` element of\n:rfc:`4287#section-4.2.12` (section 4.2.12).",15],[11,"generator","","Identify the agent used to generate a feed, for debugging and other\npurposes.  It corresponds to `atom:generator` element of\n:rfc:`4287#section-4.2.4` (section 4.2.4).",15],[11,"logo","","URI that identifies an image that provides visual identification for a\nfeed.  It corresponds to `atom:logo` element of :rfc:`4287#section-4.2.8` (section 4.2.8).",15],[11,"icon","","URI that identifies an image that provides iconic visual identification\nfor a feed.  It corresponds to `atom:icon` element of\n:rfc:`4287#section-4.2.5` (section 4.2.5).",15],[10,"default","","",15],[4,"Target","",""],[10,"deref","","",15],[10,"deref_mut","","",15],[10,"new_inherited","","",15],[10,"new","","",15],[10,"match_child","","",15],[0,"text","earth::feed",""],[2,"Text","earth::feed::text","Text construct defined in :rfc:`4287#section-3.1` (section 3.1)."],[12,"Plain","","The plain text content.  It corresponds to :rfc:`4287#section-3.1.1.1` (section 3.1.1.1).",16],[12,"Html","","The HTML content.  It corresponds to :rfc:`4287#section-3.1.1.2` (section 3.1.1.2).",16],[10,"fmt","","",16],[10,"eq","","",16],[10,"ne","","",16],[10,"new","","",16],[10,"text","","",16],[10,"plain","","",16],[10,"html","","",16],[10,"type_","","The type of the text.  It corresponds to :rfc:`4287#section-3.1.1` (section 3.1.1).",16],[10,"default","","",16],[10,"fmt","","",16],[10,"mimetype","","",16],[10,"is_text","","",16],[10,"as_bytes","","",16],[10,"as_str","","",16],[10,"sanitized_html","","",16],[10,"read_from","","",16],[6,"Blob","earth::feed",""],[9,"mimetype","","",17],[10,"is_text","","",17],[9,"as_bytes","","",17],[10,"as_str","","",17],[9,"sanitized_html","","Get the secure HTML string of the text.  If it's a plain text, this\nreturns entity-escaped HTML string, if it's a HTML text, `value` is\nsanitized, and if it's a binary data, this returns base64-encoded\nstring.",17],[0,"html","earth","The adatper to display a given value as an HTML element."],[1,"ForHtml","earth::html",""],[6,"ToHtml","",""],[10,"to_html","","",18],[4,"Target","",""],[10,"deref","","",19],[0,"mimetype","earth",""],[2,"MimeType","earth::mimetype",""],[12,"Text","","",20],[12,"Html","","",20],[12,"Xhtml","","",20],[12,"Other","","",20],[10,"fmt","","",20],[10,"eq","","",20],[10,"ne","","",20],[10,"clone","","",20],[10,"from_str","","",20],[10,"mimetype","","",20],[10,"is_text","","",20],[10,"fmt","","",20],[0,"parser","earth",""],[0,"atom","earth::parser",""],[1,"CrawlerHint","earth::parser::atom",""],[3,"parse_atom","",""],[0,"base","earth::parser",""],[1,"XmlElement","earth::parser::base",""],[11,"attributes","","",21],[11,"namespace","","",21],[11,"children","","",21],[1,"NestedEventReader","",""],[2,"DecodeError","",""],[12,"XmlError","","",22],[12,"UnexpectedEvent","","",22],[11,"event","earth::parser::base::DecodeError","",22],[11,"depth","","",22],[12,"NoResult","earth::parser::base","",22],[12,"AttributeNotFound","","",22],[12,"SchemaError","","",22],[0,"events","",""],[2,"NestedEvent","earth::parser::base::events",""],[12,"StartDocument","","",23],[11,"version","earth::parser::base::events::NestedEvent","",23],[11,"encoding","","",23],[11,"standalone","","",23],[12,"EndDocument","earth::parser::base::events","",23],[12,"ProcessingInstruction","","",23],[11,"name","earth::parser::base::events::NestedEvent","",23],[11,"data","","",23],[12,"Nested","earth::parser::base::events","",23],[11,"name","earth::parser::base::events::NestedEvent","",23],[11,"element","","",23],[12,"CData","earth::parser::base::events","",23],[12,"Comment","","",23],[12,"Characters","","",23],[12,"Whitespace","","",23],[12,"Error","","",23],[10,"eq","","",23],[10,"ne","","",23],[10,"eq","","",23],[10,"eq","xml::reader::events","",24],[10,"fmt","earth::parser::base::events","",23],[4,"DecodeResult","earth::parser::base",""],[10,"fmt","","",22],[10,"from_error","","",22],[10,"get_attr","","",21],[10,"read_whole_text","","",21],[10,"eq","","",21],[10,"fmt","","",21],[10,"new","","",25],[10,"next","","",25],[10,"drop","","",25],[10,"borrow","xml::attribute","",26],[10,"new","","",26],[10,"hash","xml::name","",27],[10,"assert_receiver_is_total_eq","","",27],[10,"eq","","",27],[10,"ne","","",27],[10,"ne","","",27],[10,"clone","","",27],[10,"clone_from","","",27],[10,"fmt","","",27],[10,"fmt","","",27],[10,"to_owned","","Returns an owned variant of the qualified name.",27],[10,"local","","Returns a new `Name` instance representing plain local name.",27],[10,"qualified","","Returns a new `Name` instance representing a qualified name with or without a prefix and\nwith a namespace URI.",27],[10,"to_repr","","Returns correct XML representation of this local name and prefix.",27],[10,"hash","","",28],[10,"assert_receiver_is_total_eq","","",28],[10,"eq","","",28],[10,"ne","","",28],[10,"ne","","",28],[10,"clone","","",28],[10,"clone_from","","",28],[10,"fmt","","",28],[10,"fmt","","",28],[10,"borrow","","Constructs a borrowed `Name` based on this owned name.",28],[10,"local","","Returns a new `OwnedName` instance representing a plain local name.",28],[10,"qualified","","Returns a new `OwnedName` instance representing a qualified name with or without\na prefix and with a namespace URI.",28],[10,"prefix_as_ref","","Returns an optional prefix by reference, equivalent to `self.borrow().prefix`\nbut avoids extra work.",28],[10,"namespace_as_ref","","Returns an optional namespace by reference, equivalen to `self.borrow().namespace`\nbut avoids extra work.",28],[10,"to_repr","","See `Name::to_repr()` for details.",28],[10,"from_str","","Parses the given string slice into a qualified name.",28],[10,"hash","xml::attribute","",29],[10,"eq","","",29],[10,"ne","","",29],[10,"ne","","",29],[10,"assert_receiver_is_total_eq","","",29],[10,"clone","","",29],[10,"clone_from","","",29],[10,"fmt","","",29],[10,"to_owned","","",29],[10,"new","","",29],[10,"hash","","",26],[10,"eq","","",26],[10,"ne","","",26],[10,"ne","","",26],[10,"assert_receiver_is_total_eq","","",26],[10,"clone","","",26],[10,"clone_from","","",26],[10,"fmt","","",26],[10,"assert_receiver_is_total_eq","xml::common","",30],[10,"eq","","",30],[10,"ne","","",30],[10,"ne","","",30],[10,"clone","","",30],[10,"clone_from","","",30],[10,"fmt","","",30],[10,"row","","",30],[10,"col","","",30],[10,"new","","Creates a new error using position information from the provided\n`HasPosition` object and a message.",30],[10,"new_full","","Creates a new error using provided position information and a message.",30],[10,"msg","","Returns a reference to a message which is contained inside this error.",30],[10,"description","","",30],[10,"detail","","",30],[10,"detail","","",30],[10,"cause","","",30],[10,"assert_receiver_is_total_eq","","",31],[10,"eq","","",31],[10,"ne","","",31],[10,"ne","","",31],[10,"clone","","",31],[10,"clone_from","","",31],[10,"fmt","","",31],[10,"extend","xml::escape","",32],[10,"clone","xml::namespace","",33],[10,"clone_from","","",33],[10,"eq","","",33],[10,"ne","","",33],[10,"ne","","",33],[10,"empty","","Returns an empty namespace.",33],[10,"is_empty","","Checks whether this namespace is empty.",33],[10,"is_essentially_empty","","Checks whether this namespace is essentially empty, that is, it does not contain\nanything but the default mappings.",33],[10,"put","","Puts a mapping into this namespace.",33],[10,"force_put","","Puts a mapping into this namespace forcefully.",33],[10,"get","","Queries the namespace for the given prefix.",33],[10,"next","","",34],[10,"size_hint","","",34],[10,"uri_mappings","","",33],[10,"eq","","",35],[10,"ne","","",35],[10,"ne","","",35],[10,"clone","","",35],[10,"clone_from","","",35],[10,"empty","","Returns an empty namespace stack.",35],[10,"default","","Returns a namespace stack with default items in it.",35],[10,"push_empty","","Adds an empty namespace to the top of this stack.",35],[10,"pop","","Removes a namespace at the top of the stack.",35],[10,"peek","","Returns a namespace at the top of the stack, leaving the stack intact.",35],[10,"put","","Puts a mapping into the topmost namespace in this stack.",35],[10,"get","","Performs a search for the given prefix in the whole stack.",35],[10,"squash","","Combines this stack of namespaces into a single namespace.",35],[10,"next","","",36],[10,"size_hint","","",36],[10,"uri_mappings","","",35],[10,"eq","xml::reader::lexer","",37],[10,"ne","","",37],[10,"ne","","",37],[10,"clone","","",37],[10,"clone_from","","",37],[10,"fmt","","",37],[10,"fmt","","",37],[10,"as_static_str","","",37],[10,"contains_char_data","","Returns `true` if this token contains data that can be interpreted\nas a part of the text. Surprisingly, this also means '>' and '=' and '\"' and \"'\".",37],[10,"is_whitespace","","Returns `true` if this token corresponds to a white space character.",37],[10,"row","","Returns current row in the input document.",38],[10,"col","","Returns current column in the document.",38],[10,"enable_errors","","Enables error handling so `next_token` will return `Some(Err(..))`\nupon invalid lexeme.",38],[10,"disable_errors","","Disables error handling so `next_token` will return `Some(Chunk(..))`\nupon invalid lexeme with this lexeme content.",38],[10,"next_token","","Tries to read next token from the buffer.",38],[10,"new","xml::reader::parser","Returns a new parser using the given config.",39],[10,"eq","","",40],[10,"ne","","",40],[10,"ne","","",40],[10,"clone","","",40],[10,"clone_from","","",40],[10,"eq","","",41],[10,"ne","","",41],[10,"ne","","",41],[10,"clone","","",41],[10,"clone_from","","",41],[10,"eq","","",42],[10,"ne","","",42],[10,"ne","","",42],[10,"clone","","",42],[10,"clone_from","","",42],[10,"eq","","",43],[10,"ne","","",43],[10,"ne","","",43],[10,"clone","","",43],[10,"clone_from","","",43],[10,"eq","","",44],[10,"ne","","",44],[10,"ne","","",44],[10,"clone","","",44],[10,"clone_from","","",44],[10,"eq","","",45],[10,"ne","","",45],[10,"ne","","",45],[10,"assert_receiver_is_total_eq","","",46],[10,"eq","","",46],[10,"ne","","",46],[10,"ne","","",46],[10,"next","","Returns next event read from the given buffer.",39],[10,"new","xml::reader::config","Returns a new config with default values.",47],[10,"trim_whitespace","","Sets the field to the provided value and returns updated config object.",47],[10,"whitespace_to_characters","","Sets the field to the provided value and returns updated config object.",47],[10,"cdata_to_characters","","Sets the field to the provided value and returns updated config object.",47],[10,"ignore_comments","","Sets the field to the provided value and returns updated config object.",47],[10,"coalesce_characters","","Sets the field to the provided value and returns updated config object.",47],[10,"clone","xml::reader::events","",24],[10,"clone_from","","",24],[10,"eq","","",24],[10,"ne","","",24],[10,"ne","","",24],[10,"fmt","","",24],[10,"as_writer_event","","",24],[10,"new","xml::reader","Creates a new parser, consuming given `Buffer`.",48],[10,"new_with_config","","Creates a new parser with the provded configuration, consuming given `Buffer`.",48],[10,"next","","Pulls and returns next XML event from the stream.",48],[10,"events","","Returns an iterator over XML events.",48],[10,"next","","",49],[10,"size_hint","","",49],[10,"new_from_string","","Convenience method to create a reader from an owned string.",48],[10,"new_from_bytes","","Convenience method to create a reader from an owned vector of bytes.",48],[10,"new_from_str_slice","","Convenience method to create a reader from a string slice.",48],[10,"new_from_bytes_slice","","Convenience method to create a reader from a slice of bytes.",48],[10,"fmt","xml::writer::emitter","",50],[10,"new","","",51],[10,"hash","","",52],[10,"cmp","","",52],[10,"partial_cmp","","",52],[10,"lt","","",52],[10,"le","","",52],[10,"gt","","",52],[10,"ge","","",52],[10,"lt","","",52],[10,"le","","",52],[10,"gt","","",52],[10,"ge","","",52],[10,"clone","","",52],[10,"clone_from","","",52],[10,"assert_receiver_is_total_eq","","",52],[10,"eq","","",52],[10,"ne","","",52],[10,"ne","","",52],[10,"empty","","Returns an empty set of flags.",52],[10,"all","","Returns the set containing all flags.",52],[10,"bits","","Returns the raw value of the flags currently stored.",52],[10,"from_bits","","Convert from underlying bit representation, unless that\nrepresentation contains bits that do not correspond to a flag.",52],[10,"from_bits_truncate","","Convert from underlying bit representation, dropping any bits\nthat do not correspond to flags.",52],[10,"is_empty","","Returns `true` if no flags are currently stored.",52],[10,"is_all","","Returns `true` if all flags are currently set.",52],[10,"intersects","","Returns `true` if there are flags common to both `self` and `other`.",52],[10,"contains","","Returns `true` all of the flags in `other` are contained within `self`.",52],[10,"insert","","Inserts the specified flags in-place.",52],[10,"remove","","Removes the specified flags in-place.",52],[10,"toggle","","Toggles the specified flags in-place.",52],[10,"bitor","","Returns the union of the two sets of flags.",52],[10,"bitxor","","Returns the left flags, but with all the right flags toggled.",52],[10,"bitand","","Returns the intersection between the two sets of flags.",52],[10,"sub","","Returns the set difference of the two sets of flags.",52],[10,"not","","Returns the complement of this set of flags.",52],[10,"namespace_stack","","Returns current state of namespaces.",51],[10,"emit_start_document","","",51],[10,"emit_processing_instruction","","",51],[10,"emit_empty_element","","",51],[10,"emit_start_element","","",51],[10,"emit_namespace_attributes","","",51],[10,"emit_attributes","","",51],[10,"emit_end_element","","",51],[10,"emit_cdata","","",51],[10,"emit_characters","","",51],[10,"emit_comment","","",51],[10,"new","xml::writer::config","Creates an emitter configuration with default values.",53],[10,"line_separator","","Sets the field to the provided value and returns updated config object.",53],[10,"indent_string","","Sets the field to the provided value and returns updated config object.",53],[10,"perform_indent","","Sets the field to the provided value and returns updated config object.",53],[10,"write_document_declaration","","Sets the field to the provided value and returns updated config object.",53],[10,"normalize_empty_elements","","Sets the field to the provided value and returns updated config object.",53],[10,"cdata_to_characters","","Sets the field to the provided value and returns updated config object.",53],[10,"new","xml::writer","",54],[10,"new_with_config","","",54],[10,"write","","",54],[10,"new_into_mem","","",54],[10,"new_into_mem_config","","",54],[10,"borrow_internals","core::option","",14],[10,"next","xml::util","",55],[10,"size_hint","","",55],[1,"XmlAttribute","earth::parser::base",""],[11,"name","","",26],[11,"value","","",26],[1,"XmlName","","An owned variant of `Name`."],[11,"local_name","","A local name, e.g. `string` in `xsi:string`.",28],[11,"namespace","","A namespace URI, e.g. `http://www.w3.org/2000/xmlns/`.",28],[11,"prefix","","A name prefix, e.g. `xsi` in `xsi:string`.",28],[1,"XmlNamespace","","Namespace is a map from prefixes to namespace URIs."],[0,"repository","earth","Abstracts storage backend e.g. filesystem."],[2,"RepositoryError","earth::repository",""],[12,"InvalidKey","","",56],[12,"InvalidUrl","","",56],[12,"NotADirectory","","",56],[12,"CannotBorrow","","",56],[12,"Io","","",56],[0,"fs","",""],[1,"FileSystemRepository","earth::repository::fs","Builtin implementation of `Repository` trait which uses the ordinary\nfile system."],[10,"from_path","","",57],[10,"get_reader","","",57],[10,"get_writer","","",57],[10,"exists","","",57],[10,"list","","",57],[10,"to_repo","url","",58],[10,"from_repo","","",58],[0,"utils","earth::repository",""],[1,"Names","earth::repository::utils",""],[6,"Bytes","",""],[9,"as_bytes","","",59],[10,"as_bytes","collections::vec","",60],[10,"as_bytes","collections::string","",61],[10,"new","earth::repository::utils","",62],[4,"Item","",""],[10,"next","","",62],[10,"size_hint","","",62],[4,"RepositoryResult","earth::repository",""],[6,"Repository","","Repository interface agnostic to its underlying storage implementation.\nStage objects can deal with documents to be stored using the interface."],[9,"get_reader","","Read the content from the `key`.",63],[9,"get_writer","","Get a writer to write data into the ``key``.",63],[10,"read","","",63],[10,"write","","",63],[9,"exists","","Return whether the `key` exists or not.",63],[9,"list","","List all subkeys in the `key`.",63],[6,"ToRepository","",""],[9,"to_repo","","Create a new instance of the repository from itself.\nIt may be used for configuring the repository in plain text\ne.g. `*.ini`.",64],[9,"from_repo","","Generate a value that `to_repo()` can accept.\nIt's used for configuring the repository in plain text\ne.g. `*.ini`.  URL `scheme` is determined by caller,\nand given through argument.",64],[10,"fmt","","",56],[10,"invalid_key","","",56],[10,"invalid_url","","",56],[10,"description","","",56],[10,"detail","","",56],[10,"cause","","",56],[10,"from_error","","",56],[0,"sanitizer","earth",""],[1,"Escape","earth::sanitizer",""],[1,"CleanHtml","",""],[1,"SanitizeHtml","",""],[3,"escape","",""],[3,"clean_html","",""],[3,"sanitize_html","",""],[10,"fmt","","",65],[10,"fmt","","",66],[10,"fmt","","",67],[0,"schema","earth",""],[2,"SchemaError","earth::schema",""],[12,"EncodeError","","",68],[12,"DecodeError","","",68],[4,"SchemaResult","",""],[6,"Codec","",""],[9,"encode","","",69],[9,"decode","","",69],[6,"Mergeable","",""],[9,"merge_entities","","",70],[6,"DocumentElement","","The root element of the document."],[9,"tag","","",71],[9,"xmlns","","",71],[6,"FromSchemaReader","",""],[10,"build_from","","",72],[10,"read_from","","",72],[10,"match_child","","",72],[10,"fmt","","",68],[10,"description","","",68],[10,"detail","","",68],[0,"stage","earth",""],[1,"DirtyBuffer","earth::stage",""],[10,"new","","",73],[10,"flush","","",73],[10,"get_reader","","",73],[10,"get_writer","","",73],[10,"exists","","",73],[10,"list","","",73],[0,"util","earth",""],[3,"get_mut_or_set","earth::util",""],[3,"set_default","",""],[10,"fmt","earth::html","",19],[10,"fmt","","",19],[10,"fmt","","",19],[10,"fmt","","",19]],"paths":[[1,"RFC3339"],[1,"Boolean"],[1,"Category"],[1,"Content"],[1,"Entry"],[1,"Feed"],[1,"Generator"],[1,"Link"],[6,"LinkIteratorExt"],[2,"Predicate"],[1,"LinkList"],[1,"Mark"],[1,"Metadata"],[1,"Person"],[2,"Option"],[1,"Source"],[2,"Text"],[6,"Blob"],[6,"ToHtml"],[1,"ForHtml"],[2,"MimeType"],[1,"XmlElement"],[2,"DecodeError"],[2,"NestedEvent"],[2,"XmlEvent"],[1,"NestedEventReader"],[1,"XmlAttribute"],[1,"Name"],[1,"XmlName"],[1,"Attribute"],[1,"Error"],[2,"XmlVersion"],[2,"Process"],[1,"XmlNamespace"],[1,"NamespaceMappings"],[1,"NamespaceStack"],[1,"NamespaceStackMappings"],[2,"Token"],[1,"PullLexer"],[1,"PullParser"],[2,"State"],[2,"OpeningTagSubstate"],[2,"ClosingTagSubstate"],[2,"ProcessingInstructionSubstate"],[2,"DeclarationSubstate"],[2,"QualifiedNameTarget"],[2,"QuoteToken"],[1,"ParserConfig"],[1,"EventReader"],[1,"Events"],[1,"EmitterError"],[1,"Emitter"],[1,"IndentFlags"],[1,"EmitterConfig"],[1,"EventWriter"],[1,"ClonedPairwise"],[2,"RepositoryError"],[1,"FileSystemRepository"],[1,"Url"],[6,"Bytes"],[1,"Vec"],[1,"String"],[1,"Names"],[6,"Repository"],[6,"ToRepository"],[1,"Escape"],[1,"CleanHtml"],[1,"SanitizeHtml"],[2,"SchemaError"],[6,"Codec"],[6,"Mergeable"],[6,"DocumentElement"],[6,"FromSchemaReader"],[1,"DirtyBuffer"]]};
initSearch(searchIndex);