var File = require('../../lib/file')
  , mockFs = require('mock-fs');

describe('File', function () {
  var file
    , fixutres;

  before(function () {
    var toMock = {};
    fixtures = __dirname + '/fixtures/file-generator';
    toMock[fixtures]  = {};
    mockFs(toMock);
  });

  after(function () {
    mockFs.restore();
  });

  describe('#make', function () {
    it('expects somefile.txt to exist for "somefile.txt"', function (done) {
      File.make(fixtures + '/somefile.txt', '', function () {
        expect(fixtures + '/somefile.txt').to.be.a.file();
        done();
      });
    });
    it('expects someother-file.txt to exist for "someother-file.txt"', function (done) {
      File.make(fixtures + '/someother-file.txt', '').then(function () {
        expect(fixtures + '/someother-file.txt').to.be.a.file();
        done();
      });
    });
  });
});