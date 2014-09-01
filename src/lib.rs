#![feature(phase, struct_variant, macro_rules)]

#[phase(plugin)]
extern crate regex_macros;

extern crate regex;
extern crate time;

extern crate chrono;
extern crate xml;

pub mod feed;
pub mod parser;
pub mod schema;
