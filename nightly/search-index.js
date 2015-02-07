var searchIndex = {};
searchIndex['earth'] = {"items":[[0,"","earth","**rust-earth** is an alternative library of [libearth][], the shared common\nlibrary for various [Earth Reader][] apps."],[0,"codecs","","Provides commonly used codecs to parse RSS-related standard formats."],[3,"RFC3339","earth::codecs",""],[3,"Boolean","",""],[11,"encode","","",0],[11,"decode","","",0],[11,"new","","",1],[11,"default","","",1],[11,"encode","","",1],[11,"decode","","",1],[0,"feed","earth","Data structures for feeds."],[3,"Category","earth::feed","Category element defined in :rfc:`4287#section-4.2.2` (section 4.2.2)."],[12,"term","","The required machine-readable identifier string of the cateogry.\nIt corresponds to ``term`` attribute of :rfc:`4287#section-4.2.2.1` (section 4.2.2.1).",2],[12,"scheme_uri","","The URI that identifies a categorization scheme.  It corresponds to\n``scheme`` attribute of :rfc:`4287#section-4.2.2.2` (section 4.2.2.2).",2],[12,"label","","The optional human-readable label for display in end-user\napplications.  It corresponds to ``label`` attribute of :rfc:`4287#section-4.2.2.3` (section 4.2.2.3).",2],[3,"Content","","Content construct defined in :rfc:`4287#section-4.1.3` (section 4.1.3)."],[3,"Entry","","Represent an individual entry, acting as a container for metadata and data\nassociated with the entry.  It corresponds to `atom:entry` element of\n:rfc:`4287#section-4.1.2` (section 4.1.2)."],[12,"metadata","","",3],[12,"published_at","","The datetime value with a fixed timezone offset, indicating an instant\nin time associated with an event early in the life cycle of the entry.\nTypically, `published_at` will be associated with the initial creation\nor first availability of the resource.\nIt corresponds to `atom:published` element of :rfc:`4287#section-4.2.9`\n(section 4.2.9).",3],[12,"summary","","The text field that conveys a short summary, abstract, or excerpt of\nthe entry.  It corresponds to ``atom:summary`` element of\n:rfc:`4287#section-4.2.13` (section 4.2.13).",3],[12,"content","","It either contains or links to the content of the entry.\nIt corresponds to ``atom:content`` element of :rfc:`4287#section-4.1.3`\n(section 4.1.3).",3],[12,"source","","If an entry is copied from one feed into another feed, then the source\nfeed's metadata may be preserved within the copied entry by adding\n`source` if it is not already present in the entry, and including some\nor all of the source feed's metadata as the `source`'s data.",3],[12,"read","","Whether and when it's read or unread.",3],[12,"starred","","Whether and when it's starred or unstarred.",3],[3,"Feed","","Atom feed document, acting as a container for metadata and data associated\nwith the feed."],[12,"source","","",4],[12,"entries","","The list of `Entry` values that represent an individual entry, acting\nas a container for metadata and data associated with the entry.\nIt corresponds to ``atom:entry`` element of :rfc:`4287#section-4.1.2`\n(section 4.1.2).",4],[3,"Generator","","Identify the agent used to generate a feed, for debugging and other\npurposes.  It's corresponds to ``atom:generator`` element of\n:rfc:`4287#section-4.2.4` (section 4.2.4)."],[12,"uri","","A URI that represents something relavent to the agent.",5],[12,"version","","The version of the generating agent.",5],[12,"value","","The human-readable name for the generating agent.",5],[3,"Link","","Link element defined in RFC 4287 (section 4.2.7)."],[12,"uri","","The link's required URI.  It corresponds to `href` attribute of\n[RFC 4287 (section 4.2.7.1)][rfc-link-1].",6],[12,"relation","","The relation type of the link.  It corresponds to `rel` attribute\nof [RFC 4287 (section 4.2.7.2)][rfc-link-2].",6],[12,"mimetype","","The optional hint for the MIME media type of the linked content.\nIt corresponds to `type` attribute of\n[RFC 4287 (section 4.2.7.3)][rfc-link-3].",6],[12,"language","","The language of the linked content.  It corresponds to `hreflang`\nattribute of [RFC 4287 (section 4.2.7.4)][rfc-link-4].",6],[12,"title","","The title of the linked resource.  It corresponds to `title`\nattribute of [RFC 4287 (section 4.2.7.5)][rfc-link-5].",6],[12,"byte_size","","The optional hint for the length of the linked content in octets.\nIt corresponds to `length` attribute of [RFC 4287 (section 4.2.7.6)\n][rfc-link-6].",6],[3,"LinkList","",""],[3,"Mark","","Represent whether the entry is read, starred, or tagged by user."],[12,"marked","","Whether it's marked or not.",7],[12,"updated_at","","Updated time.",7],[3,"Metadata","","Common metadata shared by `Source`, `Entry`, and `Feed`."],[12,"id","","The URI that conveys a permanent, universally unique identifier for an\nentry or feed.  It corresponds to `atom:id` element of :rfc:`4287#section-4.2.6` (section 4.2.6).",8],[12,"title","","The human-readable title for an entry or feed.\nIt corresponds to `atom:title` element of :rfc:`4287#section-4.2.14` (section 4.2.14).",8],[12,"links","","The list of :class:`Link` objects that define a reference from an entry\nor feed to a web resource.  It corresponds to `atom:link` element of\n:rfc:`4287#section-4.2.7` (section 4.2.7).",8],[12,"updated_at","","The datetime value with a fixed timezone offset, indicating the most\nrecent instant in time when the entry was modified in a way the\npublisher considers significant.  Therefore, not all modifications\nnecessarily result in a changed `updated_at` value.\nIt corresponds to `atom:updated` element of :rfc:`4287#section-4.2.15` (section 4.2.15).",8],[12,"authors","","The list of `Person` values which indicates the author of the entry or\nfeed.  It corresponds to `atom:author` element of :rfc:`4287#section-4.2.1` (section 4.2.1).",8],[12,"contributors","","The list of `Person` values which indicates a person or other entity\nwho contributed to the entry or feed.  It corresponds to\n`atom:contributor` element of :rfc:`4287#section-4.2.3` (section 4.2.3).",8],[12,"categories","","The list of `Category` values that conveys information about categories\nassociated with an entry or feed.  It corresponds to `atom:category`\nelement of :rfc:`4287#section-4.2.2` (section 4.2.2).",8],[12,"rights","","The text field that conveys information about rights held in and of an\nentry or feed.  It corresponds to `atom:rights` element of\n:rfc:`4287#section-4.2.10` (section 4.2.10).",8],[3,"Person","","Person construct defined in RFC 4287 (section 3.2)."],[12,"name","","The human-readable name for the person.  It corresponds to\n`atom:name` element of [RFC 4287 (section 3.2.1)][rfc-person-1].",9],[12,"uri","","The optional URI associated with the person.  It corresponds to\n`atom:uri` element of [RFC 4287 (section 3.2.2)][rfc-person-2].",9],[12,"email","","The optional email address associated with the person.  It\ncorresponds to ``atom:email`` element of [RFC 4287 (section 3.2.3)\n][rfc-person-3].",9],[3,"Source","","All metadata for `Feed` excepting `Feed.entries`.\nIt corresponds to `atom:source` element of :rfc:`4287#section-4.2.10`\n(section 4.2.10)."],[12,"metadata","","",10],[12,"subtitle","","A text that conveys a human-readable description or subtitle for a\nfeed.  It corresponds to `atom:subtitle` element of\n:rfc:`4287#section-4.2.12` (section 4.2.12).",10],[12,"generator","","Identify the agent used to generate a feed, for debugging and other\npurposes.  It corresponds to `atom:generator` element of\n:rfc:`4287#section-4.2.4` (section 4.2.4).",10],[12,"logo","","URI that identifies an image that provides visual identification for a\nfeed.  It corresponds to `atom:logo` element of :rfc:`4287#section-4.2.8` (section 4.2.8).",10],[12,"icon","","URI that identifies an image that provides iconic visual identification\nfor a feed.  It corresponds to `atom:icon` element of\n:rfc:`4287#section-4.2.5` (section 4.2.5).",10],[4,"Text","","Text construct defined in :rfc:`4287#section-3.1` (section 3.1)."],[13,"Plain","","The plain text content.  It corresponds to :rfc:`4287#section-3.1.1.1` (section 3.1.1.1).",11],[13,"Html","","The HTML content.  It corresponds to :rfc:`4287#section-3.1.1.2` (section 3.1.1.2).",11],[11,"fmt","","",2],[11,"default","","",2],[11,"entity_id","","",2],[11,"merge_with","","",2],[11,"fmt","","",2],[11,"read_from","","",2],[11,"fmt","","",12],[11,"clone","","",12],[11,"new","","",12],[11,"from_str","","",12],[11,"source_uri","","",12],[11,"mimetype","","",12],[11,"is_text","","",12],[11,"as_bytes","","",12],[11,"as_str","","",12],[11,"sanitized_html","","",12],[11,"default","","",12],[11,"eq","","",12],[11,"read_from","","",12],[11,"default","","",3],[11,"deref","","",3],[11,"deref_mut","","",3],[11,"new_inherited","","",3],[11,"new","","",3],[11,"tag","","",3],[11,"xmlns","","",3],[11,"match_child","","",3],[11,"entity_id","","",3],[11,"merge_with","","",3],[11,"default","","",4],[11,"deref","","",4],[11,"deref_mut","","",4],[11,"new_inherited","","",4],[11,"new","","",4],[11,"tag","","",4],[11,"xmlns","","",4],[11,"match_child","","",4],[11,"merge_with","","",4],[11,"eq","","",5],[11,"ne","","",5],[11,"default","","",5],[11,"fmt","","",5],[11,"read_from","","",5],[11,"fmt","","",6],[11,"hash","","",6],[11,"eq","","",6],[11,"ne","","",6],[11,"clone","","",6],[11,"new","","",6],[11,"is_html","","Whether its `mimetype` is HTML (or XHTML).",6],[11,"default","","",6],[11,"fmt","","",6],[11,"read_from","","",6],[11,"fmt","","",13],[11,"default","","",13],[11,"new","","",13],[11,"deref","","",13],[11,"deref_mut","","",13],[11,"from_iter","","",13],[11,"merge_with","collections::vec","",14],[11,"fmt","earth::feed","",7],[11,"hash","","",7],[11,"eq","","",7],[11,"ne","","",7],[11,"default","","",7],[11,"clone","","",7],[11,"entity_id","","If there are two or more marks that have the same tag name, these\nare all should be merged into one.",7],[11,"merge_with","","",7],[11,"read_from","","",7],[11,"new_inherited","","",8],[11,"default","","",8],[11,"match_child","","",8],[11,"entity_id","","",8],[11,"merge_with","","",8],[11,"fmt","","",9],[11,"hash","","",9],[11,"eq","","",9],[11,"ne","","",9],[11,"new","","",9],[11,"default","","",9],[11,"fmt","","",9],[11,"read_from","core::option","",15],[11,"match_child","","",15],[11,"merge_with","collections::vec","",14],[11,"default","earth::feed","",10],[11,"deref","","",10],[11,"deref_mut","","",10],[11,"new_inherited","","",10],[11,"new","","",10],[11,"match_child","","",10],[11,"merge_with","","",10],[11,"fmt","","",11],[11,"eq","","",11],[11,"ne","","",11],[11,"new","","",11],[11,"text","","",11],[11,"plain","","",11],[11,"html","","",11],[11,"type_","","The type of the text.  It corresponds to :rfc:`4287#section-3.1.1` (section 3.1.1).",11],[11,"default","","",11],[11,"fmt","","",11],[11,"mimetype","","",11],[11,"is_text","","",11],[11,"as_bytes","","",11],[11,"as_str","","",11],[11,"sanitized_html","","",11],[11,"read_from","","",11],[8,"LinkIteratorExt","",""],[11,"filter_by_mimetype","","Filter links by their `mimetype` e.g.:",16],[11,"permalink","","",16],[11,"favicon","","",16],[8,"Blob","",""],[10,"mimetype","","",17],[11,"is_text","","",17],[10,"as_bytes","","",17],[11,"as_str","","",17],[10,"sanitized_html","","Get the secure HTML string of the text.  If it's a plain text, this\nreturns entity-escaped HTML string, if it's a HTML text, `value` is\nsanitized, and if it's a binary data, this returns base64-encoded\nstring.",17],[0,"html","earth","The adatper to display a given value as an HTML element."],[3,"ForHtml","earth::html",""],[8,"ToHtml","",""],[11,"to_html","","",18],[6,"Target","",""],[11,"deref","","",19],[0,"mimetype","earth",""],[4,"MimeType","earth::mimetype",""],[13,"Text","","",20],[13,"Html","","",20],[13,"Xhtml","","",20],[13,"Other","","",20],[11,"fmt","","",20],[11,"eq","","",20],[11,"ne","","",20],[11,"clone","","",20],[11,"from_str","","",20],[11,"mimetype","","",20],[11,"is_text","","",20],[11,"fmt","","",20],[0,"parser","earth","Parsing various RSS formats."],[0,"atom","earth::parser","Parsing Atom feed."],[5,"parse_atom","earth::parser::atom",""],[0,"base","earth::parser",""],[11,"borrow","xml::attribute","",21],[11,"new","","",21],[11,"fmt","xml::name","",22],[11,"hash","","",22],[11,"assert_receiver_is_total_eq","","",22],[11,"eq","","",22],[11,"ne","","",22],[11,"ne","","",22],[11,"clone","","",22],[11,"clone_from","","",22],[11,"fmt","","",22],[11,"to_owned","","Returns an owned variant of the qualified name.",22],[11,"local","","Returns a new `Name` instance representing plain local name.",22],[11,"qualified","","Returns a new `Name` instance representing a qualified name with or without a prefix and\nwith a namespace URI.",22],[11,"to_repr","","Returns correct XML representation of this local name and prefix.",22],[11,"fmt","","",23],[11,"hash","","",23],[11,"assert_receiver_is_total_eq","","",23],[11,"eq","","",23],[11,"ne","","",23],[11,"ne","","",23],[11,"clone","","",23],[11,"clone_from","","",23],[11,"fmt","","",23],[11,"borrow","","Constructs a borrowed `Name` based on this owned name.",23],[11,"local","","Returns a new `OwnedName` instance representing a plain local name.",23],[11,"qualified","","Returns a new `OwnedName` instance representing a qualified name with or without\na prefix and with a namespace URI.",23],[11,"prefix_as_ref","","Returns an optional prefix by reference, equivalent to `self.borrow().prefix`\nbut avoids extra work.",23],[11,"namespace_as_ref","","Returns an optional namespace by reference, equivalen to `self.borrow().namespace`\nbut avoids extra work.",23],[11,"to_repr","","See `Name::to_repr()` for details.",23],[6,"Err","earth::parser::base",""],[11,"from_str","xml::name","Parses the given string slice into a qualified name.",23],[11,"fmt","xml::attribute","",24],[11,"hash","","",24],[11,"eq","","",24],[11,"ne","","",24],[11,"ne","","",24],[11,"assert_receiver_is_total_eq","","",24],[11,"clone","","",24],[11,"clone_from","","",24],[11,"fmt","","",24],[11,"to_owned","","",24],[11,"new","","",24],[11,"fmt","","",21],[11,"hash","","",21],[11,"eq","","",21],[11,"ne","","",21],[11,"ne","","",21],[11,"assert_receiver_is_total_eq","","",21],[11,"clone","","",21],[11,"clone_from","","",21],[11,"fmt","","",21],[11,"fmt","xml::common","",25],[11,"assert_receiver_is_total_eq","","",25],[11,"eq","","",25],[11,"ne","","",25],[11,"ne","","",25],[11,"clone","","",25],[11,"clone_from","","",25],[11,"fmt","","",25],[11,"row","","",25],[11,"col","","",25],[11,"new","","Creates a new error using position information from the provided\n`HasPosition` object and a message.",25],[11,"new_full","","Creates a new error using provided position information and a message.",25],[11,"msg","","Returns a reference to a message which is contained inside this error.",25],[11,"description","","",25],[11,"cause","","",25],[11,"assert_receiver_is_total_eq","","",26],[11,"eq","","",26],[11,"ne","","",26],[11,"ne","","",26],[11,"clone","","",26],[11,"clone_from","","",26],[11,"fmt","","",26],[11,"extend","xml::escape","",27],[11,"clone","xml::namespace","",28],[11,"clone_from","","",28],[11,"eq","","",28],[11,"ne","","",28],[11,"ne","","",28],[11,"empty","","Returns an empty namespace.",28],[11,"is_empty","","Checks whether this namespace is empty.",28],[11,"is_essentially_empty","","Checks whether this namespace is essentially empty, that is, it does not contain\nanything but the default mappings.",28],[11,"put","","Puts a mapping into this namespace.",28],[11,"force_put","","Puts a mapping into this namespace forcefully.",28],[11,"get","","Queries the namespace for the given prefix.",28],[6,"Item","earth::parser::base",""],[11,"next","xml::namespace","",29],[11,"size_hint","","",29],[6,"Iter","earth::parser::base",""],[11,"uri_mappings","xml::namespace","",28],[11,"eq","","",30],[11,"ne","","",30],[11,"ne","","",30],[11,"clone","","",30],[11,"clone_from","","",30],[11,"empty","","Returns an empty namespace stack.",30],[11,"default","","Returns a namespace stack with default items in it.",30],[11,"push_empty","","Adds an empty namespace to the top of this stack.",30],[11,"pop","","Removes a namespace at the top of the stack.",30],[11,"peek","","Returns a namespace at the top of the stack, leaving the stack intact.",30],[11,"put","","Puts a mapping into the topmost namespace in this stack.",30],[11,"get","","Performs a search for the given prefix in the whole stack.",30],[11,"squash","","Combines this stack of namespaces into a single namespace.",30],[6,"Item","earth::parser::base",""],[11,"next","xml::namespace","",31],[11,"size_hint","","",31],[6,"Iter","earth::parser::base",""],[11,"uri_mappings","xml::namespace","",30],[11,"fmt","xml::reader::lexer","",32],[11,"assert_receiver_is_total_eq","","",32],[11,"eq","","",32],[11,"ne","","",32],[11,"ne","","",32],[11,"clone","","",32],[11,"clone_from","","",32],[11,"fmt","","",32],[11,"as_static_str","","",32],[11,"contains_char_data","","Returns `true` if this token contains data that can be interpreted\nas a part of the text. Surprisingly, this also means '>' and '=' and '\"' and \"'\".",32],[11,"is_whitespace","","Returns `true` if this token corresponds to a white space character.",32],[11,"row","","Returns current row in the input document.",33],[11,"col","","Returns current column in the document.",33],[11,"enable_errors","","Enables error handling so `next_token` will return `Some(Err(..))`\nupon invalid lexeme.",33],[11,"disable_errors","","Disables error handling so `next_token` will return `Some(Chunk(..))`\nupon invalid lexeme with this lexeme content.",33],[11,"next_token","","Tries to read next token from the buffer.",33],[11,"new","xml::reader::parser","Returns a new parser using the given config.",34],[11,"eq","","",35],[11,"ne","","",35],[11,"ne","","",35],[11,"clone","","",35],[11,"clone_from","","",35],[11,"eq","","",36],[11,"ne","","",36],[11,"ne","","",36],[11,"clone","","",36],[11,"clone_from","","",36],[11,"eq","","",37],[11,"ne","","",37],[11,"ne","","",37],[11,"clone","","",37],[11,"clone_from","","",37],[11,"eq","","",38],[11,"ne","","",38],[11,"ne","","",38],[11,"clone","","",38],[11,"clone_from","","",38],[11,"eq","","",39],[11,"ne","","",39],[11,"ne","","",39],[11,"clone","","",39],[11,"clone_from","","",39],[11,"eq","","",40],[11,"ne","","",40],[11,"ne","","",40],[11,"assert_receiver_is_total_eq","","",41],[11,"eq","","",41],[11,"ne","","",41],[11,"ne","","",41],[11,"next","","Returns next event read from the given buffer.",34],[11,"new","xml::reader::config","Returns a new config with default values.",42],[11,"trim_whitespace","","Sets the field to the provided value and returns updated config object.",42],[11,"whitespace_to_characters","","Sets the field to the provided value and returns updated config object.",42],[11,"cdata_to_characters","","Sets the field to the provided value and returns updated config object.",42],[11,"ignore_comments","","Sets the field to the provided value and returns updated config object.",42],[11,"coalesce_characters","","Sets the field to the provided value and returns updated config object.",42],[11,"clone","xml::reader::events","",43],[11,"clone_from","","",43],[11,"eq","","",43],[11,"ne","","",43],[11,"ne","","",43],[11,"fmt","","",43],[11,"as_writer_event","","",43],[11,"new","xml::reader","Creates a new parser, consuming given `Buffer`.",44],[11,"new_with_config","","Creates a new parser with the provded configuration, consuming given `Buffer`.",44],[11,"next","","Pulls and returns next XML event from the stream.",44],[11,"events","","Returns an iterator over XML events.",44],[6,"Item","earth::parser::base",""],[11,"next","xml::reader","",45],[11,"size_hint","","",45],[11,"new_from_string","","Convenience method to create a reader from an owned string.",44],[11,"new_from_bytes","","Convenience method to create a reader from an owned vector of bytes.",44],[11,"new_from_str_slice","","Convenience method to create a reader from a string slice.",44],[11,"new_from_bytes_slice","","Convenience method to create a reader from a slice of bytes.",44],[11,"fmt","xml::writer::emitter","",46],[11,"new","","",47],[11,"hash","","",48],[11,"cmp","","",48],[11,"partial_cmp","","",48],[11,"lt","","",48],[11,"le","","",48],[11,"gt","","",48],[11,"ge","","",48],[11,"lt","","",48],[11,"le","","",48],[11,"gt","","",48],[11,"ge","","",48],[11,"clone","","",48],[11,"clone_from","","",48],[11,"assert_receiver_is_total_eq","","",48],[11,"eq","","",48],[11,"ne","","",48],[11,"ne","","",48],[11,"empty","","Returns an empty set of flags.",48],[11,"all","","Returns the set containing all flags.",48],[11,"bits","","Returns the raw value of the flags currently stored.",48],[11,"from_bits","","Convert from underlying bit representation, unless that\nrepresentation contains bits that do not correspond to a flag.",48],[11,"from_bits_truncate","","Convert from underlying bit representation, dropping any bits\nthat do not correspond to flags.",48],[11,"is_empty","","Returns `true` if no flags are currently stored.",48],[11,"is_all","","Returns `true` if all flags are currently set.",48],[11,"intersects","","Returns `true` if there are flags common to both `self` and `other`.",48],[11,"contains","","Returns `true` all of the flags in `other` are contained within `self`.",48],[11,"insert","","Inserts the specified flags in-place.",48],[11,"remove","","Removes the specified flags in-place.",48],[11,"toggle","","Toggles the specified flags in-place.",48],[6,"Output","earth::parser::base",""],[11,"bitor","xml::writer::emitter","Returns the union of the two sets of flags.",48],[6,"Output","earth::parser::base",""],[11,"bitxor","xml::writer::emitter","Returns the left flags, but with all the right flags toggled.",48],[6,"Output","earth::parser::base",""],[11,"bitand","xml::writer::emitter","Returns the intersection between the two sets of flags.",48],[6,"Output","earth::parser::base",""],[11,"sub","xml::writer::emitter","Returns the set difference of the two sets of flags.",48],[6,"Output","earth::parser::base",""],[11,"not","xml::writer::emitter","Returns the complement of this set of flags.",48],[11,"namespace_stack","","Returns current state of namespaces.",47],[11,"emit_start_document","","",47],[11,"emit_processing_instruction","","",47],[11,"emit_empty_element","","",47],[11,"emit_start_element","","",47],[11,"emit_namespace_attributes","","",47],[11,"emit_attributes","","",47],[11,"emit_end_element","","",47],[11,"emit_cdata","","",47],[11,"emit_characters","","",47],[11,"emit_comment","","",47],[11,"new","xml::writer::config","Creates an emitter configuration with default values.",49],[11,"line_separator","","Sets the field to the provided value and returns updated config object.",49],[11,"indent_string","","Sets the field to the provided value and returns updated config object.",49],[11,"perform_indent","","Sets the field to the provided value and returns updated config object.",49],[11,"write_document_declaration","","Sets the field to the provided value and returns updated config object.",49],[11,"normalize_empty_elements","","Sets the field to the provided value and returns updated config object.",49],[11,"cdata_to_characters","","Sets the field to the provided value and returns updated config object.",49],[11,"new","xml::writer","",50],[11,"new_with_config","","",50],[11,"write","","",50],[11,"new_into_mem","","",50],[11,"new_into_mem_config","","",50],[11,"borrow_internals","core::option","",15],[6,"Item","earth::parser::base",""],[11,"next","xml::util","",51],[11,"size_hint","","",51],[3,"XmlAttribute","earth::parser::base",""],[12,"name","","",21],[12,"value","","",21],[3,"XmlName","","An owned variant of `Name`."],[12,"local_name","","A local name, e.g. `string` in `xsi:string`.",23],[12,"namespace","","A namespace URI, e.g. `http://www.w3.org/2000/xmlns/`.",23],[12,"prefix","","A name prefix, e.g. `xsi` in `xsi:string`.",23],[3,"XmlNamespace","","Namespace is a map from prefixes to namespace URIs."],[3,"XmlElement","",""],[12,"attributes","","",52],[12,"namespace","","",52],[12,"children","","",52],[3,"NestedEventReader","",""],[4,"NestedEvent","",""],[13,"StartDocument","","",53],[12,"version","earth::parser::base::NestedEvent","",53],[12,"encoding","","",53],[12,"standalone","","",53],[13,"EndDocument","earth::parser::base","",53],[13,"ProcessingInstruction","","",53],[12,"name","earth::parser::base::NestedEvent","",53],[12,"data","","",53],[13,"Nested","earth::parser::base","",53],[12,"name","earth::parser::base::NestedEvent","",53],[12,"element","","",53],[13,"CData","earth::parser::base","",53],[13,"Comment","","",53],[13,"Characters","","",53],[13,"Whitespace","","",53],[13,"Error","","",53],[4,"DecodeError","",""],[13,"XmlError","","",54],[13,"UnexpectedEvent","","",54],[12,"event","earth::parser::base::DecodeError","",54],[12,"depth","","",54],[13,"NoResult","earth::parser::base","",54],[13,"AttributeNotFound","","",54],[13,"SchemaError","","",54],[11,"eq","","",53],[11,"ne","","",53],[11,"eq","","",53],[11,"eq","xml::reader::events","",43],[11,"fmt","earth::parser::base","",53],[6,"DecodeResult","",""],[11,"fmt","","",54],[11,"fmt","","",54],[11,"description","","",54],[11,"from_error","","",54],[11,"get_attr","","",52],[11,"read_whole_text","","",52],[11,"eq","","",52],[11,"fmt","","",52],[11,"new","","",55],[11,"next","","",55],[11,"drop","","",55],[0,"repository","earth","Abstracts storage backend e.g. filesystem."],[4,"RepositoryError","earth::repository",""],[13,"InvalidKey","","",56],[13,"InvalidUrl","","",56],[13,"NotADirectory","","",56],[13,"CannotBorrow","","",56],[13,"Io","","",56],[0,"fs","",""],[3,"FileSystemRepository","earth::repository::fs","Builtin implementation of `Repository` trait which uses the ordinary\nfile system."],[11,"from_path","","",57],[11,"get_reader","","",57],[11,"get_writer","","",57],[11,"exists","","",57],[11,"list","","",57],[11,"to_repo","url","",58],[11,"from_repo","","",58],[11,"as_bytes","collections::vec","",14],[11,"as_bytes","collections::string","",59],[6,"Names","earth::repository",""],[6,"RepositoryResult","",""],[8,"Bytes","",""],[10,"as_bytes","","",60],[8,"Repository","","Repository interface agnostic to its underlying storage implementation.\nStage objects can deal with documents to be stored using the interface."],[10,"get_reader","","Read the content from the `key`.",61],[10,"get_writer","","Get a writer to write data into the ``key``.",61],[11,"read","","",61],[11,"write","","",61],[10,"exists","","Return whether the `key` exists or not.",61],[10,"list","","List all subkeys in the `key`.",61],[8,"ToRepository","",""],[10,"to_repo","","Create a new instance of the repository from itself.\nIt may be used for configuring the repository in plain text\ne.g. `*.ini`.",62],[10,"from_repo","","Generate a value that `to_repo()` can accept.\nIt's used for configuring the repository in plain text\ne.g. `*.ini`.  URL `scheme` is determined by caller,\nand given through argument.",62],[11,"fmt","","",56],[11,"invalid_key","","",56],[11,"invalid_url","","",56],[11,"fmt","","",56],[11,"description","","",56],[11,"cause","","",56],[11,"from_error","","",56],[0,"sanitizer","earth","Sanitize HTML tags."],[3,"Escape","earth::sanitizer",""],[3,"CleanHtml","",""],[3,"SanitizeHtml","",""],[5,"escape","","Convert given string to HTML-safe sequences by replacing the characters\n`&`, `<` and `>`.  If the optional `flag` quote is true, the characters `\"`\nand `'` are also translated."],[5,"clean_html","","Strip *all* markup tags from HTML string.\nThat means, it simply makes the given HTML document a plain text."],[5,"sanitize_html","","Sanitize the given HTML string.  It removes the following tags and\nattributes that are not secure nor useful for RSS reader layout:"],[11,"fmt","","",63],[11,"fmt","","",64],[11,"fmt","","",65],[0,"schema","earth",""],[4,"SchemaError","earth::schema",""],[13,"EncodeError","","",66],[13,"DecodeError","","",66],[6,"SchemaResult","",""],[8,"Codec","",""],[10,"encode","","",67],[10,"decode","","",67],[8,"Entity","",""],[16,"OwnedId","earth::schema::Entity",""],[16,"BorrowedId","",""],[10,"entity_id","earth::schema","",68],[8,"Mergeable","","This trait is used to merge conflicts between concurrent updates."],[11,"merge_with","","Merge data with the given value to renew itself as a latest state.",69],[8,"DocumentElement","","The root element of the document."],[10,"tag","","",70],[10,"xmlns","","",70],[8,"FromSchemaReader","",""],[11,"build_from","","",71],[11,"read_from","","",71],[11,"match_child","","",71],[11,"fmt","","",66],[11,"fmt","","",66],[11,"description","","",66],[11,"merge_with","core::option","",15],[11,"merge_with","collections::vec","",14],[0,"stage","earth",""],[3,"DirtyBuffer","earth::stage",""],[11,"new","","",72],[11,"flush","","",72],[11,"get_reader","","",72],[11,"get_writer","","",72],[11,"exists","","",72],[11,"list","","",72],[0,"util","earth",""],[5,"get_mut_or_set","earth::util",""],[5,"set_default","",""],[5,"replace","",""],[5,"merge_vec","",""],[11,"fmt","earth::html","",19],[11,"filter_by_mimetype","earth::feed","Filter links by their `mimetype` e.g.:",16],[11,"permalink","","",16],[11,"favicon","","",16],[11,"fmt","earth::html","",19],[11,"fmt","","",19],[11,"fmt","","",19]],"paths":[[3,"RFC3339"],[3,"Boolean"],[3,"Category"],[3,"Entry"],[3,"Feed"],[3,"Generator"],[3,"Link"],[3,"Mark"],[3,"Metadata"],[3,"Person"],[3,"Source"],[4,"Text"],[3,"Content"],[3,"LinkList"],[3,"Vec"],[4,"Option"],[8,"LinkIteratorExt"],[8,"Blob"],[8,"ToHtml"],[3,"ForHtml"],[4,"MimeType"],[3,"XmlAttribute"],[3,"Name"],[3,"XmlName"],[3,"Attribute"],[3,"Error"],[4,"XmlVersion"],[4,"Process"],[3,"XmlNamespace"],[3,"NamespaceMappings"],[3,"NamespaceStack"],[3,"NamespaceStackMappings"],[4,"Token"],[3,"PullLexer"],[3,"PullParser"],[4,"State"],[4,"OpeningTagSubstate"],[4,"ClosingTagSubstate"],[4,"ProcessingInstructionSubstate"],[4,"DeclarationSubstate"],[4,"QualifiedNameTarget"],[4,"QuoteToken"],[3,"ParserConfig"],[4,"XmlEvent"],[3,"EventReader"],[3,"Events"],[3,"EmitterError"],[3,"Emitter"],[3,"IndentFlags"],[3,"EmitterConfig"],[3,"EventWriter"],[3,"ClonedPairwise"],[3,"XmlElement"],[4,"NestedEvent"],[4,"DecodeError"],[3,"NestedEventReader"],[4,"RepositoryError"],[3,"FileSystemRepository"],[3,"Url"],[3,"String"],[8,"Bytes"],[8,"Repository"],[8,"ToRepository"],[3,"Escape"],[3,"CleanHtml"],[3,"SanitizeHtml"],[4,"SchemaError"],[8,"Codec"],[8,"Entity"],[8,"Mergeable"],[8,"DocumentElement"],[8,"FromSchemaReader"],[3,"DirtyBuffer"]]};
initSearch(searchIndex);
