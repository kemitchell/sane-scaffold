var scaffold = require('../../index.js')
  , rmdir = require('rmdir');

describe('Scaffolding an example directory', function () {
  var fixture;

  before(function (done) {
    fixture = './fixtures/scaffolding-with-callbacks';
    scaffold
      .start(fixture)
      .directory('empty-directory')
      .directory('put-things-inside-me', function (dir) {
        dir.directory('im-a-subdirectory', function (dir) {
          dir.directory('directoryception');
        })
        .file('files-inside-directories.ext');
      })
      .file('files-are-simple.txt', 'And can have content')
      .done(function () {
        done();
      });
  });

  after(function (done) {
    rmdir(fixture, done);
  });

  describe('scaffolding-with-callbacks', function () {
    describe('/empty-directory', function () {
      it('', function () {
        expect(fixture + '/empty-directory').to.be.a.directory();
      });
    });
    describe('/put-things-inside-me', function () {
      it('', function () {
        expect(fixture + '/put-things-inside-me').to.be.a.directory();
      });
      describe('files-inside-directories.ext', function () {
        it('', function () {
          expect(fixture + '/put-things-inside-me/files-inside-directories.ext').to.be.a.file();
        });
      });
      describe('/im-a-subdirectory', function () {
        it('', function () {
          expect(fixture + '/put-things-inside-me/im-a-subdirectory').to.be.a.directory();
        });
        describe('/directoryception', function () {
          it('', function () {
            expect(fixture + '/put-things-inside-me/im-a-subdirectory/directoryception').to.be.a.directory();
          });
        });
      });
    });
    describe('files-are-simple.txt', function () {
      it('', function () {
        expect(fixture + '/files-are-simple.txt').to.be.a.file();
      });
      it('', function () {
        expect(fixture + '/files-are-simple.txt').to.have.content('And can have content');
      });
    });
  });
});