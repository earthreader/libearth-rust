use super::{Names, Repository, ToRepository};

use std::borrow::ToOwned;
use std::io;
use std::iter::IntoIterator;
use std::fs::{File, OpenOptions, create_dir_all, metadata, read_dir};
use std::path::{Path, PathBuf};

use url::{Url};

/// Builtin implementation of `Repository` trait which uses the ordinary
/// file system.
pub struct FileSystemRepository {
    path: PathBuf,
}

impl FileSystemRepository {
    pub fn from_path<P>(path: P, mkdir: bool) ->
        super::Result<FileSystemRepository>
        where P: AsRef<Path>
    {
        let path = path.as_ref();
        if !_exists(path) {
            if mkdir {
                if let Err(err) = create_dir_all(path) {
                    match err.kind() {
                        io::ErrorKind::AlreadyExists => { }
                        _ => { return Err(From::from(err)) }
                    }
                }
            } else {
                return Err(From::from(
                    io::Error::new(io::ErrorKind::NotFound, "Invalid path")));
            }
        }
        if !_is_dir(&path) {
            return Err(super::Error::NotADirectory(path.into()));
        }
        Ok(FileSystemRepository {
            path: path.into()
        })
    }
}

fn _join<'a, T, I>(p: &PathBuf, key: I) -> PathBuf
    where T: AsRef<str> + 'a, I: IntoIterator<Item=T>
{
    let mut p = p.clone();
    for k in key {
        p.push(k.as_ref());
    }
    p
}

fn _exists<P>(path: P) -> bool where P: AsRef<Path> { metadata(path).is_ok() }

fn _is_file<P>(path: P) -> bool where P: AsRef<Path> {
    metadata(path).ok().map_or(false, |m| m.is_file())
}

fn _is_dir<P>(path: P) -> bool where P: AsRef<Path> {
    metadata(path).ok().map_or(false, |m| m.is_dir())
}

impl Repository for FileSystemRepository {
    fn get_reader<'a, T: AsRef<str>>(&'a self, key: &[T]) ->
        super::Result<Box<io::BufRead + 'a>>
    {
        let path = _join(&self.path, key.iter());
        if !_is_file(&path) {
            return Err(super::Error::invalid_key(key, None));
        }
        let file = try!(File::open(&path));
        Ok(Box::new(io::BufReader::new(file)) as Box<io::BufRead>)
    }

    fn get_writer<'a, T: AsRef<str>>(&'a mut self, key: &[T]) ->
        super::Result<Box<io::Write + 'a>>
    {
        let path = _join(&self.path, key);
        let dir_path = path.parent();
        if dir_path.map_or(false, |p| !_exists(p)) {
            match create_dir_all(&dir_path.unwrap()) {
                Ok(_) => { }
                Err(e) => match e.kind() {
                    io::ErrorKind::AlreadyExists => {
                        return Err(super::Error::invalid_key(key, Some(e)));
                    }
                    _ => {
                        return Err(From::from(e));
                    }
                }
            }
        }
        if _is_dir(&path) {  // additional check for windows
            return Err(super::Error::invalid_key(key, None));
        }
        let file_res = OpenOptions::new()
            .read(false)
            .write(true)
            .create(true)
            .truncate(true)
            .open(&path);
        let file = match file_res {
            Ok(f) => f,
            Err(e) => return Err(super::Error::invalid_key(key, Some(e))),
        };
        Ok(Box::new(file) as Box<io::Write>)
    }

    fn exists<T: AsRef<str>>(&self, key: &[T]) -> bool {
        _exists(_join(&self.path, key.iter()))
    }

    fn list<'a, T: AsRef<str>>(&'a self, key: &[T]) -> super::Result<Names> {
        let names = match read_dir(&_join(&self.path, key.iter())) {
            Ok(v) => v,
            Err(e) => return Err(super::Error::invalid_key(key, Some(e))),
        };
        let iter = names.filter_map(|entry| {
            match entry {
                Ok(v) => {
                    let path = v.path();
                    let name = path.file_name().and_then(|s| s.to_str());
                    if let Some(name) = name {
                        Some(Ok(name.to_owned()))
                    } else {
                        None
                    }
                }
                Err(e) => Some(Err(super::Error::Io(e))),
            }
        });
        Ok(Box::new(iter) as Names)
    }
}

impl ToRepository<FileSystemRepository> for Url {
    fn to_repo(&self) -> super::Result<FileSystemRepository> {
        if self.scheme() != "file" {
            return Err(super::Error::invalid_url(
                "FileSystemRepository only accepts file:// scheme"));
        } else if self.query() != None || self.fragment() != None {
            return Err(super::Error::invalid_url(
                concat!("file:// must not contain any host/port/user/",
                        "password/parameters/query/fragment")));
        }
        let path = match self.to_file_path() {
            Ok(p) => p,
            Err(_) => {
                return Err(super::Error::invalid_url("invalid file path"));
            }
        };
        FileSystemRepository::from_path(&path, true)
    }

    fn from_repo(repo: &FileSystemRepository) -> Url {
        Url::from_file_path(&repo.path).unwrap()
    }
}

#[cfg(test)]
mod test {
    use test_utils::temp_dir;
    use super::super::test::test_repository;

    use super::super::{Repository, ToRepository};
    use super::super::Error as RepositoryError;
    use super::FileSystemRepository as FsRepo;

    use std::collections::BTreeSet;
    use std::io;
    use std::io::{Read, Write};
    use std::fs::{File, create_dir_all};

    use url::Url;

    #[cfg(not(windows))]
    #[test]
    fn test_file_from_to_url_on_posix() {
        let tmpdir = temp_dir();
        let path_str: &str = tmpdir.path().to_str().unwrap();
        let raw_url = format!("file://{}", path_str);
        let url = Url::parse(&*raw_url).unwrap();
        let fs: FsRepo = url.to_repo().unwrap();
        assert_eq!(fs.path.as_path(), tmpdir.path());
        let u1: Url = ToRepository::from_repo(&fs);
    }

    #[cfg(windows)]
    #[test]
    fn test_file_from_to_url_on_windows() {
        use std::path::Component::*;
        let tmpdir = temp_dir();
        let path_str = tmpdir.path()
            .components()
            .filter_map(|c| match c {
                Prefix(prefix) => Some(prefix.as_os_str()),
                RootDir => None,
                CurDir => Some(".".as_ref()),
                ParentDir => Some("..".as_ref()),
                Normal(s) => Some(s),
            })
            .filter_map(|s| s.to_str())
            .collect::<Vec<_>>()
            .connect("/");
        println!("{}", path_str);
        let raw_url = format!("file:///{}", path_str);
        let url = Url::parse(&*raw_url).unwrap();
        let fs: FsRepo = url.to_repo().unwrap();
        assert_eq!(fs.path.as_path(), tmpdir.path());
        let u1: Url = ToRepository::from_repo(&fs);
    }

    #[test]
    fn test_file_read() {
        let tmpdir = temp_dir();
        let f = FsRepo::from_path(tmpdir.path(), true).unwrap();

        expect_invalid_key!(f.get_reader, &["key"]);
        {
            let mut file = File::create(&tmpdir.path().join("key")).unwrap();
            write!(&mut file, "file content").unwrap();
        }
        let mut content = vec![];
        f.get_reader(&["key"]).unwrap().read_to_end(&mut content).unwrap();
        assert_eq!(content, b"file content");
    }

    #[test]
    fn test_file_read_nested() {
        let tmpdir = temp_dir();
        let f = FsRepo::from_path(tmpdir.path(), true).unwrap();

        expect_invalid_key!(f.get_reader, &["dir", "dir2", "key"]);
        {
            let mut path = tmpdir.path().to_path_buf();
            path.push("dir");
            path.push("dir2");
            create_dir_all(&path).unwrap();
            path.push("key");
            let mut file = File::create(&path).unwrap();
            write!(&mut file, "file content").unwrap();
        }
        let mut content = vec![];
        f.get_reader(&["dir", "dir2", "key"]).unwrap()
            .read_to_end(&mut content).unwrap();
        assert_eq!(content, b"file content");
    }

    #[test]
    fn test_file_write() {
        let tmpdir = temp_dir();
        let mut f = FsRepo::from_path(tmpdir.path(), true).unwrap();
        {
            let mut w = f.get_writer(&["key"]).unwrap();
            write!(&mut w, "file ").unwrap();
            write!(&mut w, "content").unwrap();
        }
        let mut content = vec![];
        File::open(&tmpdir.path().join("key")).unwrap()
            .read_to_end(&mut content).unwrap();
        assert_eq!(content, b"file content");
    }

    #[test]
    fn test_file_write_nested() {
        let tmpdir = temp_dir();
        let mut f = FsRepo::from_path(tmpdir.path(), true).unwrap();
        {
            let mut w = f.get_writer(&["dir", "dir2", "key"]).unwrap();
            write!(&mut w, "deep ").unwrap();
            write!(&mut w, "dark ").unwrap();
            write!(&mut w, "content").unwrap();
        }
        let mut path = tmpdir.path().to_path_buf();
        for c in &["dir", "dir2", "key"] { path.push(c); }
        let mut content = vec![];
        File::open(&path).unwrap().read_to_end(&mut content).unwrap();
        assert_eq!(content, b"deep dark content");
    }

    #[test]
    fn test_file_write_on_wrong_key() {
        let tmpdir = temp_dir();
        let mut f = FsRepo::from_path(tmpdir.path(), true).unwrap();
        expect_invalid_key!(f.get_writer, &[]);
    }

    #[test]
    fn test_file_exists() {
        let tmpdir = temp_dir();
        let f = FsRepo::from_path(tmpdir.path(), true).unwrap();
        {
            let path = tmpdir.path().join("dir");
            create_dir_all(&path).unwrap();
            let mut file = File::create(&path.join("file")).unwrap();
            write!(&mut file, "content").unwrap();
            let mut file = File::create(&tmpdir.path().join("file")).unwrap();
            write!(&mut file, "content").unwrap();
        }
        assert!(f.exists(&["dir"]));
        assert!(f.exists(&["dir", "file"]));
        assert!(f.exists(&["file"]));
        assert!(!f.exists(&["dir", "file-not-exist"]));
        assert!(!f.exists(&["dir-not-exist"]));
    }

    #[test]
    fn test_file_list() {
        let tmpdir = temp_dir();
        let f = FsRepo::from_path(tmpdir.path(), true).unwrap();
        let d = tmpdir.path().join("dir");
        create_dir_all(&d).unwrap();
        for i in 0..100 {
            create_dir_all(&d.join(format!("d{}", i))).unwrap();
        }
        let expected: BTreeSet<_> = (0..100)
            .map(|i| format!("d{}", i))
            .collect();
        let paths = f.list(&["dir"]).unwrap()
            .map(|e| e.unwrap())
            .collect::<BTreeSet<_>>();
        assert_eq!(paths, expected);
    }

    #[test]
    fn test_file_list_on_wrong_key() {
        let tmpdir = temp_dir();
        let f = FsRepo::from_path(tmpdir.path(), true).unwrap();
        expect_invalid_key!(f.list, &["not-exist"]);
    }

    #[test]
    fn test_file_not_found() {
        let tmpdir = temp_dir();
        let path = tmpdir.path().join("not-exist");
        assert_err!(FsRepo::from_path(&path, false),
                    RepositoryError::Io(e) => {
                        assert_eq!(e.kind(), io::ErrorKind::NotFound);
                    });
        let _f = FsRepo::from_path(&path, true);
        assert!(super::_is_dir(path));
    }

    #[test]
    fn test_not_dir() {
        let tmpdir = temp_dir();
        let path = tmpdir.path().join("not-dir.txt");
        File::create(&path).unwrap().write_all(&[]).unwrap();
        assert_err!(FsRepo::from_path(&path, false),
                    RepositoryError::NotADirectory(p) => {
                        assert_eq!(path, p);
                    });
    }


    #[test]
    fn test_filesystem_repository() {
        let tmpdir = temp_dir();
        let f = FsRepo::from_path(tmpdir.path(), true).unwrap();
        test_repository(f);
    }
}
