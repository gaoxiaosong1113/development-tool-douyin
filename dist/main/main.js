"use strict";
const require$$26 = require("electron");
const require$$1$1 = require("path");
const fs$s = require("fs");
const require$$0$1 = require("constants");
const require$$0$2 = require("stream");
const require$$1 = require("util");
const require$$5 = require("assert");
const os$1 = require("os");
const require$$0$3 = require("url");
const puppeteer = require("puppeteer");
const require$$0$4 = require("buffer");
const require$$0$5 = require("events");
const require$$6 = require("string_decoder");
const require$$0$6 = require("zlib");
const require$$1$3 = require("http");
const require$$2$1 = require("https");
const require$$6$1 = require("querystring");
const require$$1$2 = require("punycode");
const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const require$$26__default = /* @__PURE__ */ _interopDefaultLegacy(require$$26);
const require$$1__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$1$1);
const require$$1__namespace = /* @__PURE__ */ _interopNamespace(require$$1$1);
const fs__default = /* @__PURE__ */ _interopDefaultLegacy(fs$s);
const fs__namespace = /* @__PURE__ */ _interopNamespace(fs$s);
const require$$0__default = /* @__PURE__ */ _interopDefaultLegacy(require$$0$1);
const require$$0__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$2);
const require$$1__default = /* @__PURE__ */ _interopDefaultLegacy(require$$1);
const require$$5__default = /* @__PURE__ */ _interopDefaultLegacy(require$$5);
const os__default = /* @__PURE__ */ _interopDefaultLegacy(os$1);
const require$$0__namespace = /* @__PURE__ */ _interopNamespace(require$$0$3);
const require$$0__default$5 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$3);
const puppeteer__namespace = /* @__PURE__ */ _interopNamespace(puppeteer);
const require$$0__default$2 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$4);
const require$$0__default$3 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$5);
const require$$6__default = /* @__PURE__ */ _interopDefaultLegacy(require$$6);
const require$$0__default$4 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$6);
const require$$1__default$3 = /* @__PURE__ */ _interopDefaultLegacy(require$$1$3);
const require$$2__default = /* @__PURE__ */ _interopDefaultLegacy(require$$2$1);
const require$$6__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$6$1);
const require$$1__default$2 = /* @__PURE__ */ _interopDefaultLegacy(require$$1$2);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n) {
  var f = n.default;
  if (typeof f == "function") {
    var a = function() {
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var lib$1 = { exports: {} };
var fs$r = {};
var universalify$2 = {};
universalify$2.fromCallback = function(fn) {
  return Object.defineProperty(function() {
    if (typeof arguments[arguments.length - 1] === "function")
      fn.apply(this, arguments);
    else {
      return new Promise((resolve2, reject2) => {
        arguments[arguments.length] = (err, res) => {
          if (err)
            return reject2(err);
          resolve2(res);
        };
        arguments.length++;
        fn.apply(this, arguments);
      });
    }
  }, "name", { value: fn.name });
};
universalify$2.fromPromise = function(fn) {
  return Object.defineProperty(function() {
    const cb = arguments[arguments.length - 1];
    if (typeof cb !== "function")
      return fn.apply(this, arguments);
    else
      fn.apply(this, arguments).then((r) => cb(null, r), cb);
  }, "name", { value: fn.name });
};
var constants$1 = require$$0__default.default;
var origCwd = process.cwd;
var cwd = null;
var platform$1 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  if (!cwd)
    cwd = origCwd.call(process);
  return cwd;
};
try {
  process.cwd();
} catch (er) {
}
if (typeof process.chdir === "function") {
  var chdir = process.chdir;
  process.chdir = function(d) {
    cwd = null;
    chdir.call(process, d);
  };
  if (Object.setPrototypeOf)
    Object.setPrototypeOf(process.chdir, chdir);
}
var polyfills$1 = patch$1;
function patch$1(fs2) {
  if (constants$1.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs2);
  }
  if (!fs2.lutimes) {
    patchLutimes(fs2);
  }
  fs2.chown = chownFix(fs2.chown);
  fs2.fchown = chownFix(fs2.fchown);
  fs2.lchown = chownFix(fs2.lchown);
  fs2.chmod = chmodFix(fs2.chmod);
  fs2.fchmod = chmodFix(fs2.fchmod);
  fs2.lchmod = chmodFix(fs2.lchmod);
  fs2.chownSync = chownFixSync(fs2.chownSync);
  fs2.fchownSync = chownFixSync(fs2.fchownSync);
  fs2.lchownSync = chownFixSync(fs2.lchownSync);
  fs2.chmodSync = chmodFixSync(fs2.chmodSync);
  fs2.fchmodSync = chmodFixSync(fs2.fchmodSync);
  fs2.lchmodSync = chmodFixSync(fs2.lchmodSync);
  fs2.stat = statFix(fs2.stat);
  fs2.fstat = statFix(fs2.fstat);
  fs2.lstat = statFix(fs2.lstat);
  fs2.statSync = statFixSync(fs2.statSync);
  fs2.fstatSync = statFixSync(fs2.fstatSync);
  fs2.lstatSync = statFixSync(fs2.lstatSync);
  if (fs2.chmod && !fs2.lchmod) {
    fs2.lchmod = function(path2, mode, cb) {
      if (cb)
        process.nextTick(cb);
    };
    fs2.lchmodSync = function() {
    };
  }
  if (fs2.chown && !fs2.lchown) {
    fs2.lchown = function(path2, uid, gid, cb) {
      if (cb)
        process.nextTick(cb);
    };
    fs2.lchownSync = function() {
    };
  }
  if (platform$1 === "win32") {
    fs2.rename = typeof fs2.rename !== "function" ? fs2.rename : function(fs$rename) {
      function rename2(from3, to, cb) {
        var start = Date.now();
        var backoff = 0;
        fs$rename(from3, to, function CB(er) {
          if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
            setTimeout(function() {
              fs2.stat(to, function(stater, st) {
                if (stater && stater.code === "ENOENT")
                  fs$rename(from3, to, CB);
                else
                  cb(er);
              });
            }, backoff);
            if (backoff < 100)
              backoff += 10;
            return;
          }
          if (cb)
            cb(er);
        });
      }
      if (Object.setPrototypeOf)
        Object.setPrototypeOf(rename2, fs$rename);
      return rename2;
    }(fs2.rename);
  }
  fs2.read = typeof fs2.read !== "function" ? fs2.read : function(fs$read) {
    function read2(fd, buffer2, offset, length, position, callback_) {
      var callback;
      if (callback_ && typeof callback_ === "function") {
        var eagCounter = 0;
        callback = function(er, _, __) {
          if (er && er.code === "EAGAIN" && eagCounter < 10) {
            eagCounter++;
            return fs$read.call(fs2, fd, buffer2, offset, length, position, callback);
          }
          callback_.apply(this, arguments);
        };
      }
      return fs$read.call(fs2, fd, buffer2, offset, length, position, callback);
    }
    if (Object.setPrototypeOf)
      Object.setPrototypeOf(read2, fs$read);
    return read2;
  }(fs2.read);
  fs2.readSync = typeof fs2.readSync !== "function" ? fs2.readSync : function(fs$readSync) {
    return function(fd, buffer2, offset, length, position) {
      var eagCounter = 0;
      while (true) {
        try {
          return fs$readSync.call(fs2, fd, buffer2, offset, length, position);
        } catch (er) {
          if (er.code === "EAGAIN" && eagCounter < 10) {
            eagCounter++;
            continue;
          }
          throw er;
        }
      }
    };
  }(fs2.readSync);
  function patchLchmod(fs3) {
    fs3.lchmod = function(path2, mode, callback) {
      fs3.open(
        path2,
        constants$1.O_WRONLY | constants$1.O_SYMLINK,
        mode,
        function(err, fd) {
          if (err) {
            if (callback)
              callback(err);
            return;
          }
          fs3.fchmod(fd, mode, function(err2) {
            fs3.close(fd, function(err22) {
              if (callback)
                callback(err2 || err22);
            });
          });
        }
      );
    };
    fs3.lchmodSync = function(path2, mode) {
      var fd = fs3.openSync(path2, constants$1.O_WRONLY | constants$1.O_SYMLINK, mode);
      var threw = true;
      var ret;
      try {
        ret = fs3.fchmodSync(fd, mode);
        threw = false;
      } finally {
        if (threw) {
          try {
            fs3.closeSync(fd);
          } catch (er) {
          }
        } else {
          fs3.closeSync(fd);
        }
      }
      return ret;
    };
  }
  function patchLutimes(fs3) {
    if (constants$1.hasOwnProperty("O_SYMLINK") && fs3.futimes) {
      fs3.lutimes = function(path2, at, mt, cb) {
        fs3.open(path2, constants$1.O_SYMLINK, function(er, fd) {
          if (er) {
            if (cb)
              cb(er);
            return;
          }
          fs3.futimes(fd, at, mt, function(er2) {
            fs3.close(fd, function(er22) {
              if (cb)
                cb(er2 || er22);
            });
          });
        });
      };
      fs3.lutimesSync = function(path2, at, mt) {
        var fd = fs3.openSync(path2, constants$1.O_SYMLINK);
        var ret;
        var threw = true;
        try {
          ret = fs3.futimesSync(fd, at, mt);
          threw = false;
        } finally {
          if (threw) {
            try {
              fs3.closeSync(fd);
            } catch (er) {
            }
          } else {
            fs3.closeSync(fd);
          }
        }
        return ret;
      };
    } else if (fs3.futimes) {
      fs3.lutimes = function(_a, _b, _c, cb) {
        if (cb)
          process.nextTick(cb);
      };
      fs3.lutimesSync = function() {
      };
    }
  }
  function chmodFix(orig) {
    if (!orig)
      return orig;
    return function(target, mode, cb) {
      return orig.call(fs2, target, mode, function(er) {
        if (chownErOk(er))
          er = null;
        if (cb)
          cb.apply(this, arguments);
      });
    };
  }
  function chmodFixSync(orig) {
    if (!orig)
      return orig;
    return function(target, mode) {
      try {
        return orig.call(fs2, target, mode);
      } catch (er) {
        if (!chownErOk(er))
          throw er;
      }
    };
  }
  function chownFix(orig) {
    if (!orig)
      return orig;
    return function(target, uid, gid, cb) {
      return orig.call(fs2, target, uid, gid, function(er) {
        if (chownErOk(er))
          er = null;
        if (cb)
          cb.apply(this, arguments);
      });
    };
  }
  function chownFixSync(orig) {
    if (!orig)
      return orig;
    return function(target, uid, gid) {
      try {
        return orig.call(fs2, target, uid, gid);
      } catch (er) {
        if (!chownErOk(er))
          throw er;
      }
    };
  }
  function statFix(orig) {
    if (!orig)
      return orig;
    return function(target, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = null;
      }
      function callback(er, stats) {
        if (stats) {
          if (stats.uid < 0)
            stats.uid += 4294967296;
          if (stats.gid < 0)
            stats.gid += 4294967296;
        }
        if (cb)
          cb.apply(this, arguments);
      }
      return options ? orig.call(fs2, target, options, callback) : orig.call(fs2, target, callback);
    };
  }
  function statFixSync(orig) {
    if (!orig)
      return orig;
    return function(target, options) {
      var stats = options ? orig.call(fs2, target, options) : orig.call(fs2, target);
      if (stats) {
        if (stats.uid < 0)
          stats.uid += 4294967296;
        if (stats.gid < 0)
          stats.gid += 4294967296;
      }
      return stats;
    };
  }
  function chownErOk(er) {
    if (!er)
      return true;
    if (er.code === "ENOSYS")
      return true;
    var nonroot = !process.getuid || process.getuid() !== 0;
    if (nonroot) {
      if (er.code === "EINVAL" || er.code === "EPERM")
        return true;
    }
    return false;
  }
}
var Stream$2 = require$$0__default$1.default.Stream;
var legacyStreams = legacy$1;
function legacy$1(fs2) {
  return {
    ReadStream: ReadStream2,
    WriteStream: WriteStream2
  };
  function ReadStream2(path2, options) {
    if (!(this instanceof ReadStream2))
      return new ReadStream2(path2, options);
    Stream$2.call(this);
    var self2 = this;
    this.path = path2;
    this.fd = null;
    this.readable = true;
    this.paused = false;
    this.flags = "r";
    this.mode = 438;
    this.bufferSize = 64 * 1024;
    options = options || {};
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key2 = keys[index];
      this[key2] = options[key2];
    }
    if (this.encoding)
      this.setEncoding(this.encoding);
    if (this.start !== void 0) {
      if ("number" !== typeof this.start) {
        throw TypeError("start must be a Number");
      }
      if (this.end === void 0) {
        this.end = Infinity;
      } else if ("number" !== typeof this.end) {
        throw TypeError("end must be a Number");
      }
      if (this.start > this.end) {
        throw new Error("start must be <= end");
      }
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        self2._read();
      });
      return;
    }
    fs2.open(this.path, this.flags, this.mode, function(err, fd) {
      if (err) {
        self2.emit("error", err);
        self2.readable = false;
        return;
      }
      self2.fd = fd;
      self2.emit("open", fd);
      self2._read();
    });
  }
  function WriteStream2(path2, options) {
    if (!(this instanceof WriteStream2))
      return new WriteStream2(path2, options);
    Stream$2.call(this);
    this.path = path2;
    this.fd = null;
    this.writable = true;
    this.flags = "w";
    this.encoding = "binary";
    this.mode = 438;
    this.bytesWritten = 0;
    options = options || {};
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key2 = keys[index];
      this[key2] = options[key2];
    }
    if (this.start !== void 0) {
      if ("number" !== typeof this.start) {
        throw TypeError("start must be a Number");
      }
      if (this.start < 0) {
        throw new Error("start must be >= zero");
      }
      this.pos = this.start;
    }
    this.busy = false;
    this._queue = [];
    if (this.fd === null) {
      this._open = fs2.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
      this.flush();
    }
  }
}
var clone_1 = clone$1;
var getPrototypeOf = Object.getPrototypeOf || function(obj2) {
  return obj2.__proto__;
};
function clone$1(obj2) {
  if (obj2 === null || typeof obj2 !== "object")
    return obj2;
  if (obj2 instanceof Object)
    var copy3 = { __proto__: getPrototypeOf(obj2) };
  else
    var copy3 = /* @__PURE__ */ Object.create(null);
  Object.getOwnPropertyNames(obj2).forEach(function(key2) {
    Object.defineProperty(copy3, key2, Object.getOwnPropertyDescriptor(obj2, key2));
  });
  return copy3;
}
var fs$q = fs__default.default;
var polyfills = polyfills$1;
var legacy = legacyStreams;
var clone = clone_1;
var util$a = require$$1__default.default;
var gracefulQueue;
var previousSymbol;
if (typeof Symbol === "function" && typeof Symbol.for === "function") {
  gracefulQueue = Symbol.for("graceful-fs.queue");
  previousSymbol = Symbol.for("graceful-fs.previous");
} else {
  gracefulQueue = "___graceful-fs.queue";
  previousSymbol = "___graceful-fs.previous";
}
function noop$5() {
}
function publishQueue(context, queue2) {
  Object.defineProperty(context, gracefulQueue, {
    get: function() {
      return queue2;
    }
  });
}
var debug = noop$5;
if (util$a.debuglog)
  debug = util$a.debuglog("gfs4");
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
  debug = function() {
    var m = util$a.format.apply(util$a, arguments);
    m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
    console.error(m);
  };
if (!fs$q[gracefulQueue]) {
  var queue = commonjsGlobal[gracefulQueue] || [];
  publishQueue(fs$q, queue);
  fs$q.close = function(fs$close) {
    function close(fd, cb) {
      return fs$close.call(fs$q, fd, function(err) {
        if (!err) {
          resetQueue();
        }
        if (typeof cb === "function")
          cb.apply(this, arguments);
      });
    }
    Object.defineProperty(close, previousSymbol, {
      value: fs$close
    });
    return close;
  }(fs$q.close);
  fs$q.closeSync = function(fs$closeSync) {
    function closeSync(fd) {
      fs$closeSync.apply(fs$q, arguments);
      resetQueue();
    }
    Object.defineProperty(closeSync, previousSymbol, {
      value: fs$closeSync
    });
    return closeSync;
  }(fs$q.closeSync);
  if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
    process.on("exit", function() {
      debug(fs$q[gracefulQueue]);
      require$$5__default.default.equal(fs$q[gracefulQueue].length, 0);
    });
  }
}
if (!commonjsGlobal[gracefulQueue]) {
  publishQueue(commonjsGlobal, fs$q[gracefulQueue]);
}
var gracefulFs = patch(clone(fs$q));
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs$q.__patched) {
  gracefulFs = patch(fs$q);
  fs$q.__patched = true;
}
function patch(fs2) {
  polyfills(fs2);
  fs2.gracefulify = patch;
  fs2.createReadStream = createReadStream;
  fs2.createWriteStream = createWriteStream;
  var fs$readFile = fs2.readFile;
  fs2.readFile = readFile2;
  function readFile2(path2, options, cb) {
    if (typeof options === "function")
      cb = options, options = null;
    return go$readFile(path2, options, cb);
    function go$readFile(path3, options2, cb2, startTime) {
      return fs$readFile(path3, options2, function(err) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$readFile, [path3, options2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  var fs$writeFile = fs2.writeFile;
  fs2.writeFile = writeFile2;
  function writeFile2(path2, data, options, cb) {
    if (typeof options === "function")
      cb = options, options = null;
    return go$writeFile(path2, data, options, cb);
    function go$writeFile(path3, data2, options2, cb2, startTime) {
      return fs$writeFile(path3, data2, options2, function(err) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$writeFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  var fs$appendFile = fs2.appendFile;
  if (fs$appendFile)
    fs2.appendFile = appendFile;
  function appendFile(path2, data, options, cb) {
    if (typeof options === "function")
      cb = options, options = null;
    return go$appendFile(path2, data, options, cb);
    function go$appendFile(path3, data2, options2, cb2, startTime) {
      return fs$appendFile(path3, data2, options2, function(err) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$appendFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  var fs$copyFile = fs2.copyFile;
  if (fs$copyFile)
    fs2.copyFile = copyFile2;
  function copyFile2(src2, dest, flags, cb) {
    if (typeof flags === "function") {
      cb = flags;
      flags = 0;
    }
    return go$copyFile(src2, dest, flags, cb);
    function go$copyFile(src3, dest2, flags2, cb2, startTime) {
      return fs$copyFile(src3, dest2, flags2, function(err) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$copyFile, [src3, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  var fs$readdir = fs2.readdir;
  fs2.readdir = readdir;
  var noReaddirOptionVersions = /^v[0-5]\./;
  function readdir(path2, options, cb) {
    if (typeof options === "function")
      cb = options, options = null;
    var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path3, options2, cb2, startTime) {
      return fs$readdir(path3, fs$readdirCallback(
        path3,
        options2,
        cb2,
        startTime
      ));
    } : function go$readdir2(path3, options2, cb2, startTime) {
      return fs$readdir(path3, options2, fs$readdirCallback(
        path3,
        options2,
        cb2,
        startTime
      ));
    };
    return go$readdir(path2, options, cb);
    function fs$readdirCallback(path3, options2, cb2, startTime) {
      return function(err, files2) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([
            go$readdir,
            [path3, options2, cb2],
            err,
            startTime || Date.now(),
            Date.now()
          ]);
        else {
          if (files2 && files2.sort)
            files2.sort();
          if (typeof cb2 === "function")
            cb2.call(this, err, files2);
        }
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var legStreams = legacy(fs2);
    ReadStream2 = legStreams.ReadStream;
    WriteStream2 = legStreams.WriteStream;
  }
  var fs$ReadStream = fs2.ReadStream;
  if (fs$ReadStream) {
    ReadStream2.prototype = Object.create(fs$ReadStream.prototype);
    ReadStream2.prototype.open = ReadStream$open;
  }
  var fs$WriteStream = fs2.WriteStream;
  if (fs$WriteStream) {
    WriteStream2.prototype = Object.create(fs$WriteStream.prototype);
    WriteStream2.prototype.open = WriteStream$open;
  }
  Object.defineProperty(fs2, "ReadStream", {
    get: function() {
      return ReadStream2;
    },
    set: function(val) {
      ReadStream2 = val;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(fs2, "WriteStream", {
    get: function() {
      return WriteStream2;
    },
    set: function(val) {
      WriteStream2 = val;
    },
    enumerable: true,
    configurable: true
  });
  var FileReadStream = ReadStream2;
  Object.defineProperty(fs2, "FileReadStream", {
    get: function() {
      return FileReadStream;
    },
    set: function(val) {
      FileReadStream = val;
    },
    enumerable: true,
    configurable: true
  });
  var FileWriteStream = WriteStream2;
  Object.defineProperty(fs2, "FileWriteStream", {
    get: function() {
      return FileWriteStream;
    },
    set: function(val) {
      FileWriteStream = val;
    },
    enumerable: true,
    configurable: true
  });
  function ReadStream2(path2, options) {
    if (this instanceof ReadStream2)
      return fs$ReadStream.apply(this, arguments), this;
    else
      return ReadStream2.apply(Object.create(ReadStream2.prototype), arguments);
  }
  function ReadStream$open() {
    var that = this;
    open2(that.path, that.flags, that.mode, function(err, fd) {
      if (err) {
        if (that.autoClose)
          that.destroy();
        that.emit("error", err);
      } else {
        that.fd = fd;
        that.emit("open", fd);
        that.read();
      }
    });
  }
  function WriteStream2(path2, options) {
    if (this instanceof WriteStream2)
      return fs$WriteStream.apply(this, arguments), this;
    else
      return WriteStream2.apply(Object.create(WriteStream2.prototype), arguments);
  }
  function WriteStream$open() {
    var that = this;
    open2(that.path, that.flags, that.mode, function(err, fd) {
      if (err) {
        that.destroy();
        that.emit("error", err);
      } else {
        that.fd = fd;
        that.emit("open", fd);
      }
    });
  }
  function createReadStream(path2, options) {
    return new fs2.ReadStream(path2, options);
  }
  function createWriteStream(path2, options) {
    return new fs2.WriteStream(path2, options);
  }
  var fs$open = fs2.open;
  fs2.open = open2;
  function open2(path2, flags, mode, cb) {
    if (typeof mode === "function")
      cb = mode, mode = null;
    return go$open(path2, flags, mode, cb);
    function go$open(path3, flags2, mode2, cb2, startTime) {
      return fs$open(path3, flags2, mode2, function(err, fd) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$open, [path3, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  return fs2;
}
function enqueue(elem) {
  debug("ENQUEUE", elem[0].name, elem[1]);
  fs$q[gracefulQueue].push(elem);
  retry();
}
var retryTimer;
function resetQueue() {
  var now = Date.now();
  for (var i = 0; i < fs$q[gracefulQueue].length; ++i) {
    if (fs$q[gracefulQueue][i].length > 2) {
      fs$q[gracefulQueue][i][3] = now;
      fs$q[gracefulQueue][i][4] = now;
    }
  }
  retry();
}
function retry() {
  clearTimeout(retryTimer);
  retryTimer = void 0;
  if (fs$q[gracefulQueue].length === 0)
    return;
  var elem = fs$q[gracefulQueue].shift();
  var fn = elem[0];
  var args = elem[1];
  var err = elem[2];
  var startTime = elem[3];
  var lastTime = elem[4];
  if (startTime === void 0) {
    debug("RETRY", fn.name, args);
    fn.apply(null, args);
  } else if (Date.now() - startTime >= 6e4) {
    debug("TIMEOUT", fn.name, args);
    var cb = args.pop();
    if (typeof cb === "function")
      cb.call(null, err);
  } else {
    var sinceAttempt = Date.now() - lastTime;
    var sinceStart = Math.max(lastTime - startTime, 1);
    var desiredDelay = Math.min(sinceStart * 1.2, 100);
    if (sinceAttempt >= desiredDelay) {
      debug("RETRY", fn.name, args);
      fn.apply(null, args.concat([startTime]));
    } else {
      fs$q[gracefulQueue].push(elem);
    }
  }
  if (retryTimer === void 0) {
    retryTimer = setTimeout(retry, 0);
  }
}
(function(exports) {
  const u2 = universalify$2.fromCallback;
  const fs2 = gracefulFs;
  const api = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchown",
    "lchmod",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "readFile",
    "readdir",
    "readlink",
    "realpath",
    "rename",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((key2) => {
    return typeof fs2[key2] === "function";
  });
  Object.keys(fs2).forEach((key2) => {
    if (key2 === "promises") {
      return;
    }
    exports[key2] = fs2[key2];
  });
  api.forEach((method) => {
    exports[method] = u2(fs2[method]);
  });
  exports.exists = function(filename, callback) {
    if (typeof callback === "function") {
      return fs2.exists(filename, callback);
    }
    return new Promise((resolve2) => {
      return fs2.exists(filename, resolve2);
    });
  };
  exports.read = function(fd, buffer2, offset, length, position, callback) {
    if (typeof callback === "function") {
      return fs2.read(fd, buffer2, offset, length, position, callback);
    }
    return new Promise((resolve2, reject2) => {
      fs2.read(fd, buffer2, offset, length, position, (err, bytesRead, buffer3) => {
        if (err)
          return reject2(err);
        resolve2({ bytesRead, buffer: buffer3 });
      });
    });
  };
  exports.write = function(fd, buffer2, ...args) {
    if (typeof args[args.length - 1] === "function") {
      return fs2.write(fd, buffer2, ...args);
    }
    return new Promise((resolve2, reject2) => {
      fs2.write(fd, buffer2, ...args, (err, bytesWritten, buffer3) => {
        if (err)
          return reject2(err);
        resolve2({ bytesWritten, buffer: buffer3 });
      });
    });
  };
  if (typeof fs2.realpath.native === "function") {
    exports.realpath.native = u2(fs2.realpath.native);
  }
})(fs$r);
const path$n = require$$1__default$1.default;
function getRootPath(p) {
  p = path$n.normalize(path$n.resolve(p)).split(path$n.sep);
  if (p.length > 0)
    return p[0];
  return null;
}
const INVALID_PATH_CHARS = /[<>:"|?*]/;
function invalidWin32Path$2(p) {
  const rp = getRootPath(p);
  p = p.replace(rp, "");
  return INVALID_PATH_CHARS.test(p);
}
var win32 = {
  getRootPath,
  invalidWin32Path: invalidWin32Path$2
};
const fs$p = gracefulFs;
const path$m = require$$1__default$1.default;
const invalidWin32Path$1 = win32.invalidWin32Path;
const o777$1 = parseInt("0777", 8);
function mkdirs$2(p, opts, callback, made) {
  if (typeof opts === "function") {
    callback = opts;
    opts = {};
  } else if (!opts || typeof opts !== "object") {
    opts = { mode: opts };
  }
  if (process.platform === "win32" && invalidWin32Path$1(p)) {
    const errInval = new Error(p + " contains invalid WIN32 path characters.");
    errInval.code = "EINVAL";
    return callback(errInval);
  }
  let mode = opts.mode;
  const xfs = opts.fs || fs$p;
  if (mode === void 0) {
    mode = o777$1 & ~process.umask();
  }
  if (!made)
    made = null;
  callback = callback || function() {
  };
  p = path$m.resolve(p);
  xfs.mkdir(p, mode, (er) => {
    if (!er) {
      made = made || p;
      return callback(null, made);
    }
    switch (er.code) {
      case "ENOENT":
        if (path$m.dirname(p) === p)
          return callback(er);
        mkdirs$2(path$m.dirname(p), opts, (er2, made2) => {
          if (er2)
            callback(er2, made2);
          else
            mkdirs$2(p, opts, callback, made2);
        });
        break;
      default:
        xfs.stat(p, (er2, stat2) => {
          if (er2 || !stat2.isDirectory())
            callback(er, made);
          else
            callback(null, made);
        });
        break;
    }
  });
}
var mkdirs_1$1 = mkdirs$2;
const fs$o = gracefulFs;
const path$l = require$$1__default$1.default;
const invalidWin32Path = win32.invalidWin32Path;
const o777 = parseInt("0777", 8);
function mkdirsSync$2(p, opts, made) {
  if (!opts || typeof opts !== "object") {
    opts = { mode: opts };
  }
  let mode = opts.mode;
  const xfs = opts.fs || fs$o;
  if (process.platform === "win32" && invalidWin32Path(p)) {
    const errInval = new Error(p + " contains invalid WIN32 path characters.");
    errInval.code = "EINVAL";
    throw errInval;
  }
  if (mode === void 0) {
    mode = o777 & ~process.umask();
  }
  if (!made)
    made = null;
  p = path$l.resolve(p);
  try {
    xfs.mkdirSync(p, mode);
    made = made || p;
  } catch (err0) {
    if (err0.code === "ENOENT") {
      if (path$l.dirname(p) === p)
        throw err0;
      made = mkdirsSync$2(path$l.dirname(p), opts, made);
      mkdirsSync$2(p, opts, made);
    } else {
      let stat2;
      try {
        stat2 = xfs.statSync(p);
      } catch (err1) {
        throw err0;
      }
      if (!stat2.isDirectory())
        throw err0;
    }
  }
  return made;
}
var mkdirsSync_1 = mkdirsSync$2;
const u$b = universalify$2.fromCallback;
const mkdirs$1 = u$b(mkdirs_1$1);
const mkdirsSync$1 = mkdirsSync_1;
var mkdirs_1 = {
  mkdirs: mkdirs$1,
  mkdirsSync: mkdirsSync$1,
  mkdirp: mkdirs$1,
  mkdirpSync: mkdirsSync$1,
  ensureDir: mkdirs$1,
  ensureDirSync: mkdirsSync$1
};
const fs$n = gracefulFs;
const os = os__default.default;
const path$k = require$$1__default$1.default;
function hasMillisResSync() {
  let tmpfile = path$k.join("millis-test-sync" + Date.now().toString() + Math.random().toString().slice(2));
  tmpfile = path$k.join(os.tmpdir(), tmpfile);
  const d = new Date(1435410243862);
  fs$n.writeFileSync(tmpfile, "https://github.com/jprichardson/node-fs-extra/pull/141");
  const fd = fs$n.openSync(tmpfile, "r+");
  fs$n.futimesSync(fd, d, d);
  fs$n.closeSync(fd);
  return fs$n.statSync(tmpfile).mtime > 1435410243e3;
}
function hasMillisRes(callback) {
  let tmpfile = path$k.join("millis-test" + Date.now().toString() + Math.random().toString().slice(2));
  tmpfile = path$k.join(os.tmpdir(), tmpfile);
  const d = new Date(1435410243862);
  fs$n.writeFile(tmpfile, "https://github.com/jprichardson/node-fs-extra/pull/141", (err) => {
    if (err)
      return callback(err);
    fs$n.open(tmpfile, "r+", (err2, fd) => {
      if (err2)
        return callback(err2);
      fs$n.futimes(fd, d, d, (err3) => {
        if (err3)
          return callback(err3);
        fs$n.close(fd, (err4) => {
          if (err4)
            return callback(err4);
          fs$n.stat(tmpfile, (err5, stats) => {
            if (err5)
              return callback(err5);
            callback(null, stats.mtime > 1435410243e3);
          });
        });
      });
    });
  });
}
function timeRemoveMillis(timestamp) {
  if (typeof timestamp === "number") {
    return Math.floor(timestamp / 1e3) * 1e3;
  } else if (timestamp instanceof Date) {
    return new Date(Math.floor(timestamp.getTime() / 1e3) * 1e3);
  } else {
    throw new Error("fs-extra: timeRemoveMillis() unknown parameter type");
  }
}
function utimesMillis(path2, atime, mtime, callback) {
  fs$n.open(path2, "r+", (err, fd) => {
    if (err)
      return callback(err);
    fs$n.futimes(fd, atime, mtime, (futimesErr) => {
      fs$n.close(fd, (closeErr) => {
        if (callback)
          callback(futimesErr || closeErr);
      });
    });
  });
}
function utimesMillisSync(path2, atime, mtime) {
  const fd = fs$n.openSync(path2, "r+");
  fs$n.futimesSync(fd, atime, mtime);
  return fs$n.closeSync(fd);
}
var utimes$1 = {
  hasMillisRes,
  hasMillisResSync,
  timeRemoveMillis,
  utimesMillis,
  utimesMillisSync
};
const fs$m = gracefulFs;
const path$j = require$$1__default$1.default;
const NODE_VERSION_MAJOR_WITH_BIGINT = 10;
const NODE_VERSION_MINOR_WITH_BIGINT = 5;
const NODE_VERSION_PATCH_WITH_BIGINT = 0;
const nodeVersion = process.versions.node.split(".");
const nodeVersionMajor = Number.parseInt(nodeVersion[0], 10);
const nodeVersionMinor = Number.parseInt(nodeVersion[1], 10);
const nodeVersionPatch = Number.parseInt(nodeVersion[2], 10);
function nodeSupportsBigInt() {
  if (nodeVersionMajor > NODE_VERSION_MAJOR_WITH_BIGINT) {
    return true;
  } else if (nodeVersionMajor === NODE_VERSION_MAJOR_WITH_BIGINT) {
    if (nodeVersionMinor > NODE_VERSION_MINOR_WITH_BIGINT) {
      return true;
    } else if (nodeVersionMinor === NODE_VERSION_MINOR_WITH_BIGINT) {
      if (nodeVersionPatch >= NODE_VERSION_PATCH_WITH_BIGINT) {
        return true;
      }
    }
  }
  return false;
}
function getStats$2(src2, dest, cb) {
  if (nodeSupportsBigInt()) {
    fs$m.stat(src2, { bigint: true }, (err, srcStat) => {
      if (err)
        return cb(err);
      fs$m.stat(dest, { bigint: true }, (err2, destStat) => {
        if (err2) {
          if (err2.code === "ENOENT")
            return cb(null, { srcStat, destStat: null });
          return cb(err2);
        }
        return cb(null, { srcStat, destStat });
      });
    });
  } else {
    fs$m.stat(src2, (err, srcStat) => {
      if (err)
        return cb(err);
      fs$m.stat(dest, (err2, destStat) => {
        if (err2) {
          if (err2.code === "ENOENT")
            return cb(null, { srcStat, destStat: null });
          return cb(err2);
        }
        return cb(null, { srcStat, destStat });
      });
    });
  }
}
function getStatsSync(src2, dest) {
  let srcStat, destStat;
  if (nodeSupportsBigInt()) {
    srcStat = fs$m.statSync(src2, { bigint: true });
  } else {
    srcStat = fs$m.statSync(src2);
  }
  try {
    if (nodeSupportsBigInt()) {
      destStat = fs$m.statSync(dest, { bigint: true });
    } else {
      destStat = fs$m.statSync(dest);
    }
  } catch (err) {
    if (err.code === "ENOENT")
      return { srcStat, destStat: null };
    throw err;
  }
  return { srcStat, destStat };
}
function checkPaths(src2, dest, funcName, cb) {
  getStats$2(src2, dest, (err, stats) => {
    if (err)
      return cb(err);
    const { srcStat, destStat } = stats;
    if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
      return cb(new Error("Source and destination must not be the same."));
    }
    if (srcStat.isDirectory() && isSrcSubdir(src2, dest)) {
      return cb(new Error(errMsg(src2, dest, funcName)));
    }
    return cb(null, { srcStat, destStat });
  });
}
function checkPathsSync(src2, dest, funcName) {
  const { srcStat, destStat } = getStatsSync(src2, dest);
  if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
    throw new Error("Source and destination must not be the same.");
  }
  if (srcStat.isDirectory() && isSrcSubdir(src2, dest)) {
    throw new Error(errMsg(src2, dest, funcName));
  }
  return { srcStat, destStat };
}
function checkParentPaths(src2, srcStat, dest, funcName, cb) {
  const srcParent = path$j.resolve(path$j.dirname(src2));
  const destParent = path$j.resolve(path$j.dirname(dest));
  if (destParent === srcParent || destParent === path$j.parse(destParent).root)
    return cb();
  if (nodeSupportsBigInt()) {
    fs$m.stat(destParent, { bigint: true }, (err, destStat) => {
      if (err) {
        if (err.code === "ENOENT")
          return cb();
        return cb(err);
      }
      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        return cb(new Error(errMsg(src2, dest, funcName)));
      }
      return checkParentPaths(src2, srcStat, destParent, funcName, cb);
    });
  } else {
    fs$m.stat(destParent, (err, destStat) => {
      if (err) {
        if (err.code === "ENOENT")
          return cb();
        return cb(err);
      }
      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        return cb(new Error(errMsg(src2, dest, funcName)));
      }
      return checkParentPaths(src2, srcStat, destParent, funcName, cb);
    });
  }
}
function checkParentPathsSync(src2, srcStat, dest, funcName) {
  const srcParent = path$j.resolve(path$j.dirname(src2));
  const destParent = path$j.resolve(path$j.dirname(dest));
  if (destParent === srcParent || destParent === path$j.parse(destParent).root)
    return;
  let destStat;
  try {
    if (nodeSupportsBigInt()) {
      destStat = fs$m.statSync(destParent, { bigint: true });
    } else {
      destStat = fs$m.statSync(destParent);
    }
  } catch (err) {
    if (err.code === "ENOENT")
      return;
    throw err;
  }
  if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
    throw new Error(errMsg(src2, dest, funcName));
  }
  return checkParentPathsSync(src2, srcStat, destParent, funcName);
}
function isSrcSubdir(src2, dest) {
  const srcArr = path$j.resolve(src2).split(path$j.sep).filter((i) => i);
  const destArr = path$j.resolve(dest).split(path$j.sep).filter((i) => i);
  return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true);
}
function errMsg(src2, dest, funcName) {
  return `Cannot ${funcName} '${src2}' to a subdirectory of itself, '${dest}'.`;
}
var stat$4 = {
  checkPaths,
  checkPathsSync,
  checkParentPaths,
  checkParentPathsSync,
  isSrcSubdir
};
var buffer;
var hasRequiredBuffer;
function requireBuffer() {
  if (hasRequiredBuffer)
    return buffer;
  hasRequiredBuffer = 1;
  buffer = function(size) {
    if (typeof Buffer.allocUnsafe === "function") {
      try {
        return Buffer.allocUnsafe(size);
      } catch (e) {
        return new Buffer(size);
      }
    }
    return new Buffer(size);
  };
  return buffer;
}
const fs$l = gracefulFs;
const path$i = require$$1__default$1.default;
const mkdirpSync$1 = mkdirs_1.mkdirsSync;
const utimesSync = utimes$1.utimesMillisSync;
const stat$3 = stat$4;
function copySync$2(src2, dest, opts) {
  if (typeof opts === "function") {
    opts = { filter: opts };
  }
  opts = opts || {};
  opts.clobber = "clobber" in opts ? !!opts.clobber : true;
  opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
  if (opts.preserveTimestamps && process.arch === "ia32") {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
  }
  const { srcStat, destStat } = stat$3.checkPathsSync(src2, dest, "copy");
  stat$3.checkParentPathsSync(src2, srcStat, dest, "copy");
  return handleFilterAndCopy(destStat, src2, dest, opts);
}
function handleFilterAndCopy(destStat, src2, dest, opts) {
  if (opts.filter && !opts.filter(src2, dest))
    return;
  const destParent = path$i.dirname(dest);
  if (!fs$l.existsSync(destParent))
    mkdirpSync$1(destParent);
  return startCopy$1(destStat, src2, dest, opts);
}
function startCopy$1(destStat, src2, dest, opts) {
  if (opts.filter && !opts.filter(src2, dest))
    return;
  return getStats$1(destStat, src2, dest, opts);
}
function getStats$1(destStat, src2, dest, opts) {
  const statSync = opts.dereference ? fs$l.statSync : fs$l.lstatSync;
  const srcStat = statSync(src2);
  if (srcStat.isDirectory())
    return onDir$1(srcStat, destStat, src2, dest, opts);
  else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
    return onFile$1(srcStat, destStat, src2, dest, opts);
  else if (srcStat.isSymbolicLink())
    return onLink$1(destStat, src2, dest, opts);
}
function onFile$1(srcStat, destStat, src2, dest, opts) {
  if (!destStat)
    return copyFile$1(srcStat, src2, dest, opts);
  return mayCopyFile$1(srcStat, src2, dest, opts);
}
function mayCopyFile$1(srcStat, src2, dest, opts) {
  if (opts.overwrite) {
    fs$l.unlinkSync(dest);
    return copyFile$1(srcStat, src2, dest, opts);
  } else if (opts.errorOnExist) {
    throw new Error(`'${dest}' already exists`);
  }
}
function copyFile$1(srcStat, src2, dest, opts) {
  if (typeof fs$l.copyFileSync === "function") {
    fs$l.copyFileSync(src2, dest);
    fs$l.chmodSync(dest, srcStat.mode);
    if (opts.preserveTimestamps) {
      return utimesSync(dest, srcStat.atime, srcStat.mtime);
    }
    return;
  }
  return copyFileFallback$1(srcStat, src2, dest, opts);
}
function copyFileFallback$1(srcStat, src2, dest, opts) {
  const BUF_LENGTH = 64 * 1024;
  const _buff = requireBuffer()(BUF_LENGTH);
  const fdr = fs$l.openSync(src2, "r");
  const fdw = fs$l.openSync(dest, "w", srcStat.mode);
  let pos = 0;
  while (pos < srcStat.size) {
    const bytesRead = fs$l.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
    fs$l.writeSync(fdw, _buff, 0, bytesRead);
    pos += bytesRead;
  }
  if (opts.preserveTimestamps)
    fs$l.futimesSync(fdw, srcStat.atime, srcStat.mtime);
  fs$l.closeSync(fdr);
  fs$l.closeSync(fdw);
}
function onDir$1(srcStat, destStat, src2, dest, opts) {
  if (!destStat)
    return mkDirAndCopy$1(srcStat, src2, dest, opts);
  if (destStat && !destStat.isDirectory()) {
    throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src2}'.`);
  }
  return copyDir$1(src2, dest, opts);
}
function mkDirAndCopy$1(srcStat, src2, dest, opts) {
  fs$l.mkdirSync(dest);
  copyDir$1(src2, dest, opts);
  return fs$l.chmodSync(dest, srcStat.mode);
}
function copyDir$1(src2, dest, opts) {
  fs$l.readdirSync(src2).forEach((item) => copyDirItem$1(item, src2, dest, opts));
}
function copyDirItem$1(item, src2, dest, opts) {
  const srcItem = path$i.join(src2, item);
  const destItem = path$i.join(dest, item);
  const { destStat } = stat$3.checkPathsSync(srcItem, destItem, "copy");
  return startCopy$1(destStat, srcItem, destItem, opts);
}
function onLink$1(destStat, src2, dest, opts) {
  let resolvedSrc = fs$l.readlinkSync(src2);
  if (opts.dereference) {
    resolvedSrc = path$i.resolve(process.cwd(), resolvedSrc);
  }
  if (!destStat) {
    return fs$l.symlinkSync(resolvedSrc, dest);
  } else {
    let resolvedDest;
    try {
      resolvedDest = fs$l.readlinkSync(dest);
    } catch (err) {
      if (err.code === "EINVAL" || err.code === "UNKNOWN")
        return fs$l.symlinkSync(resolvedSrc, dest);
      throw err;
    }
    if (opts.dereference) {
      resolvedDest = path$i.resolve(process.cwd(), resolvedDest);
    }
    if (stat$3.isSrcSubdir(resolvedSrc, resolvedDest)) {
      throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
    }
    if (fs$l.statSync(dest).isDirectory() && stat$3.isSrcSubdir(resolvedDest, resolvedSrc)) {
      throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
    }
    return copyLink$1(resolvedSrc, dest);
  }
}
function copyLink$1(resolvedSrc, dest) {
  fs$l.unlinkSync(dest);
  return fs$l.symlinkSync(resolvedSrc, dest);
}
var copySync_1 = copySync$2;
var copySync$1 = {
  copySync: copySync_1
};
const u$a = universalify$2.fromPromise;
const fs$k = fs$r;
function pathExists$8(path2) {
  return fs$k.access(path2).then(() => true).catch(() => false);
}
var pathExists_1 = {
  pathExists: u$a(pathExists$8),
  pathExistsSync: fs$k.existsSync
};
const fs$j = gracefulFs;
const path$h = require$$1__default$1.default;
const mkdirp$1 = mkdirs_1.mkdirs;
const pathExists$7 = pathExists_1.pathExists;
const utimes = utimes$1.utimesMillis;
const stat$2 = stat$4;
function copy$2(src2, dest, opts, cb) {
  if (typeof opts === "function" && !cb) {
    cb = opts;
    opts = {};
  } else if (typeof opts === "function") {
    opts = { filter: opts };
  }
  cb = cb || function() {
  };
  opts = opts || {};
  opts.clobber = "clobber" in opts ? !!opts.clobber : true;
  opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
  if (opts.preserveTimestamps && process.arch === "ia32") {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
  }
  stat$2.checkPaths(src2, dest, "copy", (err, stats) => {
    if (err)
      return cb(err);
    const { srcStat, destStat } = stats;
    stat$2.checkParentPaths(src2, srcStat, dest, "copy", (err2) => {
      if (err2)
        return cb(err2);
      if (opts.filter)
        return handleFilter(checkParentDir, destStat, src2, dest, opts, cb);
      return checkParentDir(destStat, src2, dest, opts, cb);
    });
  });
}
function checkParentDir(destStat, src2, dest, opts, cb) {
  const destParent = path$h.dirname(dest);
  pathExists$7(destParent, (err, dirExists) => {
    if (err)
      return cb(err);
    if (dirExists)
      return startCopy(destStat, src2, dest, opts, cb);
    mkdirp$1(destParent, (err2) => {
      if (err2)
        return cb(err2);
      return startCopy(destStat, src2, dest, opts, cb);
    });
  });
}
function handleFilter(onInclude, destStat, src2, dest, opts, cb) {
  Promise.resolve(opts.filter(src2, dest)).then((include) => {
    if (include)
      return onInclude(destStat, src2, dest, opts, cb);
    return cb();
  }, (error) => cb(error));
}
function startCopy(destStat, src2, dest, opts, cb) {
  if (opts.filter)
    return handleFilter(getStats, destStat, src2, dest, opts, cb);
  return getStats(destStat, src2, dest, opts, cb);
}
function getStats(destStat, src2, dest, opts, cb) {
  const stat2 = opts.dereference ? fs$j.stat : fs$j.lstat;
  stat2(src2, (err, srcStat) => {
    if (err)
      return cb(err);
    if (srcStat.isDirectory())
      return onDir(srcStat, destStat, src2, dest, opts, cb);
    else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
      return onFile(srcStat, destStat, src2, dest, opts, cb);
    else if (srcStat.isSymbolicLink())
      return onLink(destStat, src2, dest, opts, cb);
  });
}
function onFile(srcStat, destStat, src2, dest, opts, cb) {
  if (!destStat)
    return copyFile(srcStat, src2, dest, opts, cb);
  return mayCopyFile(srcStat, src2, dest, opts, cb);
}
function mayCopyFile(srcStat, src2, dest, opts, cb) {
  if (opts.overwrite) {
    fs$j.unlink(dest, (err) => {
      if (err)
        return cb(err);
      return copyFile(srcStat, src2, dest, opts, cb);
    });
  } else if (opts.errorOnExist) {
    return cb(new Error(`'${dest}' already exists`));
  } else
    return cb();
}
function copyFile(srcStat, src2, dest, opts, cb) {
  if (typeof fs$j.copyFile === "function") {
    return fs$j.copyFile(src2, dest, (err) => {
      if (err)
        return cb(err);
      return setDestModeAndTimestamps(srcStat, dest, opts, cb);
    });
  }
  return copyFileFallback(srcStat, src2, dest, opts, cb);
}
function copyFileFallback(srcStat, src2, dest, opts, cb) {
  const rs = fs$j.createReadStream(src2);
  rs.on("error", (err) => cb(err)).once("open", () => {
    const ws = fs$j.createWriteStream(dest, { mode: srcStat.mode });
    ws.on("error", (err) => cb(err)).on("open", () => rs.pipe(ws)).once("close", () => setDestModeAndTimestamps(srcStat, dest, opts, cb));
  });
}
function setDestModeAndTimestamps(srcStat, dest, opts, cb) {
  fs$j.chmod(dest, srcStat.mode, (err) => {
    if (err)
      return cb(err);
    if (opts.preserveTimestamps) {
      return utimes(dest, srcStat.atime, srcStat.mtime, cb);
    }
    return cb();
  });
}
function onDir(srcStat, destStat, src2, dest, opts, cb) {
  if (!destStat)
    return mkDirAndCopy(srcStat, src2, dest, opts, cb);
  if (destStat && !destStat.isDirectory()) {
    return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src2}'.`));
  }
  return copyDir(src2, dest, opts, cb);
}
function mkDirAndCopy(srcStat, src2, dest, opts, cb) {
  fs$j.mkdir(dest, (err) => {
    if (err)
      return cb(err);
    copyDir(src2, dest, opts, (err2) => {
      if (err2)
        return cb(err2);
      return fs$j.chmod(dest, srcStat.mode, cb);
    });
  });
}
function copyDir(src2, dest, opts, cb) {
  fs$j.readdir(src2, (err, items) => {
    if (err)
      return cb(err);
    return copyDirItems(items, src2, dest, opts, cb);
  });
}
function copyDirItems(items, src2, dest, opts, cb) {
  const item = items.pop();
  if (!item)
    return cb();
  return copyDirItem(items, item, src2, dest, opts, cb);
}
function copyDirItem(items, item, src2, dest, opts, cb) {
  const srcItem = path$h.join(src2, item);
  const destItem = path$h.join(dest, item);
  stat$2.checkPaths(srcItem, destItem, "copy", (err, stats) => {
    if (err)
      return cb(err);
    const { destStat } = stats;
    startCopy(destStat, srcItem, destItem, opts, (err2) => {
      if (err2)
        return cb(err2);
      return copyDirItems(items, src2, dest, opts, cb);
    });
  });
}
function onLink(destStat, src2, dest, opts, cb) {
  fs$j.readlink(src2, (err, resolvedSrc) => {
    if (err)
      return cb(err);
    if (opts.dereference) {
      resolvedSrc = path$h.resolve(process.cwd(), resolvedSrc);
    }
    if (!destStat) {
      return fs$j.symlink(resolvedSrc, dest, cb);
    } else {
      fs$j.readlink(dest, (err2, resolvedDest) => {
        if (err2) {
          if (err2.code === "EINVAL" || err2.code === "UNKNOWN")
            return fs$j.symlink(resolvedSrc, dest, cb);
          return cb(err2);
        }
        if (opts.dereference) {
          resolvedDest = path$h.resolve(process.cwd(), resolvedDest);
        }
        if (stat$2.isSrcSubdir(resolvedSrc, resolvedDest)) {
          return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
        }
        if (destStat.isDirectory() && stat$2.isSrcSubdir(resolvedDest, resolvedSrc)) {
          return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
        }
        return copyLink(resolvedSrc, dest, cb);
      });
    }
  });
}
function copyLink(resolvedSrc, dest, cb) {
  fs$j.unlink(dest, (err) => {
    if (err)
      return cb(err);
    return fs$j.symlink(resolvedSrc, dest, cb);
  });
}
var copy_1 = copy$2;
const u$9 = universalify$2.fromCallback;
var copy$1 = {
  copy: u$9(copy_1)
};
const fs$i = gracefulFs;
const path$g = require$$1__default$1.default;
const assert = require$$5__default.default;
const isWindows = process.platform === "win32";
function defaults$3(options) {
  const methods2 = [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ];
  methods2.forEach((m) => {
    options[m] = options[m] || fs$i[m];
    m = m + "Sync";
    options[m] = options[m] || fs$i[m];
  });
  options.maxBusyTries = options.maxBusyTries || 3;
}
function rimraf$1(p, options, cb) {
  let busyTries = 0;
  if (typeof options === "function") {
    cb = options;
    options = {};
  }
  assert(p, "rimraf: missing path");
  assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
  assert.strictEqual(typeof cb, "function", "rimraf: callback function required");
  assert(options, "rimraf: invalid options argument provided");
  assert.strictEqual(typeof options, "object", "rimraf: options should be object");
  defaults$3(options);
  rimraf_(p, options, function CB(er) {
    if (er) {
      if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
        busyTries++;
        const time = busyTries * 100;
        return setTimeout(() => rimraf_(p, options, CB), time);
      }
      if (er.code === "ENOENT")
        er = null;
    }
    cb(er);
  });
}
function rimraf_(p, options, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === "function");
  options.lstat(p, (er, st) => {
    if (er && er.code === "ENOENT") {
      return cb(null);
    }
    if (er && er.code === "EPERM" && isWindows) {
      return fixWinEPERM(p, options, er, cb);
    }
    if (st && st.isDirectory()) {
      return rmdir(p, options, er, cb);
    }
    options.unlink(p, (er2) => {
      if (er2) {
        if (er2.code === "ENOENT") {
          return cb(null);
        }
        if (er2.code === "EPERM") {
          return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
        }
        if (er2.code === "EISDIR") {
          return rmdir(p, options, er2, cb);
        }
      }
      return cb(er2);
    });
  });
}
function fixWinEPERM(p, options, er, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === "function");
  if (er) {
    assert(er instanceof Error);
  }
  options.chmod(p, 438, (er2) => {
    if (er2) {
      cb(er2.code === "ENOENT" ? null : er);
    } else {
      options.stat(p, (er3, stats) => {
        if (er3) {
          cb(er3.code === "ENOENT" ? null : er);
        } else if (stats.isDirectory()) {
          rmdir(p, options, er, cb);
        } else {
          options.unlink(p, cb);
        }
      });
    }
  });
}
function fixWinEPERMSync(p, options, er) {
  let stats;
  assert(p);
  assert(options);
  if (er) {
    assert(er instanceof Error);
  }
  try {
    options.chmodSync(p, 438);
  } catch (er2) {
    if (er2.code === "ENOENT") {
      return;
    } else {
      throw er;
    }
  }
  try {
    stats = options.statSync(p);
  } catch (er3) {
    if (er3.code === "ENOENT") {
      return;
    } else {
      throw er;
    }
  }
  if (stats.isDirectory()) {
    rmdirSync(p, options, er);
  } else {
    options.unlinkSync(p);
  }
}
function rmdir(p, options, originalEr, cb) {
  assert(p);
  assert(options);
  if (originalEr) {
    assert(originalEr instanceof Error);
  }
  assert(typeof cb === "function");
  options.rmdir(p, (er) => {
    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) {
      rmkids(p, options, cb);
    } else if (er && er.code === "ENOTDIR") {
      cb(originalEr);
    } else {
      cb(er);
    }
  });
}
function rmkids(p, options, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === "function");
  options.readdir(p, (er, files2) => {
    if (er)
      return cb(er);
    let n = files2.length;
    let errState;
    if (n === 0)
      return options.rmdir(p, cb);
    files2.forEach((f) => {
      rimraf$1(path$g.join(p, f), options, (er2) => {
        if (errState) {
          return;
        }
        if (er2)
          return cb(errState = er2);
        if (--n === 0) {
          options.rmdir(p, cb);
        }
      });
    });
  });
}
function rimrafSync(p, options) {
  let st;
  options = options || {};
  defaults$3(options);
  assert(p, "rimraf: missing path");
  assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
  assert(options, "rimraf: missing options");
  assert.strictEqual(typeof options, "object", "rimraf: options should be object");
  try {
    st = options.lstatSync(p);
  } catch (er) {
    if (er.code === "ENOENT") {
      return;
    }
    if (er.code === "EPERM" && isWindows) {
      fixWinEPERMSync(p, options, er);
    }
  }
  try {
    if (st && st.isDirectory()) {
      rmdirSync(p, options, null);
    } else {
      options.unlinkSync(p);
    }
  } catch (er) {
    if (er.code === "ENOENT") {
      return;
    } else if (er.code === "EPERM") {
      return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
    } else if (er.code !== "EISDIR") {
      throw er;
    }
    rmdirSync(p, options, er);
  }
}
function rmdirSync(p, options, originalEr) {
  assert(p);
  assert(options);
  if (originalEr) {
    assert(originalEr instanceof Error);
  }
  try {
    options.rmdirSync(p);
  } catch (er) {
    if (er.code === "ENOTDIR") {
      throw originalEr;
    } else if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") {
      rmkidsSync(p, options);
    } else if (er.code !== "ENOENT") {
      throw er;
    }
  }
}
function rmkidsSync(p, options) {
  assert(p);
  assert(options);
  options.readdirSync(p).forEach((f) => rimrafSync(path$g.join(p, f), options));
  if (isWindows) {
    const startTime = Date.now();
    do {
      try {
        const ret = options.rmdirSync(p, options);
        return ret;
      } catch (er) {
      }
    } while (Date.now() - startTime < 500);
  } else {
    const ret = options.rmdirSync(p, options);
    return ret;
  }
}
var rimraf_1 = rimraf$1;
rimraf$1.sync = rimrafSync;
const u$8 = universalify$2.fromCallback;
const rimraf = rimraf_1;
var remove$2 = {
  remove: u$8(rimraf),
  removeSync: rimraf.sync
};
const u$7 = universalify$2.fromCallback;
const fs$h = gracefulFs;
const path$f = require$$1__default$1.default;
const mkdir$5 = mkdirs_1;
const remove$1 = remove$2;
const emptyDir = u$7(function emptyDir2(dir, callback) {
  callback = callback || function() {
  };
  fs$h.readdir(dir, (err, items) => {
    if (err)
      return mkdir$5.mkdirs(dir, callback);
    items = items.map((item) => path$f.join(dir, item));
    deleteItem();
    function deleteItem() {
      const item = items.pop();
      if (!item)
        return callback();
      remove$1.remove(item, (err2) => {
        if (err2)
          return callback(err2);
        deleteItem();
      });
    }
  });
});
function emptyDirSync(dir) {
  let items;
  try {
    items = fs$h.readdirSync(dir);
  } catch (err) {
    return mkdir$5.mkdirsSync(dir);
  }
  items.forEach((item) => {
    item = path$f.join(dir, item);
    remove$1.removeSync(item);
  });
}
var empty = {
  emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir,
  emptydir: emptyDir
};
const u$6 = universalify$2.fromCallback;
const path$e = require$$1__default$1.default;
const fs$g = gracefulFs;
const mkdir$4 = mkdirs_1;
const pathExists$6 = pathExists_1.pathExists;
function createFile(file2, callback) {
  function makeFile() {
    fs$g.writeFile(file2, "", (err) => {
      if (err)
        return callback(err);
      callback();
    });
  }
  fs$g.stat(file2, (err, stats) => {
    if (!err && stats.isFile())
      return callback();
    const dir = path$e.dirname(file2);
    pathExists$6(dir, (err2, dirExists) => {
      if (err2)
        return callback(err2);
      if (dirExists)
        return makeFile();
      mkdir$4.mkdirs(dir, (err3) => {
        if (err3)
          return callback(err3);
        makeFile();
      });
    });
  });
}
function createFileSync(file2) {
  let stats;
  try {
    stats = fs$g.statSync(file2);
  } catch (e) {
  }
  if (stats && stats.isFile())
    return;
  const dir = path$e.dirname(file2);
  if (!fs$g.existsSync(dir)) {
    mkdir$4.mkdirsSync(dir);
  }
  fs$g.writeFileSync(file2, "");
}
var file$1 = {
  createFile: u$6(createFile),
  createFileSync
};
const u$5 = universalify$2.fromCallback;
const path$d = require$$1__default$1.default;
const fs$f = gracefulFs;
const mkdir$3 = mkdirs_1;
const pathExists$5 = pathExists_1.pathExists;
function createLink(srcpath, dstpath, callback) {
  function makeLink(srcpath2, dstpath2) {
    fs$f.link(srcpath2, dstpath2, (err) => {
      if (err)
        return callback(err);
      callback(null);
    });
  }
  pathExists$5(dstpath, (err, destinationExists) => {
    if (err)
      return callback(err);
    if (destinationExists)
      return callback(null);
    fs$f.lstat(srcpath, (err2) => {
      if (err2) {
        err2.message = err2.message.replace("lstat", "ensureLink");
        return callback(err2);
      }
      const dir = path$d.dirname(dstpath);
      pathExists$5(dir, (err3, dirExists) => {
        if (err3)
          return callback(err3);
        if (dirExists)
          return makeLink(srcpath, dstpath);
        mkdir$3.mkdirs(dir, (err4) => {
          if (err4)
            return callback(err4);
          makeLink(srcpath, dstpath);
        });
      });
    });
  });
}
function createLinkSync(srcpath, dstpath) {
  const destinationExists = fs$f.existsSync(dstpath);
  if (destinationExists)
    return void 0;
  try {
    fs$f.lstatSync(srcpath);
  } catch (err) {
    err.message = err.message.replace("lstat", "ensureLink");
    throw err;
  }
  const dir = path$d.dirname(dstpath);
  const dirExists = fs$f.existsSync(dir);
  if (dirExists)
    return fs$f.linkSync(srcpath, dstpath);
  mkdir$3.mkdirsSync(dir);
  return fs$f.linkSync(srcpath, dstpath);
}
var link$2 = {
  createLink: u$5(createLink),
  createLinkSync
};
const path$c = require$$1__default$1.default;
const fs$e = gracefulFs;
const pathExists$4 = pathExists_1.pathExists;
function symlinkPaths$1(srcpath, dstpath, callback) {
  if (path$c.isAbsolute(srcpath)) {
    return fs$e.lstat(srcpath, (err) => {
      if (err) {
        err.message = err.message.replace("lstat", "ensureSymlink");
        return callback(err);
      }
      return callback(null, {
        "toCwd": srcpath,
        "toDst": srcpath
      });
    });
  } else {
    const dstdir = path$c.dirname(dstpath);
    const relativeToDst = path$c.join(dstdir, srcpath);
    return pathExists$4(relativeToDst, (err, exists) => {
      if (err)
        return callback(err);
      if (exists) {
        return callback(null, {
          "toCwd": relativeToDst,
          "toDst": srcpath
        });
      } else {
        return fs$e.lstat(srcpath, (err2) => {
          if (err2) {
            err2.message = err2.message.replace("lstat", "ensureSymlink");
            return callback(err2);
          }
          return callback(null, {
            "toCwd": srcpath,
            "toDst": path$c.relative(dstdir, srcpath)
          });
        });
      }
    });
  }
}
function symlinkPathsSync$1(srcpath, dstpath) {
  let exists;
  if (path$c.isAbsolute(srcpath)) {
    exists = fs$e.existsSync(srcpath);
    if (!exists)
      throw new Error("absolute srcpath does not exist");
    return {
      "toCwd": srcpath,
      "toDst": srcpath
    };
  } else {
    const dstdir = path$c.dirname(dstpath);
    const relativeToDst = path$c.join(dstdir, srcpath);
    exists = fs$e.existsSync(relativeToDst);
    if (exists) {
      return {
        "toCwd": relativeToDst,
        "toDst": srcpath
      };
    } else {
      exists = fs$e.existsSync(srcpath);
      if (!exists)
        throw new Error("relative srcpath does not exist");
      return {
        "toCwd": srcpath,
        "toDst": path$c.relative(dstdir, srcpath)
      };
    }
  }
}
var symlinkPaths_1 = {
  symlinkPaths: symlinkPaths$1,
  symlinkPathsSync: symlinkPathsSync$1
};
const fs$d = gracefulFs;
function symlinkType$1(srcpath, type, callback) {
  callback = typeof type === "function" ? type : callback;
  type = typeof type === "function" ? false : type;
  if (type)
    return callback(null, type);
  fs$d.lstat(srcpath, (err, stats) => {
    if (err)
      return callback(null, "file");
    type = stats && stats.isDirectory() ? "dir" : "file";
    callback(null, type);
  });
}
function symlinkTypeSync$1(srcpath, type) {
  let stats;
  if (type)
    return type;
  try {
    stats = fs$d.lstatSync(srcpath);
  } catch (e) {
    return "file";
  }
  return stats && stats.isDirectory() ? "dir" : "file";
}
var symlinkType_1 = {
  symlinkType: symlinkType$1,
  symlinkTypeSync: symlinkTypeSync$1
};
const u$4 = universalify$2.fromCallback;
const path$b = require$$1__default$1.default;
const fs$c = gracefulFs;
const _mkdirs = mkdirs_1;
const mkdirs = _mkdirs.mkdirs;
const mkdirsSync = _mkdirs.mkdirsSync;
const _symlinkPaths = symlinkPaths_1;
const symlinkPaths = _symlinkPaths.symlinkPaths;
const symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
const _symlinkType = symlinkType_1;
const symlinkType = _symlinkType.symlinkType;
const symlinkTypeSync = _symlinkType.symlinkTypeSync;
const pathExists$3 = pathExists_1.pathExists;
function createSymlink(srcpath, dstpath, type, callback) {
  callback = typeof type === "function" ? type : callback;
  type = typeof type === "function" ? false : type;
  pathExists$3(dstpath, (err, destinationExists) => {
    if (err)
      return callback(err);
    if (destinationExists)
      return callback(null);
    symlinkPaths(srcpath, dstpath, (err2, relative) => {
      if (err2)
        return callback(err2);
      srcpath = relative.toDst;
      symlinkType(relative.toCwd, type, (err3, type2) => {
        if (err3)
          return callback(err3);
        const dir = path$b.dirname(dstpath);
        pathExists$3(dir, (err4, dirExists) => {
          if (err4)
            return callback(err4);
          if (dirExists)
            return fs$c.symlink(srcpath, dstpath, type2, callback);
          mkdirs(dir, (err5) => {
            if (err5)
              return callback(err5);
            fs$c.symlink(srcpath, dstpath, type2, callback);
          });
        });
      });
    });
  });
}
function createSymlinkSync(srcpath, dstpath, type) {
  const destinationExists = fs$c.existsSync(dstpath);
  if (destinationExists)
    return void 0;
  const relative = symlinkPathsSync(srcpath, dstpath);
  srcpath = relative.toDst;
  type = symlinkTypeSync(relative.toCwd, type);
  const dir = path$b.dirname(dstpath);
  const exists = fs$c.existsSync(dir);
  if (exists)
    return fs$c.symlinkSync(srcpath, dstpath, type);
  mkdirsSync(dir);
  return fs$c.symlinkSync(srcpath, dstpath, type);
}
var symlink$1 = {
  createSymlink: u$4(createSymlink),
  createSymlinkSync
};
const file = file$1;
const link$1 = link$2;
const symlink = symlink$1;
var ensure = {
  createFile: file.createFile,
  createFileSync: file.createFileSync,
  ensureFile: file.createFile,
  ensureFileSync: file.createFileSync,
  createLink: link$1.createLink,
  createLinkSync: link$1.createLinkSync,
  ensureLink: link$1.createLink,
  ensureLinkSync: link$1.createLinkSync,
  createSymlink: symlink.createSymlink,
  createSymlinkSync: symlink.createSymlinkSync,
  ensureSymlink: symlink.createSymlink,
  ensureSymlinkSync: symlink.createSymlinkSync
};
var _fs$1;
try {
  _fs$1 = gracefulFs;
} catch (_) {
  _fs$1 = fs__default.default;
}
function readFile$2(file2, options, callback) {
  if (callback == null) {
    callback = options;
    options = {};
  }
  if (typeof options === "string") {
    options = { encoding: options };
  }
  options = options || {};
  var fs2 = options.fs || _fs$1;
  var shouldThrow = true;
  if ("throws" in options) {
    shouldThrow = options.throws;
  }
  fs2.readFile(file2, options, function(err, data) {
    if (err)
      return callback(err);
    data = stripBom$2(data);
    var obj2;
    try {
      obj2 = JSON.parse(data, options ? options.reviver : null);
    } catch (err2) {
      if (shouldThrow) {
        err2.message = file2 + ": " + err2.message;
        return callback(err2);
      } else {
        return callback(null, null);
      }
    }
    callback(null, obj2);
  });
}
function readFileSync(file2, options) {
  options = options || {};
  if (typeof options === "string") {
    options = { encoding: options };
  }
  var fs2 = options.fs || _fs$1;
  var shouldThrow = true;
  if ("throws" in options) {
    shouldThrow = options.throws;
  }
  try {
    var content = fs2.readFileSync(file2, options);
    content = stripBom$2(content);
    return JSON.parse(content, options.reviver);
  } catch (err) {
    if (shouldThrow) {
      err.message = file2 + ": " + err.message;
      throw err;
    } else {
      return null;
    }
  }
}
function stringify$2(obj2, options) {
  var spaces;
  var EOL = "\n";
  if (typeof options === "object" && options !== null) {
    if (options.spaces) {
      spaces = options.spaces;
    }
    if (options.EOL) {
      EOL = options.EOL;
    }
  }
  var str = JSON.stringify(obj2, options ? options.replacer : null, spaces);
  return str.replace(/\n/g, EOL) + EOL;
}
function writeFile(file2, obj2, options, callback) {
  if (callback == null) {
    callback = options;
    options = {};
  }
  options = options || {};
  var fs2 = options.fs || _fs$1;
  var str = "";
  try {
    str = stringify$2(obj2, options);
  } catch (err) {
    if (callback)
      callback(err, null);
    return;
  }
  fs2.writeFile(file2, str, options, callback);
}
function writeFileSync(file2, obj2, options) {
  options = options || {};
  var fs2 = options.fs || _fs$1;
  var str = stringify$2(obj2, options);
  return fs2.writeFileSync(file2, str, options);
}
function stripBom$2(content) {
  if (Buffer.isBuffer(content))
    content = content.toString("utf8");
  content = content.replace(/^\uFEFF/, "");
  return content;
}
var jsonfile$1 = {
  readFile: readFile$2,
  readFileSync,
  writeFile,
  writeFileSync
};
var jsonfile_1 = jsonfile$1;
const u$3 = universalify$2.fromCallback;
const jsonFile$3 = jsonfile_1;
var jsonfile = {
  readJson: u$3(jsonFile$3.readFile),
  readJsonSync: jsonFile$3.readFileSync,
  writeJson: u$3(jsonFile$3.writeFile),
  writeJsonSync: jsonFile$3.writeFileSync
};
const path$a = require$$1__default$1.default;
const mkdir$2 = mkdirs_1;
const pathExists$2 = pathExists_1.pathExists;
const jsonFile$2 = jsonfile;
function outputJson(file2, data, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  const dir = path$a.dirname(file2);
  pathExists$2(dir, (err, itDoes) => {
    if (err)
      return callback(err);
    if (itDoes)
      return jsonFile$2.writeJson(file2, data, options, callback);
    mkdir$2.mkdirs(dir, (err2) => {
      if (err2)
        return callback(err2);
      jsonFile$2.writeJson(file2, data, options, callback);
    });
  });
}
var outputJson_1 = outputJson;
const fs$b = gracefulFs;
const path$9 = require$$1__default$1.default;
const mkdir$1 = mkdirs_1;
const jsonFile$1 = jsonfile;
function outputJsonSync(file2, data, options) {
  const dir = path$9.dirname(file2);
  if (!fs$b.existsSync(dir)) {
    mkdir$1.mkdirsSync(dir);
  }
  jsonFile$1.writeJsonSync(file2, data, options);
}
var outputJsonSync_1 = outputJsonSync;
const u$2 = universalify$2.fromCallback;
const jsonFile = jsonfile;
jsonFile.outputJson = u$2(outputJson_1);
jsonFile.outputJsonSync = outputJsonSync_1;
jsonFile.outputJSON = jsonFile.outputJson;
jsonFile.outputJSONSync = jsonFile.outputJsonSync;
jsonFile.writeJSON = jsonFile.writeJson;
jsonFile.writeJSONSync = jsonFile.writeJsonSync;
jsonFile.readJSON = jsonFile.readJson;
jsonFile.readJSONSync = jsonFile.readJsonSync;
var json = jsonFile;
const fs$a = gracefulFs;
const path$8 = require$$1__default$1.default;
const copySync = copySync$1.copySync;
const removeSync = remove$2.removeSync;
const mkdirpSync = mkdirs_1.mkdirpSync;
const stat$1 = stat$4;
function moveSync$1(src2, dest, opts) {
  opts = opts || {};
  const overwrite = opts.overwrite || opts.clobber || false;
  const { srcStat } = stat$1.checkPathsSync(src2, dest, "move");
  stat$1.checkParentPathsSync(src2, srcStat, dest, "move");
  mkdirpSync(path$8.dirname(dest));
  return doRename$1(src2, dest, overwrite);
}
function doRename$1(src2, dest, overwrite) {
  if (overwrite) {
    removeSync(dest);
    return rename$1(src2, dest, overwrite);
  }
  if (fs$a.existsSync(dest))
    throw new Error("dest already exists.");
  return rename$1(src2, dest, overwrite);
}
function rename$1(src2, dest, overwrite) {
  try {
    fs$a.renameSync(src2, dest);
  } catch (err) {
    if (err.code !== "EXDEV")
      throw err;
    return moveAcrossDevice$1(src2, dest, overwrite);
  }
}
function moveAcrossDevice$1(src2, dest, overwrite) {
  const opts = {
    overwrite,
    errorOnExist: true
  };
  copySync(src2, dest, opts);
  return removeSync(src2);
}
var moveSync_1 = moveSync$1;
var moveSync = {
  moveSync: moveSync_1
};
const fs$9 = gracefulFs;
const path$7 = require$$1__default$1.default;
const copy = copy$1.copy;
const remove = remove$2.remove;
const mkdirp = mkdirs_1.mkdirp;
const pathExists$1 = pathExists_1.pathExists;
const stat = stat$4;
function move$1(src2, dest, opts, cb) {
  if (typeof opts === "function") {
    cb = opts;
    opts = {};
  }
  const overwrite = opts.overwrite || opts.clobber || false;
  stat.checkPaths(src2, dest, "move", (err, stats) => {
    if (err)
      return cb(err);
    const { srcStat } = stats;
    stat.checkParentPaths(src2, srcStat, dest, "move", (err2) => {
      if (err2)
        return cb(err2);
      mkdirp(path$7.dirname(dest), (err3) => {
        if (err3)
          return cb(err3);
        return doRename(src2, dest, overwrite, cb);
      });
    });
  });
}
function doRename(src2, dest, overwrite, cb) {
  if (overwrite) {
    return remove(dest, (err) => {
      if (err)
        return cb(err);
      return rename(src2, dest, overwrite, cb);
    });
  }
  pathExists$1(dest, (err, destExists) => {
    if (err)
      return cb(err);
    if (destExists)
      return cb(new Error("dest already exists."));
    return rename(src2, dest, overwrite, cb);
  });
}
function rename(src2, dest, overwrite, cb) {
  fs$9.rename(src2, dest, (err) => {
    if (!err)
      return cb();
    if (err.code !== "EXDEV")
      return cb(err);
    return moveAcrossDevice(src2, dest, overwrite, cb);
  });
}
function moveAcrossDevice(src2, dest, overwrite, cb) {
  const opts = {
    overwrite,
    errorOnExist: true
  };
  copy(src2, dest, opts, (err) => {
    if (err)
      return cb(err);
    return remove(src2, cb);
  });
}
var move_1 = move$1;
const u$1 = universalify$2.fromCallback;
var move = {
  move: u$1(move_1)
};
const u = universalify$2.fromCallback;
const fs$8 = gracefulFs;
const path$6 = require$$1__default$1.default;
const mkdir = mkdirs_1;
const pathExists = pathExists_1.pathExists;
function outputFile(file2, data, encoding, callback) {
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = "utf8";
  }
  const dir = path$6.dirname(file2);
  pathExists(dir, (err, itDoes) => {
    if (err)
      return callback(err);
    if (itDoes)
      return fs$8.writeFile(file2, data, encoding, callback);
    mkdir.mkdirs(dir, (err2) => {
      if (err2)
        return callback(err2);
      fs$8.writeFile(file2, data, encoding, callback);
    });
  });
}
function outputFileSync(file2, ...args) {
  const dir = path$6.dirname(file2);
  if (fs$8.existsSync(dir)) {
    return fs$8.writeFileSync(file2, ...args);
  }
  mkdir.mkdirsSync(dir);
  fs$8.writeFileSync(file2, ...args);
}
var output = {
  outputFile: u(outputFile),
  outputFileSync
};
(function(module2) {
  module2.exports = Object.assign(
    {},
    fs$r,
    copySync$1,
    copy$1,
    empty,
    ensure,
    json,
    mkdirs_1,
    moveSync,
    move,
    output,
    pathExists_1,
    remove$2
  );
  const fs2 = fs__default.default;
  if (Object.getOwnPropertyDescriptor(fs2, "promises")) {
    Object.defineProperty(module2.exports, "promises", {
      get() {
        return fs2.promises;
      }
    });
  }
})(lib$1);
const run_path = require$$1__namespace.join(require$$1__namespace.resolve(__dirname, ""), "../../");
const staticPath = require$$1__namespace.join(__dirname, "../../static").replace(/\\/g, "\\\\");
const appConfigDir = require$$26.app.getPath("userData");
const appConfigPath = require$$1__namespace.join(appConfigDir, "config.json");
const appCookiePath = require$$1__namespace.join(appConfigDir, "cookie.json");
const defaultDownloadDir = require$$1__namespace.join(require$$26.app.getPath("documents"), "douyin-download");
require$$26.app.getPath("exe");
const readyPromise$1 = new Promise((resolve2) => {
  if (require$$26.app.isReady()) {
    resolve2();
  } else {
    require$$26.app.once("ready", resolve2);
  }
});
async function init$3() {
  await lib$1.exports.ensureDir(appConfigDir);
  const configFileExists = await lib$1.exports.pathExists(appConfigPath);
  if (!configFileExists) {
    await lib$1.exports.outputJson(appConfigPath, [], { spaces: "	" });
  }
  await lib$1.exports.ensureDir(require$$1__namespace.join(appConfigDir, "logs"));
  return readyPromise$1;
}
const platform = os__default.default.platform();
const isProd = process.env.NODE_ENV_ELECTRON_VITE !== "development";
[platform, os__default.default.arch(), os__default.default.release()].join(" ");
function getImage(name2, template = true, highlight = false) {
  return require$$26.nativeImage.createFromPath(require$$1$1.join(staticPath, `${name2}.png`));
}
let appIcon;
function init$2() {
  getImage("icon", false, false);
  getImage("icon", false);
  appIcon = require$$1$1.join(__dirname, require$$1$1.join(staticPath, `icon.png`));
}
const winURL = !isProd ? `http://localhost:3000/#/` : require$$0__namespace.format({
  pathname: require$$1__namespace.join(__dirname, "../../build/index.html"),
  protocol: "file:",
  slashes: true
});
let mainWindow;
let readyPromise;
function createWindow() {
  mainWindow = new require$$26.BrowserWindow({
    width: 1200,
    height: 800,
    movable: true,
    vibrancy: "light",
    icon: appIcon,
    title: "\u4E0B\u8F7D\u5DE5\u5177",
    webPreferences: {
      sandbox: false,
      preload: require$$1__namespace.join(__dirname, "../preload/index.js"),
      webSecurity: isProd,
      nodeIntegration: true,
      experimentalFeatures: true,
      enableRemoteModule: true
    }
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL(winURL).then(() => {
  });
  mainWindow.on("close", (e) => {
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  readyPromise = new Promise((resolve2) => {
    mainWindow.webContents.once("did-finish-load", resolve2);
  });
}
function showWindow() {
  if (mainWindow) {
    mainWindow.show();
  }
}
async function sendData(channel, ...args) {
  if (mainWindow) {
    await readyPromise;
    mainWindow.webContents.send(channel, ...args);
  } else {
    console.log("not ready");
  }
}
async function openDevtool() {
  if (mainWindow) {
    await readyPromise;
  } else {
    console.log("not ready");
  }
}
function showHomeViewServe() {
  showWindow();
}
function exitApp() {
  require$$26.app.quit();
}
let tray = null;
function createTray() {
  tray = new require$$26.Tray(`${run_path}/assets/icons/16x16.png`);
  const contextMenu = require$$26.Menu.buildFromTemplate([
    {
      label: "\u4E0B\u8F7D",
      click: () => {
        showHomeViewServe();
      }
    },
    {
      label: "\u66F4\u65B0",
      click: () => {
      }
    },
    {
      label: "\u641C\u7D22",
      click: () => {
      }
    },
    {
      label: "\u5F00\u53D1\u6A21\u5F0F",
      click: () => {
        openDevtool();
      }
    },
    {
      label: "\u9000\u51FA",
      click: () => {
        exitApp();
      }
    }
  ]);
  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);
}
function clearTray() {
  tray.destroy();
}
var chalk$1 = { exports: {} };
var matchOperatorsRe$2 = /[|\\{}()[\]^$+*?.]/g;
var escapeStringRegexp$4 = function(str) {
  if (typeof str !== "string") {
    throw new TypeError("Expected a string");
  }
  return str.replace(matchOperatorsRe$2, "\\$&");
};
var ansiStyles = { exports: {} };
var conversions$2 = { exports: {} };
var colorName = {
  "aliceblue": [240, 248, 255],
  "antiquewhite": [250, 235, 215],
  "aqua": [0, 255, 255],
  "aquamarine": [127, 255, 212],
  "azure": [240, 255, 255],
  "beige": [245, 245, 220],
  "bisque": [255, 228, 196],
  "black": [0, 0, 0],
  "blanchedalmond": [255, 235, 205],
  "blue": [0, 0, 255],
  "blueviolet": [138, 43, 226],
  "brown": [165, 42, 42],
  "burlywood": [222, 184, 135],
  "cadetblue": [95, 158, 160],
  "chartreuse": [127, 255, 0],
  "chocolate": [210, 105, 30],
  "coral": [255, 127, 80],
  "cornflowerblue": [100, 149, 237],
  "cornsilk": [255, 248, 220],
  "crimson": [220, 20, 60],
  "cyan": [0, 255, 255],
  "darkblue": [0, 0, 139],
  "darkcyan": [0, 139, 139],
  "darkgoldenrod": [184, 134, 11],
  "darkgray": [169, 169, 169],
  "darkgreen": [0, 100, 0],
  "darkgrey": [169, 169, 169],
  "darkkhaki": [189, 183, 107],
  "darkmagenta": [139, 0, 139],
  "darkolivegreen": [85, 107, 47],
  "darkorange": [255, 140, 0],
  "darkorchid": [153, 50, 204],
  "darkred": [139, 0, 0],
  "darksalmon": [233, 150, 122],
  "darkseagreen": [143, 188, 143],
  "darkslateblue": [72, 61, 139],
  "darkslategray": [47, 79, 79],
  "darkslategrey": [47, 79, 79],
  "darkturquoise": [0, 206, 209],
  "darkviolet": [148, 0, 211],
  "deeppink": [255, 20, 147],
  "deepskyblue": [0, 191, 255],
  "dimgray": [105, 105, 105],
  "dimgrey": [105, 105, 105],
  "dodgerblue": [30, 144, 255],
  "firebrick": [178, 34, 34],
  "floralwhite": [255, 250, 240],
  "forestgreen": [34, 139, 34],
  "fuchsia": [255, 0, 255],
  "gainsboro": [220, 220, 220],
  "ghostwhite": [248, 248, 255],
  "gold": [255, 215, 0],
  "goldenrod": [218, 165, 32],
  "gray": [128, 128, 128],
  "green": [0, 128, 0],
  "greenyellow": [173, 255, 47],
  "grey": [128, 128, 128],
  "honeydew": [240, 255, 240],
  "hotpink": [255, 105, 180],
  "indianred": [205, 92, 92],
  "indigo": [75, 0, 130],
  "ivory": [255, 255, 240],
  "khaki": [240, 230, 140],
  "lavender": [230, 230, 250],
  "lavenderblush": [255, 240, 245],
  "lawngreen": [124, 252, 0],
  "lemonchiffon": [255, 250, 205],
  "lightblue": [173, 216, 230],
  "lightcoral": [240, 128, 128],
  "lightcyan": [224, 255, 255],
  "lightgoldenrodyellow": [250, 250, 210],
  "lightgray": [211, 211, 211],
  "lightgreen": [144, 238, 144],
  "lightgrey": [211, 211, 211],
  "lightpink": [255, 182, 193],
  "lightsalmon": [255, 160, 122],
  "lightseagreen": [32, 178, 170],
  "lightskyblue": [135, 206, 250],
  "lightslategray": [119, 136, 153],
  "lightslategrey": [119, 136, 153],
  "lightsteelblue": [176, 196, 222],
  "lightyellow": [255, 255, 224],
  "lime": [0, 255, 0],
  "limegreen": [50, 205, 50],
  "linen": [250, 240, 230],
  "magenta": [255, 0, 255],
  "maroon": [128, 0, 0],
  "mediumaquamarine": [102, 205, 170],
  "mediumblue": [0, 0, 205],
  "mediumorchid": [186, 85, 211],
  "mediumpurple": [147, 112, 219],
  "mediumseagreen": [60, 179, 113],
  "mediumslateblue": [123, 104, 238],
  "mediumspringgreen": [0, 250, 154],
  "mediumturquoise": [72, 209, 204],
  "mediumvioletred": [199, 21, 133],
  "midnightblue": [25, 25, 112],
  "mintcream": [245, 255, 250],
  "mistyrose": [255, 228, 225],
  "moccasin": [255, 228, 181],
  "navajowhite": [255, 222, 173],
  "navy": [0, 0, 128],
  "oldlace": [253, 245, 230],
  "olive": [128, 128, 0],
  "olivedrab": [107, 142, 35],
  "orange": [255, 165, 0],
  "orangered": [255, 69, 0],
  "orchid": [218, 112, 214],
  "palegoldenrod": [238, 232, 170],
  "palegreen": [152, 251, 152],
  "paleturquoise": [175, 238, 238],
  "palevioletred": [219, 112, 147],
  "papayawhip": [255, 239, 213],
  "peachpuff": [255, 218, 185],
  "peru": [205, 133, 63],
  "pink": [255, 192, 203],
  "plum": [221, 160, 221],
  "powderblue": [176, 224, 230],
  "purple": [128, 0, 128],
  "rebeccapurple": [102, 51, 153],
  "red": [255, 0, 0],
  "rosybrown": [188, 143, 143],
  "royalblue": [65, 105, 225],
  "saddlebrown": [139, 69, 19],
  "salmon": [250, 128, 114],
  "sandybrown": [244, 164, 96],
  "seagreen": [46, 139, 87],
  "seashell": [255, 245, 238],
  "sienna": [160, 82, 45],
  "silver": [192, 192, 192],
  "skyblue": [135, 206, 235],
  "slateblue": [106, 90, 205],
  "slategray": [112, 128, 144],
  "slategrey": [112, 128, 144],
  "snow": [255, 250, 250],
  "springgreen": [0, 255, 127],
  "steelblue": [70, 130, 180],
  "tan": [210, 180, 140],
  "teal": [0, 128, 128],
  "thistle": [216, 191, 216],
  "tomato": [255, 99, 71],
  "turquoise": [64, 224, 208],
  "violet": [238, 130, 238],
  "wheat": [245, 222, 179],
  "white": [255, 255, 255],
  "whitesmoke": [245, 245, 245],
  "yellow": [255, 255, 0],
  "yellowgreen": [154, 205, 50]
};
var cssKeywords = colorName;
var reverseKeywords = {};
for (var key in cssKeywords) {
  if (cssKeywords.hasOwnProperty(key)) {
    reverseKeywords[cssKeywords[key]] = key;
  }
}
var convert$1 = conversions$2.exports = {
  rgb: { channels: 3, labels: "rgb" },
  hsl: { channels: 3, labels: "hsl" },
  hsv: { channels: 3, labels: "hsv" },
  hwb: { channels: 3, labels: "hwb" },
  cmyk: { channels: 4, labels: "cmyk" },
  xyz: { channels: 3, labels: "xyz" },
  lab: { channels: 3, labels: "lab" },
  lch: { channels: 3, labels: "lch" },
  hex: { channels: 1, labels: ["hex"] },
  keyword: { channels: 1, labels: ["keyword"] },
  ansi16: { channels: 1, labels: ["ansi16"] },
  ansi256: { channels: 1, labels: ["ansi256"] },
  hcg: { channels: 3, labels: ["h", "c", "g"] },
  apple: { channels: 3, labels: ["r16", "g16", "b16"] },
  gray: { channels: 1, labels: ["gray"] }
};
for (var model in convert$1) {
  if (convert$1.hasOwnProperty(model)) {
    if (!("channels" in convert$1[model])) {
      throw new Error("missing channels property: " + model);
    }
    if (!("labels" in convert$1[model])) {
      throw new Error("missing channel labels property: " + model);
    }
    if (convert$1[model].labels.length !== convert$1[model].channels) {
      throw new Error("channel and label counts mismatch: " + model);
    }
    var channels = convert$1[model].channels;
    var labels = convert$1[model].labels;
    delete convert$1[model].channels;
    delete convert$1[model].labels;
    Object.defineProperty(convert$1[model], "channels", { value: channels });
    Object.defineProperty(convert$1[model], "labels", { value: labels });
  }
}
convert$1.rgb.hsl = function(rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var min = Math.min(r, g, b);
  var max = Math.max(r, g, b);
  var delta = max - min;
  var h;
  var s;
  var l;
  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }
  h = Math.min(h * 60, 360);
  if (h < 0) {
    h += 360;
  }
  l = (min + max) / 2;
  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }
  return [h, s * 100, l * 100];
};
convert$1.rgb.hsv = function(rgb) {
  var rdif;
  var gdif;
  var bdif;
  var h;
  var s;
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var v = Math.max(r, g, b);
  var diff = v - Math.min(r, g, b);
  var diffc = function(c) {
    return (v - c) / 6 / diff + 1 / 2;
  };
  if (diff === 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rdif = diffc(r);
    gdif = diffc(g);
    bdif = diffc(b);
    if (r === v) {
      h = bdif - gdif;
    } else if (g === v) {
      h = 1 / 3 + rdif - bdif;
    } else if (b === v) {
      h = 2 / 3 + gdif - rdif;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return [
    h * 360,
    s * 100,
    v * 100
  ];
};
convert$1.rgb.hwb = function(rgb) {
  var r = rgb[0];
  var g = rgb[1];
  var b = rgb[2];
  var h = convert$1.rgb.hsl(rgb)[0];
  var w = 1 / 255 * Math.min(r, Math.min(g, b));
  b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
  return [h, w * 100, b * 100];
};
convert$1.rgb.cmyk = function(rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var c;
  var m;
  var y;
  var k;
  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
};
function comparativeDistance(x, y) {
  return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
}
convert$1.rgb.keyword = function(rgb) {
  var reversed = reverseKeywords[rgb];
  if (reversed) {
    return reversed;
  }
  var currentClosestDistance = Infinity;
  var currentClosestKeyword;
  for (var keyword in cssKeywords) {
    if (cssKeywords.hasOwnProperty(keyword)) {
      var value = cssKeywords[keyword];
      var distance = comparativeDistance(rgb, value);
      if (distance < currentClosestDistance) {
        currentClosestDistance = distance;
        currentClosestKeyword = keyword;
      }
    }
  }
  return currentClosestKeyword;
};
convert$1.keyword.rgb = function(keyword) {
  return cssKeywords[keyword];
};
convert$1.rgb.xyz = function(rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
  return [x * 100, y * 100, z * 100];
};
convert$1.rgb.lab = function(rgb) {
  var xyz = convert$1.rgb.xyz(rgb);
  var x = xyz[0];
  var y = xyz[1];
  var z = xyz[2];
  var l;
  var a;
  var b;
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  l = 116 * y - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);
  return [l, a, b];
};
convert$1.hsl.rgb = function(hsl) {
  var h = hsl[0] / 360;
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var t1;
  var t2;
  var t3;
  var rgb;
  var val;
  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }
  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }
  t1 = 2 * l - t2;
  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * -(i - 1);
    if (t3 < 0) {
      t3++;
    }
    if (t3 > 1) {
      t3--;
    }
    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }
    rgb[i] = val * 255;
  }
  return rgb;
};
convert$1.hsl.hsv = function(hsl) {
  var h = hsl[0];
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var smin = s;
  var lmin = Math.max(l, 0.01);
  var sv;
  var v;
  l *= 2;
  s *= l <= 1 ? l : 2 - l;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  v = (l + s) / 2;
  sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
  return [h, sv * 100, v * 100];
};
convert$1.hsv.rgb = function(hsv) {
  var h = hsv[0] / 60;
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var hi = Math.floor(h) % 6;
  var f = h - Math.floor(h);
  var p = 255 * v * (1 - s);
  var q = 255 * v * (1 - s * f);
  var t = 255 * v * (1 - s * (1 - f));
  v *= 255;
  switch (hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
};
convert$1.hsv.hsl = function(hsv) {
  var h = hsv[0];
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var vmin = Math.max(v, 0.01);
  var lmin;
  var sl;
  var l;
  l = (2 - s) * v;
  lmin = (2 - s) * vmin;
  sl = s * vmin;
  sl /= lmin <= 1 ? lmin : 2 - lmin;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
};
convert$1.hwb.rgb = function(hwb) {
  var h = hwb[0] / 360;
  var wh = hwb[1] / 100;
  var bl2 = hwb[2] / 100;
  var ratio = wh + bl2;
  var i;
  var v;
  var f;
  var n;
  if (ratio > 1) {
    wh /= ratio;
    bl2 /= ratio;
  }
  i = Math.floor(6 * h);
  v = 1 - bl2;
  f = 6 * h - i;
  if ((i & 1) !== 0) {
    f = 1 - f;
  }
  n = wh + f * (v - wh);
  var r;
  var g;
  var b;
  switch (i) {
    default:
    case 6:
    case 0:
      r = v;
      g = n;
      b = wh;
      break;
    case 1:
      r = n;
      g = v;
      b = wh;
      break;
    case 2:
      r = wh;
      g = v;
      b = n;
      break;
    case 3:
      r = wh;
      g = n;
      b = v;
      break;
    case 4:
      r = n;
      g = wh;
      b = v;
      break;
    case 5:
      r = v;
      g = wh;
      b = n;
      break;
  }
  return [r * 255, g * 255, b * 255];
};
convert$1.cmyk.rgb = function(cmyk) {
  var c = cmyk[0] / 100;
  var m = cmyk[1] / 100;
  var y = cmyk[2] / 100;
  var k = cmyk[3] / 100;
  var r;
  var g;
  var b;
  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
};
convert$1.xyz.rgb = function(xyz) {
  var x = xyz[0] / 100;
  var y = xyz[1] / 100;
  var z = xyz[2] / 100;
  var r;
  var g;
  var b;
  r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  b = x * 0.0557 + y * -0.204 + z * 1.057;
  r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92;
  g = g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
  b = b > 31308e-7 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92;
  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);
  return [r * 255, g * 255, b * 255];
};
convert$1.xyz.lab = function(xyz) {
  var x = xyz[0];
  var y = xyz[1];
  var z = xyz[2];
  var l;
  var a;
  var b;
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  l = 116 * y - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);
  return [l, a, b];
};
convert$1.lab.xyz = function(lab) {
  var l = lab[0];
  var a = lab[1];
  var b = lab[2];
  var x;
  var y;
  var z;
  y = (l + 16) / 116;
  x = a / 500 + y;
  z = y - b / 200;
  var y2 = Math.pow(y, 3);
  var x2 = Math.pow(x, 3);
  var z2 = Math.pow(z, 3);
  y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
  x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
  z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
  x *= 95.047;
  y *= 100;
  z *= 108.883;
  return [x, y, z];
};
convert$1.lab.lch = function(lab) {
  var l = lab[0];
  var a = lab[1];
  var b = lab[2];
  var hr;
  var h;
  var c;
  hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  c = Math.sqrt(a * a + b * b);
  return [l, c, h];
};
convert$1.lch.lab = function(lch) {
  var l = lch[0];
  var c = lch[1];
  var h = lch[2];
  var a;
  var b;
  var hr;
  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
};
convert$1.rgb.ansi16 = function(args) {
  var r = args[0];
  var g = args[1];
  var b = args[2];
  var value = 1 in arguments ? arguments[1] : convert$1.rgb.hsv(args)[2];
  value = Math.round(value / 50);
  if (value === 0) {
    return 30;
  }
  var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
  if (value === 2) {
    ansi += 60;
  }
  return ansi;
};
convert$1.hsv.ansi16 = function(args) {
  return convert$1.rgb.ansi16(convert$1.hsv.rgb(args), args[2]);
};
convert$1.rgb.ansi256 = function(args) {
  var r = args[0];
  var g = args[1];
  var b = args[2];
  if (r === g && g === b) {
    if (r < 8) {
      return 16;
    }
    if (r > 248) {
      return 231;
    }
    return Math.round((r - 8) / 247 * 24) + 232;
  }
  var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
  return ansi;
};
convert$1.ansi16.rgb = function(args) {
  var color = args % 10;
  if (color === 0 || color === 7) {
    if (args > 50) {
      color += 3.5;
    }
    color = color / 10.5 * 255;
    return [color, color, color];
  }
  var mult = (~~(args > 50) + 1) * 0.5;
  var r = (color & 1) * mult * 255;
  var g = (color >> 1 & 1) * mult * 255;
  var b = (color >> 2 & 1) * mult * 255;
  return [r, g, b];
};
convert$1.ansi256.rgb = function(args) {
  if (args >= 232) {
    var c = (args - 232) * 10 + 8;
    return [c, c, c];
  }
  args -= 16;
  var rem;
  var r = Math.floor(args / 36) / 5 * 255;
  var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
  var b = rem % 6 / 5 * 255;
  return [r, g, b];
};
convert$1.rgb.hex = function(args) {
  var integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
  var string = integer.toString(16).toUpperCase();
  return "000000".substring(string.length) + string;
};
convert$1.hex.rgb = function(args) {
  var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!match) {
    return [0, 0, 0];
  }
  var colorString = match[0];
  if (match[0].length === 3) {
    colorString = colorString.split("").map(function(char) {
      return char + char;
    }).join("");
  }
  var integer = parseInt(colorString, 16);
  var r = integer >> 16 & 255;
  var g = integer >> 8 & 255;
  var b = integer & 255;
  return [r, g, b];
};
convert$1.rgb.hcg = function(rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var max = Math.max(Math.max(r, g), b);
  var min = Math.min(Math.min(r, g), b);
  var chroma = max - min;
  var grayscale;
  var hue;
  if (chroma < 1) {
    grayscale = min / (1 - chroma);
  } else {
    grayscale = 0;
  }
  if (chroma <= 0) {
    hue = 0;
  } else if (max === r) {
    hue = (g - b) / chroma % 6;
  } else if (max === g) {
    hue = 2 + (b - r) / chroma;
  } else {
    hue = 4 + (r - g) / chroma + 4;
  }
  hue /= 6;
  hue %= 1;
  return [hue * 360, chroma * 100, grayscale * 100];
};
convert$1.hsl.hcg = function(hsl) {
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var c = 1;
  var f = 0;
  if (l < 0.5) {
    c = 2 * s * l;
  } else {
    c = 2 * s * (1 - l);
  }
  if (c < 1) {
    f = (l - 0.5 * c) / (1 - c);
  }
  return [hsl[0], c * 100, f * 100];
};
convert$1.hsv.hcg = function(hsv) {
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var c = s * v;
  var f = 0;
  if (c < 1) {
    f = (v - c) / (1 - c);
  }
  return [hsv[0], c * 100, f * 100];
};
convert$1.hcg.rgb = function(hcg) {
  var h = hcg[0] / 360;
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  if (c === 0) {
    return [g * 255, g * 255, g * 255];
  }
  var pure = [0, 0, 0];
  var hi = h % 1 * 6;
  var v = hi % 1;
  var w = 1 - v;
  var mg = 0;
  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1;
      pure[1] = v;
      pure[2] = 0;
      break;
    case 1:
      pure[0] = w;
      pure[1] = 1;
      pure[2] = 0;
      break;
    case 2:
      pure[0] = 0;
      pure[1] = 1;
      pure[2] = v;
      break;
    case 3:
      pure[0] = 0;
      pure[1] = w;
      pure[2] = 1;
      break;
    case 4:
      pure[0] = v;
      pure[1] = 0;
      pure[2] = 1;
      break;
    default:
      pure[0] = 1;
      pure[1] = 0;
      pure[2] = w;
  }
  mg = (1 - c) * g;
  return [
    (c * pure[0] + mg) * 255,
    (c * pure[1] + mg) * 255,
    (c * pure[2] + mg) * 255
  ];
};
convert$1.hcg.hsv = function(hcg) {
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  var v = c + g * (1 - c);
  var f = 0;
  if (v > 0) {
    f = c / v;
  }
  return [hcg[0], f * 100, v * 100];
};
convert$1.hcg.hsl = function(hcg) {
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  var l = g * (1 - c) + 0.5 * c;
  var s = 0;
  if (l > 0 && l < 0.5) {
    s = c / (2 * l);
  } else if (l >= 0.5 && l < 1) {
    s = c / (2 * (1 - l));
  }
  return [hcg[0], s * 100, l * 100];
};
convert$1.hcg.hwb = function(hcg) {
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  var v = c + g * (1 - c);
  return [hcg[0], (v - c) * 100, (1 - v) * 100];
};
convert$1.hwb.hcg = function(hwb) {
  var w = hwb[1] / 100;
  var b = hwb[2] / 100;
  var v = 1 - b;
  var c = v - w;
  var g = 0;
  if (c < 1) {
    g = (v - c) / (1 - c);
  }
  return [hwb[0], c * 100, g * 100];
};
convert$1.apple.rgb = function(apple) {
  return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
};
convert$1.rgb.apple = function(rgb) {
  return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
};
convert$1.gray.rgb = function(args) {
  return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};
convert$1.gray.hsl = convert$1.gray.hsv = function(args) {
  return [0, 0, args[0]];
};
convert$1.gray.hwb = function(gray) {
  return [0, 100, gray[0]];
};
convert$1.gray.cmyk = function(gray) {
  return [0, 0, 0, gray[0]];
};
convert$1.gray.lab = function(gray) {
  return [gray[0], 0, 0];
};
convert$1.gray.hex = function(gray) {
  var val = Math.round(gray[0] / 100 * 255) & 255;
  var integer = (val << 16) + (val << 8) + val;
  var string = integer.toString(16).toUpperCase();
  return "000000".substring(string.length) + string;
};
convert$1.rgb.gray = function(rgb) {
  var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
  return [val / 255 * 100];
};
var conversions$1 = conversions$2.exports;
function buildGraph() {
  var graph = {};
  var models2 = Object.keys(conversions$1);
  for (var len = models2.length, i = 0; i < len; i++) {
    graph[models2[i]] = {
      distance: -1,
      parent: null
    };
  }
  return graph;
}
function deriveBFS(fromModel) {
  var graph = buildGraph();
  var queue2 = [fromModel];
  graph[fromModel].distance = 0;
  while (queue2.length) {
    var current = queue2.pop();
    var adjacents = Object.keys(conversions$1[current]);
    for (var len = adjacents.length, i = 0; i < len; i++) {
      var adjacent = adjacents[i];
      var node = graph[adjacent];
      if (node.distance === -1) {
        node.distance = graph[current].distance + 1;
        node.parent = current;
        queue2.unshift(adjacent);
      }
    }
  }
  return graph;
}
function link(from3, to) {
  return function(args) {
    return to(from3(args));
  };
}
function wrapConversion(toModel, graph) {
  var path2 = [graph[toModel].parent, toModel];
  var fn = conversions$1[graph[toModel].parent][toModel];
  var cur = graph[toModel].parent;
  while (graph[cur].parent) {
    path2.unshift(graph[cur].parent);
    fn = link(conversions$1[graph[cur].parent][cur], fn);
    cur = graph[cur].parent;
  }
  fn.conversion = path2;
  return fn;
}
var route$1 = function(fromModel) {
  var graph = deriveBFS(fromModel);
  var conversion = {};
  var models2 = Object.keys(graph);
  for (var len = models2.length, i = 0; i < len; i++) {
    var toModel = models2[i];
    var node = graph[toModel];
    if (node.parent === null) {
      continue;
    }
    conversion[toModel] = wrapConversion(toModel, graph);
  }
  return conversion;
};
var conversions = conversions$2.exports;
var route = route$1;
var convert = {};
var models = Object.keys(conversions);
function wrapRaw(fn) {
  var wrappedFn = function(args) {
    if (args === void 0 || args === null) {
      return args;
    }
    if (arguments.length > 1) {
      args = Array.prototype.slice.call(arguments);
    }
    return fn(args);
  };
  if ("conversion" in fn) {
    wrappedFn.conversion = fn.conversion;
  }
  return wrappedFn;
}
function wrapRounded(fn) {
  var wrappedFn = function(args) {
    if (args === void 0 || args === null) {
      return args;
    }
    if (arguments.length > 1) {
      args = Array.prototype.slice.call(arguments);
    }
    var result = fn(args);
    if (typeof result === "object") {
      for (var len = result.length, i = 0; i < len; i++) {
        result[i] = Math.round(result[i]);
      }
    }
    return result;
  };
  if ("conversion" in fn) {
    wrappedFn.conversion = fn.conversion;
  }
  return wrappedFn;
}
models.forEach(function(fromModel) {
  convert[fromModel] = {};
  Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
  Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
  var routes = route(fromModel);
  var routeModels = Object.keys(routes);
  routeModels.forEach(function(toModel) {
    var fn = routes[toModel];
    convert[fromModel][toModel] = wrapRounded(fn);
    convert[fromModel][toModel].raw = wrapRaw(fn);
  });
});
var colorConvert = convert;
(function(module2) {
  const colorConvert$1 = colorConvert;
  const wrapAnsi16 = (fn, offset) => function() {
    const code = fn.apply(colorConvert$1, arguments);
    return `\x1B[${code + offset}m`;
  };
  const wrapAnsi256 = (fn, offset) => function() {
    const code = fn.apply(colorConvert$1, arguments);
    return `\x1B[${38 + offset};5;${code}m`;
  };
  const wrapAnsi16m = (fn, offset) => function() {
    const rgb = fn.apply(colorConvert$1, arguments);
    return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
  };
  function assembleStyles() {
    const codes = /* @__PURE__ */ new Map();
    const styles = {
      modifier: {
        reset: [0, 0],
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        gray: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    styles.color.grey = styles.color.gray;
    for (const groupName of Object.keys(styles)) {
      const group = styles[groupName];
      for (const styleName of Object.keys(group)) {
        const style = group[styleName];
        styles[styleName] = {
          open: `\x1B[${style[0]}m`,
          close: `\x1B[${style[1]}m`
        };
        group[styleName] = styles[styleName];
        codes.set(style[0], style[1]);
      }
      Object.defineProperty(styles, groupName, {
        value: group,
        enumerable: false
      });
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
    }
    const ansi2ansi = (n) => n;
    const rgb2rgb = (r, g, b) => [r, g, b];
    styles.color.close = "\x1B[39m";
    styles.bgColor.close = "\x1B[49m";
    styles.color.ansi = {
      ansi: wrapAnsi16(ansi2ansi, 0)
    };
    styles.color.ansi256 = {
      ansi256: wrapAnsi256(ansi2ansi, 0)
    };
    styles.color.ansi16m = {
      rgb: wrapAnsi16m(rgb2rgb, 0)
    };
    styles.bgColor.ansi = {
      ansi: wrapAnsi16(ansi2ansi, 10)
    };
    styles.bgColor.ansi256 = {
      ansi256: wrapAnsi256(ansi2ansi, 10)
    };
    styles.bgColor.ansi16m = {
      rgb: wrapAnsi16m(rgb2rgb, 10)
    };
    for (let key2 of Object.keys(colorConvert$1)) {
      if (typeof colorConvert$1[key2] !== "object") {
        continue;
      }
      const suite = colorConvert$1[key2];
      if (key2 === "ansi16") {
        key2 = "ansi";
      }
      if ("ansi16" in suite) {
        styles.color.ansi[key2] = wrapAnsi16(suite.ansi16, 0);
        styles.bgColor.ansi[key2] = wrapAnsi16(suite.ansi16, 10);
      }
      if ("ansi256" in suite) {
        styles.color.ansi256[key2] = wrapAnsi256(suite.ansi256, 0);
        styles.bgColor.ansi256[key2] = wrapAnsi256(suite.ansi256, 10);
      }
      if ("rgb" in suite) {
        styles.color.ansi16m[key2] = wrapAnsi16m(suite.rgb, 0);
        styles.bgColor.ansi16m[key2] = wrapAnsi16m(suite.rgb, 10);
      }
    }
    return styles;
  }
  Object.defineProperty(module2, "exports", {
    enumerable: true,
    get: assembleStyles
  });
})(ansiStyles);
var browser$3 = {
  stdout: false,
  stderr: false
};
const TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;
const ESCAPES = /* @__PURE__ */ new Map([
  ["n", "\n"],
  ["r", "\r"],
  ["t", "	"],
  ["b", "\b"],
  ["f", "\f"],
  ["v", "\v"],
  ["0", "\0"],
  ["\\", "\\"],
  ["e", "\x1B"],
  ["a", "\x07"]
]);
function unescape(c) {
  if (c[0] === "u" && c.length === 5 || c[0] === "x" && c.length === 3) {
    return String.fromCharCode(parseInt(c.slice(1), 16));
  }
  return ESCAPES.get(c) || c;
}
function parseArguments(name2, args) {
  const results = [];
  const chunks = args.trim().split(/\s*,\s*/g);
  let matches;
  for (const chunk of chunks) {
    if (!isNaN(chunk)) {
      results.push(Number(chunk));
    } else if (matches = chunk.match(STRING_REGEX)) {
      results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape(escape) : chr));
    } else {
      throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name2}')`);
    }
  }
  return results;
}
function parseStyle(style) {
  STYLE_REGEX.lastIndex = 0;
  const results = [];
  let matches;
  while ((matches = STYLE_REGEX.exec(style)) !== null) {
    const name2 = matches[1];
    if (matches[2]) {
      const args = parseArguments(name2, matches[2]);
      results.push([name2].concat(args));
    } else {
      results.push([name2]);
    }
  }
  return results;
}
function buildStyle(chalk2, styles) {
  const enabled = {};
  for (const layer of styles) {
    for (const style of layer.styles) {
      enabled[style[0]] = layer.inverse ? null : style.slice(1);
    }
  }
  let current = chalk2;
  for (const styleName of Object.keys(enabled)) {
    if (Array.isArray(enabled[styleName])) {
      if (!(styleName in current)) {
        throw new Error(`Unknown Chalk style: ${styleName}`);
      }
      if (enabled[styleName].length > 0) {
        current = current[styleName].apply(current, enabled[styleName]);
      } else {
        current = current[styleName];
      }
    }
  }
  return current;
}
var templates = (chalk2, tmp) => {
  const styles = [];
  const chunks = [];
  let chunk = [];
  tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
    if (escapeChar) {
      chunk.push(unescape(escapeChar));
    } else if (style) {
      const str = chunk.join("");
      chunk = [];
      chunks.push(styles.length === 0 ? str : buildStyle(chalk2, styles)(str));
      styles.push({ inverse, styles: parseStyle(style) });
    } else if (close) {
      if (styles.length === 0) {
        throw new Error("Found extraneous } in Chalk template literal");
      }
      chunks.push(buildStyle(chalk2, styles)(chunk.join("")));
      chunk = [];
      styles.pop();
    } else {
      chunk.push(chr);
    }
  });
  chunks.push(chunk.join(""));
  if (styles.length > 0) {
    const errMsg2 = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
    throw new Error(errMsg2);
  }
  return chunks.join("");
};
(function(module2) {
  const escapeStringRegexp2 = escapeStringRegexp$4;
  const ansiStyles$1 = ansiStyles.exports;
  const stdoutColor = browser$3.stdout;
  const template = templates;
  const isSimpleWindowsTerm = process.platform === "win32" && !(process.env.TERM || "").toLowerCase().startsWith("xterm");
  const levelMapping = ["ansi", "ansi", "ansi256", "ansi16m"];
  const skipModels = /* @__PURE__ */ new Set(["gray"]);
  const styles = /* @__PURE__ */ Object.create(null);
  function applyOptions(obj2, options) {
    options = options || {};
    const scLevel = 0;
    obj2.level = options.level === void 0 ? scLevel : options.level;
    obj2.enabled = "enabled" in options ? options.enabled : obj2.level > 0;
  }
  function Chalk(options) {
    if (!this || !(this instanceof Chalk) || this.template) {
      const chalk2 = {};
      applyOptions(chalk2, options);
      chalk2.template = function() {
        const args = [].slice.call(arguments);
        return chalkTag.apply(null, [chalk2.template].concat(args));
      };
      Object.setPrototypeOf(chalk2, Chalk.prototype);
      Object.setPrototypeOf(chalk2.template, chalk2);
      chalk2.template.constructor = Chalk;
      return chalk2.template;
    }
    applyOptions(this, options);
  }
  if (isSimpleWindowsTerm) {
    ansiStyles$1.blue.open = "\x1B[94m";
  }
  for (const key2 of Object.keys(ansiStyles$1)) {
    ansiStyles$1[key2].closeRe = new RegExp(escapeStringRegexp2(ansiStyles$1[key2].close), "g");
    styles[key2] = {
      get() {
        const codes = ansiStyles$1[key2];
        return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key2);
      }
    };
  }
  styles.visible = {
    get() {
      return build.call(this, this._styles || [], true, "visible");
    }
  };
  ansiStyles$1.color.closeRe = new RegExp(escapeStringRegexp2(ansiStyles$1.color.close), "g");
  for (const model2 of Object.keys(ansiStyles$1.color.ansi)) {
    if (skipModels.has(model2)) {
      continue;
    }
    styles[model2] = {
      get() {
        const level = this.level;
        return function() {
          const open2 = ansiStyles$1.color[levelMapping[level]][model2].apply(null, arguments);
          const codes = {
            open: open2,
            close: ansiStyles$1.color.close,
            closeRe: ansiStyles$1.color.closeRe
          };
          return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model2);
        };
      }
    };
  }
  ansiStyles$1.bgColor.closeRe = new RegExp(escapeStringRegexp2(ansiStyles$1.bgColor.close), "g");
  for (const model2 of Object.keys(ansiStyles$1.bgColor.ansi)) {
    if (skipModels.has(model2)) {
      continue;
    }
    const bgModel = "bg" + model2[0].toUpperCase() + model2.slice(1);
    styles[bgModel] = {
      get() {
        const level = this.level;
        return function() {
          const open2 = ansiStyles$1.bgColor[levelMapping[level]][model2].apply(null, arguments);
          const codes = {
            open: open2,
            close: ansiStyles$1.bgColor.close,
            closeRe: ansiStyles$1.bgColor.closeRe
          };
          return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model2);
        };
      }
    };
  }
  const proto = Object.defineProperties(() => {
  }, styles);
  function build(_styles, _empty, key2) {
    const builder = function() {
      return applyStyle.apply(builder, arguments);
    };
    builder._styles = _styles;
    builder._empty = _empty;
    const self2 = this;
    Object.defineProperty(builder, "level", {
      enumerable: true,
      get() {
        return self2.level;
      },
      set(level) {
        self2.level = level;
      }
    });
    Object.defineProperty(builder, "enabled", {
      enumerable: true,
      get() {
        return self2.enabled;
      },
      set(enabled) {
        self2.enabled = enabled;
      }
    });
    builder.hasGrey = this.hasGrey || key2 === "gray" || key2 === "grey";
    builder.__proto__ = proto;
    return builder;
  }
  function applyStyle() {
    const args = arguments;
    const argsLen = args.length;
    let str = String(arguments[0]);
    if (argsLen === 0) {
      return "";
    }
    if (argsLen > 1) {
      for (let a = 1; a < argsLen; a++) {
        str += " " + args[a];
      }
    }
    if (!this.enabled || this.level <= 0 || !str) {
      return this._empty ? "" : str;
    }
    const originalDim = ansiStyles$1.dim.open;
    if (isSimpleWindowsTerm && this.hasGrey) {
      ansiStyles$1.dim.open = "";
    }
    for (const code of this._styles.slice().reverse()) {
      str = code.open + str.replace(code.closeRe, code.open) + code.close;
      str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
    }
    ansiStyles$1.dim.open = originalDim;
    return str;
  }
  function chalkTag(chalk2, strings) {
    if (!Array.isArray(strings)) {
      return [].slice.call(arguments, 1).join(" ");
    }
    const args = [].slice.call(arguments, 2);
    const parts = [strings.raw[0]];
    for (let i = 1; i < strings.length; i++) {
      parts.push(String(args[i - 1]).replace(/[{}\\]/g, "\\$&"));
      parts.push(String(strings.raw[i]));
    }
    return template(chalk2, parts.join(""));
  }
  Object.defineProperties(Chalk.prototype, styles);
  module2.exports = Chalk();
  module2.exports.supportsColor = stdoutColor;
  module2.exports.default = module2.exports;
})(chalk$1);
const chalk = chalk$1.exports;
var universalify$1 = {};
universalify$1.fromCallback = function(fn) {
  return Object.defineProperty(function(...args) {
    if (typeof args[args.length - 1] === "function")
      fn.apply(this, args);
    else {
      return new Promise((resolve2, reject2) => {
        fn.call(
          this,
          ...args,
          (err, res) => err != null ? reject2(err) : resolve2(res)
        );
      });
    }
  }, "name", { value: fn.name });
};
universalify$1.fromPromise = function(fn) {
  return Object.defineProperty(function(...args) {
    const cb = args[args.length - 1];
    if (typeof cb !== "function")
      return fn.apply(this, args);
    else
      fn.apply(this, args.slice(0, -1)).then((r) => cb(null, r), cb);
  }, "name", { value: fn.name });
};
function stringify$1(obj2, { EOL = "\n", finalEOL = true, replacer = null, spaces } = {}) {
  const EOF = finalEOL ? EOL : "";
  const str = JSON.stringify(obj2, replacer, spaces);
  return str.replace(/\n/g, EOL) + EOF;
}
function stripBom$1(content) {
  if (Buffer.isBuffer(content))
    content = content.toString("utf8");
  return content.replace(/^\uFEFF/, "");
}
var utils = { stringify: stringify$1, stripBom: stripBom$1 };
let _fs;
try {
  _fs = gracefulFs;
} catch (_) {
  _fs = fs__default.default;
}
const universalify = universalify$1;
const { stringify, stripBom } = utils;
async function _readFile(file2, options = {}) {
  if (typeof options === "string") {
    options = { encoding: options };
  }
  const fs2 = options.fs || _fs;
  const shouldThrow = "throws" in options ? options.throws : true;
  let data = await universalify.fromCallback(fs2.readFile)(file2, options);
  data = stripBom(data);
  let obj2;
  try {
    obj2 = JSON.parse(data, options ? options.reviver : null);
  } catch (err) {
    if (shouldThrow) {
      err.message = `${file2}: ${err.message}`;
      throw err;
    } else {
      return null;
    }
  }
  return obj2;
}
universalify.fromPromise(_readFile);
async function _writeFile(file2, obj2, options = {}) {
  const fs2 = options.fs || _fs;
  const str = stringify(obj2, options);
  await universalify.fromCallback(fs2.writeFile)(file2, str, options);
}
universalify.fromPromise(_writeFile);
var contentDisposition$2 = { exports: {} };
var safeBuffer$2 = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
(function(module2, exports) {
  var buffer2 = require$$0__default$2.default;
  var Buffer2 = buffer2.Buffer;
  function copyProps(src2, dst) {
    for (var key2 in src2) {
      dst[key2] = src2[key2];
    }
  }
  if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
    module2.exports = buffer2;
  } else {
    copyProps(buffer2, exports);
    exports.Buffer = SafeBuffer;
  }
  function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer2(arg, encodingOrOffset, length);
  }
  SafeBuffer.prototype = Object.create(Buffer2.prototype);
  copyProps(Buffer2, SafeBuffer);
  SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      throw new TypeError("Argument must not be a number");
    }
    return Buffer2(arg, encodingOrOffset, length);
  };
  SafeBuffer.alloc = function(size, fill2, encoding) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    var buf = Buffer2(size);
    if (fill2 !== void 0) {
      if (typeof encoding === "string") {
        buf.fill(fill2, encoding);
      } else {
        buf.fill(fill2);
      }
    } else {
      buf.fill(0);
    }
    return buf;
  };
  SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return Buffer2(size);
  };
  SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return buffer2.SlowBuffer(size);
  };
})(safeBuffer$2, safeBuffer$2.exports);
/*!
 * content-disposition
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
contentDisposition$2.exports = contentDisposition$1;
contentDisposition$2.exports.parse = parse$1;
var basename = require$$1__default$1.default.basename;
var Buffer$4 = safeBuffer$2.exports.Buffer;
var ENCODE_URL_ATTR_CHAR_REGEXP = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g;
var HEX_ESCAPE_REGEXP = /%[0-9A-Fa-f]{2}/;
var HEX_ESCAPE_REPLACE_REGEXP = /%([0-9A-Fa-f]{2})/g;
var NON_LATIN1_REGEXP = /[^\x20-\x7e\xa0-\xff]/g;
var QESC_REGEXP = /\\([\u0000-\u007f])/g;
var QUOTE_REGEXP = /([\\"])/g;
var PARAM_REGEXP = /;[\x09\x20]*([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*=[\x09\x20]*("(?:[\x20!\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*/g;
var TEXT_REGEXP = /^[\x20-\x7e\x80-\xff]+$/;
var TOKEN_REGEXP = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
var EXT_VALUE_REGEXP = /^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+.^_`|~-])+)$/;
var DISPOSITION_TYPE_REGEXP = /^([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*(?:$|;)/;
function contentDisposition$1(filename, options) {
  var opts = options || {};
  var type = opts.type || "attachment";
  var params = createparams(filename, opts.fallback);
  return format(new ContentDisposition(type, params));
}
function createparams(filename, fallback) {
  if (filename === void 0) {
    return;
  }
  var params = {};
  if (typeof filename !== "string") {
    throw new TypeError("filename must be a string");
  }
  if (fallback === void 0) {
    fallback = true;
  }
  if (typeof fallback !== "string" && typeof fallback !== "boolean") {
    throw new TypeError("fallback must be a string or boolean");
  }
  if (typeof fallback === "string" && NON_LATIN1_REGEXP.test(fallback)) {
    throw new TypeError("fallback must be ISO-8859-1 string");
  }
  var name2 = basename(filename);
  var isQuotedString = TEXT_REGEXP.test(name2);
  var fallbackName = typeof fallback !== "string" ? fallback && getlatin1(name2) : basename(fallback);
  var hasFallback = typeof fallbackName === "string" && fallbackName !== name2;
  if (hasFallback || !isQuotedString || HEX_ESCAPE_REGEXP.test(name2)) {
    params["filename*"] = name2;
  }
  if (isQuotedString || hasFallback) {
    params.filename = hasFallback ? fallbackName : name2;
  }
  return params;
}
function format(obj2) {
  var parameters = obj2.parameters;
  var type = obj2.type;
  if (!type || typeof type !== "string" || !TOKEN_REGEXP.test(type)) {
    throw new TypeError("invalid type");
  }
  var string = String(type).toLowerCase();
  if (parameters && typeof parameters === "object") {
    var param;
    var params = Object.keys(parameters).sort();
    for (var i = 0; i < params.length; i++) {
      param = params[i];
      var val = param.substr(-1) === "*" ? ustring(parameters[param]) : qstring(parameters[param]);
      string += "; " + param + "=" + val;
    }
  }
  return string;
}
function decodefield(str) {
  var match = EXT_VALUE_REGEXP.exec(str);
  if (!match) {
    throw new TypeError("invalid extended field value");
  }
  var charset = match[1].toLowerCase();
  var encoded = match[2];
  var value;
  var binary = encoded.replace(HEX_ESCAPE_REPLACE_REGEXP, pdecode);
  switch (charset) {
    case "iso-8859-1":
      value = getlatin1(binary);
      break;
    case "utf-8":
      value = Buffer$4.from(binary, "binary").toString("utf8");
      break;
    default:
      throw new TypeError("unsupported charset in extended field");
  }
  return value;
}
function getlatin1(val) {
  return String(val).replace(NON_LATIN1_REGEXP, "?");
}
function parse$1(string) {
  if (!string || typeof string !== "string") {
    throw new TypeError("argument string is required");
  }
  var match = DISPOSITION_TYPE_REGEXP.exec(string);
  if (!match) {
    throw new TypeError("invalid type format");
  }
  var index = match[0].length;
  var type = match[1].toLowerCase();
  var key2;
  var names = [];
  var params = {};
  var value;
  index = PARAM_REGEXP.lastIndex = match[0].substr(-1) === ";" ? index - 1 : index;
  while (match = PARAM_REGEXP.exec(string)) {
    if (match.index !== index) {
      throw new TypeError("invalid parameter format");
    }
    index += match[0].length;
    key2 = match[1].toLowerCase();
    value = match[2];
    if (names.indexOf(key2) !== -1) {
      throw new TypeError("invalid duplicate parameter");
    }
    names.push(key2);
    if (key2.indexOf("*") + 1 === key2.length) {
      key2 = key2.slice(0, -1);
      value = decodefield(value);
      params[key2] = value;
      continue;
    }
    if (typeof params[key2] === "string") {
      continue;
    }
    if (value[0] === '"') {
      value = value.substr(1, value.length - 2).replace(QESC_REGEXP, "$1");
    }
    params[key2] = value;
  }
  if (index !== -1 && index !== string.length) {
    throw new TypeError("invalid parameter format");
  }
  return new ContentDisposition(type, params);
}
function pdecode(str, hex) {
  return String.fromCharCode(parseInt(hex, 16));
}
function pencode(char) {
  return "%" + String(char).charCodeAt(0).toString(16).toUpperCase();
}
function qstring(val) {
  var str = String(val);
  return '"' + str.replace(QUOTE_REGEXP, "\\$1") + '"';
}
function ustring(val) {
  var str = String(val);
  var encoded = encodeURIComponent(str).replace(ENCODE_URL_ATTR_CHAR_REGEXP, pencode);
  return "UTF-8''" + encoded;
}
function ContentDisposition(type, parameters) {
  this.type = type;
  this.parameters = parameters;
}
var fileType$b = (input) => {
  const buf = new Uint8Array(input);
  if (!(buf && buf.length > 1)) {
    return null;
  }
  const check = (header, opts) => {
    opts = Object.assign({
      offset: 0
    }, opts);
    for (let i = 0; i < header.length; i++) {
      if (header[i] !== buf[i + opts.offset]) {
        return false;
      }
    }
    return true;
  };
  if (check([255, 216, 255])) {
    return {
      ext: "jpg",
      mime: "image/jpeg"
    };
  }
  if (check([137, 80, 78, 71, 13, 10, 26, 10])) {
    return {
      ext: "png",
      mime: "image/png"
    };
  }
  if (check([71, 73, 70])) {
    return {
      ext: "gif",
      mime: "image/gif"
    };
  }
  if (check([87, 69, 66, 80], { offset: 8 })) {
    return {
      ext: "webp",
      mime: "image/webp"
    };
  }
  if (check([70, 76, 73, 70])) {
    return {
      ext: "flif",
      mime: "image/flif"
    };
  }
  if ((check([73, 73, 42, 0]) || check([77, 77, 0, 42])) && check([67, 82], { offset: 8 })) {
    return {
      ext: "cr2",
      mime: "image/x-canon-cr2"
    };
  }
  if (check([73, 73, 42, 0]) || check([77, 77, 0, 42])) {
    return {
      ext: "tif",
      mime: "image/tiff"
    };
  }
  if (check([66, 77])) {
    return {
      ext: "bmp",
      mime: "image/bmp"
    };
  }
  if (check([73, 73, 188])) {
    return {
      ext: "jxr",
      mime: "image/vnd.ms-photo"
    };
  }
  if (check([56, 66, 80, 83])) {
    return {
      ext: "psd",
      mime: "image/vnd.adobe.photoshop"
    };
  }
  if (check([80, 75, 3, 4]) && check([109, 105, 109, 101, 116, 121, 112, 101, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 101, 112, 117, 98, 43, 122, 105, 112], { offset: 30 })) {
    return {
      ext: "epub",
      mime: "application/epub+zip"
    };
  }
  if (check([80, 75, 3, 4]) && check([77, 69, 84, 65, 45, 73, 78, 70, 47, 109, 111, 122, 105, 108, 108, 97, 46, 114, 115, 97], { offset: 30 })) {
    return {
      ext: "xpi",
      mime: "application/x-xpinstall"
    };
  }
  if (check([80, 75]) && (buf[2] === 3 || buf[2] === 5 || buf[2] === 7) && (buf[3] === 4 || buf[3] === 6 || buf[3] === 8)) {
    return {
      ext: "zip",
      mime: "application/zip"
    };
  }
  if (check([117, 115, 116, 97, 114], { offset: 257 })) {
    return {
      ext: "tar",
      mime: "application/x-tar"
    };
  }
  if (check([82, 97, 114, 33, 26, 7]) && (buf[6] === 0 || buf[6] === 1)) {
    return {
      ext: "rar",
      mime: "application/x-rar-compressed"
    };
  }
  if (check([31, 139, 8])) {
    return {
      ext: "gz",
      mime: "application/gzip"
    };
  }
  if (check([66, 90, 104])) {
    return {
      ext: "bz2",
      mime: "application/x-bzip2"
    };
  }
  if (check([55, 122, 188, 175, 39, 28])) {
    return {
      ext: "7z",
      mime: "application/x-7z-compressed"
    };
  }
  if (check([120, 1])) {
    return {
      ext: "dmg",
      mime: "application/x-apple-diskimage"
    };
  }
  if (check([0, 0, 0]) && (buf[3] === 24 || buf[3] === 32) && check([102, 116, 121, 112], { offset: 4 }) || check([51, 103, 112, 53]) || check([0, 0, 0, 28, 102, 116, 121, 112, 109, 112, 52, 50]) && check([109, 112, 52, 49, 109, 112, 52, 50, 105, 115, 111, 109], { offset: 16 }) || check([0, 0, 0, 28, 102, 116, 121, 112, 105, 115, 111, 109]) || check([0, 0, 0, 28, 102, 116, 121, 112, 109, 112, 52, 50, 0, 0, 0, 0])) {
    return {
      ext: "mp4",
      mime: "video/mp4"
    };
  }
  if (check([0, 0, 0, 28, 102, 116, 121, 112, 77, 52, 86])) {
    return {
      ext: "m4v",
      mime: "video/x-m4v"
    };
  }
  if (check([77, 84, 104, 100])) {
    return {
      ext: "mid",
      mime: "audio/midi"
    };
  }
  if (check([26, 69, 223, 163])) {
    const sliced = buf.subarray(4, 4 + 4096);
    const idPos = sliced.findIndex((el, i, arr) => arr[i] === 66 && arr[i + 1] === 130);
    if (idPos >= 0) {
      const docTypePos = idPos + 3;
      const findDocType = (type) => Array.from(type).every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));
      if (findDocType("matroska")) {
        return {
          ext: "mkv",
          mime: "video/x-matroska"
        };
      }
      if (findDocType("webm")) {
        return {
          ext: "webm",
          mime: "video/webm"
        };
      }
    }
  }
  if (check([0, 0, 0, 20, 102, 116, 121, 112, 113, 116, 32, 32]) || check([102, 114, 101, 101], { offset: 4 }) || check([102, 116, 121, 112, 113, 116, 32, 32], { offset: 4 }) || check([109, 100, 97, 116], { offset: 4 }) || check([119, 105, 100, 101], { offset: 4 })) {
    return {
      ext: "mov",
      mime: "video/quicktime"
    };
  }
  if (check([82, 73, 70, 70]) && check([65, 86, 73], { offset: 8 })) {
    return {
      ext: "avi",
      mime: "video/x-msvideo"
    };
  }
  if (check([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
    return {
      ext: "wmv",
      mime: "video/x-ms-wmv"
    };
  }
  if (check([0, 0, 1, 186])) {
    return {
      ext: "mpg",
      mime: "video/mpeg"
    };
  }
  if (check([73, 68, 51]) || check([255, 251])) {
    return {
      ext: "mp3",
      mime: "audio/mpeg"
    };
  }
  if (check([102, 116, 121, 112, 77, 52, 65], { offset: 4 }) || check([77, 52, 65, 32])) {
    return {
      ext: "m4a",
      mime: "audio/m4a"
    };
  }
  if (check([79, 112, 117, 115, 72, 101, 97, 100], { offset: 28 })) {
    return {
      ext: "opus",
      mime: "audio/opus"
    };
  }
  if (check([79, 103, 103, 83])) {
    return {
      ext: "ogg",
      mime: "audio/ogg"
    };
  }
  if (check([102, 76, 97, 67])) {
    return {
      ext: "flac",
      mime: "audio/x-flac"
    };
  }
  if (check([82, 73, 70, 70]) && check([87, 65, 86, 69], { offset: 8 })) {
    return {
      ext: "wav",
      mime: "audio/x-wav"
    };
  }
  if (check([35, 33, 65, 77, 82, 10])) {
    return {
      ext: "amr",
      mime: "audio/amr"
    };
  }
  if (check([37, 80, 68, 70])) {
    return {
      ext: "pdf",
      mime: "application/pdf"
    };
  }
  if (check([77, 90])) {
    return {
      ext: "exe",
      mime: "application/x-msdownload"
    };
  }
  if ((buf[0] === 67 || buf[0] === 70) && check([87, 83], { offset: 1 })) {
    return {
      ext: "swf",
      mime: "application/x-shockwave-flash"
    };
  }
  if (check([123, 92, 114, 116, 102])) {
    return {
      ext: "rtf",
      mime: "application/rtf"
    };
  }
  if (check([0, 97, 115, 109])) {
    return {
      ext: "wasm",
      mime: "application/wasm"
    };
  }
  if (check([119, 79, 70, 70]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
    return {
      ext: "woff",
      mime: "application/font-woff"
    };
  }
  if (check([119, 79, 70, 50]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
    return {
      ext: "woff2",
      mime: "application/font-woff"
    };
  }
  if (check([76, 80], { offset: 34 }) && (check([0, 0, 1], { offset: 8 }) || check([1, 0, 2], { offset: 8 }) || check([2, 0, 2], { offset: 8 }))) {
    return {
      ext: "eot",
      mime: "application/octet-stream"
    };
  }
  if (check([0, 1, 0, 0, 0])) {
    return {
      ext: "ttf",
      mime: "application/font-sfnt"
    };
  }
  if (check([79, 84, 84, 79, 0])) {
    return {
      ext: "otf",
      mime: "application/font-sfnt"
    };
  }
  if (check([0, 0, 1, 0])) {
    return {
      ext: "ico",
      mime: "image/x-icon"
    };
  }
  if (check([70, 76, 86, 1])) {
    return {
      ext: "flv",
      mime: "video/x-flv"
    };
  }
  if (check([37, 33])) {
    return {
      ext: "ps",
      mime: "application/postscript"
    };
  }
  if (check([253, 55, 122, 88, 90, 0])) {
    return {
      ext: "xz",
      mime: "application/x-xz"
    };
  }
  if (check([83, 81, 76, 105])) {
    return {
      ext: "sqlite",
      mime: "application/x-sqlite3"
    };
  }
  if (check([78, 69, 83, 26])) {
    return {
      ext: "nes",
      mime: "application/x-nintendo-nes-rom"
    };
  }
  if (check([67, 114, 50, 52])) {
    return {
      ext: "crx",
      mime: "application/x-google-chrome-extension"
    };
  }
  if (check([77, 83, 67, 70]) || check([73, 83, 99, 40])) {
    return {
      ext: "cab",
      mime: "application/vnd.ms-cab-compressed"
    };
  }
  if (check([33, 60, 97, 114, 99, 104, 62, 10, 100, 101, 98, 105, 97, 110, 45, 98, 105, 110, 97, 114, 121])) {
    return {
      ext: "deb",
      mime: "application/x-deb"
    };
  }
  if (check([33, 60, 97, 114, 99, 104, 62])) {
    return {
      ext: "ar",
      mime: "application/x-unix-archive"
    };
  }
  if (check([237, 171, 238, 219])) {
    return {
      ext: "rpm",
      mime: "application/x-rpm"
    };
  }
  if (check([31, 160]) || check([31, 157])) {
    return {
      ext: "Z",
      mime: "application/x-compress"
    };
  }
  if (check([76, 90, 73, 80])) {
    return {
      ext: "lz",
      mime: "application/x-lzip"
    };
  }
  if (check([208, 207, 17, 224, 161, 177, 26, 225])) {
    return {
      ext: "msi",
      mime: "application/x-msi"
    };
  }
  if (check([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) {
    return {
      ext: "mxf",
      mime: "application/mxf"
    };
  }
  if (check([66, 76, 69, 78, 68, 69, 82])) {
    return {
      ext: "blend",
      mime: "application/x-blender"
    };
  }
  return null;
};
const fileType$a = fileType$b;
const exts = /* @__PURE__ */ new Set([
  "7z",
  "bz2",
  "gz",
  "rar",
  "tar",
  "zip",
  "xz",
  "gz"
]);
var archiveType$1 = (input) => {
  const ret = fileType$a(input);
  return exts.has(ret && ret.ext) ? ret : null;
};
var fileType$9 = (input) => {
  const buf = new Uint8Array(input);
  if (!(buf && buf.length > 1)) {
    return null;
  }
  const check = (header, opts) => {
    opts = Object.assign({
      offset: 0
    }, opts);
    for (let i = 0; i < header.length; i++) {
      if (header[i] !== buf[i + opts.offset]) {
        return false;
      }
    }
    return true;
  };
  if (check([255, 216, 255])) {
    return {
      ext: "jpg",
      mime: "image/jpeg"
    };
  }
  if (check([137, 80, 78, 71, 13, 10, 26, 10])) {
    return {
      ext: "png",
      mime: "image/png"
    };
  }
  if (check([71, 73, 70])) {
    return {
      ext: "gif",
      mime: "image/gif"
    };
  }
  if (check([87, 69, 66, 80], { offset: 8 })) {
    return {
      ext: "webp",
      mime: "image/webp"
    };
  }
  if (check([70, 76, 73, 70])) {
    return {
      ext: "flif",
      mime: "image/flif"
    };
  }
  if ((check([73, 73, 42, 0]) || check([77, 77, 0, 42])) && check([67, 82], { offset: 8 })) {
    return {
      ext: "cr2",
      mime: "image/x-canon-cr2"
    };
  }
  if (check([73, 73, 42, 0]) || check([77, 77, 0, 42])) {
    return {
      ext: "tif",
      mime: "image/tiff"
    };
  }
  if (check([66, 77])) {
    return {
      ext: "bmp",
      mime: "image/bmp"
    };
  }
  if (check([73, 73, 188])) {
    return {
      ext: "jxr",
      mime: "image/vnd.ms-photo"
    };
  }
  if (check([56, 66, 80, 83])) {
    return {
      ext: "psd",
      mime: "image/vnd.adobe.photoshop"
    };
  }
  if (check([80, 75, 3, 4]) && check([109, 105, 109, 101, 116, 121, 112, 101, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 101, 112, 117, 98, 43, 122, 105, 112], { offset: 30 })) {
    return {
      ext: "epub",
      mime: "application/epub+zip"
    };
  }
  if (check([80, 75, 3, 4]) && check([77, 69, 84, 65, 45, 73, 78, 70, 47, 109, 111, 122, 105, 108, 108, 97, 46, 114, 115, 97], { offset: 30 })) {
    return {
      ext: "xpi",
      mime: "application/x-xpinstall"
    };
  }
  if (check([80, 75]) && (buf[2] === 3 || buf[2] === 5 || buf[2] === 7) && (buf[3] === 4 || buf[3] === 6 || buf[3] === 8)) {
    return {
      ext: "zip",
      mime: "application/zip"
    };
  }
  if (check([117, 115, 116, 97, 114], { offset: 257 })) {
    return {
      ext: "tar",
      mime: "application/x-tar"
    };
  }
  if (check([82, 97, 114, 33, 26, 7]) && (buf[6] === 0 || buf[6] === 1)) {
    return {
      ext: "rar",
      mime: "application/x-rar-compressed"
    };
  }
  if (check([31, 139, 8])) {
    return {
      ext: "gz",
      mime: "application/gzip"
    };
  }
  if (check([66, 90, 104])) {
    return {
      ext: "bz2",
      mime: "application/x-bzip2"
    };
  }
  if (check([55, 122, 188, 175, 39, 28])) {
    return {
      ext: "7z",
      mime: "application/x-7z-compressed"
    };
  }
  if (check([120, 1])) {
    return {
      ext: "dmg",
      mime: "application/x-apple-diskimage"
    };
  }
  if (check([0, 0, 0]) && (buf[3] === 24 || buf[3] === 32) && check([102, 116, 121, 112], { offset: 4 }) || check([51, 103, 112, 53]) || check([0, 0, 0, 28, 102, 116, 121, 112, 109, 112, 52, 50]) && check([109, 112, 52, 49, 109, 112, 52, 50, 105, 115, 111, 109], { offset: 16 }) || check([0, 0, 0, 28, 102, 116, 121, 112, 105, 115, 111, 109]) || check([0, 0, 0, 28, 102, 116, 121, 112, 109, 112, 52, 50, 0, 0, 0, 0])) {
    return {
      ext: "mp4",
      mime: "video/mp4"
    };
  }
  if (check([0, 0, 0, 28, 102, 116, 121, 112, 77, 52, 86])) {
    return {
      ext: "m4v",
      mime: "video/x-m4v"
    };
  }
  if (check([77, 84, 104, 100])) {
    return {
      ext: "mid",
      mime: "audio/midi"
    };
  }
  if (check([26, 69, 223, 163])) {
    const sliced = buf.subarray(4, 4 + 4096);
    const idPos = sliced.findIndex((el, i, arr) => arr[i] === 66 && arr[i + 1] === 130);
    if (idPos >= 0) {
      const docTypePos = idPos + 3;
      const findDocType = (type) => Array.from(type).every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));
      if (findDocType("matroska")) {
        return {
          ext: "mkv",
          mime: "video/x-matroska"
        };
      }
      if (findDocType("webm")) {
        return {
          ext: "webm",
          mime: "video/webm"
        };
      }
    }
  }
  if (check([0, 0, 0, 20, 102, 116, 121, 112, 113, 116, 32, 32]) || check([102, 114, 101, 101], { offset: 4 }) || check([102, 116, 121, 112, 113, 116, 32, 32], { offset: 4 }) || check([109, 100, 97, 116], { offset: 4 }) || check([119, 105, 100, 101], { offset: 4 })) {
    return {
      ext: "mov",
      mime: "video/quicktime"
    };
  }
  if (check([82, 73, 70, 70]) && check([65, 86, 73], { offset: 8 })) {
    return {
      ext: "avi",
      mime: "video/x-msvideo"
    };
  }
  if (check([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
    return {
      ext: "wmv",
      mime: "video/x-ms-wmv"
    };
  }
  if (check([0, 0, 1, 186])) {
    return {
      ext: "mpg",
      mime: "video/mpeg"
    };
  }
  if (check([73, 68, 51]) || check([255, 251])) {
    return {
      ext: "mp3",
      mime: "audio/mpeg"
    };
  }
  if (check([102, 116, 121, 112, 77, 52, 65], { offset: 4 }) || check([77, 52, 65, 32])) {
    return {
      ext: "m4a",
      mime: "audio/m4a"
    };
  }
  if (check([79, 112, 117, 115, 72, 101, 97, 100], { offset: 28 })) {
    return {
      ext: "opus",
      mime: "audio/opus"
    };
  }
  if (check([79, 103, 103, 83])) {
    return {
      ext: "ogg",
      mime: "audio/ogg"
    };
  }
  if (check([102, 76, 97, 67])) {
    return {
      ext: "flac",
      mime: "audio/x-flac"
    };
  }
  if (check([82, 73, 70, 70]) && check([87, 65, 86, 69], { offset: 8 })) {
    return {
      ext: "wav",
      mime: "audio/x-wav"
    };
  }
  if (check([35, 33, 65, 77, 82, 10])) {
    return {
      ext: "amr",
      mime: "audio/amr"
    };
  }
  if (check([37, 80, 68, 70])) {
    return {
      ext: "pdf",
      mime: "application/pdf"
    };
  }
  if (check([77, 90])) {
    return {
      ext: "exe",
      mime: "application/x-msdownload"
    };
  }
  if ((buf[0] === 67 || buf[0] === 70) && check([87, 83], { offset: 1 })) {
    return {
      ext: "swf",
      mime: "application/x-shockwave-flash"
    };
  }
  if (check([123, 92, 114, 116, 102])) {
    return {
      ext: "rtf",
      mime: "application/rtf"
    };
  }
  if (check([0, 97, 115, 109])) {
    return {
      ext: "wasm",
      mime: "application/wasm"
    };
  }
  if (check([119, 79, 70, 70]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
    return {
      ext: "woff",
      mime: "font/woff"
    };
  }
  if (check([119, 79, 70, 50]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
    return {
      ext: "woff2",
      mime: "font/woff2"
    };
  }
  if (check([76, 80], { offset: 34 }) && (check([0, 0, 1], { offset: 8 }) || check([1, 0, 2], { offset: 8 }) || check([2, 0, 2], { offset: 8 }))) {
    return {
      ext: "eot",
      mime: "application/octet-stream"
    };
  }
  if (check([0, 1, 0, 0, 0])) {
    return {
      ext: "ttf",
      mime: "font/ttf"
    };
  }
  if (check([79, 84, 84, 79, 0])) {
    return {
      ext: "otf",
      mime: "font/otf"
    };
  }
  if (check([0, 0, 1, 0])) {
    return {
      ext: "ico",
      mime: "image/x-icon"
    };
  }
  if (check([70, 76, 86, 1])) {
    return {
      ext: "flv",
      mime: "video/x-flv"
    };
  }
  if (check([37, 33])) {
    return {
      ext: "ps",
      mime: "application/postscript"
    };
  }
  if (check([253, 55, 122, 88, 90, 0])) {
    return {
      ext: "xz",
      mime: "application/x-xz"
    };
  }
  if (check([83, 81, 76, 105])) {
    return {
      ext: "sqlite",
      mime: "application/x-sqlite3"
    };
  }
  if (check([78, 69, 83, 26])) {
    return {
      ext: "nes",
      mime: "application/x-nintendo-nes-rom"
    };
  }
  if (check([67, 114, 50, 52])) {
    return {
      ext: "crx",
      mime: "application/x-google-chrome-extension"
    };
  }
  if (check([77, 83, 67, 70]) || check([73, 83, 99, 40])) {
    return {
      ext: "cab",
      mime: "application/vnd.ms-cab-compressed"
    };
  }
  if (check([33, 60, 97, 114, 99, 104, 62, 10, 100, 101, 98, 105, 97, 110, 45, 98, 105, 110, 97, 114, 121])) {
    return {
      ext: "deb",
      mime: "application/x-deb"
    };
  }
  if (check([33, 60, 97, 114, 99, 104, 62])) {
    return {
      ext: "ar",
      mime: "application/x-unix-archive"
    };
  }
  if (check([237, 171, 238, 219])) {
    return {
      ext: "rpm",
      mime: "application/x-rpm"
    };
  }
  if (check([31, 160]) || check([31, 157])) {
    return {
      ext: "Z",
      mime: "application/x-compress"
    };
  }
  if (check([76, 90, 73, 80])) {
    return {
      ext: "lz",
      mime: "application/x-lzip"
    };
  }
  if (check([208, 207, 17, 224, 161, 177, 26, 225])) {
    return {
      ext: "msi",
      mime: "application/x-msi"
    };
  }
  if (check([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) {
    return {
      ext: "mxf",
      mime: "application/mxf"
    };
  }
  if (check([71], { offset: 4 }) && (check([71], { offset: 192 }) || check([71], { offset: 196 }))) {
    return {
      ext: "mts",
      mime: "video/mp2t"
    };
  }
  if (check([66, 76, 69, 78, 68, 69, 82])) {
    return {
      ext: "blend",
      mime: "application/x-blender"
    };
  }
  if (check([66, 80, 71, 251])) {
    return {
      ext: "bpg",
      mime: "image/bpg"
    };
  }
  return null;
};
var isStream$4 = { exports: {} };
var isStream$3 = isStream$4.exports = function(stream2) {
  return stream2 !== null && typeof stream2 === "object" && typeof stream2.pipe === "function";
};
isStream$3.writable = function(stream2) {
  return isStream$3(stream2) && stream2.writable !== false && typeof stream2._write === "function" && typeof stream2._writableState === "object";
};
isStream$3.readable = function(stream2) {
  return isStream$3(stream2) && stream2.readable !== false && typeof stream2._read === "function" && typeof stream2._readableState === "object";
};
isStream$3.duplex = function(stream2) {
  return isStream$3.writable(stream2) && isStream$3.readable(stream2);
};
isStream$3.transform = function(stream2) {
  return isStream$3.duplex(stream2) && typeof stream2._transform === "function" && typeof stream2._transformState === "object";
};
var tarStream$1 = {};
var duplexBrowser = { exports: {} };
var processNextickArgs = { exports: {} };
if (typeof process === "undefined" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0) {
  processNextickArgs.exports = { nextTick };
} else {
  processNextickArgs.exports = process;
}
function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== "function") {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
    case 0:
    case 1:
      return process.nextTick(fn);
    case 2:
      return process.nextTick(function afterTickOne() {
        fn.call(null, arg1);
      });
    case 3:
      return process.nextTick(function afterTickTwo() {
        fn.call(null, arg1, arg2);
      });
    case 4:
      return process.nextTick(function afterTickThree() {
        fn.call(null, arg1, arg2, arg3);
      });
    default:
      args = new Array(len - 1);
      i = 0;
      while (i < args.length) {
        args[i++] = arguments[i];
      }
      return process.nextTick(function afterTick() {
        fn.apply(null, args);
      });
  }
}
var util$9 = {};
function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === "[object Array]";
}
util$9.isArray = isArray;
function isBoolean(arg) {
  return typeof arg === "boolean";
}
util$9.isBoolean = isBoolean;
function isNull(arg) {
  return arg === null;
}
util$9.isNull = isNull;
function isNullOrUndefined(arg) {
  return arg == null;
}
util$9.isNullOrUndefined = isNullOrUndefined;
function isNumber(arg) {
  return typeof arg === "number";
}
util$9.isNumber = isNumber;
function isString(arg) {
  return typeof arg === "string";
}
util$9.isString = isString;
function isSymbol(arg) {
  return typeof arg === "symbol";
}
util$9.isSymbol = isSymbol;
function isUndefined(arg) {
  return arg === void 0;
}
util$9.isUndefined = isUndefined;
function isRegExp(re) {
  return objectToString(re) === "[object RegExp]";
}
util$9.isRegExp = isRegExp;
function isObject$2(arg) {
  return typeof arg === "object" && arg !== null;
}
util$9.isObject = isObject$2;
function isDate(d) {
  return objectToString(d) === "[object Date]";
}
util$9.isDate = isDate;
function isError(e) {
  return objectToString(e) === "[object Error]" || e instanceof Error;
}
util$9.isError = isError;
function isFunction(arg) {
  return typeof arg === "function";
}
util$9.isFunction = isFunction;
function isPrimitive(arg) {
  return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
}
util$9.isPrimitive = isPrimitive;
util$9.isBuffer = require$$0__default$2.default.Buffer.isBuffer;
function objectToString(o) {
  return Object.prototype.toString.call(o);
}
var inherits_browser = { exports: {} };
if (typeof Object.create === "function") {
  inherits_browser.exports = function inherits2(ctor2, superCtor) {
    if (superCtor) {
      ctor2.super_ = superCtor;
      ctor2.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor2,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  inherits_browser.exports = function inherits2(ctor2, superCtor) {
    if (superCtor) {
      ctor2.super_ = superCtor;
      var TempCtor = function() {
      };
      TempCtor.prototype = superCtor.prototype;
      ctor2.prototype = new TempCtor();
      ctor2.prototype.constructor = ctor2;
    }
  };
}
var toString$2 = {}.toString;
var isarray = Array.isArray || function(arr) {
  return toString$2.call(arr) == "[object Array]";
};
var streamBrowser = require$$0__default$3.default.EventEmitter;
var safeBuffer$1 = { exports: {} };
(function(module2, exports) {
  var buffer2 = require$$0__default$2.default;
  var Buffer2 = buffer2.Buffer;
  function copyProps(src2, dst) {
    for (var key2 in src2) {
      dst[key2] = src2[key2];
    }
  }
  if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
    module2.exports = buffer2;
  } else {
    copyProps(buffer2, exports);
    exports.Buffer = SafeBuffer;
  }
  function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer2(arg, encodingOrOffset, length);
  }
  copyProps(Buffer2, SafeBuffer);
  SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      throw new TypeError("Argument must not be a number");
    }
    return Buffer2(arg, encodingOrOffset, length);
  };
  SafeBuffer.alloc = function(size, fill2, encoding) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    var buf = Buffer2(size);
    if (fill2 !== void 0) {
      if (typeof encoding === "string") {
        buf.fill(fill2, encoding);
      } else {
        buf.fill(fill2);
      }
    } else {
      buf.fill(0);
    }
    return buf;
  };
  SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return Buffer2(size);
  };
  SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return buffer2.SlowBuffer(size);
  };
})(safeBuffer$1, safeBuffer$1.exports);
var BufferList$1 = { exports: {} };
var hasRequiredBufferList;
function requireBufferList() {
  if (hasRequiredBufferList)
    return BufferList$1.exports;
  hasRequiredBufferList = 1;
  (function(module2) {
    function _classCallCheck2(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Buffer2 = safeBuffer$1.exports.Buffer;
    var util2 = require$$1__default.default;
    function copyBuffer(src2, target, offset) {
      src2.copy(target, offset);
    }
    module2.exports = function() {
      function BufferList2() {
        _classCallCheck2(this, BufferList2);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      BufferList2.prototype.push = function push(v) {
        var entry = { data: v, next: null };
        if (this.length > 0)
          this.tail.next = entry;
        else
          this.head = entry;
        this.tail = entry;
        ++this.length;
      };
      BufferList2.prototype.unshift = function unshift(v) {
        var entry = { data: v, next: this.head };
        if (this.length === 0)
          this.tail = entry;
        this.head = entry;
        ++this.length;
      };
      BufferList2.prototype.shift = function shift() {
        if (this.length === 0)
          return;
        var ret = this.head.data;
        if (this.length === 1)
          this.head = this.tail = null;
        else
          this.head = this.head.next;
        --this.length;
        return ret;
      };
      BufferList2.prototype.clear = function clear() {
        this.head = this.tail = null;
        this.length = 0;
      };
      BufferList2.prototype.join = function join(s) {
        if (this.length === 0)
          return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next) {
          ret += s + p.data;
        }
        return ret;
      };
      BufferList2.prototype.concat = function concat(n) {
        if (this.length === 0)
          return Buffer2.alloc(0);
        if (this.length === 1)
          return this.head.data;
        var ret = Buffer2.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          copyBuffer(p.data, ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      };
      return BufferList2;
    }();
    if (util2 && util2.inspect && util2.inspect.custom) {
      module2.exports.prototype[util2.inspect.custom] = function() {
        var obj2 = util2.inspect({ length: this.length });
        return this.constructor.name + " " + obj2;
      };
    }
  })(BufferList$1);
  return BufferList$1.exports;
}
var pna = processNextickArgs.exports;
function destroy(err, cb) {
  var _this = this;
  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;
  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }
  if (this._readableState) {
    this._readableState.destroyed = true;
  }
  if (this._writableState) {
    this._writableState.destroyed = true;
  }
  this._destroy(err || null, function(err2) {
    if (!cb && err2) {
      pna.nextTick(emitErrorNT, _this, err2);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err2);
    }
  });
  return this;
}
function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }
  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}
function emitErrorNT(self2, err) {
  self2.emit("error", err);
}
var destroy_1 = {
  destroy,
  undestroy
};
var string_decoder = {};
var safeBuffer = { exports: {} };
var hasRequiredSafeBuffer;
function requireSafeBuffer() {
  if (hasRequiredSafeBuffer)
    return safeBuffer.exports;
  hasRequiredSafeBuffer = 1;
  (function(module2, exports) {
    var buffer2 = require$$0__default$2.default;
    var Buffer2 = buffer2.Buffer;
    function copyProps(src2, dst) {
      for (var key2 in src2) {
        dst[key2] = src2[key2];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer2;
    } else {
      copyProps(buffer2, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill2, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill2 !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill2, encoding);
        } else {
          buf.fill(fill2);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer2.SlowBuffer(size);
    };
  })(safeBuffer, safeBuffer.exports);
  return safeBuffer.exports;
}
var hasRequiredString_decoder;
function requireString_decoder() {
  if (hasRequiredString_decoder)
    return string_decoder;
  hasRequiredString_decoder = 1;
  var Buffer2 = requireSafeBuffer().Buffer;
  var isEncoding = Buffer2.isEncoding || function(encoding) {
    encoding = "" + encoding;
    switch (encoding && encoding.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  function _normalizeEncoding(enc) {
    if (!enc)
      return "utf8";
    var retried;
    while (true) {
      switch (enc) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return enc;
        default:
          if (retried)
            return;
          enc = ("" + enc).toLowerCase();
          retried = true;
      }
    }
  }
  function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc)))
      throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
  }
  string_decoder.StringDecoder = StringDecoder2;
  function StringDecoder2(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch (this.encoding) {
      case "utf16le":
        this.text = utf16Text;
        this.end = utf16End;
        nb = 4;
        break;
      case "utf8":
        this.fillLast = utf8FillLast;
        nb = 4;
        break;
      case "base64":
        this.text = base64Text;
        this.end = base64End;
        nb = 3;
        break;
      default:
        this.write = simpleWrite;
        this.end = simpleEnd;
        return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer2.allocUnsafe(nb);
  }
  StringDecoder2.prototype.write = function(buf) {
    if (buf.length === 0)
      return "";
    var r;
    var i;
    if (this.lastNeed) {
      r = this.fillLast(buf);
      if (r === void 0)
        return "";
      i = this.lastNeed;
      this.lastNeed = 0;
    } else {
      i = 0;
    }
    if (i < buf.length)
      return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || "";
  };
  StringDecoder2.prototype.end = utf8End;
  StringDecoder2.prototype.text = utf8Text;
  StringDecoder2.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
  };
  function utf8CheckByte(byte) {
    if (byte <= 127)
      return 0;
    else if (byte >> 5 === 6)
      return 2;
    else if (byte >> 4 === 14)
      return 3;
    else if (byte >> 3 === 30)
      return 4;
    return byte >> 6 === 2 ? -1 : -2;
  }
  function utf8CheckIncomplete(self2, buf, i) {
    var j = buf.length - 1;
    if (j < i)
      return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self2.lastNeed = nb - 1;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self2.lastNeed = nb - 2;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) {
        if (nb === 2)
          nb = 0;
        else
          self2.lastNeed = nb - 3;
      }
      return nb;
    }
    return 0;
  }
  function utf8CheckExtraBytes(self2, buf, p) {
    if ((buf[0] & 192) !== 128) {
      self2.lastNeed = 0;
      return "\uFFFD";
    }
    if (self2.lastNeed > 1 && buf.length > 1) {
      if ((buf[1] & 192) !== 128) {
        self2.lastNeed = 1;
        return "\uFFFD";
      }
      if (self2.lastNeed > 2 && buf.length > 2) {
        if ((buf[2] & 192) !== 128) {
          self2.lastNeed = 2;
          return "\uFFFD";
        }
      }
    }
  }
  function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf);
    if (r !== void 0)
      return r;
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, p, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
  }
  function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed)
      return buf.toString("utf8", i);
    this.lastTotal = total;
    var end2 = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end2);
    return buf.toString("utf8", i, end2);
  }
  function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + "\uFFFD";
    return r;
  }
  function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
      var r = buf.toString("utf16le", i);
      if (r) {
        var c = r.charCodeAt(r.length - 1);
        if (c >= 55296 && c <= 56319) {
          this.lastNeed = 2;
          this.lastTotal = 4;
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
          return r.slice(0, -1);
        }
      }
      return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString("utf16le", i, buf.length - 1);
  }
  function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
      var end2 = this.lastTotal - this.lastNeed;
      return r + this.lastChar.toString("utf16le", 0, end2);
    }
    return r;
  }
  function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0)
      return buf.toString("base64", i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
      this.lastChar[0] = buf[buf.length - 1];
    } else {
      this.lastChar[0] = buf[buf.length - 2];
      this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i, buf.length - n);
  }
  function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    return r;
  }
  function simpleWrite(buf) {
    return buf.toString(this.encoding);
  }
  function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
  }
  return string_decoder;
}
var _stream_readable;
var hasRequired_stream_readable;
function require_stream_readable() {
  if (hasRequired_stream_readable)
    return _stream_readable;
  hasRequired_stream_readable = 1;
  var pna2 = processNextickArgs.exports;
  _stream_readable = Readable2;
  var isArray2 = isarray;
  var Duplex2;
  Readable2.ReadableState = ReadableState;
  require$$0__default$3.default.EventEmitter;
  var EElistenerCount = function(emitter, type) {
    return emitter.listeners(type).length;
  };
  var Stream2 = streamBrowser;
  var Buffer2 = safeBuffer$1.exports.Buffer;
  var OurUint8Array = commonjsGlobal.Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj2) {
    return Buffer2.isBuffer(obj2) || obj2 instanceof OurUint8Array;
  }
  var util2 = Object.create(util$9);
  util2.inherits = inherits_browser.exports;
  var debugUtil = require$$1__default.default;
  var debug2 = void 0;
  if (debugUtil && debugUtil.debuglog) {
    debug2 = debugUtil.debuglog("stream");
  } else {
    debug2 = function() {
    };
  }
  var BufferList2 = requireBufferList();
  var destroyImpl = destroy_1;
  var StringDecoder2;
  util2.inherits(Readable2, Stream2);
  var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
  function prependListener(emitter, event, fn) {
    if (typeof emitter.prependListener === "function")
      return emitter.prependListener(event, fn);
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (isArray2(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }
  function ReadableState(options, stream2) {
    Duplex2 = Duplex2 || require_stream_duplex();
    options = options || {};
    var isDuplex = stream2 instanceof Duplex2;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.readableObjectMode;
    var hwm = options.highWaterMark;
    var readableHwm = options.readableHighWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    if (hwm || hwm === 0)
      this.highWaterMark = hwm;
    else if (isDuplex && (readableHwm || readableHwm === 0))
      this.highWaterMark = readableHwm;
    else
      this.highWaterMark = defaultHwm;
    this.highWaterMark = Math.floor(this.highWaterMark);
    this.buffer = new BufferList2();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    this.sync = true;
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.destroyed = false;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.awaitDrain = 0;
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      if (!StringDecoder2)
        StringDecoder2 = requireString_decoder().StringDecoder;
      this.decoder = new StringDecoder2(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable2(options) {
    Duplex2 = Duplex2 || require_stream_duplex();
    if (!(this instanceof Readable2))
      return new Readable2(options);
    this._readableState = new ReadableState(options, this);
    this.readable = true;
    if (options) {
      if (typeof options.read === "function")
        this._read = options.read;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
    }
    Stream2.call(this);
  }
  Object.defineProperty(Readable2.prototype, "destroyed", {
    get: function() {
      if (this._readableState === void 0) {
        return false;
      }
      return this._readableState.destroyed;
    },
    set: function(value) {
      if (!this._readableState) {
        return;
      }
      this._readableState.destroyed = value;
    }
  });
  Readable2.prototype.destroy = destroyImpl.destroy;
  Readable2.prototype._undestroy = destroyImpl.undestroy;
  Readable2.prototype._destroy = function(err, cb) {
    this.push(null);
    cb(err);
  };
  Readable2.prototype.push = function(chunk, encoding) {
    var state = this._readableState;
    var skipChunkCheck;
    if (!state.objectMode) {
      if (typeof chunk === "string") {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = Buffer2.from(chunk, encoding);
          encoding = "";
        }
        skipChunkCheck = true;
      }
    } else {
      skipChunkCheck = true;
    }
    return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
  };
  Readable2.prototype.unshift = function(chunk) {
    return readableAddChunk(this, chunk, null, true, false);
  };
  function readableAddChunk(stream2, chunk, encoding, addToFront, skipChunkCheck) {
    var state = stream2._readableState;
    if (chunk === null) {
      state.reading = false;
      onEofChunk(stream2, state);
    } else {
      var er;
      if (!skipChunkCheck)
        er = chunkInvalid(state, chunk);
      if (er) {
        stream2.emit("error", er);
      } else if (state.objectMode || chunk && chunk.length > 0) {
        if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
          chunk = _uint8ArrayToBuffer(chunk);
        }
        if (addToFront) {
          if (state.endEmitted)
            stream2.emit("error", new Error("stream.unshift() after end event"));
          else
            addChunk(stream2, state, chunk, true);
        } else if (state.ended) {
          stream2.emit("error", new Error("stream.push() after EOF"));
        } else {
          state.reading = false;
          if (state.decoder && !encoding) {
            chunk = state.decoder.write(chunk);
            if (state.objectMode || chunk.length !== 0)
              addChunk(stream2, state, chunk, false);
            else
              maybeReadMore(stream2, state);
          } else {
            addChunk(stream2, state, chunk, false);
          }
        }
      } else if (!addToFront) {
        state.reading = false;
      }
    }
    return needMoreData(state);
  }
  function addChunk(stream2, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync) {
      stream2.emit("data", chunk);
      stream2.read(0);
    } else {
      state.length += state.objectMode ? 1 : chunk.length;
      if (addToFront)
        state.buffer.unshift(chunk);
      else
        state.buffer.push(chunk);
      if (state.needReadable)
        emitReadable(stream2);
    }
    maybeReadMore(stream2, state);
  }
  function chunkInvalid(state, chunk) {
    var er;
    if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
      er = new TypeError("Invalid non-string/buffer chunk");
    }
    return er;
  }
  function needMoreData(state) {
    return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
  }
  Readable2.prototype.isPaused = function() {
    return this._readableState.flowing === false;
  };
  Readable2.prototype.setEncoding = function(enc) {
    if (!StringDecoder2)
      StringDecoder2 = requireString_decoder().StringDecoder;
    this._readableState.decoder = new StringDecoder2(enc);
    this._readableState.encoding = enc;
    return this;
  };
  var MAX_HWM = 8388608;
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }
  function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended)
      return 0;
    if (state.objectMode)
      return 1;
    if (n !== n) {
      if (state.flowing && state.length)
        return state.buffer.head.data.length;
      else
        return state.length;
    }
    if (n > state.highWaterMark)
      state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length)
      return n;
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    }
    return state.length;
  }
  Readable2.prototype.read = function(n) {
    debug2("read", n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;
    if (n !== 0)
      state.emittedReadable = false;
    if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
      debug2("read: emitReadable", state.length, state.ended);
      if (state.length === 0 && state.ended)
        endReadable(this);
      else
        emitReadable(this);
      return null;
    }
    n = howMuchToRead(n, state);
    if (n === 0 && state.ended) {
      if (state.length === 0)
        endReadable(this);
      return null;
    }
    var doRead = state.needReadable;
    debug2("need readable", doRead);
    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
      debug2("length less than watermark", doRead);
    }
    if (state.ended || state.reading) {
      doRead = false;
      debug2("reading or ended", doRead);
    } else if (doRead) {
      debug2("do read");
      state.reading = true;
      state.sync = true;
      if (state.length === 0)
        state.needReadable = true;
      this._read(state.highWaterMark);
      state.sync = false;
      if (!state.reading)
        n = howMuchToRead(nOrig, state);
    }
    var ret;
    if (n > 0)
      ret = fromList(n, state);
    else
      ret = null;
    if (ret === null) {
      state.needReadable = true;
      n = 0;
    } else {
      state.length -= n;
    }
    if (state.length === 0) {
      if (!state.ended)
        state.needReadable = true;
      if (nOrig !== n && state.ended)
        endReadable(this);
    }
    if (ret !== null)
      this.emit("data", ret);
    return ret;
  };
  function onEofChunk(stream2, state) {
    if (state.ended)
      return;
    if (state.decoder) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;
    emitReadable(stream2);
  }
  function emitReadable(stream2) {
    var state = stream2._readableState;
    state.needReadable = false;
    if (!state.emittedReadable) {
      debug2("emitReadable", state.flowing);
      state.emittedReadable = true;
      if (state.sync)
        pna2.nextTick(emitReadable_, stream2);
      else
        emitReadable_(stream2);
    }
  }
  function emitReadable_(stream2) {
    debug2("emit readable");
    stream2.emit("readable");
    flow(stream2);
  }
  function maybeReadMore(stream2, state) {
    if (!state.readingMore) {
      state.readingMore = true;
      pna2.nextTick(maybeReadMore_, stream2, state);
    }
  }
  function maybeReadMore_(stream2, state) {
    var len = state.length;
    while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
      debug2("maybeReadMore read 0");
      stream2.read(0);
      if (len === state.length)
        break;
      else
        len = state.length;
    }
    state.readingMore = false;
  }
  Readable2.prototype._read = function(n) {
    this.emit("error", new Error("_read() is not implemented"));
  };
  Readable2.prototype.pipe = function(dest, pipeOpts) {
    var src2 = this;
    var state = this._readableState;
    switch (state.pipesCount) {
      case 0:
        state.pipes = dest;
        break;
      case 1:
        state.pipes = [state.pipes, dest];
        break;
      default:
        state.pipes.push(dest);
        break;
    }
    state.pipesCount += 1;
    debug2("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state.endEmitted)
      pna2.nextTick(endFn);
    else
      src2.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable, unpipeInfo) {
      debug2("onunpipe");
      if (readable === src2) {
        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
          unpipeInfo.hasUnpiped = true;
          cleanup();
        }
      }
    }
    function onend() {
      debug2("onend");
      dest.end();
    }
    var ondrain = pipeOnDrain(src2);
    dest.on("drain", ondrain);
    var cleanedUp = false;
    function cleanup() {
      debug2("cleanup");
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);
      dest.removeListener("drain", ondrain);
      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src2.removeListener("end", onend);
      src2.removeListener("end", unpipe);
      src2.removeListener("data", ondata);
      cleanedUp = true;
      if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
        ondrain();
    }
    var increasedAwaitDrain = false;
    src2.on("data", ondata);
    function ondata(chunk) {
      debug2("ondata");
      increasedAwaitDrain = false;
      var ret = dest.write(chunk);
      if (false === ret && !increasedAwaitDrain) {
        if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf2(state.pipes, dest) !== -1) && !cleanedUp) {
          debug2("false write response, pause", src2._readableState.awaitDrain);
          src2._readableState.awaitDrain++;
          increasedAwaitDrain = true;
        }
        src2.pause();
      }
    }
    function onerror(er) {
      debug2("onerror", er);
      unpipe();
      dest.removeListener("error", onerror);
      if (EElistenerCount(dest, "error") === 0)
        dest.emit("error", er);
    }
    prependListener(dest, "error", onerror);
    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
      debug2("onfinish");
      dest.removeListener("close", onclose);
      unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
      debug2("unpipe");
      src2.unpipe(dest);
    }
    dest.emit("pipe", src2);
    if (!state.flowing) {
      debug2("pipe resume");
      src2.resume();
    }
    return dest;
  };
  function pipeOnDrain(src2) {
    return function() {
      var state = src2._readableState;
      debug2("pipeOnDrain", state.awaitDrain);
      if (state.awaitDrain)
        state.awaitDrain--;
      if (state.awaitDrain === 0 && EElistenerCount(src2, "data")) {
        state.flowing = true;
        flow(src2);
      }
    };
  }
  Readable2.prototype.unpipe = function(dest) {
    var state = this._readableState;
    var unpipeInfo = { hasUnpiped: false };
    if (state.pipesCount === 0)
      return this;
    if (state.pipesCount === 1) {
      if (dest && dest !== state.pipes)
        return this;
      if (!dest)
        dest = state.pipes;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      if (dest)
        dest.emit("unpipe", this, unpipeInfo);
      return this;
    }
    if (!dest) {
      var dests = state.pipes;
      var len = state.pipesCount;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      for (var i = 0; i < len; i++) {
        dests[i].emit("unpipe", this, unpipeInfo);
      }
      return this;
    }
    var index = indexOf2(state.pipes, dest);
    if (index === -1)
      return this;
    state.pipes.splice(index, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1)
      state.pipes = state.pipes[0];
    dest.emit("unpipe", this, unpipeInfo);
    return this;
  };
  Readable2.prototype.on = function(ev, fn) {
    var res = Stream2.prototype.on.call(this, ev, fn);
    if (ev === "data") {
      if (this._readableState.flowing !== false)
        this.resume();
    } else if (ev === "readable") {
      var state = this._readableState;
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true;
        state.emittedReadable = false;
        if (!state.reading) {
          pna2.nextTick(nReadingNextTick, this);
        } else if (state.length) {
          emitReadable(this);
        }
      }
    }
    return res;
  };
  Readable2.prototype.addListener = Readable2.prototype.on;
  function nReadingNextTick(self2) {
    debug2("readable nexttick read 0");
    self2.read(0);
  }
  Readable2.prototype.resume = function() {
    var state = this._readableState;
    if (!state.flowing) {
      debug2("resume");
      state.flowing = true;
      resume(this, state);
    }
    return this;
  };
  function resume(stream2, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      pna2.nextTick(resume_, stream2, state);
    }
  }
  function resume_(stream2, state) {
    if (!state.reading) {
      debug2("resume read 0");
      stream2.read(0);
    }
    state.resumeScheduled = false;
    state.awaitDrain = 0;
    stream2.emit("resume");
    flow(stream2);
    if (state.flowing && !state.reading)
      stream2.read(0);
  }
  Readable2.prototype.pause = function() {
    debug2("call pause flowing=%j", this._readableState.flowing);
    if (false !== this._readableState.flowing) {
      debug2("pause");
      this._readableState.flowing = false;
      this.emit("pause");
    }
    return this;
  };
  function flow(stream2) {
    var state = stream2._readableState;
    debug2("flow", state.flowing);
    while (state.flowing && stream2.read() !== null) {
    }
  }
  Readable2.prototype.wrap = function(stream2) {
    var _this = this;
    var state = this._readableState;
    var paused = false;
    stream2.on("end", function() {
      debug2("wrapped end");
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length)
          _this.push(chunk);
      }
      _this.push(null);
    });
    stream2.on("data", function(chunk) {
      debug2("wrapped data");
      if (state.decoder)
        chunk = state.decoder.write(chunk);
      if (state.objectMode && (chunk === null || chunk === void 0))
        return;
      else if (!state.objectMode && (!chunk || !chunk.length))
        return;
      var ret = _this.push(chunk);
      if (!ret) {
        paused = true;
        stream2.pause();
      }
    });
    for (var i in stream2) {
      if (this[i] === void 0 && typeof stream2[i] === "function") {
        this[i] = function(method) {
          return function() {
            return stream2[method].apply(stream2, arguments);
          };
        }(i);
      }
    }
    for (var n = 0; n < kProxyEvents.length; n++) {
      stream2.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
    }
    this._read = function(n2) {
      debug2("wrapped _read", n2);
      if (paused) {
        paused = false;
        stream2.resume();
      }
    };
    return this;
  };
  Object.defineProperty(Readable2.prototype, "readableHighWaterMark", {
    enumerable: false,
    get: function() {
      return this._readableState.highWaterMark;
    }
  });
  Readable2._fromList = fromList;
  function fromList(n, state) {
    if (state.length === 0)
      return null;
    var ret;
    if (state.objectMode)
      ret = state.buffer.shift();
    else if (!n || n >= state.length) {
      if (state.decoder)
        ret = state.buffer.join("");
      else if (state.buffer.length === 1)
        ret = state.buffer.head.data;
      else
        ret = state.buffer.concat(state.length);
      state.buffer.clear();
    } else {
      ret = fromListPartial(n, state.buffer, state.decoder);
    }
    return ret;
  }
  function fromListPartial(n, list, hasStrings) {
    var ret;
    if (n < list.head.data.length) {
      ret = list.head.data.slice(0, n);
      list.head.data = list.head.data.slice(n);
    } else if (n === list.head.data.length) {
      ret = list.shift();
    } else {
      ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
    }
    return ret;
  }
  function copyFromBufferString(n, list) {
    var p = list.head;
    var c = 1;
    var ret = p.data;
    n -= ret.length;
    while (p = p.next) {
      var str = p.data;
      var nb = n > str.length ? str.length : n;
      if (nb === str.length)
        ret += str;
      else
        ret += str.slice(0, n);
      n -= nb;
      if (n === 0) {
        if (nb === str.length) {
          ++c;
          if (p.next)
            list.head = p.next;
          else
            list.head = list.tail = null;
        } else {
          list.head = p;
          p.data = str.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }
  function copyFromBuffer(n, list) {
    var ret = Buffer2.allocUnsafe(n);
    var p = list.head;
    var c = 1;
    p.data.copy(ret);
    n -= p.data.length;
    while (p = p.next) {
      var buf = p.data;
      var nb = n > buf.length ? buf.length : n;
      buf.copy(ret, ret.length - n, 0, nb);
      n -= nb;
      if (n === 0) {
        if (nb === buf.length) {
          ++c;
          if (p.next)
            list.head = p.next;
          else
            list.head = list.tail = null;
        } else {
          list.head = p;
          p.data = buf.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }
  function endReadable(stream2) {
    var state = stream2._readableState;
    if (state.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');
    if (!state.endEmitted) {
      state.ended = true;
      pna2.nextTick(endReadableNT, state, stream2);
    }
  }
  function endReadableNT(state, stream2) {
    if (!state.endEmitted && state.length === 0) {
      state.endEmitted = true;
      stream2.readable = false;
      stream2.emit("end");
    }
  }
  function indexOf2(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x)
        return i;
    }
    return -1;
  }
  return _stream_readable;
}
var browser$2 = deprecate;
function deprecate(fn, msg) {
  if (config("noDeprecation")) {
    return fn;
  }
  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config("throwDeprecation")) {
        throw new Error(msg);
      } else if (config("traceDeprecation")) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }
  return deprecated;
}
function config(name2) {
  try {
    if (!commonjsGlobal.localStorage)
      return false;
  } catch (_) {
    return false;
  }
  var val = commonjsGlobal.localStorage[name2];
  if (null == val)
    return false;
  return String(val).toLowerCase() === "true";
}
var _stream_writable;
var hasRequired_stream_writable;
function require_stream_writable() {
  if (hasRequired_stream_writable)
    return _stream_writable;
  hasRequired_stream_writable = 1;
  var pna2 = processNextickArgs.exports;
  _stream_writable = Writable2;
  function CorkedRequest(state) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
      onCorkedFinish(_this, state);
    };
  }
  var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna2.nextTick;
  var Duplex2;
  Writable2.WritableState = WritableState;
  var util2 = Object.create(util$9);
  util2.inherits = inherits_browser.exports;
  var internalUtil = {
    deprecate: browser$2
  };
  var Stream2 = streamBrowser;
  var Buffer2 = safeBuffer$1.exports.Buffer;
  var OurUint8Array = commonjsGlobal.Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj2) {
    return Buffer2.isBuffer(obj2) || obj2 instanceof OurUint8Array;
  }
  var destroyImpl = destroy_1;
  util2.inherits(Writable2, Stream2);
  function nop() {
  }
  function WritableState(options, stream2) {
    Duplex2 = Duplex2 || require_stream_duplex();
    options = options || {};
    var isDuplex = stream2 instanceof Duplex2;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.writableObjectMode;
    var hwm = options.highWaterMark;
    var writableHwm = options.writableHighWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    if (hwm || hwm === 0)
      this.highWaterMark = hwm;
    else if (isDuplex && (writableHwm || writableHwm === 0))
      this.highWaterMark = writableHwm;
    else
      this.highWaterMark = defaultHwm;
    this.highWaterMark = Math.floor(this.highWaterMark);
    this.finalCalled = false;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    this.destroyed = false;
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = function(er) {
      onwrite(stream2, er);
    };
    this.writecb = null;
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null;
    this.pendingcb = 0;
    this.prefinished = false;
    this.errorEmitted = false;
    this.bufferedRequestCount = 0;
    this.corkedRequestsFree = new CorkedRequest(this);
  }
  WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while (current) {
      out.push(current);
      current = current.next;
    }
    return out;
  };
  (function() {
    try {
      Object.defineProperty(WritableState.prototype, "buffer", {
        get: internalUtil.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch (_) {
    }
  })();
  var realHasInstance;
  if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
    realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty(Writable2, Symbol.hasInstance, {
      value: function(object) {
        if (realHasInstance.call(this, object))
          return true;
        if (this !== Writable2)
          return false;
        return object && object._writableState instanceof WritableState;
      }
    });
  } else {
    realHasInstance = function(object) {
      return object instanceof this;
    };
  }
  function Writable2(options) {
    Duplex2 = Duplex2 || require_stream_duplex();
    if (!realHasInstance.call(Writable2, this) && !(this instanceof Duplex2)) {
      return new Writable2(options);
    }
    this._writableState = new WritableState(options, this);
    this.writable = true;
    if (options) {
      if (typeof options.write === "function")
        this._write = options.write;
      if (typeof options.writev === "function")
        this._writev = options.writev;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
      if (typeof options.final === "function")
        this._final = options.final;
    }
    Stream2.call(this);
  }
  Writable2.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function writeAfterEnd(stream2, cb) {
    var er = new Error("write after end");
    stream2.emit("error", er);
    pna2.nextTick(cb, er);
  }
  function validChunk(stream2, state, chunk, cb) {
    var valid = true;
    var er = false;
    if (chunk === null) {
      er = new TypeError("May not write null values to stream");
    } else if (typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
      er = new TypeError("Invalid non-string/buffer chunk");
    }
    if (er) {
      stream2.emit("error", er);
      pna2.nextTick(cb, er);
      valid = false;
    }
    return valid;
  }
  Writable2.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    var isBuf = !state.objectMode && _isUint8Array(chunk);
    if (isBuf && !Buffer2.isBuffer(chunk)) {
      chunk = _uint8ArrayToBuffer(chunk);
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (isBuf)
      encoding = "buffer";
    else if (!encoding)
      encoding = state.defaultEncoding;
    if (typeof cb !== "function")
      cb = nop;
    if (state.ended)
      writeAfterEnd(this, cb);
    else if (isBuf || validChunk(this, state, chunk, cb)) {
      state.pendingcb++;
      ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
    }
    return ret;
  };
  Writable2.prototype.cork = function() {
    var state = this._writableState;
    state.corked++;
  };
  Writable2.prototype.uncork = function() {
    var state = this._writableState;
    if (state.corked) {
      state.corked--;
      if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest)
        clearBuffer(this, state);
    }
  };
  Writable2.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    if (typeof encoding === "string")
      encoding = encoding.toLowerCase();
    if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
      throw new TypeError("Unknown encoding: " + encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };
  function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
      chunk = Buffer2.from(chunk, encoding);
    }
    return chunk;
  }
  Object.defineProperty(Writable2.prototype, "writableHighWaterMark", {
    enumerable: false,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function writeOrBuffer(stream2, state, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
      var newChunk = decodeChunk(state, chunk, encoding);
      if (chunk !== newChunk) {
        isBuf = true;
        encoding = "buffer";
        chunk = newChunk;
      }
    }
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark;
    if (!ret)
      state.needDrain = true;
    if (state.writing || state.corked) {
      var last = state.lastBufferedRequest;
      state.lastBufferedRequest = {
        chunk,
        encoding,
        isBuf,
        callback: cb,
        next: null
      };
      if (last) {
        last.next = state.lastBufferedRequest;
      } else {
        state.bufferedRequest = state.lastBufferedRequest;
      }
      state.bufferedRequestCount += 1;
    } else {
      doWrite(stream2, state, false, len, chunk, encoding, cb);
    }
    return ret;
  }
  function doWrite(stream2, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (writev)
      stream2._writev(chunk, state.onwrite);
    else
      stream2._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }
  function onwriteError(stream2, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) {
      pna2.nextTick(cb, er);
      pna2.nextTick(finishMaybe, stream2, state);
      stream2._writableState.errorEmitted = true;
      stream2.emit("error", er);
    } else {
      cb(er);
      stream2._writableState.errorEmitted = true;
      stream2.emit("error", er);
      finishMaybe(stream2, state);
    }
  }
  function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
  }
  function onwrite(stream2, er) {
    var state = stream2._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    onwriteStateUpdate(state);
    if (er)
      onwriteError(stream2, state, sync, er, cb);
    else {
      var finished = needFinish(state);
      if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
        clearBuffer(stream2, state);
      }
      if (sync) {
        asyncWrite(afterWrite, stream2, state, finished, cb);
      } else {
        afterWrite(stream2, state, finished, cb);
      }
    }
  }
  function afterWrite(stream2, state, finished, cb) {
    if (!finished)
      onwriteDrain(stream2, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream2, state);
  }
  function onwriteDrain(stream2, state) {
    if (state.length === 0 && state.needDrain) {
      state.needDrain = false;
      stream2.emit("drain");
    }
  }
  function clearBuffer(stream2, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream2._writev && entry && entry.next) {
      var l = state.bufferedRequestCount;
      var buffer2 = new Array(l);
      var holder = state.corkedRequestsFree;
      holder.entry = entry;
      var count = 0;
      var allBuffers = true;
      while (entry) {
        buffer2[count] = entry;
        if (!entry.isBuf)
          allBuffers = false;
        entry = entry.next;
        count += 1;
      }
      buffer2.allBuffers = allBuffers;
      doWrite(stream2, state, true, state.length, buffer2, "", holder.finish);
      state.pendingcb++;
      state.lastBufferedRequest = null;
      if (holder.next) {
        state.corkedRequestsFree = holder.next;
        holder.next = null;
      } else {
        state.corkedRequestsFree = new CorkedRequest(state);
      }
      state.bufferedRequestCount = 0;
    } else {
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state.objectMode ? 1 : chunk.length;
        doWrite(stream2, state, false, len, chunk, encoding, cb);
        entry = entry.next;
        state.bufferedRequestCount--;
        if (state.writing) {
          break;
        }
      }
      if (entry === null)
        state.lastBufferedRequest = null;
    }
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
  }
  Writable2.prototype._write = function(chunk, encoding, cb) {
    cb(new Error("_write() is not implemented"));
  };
  Writable2.prototype._writev = null;
  Writable2.prototype.end = function(chunk, encoding, cb) {
    var state = this._writableState;
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (chunk !== null && chunk !== void 0)
      this.write(chunk, encoding);
    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }
    if (!state.ending && !state.finished)
      endWritable(this, state, cb);
  };
  function needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
  }
  function callFinal(stream2, state) {
    stream2._final(function(err) {
      state.pendingcb--;
      if (err) {
        stream2.emit("error", err);
      }
      state.prefinished = true;
      stream2.emit("prefinish");
      finishMaybe(stream2, state);
    });
  }
  function prefinish2(stream2, state) {
    if (!state.prefinished && !state.finalCalled) {
      if (typeof stream2._final === "function") {
        state.pendingcb++;
        state.finalCalled = true;
        pna2.nextTick(callFinal, stream2, state);
      } else {
        state.prefinished = true;
        stream2.emit("prefinish");
      }
    }
  }
  function finishMaybe(stream2, state) {
    var need = needFinish(state);
    if (need) {
      prefinish2(stream2, state);
      if (state.pendingcb === 0) {
        state.finished = true;
        stream2.emit("finish");
      }
    }
    return need;
  }
  function endWritable(stream2, state, cb) {
    state.ending = true;
    finishMaybe(stream2, state);
    if (cb) {
      if (state.finished)
        pna2.nextTick(cb);
      else
        stream2.once("finish", cb);
    }
    state.ended = true;
    stream2.writable = false;
  }
  function onCorkedFinish(corkReq, state, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = corkReq;
    } else {
      state.corkedRequestsFree = corkReq;
    }
  }
  Object.defineProperty(Writable2.prototype, "destroyed", {
    get: function() {
      if (this._writableState === void 0) {
        return false;
      }
      return this._writableState.destroyed;
    },
    set: function(value) {
      if (!this._writableState) {
        return;
      }
      this._writableState.destroyed = value;
    }
  });
  Writable2.prototype.destroy = destroyImpl.destroy;
  Writable2.prototype._undestroy = destroyImpl.undestroy;
  Writable2.prototype._destroy = function(err, cb) {
    this.end();
    cb(err);
  };
  return _stream_writable;
}
var _stream_duplex;
var hasRequired_stream_duplex;
function require_stream_duplex() {
  if (hasRequired_stream_duplex)
    return _stream_duplex;
  hasRequired_stream_duplex = 1;
  var pna2 = processNextickArgs.exports;
  var objectKeys = Object.keys || function(obj2) {
    var keys2 = [];
    for (var key2 in obj2) {
      keys2.push(key2);
    }
    return keys2;
  };
  _stream_duplex = Duplex2;
  var util2 = Object.create(util$9);
  util2.inherits = inherits_browser.exports;
  var Readable2 = require_stream_readable();
  var Writable2 = require_stream_writable();
  util2.inherits(Duplex2, Readable2);
  {
    var keys = objectKeys(Writable2.prototype);
    for (var v = 0; v < keys.length; v++) {
      var method = keys[v];
      if (!Duplex2.prototype[method])
        Duplex2.prototype[method] = Writable2.prototype[method];
    }
  }
  function Duplex2(options) {
    if (!(this instanceof Duplex2))
      return new Duplex2(options);
    Readable2.call(this, options);
    Writable2.call(this, options);
    if (options && options.readable === false)
      this.readable = false;
    if (options && options.writable === false)
      this.writable = false;
    this.allowHalfOpen = true;
    if (options && options.allowHalfOpen === false)
      this.allowHalfOpen = false;
    this.once("end", onend);
  }
  Object.defineProperty(Duplex2.prototype, "writableHighWaterMark", {
    enumerable: false,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function onend() {
    if (this.allowHalfOpen || this._writableState.ended)
      return;
    pna2.nextTick(onEndNT, this);
  }
  function onEndNT(self2) {
    self2.end();
  }
  Object.defineProperty(Duplex2.prototype, "destroyed", {
    get: function() {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return false;
      }
      return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(value) {
      if (this._readableState === void 0 || this._writableState === void 0) {
        return;
      }
      this._readableState.destroyed = value;
      this._writableState.destroyed = value;
    }
  });
  Duplex2.prototype._destroy = function(err, cb) {
    this.push(null);
    this.end();
    pna2.nextTick(cb, err);
  };
  return _stream_duplex;
}
(function(module2) {
  module2.exports = require_stream_duplex();
})(duplexBrowser);
var DuplexStream = duplexBrowser.exports, util$8 = require$$1__default.default, Buffer$3 = safeBuffer$2.exports.Buffer;
function BufferList(callback) {
  if (!(this instanceof BufferList))
    return new BufferList(callback);
  this._bufs = [];
  this.length = 0;
  if (typeof callback == "function") {
    this._callback = callback;
    var piper = function piper2(err) {
      if (this._callback) {
        this._callback(err);
        this._callback = null;
      }
    }.bind(this);
    this.on("pipe", function onPipe(src2) {
      src2.on("error", piper);
    });
    this.on("unpipe", function onUnpipe(src2) {
      src2.removeListener("error", piper);
    });
  } else {
    this.append(callback);
  }
  DuplexStream.call(this);
}
util$8.inherits(BufferList, DuplexStream);
BufferList.prototype._offset = function _offset(offset) {
  var tot = 0, i = 0, _t;
  if (offset === 0)
    return [0, 0];
  for (; i < this._bufs.length; i++) {
    _t = tot + this._bufs[i].length;
    if (offset < _t || i == this._bufs.length - 1)
      return [i, offset - tot];
    tot = _t;
  }
};
BufferList.prototype.append = function append(buf) {
  var i = 0;
  if (Buffer$3.isBuffer(buf)) {
    this._appendBuffer(buf);
  } else if (Array.isArray(buf)) {
    for (; i < buf.length; i++)
      this.append(buf[i]);
  } else if (buf instanceof BufferList) {
    for (; i < buf._bufs.length; i++)
      this.append(buf._bufs[i]);
  } else if (buf != null) {
    if (typeof buf == "number")
      buf = buf.toString();
    this._appendBuffer(Buffer$3.from(buf));
  }
  return this;
};
BufferList.prototype._appendBuffer = function appendBuffer(buf) {
  this._bufs.push(buf);
  this.length += buf.length;
};
BufferList.prototype._write = function _write(buf, encoding, callback) {
  this._appendBuffer(buf);
  if (typeof callback == "function")
    callback();
};
BufferList.prototype._read = function _read(size) {
  if (!this.length)
    return this.push(null);
  size = Math.min(size, this.length);
  this.push(this.slice(0, size));
  this.consume(size);
};
BufferList.prototype.end = function end(chunk) {
  DuplexStream.prototype.end.call(this, chunk);
  if (this._callback) {
    this._callback(null, this.slice());
    this._callback = null;
  }
};
BufferList.prototype.get = function get(index) {
  return this.slice(index, index + 1)[0];
};
BufferList.prototype.slice = function slice(start, end2) {
  if (typeof start == "number" && start < 0)
    start += this.length;
  if (typeof end2 == "number" && end2 < 0)
    end2 += this.length;
  return this.copy(null, 0, start, end2);
};
BufferList.prototype.copy = function copy2(dst, dstStart, srcStart, srcEnd) {
  if (typeof srcStart != "number" || srcStart < 0)
    srcStart = 0;
  if (typeof srcEnd != "number" || srcEnd > this.length)
    srcEnd = this.length;
  if (srcStart >= this.length)
    return dst || Buffer$3.alloc(0);
  if (srcEnd <= 0)
    return dst || Buffer$3.alloc(0);
  var copy3 = !!dst, off = this._offset(srcStart), len = srcEnd - srcStart, bytes = len, bufoff = copy3 && dstStart || 0, start = off[1], l, i;
  if (srcStart === 0 && srcEnd == this.length) {
    if (!copy3) {
      return this._bufs.length === 1 ? this._bufs[0] : Buffer$3.concat(this._bufs, this.length);
    }
    for (i = 0; i < this._bufs.length; i++) {
      this._bufs[i].copy(dst, bufoff);
      bufoff += this._bufs[i].length;
    }
    return dst;
  }
  if (bytes <= this._bufs[off[0]].length - start) {
    return copy3 ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
  }
  if (!copy3)
    dst = Buffer$3.allocUnsafe(len);
  for (i = off[0]; i < this._bufs.length; i++) {
    l = this._bufs[i].length - start;
    if (bytes > l) {
      this._bufs[i].copy(dst, bufoff, start);
      bufoff += l;
    } else {
      this._bufs[i].copy(dst, bufoff, start, start + bytes);
      bufoff += l;
      break;
    }
    bytes -= l;
    if (start)
      start = 0;
  }
  if (dst.length > bufoff)
    return dst.slice(0, bufoff);
  return dst;
};
BufferList.prototype.shallowSlice = function shallowSlice(start, end2) {
  start = start || 0;
  end2 = end2 || this.length;
  if (start < 0)
    start += this.length;
  if (end2 < 0)
    end2 += this.length;
  var startOffset = this._offset(start), endOffset = this._offset(end2), buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
  if (endOffset[1] == 0)
    buffers.pop();
  else
    buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
  if (startOffset[1] != 0)
    buffers[0] = buffers[0].slice(startOffset[1]);
  return new BufferList(buffers);
};
BufferList.prototype.toString = function toString2(encoding, start, end2) {
  return this.slice(start, end2).toString(encoding);
};
BufferList.prototype.consume = function consume(bytes) {
  bytes = Math.trunc(bytes);
  if (Number.isNaN(bytes) || bytes <= 0)
    return this;
  while (this._bufs.length) {
    if (bytes >= this._bufs[0].length) {
      bytes -= this._bufs[0].length;
      this.length -= this._bufs[0].length;
      this._bufs.shift();
    } else {
      this._bufs[0] = this._bufs[0].slice(bytes);
      this.length -= bytes;
      break;
    }
  }
  return this;
};
BufferList.prototype.duplicate = function duplicate() {
  var i = 0, copy3 = new BufferList();
  for (; i < this._bufs.length; i++)
    copy3.append(this._bufs[i]);
  return copy3;
};
BufferList.prototype.destroy = function destroy2() {
  this._bufs.length = 0;
  this.length = 0;
  this.push(null);
};
(function() {
  var methods2 = {
    "readDoubleBE": 8,
    "readDoubleLE": 8,
    "readFloatBE": 4,
    "readFloatLE": 4,
    "readInt32BE": 4,
    "readInt32LE": 4,
    "readUInt32BE": 4,
    "readUInt32LE": 4,
    "readInt16BE": 2,
    "readInt16LE": 2,
    "readUInt16BE": 2,
    "readUInt16LE": 2,
    "readInt8": 1,
    "readUInt8": 1
  };
  for (var m in methods2) {
    (function(m2) {
      BufferList.prototype[m2] = function(offset) {
        return this.slice(offset, offset + methods2[m2])[m2](0);
      };
    })(m);
  }
})();
var bl$1 = BufferList;
var immutable = extend;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function extend() {
  var target = {};
  for (var i = 0; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key2 in source) {
      if (hasOwnProperty$1.call(source, key2)) {
        target[key2] = source[key2];
      }
    }
  }
  return target;
}
var headers$2 = {};
var toBuffer_1 = toBuffer$2;
var makeBuffer = Buffer.from && Buffer.from !== Uint8Array.from ? Buffer.from : bufferFrom;
function bufferFrom(buf, enc) {
  return new Buffer(buf, enc);
}
function toBuffer$2(buf, enc) {
  if (Buffer.isBuffer(buf))
    return buf;
  if (typeof buf === "string")
    return makeBuffer(buf, enc);
  if (Array.isArray(buf))
    return makeBuffer(buf);
  throw new Error("Input should be a buffer or a string");
}
var hasFullSupport = function() {
  try {
    if (!Buffer.isEncoding("latin1")) {
      return false;
    }
    var buf = Buffer.alloc ? Buffer.alloc(4) : new Buffer(4);
    buf.fill("ab", "ucs2");
    return buf.toString("hex") === "61006200";
  } catch (_) {
    return false;
  }
}();
function isSingleByte(val) {
  return val.length === 1 && val.charCodeAt(0) < 256;
}
function fillWithNumber(buffer2, val, start, end2) {
  if (start < 0 || end2 > buffer2.length) {
    throw new RangeError("Out of range index");
  }
  start = start >>> 0;
  end2 = end2 === void 0 ? buffer2.length : end2 >>> 0;
  if (end2 > start) {
    buffer2.fill(val, start, end2);
  }
  return buffer2;
}
function fillWithBuffer(buffer2, val, start, end2) {
  if (start < 0 || end2 > buffer2.length) {
    throw new RangeError("Out of range index");
  }
  if (end2 <= start) {
    return buffer2;
  }
  start = start >>> 0;
  end2 = end2 === void 0 ? buffer2.length : end2 >>> 0;
  var pos = start;
  var len = val.length;
  while (pos <= end2 - len) {
    val.copy(buffer2, pos);
    pos += len;
  }
  if (pos !== end2) {
    val.copy(buffer2, pos, 0, end2 - pos);
  }
  return buffer2;
}
function fill(buffer2, val, start, end2, encoding) {
  if (hasFullSupport) {
    return buffer2.fill(val, start, end2, encoding);
  }
  if (typeof val === "number") {
    return fillWithNumber(buffer2, val, start, end2);
  }
  if (typeof val === "string") {
    if (typeof start === "string") {
      encoding = start;
      start = 0;
      end2 = buffer2.length;
    } else if (typeof end2 === "string") {
      encoding = end2;
      end2 = buffer2.length;
    }
    if (encoding !== void 0 && typeof encoding !== "string") {
      throw new TypeError("encoding must be a string");
    }
    if (encoding === "latin1") {
      encoding = "binary";
    }
    if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    if (val === "") {
      return fillWithNumber(buffer2, 0, start, end2);
    }
    if (isSingleByte(val)) {
      return fillWithNumber(buffer2, val.charCodeAt(0), start, end2);
    }
    val = new Buffer(val, encoding);
  }
  if (Buffer.isBuffer(val)) {
    return fillWithBuffer(buffer2, val, start, end2);
  }
  return fillWithNumber(buffer2, 0, start, end2);
}
var bufferFill$1 = fill;
function allocUnsafe$1(size) {
  if (typeof size !== "number") {
    throw new TypeError('"size" argument must be a number');
  }
  if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
  if (Buffer.allocUnsafe) {
    return Buffer.allocUnsafe(size);
  } else {
    return new Buffer(size);
  }
}
var bufferAllocUnsafe = allocUnsafe$1;
var bufferFill = bufferFill$1;
var allocUnsafe = bufferAllocUnsafe;
var bufferAlloc = function alloc2(size, fill2, encoding) {
  if (typeof size !== "number") {
    throw new TypeError('"size" argument must be a number');
  }
  if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
  if (Buffer.alloc) {
    return Buffer.alloc(size, fill2, encoding);
  }
  var buffer2 = allocUnsafe(size);
  if (size === 0) {
    return buffer2;
  }
  if (fill2 === void 0) {
    return bufferFill(buffer2, 0);
  }
  if (typeof encoding !== "string") {
    encoding = void 0;
  }
  return bufferFill(buffer2, fill2, encoding);
};
var toBuffer$1 = toBuffer_1;
var alloc$1 = bufferAlloc;
var ZEROS = "0000000000000000000";
var SEVENS = "7777777777777777777";
var ZERO_OFFSET = "0".charCodeAt(0);
var USTAR = "ustar\x0000";
var MASK = parseInt("7777", 8);
var clamp = function(index, len, defaultValue) {
  if (typeof index !== "number")
    return defaultValue;
  index = ~~index;
  if (index >= len)
    return len;
  if (index >= 0)
    return index;
  index += len;
  if (index >= 0)
    return index;
  return 0;
};
var toType = function(flag) {
  switch (flag) {
    case 0:
      return "file";
    case 1:
      return "link";
    case 2:
      return "symlink";
    case 3:
      return "character-device";
    case 4:
      return "block-device";
    case 5:
      return "directory";
    case 6:
      return "fifo";
    case 7:
      return "contiguous-file";
    case 72:
      return "pax-header";
    case 55:
      return "pax-global-header";
    case 27:
      return "gnu-long-link-path";
    case 28:
    case 30:
      return "gnu-long-path";
  }
  return null;
};
var toTypeflag = function(flag) {
  switch (flag) {
    case "file":
      return 0;
    case "link":
      return 1;
    case "symlink":
      return 2;
    case "character-device":
      return 3;
    case "block-device":
      return 4;
    case "directory":
      return 5;
    case "fifo":
      return 6;
    case "contiguous-file":
      return 7;
    case "pax-header":
      return 72;
  }
  return 0;
};
var indexOf = function(block, num, offset, end2) {
  for (; offset < end2; offset++) {
    if (block[offset] === num)
      return offset;
  }
  return end2;
};
var cksum = function(block) {
  var sum = 8 * 32;
  for (var i = 0; i < 148; i++)
    sum += block[i];
  for (var j = 156; j < 512; j++)
    sum += block[j];
  return sum;
};
var encodeOct = function(val, n) {
  val = val.toString(8);
  if (val.length > n)
    return SEVENS.slice(0, n) + " ";
  else
    return ZEROS.slice(0, n - val.length) + val + " ";
};
function parse256(buf) {
  var positive;
  if (buf[0] === 128)
    positive = true;
  else if (buf[0] === 255)
    positive = false;
  else
    return null;
  var tuple = [];
  for (var i = buf.length - 1; i > 0; i--) {
    var byte = buf[i];
    if (positive)
      tuple.push(byte);
    else
      tuple.push(255 - byte);
  }
  var sum = 0;
  var l = tuple.length;
  for (i = 0; i < l; i++) {
    sum += tuple[i] * Math.pow(256, i);
  }
  return positive ? sum : -1 * sum;
}
var decodeOct = function(val, offset, length) {
  val = val.slice(offset, offset + length);
  offset = 0;
  if (val[offset] & 128) {
    return parse256(val);
  } else {
    while (offset < val.length && val[offset] === 32)
      offset++;
    var end2 = clamp(indexOf(val, 32, offset, val.length), val.length, val.length);
    while (offset < end2 && val[offset] === 0)
      offset++;
    if (end2 === offset)
      return 0;
    return parseInt(val.slice(offset, end2).toString(), 8);
  }
};
var decodeStr = function(val, offset, length, encoding) {
  return val.slice(offset, indexOf(val, 0, offset, offset + length)).toString(encoding);
};
var addLength = function(str) {
  var len = Buffer.byteLength(str);
  var digits = Math.floor(Math.log(len) / Math.log(10)) + 1;
  if (len + digits >= Math.pow(10, digits))
    digits++;
  return len + digits + str;
};
headers$2.decodeLongPath = function(buf, encoding) {
  return decodeStr(buf, 0, buf.length, encoding);
};
headers$2.encodePax = function(opts) {
  var result = "";
  if (opts.name)
    result += addLength(" path=" + opts.name + "\n");
  if (opts.linkname)
    result += addLength(" linkpath=" + opts.linkname + "\n");
  var pax = opts.pax;
  if (pax) {
    for (var key2 in pax) {
      result += addLength(" " + key2 + "=" + pax[key2] + "\n");
    }
  }
  return toBuffer$1(result);
};
headers$2.decodePax = function(buf) {
  var result = {};
  while (buf.length) {
    var i = 0;
    while (i < buf.length && buf[i] !== 32)
      i++;
    var len = parseInt(buf.slice(0, i).toString(), 10);
    if (!len)
      return result;
    var b = buf.slice(i + 1, len - 1).toString();
    var keyIndex = b.indexOf("=");
    if (keyIndex === -1)
      return result;
    result[b.slice(0, keyIndex)] = b.slice(keyIndex + 1);
    buf = buf.slice(len);
  }
  return result;
};
headers$2.encode = function(opts) {
  var buf = alloc$1(512);
  var name2 = opts.name;
  var prefix = "";
  if (opts.typeflag === 5 && name2[name2.length - 1] !== "/")
    name2 += "/";
  if (Buffer.byteLength(name2) !== name2.length)
    return null;
  while (Buffer.byteLength(name2) > 100) {
    var i = name2.indexOf("/");
    if (i === -1)
      return null;
    prefix += prefix ? "/" + name2.slice(0, i) : name2.slice(0, i);
    name2 = name2.slice(i + 1);
  }
  if (Buffer.byteLength(name2) > 100 || Buffer.byteLength(prefix) > 155)
    return null;
  if (opts.linkname && Buffer.byteLength(opts.linkname) > 100)
    return null;
  buf.write(name2);
  buf.write(encodeOct(opts.mode & MASK, 6), 100);
  buf.write(encodeOct(opts.uid, 6), 108);
  buf.write(encodeOct(opts.gid, 6), 116);
  buf.write(encodeOct(opts.size, 11), 124);
  buf.write(encodeOct(opts.mtime.getTime() / 1e3 | 0, 11), 136);
  buf[156] = ZERO_OFFSET + toTypeflag(opts.type);
  if (opts.linkname)
    buf.write(opts.linkname, 157);
  buf.write(USTAR, 257);
  if (opts.uname)
    buf.write(opts.uname, 265);
  if (opts.gname)
    buf.write(opts.gname, 297);
  buf.write(encodeOct(opts.devmajor || 0, 6), 329);
  buf.write(encodeOct(opts.devminor || 0, 6), 337);
  if (prefix)
    buf.write(prefix, 345);
  buf.write(encodeOct(cksum(buf), 6), 148);
  return buf;
};
headers$2.decode = function(buf, filenameEncoding) {
  var typeflag = buf[156] === 0 ? 0 : buf[156] - ZERO_OFFSET;
  var name2 = decodeStr(buf, 0, 100, filenameEncoding);
  var mode = decodeOct(buf, 100, 8);
  var uid = decodeOct(buf, 108, 8);
  var gid = decodeOct(buf, 116, 8);
  var size = decodeOct(buf, 124, 12);
  var mtime = decodeOct(buf, 136, 12);
  var type = toType(typeflag);
  var linkname = buf[157] === 0 ? null : decodeStr(buf, 157, 100, filenameEncoding);
  var uname = decodeStr(buf, 265, 32);
  var gname = decodeStr(buf, 297, 32);
  var devmajor = decodeOct(buf, 329, 8);
  var devminor = decodeOct(buf, 337, 8);
  if (buf[345])
    name2 = decodeStr(buf, 345, 155, filenameEncoding) + "/" + name2;
  if (typeflag === 0 && name2 && name2[name2.length - 1] === "/")
    typeflag = 5;
  var c = cksum(buf);
  if (c === 8 * 32)
    return null;
  if (c !== decodeOct(buf, 148, 8))
    throw new Error("Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?");
  return {
    name: name2,
    mode,
    uid,
    gid,
    size,
    mtime: new Date(1e3 * mtime),
    type,
    linkname,
    uname,
    gname,
    devmajor,
    devminor
  };
};
var readableBrowser = { exports: {} };
var _stream_transform = Transform$3;
var Duplex = require_stream_duplex();
var util$7 = Object.create(util$9);
util$7.inherits = inherits_browser.exports;
util$7.inherits(Transform$3, Duplex);
function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;
  if (!cb) {
    return this.emit("error", new Error("write callback called multiple times"));
  }
  ts.writechunk = null;
  ts.writecb = null;
  if (data != null)
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}
function Transform$3(options) {
  if (!(this instanceof Transform$3))
    return new Transform$3(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };
  this._readableState.needReadable = true;
  this._readableState.sync = false;
  if (options) {
    if (typeof options.transform === "function")
      this._transform = options.transform;
    if (typeof options.flush === "function")
      this._flush = options.flush;
  }
  this.on("prefinish", prefinish);
}
function prefinish() {
  var _this = this;
  if (typeof this._flush === "function") {
    this._flush(function(er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}
Transform$3.prototype.push = function(chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};
Transform$3.prototype._transform = function(chunk, encoding, cb) {
  throw new Error("_transform() is not implemented");
};
Transform$3.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
      this._read(rs.highWaterMark);
  }
};
Transform$3.prototype._read = function(n) {
  var ts = this._transformState;
  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    ts.needTransform = true;
  }
};
Transform$3.prototype._destroy = function(err, cb) {
  var _this2 = this;
  Duplex.prototype._destroy.call(this, err, function(err2) {
    cb(err2);
    _this2.emit("close");
  });
};
function done(stream2, er, data) {
  if (er)
    return stream2.emit("error", er);
  if (data != null)
    stream2.push(data);
  if (stream2._writableState.length)
    throw new Error("Calling transform done when ws.length != 0");
  if (stream2._transformState.transforming)
    throw new Error("Calling transform done when still transforming");
  return stream2.push(null);
}
var _stream_passthrough = PassThrough$9;
var Transform$2 = _stream_transform;
var util$6 = Object.create(util$9);
util$6.inherits = inherits_browser.exports;
util$6.inherits(PassThrough$9, Transform$2);
function PassThrough$9(options) {
  if (!(this instanceof PassThrough$9))
    return new PassThrough$9(options);
  Transform$2.call(this, options);
}
PassThrough$9.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};
(function(module2, exports) {
  exports = module2.exports = require_stream_readable();
  exports.Stream = exports;
  exports.Readable = exports;
  exports.Writable = require_stream_writable();
  exports.Duplex = require_stream_duplex();
  exports.Transform = _stream_transform;
  exports.PassThrough = _stream_passthrough;
})(readableBrowser, readableBrowser.exports);
var util$5 = require$$1__default.default;
var bl = bl$1;
var xtend = immutable;
var headers$1 = headers$2;
var Writable$3 = readableBrowser.exports.Writable;
var PassThrough$8 = readableBrowser.exports.PassThrough;
var noop$4 = function() {
};
var overflow$1 = function(size) {
  size &= 511;
  return size && 512 - size;
};
var emptyStream = function(self2, offset) {
  var s = new Source(self2, offset);
  s.end();
  return s;
};
var mixinPax = function(header, pax) {
  if (pax.path)
    header.name = pax.path;
  if (pax.linkpath)
    header.linkname = pax.linkpath;
  if (pax.size)
    header.size = parseInt(pax.size, 10);
  header.pax = pax;
  return header;
};
var Source = function(self2, offset) {
  this._parent = self2;
  this.offset = offset;
  PassThrough$8.call(this);
};
util$5.inherits(Source, PassThrough$8);
Source.prototype.destroy = function(err) {
  this._parent.destroy(err);
};
var Extract = function(opts) {
  if (!(this instanceof Extract))
    return new Extract(opts);
  Writable$3.call(this, opts);
  opts = opts || {};
  this._offset = 0;
  this._buffer = bl();
  this._missing = 0;
  this._partial = false;
  this._onparse = noop$4;
  this._header = null;
  this._stream = null;
  this._overflow = null;
  this._cb = null;
  this._locked = false;
  this._destroyed = false;
  this._pax = null;
  this._paxGlobal = null;
  this._gnuLongPath = null;
  this._gnuLongLinkPath = null;
  var self2 = this;
  var b = self2._buffer;
  var oncontinue = function() {
    self2._continue();
  };
  var onunlock = function(err) {
    self2._locked = false;
    if (err)
      return self2.destroy(err);
    if (!self2._stream)
      oncontinue();
  };
  var onstreamend = function() {
    self2._stream = null;
    var drain = overflow$1(self2._header.size);
    if (drain)
      self2._parse(drain, ondrain);
    else
      self2._parse(512, onheader);
    if (!self2._locked)
      oncontinue();
  };
  var ondrain = function() {
    self2._buffer.consume(overflow$1(self2._header.size));
    self2._parse(512, onheader);
    oncontinue();
  };
  var onpaxglobalheader = function() {
    var size = self2._header.size;
    self2._paxGlobal = headers$1.decodePax(b.slice(0, size));
    b.consume(size);
    onstreamend();
  };
  var onpaxheader = function() {
    var size = self2._header.size;
    self2._pax = headers$1.decodePax(b.slice(0, size));
    if (self2._paxGlobal)
      self2._pax = xtend(self2._paxGlobal, self2._pax);
    b.consume(size);
    onstreamend();
  };
  var ongnulongpath = function() {
    var size = self2._header.size;
    this._gnuLongPath = headers$1.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
    b.consume(size);
    onstreamend();
  };
  var ongnulonglinkpath = function() {
    var size = self2._header.size;
    this._gnuLongLinkPath = headers$1.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
    b.consume(size);
    onstreamend();
  };
  var onheader = function() {
    var offset = self2._offset;
    var header;
    try {
      header = self2._header = headers$1.decode(b.slice(0, 512), opts.filenameEncoding);
    } catch (err) {
      self2.emit("error", err);
    }
    b.consume(512);
    if (!header) {
      self2._parse(512, onheader);
      oncontinue();
      return;
    }
    if (header.type === "gnu-long-path") {
      self2._parse(header.size, ongnulongpath);
      oncontinue();
      return;
    }
    if (header.type === "gnu-long-link-path") {
      self2._parse(header.size, ongnulonglinkpath);
      oncontinue();
      return;
    }
    if (header.type === "pax-global-header") {
      self2._parse(header.size, onpaxglobalheader);
      oncontinue();
      return;
    }
    if (header.type === "pax-header") {
      self2._parse(header.size, onpaxheader);
      oncontinue();
      return;
    }
    if (self2._gnuLongPath) {
      header.name = self2._gnuLongPath;
      self2._gnuLongPath = null;
    }
    if (self2._gnuLongLinkPath) {
      header.linkname = self2._gnuLongLinkPath;
      self2._gnuLongLinkPath = null;
    }
    if (self2._pax) {
      self2._header = header = mixinPax(header, self2._pax);
      self2._pax = null;
    }
    self2._locked = true;
    if (!header.size || header.type === "directory") {
      self2._parse(512, onheader);
      self2.emit("entry", header, emptyStream(self2, offset), onunlock);
      return;
    }
    self2._stream = new Source(self2, offset);
    self2.emit("entry", header, self2._stream, onunlock);
    self2._parse(header.size, onstreamend);
    oncontinue();
  };
  this._onheader = onheader;
  this._parse(512, onheader);
};
util$5.inherits(Extract, Writable$3);
Extract.prototype.destroy = function(err) {
  if (this._destroyed)
    return;
  this._destroyed = true;
  if (err)
    this.emit("error", err);
  this.emit("close");
  if (this._stream)
    this._stream.emit("close");
};
Extract.prototype._parse = function(size, onparse) {
  if (this._destroyed)
    return;
  this._offset += size;
  this._missing = size;
  if (onparse === this._onheader)
    this._partial = false;
  this._onparse = onparse;
};
Extract.prototype._continue = function() {
  if (this._destroyed)
    return;
  var cb = this._cb;
  this._cb = noop$4;
  if (this._overflow)
    this._write(this._overflow, void 0, cb);
  else
    cb();
};
Extract.prototype._write = function(data, enc, cb) {
  if (this._destroyed)
    return;
  var s = this._stream;
  var b = this._buffer;
  var missing = this._missing;
  if (data.length)
    this._partial = true;
  if (data.length < missing) {
    this._missing -= data.length;
    this._overflow = null;
    if (s)
      return s.write(data, cb);
    b.append(data);
    return cb();
  }
  this._cb = cb;
  this._missing = 0;
  var overflow2 = null;
  if (data.length > missing) {
    overflow2 = data.slice(missing);
    data = data.slice(0, missing);
  }
  if (s)
    s.end(data);
  else
    b.append(data);
  this._overflow = overflow2;
  this._onparse();
};
Extract.prototype._final = function(cb) {
  if (this._partial)
    return this.destroy(new Error("Unexpected end of data"));
  cb();
};
var extract$1 = Extract;
var browser$1 = { exports: {} };
(function(module2) {
  module2.exports = require$$0__default.default;
})(browser$1);
var once$3 = { exports: {} };
var wrappy_1 = wrappy$1;
function wrappy$1(fn, cb) {
  if (fn && cb)
    return wrappy$1(fn)(cb);
  if (typeof fn !== "function")
    throw new TypeError("need wrapper function");
  Object.keys(fn).forEach(function(k) {
    wrapper[k] = fn[k];
  });
  return wrapper;
  function wrapper() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    var ret = fn.apply(this, args);
    var cb2 = args[args.length - 1];
    if (typeof ret === "function" && ret !== cb2) {
      Object.keys(cb2).forEach(function(k) {
        ret[k] = cb2[k];
      });
    }
    return ret;
  }
}
var wrappy = wrappy_1;
once$3.exports = wrappy(once$2);
once$3.exports.strict = wrappy(onceStrict);
once$2.proto = once$2(function() {
  Object.defineProperty(Function.prototype, "once", {
    value: function() {
      return once$2(this);
    },
    configurable: true
  });
  Object.defineProperty(Function.prototype, "onceStrict", {
    value: function() {
      return onceStrict(this);
    },
    configurable: true
  });
});
function once$2(fn) {
  var f = function() {
    if (f.called)
      return f.value;
    f.called = true;
    return f.value = fn.apply(this, arguments);
  };
  f.called = false;
  return f;
}
function onceStrict(fn) {
  var f = function() {
    if (f.called)
      throw new Error(f.onceError);
    f.called = true;
    return f.value = fn.apply(this, arguments);
  };
  var name2 = fn.name || "Function wrapped with `once`";
  f.onceError = name2 + " shouldn't be called more than once";
  f.called = false;
  return f;
}
var once$1 = once$3.exports;
var noop$3 = function() {
};
var isRequest$1 = function(stream2) {
  return stream2.setHeader && typeof stream2.abort === "function";
};
var isChildProcess = function(stream2) {
  return stream2.stdio && Array.isArray(stream2.stdio) && stream2.stdio.length === 3;
};
var eos$2 = function(stream2, opts, callback) {
  if (typeof opts === "function")
    return eos$2(stream2, null, opts);
  if (!opts)
    opts = {};
  callback = once$1(callback || noop$3);
  var ws = stream2._writableState;
  var rs = stream2._readableState;
  var readable = opts.readable || opts.readable !== false && stream2.readable;
  var writable = opts.writable || opts.writable !== false && stream2.writable;
  var cancelled = false;
  var onlegacyfinish = function() {
    if (!stream2.writable)
      onfinish();
  };
  var onfinish = function() {
    writable = false;
    if (!readable)
      callback.call(stream2);
  };
  var onend = function() {
    readable = false;
    if (!writable)
      callback.call(stream2);
  };
  var onexit = function(exitCode) {
    callback.call(stream2, exitCode ? new Error("exited with error code: " + exitCode) : null);
  };
  var onerror = function(err) {
    callback.call(stream2, err);
  };
  var onclose = function() {
    process.nextTick(onclosenexttick);
  };
  var onclosenexttick = function() {
    if (cancelled)
      return;
    if (readable && !(rs && (rs.ended && !rs.destroyed)))
      return callback.call(stream2, new Error("premature close"));
    if (writable && !(ws && (ws.ended && !ws.destroyed)))
      return callback.call(stream2, new Error("premature close"));
  };
  var onrequest = function() {
    stream2.req.on("finish", onfinish);
  };
  if (isRequest$1(stream2)) {
    stream2.on("complete", onfinish);
    stream2.on("abort", onclose);
    if (stream2.req)
      onrequest();
    else
      stream2.on("request", onrequest);
  } else if (writable && !ws) {
    stream2.on("end", onlegacyfinish);
    stream2.on("close", onlegacyfinish);
  }
  if (isChildProcess(stream2))
    stream2.on("exit", onexit);
  stream2.on("end", onend);
  stream2.on("finish", onfinish);
  if (opts.error !== false)
    stream2.on("error", onerror);
  stream2.on("close", onclose);
  return function() {
    cancelled = true;
    stream2.removeListener("complete", onfinish);
    stream2.removeListener("abort", onclose);
    stream2.removeListener("request", onrequest);
    if (stream2.req)
      stream2.req.removeListener("finish", onfinish);
    stream2.removeListener("end", onlegacyfinish);
    stream2.removeListener("close", onlegacyfinish);
    stream2.removeListener("finish", onfinish);
    stream2.removeListener("exit", onexit);
    stream2.removeListener("end", onend);
    stream2.removeListener("error", onerror);
    stream2.removeListener("close", onclose);
  };
};
var endOfStream = eos$2;
var constants = browser$1.exports;
var eos$1 = endOfStream;
var util$4 = require$$1__default.default;
var alloc = bufferAlloc;
var toBuffer = toBuffer_1;
var Readable$3 = readableBrowser.exports.Readable;
var Writable$2 = readableBrowser.exports.Writable;
var StringDecoder = require$$6__default.default.StringDecoder;
var headers = headers$2;
var DMODE = parseInt("755", 8);
var FMODE = parseInt("644", 8);
var END_OF_TAR = alloc(1024);
var noop$2 = function() {
};
var overflow = function(self2, size) {
  size &= 511;
  if (size)
    self2.push(END_OF_TAR.slice(0, 512 - size));
};
function modeToType(mode) {
  switch (mode & constants.S_IFMT) {
    case constants.S_IFBLK:
      return "block-device";
    case constants.S_IFCHR:
      return "character-device";
    case constants.S_IFDIR:
      return "directory";
    case constants.S_IFIFO:
      return "fifo";
    case constants.S_IFLNK:
      return "symlink";
  }
  return "file";
}
var Sink = function(to) {
  Writable$2.call(this);
  this.written = 0;
  this._to = to;
  this._destroyed = false;
};
util$4.inherits(Sink, Writable$2);
Sink.prototype._write = function(data, enc, cb) {
  this.written += data.length;
  if (this._to.push(data))
    return cb();
  this._to._drain = cb;
};
Sink.prototype.destroy = function() {
  if (this._destroyed)
    return;
  this._destroyed = true;
  this.emit("close");
};
var LinkSink = function() {
  Writable$2.call(this);
  this.linkname = "";
  this._decoder = new StringDecoder("utf-8");
  this._destroyed = false;
};
util$4.inherits(LinkSink, Writable$2);
LinkSink.prototype._write = function(data, enc, cb) {
  this.linkname += this._decoder.write(data);
  cb();
};
LinkSink.prototype.destroy = function() {
  if (this._destroyed)
    return;
  this._destroyed = true;
  this.emit("close");
};
var Void = function() {
  Writable$2.call(this);
  this._destroyed = false;
};
util$4.inherits(Void, Writable$2);
Void.prototype._write = function(data, enc, cb) {
  cb(new Error("No body allowed for this entry"));
};
Void.prototype.destroy = function() {
  if (this._destroyed)
    return;
  this._destroyed = true;
  this.emit("close");
};
var Pack = function(opts) {
  if (!(this instanceof Pack))
    return new Pack(opts);
  Readable$3.call(this, opts);
  this._drain = noop$2;
  this._finalized = false;
  this._finalizing = false;
  this._destroyed = false;
  this._stream = null;
};
util$4.inherits(Pack, Readable$3);
Pack.prototype.entry = function(header, buffer2, callback) {
  if (this._stream)
    throw new Error("already piping an entry");
  if (this._finalized || this._destroyed)
    return;
  if (typeof buffer2 === "function") {
    callback = buffer2;
    buffer2 = null;
  }
  if (!callback)
    callback = noop$2;
  var self2 = this;
  if (!header.size || header.type === "symlink")
    header.size = 0;
  if (!header.type)
    header.type = modeToType(header.mode);
  if (!header.mode)
    header.mode = header.type === "directory" ? DMODE : FMODE;
  if (!header.uid)
    header.uid = 0;
  if (!header.gid)
    header.gid = 0;
  if (!header.mtime)
    header.mtime = new Date();
  if (typeof buffer2 === "string")
    buffer2 = toBuffer(buffer2);
  if (Buffer.isBuffer(buffer2)) {
    header.size = buffer2.length;
    this._encode(header);
    this.push(buffer2);
    overflow(self2, header.size);
    process.nextTick(callback);
    return new Void();
  }
  if (header.type === "symlink" && !header.linkname) {
    var linkSink = new LinkSink();
    eos$1(linkSink, function(err) {
      if (err) {
        self2.destroy();
        return callback(err);
      }
      header.linkname = linkSink.linkname;
      self2._encode(header);
      callback();
    });
    return linkSink;
  }
  this._encode(header);
  if (header.type !== "file" && header.type !== "contiguous-file") {
    process.nextTick(callback);
    return new Void();
  }
  var sink = new Sink(this);
  this._stream = sink;
  eos$1(sink, function(err) {
    self2._stream = null;
    if (err) {
      self2.destroy();
      return callback(err);
    }
    if (sink.written !== header.size) {
      self2.destroy();
      return callback(new Error("size mismatch"));
    }
    overflow(self2, header.size);
    if (self2._finalizing)
      self2.finalize();
    callback();
  });
  return sink;
};
Pack.prototype.finalize = function() {
  if (this._stream) {
    this._finalizing = true;
    return;
  }
  if (this._finalized)
    return;
  this._finalized = true;
  this.push(END_OF_TAR);
  this.push(null);
};
Pack.prototype.destroy = function(err) {
  if (this._destroyed)
    return;
  this._destroyed = true;
  if (err)
    this.emit("error", err);
  this.emit("close");
  if (this._stream && this._stream.destroy)
    this._stream.destroy();
};
Pack.prototype._encode = function(header) {
  if (!header.pax) {
    var buf = headers.encode(header);
    if (buf) {
      this.push(buf);
      return;
    }
  }
  this._encodePax(header);
};
Pack.prototype._encodePax = function(header) {
  var paxHeader = headers.encodePax({
    name: header.name,
    linkname: header.linkname,
    pax: header.pax
  });
  var newHeader = {
    name: "PaxHeader",
    mode: header.mode,
    uid: header.uid,
    gid: header.gid,
    size: paxHeader.length,
    mtime: header.mtime,
    type: "pax-header",
    linkname: header.linkname && "PaxHeader",
    uname: header.uname,
    gname: header.gname,
    devmajor: header.devmajor,
    devminor: header.devminor
  };
  this.push(headers.encode(newHeader));
  this.push(paxHeader);
  overflow(this, paxHeader.length);
  newHeader.size = header.size;
  newHeader.type = header.type;
  this.push(headers.encode(newHeader));
};
Pack.prototype._read = function(n) {
  var drain = this._drain;
  this._drain = noop$2;
  drain();
};
var pack = Pack;
tarStream$1.extract = extract$1;
tarStream$1.pack = pack;
const fileType$8 = fileType$9;
const isStream$2 = isStream$4.exports;
const tarStream = tarStream$1;
var decompressTar$3 = () => (input) => {
  if (!Buffer.isBuffer(input) && !isStream$2(input)) {
    return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
  }
  if (Buffer.isBuffer(input) && (!fileType$8(input) || fileType$8(input).ext !== "tar")) {
    return Promise.resolve([]);
  }
  const extract2 = tarStream.extract();
  const files2 = [];
  extract2.on("entry", (header, stream2, cb) => {
    const chunk = [];
    stream2.on("data", (data) => chunk.push(data));
    stream2.on("end", () => {
      const file2 = {
        data: Buffer.concat(chunk),
        mode: header.mode,
        mtime: header.mtime,
        path: header.name,
        type: header.type
      };
      if (header.type === "symlink" || header.type === "link") {
        file2.linkname = header.linkname;
      }
      files2.push(file2);
      cb();
    });
  });
  const promise = new Promise((resolve2, reject2) => {
    if (!Buffer.isBuffer(input)) {
      input.on("error", reject2);
    }
    extract2.on("finish", () => resolve2(files2));
    extract2.on("error", reject2);
  });
  extract2.then = promise.then.bind(promise);
  extract2.catch = promise.catch.bind(promise);
  if (Buffer.isBuffer(input)) {
    extract2.end(input);
  } else {
    input.pipe(extract2);
  }
  return extract2;
};
const toBytes = (s) => Array.from(s).map((c) => c.charCodeAt(0));
const xpiZipFilename = toBytes("META-INF/mozilla.rsa");
const oxmlContentTypes = toBytes("[Content_Types].xml");
const oxmlRels = toBytes("_rels/.rels");
var fileType$7 = (input) => {
  const buf = new Uint8Array(input);
  if (!(buf && buf.length > 1)) {
    return null;
  }
  const check = (header, opts) => {
    opts = Object.assign({
      offset: 0
    }, opts);
    for (let i = 0; i < header.length; i++) {
      if (opts.mask) {
        if (header[i] !== (opts.mask[i] & buf[i + opts.offset])) {
          return false;
        }
      } else if (header[i] !== buf[i + opts.offset]) {
        return false;
      }
    }
    return true;
  };
  if (check([255, 216, 255])) {
    return {
      ext: "jpg",
      mime: "image/jpeg"
    };
  }
  if (check([137, 80, 78, 71, 13, 10, 26, 10])) {
    return {
      ext: "png",
      mime: "image/png"
    };
  }
  if (check([71, 73, 70])) {
    return {
      ext: "gif",
      mime: "image/gif"
    };
  }
  if (check([87, 69, 66, 80], { offset: 8 })) {
    return {
      ext: "webp",
      mime: "image/webp"
    };
  }
  if (check([70, 76, 73, 70])) {
    return {
      ext: "flif",
      mime: "image/flif"
    };
  }
  if ((check([73, 73, 42, 0]) || check([77, 77, 0, 42])) && check([67, 82], { offset: 8 })) {
    return {
      ext: "cr2",
      mime: "image/x-canon-cr2"
    };
  }
  if (check([73, 73, 42, 0]) || check([77, 77, 0, 42])) {
    return {
      ext: "tif",
      mime: "image/tiff"
    };
  }
  if (check([66, 77])) {
    return {
      ext: "bmp",
      mime: "image/bmp"
    };
  }
  if (check([73, 73, 188])) {
    return {
      ext: "jxr",
      mime: "image/vnd.ms-photo"
    };
  }
  if (check([56, 66, 80, 83])) {
    return {
      ext: "psd",
      mime: "image/vnd.adobe.photoshop"
    };
  }
  if (check([80, 75, 3, 4])) {
    if (check([109, 105, 109, 101, 116, 121, 112, 101, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 101, 112, 117, 98, 43, 122, 105, 112], { offset: 30 })) {
      return {
        ext: "epub",
        mime: "application/epub+zip"
      };
    }
    if (check(xpiZipFilename, { offset: 30 })) {
      return {
        ext: "xpi",
        mime: "application/x-xpinstall"
      };
    }
    if (check(oxmlContentTypes, { offset: 30 }) || check(oxmlRels, { offset: 30 })) {
      const sliced = buf.subarray(4, 4 + 2e3);
      const nextZipHeaderIndex = (arr) => arr.findIndex((el, i, arr2) => arr2[i] === 80 && arr2[i + 1] === 75 && arr2[i + 2] === 3 && arr2[i + 3] === 4);
      const header2Pos = nextZipHeaderIndex(sliced);
      if (header2Pos !== -1) {
        const slicedAgain = buf.subarray(header2Pos + 8, header2Pos + 8 + 1e3);
        const header3Pos = nextZipHeaderIndex(slicedAgain);
        if (header3Pos !== -1) {
          const offset = 8 + header2Pos + header3Pos + 30;
          if (check(toBytes("word/"), { offset })) {
            return {
              ext: "docx",
              mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            };
          }
          if (check(toBytes("ppt/"), { offset })) {
            return {
              ext: "pptx",
              mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            };
          }
          if (check(toBytes("xl/"), { offset })) {
            return {
              ext: "xlsx",
              mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            };
          }
        }
      }
    }
  }
  if (check([80, 75]) && (buf[2] === 3 || buf[2] === 5 || buf[2] === 7) && (buf[3] === 4 || buf[3] === 6 || buf[3] === 8)) {
    return {
      ext: "zip",
      mime: "application/zip"
    };
  }
  if (check([117, 115, 116, 97, 114], { offset: 257 })) {
    return {
      ext: "tar",
      mime: "application/x-tar"
    };
  }
  if (check([82, 97, 114, 33, 26, 7]) && (buf[6] === 0 || buf[6] === 1)) {
    return {
      ext: "rar",
      mime: "application/x-rar-compressed"
    };
  }
  if (check([31, 139, 8])) {
    return {
      ext: "gz",
      mime: "application/gzip"
    };
  }
  if (check([66, 90, 104])) {
    return {
      ext: "bz2",
      mime: "application/x-bzip2"
    };
  }
  if (check([55, 122, 188, 175, 39, 28])) {
    return {
      ext: "7z",
      mime: "application/x-7z-compressed"
    };
  }
  if (check([120, 1])) {
    return {
      ext: "dmg",
      mime: "application/x-apple-diskimage"
    };
  }
  if (check([51, 103, 112, 53]) || check([0, 0, 0]) && check([102, 116, 121, 112], { offset: 4 }) && (check([109, 112, 52, 49], { offset: 8 }) || check([109, 112, 52, 50], { offset: 8 }) || check([105, 115, 111, 109], { offset: 8 }) || check([105, 115, 111, 50], { offset: 8 }) || check([109, 109, 112, 52], { offset: 8 }) || check([77, 52, 86], { offset: 8 }) || check([100, 97, 115, 104], { offset: 8 }))) {
    return {
      ext: "mp4",
      mime: "video/mp4"
    };
  }
  if (check([77, 84, 104, 100])) {
    return {
      ext: "mid",
      mime: "audio/midi"
    };
  }
  if (check([26, 69, 223, 163])) {
    const sliced = buf.subarray(4, 4 + 4096);
    const idPos = sliced.findIndex((el, i, arr) => arr[i] === 66 && arr[i + 1] === 130);
    if (idPos !== -1) {
      const docTypePos = idPos + 3;
      const findDocType = (type) => Array.from(type).every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));
      if (findDocType("matroska")) {
        return {
          ext: "mkv",
          mime: "video/x-matroska"
        };
      }
      if (findDocType("webm")) {
        return {
          ext: "webm",
          mime: "video/webm"
        };
      }
    }
  }
  if (check([0, 0, 0, 20, 102, 116, 121, 112, 113, 116, 32, 32]) || check([102, 114, 101, 101], { offset: 4 }) || check([102, 116, 121, 112, 113, 116, 32, 32], { offset: 4 }) || check([109, 100, 97, 116], { offset: 4 }) || check([119, 105, 100, 101], { offset: 4 })) {
    return {
      ext: "mov",
      mime: "video/quicktime"
    };
  }
  if (check([82, 73, 70, 70]) && check([65, 86, 73], { offset: 8 })) {
    return {
      ext: "avi",
      mime: "video/x-msvideo"
    };
  }
  if (check([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
    return {
      ext: "wmv",
      mime: "video/x-ms-wmv"
    };
  }
  if (check([0, 0, 1, 186])) {
    return {
      ext: "mpg",
      mime: "video/mpeg"
    };
  }
  for (let start = 0; start < 2 && start < buf.length - 16; start++) {
    if (check([73, 68, 51], { offset: start }) || check([255, 226], { offset: start, mask: [255, 226] })) {
      return {
        ext: "mp3",
        mime: "audio/mpeg"
      };
    }
  }
  if (check([102, 116, 121, 112, 77, 52, 65], { offset: 4 }) || check([77, 52, 65, 32])) {
    return {
      ext: "m4a",
      mime: "audio/m4a"
    };
  }
  if (check([79, 112, 117, 115, 72, 101, 97, 100], { offset: 28 })) {
    return {
      ext: "opus",
      mime: "audio/opus"
    };
  }
  if (check([79, 103, 103, 83])) {
    return {
      ext: "ogg",
      mime: "audio/ogg"
    };
  }
  if (check([102, 76, 97, 67])) {
    return {
      ext: "flac",
      mime: "audio/x-flac"
    };
  }
  if (check([82, 73, 70, 70]) && check([87, 65, 86, 69], { offset: 8 })) {
    return {
      ext: "wav",
      mime: "audio/x-wav"
    };
  }
  if (check([35, 33, 65, 77, 82, 10])) {
    return {
      ext: "amr",
      mime: "audio/amr"
    };
  }
  if (check([37, 80, 68, 70])) {
    return {
      ext: "pdf",
      mime: "application/pdf"
    };
  }
  if (check([77, 90])) {
    return {
      ext: "exe",
      mime: "application/x-msdownload"
    };
  }
  if ((buf[0] === 67 || buf[0] === 70) && check([87, 83], { offset: 1 })) {
    return {
      ext: "swf",
      mime: "application/x-shockwave-flash"
    };
  }
  if (check([123, 92, 114, 116, 102])) {
    return {
      ext: "rtf",
      mime: "application/rtf"
    };
  }
  if (check([0, 97, 115, 109])) {
    return {
      ext: "wasm",
      mime: "application/wasm"
    };
  }
  if (check([119, 79, 70, 70]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
    return {
      ext: "woff",
      mime: "font/woff"
    };
  }
  if (check([119, 79, 70, 50]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
    return {
      ext: "woff2",
      mime: "font/woff2"
    };
  }
  if (check([76, 80], { offset: 34 }) && (check([0, 0, 1], { offset: 8 }) || check([1, 0, 2], { offset: 8 }) || check([2, 0, 2], { offset: 8 }))) {
    return {
      ext: "eot",
      mime: "application/octet-stream"
    };
  }
  if (check([0, 1, 0, 0, 0])) {
    return {
      ext: "ttf",
      mime: "font/ttf"
    };
  }
  if (check([79, 84, 84, 79, 0])) {
    return {
      ext: "otf",
      mime: "font/otf"
    };
  }
  if (check([0, 0, 1, 0])) {
    return {
      ext: "ico",
      mime: "image/x-icon"
    };
  }
  if (check([70, 76, 86, 1])) {
    return {
      ext: "flv",
      mime: "video/x-flv"
    };
  }
  if (check([37, 33])) {
    return {
      ext: "ps",
      mime: "application/postscript"
    };
  }
  if (check([253, 55, 122, 88, 90, 0])) {
    return {
      ext: "xz",
      mime: "application/x-xz"
    };
  }
  if (check([83, 81, 76, 105])) {
    return {
      ext: "sqlite",
      mime: "application/x-sqlite3"
    };
  }
  if (check([78, 69, 83, 26])) {
    return {
      ext: "nes",
      mime: "application/x-nintendo-nes-rom"
    };
  }
  if (check([67, 114, 50, 52])) {
    return {
      ext: "crx",
      mime: "application/x-google-chrome-extension"
    };
  }
  if (check([77, 83, 67, 70]) || check([73, 83, 99, 40])) {
    return {
      ext: "cab",
      mime: "application/vnd.ms-cab-compressed"
    };
  }
  if (check([33, 60, 97, 114, 99, 104, 62, 10, 100, 101, 98, 105, 97, 110, 45, 98, 105, 110, 97, 114, 121])) {
    return {
      ext: "deb",
      mime: "application/x-deb"
    };
  }
  if (check([33, 60, 97, 114, 99, 104, 62])) {
    return {
      ext: "ar",
      mime: "application/x-unix-archive"
    };
  }
  if (check([237, 171, 238, 219])) {
    return {
      ext: "rpm",
      mime: "application/x-rpm"
    };
  }
  if (check([31, 160]) || check([31, 157])) {
    return {
      ext: "Z",
      mime: "application/x-compress"
    };
  }
  if (check([76, 90, 73, 80])) {
    return {
      ext: "lz",
      mime: "application/x-lzip"
    };
  }
  if (check([208, 207, 17, 224, 161, 177, 26, 225])) {
    return {
      ext: "msi",
      mime: "application/x-msi"
    };
  }
  if (check([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) {
    return {
      ext: "mxf",
      mime: "application/mxf"
    };
  }
  if (check([71], { offset: 4 }) && (check([71], { offset: 192 }) || check([71], { offset: 196 }))) {
    return {
      ext: "mts",
      mime: "video/mp2t"
    };
  }
  if (check([66, 76, 69, 78, 68, 69, 82])) {
    return {
      ext: "blend",
      mime: "application/x-blender"
    };
  }
  if (check([66, 80, 71, 251])) {
    return {
      ext: "bpg",
      mime: "image/bpg"
    };
  }
  return null;
};
var BITMASK$1 = [0, 1, 3, 7, 15, 31, 63, 127, 255];
var BitReader$1 = function(stream2) {
  this.stream = stream2;
  this.bitOffset = 0;
  this.curByte = 0;
  this.hasByte = false;
};
BitReader$1.prototype._ensureByte = function() {
  if (!this.hasByte) {
    this.curByte = this.stream.readByte();
    this.hasByte = true;
  }
};
BitReader$1.prototype.read = function(bits) {
  var result = 0;
  while (bits > 0) {
    this._ensureByte();
    var remaining = 8 - this.bitOffset;
    if (bits >= remaining) {
      result <<= remaining;
      result |= BITMASK$1[remaining] & this.curByte;
      this.hasByte = false;
      this.bitOffset = 0;
      bits -= remaining;
    } else {
      result <<= bits;
      var shift = remaining - bits;
      result |= (this.curByte & BITMASK$1[bits] << shift) >> shift;
      this.bitOffset += bits;
      bits = 0;
    }
  }
  return result;
};
BitReader$1.prototype.seek = function(pos) {
  var n_bit = pos % 8;
  var n_byte = (pos - n_bit) / 8;
  this.bitOffset = n_bit;
  this.stream.seek(n_byte);
  this.hasByte = false;
};
BitReader$1.prototype.pi = function() {
  var buf = new Buffer(6), i;
  for (i = 0; i < buf.length; i++) {
    buf[i] = this.read(8);
  }
  return buf.toString("hex");
};
var bitreader = BitReader$1;
var Stream$1 = function() {
};
Stream$1.prototype.readByte = function() {
  throw new Error("abstract method readByte() not implemented");
};
Stream$1.prototype.read = function(buffer2, bufOffset, length) {
  var bytesRead = 0;
  while (bytesRead < length) {
    var c = this.readByte();
    if (c < 0) {
      return bytesRead === 0 ? -1 : bytesRead;
    }
    buffer2[bufOffset++] = c;
    bytesRead++;
  }
  return bytesRead;
};
Stream$1.prototype.seek = function(new_pos) {
  throw new Error("abstract method seek() not implemented");
};
Stream$1.prototype.writeByte = function(_byte) {
  throw new Error("abstract method readByte() not implemented");
};
Stream$1.prototype.write = function(buffer2, bufOffset, length) {
  var i;
  for (i = 0; i < length; i++) {
    this.writeByte(buffer2[bufOffset++]);
  }
  return length;
};
Stream$1.prototype.flush = function() {
};
var stream$2 = Stream$1;
var crc32$2 = function() {
  var crc32Lookup = new Uint32Array([
    0,
    79764919,
    159529838,
    222504665,
    319059676,
    398814059,
    445009330,
    507990021,
    638119352,
    583659535,
    797628118,
    726387553,
    890018660,
    835552979,
    1015980042,
    944750013,
    1276238704,
    1221641927,
    1167319070,
    1095957929,
    1595256236,
    1540665371,
    1452775106,
    1381403509,
    1780037320,
    1859660671,
    1671105958,
    1733955601,
    2031960084,
    2111593891,
    1889500026,
    1952343757,
    2552477408,
    2632100695,
    2443283854,
    2506133561,
    2334638140,
    2414271883,
    2191915858,
    2254759653,
    3190512472,
    3135915759,
    3081330742,
    3009969537,
    2905550212,
    2850959411,
    2762807018,
    2691435357,
    3560074640,
    3505614887,
    3719321342,
    3648080713,
    3342211916,
    3287746299,
    3467911202,
    3396681109,
    4063920168,
    4143685023,
    4223187782,
    4286162673,
    3779000052,
    3858754371,
    3904687514,
    3967668269,
    881225847,
    809987520,
    1023691545,
    969234094,
    662832811,
    591600412,
    771767749,
    717299826,
    311336399,
    374308984,
    453813921,
    533576470,
    25881363,
    88864420,
    134795389,
    214552010,
    2023205639,
    2086057648,
    1897238633,
    1976864222,
    1804852699,
    1867694188,
    1645340341,
    1724971778,
    1587496639,
    1516133128,
    1461550545,
    1406951526,
    1302016099,
    1230646740,
    1142491917,
    1087903418,
    2896545431,
    2825181984,
    2770861561,
    2716262478,
    3215044683,
    3143675388,
    3055782693,
    3001194130,
    2326604591,
    2389456536,
    2200899649,
    2280525302,
    2578013683,
    2640855108,
    2418763421,
    2498394922,
    3769900519,
    3832873040,
    3912640137,
    3992402750,
    4088425275,
    4151408268,
    4197601365,
    4277358050,
    3334271071,
    3263032808,
    3476998961,
    3422541446,
    3585640067,
    3514407732,
    3694837229,
    3640369242,
    1762451694,
    1842216281,
    1619975040,
    1682949687,
    2047383090,
    2127137669,
    1938468188,
    2001449195,
    1325665622,
    1271206113,
    1183200824,
    1111960463,
    1543535498,
    1489069629,
    1434599652,
    1363369299,
    622672798,
    568075817,
    748617968,
    677256519,
    907627842,
    853037301,
    1067152940,
    995781531,
    51762726,
    131386257,
    177728840,
    240578815,
    269590778,
    349224269,
    429104020,
    491947555,
    4046411278,
    4126034873,
    4172115296,
    4234965207,
    3794477266,
    3874110821,
    3953728444,
    4016571915,
    3609705398,
    3555108353,
    3735388376,
    3664026991,
    3290680682,
    3236090077,
    3449943556,
    3378572211,
    3174993278,
    3120533705,
    3032266256,
    2961025959,
    2923101090,
    2868635157,
    2813903052,
    2742672763,
    2604032198,
    2683796849,
    2461293480,
    2524268063,
    2284983834,
    2364738477,
    2175806836,
    2238787779,
    1569362073,
    1498123566,
    1409854455,
    1355396672,
    1317987909,
    1246755826,
    1192025387,
    1137557660,
    2072149281,
    2135122070,
    1912620623,
    1992383480,
    1753615357,
    1816598090,
    1627664531,
    1707420964,
    295390185,
    358241886,
    404320391,
    483945776,
    43990325,
    106832002,
    186451547,
    266083308,
    932423249,
    861060070,
    1041341759,
    986742920,
    613929101,
    542559546,
    756411363,
    701822548,
    3316196985,
    3244833742,
    3425377559,
    3370778784,
    3601682597,
    3530312978,
    3744426955,
    3689838204,
    3819031489,
    3881883254,
    3928223919,
    4007849240,
    4037393693,
    4100235434,
    4180117107,
    4259748804,
    2310601993,
    2373574846,
    2151335527,
    2231098320,
    2596047829,
    2659030626,
    2470359227,
    2550115596,
    2947551409,
    2876312838,
    2788305887,
    2733848168,
    3165939309,
    3094707162,
    3040238851,
    2985771188
  ]);
  var CRC322 = function() {
    var crc = 4294967295;
    this.getCRC = function() {
      return ~crc >>> 0;
    };
    this.updateCRC = function(value) {
      crc = crc << 8 ^ crc32Lookup[(crc >>> 24 ^ value) & 255];
    };
    this.updateCRCRun = function(value, count) {
      while (count-- > 0) {
        crc = crc << 8 ^ crc32Lookup[(crc >>> 24 ^ value) & 255];
      }
    };
  };
  return CRC322;
}();
const name$1 = "seek-bzip";
const version$1 = "1.0.6";
const contributors = [
  "C. Scott Ananian (http://cscott.net)",
  "Eli Skeggs",
  "Kevin Kwok",
  "Rob Landley (http://landley.net)"
];
const description$1 = "a pure-JavaScript Node.JS module for random-access decoding bzip2 data";
const main = "./lib/index.js";
const repository$1 = {
  type: "git",
  url: "https://github.com/cscott/seek-bzip.git"
};
const license$1 = "MIT";
const bin = {
  "seek-bunzip": "./bin/seek-bunzip",
  "seek-table": "./bin/seek-bzip-table"
};
const directories = {
  test: "test"
};
const dependencies$1 = {
  commander: "^2.8.1"
};
const devDependencies$1 = {
  fibers: "~1.0.6",
  mocha: "~2.2.5"
};
const scripts$1 = {
  test: "mocha"
};
const require$$3 = {
  name: name$1,
  version: version$1,
  contributors,
  description: description$1,
  main,
  repository: repository$1,
  license: license$1,
  bin,
  directories,
  dependencies: dependencies$1,
  devDependencies: devDependencies$1,
  scripts: scripts$1
};
var BitReader = bitreader;
var Stream = stream$2;
var CRC32 = crc32$2;
var pjson = require$$3;
var MAX_HUFCODE_BITS = 20;
var MAX_SYMBOLS = 258;
var SYMBOL_RUNA = 0;
var SYMBOL_RUNB = 1;
var MIN_GROUPS = 2;
var MAX_GROUPS = 6;
var GROUP_SIZE = 50;
var WHOLEPI = "314159265359";
var SQRTPI = "177245385090";
var mtf = function(array, index) {
  var src2 = array[index], i;
  for (i = index; i > 0; i--) {
    array[i] = array[i - 1];
  }
  array[0] = src2;
  return src2;
};
var Err = {
  OK: 0,
  LAST_BLOCK: -1,
  NOT_BZIP_DATA: -2,
  UNEXPECTED_INPUT_EOF: -3,
  UNEXPECTED_OUTPUT_EOF: -4,
  DATA_ERROR: -5,
  OUT_OF_MEMORY: -6,
  OBSOLETE_INPUT: -7,
  END_OF_BLOCK: -8
};
var ErrorMessages = {};
ErrorMessages[Err.LAST_BLOCK] = "Bad file checksum";
ErrorMessages[Err.NOT_BZIP_DATA] = "Not bzip data";
ErrorMessages[Err.UNEXPECTED_INPUT_EOF] = "Unexpected input EOF";
ErrorMessages[Err.UNEXPECTED_OUTPUT_EOF] = "Unexpected output EOF";
ErrorMessages[Err.DATA_ERROR] = "Data error";
ErrorMessages[Err.OUT_OF_MEMORY] = "Out of memory";
ErrorMessages[Err.OBSOLETE_INPUT] = "Obsolete (pre 0.9.5) bzip format not supported.";
var _throw = function(status, optDetail) {
  var msg = ErrorMessages[status] || "unknown error";
  if (optDetail) {
    msg += ": " + optDetail;
  }
  var e = new TypeError(msg);
  e.errorCode = status;
  throw e;
};
var Bunzip = function(inputStream, outputStream) {
  this.writePos = this.writeCurrent = this.writeCount = 0;
  this._start_bunzip(inputStream, outputStream);
};
Bunzip.prototype._init_block = function() {
  var moreBlocks = this._get_next_block();
  if (!moreBlocks) {
    this.writeCount = -1;
    return false;
  }
  this.blockCRC = new CRC32();
  return true;
};
Bunzip.prototype._start_bunzip = function(inputStream, outputStream) {
  var buf = new Buffer(4);
  if (inputStream.read(buf, 0, 4) !== 4 || String.fromCharCode(buf[0], buf[1], buf[2]) !== "BZh")
    _throw(Err.NOT_BZIP_DATA, "bad magic");
  var level = buf[3] - 48;
  if (level < 1 || level > 9)
    _throw(Err.NOT_BZIP_DATA, "level out of range");
  this.reader = new BitReader(inputStream);
  this.dbufSize = 1e5 * level;
  this.nextoutput = 0;
  this.outputStream = outputStream;
  this.streamCRC = 0;
};
Bunzip.prototype._get_next_block = function() {
  var i, j, k;
  var reader = this.reader;
  var h = reader.pi();
  if (h === SQRTPI) {
    return false;
  }
  if (h !== WHOLEPI)
    _throw(Err.NOT_BZIP_DATA);
  this.targetBlockCRC = reader.read(32) >>> 0;
  this.streamCRC = (this.targetBlockCRC ^ (this.streamCRC << 1 | this.streamCRC >>> 31)) >>> 0;
  if (reader.read(1))
    _throw(Err.OBSOLETE_INPUT);
  var origPointer = reader.read(24);
  if (origPointer > this.dbufSize)
    _throw(Err.DATA_ERROR, "initial position out of bounds");
  var t = reader.read(16);
  var symToByte = new Buffer(256), symTotal = 0;
  for (i = 0; i < 16; i++) {
    if (t & 1 << 15 - i) {
      var o = i * 16;
      k = reader.read(16);
      for (j = 0; j < 16; j++)
        if (k & 1 << 15 - j)
          symToByte[symTotal++] = o + j;
    }
  }
  var groupCount = reader.read(3);
  if (groupCount < MIN_GROUPS || groupCount > MAX_GROUPS)
    _throw(Err.DATA_ERROR);
  var nSelectors = reader.read(15);
  if (nSelectors === 0)
    _throw(Err.DATA_ERROR);
  var mtfSymbol = new Buffer(256);
  for (i = 0; i < groupCount; i++)
    mtfSymbol[i] = i;
  var selectors = new Buffer(nSelectors);
  for (i = 0; i < nSelectors; i++) {
    for (j = 0; reader.read(1); j++)
      if (j >= groupCount)
        _throw(Err.DATA_ERROR);
    selectors[i] = mtf(mtfSymbol, j);
  }
  var symCount = symTotal + 2;
  var groups = [], hufGroup;
  for (j = 0; j < groupCount; j++) {
    var length = new Buffer(symCount), temp = new Uint16Array(MAX_HUFCODE_BITS + 1);
    t = reader.read(5);
    for (i = 0; i < symCount; i++) {
      for (; ; ) {
        if (t < 1 || t > MAX_HUFCODE_BITS)
          _throw(Err.DATA_ERROR);
        if (!reader.read(1))
          break;
        if (!reader.read(1))
          t++;
        else
          t--;
      }
      length[i] = t;
    }
    var minLen, maxLen;
    minLen = maxLen = length[0];
    for (i = 1; i < symCount; i++) {
      if (length[i] > maxLen)
        maxLen = length[i];
      else if (length[i] < minLen)
        minLen = length[i];
    }
    hufGroup = {};
    groups.push(hufGroup);
    hufGroup.permute = new Uint16Array(MAX_SYMBOLS);
    hufGroup.limit = new Uint32Array(MAX_HUFCODE_BITS + 2);
    hufGroup.base = new Uint32Array(MAX_HUFCODE_BITS + 1);
    hufGroup.minLen = minLen;
    hufGroup.maxLen = maxLen;
    var pp = 0;
    for (i = minLen; i <= maxLen; i++) {
      temp[i] = hufGroup.limit[i] = 0;
      for (t = 0; t < symCount; t++)
        if (length[t] === i)
          hufGroup.permute[pp++] = t;
    }
    for (i = 0; i < symCount; i++)
      temp[length[i]]++;
    pp = t = 0;
    for (i = minLen; i < maxLen; i++) {
      pp += temp[i];
      hufGroup.limit[i] = pp - 1;
      pp <<= 1;
      t += temp[i];
      hufGroup.base[i + 1] = pp - t;
    }
    hufGroup.limit[maxLen + 1] = Number.MAX_VALUE;
    hufGroup.limit[maxLen] = pp + temp[maxLen] - 1;
    hufGroup.base[minLen] = 0;
  }
  var byteCount = new Uint32Array(256);
  for (i = 0; i < 256; i++)
    mtfSymbol[i] = i;
  var runPos = 0, dbufCount = 0, selector = 0, uc;
  var dbuf = this.dbuf = new Uint32Array(this.dbufSize);
  symCount = 0;
  for (; ; ) {
    if (!symCount--) {
      symCount = GROUP_SIZE - 1;
      if (selector >= nSelectors) {
        _throw(Err.DATA_ERROR);
      }
      hufGroup = groups[selectors[selector++]];
    }
    i = hufGroup.minLen;
    j = reader.read(i);
    for (; ; i++) {
      if (i > hufGroup.maxLen) {
        _throw(Err.DATA_ERROR);
      }
      if (j <= hufGroup.limit[i])
        break;
      j = j << 1 | reader.read(1);
    }
    j -= hufGroup.base[i];
    if (j < 0 || j >= MAX_SYMBOLS) {
      _throw(Err.DATA_ERROR);
    }
    var nextSym = hufGroup.permute[j];
    if (nextSym === SYMBOL_RUNA || nextSym === SYMBOL_RUNB) {
      if (!runPos) {
        runPos = 1;
        t = 0;
      }
      if (nextSym === SYMBOL_RUNA)
        t += runPos;
      else
        t += 2 * runPos;
      runPos <<= 1;
      continue;
    }
    if (runPos) {
      runPos = 0;
      if (dbufCount + t > this.dbufSize) {
        _throw(Err.DATA_ERROR);
      }
      uc = symToByte[mtfSymbol[0]];
      byteCount[uc] += t;
      while (t--)
        dbuf[dbufCount++] = uc;
    }
    if (nextSym > symTotal)
      break;
    if (dbufCount >= this.dbufSize) {
      _throw(Err.DATA_ERROR);
    }
    i = nextSym - 1;
    uc = mtf(mtfSymbol, i);
    uc = symToByte[uc];
    byteCount[uc]++;
    dbuf[dbufCount++] = uc;
  }
  if (origPointer < 0 || origPointer >= dbufCount) {
    _throw(Err.DATA_ERROR);
  }
  j = 0;
  for (i = 0; i < 256; i++) {
    k = j + byteCount[i];
    byteCount[i] = j;
    j = k;
  }
  for (i = 0; i < dbufCount; i++) {
    uc = dbuf[i] & 255;
    dbuf[byteCount[uc]] |= i << 8;
    byteCount[uc]++;
  }
  var pos = 0, current = 0, run = 0;
  if (dbufCount) {
    pos = dbuf[origPointer];
    current = pos & 255;
    pos >>= 8;
    run = -1;
  }
  this.writePos = pos;
  this.writeCurrent = current;
  this.writeCount = dbufCount;
  this.writeRun = run;
  return true;
};
Bunzip.prototype._read_bunzip = function(outputBuffer, len) {
  var copies, previous, outbyte;
  if (this.writeCount < 0) {
    return 0;
  }
  var dbuf = this.dbuf, pos = this.writePos, current = this.writeCurrent;
  var dbufCount = this.writeCount;
  this.outputsize;
  var run = this.writeRun;
  while (dbufCount) {
    dbufCount--;
    previous = current;
    pos = dbuf[pos];
    current = pos & 255;
    pos >>= 8;
    if (run++ === 3) {
      copies = current;
      outbyte = previous;
      current = -1;
    } else {
      copies = 1;
      outbyte = current;
    }
    this.blockCRC.updateCRCRun(outbyte, copies);
    while (copies--) {
      this.outputStream.writeByte(outbyte);
      this.nextoutput++;
    }
    if (current != previous)
      run = 0;
  }
  this.writeCount = dbufCount;
  if (this.blockCRC.getCRC() !== this.targetBlockCRC) {
    _throw(Err.DATA_ERROR, "Bad block CRC (got " + this.blockCRC.getCRC().toString(16) + " expected " + this.targetBlockCRC.toString(16) + ")");
  }
  return this.nextoutput;
};
var coerceInputStream = function(input) {
  if ("readByte" in input) {
    return input;
  }
  var inputStream = new Stream();
  inputStream.pos = 0;
  inputStream.readByte = function() {
    return input[this.pos++];
  };
  inputStream.seek = function(pos) {
    this.pos = pos;
  };
  inputStream.eof = function() {
    return this.pos >= input.length;
  };
  return inputStream;
};
var coerceOutputStream = function(output2) {
  var outputStream = new Stream();
  var resizeOk = true;
  if (output2) {
    if (typeof output2 === "number") {
      outputStream.buffer = new Buffer(output2);
      resizeOk = false;
    } else if ("writeByte" in output2) {
      return output2;
    } else {
      outputStream.buffer = output2;
      resizeOk = false;
    }
  } else {
    outputStream.buffer = new Buffer(16384);
  }
  outputStream.pos = 0;
  outputStream.writeByte = function(_byte) {
    if (resizeOk && this.pos >= this.buffer.length) {
      var newBuffer2 = new Buffer(this.buffer.length * 2);
      this.buffer.copy(newBuffer2);
      this.buffer = newBuffer2;
    }
    this.buffer[this.pos++] = _byte;
  };
  outputStream.getBuffer = function() {
    if (this.pos !== this.buffer.length) {
      if (!resizeOk)
        throw new TypeError("outputsize does not match decoded input");
      var newBuffer2 = new Buffer(this.pos);
      this.buffer.copy(newBuffer2, 0, 0, this.pos);
      this.buffer = newBuffer2;
    }
    return this.buffer;
  };
  outputStream._coerced = true;
  return outputStream;
};
Bunzip.Err = Err;
Bunzip.decode = function(input, output2, multistream) {
  var inputStream = coerceInputStream(input);
  var outputStream = coerceOutputStream(output2);
  var bz = new Bunzip(inputStream, outputStream);
  while (true) {
    if ("eof" in inputStream && inputStream.eof())
      break;
    if (bz._init_block()) {
      bz._read_bunzip();
    } else {
      var targetStreamCRC = bz.reader.read(32) >>> 0;
      if (targetStreamCRC !== bz.streamCRC) {
        _throw(Err.DATA_ERROR, "Bad stream CRC (got " + bz.streamCRC.toString(16) + " expected " + targetStreamCRC.toString(16) + ")");
      }
      if (multistream && "eof" in inputStream && !inputStream.eof()) {
        bz._start_bunzip(inputStream, outputStream);
      } else
        break;
    }
  }
  if ("getBuffer" in outputStream)
    return outputStream.getBuffer();
};
Bunzip.decodeBlock = function(input, pos, output2) {
  var inputStream = coerceInputStream(input);
  var outputStream = coerceOutputStream(output2);
  var bz = new Bunzip(inputStream, outputStream);
  bz.reader.seek(pos);
  var moreBlocks = bz._get_next_block();
  if (moreBlocks) {
    bz.blockCRC = new CRC32();
    bz.writeCopies = 0;
    bz._read_bunzip();
  }
  if ("getBuffer" in outputStream)
    return outputStream.getBuffer();
};
Bunzip.table = function(input, callback, multistream) {
  var inputStream = new Stream();
  inputStream.delegate = coerceInputStream(input);
  inputStream.pos = 0;
  inputStream.readByte = function() {
    this.pos++;
    return this.delegate.readByte();
  };
  if (inputStream.delegate.eof) {
    inputStream.eof = inputStream.delegate.eof.bind(inputStream.delegate);
  }
  var outputStream = new Stream();
  outputStream.pos = 0;
  outputStream.writeByte = function() {
    this.pos++;
  };
  var bz = new Bunzip(inputStream, outputStream);
  var blockSize = bz.dbufSize;
  while (true) {
    if ("eof" in inputStream && inputStream.eof())
      break;
    var position = inputStream.pos * 8 + bz.reader.bitOffset;
    if (bz.reader.hasByte) {
      position -= 8;
    }
    if (bz._init_block()) {
      var start = outputStream.pos;
      bz._read_bunzip();
      callback(position, outputStream.pos - start);
    } else {
      bz.reader.read(32);
      if (multistream && "eof" in inputStream && !inputStream.eof()) {
        bz._start_bunzip(inputStream, outputStream);
        console.assert(
          bz.dbufSize === blockSize,
          "shouldn't change block size within multistream file"
        );
      } else
        break;
    }
  }
};
Bunzip.Stream = Stream;
Bunzip.version = pjson.version;
Bunzip.license = pjson.license;
var lib = Bunzip;
var through$1 = { exports: {} };
(function(module2, exports) {
  var Stream2 = require$$0__default$1.default;
  module2.exports = through2;
  through2.through = through2;
  function through2(write, end2, opts) {
    write = write || function(data) {
      this.queue(data);
    };
    end2 = end2 || function() {
      this.queue(null);
    };
    var ended = false, destroyed = false, buffer2 = [], _ended = false;
    var stream2 = new Stream2();
    stream2.readable = stream2.writable = true;
    stream2.paused = false;
    stream2.autoDestroy = !(opts && opts.autoDestroy === false);
    stream2.write = function(data) {
      write.call(this, data);
      return !stream2.paused;
    };
    function drain() {
      while (buffer2.length && !stream2.paused) {
        var data = buffer2.shift();
        if (null === data)
          return stream2.emit("end");
        else
          stream2.emit("data", data);
      }
    }
    stream2.queue = stream2.push = function(data) {
      if (_ended)
        return stream2;
      if (data === null)
        _ended = true;
      buffer2.push(data);
      drain();
      return stream2;
    };
    stream2.on("end", function() {
      stream2.readable = false;
      if (!stream2.writable && stream2.autoDestroy)
        process.nextTick(function() {
          stream2.destroy();
        });
    });
    function _end() {
      stream2.writable = false;
      end2.call(stream2);
      if (!stream2.readable && stream2.autoDestroy)
        stream2.destroy();
    }
    stream2.end = function(data) {
      if (ended)
        return;
      ended = true;
      if (arguments.length)
        stream2.write(data);
      _end();
      return stream2;
    };
    stream2.destroy = function() {
      if (destroyed)
        return;
      destroyed = true;
      ended = true;
      buffer2.length = 0;
      stream2.writable = stream2.readable = false;
      stream2.emit("close");
      return stream2;
    };
    stream2.pause = function() {
      if (stream2.paused)
        return;
      stream2.paused = true;
      return stream2;
    };
    stream2.resume = function() {
      if (stream2.paused) {
        stream2.paused = false;
        stream2.emit("resume");
      }
      drain();
      if (!stream2.paused)
        stream2.emit("drain");
      return stream2;
    };
    return stream2;
  }
})(through$1);
function Bzip2Error(message2) {
  this.name = "Bzip2Error";
  this.message = message2;
  this.stack = new Error().stack;
}
Bzip2Error.prototype = new Error();
var message = {
  Error: function(message2) {
    throw new Bzip2Error(message2);
  }
};
var bzip2 = {};
bzip2.Bzip2Error = Bzip2Error;
bzip2.crcTable = [
  0,
  79764919,
  159529838,
  222504665,
  319059676,
  398814059,
  445009330,
  507990021,
  638119352,
  583659535,
  797628118,
  726387553,
  890018660,
  835552979,
  1015980042,
  944750013,
  1276238704,
  1221641927,
  1167319070,
  1095957929,
  1595256236,
  1540665371,
  1452775106,
  1381403509,
  1780037320,
  1859660671,
  1671105958,
  1733955601,
  2031960084,
  2111593891,
  1889500026,
  1952343757,
  2552477408,
  2632100695,
  2443283854,
  2506133561,
  2334638140,
  2414271883,
  2191915858,
  2254759653,
  3190512472,
  3135915759,
  3081330742,
  3009969537,
  2905550212,
  2850959411,
  2762807018,
  2691435357,
  3560074640,
  3505614887,
  3719321342,
  3648080713,
  3342211916,
  3287746299,
  3467911202,
  3396681109,
  4063920168,
  4143685023,
  4223187782,
  4286162673,
  3779000052,
  3858754371,
  3904687514,
  3967668269,
  881225847,
  809987520,
  1023691545,
  969234094,
  662832811,
  591600412,
  771767749,
  717299826,
  311336399,
  374308984,
  453813921,
  533576470,
  25881363,
  88864420,
  134795389,
  214552010,
  2023205639,
  2086057648,
  1897238633,
  1976864222,
  1804852699,
  1867694188,
  1645340341,
  1724971778,
  1587496639,
  1516133128,
  1461550545,
  1406951526,
  1302016099,
  1230646740,
  1142491917,
  1087903418,
  2896545431,
  2825181984,
  2770861561,
  2716262478,
  3215044683,
  3143675388,
  3055782693,
  3001194130,
  2326604591,
  2389456536,
  2200899649,
  2280525302,
  2578013683,
  2640855108,
  2418763421,
  2498394922,
  3769900519,
  3832873040,
  3912640137,
  3992402750,
  4088425275,
  4151408268,
  4197601365,
  4277358050,
  3334271071,
  3263032808,
  3476998961,
  3422541446,
  3585640067,
  3514407732,
  3694837229,
  3640369242,
  1762451694,
  1842216281,
  1619975040,
  1682949687,
  2047383090,
  2127137669,
  1938468188,
  2001449195,
  1325665622,
  1271206113,
  1183200824,
  1111960463,
  1543535498,
  1489069629,
  1434599652,
  1363369299,
  622672798,
  568075817,
  748617968,
  677256519,
  907627842,
  853037301,
  1067152940,
  995781531,
  51762726,
  131386257,
  177728840,
  240578815,
  269590778,
  349224269,
  429104020,
  491947555,
  4046411278,
  4126034873,
  4172115296,
  4234965207,
  3794477266,
  3874110821,
  3953728444,
  4016571915,
  3609705398,
  3555108353,
  3735388376,
  3664026991,
  3290680682,
  3236090077,
  3449943556,
  3378572211,
  3174993278,
  3120533705,
  3032266256,
  2961025959,
  2923101090,
  2868635157,
  2813903052,
  2742672763,
  2604032198,
  2683796849,
  2461293480,
  2524268063,
  2284983834,
  2364738477,
  2175806836,
  2238787779,
  1569362073,
  1498123566,
  1409854455,
  1355396672,
  1317987909,
  1246755826,
  1192025387,
  1137557660,
  2072149281,
  2135122070,
  1912620623,
  1992383480,
  1753615357,
  1816598090,
  1627664531,
  1707420964,
  295390185,
  358241886,
  404320391,
  483945776,
  43990325,
  106832002,
  186451547,
  266083308,
  932423249,
  861060070,
  1041341759,
  986742920,
  613929101,
  542559546,
  756411363,
  701822548,
  3316196985,
  3244833742,
  3425377559,
  3370778784,
  3601682597,
  3530312978,
  3744426955,
  3689838204,
  3819031489,
  3881883254,
  3928223919,
  4007849240,
  4037393693,
  4100235434,
  4180117107,
  4259748804,
  2310601993,
  2373574846,
  2151335527,
  2231098320,
  2596047829,
  2659030626,
  2470359227,
  2550115596,
  2947551409,
  2876312838,
  2788305887,
  2733848168,
  3165939309,
  3094707162,
  3040238851,
  2985771188
];
bzip2.array = function(bytes) {
  var bit = 0, byte = 0;
  var BITMASK2 = [0, 1, 3, 7, 15, 31, 63, 127, 255];
  return function(n) {
    var result = 0;
    while (n > 0) {
      var left = 8 - bit;
      if (n >= left) {
        result <<= left;
        result |= BITMASK2[left] & bytes[byte++];
        bit = 0;
        n -= left;
      } else {
        result <<= n;
        result |= (bytes[byte] & BITMASK2[n] << 8 - n - bit) >> 8 - n - bit;
        bit += n;
        n = 0;
      }
    }
    return result;
  };
};
bzip2.simple = function(srcbuffer, stream2) {
  var bits = bzip2.array(srcbuffer);
  var size = bzip2.header(bits);
  var ret = false;
  var bufsize = 1e5 * size;
  var buf = new Int32Array(bufsize);
  do {
    ret = bzip2.decompress(bits, stream2, buf, bufsize);
  } while (!ret);
};
bzip2.header = function(bits) {
  this.byteCount = new Int32Array(256);
  this.symToByte = new Uint8Array(256);
  this.mtfSymbol = new Int32Array(256);
  this.selectors = new Uint8Array(32768);
  if (bits(8 * 3) != 4348520)
    message.Error("No magic number found");
  var i = bits(8) - 48;
  if (i < 1 || i > 9)
    message.Error("Not a BZIP archive");
  return i;
};
bzip2.decompress = function(bits, stream2, buf, bufsize, streamCRC) {
  var MAX_HUFCODE_BITS2 = 20;
  var MAX_SYMBOLS2 = 258;
  var SYMBOL_RUNA2 = 0;
  var SYMBOL_RUNB2 = 1;
  var GROUP_SIZE2 = 50;
  var crc = 0 ^ -1;
  for (var h = "", i = 0; i < 6; i++)
    h += bits(8).toString(16);
  if (h == "177245385090") {
    var finalCRC = bits(32) | 0;
    if (finalCRC !== streamCRC)
      message.Error("Error in bzip2: crc32 do not match");
    bits(null);
    return null;
  }
  if (h != "314159265359")
    message.Error("eek not valid bzip data");
  var crcblock = bits(32) | 0;
  if (bits(1))
    message.Error("unsupported obsolete version");
  var origPtr = bits(24);
  if (origPtr > bufsize)
    message.Error("Initial position larger than buffer size");
  var t = bits(16);
  var symTotal = 0;
  for (i = 0; i < 16; i++) {
    if (t & 1 << 15 - i) {
      var k = bits(16);
      for (j = 0; j < 16; j++) {
        if (k & 1 << 15 - j) {
          this.symToByte[symTotal++] = 16 * i + j;
        }
      }
    }
  }
  var groupCount = bits(3);
  if (groupCount < 2 || groupCount > 6)
    message.Error("another error");
  var nSelectors = bits(15);
  if (nSelectors == 0)
    message.Error("meh");
  for (var i = 0; i < groupCount; i++)
    this.mtfSymbol[i] = i;
  for (var i = 0; i < nSelectors; i++) {
    for (var j = 0; bits(1); j++)
      if (j >= groupCount)
        message.Error("whoops another error");
    var uc = this.mtfSymbol[j];
    for (var k = j - 1; k >= 0; k--) {
      this.mtfSymbol[k + 1] = this.mtfSymbol[k];
    }
    this.mtfSymbol[0] = uc;
    this.selectors[i] = uc;
  }
  var symCount = symTotal + 2;
  var groups = [];
  var length = new Uint8Array(MAX_SYMBOLS2), temp = new Uint16Array(MAX_HUFCODE_BITS2 + 1);
  var hufGroup;
  for (var j = 0; j < groupCount; j++) {
    t = bits(5);
    for (var i = 0; i < symCount; i++) {
      while (true) {
        if (t < 1 || t > MAX_HUFCODE_BITS2)
          message.Error("I gave up a while ago on writing error messages");
        if (!bits(1))
          break;
        if (!bits(1))
          t++;
        else
          t--;
      }
      length[i] = t;
    }
    var minLen, maxLen;
    minLen = maxLen = length[0];
    for (var i = 1; i < symCount; i++) {
      if (length[i] > maxLen)
        maxLen = length[i];
      else if (length[i] < minLen)
        minLen = length[i];
    }
    hufGroup = groups[j] = {};
    hufGroup.permute = new Int32Array(MAX_SYMBOLS2);
    hufGroup.limit = new Int32Array(MAX_HUFCODE_BITS2 + 1);
    hufGroup.base = new Int32Array(MAX_HUFCODE_BITS2 + 1);
    hufGroup.minLen = minLen;
    hufGroup.maxLen = maxLen;
    var base = hufGroup.base;
    var limit = hufGroup.limit;
    var pp = 0;
    for (var i = minLen; i <= maxLen; i++)
      for (var t = 0; t < symCount; t++)
        if (length[t] == i)
          hufGroup.permute[pp++] = t;
    for (i = minLen; i <= maxLen; i++)
      temp[i] = limit[i] = 0;
    for (i = 0; i < symCount; i++)
      temp[length[i]]++;
    pp = t = 0;
    for (i = minLen; i < maxLen; i++) {
      pp += temp[i];
      limit[i] = pp - 1;
      pp <<= 1;
      base[i + 1] = pp - (t += temp[i]);
    }
    limit[maxLen] = pp + temp[maxLen] - 1;
    base[minLen] = 0;
  }
  for (var i = 0; i < 256; i++) {
    this.mtfSymbol[i] = i;
    this.byteCount[i] = 0;
  }
  var runPos, count, symCount, selector;
  runPos = count = symCount = selector = 0;
  while (true) {
    if (!symCount--) {
      symCount = GROUP_SIZE2 - 1;
      if (selector >= nSelectors)
        message.Error("meow i'm a kitty, that's an error");
      hufGroup = groups[this.selectors[selector++]];
      base = hufGroup.base;
      limit = hufGroup.limit;
    }
    i = hufGroup.minLen;
    j = bits(i);
    while (true) {
      if (i > hufGroup.maxLen)
        message.Error("rawr i'm a dinosaur");
      if (j <= limit[i])
        break;
      i++;
      j = j << 1 | bits(1);
    }
    j -= base[i];
    if (j < 0 || j >= MAX_SYMBOLS2)
      message.Error("moo i'm a cow");
    var nextSym = hufGroup.permute[j];
    if (nextSym == SYMBOL_RUNA2 || nextSym == SYMBOL_RUNB2) {
      if (!runPos) {
        runPos = 1;
        t = 0;
      }
      if (nextSym == SYMBOL_RUNA2)
        t += runPos;
      else
        t += 2 * runPos;
      runPos <<= 1;
      continue;
    }
    if (runPos) {
      runPos = 0;
      if (count + t > bufsize)
        message.Error("Boom.");
      uc = this.symToByte[this.mtfSymbol[0]];
      this.byteCount[uc] += t;
      while (t--)
        buf[count++] = uc;
    }
    if (nextSym > symTotal)
      break;
    if (count >= bufsize)
      message.Error("I can't think of anything. Error");
    i = nextSym - 1;
    uc = this.mtfSymbol[i];
    for (var k = i - 1; k >= 0; k--) {
      this.mtfSymbol[k + 1] = this.mtfSymbol[k];
    }
    this.mtfSymbol[0] = uc;
    uc = this.symToByte[uc];
    this.byteCount[uc]++;
    buf[count++] = uc;
  }
  if (origPtr < 0 || origPtr >= count)
    message.Error("I'm a monkey and I'm throwing something at someone, namely you");
  var j = 0;
  for (var i = 0; i < 256; i++) {
    k = j + this.byteCount[i];
    this.byteCount[i] = j;
    j = k;
  }
  for (var i = 0; i < count; i++) {
    uc = buf[i] & 255;
    buf[this.byteCount[uc]] |= i << 8;
    this.byteCount[uc]++;
  }
  var pos = 0, current = 0, run = 0;
  if (count) {
    pos = buf[origPtr];
    current = pos & 255;
    pos >>= 8;
    run = -1;
  }
  count = count;
  var copies, previous, outbyte;
  while (count) {
    count--;
    previous = current;
    pos = buf[pos];
    current = pos & 255;
    pos >>= 8;
    if (run++ == 3) {
      copies = current;
      outbyte = previous;
      current = -1;
    } else {
      copies = 1;
      outbyte = current;
    }
    while (copies--) {
      crc = (crc << 8 ^ this.crcTable[(crc >> 24 ^ outbyte) & 255]) & 4294967295;
      stream2(outbyte);
    }
    if (current != previous)
      run = 0;
  }
  crc = (crc ^ -1) >>> 0;
  if ((crc | 0) != (crcblock | 0))
    message.Error("Error in bzip2: crc32 do not match");
  streamCRC = (crc ^ (streamCRC << 1 | streamCRC >>> 31)) & 4294967295;
  return streamCRC;
};
var bzip2_1 = bzip2;
var BITMASK = [0, 1, 3, 7, 15, 31, 63, 127, 255];
var bit_iterator = function bitIterator2(nextBuffer) {
  var bit = 0, byte = 0;
  var bytes = nextBuffer();
  var f = function(n) {
    if (n === null && bit != 0) {
      bit = 0;
      byte++;
      return;
    }
    var result = 0;
    while (n > 0) {
      if (byte >= bytes.length) {
        byte = 0;
        bytes = nextBuffer();
      }
      var left = 8 - bit;
      if (bit === 0 && n > 0)
        f.bytesRead++;
      if (n >= left) {
        result <<= left;
        result |= BITMASK[left] & bytes[byte++];
        bit = 0;
        n -= left;
      } else {
        result <<= n;
        result |= (bytes[byte] & BITMASK[n] << 8 - n - bit) >> 8 - n - bit;
        bit += n;
        n = 0;
      }
    }
    return result;
  };
  f.bytesRead = 0;
  return f;
};
var through = through$1.exports;
var bz2 = bzip2_1;
var bitIterator = bit_iterator;
var unbzip2Stream_1 = unbzip2Stream$1;
function unbzip2Stream$1() {
  var bufferQueue = [];
  var hasBytes = 0;
  var blockSize = 0;
  var broken = false;
  var bitReader = null;
  var streamCRC = null;
  function decompressBlock(push) {
    if (!blockSize) {
      blockSize = bz2.header(bitReader);
      streamCRC = 0;
      return true;
    } else {
      var bufsize = 1e5 * blockSize;
      var buf = new Int32Array(bufsize);
      var chunk = [];
      var f = function(b) {
        chunk.push(b);
      };
      streamCRC = bz2.decompress(bitReader, f, buf, bufsize, streamCRC);
      if (streamCRC === null) {
        blockSize = 0;
        return false;
      } else {
        push(Buffer.from(chunk));
        return true;
      }
    }
  }
  var outlength = 0;
  function decompressAndQueue(stream2) {
    if (broken)
      return;
    try {
      return decompressBlock(function(d) {
        stream2.queue(d);
        if (d !== null) {
          outlength += d.length;
        } else {
        }
      });
    } catch (e) {
      stream2.emit("error", e);
      broken = true;
      return false;
    }
  }
  return through(
    function write(data) {
      bufferQueue.push(data);
      hasBytes += data.length;
      if (bitReader === null) {
        bitReader = bitIterator(function() {
          return bufferQueue.shift();
        });
      }
      while (!broken && hasBytes - bitReader.bytesRead + 1 >= (25e3 + 1e5 * blockSize || 4)) {
        decompressAndQueue(this);
      }
    },
    function end2(x) {
      while (!broken && bitReader && hasBytes > bitReader.bytesRead) {
        decompressAndQueue(this);
      }
      if (!broken) {
        if (streamCRC !== null)
          this.emit("error", new Error("input stream ended prematurely"));
        this.queue(null);
      }
    }
  );
}
const decompressTar$2 = decompressTar$3;
const fileType$6 = fileType$7;
const isStream$1 = isStream$4.exports;
const seekBzip = lib;
const unbzip2Stream = unbzip2Stream_1;
var decompressTarbz2$1 = () => (input) => {
  if (!Buffer.isBuffer(input) && !isStream$1(input)) {
    return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
  }
  if (Buffer.isBuffer(input) && (!fileType$6(input) || fileType$6(input).ext !== "bz2")) {
    return Promise.resolve([]);
  }
  if (Buffer.isBuffer(input)) {
    return decompressTar$2()(seekBzip.decode(input));
  }
  return decompressTar$2()(input.pipe(unbzip2Stream()));
};
var fileType$5 = (input) => {
  const buf = new Uint8Array(input);
  if (!(buf && buf.length > 1)) {
    return null;
  }
  const check = (header, opts) => {
    opts = Object.assign({
      offset: 0
    }, opts);
    for (let i = 0; i < header.length; i++) {
      if (header[i] !== buf[i + opts.offset]) {
        return false;
      }
    }
    return true;
  };
  if (check([255, 216, 255])) {
    return {
      ext: "jpg",
      mime: "image/jpeg"
    };
  }
  if (check([137, 80, 78, 71, 13, 10, 26, 10])) {
    return {
      ext: "png",
      mime: "image/png"
    };
  }
  if (check([71, 73, 70])) {
    return {
      ext: "gif",
      mime: "image/gif"
    };
  }
  if (check([87, 69, 66, 80], { offset: 8 })) {
    return {
      ext: "webp",
      mime: "image/webp"
    };
  }
  if (check([70, 76, 73, 70])) {
    return {
      ext: "flif",
      mime: "image/flif"
    };
  }
  if ((check([73, 73, 42, 0]) || check([77, 77, 0, 42])) && check([67, 82], { offset: 8 })) {
    return {
      ext: "cr2",
      mime: "image/x-canon-cr2"
    };
  }
  if (check([73, 73, 42, 0]) || check([77, 77, 0, 42])) {
    return {
      ext: "tif",
      mime: "image/tiff"
    };
  }
  if (check([66, 77])) {
    return {
      ext: "bmp",
      mime: "image/bmp"
    };
  }
  if (check([73, 73, 188])) {
    return {
      ext: "jxr",
      mime: "image/vnd.ms-photo"
    };
  }
  if (check([56, 66, 80, 83])) {
    return {
      ext: "psd",
      mime: "image/vnd.adobe.photoshop"
    };
  }
  if (check([80, 75, 3, 4]) && check([109, 105, 109, 101, 116, 121, 112, 101, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 101, 112, 117, 98, 43, 122, 105, 112], { offset: 30 })) {
    return {
      ext: "epub",
      mime: "application/epub+zip"
    };
  }
  if (check([80, 75, 3, 4]) && check([77, 69, 84, 65, 45, 73, 78, 70, 47, 109, 111, 122, 105, 108, 108, 97, 46, 114, 115, 97], { offset: 30 })) {
    return {
      ext: "xpi",
      mime: "application/x-xpinstall"
    };
  }
  if (check([80, 75]) && (buf[2] === 3 || buf[2] === 5 || buf[2] === 7) && (buf[3] === 4 || buf[3] === 6 || buf[3] === 8)) {
    return {
      ext: "zip",
      mime: "application/zip"
    };
  }
  if (check([117, 115, 116, 97, 114], { offset: 257 })) {
    return {
      ext: "tar",
      mime: "application/x-tar"
    };
  }
  if (check([82, 97, 114, 33, 26, 7]) && (buf[6] === 0 || buf[6] === 1)) {
    return {
      ext: "rar",
      mime: "application/x-rar-compressed"
    };
  }
  if (check([31, 139, 8])) {
    return {
      ext: "gz",
      mime: "application/gzip"
    };
  }
  if (check([66, 90, 104])) {
    return {
      ext: "bz2",
      mime: "application/x-bzip2"
    };
  }
  if (check([55, 122, 188, 175, 39, 28])) {
    return {
      ext: "7z",
      mime: "application/x-7z-compressed"
    };
  }
  if (check([120, 1])) {
    return {
      ext: "dmg",
      mime: "application/x-apple-diskimage"
    };
  }
  if (check([0, 0, 0]) && (buf[3] === 24 || buf[3] === 32) && check([102, 116, 121, 112], { offset: 4 }) || check([51, 103, 112, 53]) || check([0, 0, 0, 28, 102, 116, 121, 112, 109, 112, 52, 50]) && check([109, 112, 52, 49, 109, 112, 52, 50, 105, 115, 111, 109], { offset: 16 }) || check([0, 0, 0, 28, 102, 116, 121, 112, 105, 115, 111, 109]) || check([0, 0, 0, 28, 102, 116, 121, 112, 109, 112, 52, 50, 0, 0, 0, 0])) {
    return {
      ext: "mp4",
      mime: "video/mp4"
    };
  }
  if (check([0, 0, 0, 28, 102, 116, 121, 112, 77, 52, 86])) {
    return {
      ext: "m4v",
      mime: "video/x-m4v"
    };
  }
  if (check([77, 84, 104, 100])) {
    return {
      ext: "mid",
      mime: "audio/midi"
    };
  }
  if (check([26, 69, 223, 163])) {
    const sliced = buf.subarray(4, 4 + 4096);
    const idPos = sliced.findIndex((el, i, arr) => arr[i] === 66 && arr[i + 1] === 130);
    if (idPos >= 0) {
      const docTypePos = idPos + 3;
      const findDocType = (type) => Array.from(type).every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));
      if (findDocType("matroska")) {
        return {
          ext: "mkv",
          mime: "video/x-matroska"
        };
      }
      if (findDocType("webm")) {
        return {
          ext: "webm",
          mime: "video/webm"
        };
      }
    }
  }
  if (check([0, 0, 0, 20, 102, 116, 121, 112, 113, 116, 32, 32]) || check([102, 114, 101, 101], { offset: 4 }) || check([102, 116, 121, 112, 113, 116, 32, 32], { offset: 4 }) || check([109, 100, 97, 116], { offset: 4 }) || check([119, 105, 100, 101], { offset: 4 })) {
    return {
      ext: "mov",
      mime: "video/quicktime"
    };
  }
  if (check([82, 73, 70, 70]) && check([65, 86, 73], { offset: 8 })) {
    return {
      ext: "avi",
      mime: "video/x-msvideo"
    };
  }
  if (check([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
    return {
      ext: "wmv",
      mime: "video/x-ms-wmv"
    };
  }
  if (check([0, 0, 1, 186])) {
    return {
      ext: "mpg",
      mime: "video/mpeg"
    };
  }
  if (check([73, 68, 51]) || check([255, 251])) {
    return {
      ext: "mp3",
      mime: "audio/mpeg"
    };
  }
  if (check([102, 116, 121, 112, 77, 52, 65], { offset: 4 }) || check([77, 52, 65, 32])) {
    return {
      ext: "m4a",
      mime: "audio/m4a"
    };
  }
  if (check([79, 112, 117, 115, 72, 101, 97, 100], { offset: 28 })) {
    return {
      ext: "opus",
      mime: "audio/opus"
    };
  }
  if (check([79, 103, 103, 83])) {
    return {
      ext: "ogg",
      mime: "audio/ogg"
    };
  }
  if (check([102, 76, 97, 67])) {
    return {
      ext: "flac",
      mime: "audio/x-flac"
    };
  }
  if (check([82, 73, 70, 70]) && check([87, 65, 86, 69], { offset: 8 })) {
    return {
      ext: "wav",
      mime: "audio/x-wav"
    };
  }
  if (check([35, 33, 65, 77, 82, 10])) {
    return {
      ext: "amr",
      mime: "audio/amr"
    };
  }
  if (check([37, 80, 68, 70])) {
    return {
      ext: "pdf",
      mime: "application/pdf"
    };
  }
  if (check([77, 90])) {
    return {
      ext: "exe",
      mime: "application/x-msdownload"
    };
  }
  if ((buf[0] === 67 || buf[0] === 70) && check([87, 83], { offset: 1 })) {
    return {
      ext: "swf",
      mime: "application/x-shockwave-flash"
    };
  }
  if (check([123, 92, 114, 116, 102])) {
    return {
      ext: "rtf",
      mime: "application/rtf"
    };
  }
  if (check([0, 97, 115, 109])) {
    return {
      ext: "wasm",
      mime: "application/wasm"
    };
  }
  if (check([119, 79, 70, 70]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
    return {
      ext: "woff",
      mime: "font/woff"
    };
  }
  if (check([119, 79, 70, 50]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
    return {
      ext: "woff2",
      mime: "font/woff2"
    };
  }
  if (check([76, 80], { offset: 34 }) && (check([0, 0, 1], { offset: 8 }) || check([1, 0, 2], { offset: 8 }) || check([2, 0, 2], { offset: 8 }))) {
    return {
      ext: "eot",
      mime: "application/octet-stream"
    };
  }
  if (check([0, 1, 0, 0, 0])) {
    return {
      ext: "ttf",
      mime: "font/ttf"
    };
  }
  if (check([79, 84, 84, 79, 0])) {
    return {
      ext: "otf",
      mime: "font/otf"
    };
  }
  if (check([0, 0, 1, 0])) {
    return {
      ext: "ico",
      mime: "image/x-icon"
    };
  }
  if (check([70, 76, 86, 1])) {
    return {
      ext: "flv",
      mime: "video/x-flv"
    };
  }
  if (check([37, 33])) {
    return {
      ext: "ps",
      mime: "application/postscript"
    };
  }
  if (check([253, 55, 122, 88, 90, 0])) {
    return {
      ext: "xz",
      mime: "application/x-xz"
    };
  }
  if (check([83, 81, 76, 105])) {
    return {
      ext: "sqlite",
      mime: "application/x-sqlite3"
    };
  }
  if (check([78, 69, 83, 26])) {
    return {
      ext: "nes",
      mime: "application/x-nintendo-nes-rom"
    };
  }
  if (check([67, 114, 50, 52])) {
    return {
      ext: "crx",
      mime: "application/x-google-chrome-extension"
    };
  }
  if (check([77, 83, 67, 70]) || check([73, 83, 99, 40])) {
    return {
      ext: "cab",
      mime: "application/vnd.ms-cab-compressed"
    };
  }
  if (check([33, 60, 97, 114, 99, 104, 62, 10, 100, 101, 98, 105, 97, 110, 45, 98, 105, 110, 97, 114, 121])) {
    return {
      ext: "deb",
      mime: "application/x-deb"
    };
  }
  if (check([33, 60, 97, 114, 99, 104, 62])) {
    return {
      ext: "ar",
      mime: "application/x-unix-archive"
    };
  }
  if (check([237, 171, 238, 219])) {
    return {
      ext: "rpm",
      mime: "application/x-rpm"
    };
  }
  if (check([31, 160]) || check([31, 157])) {
    return {
      ext: "Z",
      mime: "application/x-compress"
    };
  }
  if (check([76, 90, 73, 80])) {
    return {
      ext: "lz",
      mime: "application/x-lzip"
    };
  }
  if (check([208, 207, 17, 224, 161, 177, 26, 225])) {
    return {
      ext: "msi",
      mime: "application/x-msi"
    };
  }
  if (check([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) {
    return {
      ext: "mxf",
      mime: "application/mxf"
    };
  }
  if (check([71], { offset: 4 }) && (check([71], { offset: 192 }) || check([71], { offset: 196 }))) {
    return {
      ext: "mts",
      mime: "video/mp2t"
    };
  }
  if (check([66, 76, 69, 78, 68, 69, 82])) {
    return {
      ext: "blend",
      mime: "application/x-blender"
    };
  }
  if (check([66, 80, 71, 251])) {
    return {
      ext: "bpg",
      mime: "image/bpg"
    };
  }
  return null;
};
const zlib$1 = require$$0__default$4.default;
const decompressTar$1 = decompressTar$3;
const fileType$4 = fileType$5;
const isStream = isStream$4.exports;
var decompressTargz$1 = () => (input) => {
  if (!Buffer.isBuffer(input) && !isStream(input)) {
    return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof input}`));
  }
  if (Buffer.isBuffer(input) && (!fileType$4(input) || fileType$4(input).ext !== "gz")) {
    return Promise.resolve([]);
  }
  const unzip = zlib$1.createGunzip();
  const result = decompressTar$1()(unzip);
  if (Buffer.isBuffer(input)) {
    unzip.end(input);
  } else {
    input.pipe(unzip);
  }
  return result;
};
var fileType$3 = function(buf) {
  if (!(buf && buf.length > 1)) {
    return null;
  }
  if (buf[0] === 255 && buf[1] === 216 && buf[2] === 255) {
    return {
      ext: "jpg",
      mime: "image/jpeg"
    };
  }
  if (buf[0] === 137 && buf[1] === 80 && buf[2] === 78 && buf[3] === 71) {
    return {
      ext: "png",
      mime: "image/png"
    };
  }
  if (buf[0] === 71 && buf[1] === 73 && buf[2] === 70) {
    return {
      ext: "gif",
      mime: "image/gif"
    };
  }
  if (buf[8] === 87 && buf[9] === 69 && buf[10] === 66 && buf[11] === 80) {
    return {
      ext: "webp",
      mime: "image/webp"
    };
  }
  if (buf[0] === 70 && buf[1] === 76 && buf[2] === 73 && buf[3] === 70) {
    return {
      ext: "flif",
      mime: "image/flif"
    };
  }
  if ((buf[0] === 73 && buf[1] === 73 && buf[2] === 42 && buf[3] === 0 || buf[0] === 77 && buf[1] === 77 && buf[2] === 0 && buf[3] === 42) && buf[8] === 67 && buf[9] === 82) {
    return {
      ext: "cr2",
      mime: "image/x-canon-cr2"
    };
  }
  if (buf[0] === 73 && buf[1] === 73 && buf[2] === 42 && buf[3] === 0 || buf[0] === 77 && buf[1] === 77 && buf[2] === 0 && buf[3] === 42) {
    return {
      ext: "tif",
      mime: "image/tiff"
    };
  }
  if (buf[0] === 66 && buf[1] === 77) {
    return {
      ext: "bmp",
      mime: "image/bmp"
    };
  }
  if (buf[0] === 73 && buf[1] === 73 && buf[2] === 188) {
    return {
      ext: "jxr",
      mime: "image/vnd.ms-photo"
    };
  }
  if (buf[0] === 56 && buf[1] === 66 && buf[2] === 80 && buf[3] === 83) {
    return {
      ext: "psd",
      mime: "image/vnd.adobe.photoshop"
    };
  }
  if (buf[0] === 80 && buf[1] === 75 && buf[2] === 3 && buf[3] === 4 && buf[30] === 109 && buf[31] === 105 && buf[32] === 109 && buf[33] === 101 && buf[34] === 116 && buf[35] === 121 && buf[36] === 112 && buf[37] === 101 && buf[38] === 97 && buf[39] === 112 && buf[40] === 112 && buf[41] === 108 && buf[42] === 105 && buf[43] === 99 && buf[44] === 97 && buf[45] === 116 && buf[46] === 105 && buf[47] === 111 && buf[48] === 110 && buf[49] === 47 && buf[50] === 101 && buf[51] === 112 && buf[52] === 117 && buf[53] === 98 && buf[54] === 43 && buf[55] === 122 && buf[56] === 105 && buf[57] === 112) {
    return {
      ext: "epub",
      mime: "application/epub+zip"
    };
  }
  if (buf[0] === 80 && buf[1] === 75 && buf[2] === 3 && buf[3] === 4 && buf[30] === 77 && buf[31] === 69 && buf[32] === 84 && buf[33] === 65 && buf[34] === 45 && buf[35] === 73 && buf[36] === 78 && buf[37] === 70 && buf[38] === 47 && buf[39] === 109 && buf[40] === 111 && buf[41] === 122 && buf[42] === 105 && buf[43] === 108 && buf[44] === 108 && buf[45] === 97 && buf[46] === 46 && buf[47] === 114 && buf[48] === 115 && buf[49] === 97) {
    return {
      ext: "xpi",
      mime: "application/x-xpinstall"
    };
  }
  if (buf[0] === 80 && buf[1] === 75 && (buf[2] === 3 || buf[2] === 5 || buf[2] === 7) && (buf[3] === 4 || buf[3] === 6 || buf[3] === 8)) {
    return {
      ext: "zip",
      mime: "application/zip"
    };
  }
  if (buf[257] === 117 && buf[258] === 115 && buf[259] === 116 && buf[260] === 97 && buf[261] === 114) {
    return {
      ext: "tar",
      mime: "application/x-tar"
    };
  }
  if (buf[0] === 82 && buf[1] === 97 && buf[2] === 114 && buf[3] === 33 && buf[4] === 26 && buf[5] === 7 && (buf[6] === 0 || buf[6] === 1)) {
    return {
      ext: "rar",
      mime: "application/x-rar-compressed"
    };
  }
  if (buf[0] === 31 && buf[1] === 139 && buf[2] === 8) {
    return {
      ext: "gz",
      mime: "application/gzip"
    };
  }
  if (buf[0] === 66 && buf[1] === 90 && buf[2] === 104) {
    return {
      ext: "bz2",
      mime: "application/x-bzip2"
    };
  }
  if (buf[0] === 55 && buf[1] === 122 && buf[2] === 188 && buf[3] === 175 && buf[4] === 39 && buf[5] === 28) {
    return {
      ext: "7z",
      mime: "application/x-7z-compressed"
    };
  }
  if (buf[0] === 120 && buf[1] === 1) {
    return {
      ext: "dmg",
      mime: "application/x-apple-diskimage"
    };
  }
  if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && (buf[3] === 24 || buf[3] === 32) && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 || buf[0] === 51 && buf[1] === 103 && buf[2] === 112 && buf[3] === 53 || buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 28 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 109 && buf[9] === 112 && buf[10] === 52 && buf[11] === 50 && buf[16] === 109 && buf[17] === 112 && buf[18] === 52 && buf[19] === 49 && buf[20] === 109 && buf[21] === 112 && buf[22] === 52 && buf[23] === 50 && buf[24] === 105 && buf[25] === 115 && buf[26] === 111 && buf[27] === 109 || buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 28 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 105 && buf[9] === 115 && buf[10] === 111 && buf[11] === 109 || buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 28 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 109 && buf[9] === 112 && buf[10] === 52 && buf[11] === 50 && buf[12] === 0 && buf[13] === 0 && buf[14] === 0 && buf[15] === 0) {
    return {
      ext: "mp4",
      mime: "video/mp4"
    };
  }
  if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 28 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 77 && buf[9] === 52 && buf[10] === 86) {
    return {
      ext: "m4v",
      mime: "video/x-m4v"
    };
  }
  if (buf[0] === 77 && buf[1] === 84 && buf[2] === 104 && buf[3] === 100) {
    return {
      ext: "mid",
      mime: "audio/midi"
    };
  }
  if (buf[31] === 109 && buf[32] === 97 && buf[33] === 116 && buf[34] === 114 && buf[35] === 111 && buf[36] === 115 && buf[37] === 107 && buf[38] === 97) {
    return {
      ext: "mkv",
      mime: "video/x-matroska"
    };
  }
  if (buf[0] === 26 && buf[1] === 69 && buf[2] === 223 && buf[3] === 163) {
    return {
      ext: "webm",
      mime: "video/webm"
    };
  }
  if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 20 && buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112) {
    return {
      ext: "mov",
      mime: "video/quicktime"
    };
  }
  if (buf[0] === 82 && buf[1] === 73 && buf[2] === 70 && buf[3] === 70 && buf[8] === 65 && buf[9] === 86 && buf[10] === 73) {
    return {
      ext: "avi",
      mime: "video/x-msvideo"
    };
  }
  if (buf[0] === 48 && buf[1] === 38 && buf[2] === 178 && buf[3] === 117 && buf[4] === 142 && buf[5] === 102 && buf[6] === 207 && buf[7] === 17 && buf[8] === 166 && buf[9] === 217) {
    return {
      ext: "wmv",
      mime: "video/x-ms-wmv"
    };
  }
  if (buf[0] === 0 && buf[1] === 0 && buf[2] === 1 && buf[3].toString(16)[0] === "b") {
    return {
      ext: "mpg",
      mime: "video/mpeg"
    };
  }
  if (buf[0] === 73 && buf[1] === 68 && buf[2] === 51 || buf[0] === 255 && buf[1] === 251) {
    return {
      ext: "mp3",
      mime: "audio/mpeg"
    };
  }
  if (buf[4] === 102 && buf[5] === 116 && buf[6] === 121 && buf[7] === 112 && buf[8] === 77 && buf[9] === 52 && buf[10] === 65 || buf[0] === 77 && buf[1] === 52 && buf[2] === 65 && buf[3] === 32) {
    return {
      ext: "m4a",
      mime: "audio/m4a"
    };
  }
  if (buf[28] === 79 && buf[29] === 112 && buf[30] === 117 && buf[31] === 115 && buf[32] === 72 && buf[33] === 101 && buf[34] === 97 && buf[35] === 100) {
    return {
      ext: "opus",
      mime: "audio/opus"
    };
  }
  if (buf[0] === 79 && buf[1] === 103 && buf[2] === 103 && buf[3] === 83) {
    return {
      ext: "ogg",
      mime: "audio/ogg"
    };
  }
  if (buf[0] === 102 && buf[1] === 76 && buf[2] === 97 && buf[3] === 67) {
    return {
      ext: "flac",
      mime: "audio/x-flac"
    };
  }
  if (buf[0] === 82 && buf[1] === 73 && buf[2] === 70 && buf[3] === 70 && buf[8] === 87 && buf[9] === 65 && buf[10] === 86 && buf[11] === 69) {
    return {
      ext: "wav",
      mime: "audio/x-wav"
    };
  }
  if (buf[0] === 35 && buf[1] === 33 && buf[2] === 65 && buf[3] === 77 && buf[4] === 82 && buf[5] === 10) {
    return {
      ext: "amr",
      mime: "audio/amr"
    };
  }
  if (buf[0] === 37 && buf[1] === 80 && buf[2] === 68 && buf[3] === 70) {
    return {
      ext: "pdf",
      mime: "application/pdf"
    };
  }
  if (buf[0] === 77 && buf[1] === 90) {
    return {
      ext: "exe",
      mime: "application/x-msdownload"
    };
  }
  if ((buf[0] === 67 || buf[0] === 70) && buf[1] === 87 && buf[2] === 83) {
    return {
      ext: "swf",
      mime: "application/x-shockwave-flash"
    };
  }
  if (buf[0] === 123 && buf[1] === 92 && buf[2] === 114 && buf[3] === 116 && buf[4] === 102) {
    return {
      ext: "rtf",
      mime: "application/rtf"
    };
  }
  if (buf[0] === 119 && buf[1] === 79 && buf[2] === 70 && buf[3] === 70 && (buf[4] === 0 && buf[5] === 1 && buf[6] === 0 && buf[7] === 0 || buf[4] === 79 && buf[5] === 84 && buf[6] === 84 && buf[7] === 79)) {
    return {
      ext: "woff",
      mime: "application/font-woff"
    };
  }
  if (buf[0] === 119 && buf[1] === 79 && buf[2] === 70 && buf[3] === 50 && (buf[4] === 0 && buf[5] === 1 && buf[6] === 0 && buf[7] === 0 || buf[4] === 79 && buf[5] === 84 && buf[6] === 84 && buf[7] === 79)) {
    return {
      ext: "woff2",
      mime: "application/font-woff"
    };
  }
  if (buf[34] === 76 && buf[35] === 80 && (buf[8] === 0 && buf[9] === 0 && buf[10] === 1 || buf[8] === 1 && buf[9] === 0 && buf[10] === 2 || buf[8] === 2 && buf[9] === 0 && buf[10] === 2)) {
    return {
      ext: "eot",
      mime: "application/octet-stream"
    };
  }
  if (buf[0] === 0 && buf[1] === 1 && buf[2] === 0 && buf[3] === 0 && buf[4] === 0) {
    return {
      ext: "ttf",
      mime: "application/font-sfnt"
    };
  }
  if (buf[0] === 79 && buf[1] === 84 && buf[2] === 84 && buf[3] === 79 && buf[4] === 0) {
    return {
      ext: "otf",
      mime: "application/font-sfnt"
    };
  }
  if (buf[0] === 0 && buf[1] === 0 && buf[2] === 1 && buf[3] === 0) {
    return {
      ext: "ico",
      mime: "image/x-icon"
    };
  }
  if (buf[0] === 70 && buf[1] === 76 && buf[2] === 86 && buf[3] === 1) {
    return {
      ext: "flv",
      mime: "video/x-flv"
    };
  }
  if (buf[0] === 37 && buf[1] === 33) {
    return {
      ext: "ps",
      mime: "application/postscript"
    };
  }
  if (buf[0] === 253 && buf[1] === 55 && buf[2] === 122 && buf[3] === 88 && buf[4] === 90 && buf[5] === 0) {
    return {
      ext: "xz",
      mime: "application/x-xz"
    };
  }
  if (buf[0] === 83 && buf[1] === 81 && buf[2] === 76 && buf[3] === 105) {
    return {
      ext: "sqlite",
      mime: "application/x-sqlite3"
    };
  }
  if (buf[0] === 78 && buf[1] === 69 && buf[2] === 83 && buf[3] === 26) {
    return {
      ext: "nes",
      mime: "application/x-nintendo-nes-rom"
    };
  }
  if (buf[0] === 67 && buf[1] === 114 && buf[2] === 50 && buf[3] === 52) {
    return {
      ext: "crx",
      mime: "application/x-google-chrome-extension"
    };
  }
  if (buf[0] === 77 && buf[1] === 83 && buf[2] === 67 && buf[3] === 70 || buf[0] === 73 && buf[1] === 83 && buf[2] === 99 && buf[3] === 40) {
    return {
      ext: "cab",
      mime: "application/vnd.ms-cab-compressed"
    };
  }
  if (buf[0] === 33 && buf[1] === 60 && buf[2] === 97 && buf[3] === 114 && buf[4] === 99 && buf[5] === 104 && buf[6] === 62 && buf[7] === 10 && buf[8] === 100 && buf[9] === 101 && buf[10] === 98 && buf[11] === 105 && buf[12] === 97 && buf[13] === 110 && buf[14] === 45 && buf[15] === 98 && buf[16] === 105 && buf[17] === 110 && buf[18] === 97 && buf[19] === 114 && buf[20] === 121) {
    return {
      ext: "deb",
      mime: "application/x-deb"
    };
  }
  if (buf[0] === 33 && buf[1] === 60 && buf[2] === 97 && buf[3] === 114 && buf[4] === 99 && buf[5] === 104 && buf[6] === 62) {
    return {
      ext: "ar",
      mime: "application/x-unix-archive"
    };
  }
  if (buf[0] === 237 && buf[1] === 171 && buf[2] === 238 && buf[3] === 219) {
    return {
      ext: "rpm",
      mime: "application/x-rpm"
    };
  }
  if (buf[0] === 31 && buf[1] === 160 || buf[0] === 31 && buf[1] === 157) {
    return {
      ext: "Z",
      mime: "application/x-compress"
    };
  }
  if (buf[0] === 76 && buf[1] === 90 && buf[2] === 73 && buf[3] === 80) {
    return {
      ext: "lz",
      mime: "application/x-lzip"
    };
  }
  if (buf[0] === 208 && buf[1] === 207 && buf[2] === 17 && buf[3] === 224 && buf[4] === 161 && buf[5] === 177 && buf[6] === 26 && buf[7] === 225) {
    return {
      ext: "msi",
      mime: "application/x-msi"
    };
  }
  return null;
};
var getStream$b = { exports: {} };
var pinkie;
var hasRequiredPinkie;
function requirePinkie() {
  if (hasRequiredPinkie)
    return pinkie;
  hasRequiredPinkie = 1;
  var PENDING = "pending";
  var SETTLED = "settled";
  var FULFILLED = "fulfilled";
  var REJECTED = "rejected";
  var NOOP = function() {
  };
  var isNode = typeof commonjsGlobal !== "undefined" && typeof commonjsGlobal.process !== "undefined" && typeof commonjsGlobal.process.emit === "function";
  var asyncSetTimer = typeof setImmediate === "undefined" ? setTimeout : setImmediate;
  var asyncQueue = [];
  var asyncTimer;
  function asyncFlush() {
    for (var i = 0; i < asyncQueue.length; i++) {
      asyncQueue[i][0](asyncQueue[i][1]);
    }
    asyncQueue = [];
    asyncTimer = false;
  }
  function asyncCall(callback, arg) {
    asyncQueue.push([callback, arg]);
    if (!asyncTimer) {
      asyncTimer = true;
      asyncSetTimer(asyncFlush, 0);
    }
  }
  function invokeResolver(resolver, promise) {
    function resolvePromise(value) {
      resolve2(promise, value);
    }
    function rejectPromise(reason) {
      reject2(promise, reason);
    }
    try {
      resolver(resolvePromise, rejectPromise);
    } catch (e) {
      rejectPromise(e);
    }
  }
  function invokeCallback(subscriber) {
    var owner = subscriber.owner;
    var settled = owner._state;
    var value = owner._data;
    var callback = subscriber[settled];
    var promise = subscriber.then;
    if (typeof callback === "function") {
      settled = FULFILLED;
      try {
        value = callback(value);
      } catch (e) {
        reject2(promise, e);
      }
    }
    if (!handleThenable(promise, value)) {
      if (settled === FULFILLED) {
        resolve2(promise, value);
      }
      if (settled === REJECTED) {
        reject2(promise, value);
      }
    }
  }
  function handleThenable(promise, value) {
    var resolved;
    try {
      if (promise === value) {
        throw new TypeError("A promises callback cannot return that same promise.");
      }
      if (value && (typeof value === "function" || typeof value === "object")) {
        var then = value.then;
        if (typeof then === "function") {
          then.call(value, function(val) {
            if (!resolved) {
              resolved = true;
              if (value === val) {
                fulfill(promise, val);
              } else {
                resolve2(promise, val);
              }
            }
          }, function(reason) {
            if (!resolved) {
              resolved = true;
              reject2(promise, reason);
            }
          });
          return true;
        }
      }
    } catch (e) {
      if (!resolved) {
        reject2(promise, e);
      }
      return true;
    }
    return false;
  }
  function resolve2(promise, value) {
    if (promise === value || !handleThenable(promise, value)) {
      fulfill(promise, value);
    }
  }
  function fulfill(promise, value) {
    if (promise._state === PENDING) {
      promise._state = SETTLED;
      promise._data = value;
      asyncCall(publishFulfillment, promise);
    }
  }
  function reject2(promise, reason) {
    if (promise._state === PENDING) {
      promise._state = SETTLED;
      promise._data = reason;
      asyncCall(publishRejection, promise);
    }
  }
  function publish(promise) {
    promise._then = promise._then.forEach(invokeCallback);
  }
  function publishFulfillment(promise) {
    promise._state = FULFILLED;
    publish(promise);
  }
  function publishRejection(promise) {
    promise._state = REJECTED;
    publish(promise);
    if (!promise._handled && isNode) {
      commonjsGlobal.process.emit("unhandledRejection", promise._data, promise);
    }
  }
  function notifyRejectionHandled(promise) {
    commonjsGlobal.process.emit("rejectionHandled", promise);
  }
  function Promise2(resolver) {
    if (typeof resolver !== "function") {
      throw new TypeError("Promise resolver " + resolver + " is not a function");
    }
    if (this instanceof Promise2 === false) {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }
    this._then = [];
    invokeResolver(resolver, this);
  }
  Promise2.prototype = {
    constructor: Promise2,
    _state: PENDING,
    _then: null,
    _data: void 0,
    _handled: false,
    then: function(onFulfillment, onRejection) {
      var subscriber = {
        owner: this,
        then: new this.constructor(NOOP),
        fulfilled: onFulfillment,
        rejected: onRejection
      };
      if ((onRejection || onFulfillment) && !this._handled) {
        this._handled = true;
        if (this._state === REJECTED && isNode) {
          asyncCall(notifyRejectionHandled, this);
        }
      }
      if (this._state === FULFILLED || this._state === REJECTED) {
        asyncCall(invokeCallback, subscriber);
      } else {
        this._then.push(subscriber);
      }
      return subscriber.then;
    },
    catch: function(onRejection) {
      return this.then(null, onRejection);
    }
  };
  Promise2.all = function(promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError("You must pass an array to Promise.all().");
    }
    return new Promise2(function(resolve3, reject3) {
      var results = [];
      var remaining = 0;
      function resolver(index) {
        remaining++;
        return function(value) {
          results[index] = value;
          if (!--remaining) {
            resolve3(results);
          }
        };
      }
      for (var i = 0, promise; i < promises.length; i++) {
        promise = promises[i];
        if (promise && typeof promise.then === "function") {
          promise.then(resolver(i), reject3);
        } else {
          results[i] = promise;
        }
      }
      if (!remaining) {
        resolve3(results);
      }
    });
  };
  Promise2.race = function(promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError("You must pass an array to Promise.race().");
    }
    return new Promise2(function(resolve3, reject3) {
      for (var i = 0, promise; i < promises.length; i++) {
        promise = promises[i];
        if (promise && typeof promise.then === "function") {
          promise.then(resolve3, reject3);
        } else {
          resolve3(promise);
        }
      }
    });
  };
  Promise2.resolve = function(value) {
    if (value && typeof value === "object" && value.constructor === Promise2) {
      return value;
    }
    return new Promise2(function(resolve3) {
      resolve3(value);
    });
  };
  Promise2.reject = function(reason) {
    return new Promise2(function(resolve3, reject3) {
      reject3(reason);
    });
  };
  pinkie = Promise2;
  return pinkie;
}
var pinkiePromise = typeof Promise === "function" ? Promise : requirePinkie();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2["_" + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
      return test2[n];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
var objectAssign$3 = shouldUseNative() ? Object.assign : function(target, source) {
  var from3;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from3 = Object(arguments[s]);
    for (var key2 in from3) {
      if (hasOwnProperty.call(from3, key2)) {
        to[key2] = from3[key2];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from3);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from3, symbols[i])) {
          to[symbols[i]] = from3[symbols[i]];
        }
      }
    }
  }
  return to;
};
var PassThrough$7 = require$$0__default$1.default.PassThrough;
var objectAssign$2 = objectAssign$3;
var bufferStream$7 = function(opts) {
  opts = objectAssign$2({}, opts);
  var array = opts.array;
  var encoding = opts.encoding;
  var buffer2 = encoding === "buffer";
  var objectMode = false;
  if (array) {
    objectMode = !(encoding || buffer2);
  } else {
    encoding = encoding || "utf8";
  }
  if (buffer2) {
    encoding = null;
  }
  var len = 0;
  var ret = [];
  var stream2 = new PassThrough$7({ objectMode });
  if (encoding) {
    stream2.setEncoding(encoding);
  }
  stream2.on("data", function(chunk) {
    ret.push(chunk);
    if (objectMode) {
      len = ret.length;
    } else {
      len += chunk.length;
    }
  });
  stream2.getBufferedValue = function() {
    if (array) {
      return ret;
    }
    return buffer2 ? Buffer.concat(ret, len) : ret.join("");
  };
  stream2.getBufferedLength = function() {
    return len;
  };
  return stream2;
};
var Promise$1 = pinkiePromise;
var objectAssign$1 = objectAssign$3;
var bufferStream$6 = bufferStream$7;
function getStream$a(inputStream, opts) {
  if (!inputStream) {
    return Promise$1.reject(new Error("Expected a stream"));
  }
  opts = objectAssign$1({ maxBuffer: Infinity }, opts);
  var maxBuffer = opts.maxBuffer;
  var stream2;
  var clean;
  var p = new Promise$1(function(resolve2, reject2) {
    stream2 = bufferStream$6(opts);
    inputStream.once("error", error);
    inputStream.pipe(stream2);
    stream2.on("data", function() {
      if (stream2.getBufferedLength() > maxBuffer) {
        reject2(new Error("maxBuffer exceeded"));
      }
    });
    stream2.once("error", error);
    stream2.on("end", resolve2);
    clean = function() {
      if (inputStream.unpipe) {
        inputStream.unpipe(stream2);
      }
    };
    function error(err) {
      if (err) {
        err.bufferedData = stream2.getBufferedValue();
      }
      reject2(err);
    }
  });
  p.then(clean, clean);
  return p.then(function() {
    return stream2.getBufferedValue();
  });
}
getStream$b.exports = getStream$a;
getStream$b.exports.buffer = function(stream2, opts) {
  return getStream$a(stream2, objectAssign$1({}, opts, { encoding: "buffer" }));
};
getStream$b.exports.array = function(stream2, opts) {
  return getStream$a(stream2, objectAssign$1({}, opts, { array: true }));
};
var pify$c = { exports: {} };
var processFn$4 = function(fn, P, opts) {
  return function() {
    var that = this;
    var args = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    return new P(function(resolve2, reject2) {
      args.push(function(err, result) {
        if (err) {
          reject2(err);
        } else if (opts.multiArgs) {
          var results = new Array(arguments.length - 1);
          for (var i2 = 1; i2 < arguments.length; i2++) {
            results[i2 - 1] = arguments[i2];
          }
          resolve2(results);
        } else {
          resolve2(result);
        }
      });
      fn.apply(that, args);
    });
  };
};
var pify$b = pify$c.exports = function(obj2, P, opts) {
  if (typeof P !== "function") {
    opts = P;
    P = Promise;
  }
  opts = opts || {};
  opts.exclude = opts.exclude || [/.+Sync$/];
  var filter = function(key2) {
    var match = function(pattern) {
      return typeof pattern === "string" ? key2 === pattern : pattern.test(key2);
    };
    return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
  };
  var ret = typeof obj2 === "function" ? function() {
    if (opts.excludeMain) {
      return obj2.apply(this, arguments);
    }
    return processFn$4(obj2, P, opts).apply(this, arguments);
  } : {};
  return Object.keys(obj2).reduce(function(ret2, key2) {
    var x = obj2[key2];
    ret2[key2] = typeof x === "function" && filter(key2) ? processFn$4(x, P, opts) : x;
    return ret2;
  }, ret);
};
pify$b.all = pify$b;
var yauzl$1 = {};
var fdSlicer = {};
var pend = Pend$1;
function Pend$1() {
  this.pending = 0;
  this.max = Infinity;
  this.listeners = [];
  this.waiting = [];
  this.error = null;
}
Pend$1.prototype.go = function(fn) {
  if (this.pending < this.max) {
    pendGo(this, fn);
  } else {
    this.waiting.push(fn);
  }
};
Pend$1.prototype.wait = function(cb) {
  if (this.pending === 0) {
    cb(this.error);
  } else {
    this.listeners.push(cb);
  }
};
Pend$1.prototype.hold = function() {
  return pendHold(this);
};
function pendHold(self2) {
  self2.pending += 1;
  var called = false;
  return onCb;
  function onCb(err) {
    if (called)
      throw new Error("callback called twice");
    called = true;
    self2.error = self2.error || err;
    self2.pending -= 1;
    if (self2.waiting.length > 0 && self2.pending < self2.max) {
      pendGo(self2, self2.waiting.shift());
    } else if (self2.pending === 0) {
      var listeners = self2.listeners;
      self2.listeners = [];
      listeners.forEach(cbListener);
    }
  }
  function cbListener(listener) {
    listener(self2.error);
  }
}
function pendGo(self2, fn) {
  fn(pendHold(self2));
}
var fs$7 = fs__default.default;
var util$3 = require$$1__default.default;
var stream$1 = require$$0__default$1.default;
var Readable$2 = stream$1.Readable;
var Writable$1 = stream$1.Writable;
var PassThrough$6 = stream$1.PassThrough;
var Pend = pend;
var EventEmitter$4 = require$$0__default$3.default.EventEmitter;
fdSlicer.createFromBuffer = createFromBuffer;
fdSlicer.createFromFd = createFromFd;
fdSlicer.BufferSlicer = BufferSlicer;
fdSlicer.FdSlicer = FdSlicer;
util$3.inherits(FdSlicer, EventEmitter$4);
function FdSlicer(fd, options) {
  options = options || {};
  EventEmitter$4.call(this);
  this.fd = fd;
  this.pend = new Pend();
  this.pend.max = 1;
  this.refCount = 0;
  this.autoClose = !!options.autoClose;
}
FdSlicer.prototype.read = function(buffer2, offset, length, position, callback) {
  var self2 = this;
  self2.pend.go(function(cb) {
    fs$7.read(self2.fd, buffer2, offset, length, position, function(err, bytesRead, buffer3) {
      cb();
      callback(err, bytesRead, buffer3);
    });
  });
};
FdSlicer.prototype.write = function(buffer2, offset, length, position, callback) {
  var self2 = this;
  self2.pend.go(function(cb) {
    fs$7.write(self2.fd, buffer2, offset, length, position, function(err, written, buffer3) {
      cb();
      callback(err, written, buffer3);
    });
  });
};
FdSlicer.prototype.createReadStream = function(options) {
  return new ReadStream(this, options);
};
FdSlicer.prototype.createWriteStream = function(options) {
  return new WriteStream(this, options);
};
FdSlicer.prototype.ref = function() {
  this.refCount += 1;
};
FdSlicer.prototype.unref = function() {
  var self2 = this;
  self2.refCount -= 1;
  if (self2.refCount > 0)
    return;
  if (self2.refCount < 0)
    throw new Error("invalid unref");
  if (self2.autoClose) {
    fs$7.close(self2.fd, onCloseDone);
  }
  function onCloseDone(err) {
    if (err) {
      self2.emit("error", err);
    } else {
      self2.emit("close");
    }
  }
};
util$3.inherits(ReadStream, Readable$2);
function ReadStream(context, options) {
  options = options || {};
  Readable$2.call(this, options);
  this.context = context;
  this.context.ref();
  this.start = options.start || 0;
  this.endOffset = options.end;
  this.pos = this.start;
  this.destroyed = false;
}
ReadStream.prototype._read = function(n) {
  var self2 = this;
  if (self2.destroyed)
    return;
  var toRead = Math.min(self2._readableState.highWaterMark, n);
  if (self2.endOffset != null) {
    toRead = Math.min(toRead, self2.endOffset - self2.pos);
  }
  if (toRead <= 0) {
    self2.destroyed = true;
    self2.push(null);
    self2.context.unref();
    return;
  }
  self2.context.pend.go(function(cb) {
    if (self2.destroyed)
      return cb();
    var buffer2 = new Buffer(toRead);
    fs$7.read(self2.context.fd, buffer2, 0, toRead, self2.pos, function(err, bytesRead) {
      if (err) {
        self2.destroy(err);
      } else if (bytesRead === 0) {
        self2.destroyed = true;
        self2.push(null);
        self2.context.unref();
      } else {
        self2.pos += bytesRead;
        self2.push(buffer2.slice(0, bytesRead));
      }
      cb();
    });
  });
};
ReadStream.prototype.destroy = function(err) {
  if (this.destroyed)
    return;
  err = err || new Error("stream destroyed");
  this.destroyed = true;
  this.emit("error", err);
  this.context.unref();
};
util$3.inherits(WriteStream, Writable$1);
function WriteStream(context, options) {
  options = options || {};
  Writable$1.call(this, options);
  this.context = context;
  this.context.ref();
  this.start = options.start || 0;
  this.endOffset = options.end == null ? Infinity : +options.end;
  this.bytesWritten = 0;
  this.pos = this.start;
  this.destroyed = false;
  this.on("finish", this.destroy.bind(this));
}
WriteStream.prototype._write = function(buffer2, encoding, callback) {
  var self2 = this;
  if (self2.destroyed)
    return;
  if (self2.pos + buffer2.length > self2.endOffset) {
    var err = new Error("maximum file length exceeded");
    err.code = "ETOOBIG";
    self2.destroy();
    callback(err);
    return;
  }
  self2.context.pend.go(function(cb) {
    if (self2.destroyed)
      return cb();
    fs$7.write(self2.context.fd, buffer2, 0, buffer2.length, self2.pos, function(err2, bytes) {
      if (err2) {
        self2.destroy();
        cb();
        callback(err2);
      } else {
        self2.bytesWritten += bytes;
        self2.pos += bytes;
        self2.emit("progress");
        cb();
        callback();
      }
    });
  });
};
WriteStream.prototype.destroy = function() {
  if (this.destroyed)
    return;
  this.destroyed = true;
  this.context.unref();
};
util$3.inherits(BufferSlicer, EventEmitter$4);
function BufferSlicer(buffer2, options) {
  EventEmitter$4.call(this);
  options = options || {};
  this.refCount = 0;
  this.buffer = buffer2;
  this.maxChunkSize = options.maxChunkSize || Number.MAX_SAFE_INTEGER;
}
BufferSlicer.prototype.read = function(buffer2, offset, length, position, callback) {
  var end2 = position + length;
  var delta = end2 - this.buffer.length;
  var written = delta > 0 ? delta : length;
  this.buffer.copy(buffer2, offset, position, end2);
  setImmediate(function() {
    callback(null, written);
  });
};
BufferSlicer.prototype.write = function(buffer2, offset, length, position, callback) {
  buffer2.copy(this.buffer, position, offset, offset + length);
  setImmediate(function() {
    callback(null, length, buffer2);
  });
};
BufferSlicer.prototype.createReadStream = function(options) {
  options = options || {};
  var readStream = new PassThrough$6(options);
  readStream.destroyed = false;
  readStream.start = options.start || 0;
  readStream.endOffset = options.end;
  readStream.pos = readStream.endOffset || this.buffer.length;
  var entireSlice = this.buffer.slice(readStream.start, readStream.pos);
  var offset = 0;
  while (true) {
    var nextOffset = offset + this.maxChunkSize;
    if (nextOffset >= entireSlice.length) {
      if (offset < entireSlice.length) {
        readStream.write(entireSlice.slice(offset, entireSlice.length));
      }
      break;
    }
    readStream.write(entireSlice.slice(offset, nextOffset));
    offset = nextOffset;
  }
  readStream.end();
  readStream.destroy = function() {
    readStream.destroyed = true;
  };
  return readStream;
};
BufferSlicer.prototype.createWriteStream = function(options) {
  var bufferSlicer = this;
  options = options || {};
  var writeStream = new Writable$1(options);
  writeStream.start = options.start || 0;
  writeStream.endOffset = options.end == null ? this.buffer.length : +options.end;
  writeStream.bytesWritten = 0;
  writeStream.pos = writeStream.start;
  writeStream.destroyed = false;
  writeStream._write = function(buffer2, encoding, callback) {
    if (writeStream.destroyed)
      return;
    var end2 = writeStream.pos + buffer2.length;
    if (end2 > writeStream.endOffset) {
      var err = new Error("maximum file length exceeded");
      err.code = "ETOOBIG";
      writeStream.destroyed = true;
      callback(err);
      return;
    }
    buffer2.copy(bufferSlicer.buffer, writeStream.pos, 0, buffer2.length);
    writeStream.bytesWritten += buffer2.length;
    writeStream.pos = end2;
    writeStream.emit("progress");
    callback();
  };
  writeStream.destroy = function() {
    writeStream.destroyed = true;
  };
  return writeStream;
};
BufferSlicer.prototype.ref = function() {
  this.refCount += 1;
};
BufferSlicer.prototype.unref = function() {
  this.refCount -= 1;
  if (this.refCount < 0) {
    throw new Error("invalid unref");
  }
};
function createFromBuffer(buffer2, options) {
  return new BufferSlicer(buffer2, options);
}
function createFromFd(fd, options) {
  return new FdSlicer(fd, options);
}
var Buffer$2 = require$$0__default$2.default.Buffer;
var CRC_TABLE = [
  0,
  1996959894,
  3993919788,
  2567524794,
  124634137,
  1886057615,
  3915621685,
  2657392035,
  249268274,
  2044508324,
  3772115230,
  2547177864,
  162941995,
  2125561021,
  3887607047,
  2428444049,
  498536548,
  1789927666,
  4089016648,
  2227061214,
  450548861,
  1843258603,
  4107580753,
  2211677639,
  325883990,
  1684777152,
  4251122042,
  2321926636,
  335633487,
  1661365465,
  4195302755,
  2366115317,
  997073096,
  1281953886,
  3579855332,
  2724688242,
  1006888145,
  1258607687,
  3524101629,
  2768942443,
  901097722,
  1119000684,
  3686517206,
  2898065728,
  853044451,
  1172266101,
  3705015759,
  2882616665,
  651767980,
  1373503546,
  3369554304,
  3218104598,
  565507253,
  1454621731,
  3485111705,
  3099436303,
  671266974,
  1594198024,
  3322730930,
  2970347812,
  795835527,
  1483230225,
  3244367275,
  3060149565,
  1994146192,
  31158534,
  2563907772,
  4023717930,
  1907459465,
  112637215,
  2680153253,
  3904427059,
  2013776290,
  251722036,
  2517215374,
  3775830040,
  2137656763,
  141376813,
  2439277719,
  3865271297,
  1802195444,
  476864866,
  2238001368,
  4066508878,
  1812370925,
  453092731,
  2181625025,
  4111451223,
  1706088902,
  314042704,
  2344532202,
  4240017532,
  1658658271,
  366619977,
  2362670323,
  4224994405,
  1303535960,
  984961486,
  2747007092,
  3569037538,
  1256170817,
  1037604311,
  2765210733,
  3554079995,
  1131014506,
  879679996,
  2909243462,
  3663771856,
  1141124467,
  855842277,
  2852801631,
  3708648649,
  1342533948,
  654459306,
  3188396048,
  3373015174,
  1466479909,
  544179635,
  3110523913,
  3462522015,
  1591671054,
  702138776,
  2966460450,
  3352799412,
  1504918807,
  783551873,
  3082640443,
  3233442989,
  3988292384,
  2596254646,
  62317068,
  1957810842,
  3939845945,
  2647816111,
  81470997,
  1943803523,
  3814918930,
  2489596804,
  225274430,
  2053790376,
  3826175755,
  2466906013,
  167816743,
  2097651377,
  4027552580,
  2265490386,
  503444072,
  1762050814,
  4150417245,
  2154129355,
  426522225,
  1852507879,
  4275313526,
  2312317920,
  282753626,
  1742555852,
  4189708143,
  2394877945,
  397917763,
  1622183637,
  3604390888,
  2714866558,
  953729732,
  1340076626,
  3518719985,
  2797360999,
  1068828381,
  1219638859,
  3624741850,
  2936675148,
  906185462,
  1090812512,
  3747672003,
  2825379669,
  829329135,
  1181335161,
  3412177804,
  3160834842,
  628085408,
  1382605366,
  3423369109,
  3138078467,
  570562233,
  1426400815,
  3317316542,
  2998733608,
  733239954,
  1555261956,
  3268935591,
  3050360625,
  752459403,
  1541320221,
  2607071920,
  3965973030,
  1969922972,
  40735498,
  2617837225,
  3943577151,
  1913087877,
  83908371,
  2512341634,
  3803740692,
  2075208622,
  213261112,
  2463272603,
  3855990285,
  2094854071,
  198958881,
  2262029012,
  4057260610,
  1759359992,
  534414190,
  2176718541,
  4139329115,
  1873836001,
  414664567,
  2282248934,
  4279200368,
  1711684554,
  285281116,
  2405801727,
  4167216745,
  1634467795,
  376229701,
  2685067896,
  3608007406,
  1308918612,
  956543938,
  2808555105,
  3495958263,
  1231636301,
  1047427035,
  2932959818,
  3654703836,
  1088359270,
  936918e3,
  2847714899,
  3736837829,
  1202900863,
  817233897,
  3183342108,
  3401237130,
  1404277552,
  615818150,
  3134207493,
  3453421203,
  1423857449,
  601450431,
  3009837614,
  3294710456,
  1567103746,
  711928724,
  3020668471,
  3272380065,
  1510334235,
  755167117
];
if (typeof Int32Array !== "undefined") {
  CRC_TABLE = new Int32Array(CRC_TABLE);
}
function ensureBuffer(input) {
  if (Buffer$2.isBuffer(input)) {
    return input;
  }
  var hasNewBufferAPI = typeof Buffer$2.alloc === "function" && typeof Buffer$2.from === "function";
  if (typeof input === "number") {
    return hasNewBufferAPI ? Buffer$2.alloc(input) : new Buffer$2(input);
  } else if (typeof input === "string") {
    return hasNewBufferAPI ? Buffer$2.from(input) : new Buffer$2(input);
  } else {
    throw new Error("input must be buffer, number, or string, received " + typeof input);
  }
}
function bufferizeInt(num) {
  var tmp = ensureBuffer(4);
  tmp.writeInt32BE(num, 0);
  return tmp;
}
function _crc32(buf, previous) {
  buf = ensureBuffer(buf);
  if (Buffer$2.isBuffer(previous)) {
    previous = previous.readUInt32BE(0);
  }
  var crc = ~~previous ^ -1;
  for (var n = 0; n < buf.length; n++) {
    crc = CRC_TABLE[(crc ^ buf[n]) & 255] ^ crc >>> 8;
  }
  return crc ^ -1;
}
function crc32$1() {
  return bufferizeInt(_crc32.apply(null, arguments));
}
crc32$1.signed = function() {
  return _crc32.apply(null, arguments);
};
crc32$1.unsigned = function() {
  return _crc32.apply(null, arguments) >>> 0;
};
var bufferCrc32 = crc32$1;
var fs$6 = fs__default.default;
var zlib = require$$0__default$4.default;
var fd_slicer = fdSlicer;
var crc32 = bufferCrc32;
var util$2 = require$$1__default.default;
var EventEmitter$3 = require$$0__default$3.default.EventEmitter;
var Transform$1 = require$$0__default$1.default.Transform;
var PassThrough$5 = require$$0__default$1.default.PassThrough;
var Writable = require$$0__default$1.default.Writable;
yauzl$1.open = open;
yauzl$1.fromFd = fromFd;
yauzl$1.fromBuffer = fromBuffer;
yauzl$1.fromRandomAccessReader = fromRandomAccessReader;
yauzl$1.dosDateTimeToDate = dosDateTimeToDate;
yauzl$1.validateFileName = validateFileName;
yauzl$1.ZipFile = ZipFile;
yauzl$1.Entry = Entry;
yauzl$1.RandomAccessReader = RandomAccessReader;
function open(path2, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = null;
  }
  if (options == null)
    options = {};
  if (options.autoClose == null)
    options.autoClose = true;
  if (options.lazyEntries == null)
    options.lazyEntries = false;
  if (options.decodeStrings == null)
    options.decodeStrings = true;
  if (options.validateEntrySizes == null)
    options.validateEntrySizes = true;
  if (options.strictFileNames == null)
    options.strictFileNames = false;
  if (callback == null)
    callback = defaultCallback;
  fs$6.open(path2, "r", function(err, fd) {
    if (err)
      return callback(err);
    fromFd(fd, options, function(err2, zipfile) {
      if (err2)
        fs$6.close(fd, defaultCallback);
      callback(err2, zipfile);
    });
  });
}
function fromFd(fd, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = null;
  }
  if (options == null)
    options = {};
  if (options.autoClose == null)
    options.autoClose = false;
  if (options.lazyEntries == null)
    options.lazyEntries = false;
  if (options.decodeStrings == null)
    options.decodeStrings = true;
  if (options.validateEntrySizes == null)
    options.validateEntrySizes = true;
  if (options.strictFileNames == null)
    options.strictFileNames = false;
  if (callback == null)
    callback = defaultCallback;
  fs$6.fstat(fd, function(err, stats) {
    if (err)
      return callback(err);
    var reader = fd_slicer.createFromFd(fd, { autoClose: true });
    fromRandomAccessReader(reader, stats.size, options, callback);
  });
}
function fromBuffer(buffer2, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = null;
  }
  if (options == null)
    options = {};
  options.autoClose = false;
  if (options.lazyEntries == null)
    options.lazyEntries = false;
  if (options.decodeStrings == null)
    options.decodeStrings = true;
  if (options.validateEntrySizes == null)
    options.validateEntrySizes = true;
  if (options.strictFileNames == null)
    options.strictFileNames = false;
  var reader = fd_slicer.createFromBuffer(buffer2, { maxChunkSize: 65536 });
  fromRandomAccessReader(reader, buffer2.length, options, callback);
}
function fromRandomAccessReader(reader, totalSize, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = null;
  }
  if (options == null)
    options = {};
  if (options.autoClose == null)
    options.autoClose = true;
  if (options.lazyEntries == null)
    options.lazyEntries = false;
  if (options.decodeStrings == null)
    options.decodeStrings = true;
  var decodeStrings = !!options.decodeStrings;
  if (options.validateEntrySizes == null)
    options.validateEntrySizes = true;
  if (options.strictFileNames == null)
    options.strictFileNames = false;
  if (callback == null)
    callback = defaultCallback;
  if (typeof totalSize !== "number")
    throw new Error("expected totalSize parameter to be a number");
  if (totalSize > Number.MAX_SAFE_INTEGER) {
    throw new Error("zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.");
  }
  reader.ref();
  var eocdrWithoutCommentSize = 22;
  var maxCommentSize = 65535;
  var bufferSize = Math.min(eocdrWithoutCommentSize + maxCommentSize, totalSize);
  var buffer2 = newBuffer(bufferSize);
  var bufferReadStart = totalSize - buffer2.length;
  readAndAssertNoEof(reader, buffer2, 0, bufferSize, bufferReadStart, function(err) {
    if (err)
      return callback(err);
    for (var i = bufferSize - eocdrWithoutCommentSize; i >= 0; i -= 1) {
      if (buffer2.readUInt32LE(i) !== 101010256)
        continue;
      var eocdrBuffer = buffer2.slice(i);
      var diskNumber = eocdrBuffer.readUInt16LE(4);
      if (diskNumber !== 0) {
        return callback(new Error("multi-disk zip files are not supported: found disk number: " + diskNumber));
      }
      var entryCount = eocdrBuffer.readUInt16LE(10);
      var centralDirectoryOffset = eocdrBuffer.readUInt32LE(16);
      var commentLength = eocdrBuffer.readUInt16LE(20);
      var expectedCommentLength = eocdrBuffer.length - eocdrWithoutCommentSize;
      if (commentLength !== expectedCommentLength) {
        return callback(new Error("invalid comment length. expected: " + expectedCommentLength + ". found: " + commentLength));
      }
      var comment = decodeStrings ? decodeBuffer(eocdrBuffer, 22, eocdrBuffer.length, false) : eocdrBuffer.slice(22);
      if (!(entryCount === 65535 || centralDirectoryOffset === 4294967295)) {
        return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
      }
      var zip64EocdlBuffer = newBuffer(20);
      var zip64EocdlOffset = bufferReadStart + i - zip64EocdlBuffer.length;
      readAndAssertNoEof(reader, zip64EocdlBuffer, 0, zip64EocdlBuffer.length, zip64EocdlOffset, function(err2) {
        if (err2)
          return callback(err2);
        if (zip64EocdlBuffer.readUInt32LE(0) !== 117853008) {
          return callback(new Error("invalid zip64 end of central directory locator signature"));
        }
        var zip64EocdrOffset = readUInt64LE(zip64EocdlBuffer, 8);
        var zip64EocdrBuffer = newBuffer(56);
        readAndAssertNoEof(reader, zip64EocdrBuffer, 0, zip64EocdrBuffer.length, zip64EocdrOffset, function(err3) {
          if (err3)
            return callback(err3);
          if (zip64EocdrBuffer.readUInt32LE(0) !== 101075792) {
            return callback(new Error("invalid zip64 end of central directory record signature"));
          }
          entryCount = readUInt64LE(zip64EocdrBuffer, 32);
          centralDirectoryOffset = readUInt64LE(zip64EocdrBuffer, 48);
          return callback(null, new ZipFile(reader, centralDirectoryOffset, totalSize, entryCount, comment, options.autoClose, options.lazyEntries, decodeStrings, options.validateEntrySizes, options.strictFileNames));
        });
      });
      return;
    }
    callback(new Error("end of central directory record signature not found"));
  });
}
util$2.inherits(ZipFile, EventEmitter$3);
function ZipFile(reader, centralDirectoryOffset, fileSize, entryCount, comment, autoClose, lazyEntries, decodeStrings, validateEntrySizes, strictFileNames) {
  var self2 = this;
  EventEmitter$3.call(self2);
  self2.reader = reader;
  self2.reader.on("error", function(err) {
    emitError(self2, err);
  });
  self2.reader.once("close", function() {
    self2.emit("close");
  });
  self2.readEntryCursor = centralDirectoryOffset;
  self2.fileSize = fileSize;
  self2.entryCount = entryCount;
  self2.comment = comment;
  self2.entriesRead = 0;
  self2.autoClose = !!autoClose;
  self2.lazyEntries = !!lazyEntries;
  self2.decodeStrings = !!decodeStrings;
  self2.validateEntrySizes = !!validateEntrySizes;
  self2.strictFileNames = !!strictFileNames;
  self2.isOpen = true;
  self2.emittedError = false;
  if (!self2.lazyEntries)
    self2._readEntry();
}
ZipFile.prototype.close = function() {
  if (!this.isOpen)
    return;
  this.isOpen = false;
  this.reader.unref();
};
function emitErrorAndAutoClose(self2, err) {
  if (self2.autoClose)
    self2.close();
  emitError(self2, err);
}
function emitError(self2, err) {
  if (self2.emittedError)
    return;
  self2.emittedError = true;
  self2.emit("error", err);
}
ZipFile.prototype.readEntry = function() {
  if (!this.lazyEntries)
    throw new Error("readEntry() called without lazyEntries:true");
  this._readEntry();
};
ZipFile.prototype._readEntry = function() {
  var self2 = this;
  if (self2.entryCount === self2.entriesRead) {
    setImmediate(function() {
      if (self2.autoClose)
        self2.close();
      if (self2.emittedError)
        return;
      self2.emit("end");
    });
    return;
  }
  if (self2.emittedError)
    return;
  var buffer2 = newBuffer(46);
  readAndAssertNoEof(self2.reader, buffer2, 0, buffer2.length, self2.readEntryCursor, function(err) {
    if (err)
      return emitErrorAndAutoClose(self2, err);
    if (self2.emittedError)
      return;
    var entry = new Entry();
    var signature = buffer2.readUInt32LE(0);
    if (signature !== 33639248)
      return emitErrorAndAutoClose(self2, new Error("invalid central directory file header signature: 0x" + signature.toString(16)));
    entry.versionMadeBy = buffer2.readUInt16LE(4);
    entry.versionNeededToExtract = buffer2.readUInt16LE(6);
    entry.generalPurposeBitFlag = buffer2.readUInt16LE(8);
    entry.compressionMethod = buffer2.readUInt16LE(10);
    entry.lastModFileTime = buffer2.readUInt16LE(12);
    entry.lastModFileDate = buffer2.readUInt16LE(14);
    entry.crc32 = buffer2.readUInt32LE(16);
    entry.compressedSize = buffer2.readUInt32LE(20);
    entry.uncompressedSize = buffer2.readUInt32LE(24);
    entry.fileNameLength = buffer2.readUInt16LE(28);
    entry.extraFieldLength = buffer2.readUInt16LE(30);
    entry.fileCommentLength = buffer2.readUInt16LE(32);
    entry.internalFileAttributes = buffer2.readUInt16LE(36);
    entry.externalFileAttributes = buffer2.readUInt32LE(38);
    entry.relativeOffsetOfLocalHeader = buffer2.readUInt32LE(42);
    if (entry.generalPurposeBitFlag & 64)
      return emitErrorAndAutoClose(self2, new Error("strong encryption is not supported"));
    self2.readEntryCursor += 46;
    buffer2 = newBuffer(entry.fileNameLength + entry.extraFieldLength + entry.fileCommentLength);
    readAndAssertNoEof(self2.reader, buffer2, 0, buffer2.length, self2.readEntryCursor, function(err2) {
      if (err2)
        return emitErrorAndAutoClose(self2, err2);
      if (self2.emittedError)
        return;
      var isUtf8 = (entry.generalPurposeBitFlag & 2048) !== 0;
      entry.fileName = self2.decodeStrings ? decodeBuffer(buffer2, 0, entry.fileNameLength, isUtf8) : buffer2.slice(0, entry.fileNameLength);
      var fileCommentStart = entry.fileNameLength + entry.extraFieldLength;
      var extraFieldBuffer = buffer2.slice(entry.fileNameLength, fileCommentStart);
      entry.extraFields = [];
      var i = 0;
      while (i < extraFieldBuffer.length - 3) {
        var headerId = extraFieldBuffer.readUInt16LE(i + 0);
        var dataSize = extraFieldBuffer.readUInt16LE(i + 2);
        var dataStart = i + 4;
        var dataEnd = dataStart + dataSize;
        if (dataEnd > extraFieldBuffer.length)
          return emitErrorAndAutoClose(self2, new Error("extra field length exceeds extra field buffer size"));
        var dataBuffer = newBuffer(dataSize);
        extraFieldBuffer.copy(dataBuffer, 0, dataStart, dataEnd);
        entry.extraFields.push({
          id: headerId,
          data: dataBuffer
        });
        i = dataEnd;
      }
      entry.fileComment = self2.decodeStrings ? decodeBuffer(buffer2, fileCommentStart, fileCommentStart + entry.fileCommentLength, isUtf8) : buffer2.slice(fileCommentStart, fileCommentStart + entry.fileCommentLength);
      entry.comment = entry.fileComment;
      self2.readEntryCursor += buffer2.length;
      self2.entriesRead += 1;
      if (entry.uncompressedSize === 4294967295 || entry.compressedSize === 4294967295 || entry.relativeOffsetOfLocalHeader === 4294967295) {
        var zip64EiefBuffer = null;
        for (var i = 0; i < entry.extraFields.length; i++) {
          var extraField = entry.extraFields[i];
          if (extraField.id === 1) {
            zip64EiefBuffer = extraField.data;
            break;
          }
        }
        if (zip64EiefBuffer == null) {
          return emitErrorAndAutoClose(self2, new Error("expected zip64 extended information extra field"));
        }
        var index = 0;
        if (entry.uncompressedSize === 4294967295) {
          if (index + 8 > zip64EiefBuffer.length) {
            return emitErrorAndAutoClose(self2, new Error("zip64 extended information extra field does not include uncompressed size"));
          }
          entry.uncompressedSize = readUInt64LE(zip64EiefBuffer, index);
          index += 8;
        }
        if (entry.compressedSize === 4294967295) {
          if (index + 8 > zip64EiefBuffer.length) {
            return emitErrorAndAutoClose(self2, new Error("zip64 extended information extra field does not include compressed size"));
          }
          entry.compressedSize = readUInt64LE(zip64EiefBuffer, index);
          index += 8;
        }
        if (entry.relativeOffsetOfLocalHeader === 4294967295) {
          if (index + 8 > zip64EiefBuffer.length) {
            return emitErrorAndAutoClose(self2, new Error("zip64 extended information extra field does not include relative header offset"));
          }
          entry.relativeOffsetOfLocalHeader = readUInt64LE(zip64EiefBuffer, index);
          index += 8;
        }
      }
      if (self2.decodeStrings) {
        for (var i = 0; i < entry.extraFields.length; i++) {
          var extraField = entry.extraFields[i];
          if (extraField.id === 28789) {
            if (extraField.data.length < 6) {
              continue;
            }
            if (extraField.data.readUInt8(0) !== 1) {
              continue;
            }
            var oldNameCrc32 = extraField.data.readUInt32LE(1);
            if (crc32.unsigned(buffer2.slice(0, entry.fileNameLength)) !== oldNameCrc32) {
              continue;
            }
            entry.fileName = decodeBuffer(extraField.data, 5, extraField.data.length, true);
            break;
          }
        }
      }
      if (self2.validateEntrySizes && entry.compressionMethod === 0) {
        var expectedCompressedSize = entry.uncompressedSize;
        if (entry.isEncrypted()) {
          expectedCompressedSize += 12;
        }
        if (entry.compressedSize !== expectedCompressedSize) {
          var msg = "compressed/uncompressed size mismatch for stored file: " + entry.compressedSize + " != " + entry.uncompressedSize;
          return emitErrorAndAutoClose(self2, new Error(msg));
        }
      }
      if (self2.decodeStrings) {
        if (!self2.strictFileNames) {
          entry.fileName = entry.fileName.replace(/\\/g, "/");
        }
        var errorMessage = validateFileName(entry.fileName, self2.validateFileNameOptions);
        if (errorMessage != null)
          return emitErrorAndAutoClose(self2, new Error(errorMessage));
      }
      self2.emit("entry", entry);
      if (!self2.lazyEntries)
        self2._readEntry();
    });
  });
};
ZipFile.prototype.openReadStream = function(entry, options, callback) {
  var self2 = this;
  var relativeStart = 0;
  var relativeEnd = entry.compressedSize;
  if (callback == null) {
    callback = options;
    options = {};
  } else {
    if (options.decrypt != null) {
      if (!entry.isEncrypted()) {
        throw new Error("options.decrypt can only be specified for encrypted entries");
      }
      if (options.decrypt !== false)
        throw new Error("invalid options.decrypt value: " + options.decrypt);
      if (entry.isCompressed()) {
        if (options.decompress !== false)
          throw new Error("entry is encrypted and compressed, and options.decompress !== false");
      }
    }
    if (options.decompress != null) {
      if (!entry.isCompressed()) {
        throw new Error("options.decompress can only be specified for compressed entries");
      }
      if (!(options.decompress === false || options.decompress === true)) {
        throw new Error("invalid options.decompress value: " + options.decompress);
      }
    }
    if (options.start != null || options.end != null) {
      if (entry.isCompressed() && options.decompress !== false) {
        throw new Error("start/end range not allowed for compressed entry without options.decompress === false");
      }
      if (entry.isEncrypted() && options.decrypt !== false) {
        throw new Error("start/end range not allowed for encrypted entry without options.decrypt === false");
      }
    }
    if (options.start != null) {
      relativeStart = options.start;
      if (relativeStart < 0)
        throw new Error("options.start < 0");
      if (relativeStart > entry.compressedSize)
        throw new Error("options.start > entry.compressedSize");
    }
    if (options.end != null) {
      relativeEnd = options.end;
      if (relativeEnd < 0)
        throw new Error("options.end < 0");
      if (relativeEnd > entry.compressedSize)
        throw new Error("options.end > entry.compressedSize");
      if (relativeEnd < relativeStart)
        throw new Error("options.end < options.start");
    }
  }
  if (!self2.isOpen)
    return callback(new Error("closed"));
  if (entry.isEncrypted()) {
    if (options.decrypt !== false)
      return callback(new Error("entry is encrypted, and options.decrypt !== false"));
  }
  self2.reader.ref();
  var buffer2 = newBuffer(30);
  readAndAssertNoEof(self2.reader, buffer2, 0, buffer2.length, entry.relativeOffsetOfLocalHeader, function(err) {
    try {
      if (err)
        return callback(err);
      var signature = buffer2.readUInt32LE(0);
      if (signature !== 67324752) {
        return callback(new Error("invalid local file header signature: 0x" + signature.toString(16)));
      }
      var fileNameLength = buffer2.readUInt16LE(26);
      var extraFieldLength = buffer2.readUInt16LE(28);
      var localFileHeaderEnd = entry.relativeOffsetOfLocalHeader + buffer2.length + fileNameLength + extraFieldLength;
      var decompress2;
      if (entry.compressionMethod === 0) {
        decompress2 = false;
      } else if (entry.compressionMethod === 8) {
        decompress2 = options.decompress != null ? options.decompress : true;
      } else {
        return callback(new Error("unsupported compression method: " + entry.compressionMethod));
      }
      var fileDataStart = localFileHeaderEnd;
      var fileDataEnd = fileDataStart + entry.compressedSize;
      if (entry.compressedSize !== 0) {
        if (fileDataEnd > self2.fileSize) {
          return callback(new Error("file data overflows file bounds: " + fileDataStart + " + " + entry.compressedSize + " > " + self2.fileSize));
        }
      }
      var readStream = self2.reader.createReadStream({
        start: fileDataStart + relativeStart,
        end: fileDataStart + relativeEnd
      });
      var endpointStream = readStream;
      if (decompress2) {
        var destroyed = false;
        var inflateFilter = zlib.createInflateRaw();
        readStream.on("error", function(err2) {
          setImmediate(function() {
            if (!destroyed)
              inflateFilter.emit("error", err2);
          });
        });
        readStream.pipe(inflateFilter);
        if (self2.validateEntrySizes) {
          endpointStream = new AssertByteCountStream(entry.uncompressedSize);
          inflateFilter.on("error", function(err2) {
            setImmediate(function() {
              if (!destroyed)
                endpointStream.emit("error", err2);
            });
          });
          inflateFilter.pipe(endpointStream);
        } else {
          endpointStream = inflateFilter;
        }
        endpointStream.destroy = function() {
          destroyed = true;
          if (inflateFilter !== endpointStream)
            inflateFilter.unpipe(endpointStream);
          readStream.unpipe(inflateFilter);
          readStream.destroy();
        };
      }
      callback(null, endpointStream);
    } finally {
      self2.reader.unref();
    }
  });
};
function Entry() {
}
Entry.prototype.getLastModDate = function() {
  return dosDateTimeToDate(this.lastModFileDate, this.lastModFileTime);
};
Entry.prototype.isEncrypted = function() {
  return (this.generalPurposeBitFlag & 1) !== 0;
};
Entry.prototype.isCompressed = function() {
  return this.compressionMethod === 8;
};
function dosDateTimeToDate(date, time) {
  var day = date & 31;
  var month = (date >> 5 & 15) - 1;
  var year = (date >> 9 & 127) + 1980;
  var millisecond = 0;
  var second = (time & 31) * 2;
  var minute = time >> 5 & 63;
  var hour = time >> 11 & 31;
  return new Date(year, month, day, hour, minute, second, millisecond);
}
function validateFileName(fileName) {
  if (fileName.indexOf("\\") !== -1) {
    return "invalid characters in fileName: " + fileName;
  }
  if (/^[a-zA-Z]:/.test(fileName) || /^\//.test(fileName)) {
    return "absolute path: " + fileName;
  }
  if (fileName.split("/").indexOf("..") !== -1) {
    return "invalid relative path: " + fileName;
  }
  return null;
}
function readAndAssertNoEof(reader, buffer2, offset, length, position, callback) {
  if (length === 0) {
    return setImmediate(function() {
      callback(null, newBuffer(0));
    });
  }
  reader.read(buffer2, offset, length, position, function(err, bytesRead) {
    if (err)
      return callback(err);
    if (bytesRead < length) {
      return callback(new Error("unexpected EOF"));
    }
    callback();
  });
}
util$2.inherits(AssertByteCountStream, Transform$1);
function AssertByteCountStream(byteCount) {
  Transform$1.call(this);
  this.actualByteCount = 0;
  this.expectedByteCount = byteCount;
}
AssertByteCountStream.prototype._transform = function(chunk, encoding, cb) {
  this.actualByteCount += chunk.length;
  if (this.actualByteCount > this.expectedByteCount) {
    var msg = "too many bytes in the stream. expected " + this.expectedByteCount + ". got at least " + this.actualByteCount;
    return cb(new Error(msg));
  }
  cb(null, chunk);
};
AssertByteCountStream.prototype._flush = function(cb) {
  if (this.actualByteCount < this.expectedByteCount) {
    var msg = "not enough bytes in the stream. expected " + this.expectedByteCount + ". got only " + this.actualByteCount;
    return cb(new Error(msg));
  }
  cb();
};
util$2.inherits(RandomAccessReader, EventEmitter$3);
function RandomAccessReader() {
  EventEmitter$3.call(this);
  this.refCount = 0;
}
RandomAccessReader.prototype.ref = function() {
  this.refCount += 1;
};
RandomAccessReader.prototype.unref = function() {
  var self2 = this;
  self2.refCount -= 1;
  if (self2.refCount > 0)
    return;
  if (self2.refCount < 0)
    throw new Error("invalid unref");
  self2.close(onCloseDone);
  function onCloseDone(err) {
    if (err)
      return self2.emit("error", err);
    self2.emit("close");
  }
};
RandomAccessReader.prototype.createReadStream = function(options) {
  var start = options.start;
  var end2 = options.end;
  if (start === end2) {
    var emptyStream2 = new PassThrough$5();
    setImmediate(function() {
      emptyStream2.end();
    });
    return emptyStream2;
  }
  var stream2 = this._readStreamForRange(start, end2);
  var destroyed = false;
  var refUnrefFilter = new RefUnrefFilter(this);
  stream2.on("error", function(err) {
    setImmediate(function() {
      if (!destroyed)
        refUnrefFilter.emit("error", err);
    });
  });
  refUnrefFilter.destroy = function() {
    stream2.unpipe(refUnrefFilter);
    refUnrefFilter.unref();
    stream2.destroy();
  };
  var byteCounter = new AssertByteCountStream(end2 - start);
  refUnrefFilter.on("error", function(err) {
    setImmediate(function() {
      if (!destroyed)
        byteCounter.emit("error", err);
    });
  });
  byteCounter.destroy = function() {
    destroyed = true;
    refUnrefFilter.unpipe(byteCounter);
    refUnrefFilter.destroy();
  };
  return stream2.pipe(refUnrefFilter).pipe(byteCounter);
};
RandomAccessReader.prototype._readStreamForRange = function(start, end2) {
  throw new Error("not implemented");
};
RandomAccessReader.prototype.read = function(buffer2, offset, length, position, callback) {
  var readStream = this.createReadStream({ start: position, end: position + length });
  var writeStream = new Writable();
  var written = 0;
  writeStream._write = function(chunk, encoding, cb) {
    chunk.copy(buffer2, offset + written, 0, chunk.length);
    written += chunk.length;
    cb();
  };
  writeStream.on("finish", callback);
  readStream.on("error", function(error) {
    callback(error);
  });
  readStream.pipe(writeStream);
};
RandomAccessReader.prototype.close = function(callback) {
  setImmediate(callback);
};
util$2.inherits(RefUnrefFilter, PassThrough$5);
function RefUnrefFilter(context) {
  PassThrough$5.call(this);
  this.context = context;
  this.context.ref();
  this.unreffedYet = false;
}
RefUnrefFilter.prototype._flush = function(cb) {
  this.unref();
  cb();
};
RefUnrefFilter.prototype.unref = function(cb) {
  if (this.unreffedYet)
    return;
  this.unreffedYet = true;
  this.context.unref();
};
var cp437 = "\0\u263A\u263B\u2665\u2666\u2663\u2660\u2022\u25D8\u25CB\u25D9\u2642\u2640\u266A\u266B\u263C\u25BA\u25C4\u2195\u203C\xB6\xA7\u25AC\u21A8\u2191\u2193\u2192\u2190\u221F\u2194\u25B2\u25BC !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u2302\xC7\xFC\xE9\xE2\xE4\xE0\xE5\xE7\xEA\xEB\xE8\xEF\xEE\xEC\xC4\xC5\xC9\xE6\xC6\xF4\xF6\xF2\xFB\xF9\xFF\xD6\xDC\xA2\xA3\xA5\u20A7\u0192\xE1\xED\xF3\xFA\xF1\xD1\xAA\xBA\xBF\u2310\xAC\xBD\xBC\xA1\xAB\xBB\u2591\u2592\u2593\u2502\u2524\u2561\u2562\u2556\u2555\u2563\u2551\u2557\u255D\u255C\u255B\u2510\u2514\u2534\u252C\u251C\u2500\u253C\u255E\u255F\u255A\u2554\u2569\u2566\u2560\u2550\u256C\u2567\u2568\u2564\u2565\u2559\u2558\u2552\u2553\u256B\u256A\u2518\u250C\u2588\u2584\u258C\u2590\u2580\u03B1\xDF\u0393\u03C0\u03A3\u03C3\xB5\u03C4\u03A6\u0398\u03A9\u03B4\u221E\u03C6\u03B5\u2229\u2261\xB1\u2265\u2264\u2320\u2321\xF7\u2248\xB0\u2219\xB7\u221A\u207F\xB2\u25A0\xA0";
function decodeBuffer(buffer2, start, end2, isUtf8) {
  if (isUtf8) {
    return buffer2.toString("utf8", start, end2);
  } else {
    var result = "";
    for (var i = start; i < end2; i++) {
      result += cp437[buffer2[i]];
    }
    return result;
  }
}
function readUInt64LE(buffer2, offset) {
  var lower32 = buffer2.readUInt32LE(offset);
  var upper32 = buffer2.readUInt32LE(offset + 4);
  return upper32 * 4294967296 + lower32;
}
var newBuffer;
if (typeof Buffer.allocUnsafe === "function") {
  newBuffer = function(len) {
    return Buffer.allocUnsafe(len);
  };
} else {
  newBuffer = function(len) {
    return new Buffer(len);
  };
}
function defaultCallback(err) {
  if (err)
    throw err;
}
const fileType$2 = fileType$3;
const getStream$9 = getStream$b.exports;
const pify$a = pify$c.exports;
const yauzl = yauzl$1;
const getType = (entry, mode) => {
  const IFMT = 61440;
  const IFDIR = 16384;
  const IFLNK = 40960;
  const madeBy = entry.versionMadeBy >> 8;
  if ((mode & IFMT) === IFLNK) {
    return "symlink";
  }
  if ((mode & IFMT) === IFDIR || madeBy === 0 && entry.externalFileAttributes === 16) {
    return "directory";
  }
  return "file";
};
const extractEntry = (entry, zip) => {
  const file2 = {
    mode: entry.externalFileAttributes >> 16 & 65535,
    mtime: entry.getLastModDate(),
    path: entry.fileName
  };
  file2.type = getType(entry, file2.mode);
  if (file2.mode === 0 && file2.type === "directory") {
    file2.mode = 493;
  }
  if (file2.mode === 0) {
    file2.mode = 420;
  }
  return pify$a(zip.openReadStream.bind(zip))(entry).then(getStream$9.buffer).then((buf) => {
    file2.data = buf;
    if (file2.type === "symlink") {
      file2.linkname = buf.toString();
    }
    return file2;
  }).catch((err) => {
    zip.close();
    throw err;
  });
};
const extractFile$1 = (zip) => new Promise((resolve2, reject2) => {
  const files2 = [];
  zip.readEntry();
  zip.on("entry", (entry) => {
    extractEntry(entry, zip).catch(reject2).then((file2) => {
      files2.push(file2);
      zip.readEntry();
    });
  });
  zip.on("error", reject2);
  zip.on("end", () => resolve2(files2));
});
var decompressUnzip$1 = () => (buf) => {
  if (!Buffer.isBuffer(buf)) {
    return Promise.reject(new TypeError(`Expected a Buffer, got ${typeof buf}`));
  }
  if (!fileType$2(buf) || fileType$2(buf).ext !== "zip") {
    return Promise.resolve([]);
  }
  return pify$a(yauzl.fromBuffer)(buf, { lazyEntries: true }).then(extractFile$1);
};
var makeDir$4 = { exports: {} };
const processFn$3 = (fn, opts) => function() {
  const P = opts.promiseModule;
  const args = new Array(arguments.length);
  for (let i = 0; i < arguments.length; i++) {
    args[i] = arguments[i];
  }
  return new P((resolve2, reject2) => {
    if (opts.errorFirst) {
      args.push(function(err, result) {
        if (opts.multiArgs) {
          const results = new Array(arguments.length - 1);
          for (let i = 1; i < arguments.length; i++) {
            results[i - 1] = arguments[i];
          }
          if (err) {
            results.unshift(err);
            reject2(results);
          } else {
            resolve2(results);
          }
        } else if (err) {
          reject2(err);
        } else {
          resolve2(result);
        }
      });
    } else {
      args.push(function(result) {
        if (opts.multiArgs) {
          const results = new Array(arguments.length - 1);
          for (let i = 0; i < arguments.length; i++) {
            results[i] = arguments[i];
          }
          resolve2(results);
        } else {
          resolve2(result);
        }
      });
    }
    fn.apply(this, args);
  });
};
var pify$9 = (obj2, opts) => {
  opts = Object.assign({
    exclude: [/.+(Sync|Stream)$/],
    errorFirst: true,
    promiseModule: Promise
  }, opts);
  const filter = (key2) => {
    const match = (pattern) => typeof pattern === "string" ? key2 === pattern : pattern.test(key2);
    return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
  };
  let ret;
  if (typeof obj2 === "function") {
    ret = function() {
      if (opts.excludeMain) {
        return obj2.apply(this, arguments);
      }
      return processFn$3(obj2, opts).apply(this, arguments);
    };
  } else {
    ret = Object.create(Object.getPrototypeOf(obj2));
  }
  for (const key2 in obj2) {
    const x = obj2[key2];
    ret[key2] = typeof x === "function" && filter(key2) ? processFn$3(x, opts) : x;
  }
  return ret;
};
const fs$5 = fs__default.default;
const path$5 = require$$1__default$1.default;
const pify$8 = pify$9;
const defaults$2 = {
  mode: 511 & ~process.umask(),
  fs: fs$5
};
const checkPath$1 = (pth) => {
  if (process.platform === "win32") {
    const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path$5.parse(pth).root, ""));
    if (pathHasInvalidWinCharacters) {
      const err = new Error(`Path contains invalid characters: ${pth}`);
      err.code = "EINVAL";
      throw err;
    }
  }
};
makeDir$4.exports = (input, opts) => Promise.resolve().then(() => {
  checkPath$1(input);
  opts = Object.assign({}, defaults$2, opts);
  const mkdir2 = pify$8(opts.fs.mkdir);
  const stat2 = pify$8(opts.fs.stat);
  const make = (pth) => {
    return mkdir2(pth, opts.mode).then(() => pth).catch((err) => {
      if (err.code === "ENOENT") {
        if (err.message.includes("null bytes") || path$5.dirname(pth) === pth) {
          throw err;
        }
        return make(path$5.dirname(pth)).then(() => make(pth));
      }
      return stat2(pth).then((stats) => stats.isDirectory() ? pth : Promise.reject()).catch(() => {
        throw err;
      });
    });
  };
  return make(path$5.resolve(input));
});
makeDir$4.exports.sync = (input, opts) => {
  checkPath$1(input);
  opts = Object.assign({}, defaults$2, opts);
  const make = (pth) => {
    try {
      opts.fs.mkdirSync(pth, opts.mode);
    } catch (err) {
      if (err.code === "ENOENT") {
        if (err.message.includes("null bytes") || path$5.dirname(pth) === pth) {
          throw err;
        }
        make(path$5.dirname(pth));
        return make(pth);
      }
      try {
        if (!opts.fs.statSync(pth).isDirectory()) {
          throw new Error("The path is not a directory");
        }
      } catch (_) {
        throw err;
      }
    }
    return pth;
  };
  return make(path$5.resolve(input));
};
var pify$7 = { exports: {} };
var processFn$2 = function(fn, P, opts) {
  return function() {
    var that = this;
    var args = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    return new P(function(resolve2, reject2) {
      args.push(function(err, result) {
        if (err) {
          reject2(err);
        } else if (opts.multiArgs) {
          var results = new Array(arguments.length - 1);
          for (var i2 = 1; i2 < arguments.length; i2++) {
            results[i2 - 1] = arguments[i2];
          }
          resolve2(results);
        } else {
          resolve2(result);
        }
      });
      fn.apply(that, args);
    });
  };
};
var pify$6 = pify$7.exports = function(obj2, P, opts) {
  if (typeof P !== "function") {
    opts = P;
    P = Promise;
  }
  opts = opts || {};
  opts.exclude = opts.exclude || [/.+Sync$/];
  var filter = function(key2) {
    var match = function(pattern) {
      return typeof pattern === "string" ? key2 === pattern : pattern.test(key2);
    };
    return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
  };
  var ret = typeof obj2 === "function" ? function() {
    if (opts.excludeMain) {
      return obj2.apply(this, arguments);
    }
    return processFn$2(obj2, P, opts).apply(this, arguments);
  } : {};
  return Object.keys(obj2).reduce(function(ret2, key2) {
    var x = obj2[key2];
    ret2[key2] = typeof x === "function" && filter(key2) ? processFn$2(x, P, opts) : x;
    return ret2;
  }, ret);
};
pify$6.all = pify$6;
/*!
 * is-natural-number.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/is-natural-number.js
*/
function isNaturalNumber$1(val, option) {
  if (option) {
    if (typeof option !== "object") {
      throw new TypeError(
        String(option) + " is not an object. Expected an object that has boolean `includeZero` property."
      );
    }
    if ("includeZero" in option) {
      if (typeof option.includeZero !== "boolean") {
        throw new TypeError(
          String(option.includeZero) + " is neither true nor false. `includeZero` option must be a Boolean value."
        );
      }
      if (option.includeZero && val === 0) {
        return true;
      }
    }
  }
  return Number.isSafeInteger(val) && val >= 1;
}
const index_jsnext = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: isNaturalNumber$1
}, Symbol.toStringTag, { value: "Module" }));
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(index_jsnext);
/*!
 * strip-dirs | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/node-strip-dirs
*/
const path$4 = require$$1__default$1.default;
const util$1 = require$$1__default.default;
const isNaturalNumber = require$$2;
var stripDirs$1 = function stripDirs2(pathStr, count, option) {
  if (typeof pathStr !== "string") {
    throw new TypeError(
      util$1.inspect(pathStr) + " is not a string. First argument to strip-dirs must be a path string."
    );
  }
  if (path$4.posix.isAbsolute(pathStr) || path$4.win32.isAbsolute(pathStr)) {
    throw new Error(`${pathStr} is an absolute path. strip-dirs requires a relative path.`);
  }
  if (!isNaturalNumber(count, { includeZero: true })) {
    throw new Error(
      "The Second argument of strip-dirs must be a natural number or 0, but received " + util$1.inspect(count) + "."
    );
  }
  if (option) {
    if (typeof option !== "object") {
      throw new TypeError(
        util$1.inspect(option) + " is not an object. Expected an object with a boolean `disallowOverflow` property."
      );
    }
    if (Array.isArray(option)) {
      throw new TypeError(
        util$1.inspect(option) + " is an array. Expected an object with a boolean `disallowOverflow` property."
      );
    }
    if ("disallowOverflow" in option && typeof option.disallowOverflow !== "boolean") {
      throw new TypeError(
        util$1.inspect(option.disallowOverflow) + " is neither true nor false. `disallowOverflow` option must be a Boolean value."
      );
    }
  } else {
    option = { disallowOverflow: false };
  }
  const pathComponents = path$4.normalize(pathStr).split(path$4.sep);
  if (pathComponents.length > 1 && pathComponents[0] === ".") {
    pathComponents.shift();
  }
  if (count > pathComponents.length - 1) {
    if (option.disallowOverflow) {
      throw new RangeError("Cannot strip more directories than there are.");
    }
    count = pathComponents.length - 1;
  }
  return path$4.join.apply(null, pathComponents.slice(count));
};
const path$3 = require$$1__default$1.default;
const fs$4 = gracefulFs;
const decompressTar = decompressTar$3;
const decompressTarbz2 = decompressTarbz2$1;
const decompressTargz = decompressTargz$1;
const decompressUnzip = decompressUnzip$1;
const makeDir$3 = makeDir$4.exports;
const pify$5 = pify$7.exports;
const stripDirs = stripDirs$1;
const fsP$1 = pify$5(fs$4);
const runPlugins = (input, opts) => {
  if (opts.plugins.length === 0) {
    return Promise.resolve([]);
  }
  return Promise.all(opts.plugins.map((x) => x(input, opts))).then((files2) => files2.reduce((a, b) => a.concat(b)));
};
const safeMakeDir = (dir, realOutputPath) => {
  return fsP$1.realpath(dir).catch((_) => {
    const parent = path$3.dirname(dir);
    return safeMakeDir(parent, realOutputPath);
  }).then((realParentPath) => {
    if (realParentPath.indexOf(realOutputPath) !== 0) {
      throw new Error("Refusing to create a directory outside the output path.");
    }
    return makeDir$3(dir).then(fsP$1.realpath);
  });
};
const preventWritingThroughSymlink = (destination, realOutputPath) => {
  return fsP$1.readlink(destination).catch((_) => {
    return null;
  }).then((symlinkPointsTo) => {
    if (symlinkPointsTo) {
      throw new Error("Refusing to write into a symlink");
    }
    return realOutputPath;
  });
};
const extractFile = (input, output2, opts) => runPlugins(input, opts).then((files2) => {
  if (opts.strip > 0) {
    files2 = files2.map((x) => {
      x.path = stripDirs(x.path, opts.strip);
      return x;
    }).filter((x) => x.path !== ".");
  }
  if (typeof opts.filter === "function") {
    files2 = files2.filter(opts.filter);
  }
  if (typeof opts.map === "function") {
    files2 = files2.map(opts.map);
  }
  if (!output2) {
    return files2;
  }
  return Promise.all(files2.map((x) => {
    const dest = path$3.join(output2, x.path);
    const mode = x.mode & ~process.umask();
    const now = new Date();
    if (x.type === "directory") {
      return makeDir$3(output2).then((outputPath) => fsP$1.realpath(outputPath)).then((realOutputPath) => safeMakeDir(dest, realOutputPath)).then(() => fsP$1.utimes(dest, now, x.mtime)).then(() => x);
    }
    return makeDir$3(output2).then((outputPath) => fsP$1.realpath(outputPath)).then((realOutputPath) => {
      return safeMakeDir(path$3.dirname(dest), realOutputPath).then(() => realOutputPath);
    }).then((realOutputPath) => {
      if (x.type === "file") {
        return preventWritingThroughSymlink(dest, realOutputPath);
      }
      return realOutputPath;
    }).then((realOutputPath) => {
      return fsP$1.realpath(path$3.dirname(dest)).then((realDestinationDir) => {
        if (realDestinationDir.indexOf(realOutputPath) !== 0) {
          throw new Error("Refusing to write outside output directory: " + realDestinationDir);
        }
      });
    }).then(() => {
      if (x.type === "link") {
        return fsP$1.link(x.linkname, dest);
      }
      if (x.type === "symlink" && process.platform === "win32") {
        return fsP$1.link(x.linkname, dest);
      }
      if (x.type === "symlink") {
        return fsP$1.symlink(x.linkname, dest);
      }
      return fsP$1.writeFile(dest, x.data, { mode });
    }).then(() => x.type === "file" && fsP$1.utimes(dest, now, x.mtime)).then(() => x);
  }));
});
var decompress$1 = (input, output2, opts) => {
  if (typeof input !== "string" && !Buffer.isBuffer(input)) {
    return Promise.reject(new TypeError("Input file required"));
  }
  if (typeof output2 === "object") {
    opts = output2;
    output2 = null;
  }
  opts = Object.assign({ plugins: [
    decompressTar(),
    decompressTarbz2(),
    decompressTargz(),
    decompressUnzip()
  ] }, opts);
  const read2 = typeof input === "string" ? fsP$1.readFile(input) : Promise.resolve(input);
  return read2.then((buf) => extractFile(buf, output2, opts));
};
var filenamify$2 = { exports: {} };
var matchOperatorsRe$1 = /[|\\{}()[\]^$+*?.]/g;
var escapeStringRegexp$3 = function(str) {
  if (typeof str !== "string") {
    throw new TypeError("Expected a string");
  }
  return str.replace(matchOperatorsRe$1, "\\$&");
};
var escapeStringRegexp$2 = escapeStringRegexp$3;
var trimRepeated$1 = function(str, target) {
  if (typeof str !== "string" || typeof target !== "string") {
    throw new TypeError("Expected a string");
  }
  return str.replace(new RegExp("(?:" + escapeStringRegexp$2(target) + "){2,}", "g"), target);
};
var filenameReservedRegex$1 = { exports: {} };
filenameReservedRegex$1.exports = () => /[<>:"\/\\|?*\x00-\x1F]/g;
filenameReservedRegex$1.exports.windowsNames = () => /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i;
var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
var escapeStringRegexp$1 = function(str) {
  if (typeof str !== "string") {
    throw new TypeError("Expected a string");
  }
  return str.replace(matchOperatorsRe, "\\$&");
};
var escapeStringRegexp = escapeStringRegexp$1;
var stripOuter$1 = function(str, sub) {
  if (typeof str !== "string" || typeof sub !== "string") {
    throw new TypeError();
  }
  sub = escapeStringRegexp(sub);
  return str.replace(new RegExp("^" + sub + "|" + sub + "$", "g"), "");
};
const path$2 = require$$1__default$1.default;
const trimRepeated = trimRepeated$1;
const filenameReservedRegex = filenameReservedRegex$1.exports;
const stripOuter = stripOuter$1;
const MAX_FILENAME_LENGTH = 100;
const reControlChars = /[\u0000-\u001f\u0080-\u009f]/g;
const reRelativePath = /^\.+/;
const filenamify$1 = (string, options = {}) => {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  const replacement = options.replacement === void 0 ? "!" : options.replacement;
  if (filenameReservedRegex().test(replacement) && reControlChars.test(replacement)) {
    throw new Error("Replacement string cannot contain reserved filename characters");
  }
  string = string.replace(filenameReservedRegex(), replacement);
  string = string.replace(reControlChars, replacement);
  string = string.replace(reRelativePath, replacement);
  if (replacement.length > 0) {
    string = trimRepeated(string, replacement);
    string = string.length > 1 ? stripOuter(string, replacement) : string;
  }
  string = filenameReservedRegex.windowsNames().test(string) ? string + replacement : string;
  string = string.slice(0, MAX_FILENAME_LENGTH);
  return string;
};
filenamify$1.path = (filePath, options) => {
  filePath = path$2.resolve(filePath);
  return path$2.join(path$2.dirname(filePath), filenamify$1(path$2.basename(filePath), options));
};
filenamify$2.exports = filenamify$1;
filenamify$2.exports.default = filenamify$1;
var getStream$8 = { exports: {} };
var once = once$3.exports;
var eos = endOfStream;
var fs$3 = fs__default.default;
var noop$1 = function() {
};
var ancient = /^v?\.0/.test(process.version);
var isFn = function(fn) {
  return typeof fn === "function";
};
var isFS = function(stream2) {
  if (!ancient)
    return false;
  if (!fs$3)
    return false;
  return (stream2 instanceof (fs$3.ReadStream || noop$1) || stream2 instanceof (fs$3.WriteStream || noop$1)) && isFn(stream2.close);
};
var isRequest = function(stream2) {
  return stream2.setHeader && isFn(stream2.abort);
};
var destroyer = function(stream2, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream2.on("close", function() {
    closed = true;
  });
  eos(stream2, { readable: reading, writable: writing }, function(err) {
    if (err)
      return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function(err) {
    if (closed)
      return;
    if (destroyed)
      return;
    destroyed = true;
    if (isFS(stream2))
      return stream2.close(noop$1);
    if (isRequest(stream2))
      return stream2.abort();
    if (isFn(stream2.destroy))
      return stream2.destroy();
    callback(err || new Error("stream was destroyed"));
  };
};
var call = function(fn) {
  fn();
};
var pipe = function(from3, to) {
  return from3.pipe(to);
};
var pump$1 = function() {
  var streams = Array.prototype.slice.call(arguments);
  var callback = isFn(streams[streams.length - 1] || noop$1) && streams.pop() || noop$1;
  if (Array.isArray(streams[0]))
    streams = streams[0];
  if (streams.length < 2)
    throw new Error("pump requires two streams per minimum");
  var error;
  var destroys = streams.map(function(stream2, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream2, reading, writing, function(err) {
      if (!error)
        error = err;
      if (err)
        destroys.forEach(call);
      if (reading)
        return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
};
var pump_1 = pump$1;
const { PassThrough: PassThrough$4 } = require$$0__default$1.default;
var bufferStream$5 = (options) => {
  options = Object.assign({}, options);
  const { array } = options;
  let { encoding } = options;
  const buffer2 = encoding === "buffer";
  let objectMode = false;
  if (array) {
    objectMode = !(encoding || buffer2);
  } else {
    encoding = encoding || "utf8";
  }
  if (buffer2) {
    encoding = null;
  }
  let len = 0;
  const ret = [];
  const stream2 = new PassThrough$4({ objectMode });
  if (encoding) {
    stream2.setEncoding(encoding);
  }
  stream2.on("data", (chunk) => {
    ret.push(chunk);
    if (objectMode) {
      len = ret.length;
    } else {
      len += chunk.length;
    }
  });
  stream2.getBufferedValue = () => {
    if (array) {
      return ret;
    }
    return buffer2 ? Buffer.concat(ret, len) : ret.join("");
  };
  stream2.getBufferedLength = () => len;
  return stream2;
};
const pump = pump_1;
const bufferStream$4 = bufferStream$5;
class MaxBufferError extends Error {
  constructor() {
    super("maxBuffer exceeded");
    this.name = "MaxBufferError";
  }
}
function getStream$7(inputStream, options) {
  if (!inputStream) {
    return Promise.reject(new Error("Expected a stream"));
  }
  options = Object.assign({ maxBuffer: Infinity }, options);
  const { maxBuffer } = options;
  let stream2;
  return new Promise((resolve2, reject2) => {
    const rejectPromise = (error) => {
      if (error) {
        error.bufferedData = stream2.getBufferedValue();
      }
      reject2(error);
    };
    stream2 = pump(inputStream, bufferStream$4(options), (error) => {
      if (error) {
        rejectPromise(error);
        return;
      }
      resolve2();
    });
    stream2.on("data", () => {
      if (stream2.getBufferedLength() > maxBuffer) {
        rejectPromise(new MaxBufferError());
      }
    });
  }).then(() => stream2.getBufferedValue());
}
getStream$8.exports = getStream$7;
getStream$8.exports.buffer = (stream2, options) => getStream$7(stream2, Object.assign({}, options, { encoding: "buffer" }));
getStream$8.exports.array = (stream2, options) => getStream$7(stream2, Object.assign({}, options, { array: true }));
getStream$8.exports.MaxBufferError = MaxBufferError;
var queryString$1 = {};
var strictUriEncode$1 = function(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
};
var token = "%[a-f0-9]{2}";
var singleMatcher = new RegExp(token, "gi");
var multiMatcher = new RegExp("(" + token + ")+", "gi");
function decodeComponents(components, split) {
  try {
    return decodeURIComponent(components.join(""));
  } catch (err) {
  }
  if (components.length === 1) {
    return components;
  }
  split = split || 1;
  var left = components.slice(0, split);
  var right = components.slice(split);
  return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}
function decode(input) {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    var tokens = input.match(singleMatcher);
    for (var i = 1; i < tokens.length; i++) {
      input = decodeComponents(tokens, i).join("");
      tokens = input.match(singleMatcher);
    }
    return input;
  }
}
function customDecodeURIComponent(input) {
  var replaceMap = {
    "%FE%FF": "\uFFFD\uFFFD",
    "%FF%FE": "\uFFFD\uFFFD"
  };
  var match = multiMatcher.exec(input);
  while (match) {
    try {
      replaceMap[match[0]] = decodeURIComponent(match[0]);
    } catch (err) {
      var result = decode(match[0]);
      if (result !== match[0]) {
        replaceMap[match[0]] = result;
      }
    }
    match = multiMatcher.exec(input);
  }
  replaceMap["%C2"] = "\uFFFD";
  var entries = Object.keys(replaceMap);
  for (var i = 0; i < entries.length; i++) {
    var key2 = entries[i];
    input = input.replace(new RegExp(key2, "g"), replaceMap[key2]);
  }
  return input;
}
var decodeUriComponent = function(encodedURI) {
  if (typeof encodedURI !== "string") {
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof encodedURI + "`");
  }
  try {
    encodedURI = encodedURI.replace(/\+/g, " ");
    return decodeURIComponent(encodedURI);
  } catch (err) {
    return customDecodeURIComponent(encodedURI);
  }
};
var strictUriEncode = strictUriEncode$1;
var objectAssign = objectAssign$3;
var decodeComponent = decodeUriComponent;
function encoderForArrayFormat(opts) {
  switch (opts.arrayFormat) {
    case "index":
      return function(key2, value, index) {
        return value === null ? [
          encode(key2, opts),
          "[",
          index,
          "]"
        ].join("") : [
          encode(key2, opts),
          "[",
          encode(index, opts),
          "]=",
          encode(value, opts)
        ].join("");
      };
    case "bracket":
      return function(key2, value) {
        return value === null ? encode(key2, opts) : [
          encode(key2, opts),
          "[]=",
          encode(value, opts)
        ].join("");
      };
    default:
      return function(key2, value) {
        return value === null ? encode(key2, opts) : [
          encode(key2, opts),
          "=",
          encode(value, opts)
        ].join("");
      };
  }
}
function parserForArrayFormat(opts) {
  var result;
  switch (opts.arrayFormat) {
    case "index":
      return function(key2, value, accumulator) {
        result = /\[(\d*)\]$/.exec(key2);
        key2 = key2.replace(/\[\d*\]$/, "");
        if (!result) {
          accumulator[key2] = value;
          return;
        }
        if (accumulator[key2] === void 0) {
          accumulator[key2] = {};
        }
        accumulator[key2][result[1]] = value;
      };
    case "bracket":
      return function(key2, value, accumulator) {
        result = /(\[\])$/.exec(key2);
        key2 = key2.replace(/\[\]$/, "");
        if (!result) {
          accumulator[key2] = value;
          return;
        } else if (accumulator[key2] === void 0) {
          accumulator[key2] = [value];
          return;
        }
        accumulator[key2] = [].concat(accumulator[key2], value);
      };
    default:
      return function(key2, value, accumulator) {
        if (accumulator[key2] === void 0) {
          accumulator[key2] = value;
          return;
        }
        accumulator[key2] = [].concat(accumulator[key2], value);
      };
  }
}
function encode(value, opts) {
  if (opts.encode) {
    return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
  }
  return value;
}
function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort();
  } else if (typeof input === "object") {
    return keysSorter(Object.keys(input)).sort(function(a, b) {
      return Number(a) - Number(b);
    }).map(function(key2) {
      return input[key2];
    });
  }
  return input;
}
function extract(str) {
  var queryStart = str.indexOf("?");
  if (queryStart === -1) {
    return "";
  }
  return str.slice(queryStart + 1);
}
function parse(str, opts) {
  opts = objectAssign({ arrayFormat: "none" }, opts);
  var formatter = parserForArrayFormat(opts);
  var ret = /* @__PURE__ */ Object.create(null);
  if (typeof str !== "string") {
    return ret;
  }
  str = str.trim().replace(/^[?#&]/, "");
  if (!str) {
    return ret;
  }
  str.split("&").forEach(function(param) {
    var parts = param.replace(/\+/g, " ").split("=");
    var key2 = parts.shift();
    var val = parts.length > 0 ? parts.join("=") : void 0;
    val = val === void 0 ? null : decodeComponent(val);
    formatter(decodeComponent(key2), val, ret);
  });
  return Object.keys(ret).sort().reduce(function(result, key2) {
    var val = ret[key2];
    if (Boolean(val) && typeof val === "object" && !Array.isArray(val)) {
      result[key2] = keysSorter(val);
    } else {
      result[key2] = val;
    }
    return result;
  }, /* @__PURE__ */ Object.create(null));
}
queryString$1.extract = extract;
queryString$1.parse = parse;
queryString$1.stringify = function(obj2, opts) {
  var defaults2 = {
    encode: true,
    strict: true,
    arrayFormat: "none"
  };
  opts = objectAssign(defaults2, opts);
  if (opts.sort === false) {
    opts.sort = function() {
    };
  }
  var formatter = encoderForArrayFormat(opts);
  return obj2 ? Object.keys(obj2).sort(opts.sort).map(function(key2) {
    var val = obj2[key2];
    if (val === void 0) {
      return "";
    }
    if (val === null) {
      return encode(key2, opts);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.slice().forEach(function(val2) {
        if (val2 === void 0) {
          return;
        }
        result.push(formatter(key2, val2, result.length));
      });
      return result.join("&");
    }
    return encode(key2, opts) + "=" + encode(val, opts);
  }).filter(function(x) {
    return x.length > 0;
  }).join("&") : "";
};
queryString$1.parseUrl = function(str, opts) {
  return {
    url: str.split("?")[0] || "",
    query: parse(extract(str), opts)
  };
};
var prependHttp$2 = (url2, opts) => {
  if (typeof url2 !== "string") {
    throw new TypeError(`Expected \`url\` to be of type \`string\`, got \`${typeof url2}\``);
  }
  url2 = url2.trim();
  opts = Object.assign({ https: false }, opts);
  if (/^\.*\/|^(?!localhost)\w+:/.test(url2)) {
    return url2;
  }
  return url2.replace(/^(?!(?:\w+:)?\/\/)/, opts.https ? "https://" : "http://");
};
var toString$1 = Object.prototype.toString;
var isPlainObj$2 = function(x) {
  var prototype;
  return toString$1.call(x) === "[object Object]" && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};
const isPlainObj$1 = isPlainObj$2;
var sortKeys$3 = (obj2, opts) => {
  if (!isPlainObj$1(obj2)) {
    throw new TypeError("Expected a plain object");
  }
  opts = opts || {};
  if (typeof opts === "function") {
    throw new TypeError("Specify the compare function as an option instead");
  }
  const deep = opts.deep;
  const seenInput = [];
  const seenOutput = [];
  const sortKeys2 = (x) => {
    const seenIndex = seenInput.indexOf(x);
    if (seenIndex !== -1) {
      return seenOutput[seenIndex];
    }
    const ret = {};
    const keys = Object.keys(x).sort(opts.compare);
    seenInput.push(x);
    seenOutput.push(ret);
    for (let i = 0; i < keys.length; i++) {
      const key2 = keys[i];
      const val = x[key2];
      if (deep && Array.isArray(val)) {
        const retArr = [];
        for (let j = 0; j < val.length; j++) {
          retArr[j] = isPlainObj$1(val[j]) ? sortKeys2(val[j]) : val[j];
        }
        ret[key2] = retArr;
        continue;
      }
      ret[key2] = deep && isPlainObj$1(val) ? sortKeys2(val) : val;
    }
    return ret;
  };
  return sortKeys2(obj2);
};
const url$1 = require$$0__default$5.default;
const punycode = require$$1__default$2.default;
const queryString = queryString$1;
const prependHttp$1 = prependHttp$2;
const sortKeys$2 = sortKeys$3;
const DEFAULT_PORTS = {
  "http:": 80,
  "https:": 443,
  "ftp:": 21
};
const slashedProtocol = {
  http: true,
  https: true,
  ftp: true,
  gopher: true,
  file: true,
  "http:": true,
  "https:": true,
  "ftp:": true,
  "gopher:": true,
  "file:": true
};
function testParameter(name2, filters) {
  return filters.some((filter) => filter instanceof RegExp ? filter.test(name2) : filter === name2);
}
var normalizeUrl$1 = (str, opts) => {
  opts = Object.assign({
    normalizeProtocol: true,
    normalizeHttps: false,
    stripFragment: true,
    stripWWW: true,
    removeQueryParameters: [/^utm_\w+/i],
    removeTrailingSlash: true,
    removeDirectoryIndex: false,
    sortQueryParameters: true
  }, opts);
  if (typeof str !== "string") {
    throw new TypeError("Expected a string");
  }
  const hasRelativeProtocol = str.startsWith("//");
  str = prependHttp$1(str.trim()).replace(/^\/\//, "http://");
  const urlObj = url$1.parse(str);
  if (opts.normalizeHttps && urlObj.protocol === "https:") {
    urlObj.protocol = "http:";
  }
  if (!urlObj.hostname && !urlObj.pathname) {
    throw new Error("Invalid URL");
  }
  delete urlObj.host;
  delete urlObj.query;
  if (opts.stripFragment) {
    delete urlObj.hash;
  }
  const port2 = DEFAULT_PORTS[urlObj.protocol];
  if (Number(urlObj.port) === port2) {
    delete urlObj.port;
  }
  if (urlObj.pathname) {
    urlObj.pathname = urlObj.pathname.replace(/\/{2,}/g, "/");
  }
  if (urlObj.pathname) {
    urlObj.pathname = decodeURI(urlObj.pathname);
  }
  if (opts.removeDirectoryIndex === true) {
    opts.removeDirectoryIndex = [/^index\.[a-z]+$/];
  }
  if (Array.isArray(opts.removeDirectoryIndex) && opts.removeDirectoryIndex.length > 0) {
    let pathComponents = urlObj.pathname.split("/");
    const lastComponent = pathComponents[pathComponents.length - 1];
    if (testParameter(lastComponent, opts.removeDirectoryIndex)) {
      pathComponents = pathComponents.slice(0, pathComponents.length - 1);
      urlObj.pathname = pathComponents.slice(1).join("/") + "/";
    }
  }
  if (slashedProtocol[urlObj.protocol]) {
    const domain = urlObj.protocol + "//" + urlObj.hostname;
    const relative = url$1.resolve(domain, urlObj.pathname);
    urlObj.pathname = relative.replace(domain, "");
  }
  if (urlObj.hostname) {
    urlObj.hostname = punycode.toUnicode(urlObj.hostname).toLowerCase();
    urlObj.hostname = urlObj.hostname.replace(/\.$/, "");
    if (opts.stripWWW) {
      urlObj.hostname = urlObj.hostname.replace(/^www\./, "");
    }
  }
  if (urlObj.search === "?") {
    delete urlObj.search;
  }
  const queryParameters = queryString.parse(urlObj.search);
  if (Array.isArray(opts.removeQueryParameters)) {
    for (const key2 in queryParameters) {
      if (testParameter(key2, opts.removeQueryParameters)) {
        delete queryParameters[key2];
      }
    }
  }
  if (opts.sortQueryParameters) {
    urlObj.search = queryString.stringify(sortKeys$2(queryParameters));
  }
  if (urlObj.search !== null) {
    urlObj.search = decodeURIComponent(urlObj.search);
  }
  str = url$1.format(urlObj);
  if (opts.removeTrailingSlash || urlObj.pathname === "/") {
    str = str.replace(/\/$/, "");
  }
  if (hasRelativeProtocol && !opts.normalizeProtocol) {
    str = str.replace(/^http:\/\//, "//");
  }
  return str;
};
var getStream$6 = { exports: {} };
const PassThrough$3 = require$$0__default$1.default.PassThrough;
var bufferStream$3 = (opts) => {
  opts = Object.assign({}, opts);
  const array = opts.array;
  let encoding = opts.encoding;
  const buffer2 = encoding === "buffer";
  let objectMode = false;
  if (array) {
    objectMode = !(encoding || buffer2);
  } else {
    encoding = encoding || "utf8";
  }
  if (buffer2) {
    encoding = null;
  }
  let len = 0;
  const ret = [];
  const stream2 = new PassThrough$3({ objectMode });
  if (encoding) {
    stream2.setEncoding(encoding);
  }
  stream2.on("data", (chunk) => {
    ret.push(chunk);
    if (objectMode) {
      len = ret.length;
    } else {
      len += chunk.length;
    }
  });
  stream2.getBufferedValue = () => {
    if (array) {
      return ret;
    }
    return buffer2 ? Buffer.concat(ret, len) : ret.join("");
  };
  stream2.getBufferedLength = () => len;
  return stream2;
};
const bufferStream$2 = bufferStream$3;
function getStream$5(inputStream, opts) {
  if (!inputStream) {
    return Promise.reject(new Error("Expected a stream"));
  }
  opts = Object.assign({ maxBuffer: Infinity }, opts);
  const maxBuffer = opts.maxBuffer;
  let stream2;
  let clean;
  const p = new Promise((resolve2, reject2) => {
    const error = (err) => {
      if (err) {
        err.bufferedData = stream2.getBufferedValue();
      }
      reject2(err);
    };
    stream2 = bufferStream$2(opts);
    inputStream.once("error", error);
    inputStream.pipe(stream2);
    stream2.on("data", () => {
      if (stream2.getBufferedLength() > maxBuffer) {
        reject2(new Error("maxBuffer exceeded"));
      }
    });
    stream2.once("error", error);
    stream2.on("end", resolve2);
    clean = () => {
      if (inputStream.unpipe) {
        inputStream.unpipe(stream2);
      }
    };
  });
  p.then(clean, clean);
  return p.then(() => stream2.getBufferedValue());
}
getStream$6.exports = getStream$5;
getStream$6.exports.buffer = (stream2, opts) => getStream$5(stream2, Object.assign({}, opts, { encoding: "buffer" }));
getStream$6.exports.array = (stream2, opts) => getStream$5(stream2, Object.assign({}, opts, { array: true }));
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var statusCodeCacheableByDefault = [200, 203, 204, 206, 300, 301, 404, 405, 410, 414, 501];
var understoodStatuses = [200, 203, 204, 300, 301, 302, 303, 307, 308, 404, 405, 410, 414, 501];
var hopByHopHeaders = { "connection": true, "keep-alive": true, "proxy-authenticate": true, "proxy-authorization": true, "te": true, "trailer": true, "transfer-encoding": true, "upgrade": true };
var excludedFromRevalidationUpdate = {
  "content-length": true,
  "content-encoding": true,
  "transfer-encoding": true,
  "content-range": true
};
function parseCacheControl(header) {
  var cc = {};
  if (!header)
    return cc;
  var parts = header.trim().split(/\s*,\s*/);
  for (var _iterator = parts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
    var _ref;
    if (_isArray) {
      if (_i >= _iterator.length)
        break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done)
        break;
      _ref = _i.value;
    }
    var part = _ref;
    var _part$split = part.split(/\s*=\s*/, 2), k = _part$split[0], v = _part$split[1];
    cc[k] = v === void 0 ? true : v.replace(/^"|"$/g, "");
  }
  return cc;
}
function formatCacheControl(cc) {
  var parts = [];
  for (var k in cc) {
    var v = cc[k];
    parts.push(v === true ? k : k + "=" + v);
  }
  if (!parts.length) {
    return void 0;
  }
  return parts.join(", ");
}
var node4 = function() {
  function CachePolicy2(req, res) {
    var _ref2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, shared = _ref2.shared, cacheHeuristic = _ref2.cacheHeuristic, immutableMinTimeToLive = _ref2.immutableMinTimeToLive, ignoreCargoCult = _ref2.ignoreCargoCult, _fromObject = _ref2._fromObject;
    _classCallCheck(this, CachePolicy2);
    if (_fromObject) {
      this._fromObject(_fromObject);
      return;
    }
    if (!res || !res.headers) {
      throw Error("Response headers missing");
    }
    this._assertRequestHasHeaders(req);
    this._responseTime = this.now();
    this._isShared = shared !== false;
    this._cacheHeuristic = void 0 !== cacheHeuristic ? cacheHeuristic : 0.1;
    this._immutableMinTtl = void 0 !== immutableMinTimeToLive ? immutableMinTimeToLive : 24 * 3600 * 1e3;
    this._status = "status" in res ? res.status : 200;
    this._resHeaders = res.headers;
    this._rescc = parseCacheControl(res.headers["cache-control"]);
    this._method = "method" in req ? req.method : "GET";
    this._url = req.url;
    this._host = req.headers.host;
    this._noAuthorization = !req.headers.authorization;
    this._reqHeaders = res.headers.vary ? req.headers : null;
    this._reqcc = parseCacheControl(req.headers["cache-control"]);
    if (ignoreCargoCult && "pre-check" in this._rescc && "post-check" in this._rescc) {
      delete this._rescc["pre-check"];
      delete this._rescc["post-check"];
      delete this._rescc["no-cache"];
      delete this._rescc["no-store"];
      delete this._rescc["must-revalidate"];
      this._resHeaders = Object.assign({}, this._resHeaders, { "cache-control": formatCacheControl(this._rescc) });
      delete this._resHeaders.expires;
      delete this._resHeaders.pragma;
    }
    if (!res.headers["cache-control"] && /no-cache/.test(res.headers.pragma)) {
      this._rescc["no-cache"] = true;
    }
  }
  CachePolicy2.prototype.now = function now() {
    return Date.now();
  };
  CachePolicy2.prototype.storable = function storable() {
    return !!(!this._reqcc["no-store"] && ("GET" === this._method || "HEAD" === this._method || "POST" === this._method && this._hasExplicitExpiration()) && understoodStatuses.indexOf(this._status) !== -1 && !this._rescc["no-store"] && (!this._isShared || !this._rescc.private) && (!this._isShared || this._noAuthorization || this._allowsStoringAuthenticated()) && (this._resHeaders.expires || this._rescc.public || this._rescc["max-age"] || this._rescc["s-maxage"] || statusCodeCacheableByDefault.indexOf(this._status) !== -1));
  };
  CachePolicy2.prototype._hasExplicitExpiration = function _hasExplicitExpiration() {
    return this._isShared && this._rescc["s-maxage"] || this._rescc["max-age"] || this._resHeaders.expires;
  };
  CachePolicy2.prototype._assertRequestHasHeaders = function _assertRequestHasHeaders(req) {
    if (!req || !req.headers) {
      throw Error("Request headers missing");
    }
  };
  CachePolicy2.prototype.satisfiesWithoutRevalidation = function satisfiesWithoutRevalidation(req) {
    this._assertRequestHasHeaders(req);
    var requestCC = parseCacheControl(req.headers["cache-control"]);
    if (requestCC["no-cache"] || /no-cache/.test(req.headers.pragma)) {
      return false;
    }
    if (requestCC["max-age"] && this.age() > requestCC["max-age"]) {
      return false;
    }
    if (requestCC["min-fresh"] && this.timeToLive() < 1e3 * requestCC["min-fresh"]) {
      return false;
    }
    if (this.stale()) {
      var allowsStale = requestCC["max-stale"] && !this._rescc["must-revalidate"] && (true === requestCC["max-stale"] || requestCC["max-stale"] > this.age() - this.maxAge());
      if (!allowsStale) {
        return false;
      }
    }
    return this._requestMatches(req, false);
  };
  CachePolicy2.prototype._requestMatches = function _requestMatches(req, allowHeadMethod) {
    return (!this._url || this._url === req.url) && this._host === req.headers.host && (!req.method || this._method === req.method || allowHeadMethod && "HEAD" === req.method) && this._varyMatches(req);
  };
  CachePolicy2.prototype._allowsStoringAuthenticated = function _allowsStoringAuthenticated() {
    return this._rescc["must-revalidate"] || this._rescc.public || this._rescc["s-maxage"];
  };
  CachePolicy2.prototype._varyMatches = function _varyMatches(req) {
    if (!this._resHeaders.vary) {
      return true;
    }
    if (this._resHeaders.vary === "*") {
      return false;
    }
    var fields = this._resHeaders.vary.trim().toLowerCase().split(/\s*,\s*/);
    for (var _iterator2 = fields, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
      var _ref3;
      if (_isArray2) {
        if (_i2 >= _iterator2.length)
          break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done)
          break;
        _ref3 = _i2.value;
      }
      var name2 = _ref3;
      if (req.headers[name2] !== this._reqHeaders[name2])
        return false;
    }
    return true;
  };
  CachePolicy2.prototype._copyWithoutHopByHopHeaders = function _copyWithoutHopByHopHeaders(inHeaders) {
    var headers2 = {};
    for (var name2 in inHeaders) {
      if (hopByHopHeaders[name2])
        continue;
      headers2[name2] = inHeaders[name2];
    }
    if (inHeaders.connection) {
      var tokens = inHeaders.connection.trim().split(/\s*,\s*/);
      for (var _iterator3 = tokens, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ; ) {
        var _ref4;
        if (_isArray3) {
          if (_i3 >= _iterator3.length)
            break;
          _ref4 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done)
            break;
          _ref4 = _i3.value;
        }
        var _name = _ref4;
        delete headers2[_name];
      }
    }
    if (headers2.warning) {
      var warnings = headers2.warning.split(/,/).filter(function(warning) {
        return !/^\s*1[0-9][0-9]/.test(warning);
      });
      if (!warnings.length) {
        delete headers2.warning;
      } else {
        headers2.warning = warnings.join(",").trim();
      }
    }
    return headers2;
  };
  CachePolicy2.prototype.responseHeaders = function responseHeaders() {
    var headers2 = this._copyWithoutHopByHopHeaders(this._resHeaders);
    var age = this.age();
    if (age > 3600 * 24 && !this._hasExplicitExpiration() && this.maxAge() > 3600 * 24) {
      headers2.warning = (headers2.warning ? `${headers2.warning}, ` : "") + '113 - "rfc7234 5.5.4"';
    }
    headers2.age = `${Math.round(age)}`;
    return headers2;
  };
  CachePolicy2.prototype.date = function date() {
    var dateValue = Date.parse(this._resHeaders.date);
    var maxClockDrift = 8 * 3600 * 1e3;
    if (Number.isNaN(dateValue) || dateValue < this._responseTime - maxClockDrift || dateValue > this._responseTime + maxClockDrift) {
      return this._responseTime;
    }
    return dateValue;
  };
  CachePolicy2.prototype.age = function age() {
    var age2 = Math.max(0, (this._responseTime - this.date()) / 1e3);
    if (this._resHeaders.age) {
      var ageValue = this._ageValue();
      if (ageValue > age2)
        age2 = ageValue;
    }
    var residentTime = (this.now() - this._responseTime) / 1e3;
    return age2 + residentTime;
  };
  CachePolicy2.prototype._ageValue = function _ageValue() {
    var ageValue = parseInt(this._resHeaders.age);
    return isFinite(ageValue) ? ageValue : 0;
  };
  CachePolicy2.prototype.maxAge = function maxAge() {
    if (!this.storable() || this._rescc["no-cache"]) {
      return 0;
    }
    if (this._isShared && this._resHeaders["set-cookie"] && !this._rescc.public && !this._rescc.immutable) {
      return 0;
    }
    if (this._resHeaders.vary === "*") {
      return 0;
    }
    if (this._isShared) {
      if (this._rescc["proxy-revalidate"]) {
        return 0;
      }
      if (this._rescc["s-maxage"]) {
        return parseInt(this._rescc["s-maxage"], 10);
      }
    }
    if (this._rescc["max-age"]) {
      return parseInt(this._rescc["max-age"], 10);
    }
    var defaultMinTtl = this._rescc.immutable ? this._immutableMinTtl : 0;
    var dateValue = this.date();
    if (this._resHeaders.expires) {
      var expires = Date.parse(this._resHeaders.expires);
      if (Number.isNaN(expires) || expires < dateValue) {
        return 0;
      }
      return Math.max(defaultMinTtl, (expires - dateValue) / 1e3);
    }
    if (this._resHeaders["last-modified"]) {
      var lastModified = Date.parse(this._resHeaders["last-modified"]);
      if (isFinite(lastModified) && dateValue > lastModified) {
        return Math.max(defaultMinTtl, (dateValue - lastModified) / 1e3 * this._cacheHeuristic);
      }
    }
    return defaultMinTtl;
  };
  CachePolicy2.prototype.timeToLive = function timeToLive() {
    return Math.max(0, this.maxAge() - this.age()) * 1e3;
  };
  CachePolicy2.prototype.stale = function stale() {
    return this.maxAge() <= this.age();
  };
  CachePolicy2.fromObject = function fromObject(obj2) {
    return new this(void 0, void 0, { _fromObject: obj2 });
  };
  CachePolicy2.prototype._fromObject = function _fromObject(obj2) {
    if (this._responseTime)
      throw Error("Reinitialized");
    if (!obj2 || obj2.v !== 1)
      throw Error("Invalid serialization");
    this._responseTime = obj2.t;
    this._isShared = obj2.sh;
    this._cacheHeuristic = obj2.ch;
    this._immutableMinTtl = obj2.imm !== void 0 ? obj2.imm : 24 * 3600 * 1e3;
    this._status = obj2.st;
    this._resHeaders = obj2.resh;
    this._rescc = obj2.rescc;
    this._method = obj2.m;
    this._url = obj2.u;
    this._host = obj2.h;
    this._noAuthorization = obj2.a;
    this._reqHeaders = obj2.reqh;
    this._reqcc = obj2.reqcc;
  };
  CachePolicy2.prototype.toObject = function toObject2() {
    return {
      v: 1,
      t: this._responseTime,
      sh: this._isShared,
      ch: this._cacheHeuristic,
      imm: this._immutableMinTtl,
      st: this._status,
      resh: this._resHeaders,
      rescc: this._rescc,
      m: this._method,
      u: this._url,
      h: this._host,
      a: this._noAuthorization,
      reqh: this._reqHeaders,
      reqcc: this._reqcc
    };
  };
  CachePolicy2.prototype.revalidationHeaders = function revalidationHeaders(incomingReq) {
    this._assertRequestHasHeaders(incomingReq);
    var headers2 = this._copyWithoutHopByHopHeaders(incomingReq.headers);
    delete headers2["if-range"];
    if (!this._requestMatches(incomingReq, true) || !this.storable()) {
      delete headers2["if-none-match"];
      delete headers2["if-modified-since"];
      return headers2;
    }
    if (this._resHeaders.etag) {
      headers2["if-none-match"] = headers2["if-none-match"] ? `${headers2["if-none-match"]}, ${this._resHeaders.etag}` : this._resHeaders.etag;
    }
    var forbidsWeakValidators = headers2["accept-ranges"] || headers2["if-match"] || headers2["if-unmodified-since"] || this._method && this._method != "GET";
    if (forbidsWeakValidators) {
      delete headers2["if-modified-since"];
      if (headers2["if-none-match"]) {
        var etags = headers2["if-none-match"].split(/,/).filter(function(etag) {
          return !/^\s*W\//.test(etag);
        });
        if (!etags.length) {
          delete headers2["if-none-match"];
        } else {
          headers2["if-none-match"] = etags.join(",").trim();
        }
      }
    } else if (this._resHeaders["last-modified"] && !headers2["if-modified-since"]) {
      headers2["if-modified-since"] = this._resHeaders["last-modified"];
    }
    return headers2;
  };
  CachePolicy2.prototype.revalidatedPolicy = function revalidatedPolicy(request, response) {
    this._assertRequestHasHeaders(request);
    if (!response || !response.headers) {
      throw Error("Response headers missing");
    }
    var matches = false;
    if (response.status !== void 0 && response.status != 304) {
      matches = false;
    } else if (response.headers.etag && !/^\s*W\//.test(response.headers.etag)) {
      matches = this._resHeaders.etag && this._resHeaders.etag.replace(/^\s*W\//, "") === response.headers.etag;
    } else if (this._resHeaders.etag && response.headers.etag) {
      matches = this._resHeaders.etag.replace(/^\s*W\//, "") === response.headers.etag.replace(/^\s*W\//, "");
    } else if (this._resHeaders["last-modified"]) {
      matches = this._resHeaders["last-modified"] === response.headers["last-modified"];
    } else {
      if (!this._resHeaders.etag && !this._resHeaders["last-modified"] && !response.headers.etag && !response.headers["last-modified"]) {
        matches = true;
      }
    }
    if (!matches) {
      return {
        policy: new this.constructor(request, response),
        modified: true
      };
    }
    var headers2 = {};
    for (var k in this._resHeaders) {
      headers2[k] = k in response.headers && !excludedFromRevalidationUpdate[k] ? response.headers[k] : this._resHeaders[k];
    }
    var newResponse = Object.assign({}, response, {
      status: this._status,
      method: this._method,
      headers: headers2
    });
    return {
      policy: new this.constructor(request, newResponse),
      modified: false
    };
  };
  return CachePolicy2;
}();
var lowercaseKeys$4 = function(obj2) {
  var ret = {};
  var keys = Object.keys(Object(obj2));
  for (var i = 0; i < keys.length; i++) {
    ret[keys[i].toLowerCase()] = obj2[keys[i]];
  }
  return ret;
};
const Readable$1 = require$$0__default$1.default.Readable;
const lowercaseKeys$3 = lowercaseKeys$4;
class Response$1 extends Readable$1 {
  constructor(statusCode, headers2, body, url2) {
    if (typeof statusCode !== "number") {
      throw new TypeError("Argument `statusCode` should be a number");
    }
    if (typeof headers2 !== "object") {
      throw new TypeError("Argument `headers` should be an object");
    }
    if (!(body instanceof Buffer)) {
      throw new TypeError("Argument `body` should be a buffer");
    }
    if (typeof url2 !== "string") {
      throw new TypeError("Argument `url` should be a string");
    }
    super();
    this.statusCode = statusCode;
    this.headers = lowercaseKeys$3(headers2);
    this.body = body;
    this.url = url2;
  }
  _read() {
    this.push(this.body);
    this.push(null);
  }
}
var src$3 = Response$1;
var lowercaseKeys$2 = function(obj2) {
  var ret = {};
  var keys = Object.keys(Object(obj2));
  for (var i = 0; i < keys.length; i++) {
    ret[keys[i].toLowerCase()] = obj2[keys[i]];
  }
  return ret;
};
const knownProps = [
  "destroy",
  "setTimeout",
  "socket",
  "headers",
  "trailers",
  "rawHeaders",
  "statusCode",
  "httpVersion",
  "httpVersionMinor",
  "httpVersionMajor",
  "rawTrailers",
  "statusMessage"
];
var mimicResponse$2 = (fromStream, toStream) => {
  const fromProps = new Set(Object.keys(fromStream).concat(knownProps));
  for (const prop of fromProps) {
    if (prop in toStream) {
      continue;
    }
    toStream[prop] = typeof fromStream[prop] === "function" ? fromStream[prop].bind(fromStream) : fromStream[prop];
  }
};
const PassThrough$2 = require$$0__default$1.default.PassThrough;
const mimicResponse$1 = mimicResponse$2;
const cloneResponse$1 = (response) => {
  if (!(response && response.pipe)) {
    throw new TypeError("Parameter `response` must be a response stream.");
  }
  const clone2 = new PassThrough$2();
  mimicResponse$1(response, clone2);
  return response.pipe(clone2);
};
var src$2 = cloneResponse$1;
function commonjsRequire(path2) {
  throw new Error('Could not dynamically require "' + path2 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var jsonBuffer = {};
jsonBuffer.stringify = function stringify2(o) {
  if ("undefined" == typeof o)
    return o;
  if (o && Buffer.isBuffer(o))
    return JSON.stringify(":base64:" + o.toString("base64"));
  if (o && o.toJSON)
    o = o.toJSON();
  if (o && "object" === typeof o) {
    var s = "";
    var array = Array.isArray(o);
    s = array ? "[" : "{";
    var first = true;
    for (var k in o) {
      var ignore = "function" == typeof o[k] || !array && "undefined" === typeof o[k];
      if (Object.hasOwnProperty.call(o, k) && !ignore) {
        if (!first)
          s += ",";
        first = false;
        if (array) {
          if (o[k] == void 0)
            s += "null";
          else
            s += stringify2(o[k]);
        } else if (o[k] !== void 0) {
          s += stringify2(k) + ":" + stringify2(o[k]);
        }
      }
    }
    s += array ? "]" : "}";
    return s;
  } else if ("string" === typeof o) {
    return JSON.stringify(/^:/.test(o) ? ":" + o : o);
  } else if ("undefined" === typeof o) {
    return "null";
  } else
    return JSON.stringify(o);
};
jsonBuffer.parse = function(s) {
  return JSON.parse(s, function(key2, value) {
    if ("string" === typeof value) {
      if (/^:base64:/.test(value))
        return new Buffer(value.substring(8), "base64");
      else
        return /^:/.test(value) ? value.substring(1) : value;
    }
    return value;
  });
};
const EventEmitter$2 = require$$0__default$3.default;
const JSONB = jsonBuffer;
const loadStore = (opts) => {
  const adapters = {
    redis: "@keyv/redis",
    mongodb: "@keyv/mongo",
    mongo: "@keyv/mongo",
    sqlite: "@keyv/sqlite",
    postgresql: "@keyv/postgres",
    postgres: "@keyv/postgres",
    mysql: "@keyv/mysql"
  };
  if (opts.adapter || opts.uri) {
    const adapter = opts.adapter || /^[^:]*/.exec(opts.uri)[0];
    return new (commonjsRequire(adapters[adapter]))(opts);
  }
  return /* @__PURE__ */ new Map();
};
class Keyv$1 extends EventEmitter$2 {
  constructor(uri, opts) {
    super();
    this.opts = Object.assign(
      { namespace: "keyv" },
      typeof uri === "string" ? { uri } : uri,
      opts
    );
    if (!this.opts.store) {
      const adapterOpts = Object.assign({}, this.opts);
      this.opts.store = loadStore(adapterOpts);
    }
    if (typeof this.opts.store.on === "function") {
      this.opts.store.on("error", (err) => this.emit("error", err));
    }
    this.opts.store.namespace = this.opts.namespace;
  }
  _getKeyPrefix(key2) {
    return `${this.opts.namespace}:${key2}`;
  }
  get(key2) {
    key2 = this._getKeyPrefix(key2);
    const store = this.opts.store;
    return Promise.resolve().then(() => store.get(key2)).then((data) => {
      data = typeof data === "string" ? JSONB.parse(data) : data;
      if (data === void 0) {
        return void 0;
      }
      if (typeof data.expires === "number" && Date.now() > data.expires) {
        this.delete(key2);
        return void 0;
      }
      return data.value;
    });
  }
  set(key2, value, ttl) {
    key2 = this._getKeyPrefix(key2);
    if (typeof ttl === "undefined") {
      ttl = this.opts.ttl;
    }
    if (ttl === 0) {
      ttl = void 0;
    }
    const store = this.opts.store;
    return Promise.resolve().then(() => {
      const expires = typeof ttl === "number" ? Date.now() + ttl : null;
      value = { value, expires };
      return store.set(key2, JSONB.stringify(value), ttl);
    }).then(() => true);
  }
  delete(key2) {
    key2 = this._getKeyPrefix(key2);
    const store = this.opts.store;
    return Promise.resolve().then(() => store.delete(key2));
  }
  clear() {
    const store = this.opts.store;
    return Promise.resolve().then(() => store.clear());
  }
}
var src$1 = Keyv$1;
const EventEmitter$1 = require$$0__default$3.default;
const urlLib$2 = require$$0__default$5.default;
const normalizeUrl = normalizeUrl$1;
const getStream$4 = getStream$6.exports;
const CachePolicy = node4;
const Response = src$3;
const lowercaseKeys$1 = lowercaseKeys$2;
const cloneResponse = src$2;
const Keyv = src$1;
class CacheableRequest$1 {
  constructor(request, cacheAdapter) {
    if (typeof request !== "function") {
      throw new TypeError("Parameter `request` must be a function");
    }
    this.cache = new Keyv({
      uri: typeof cacheAdapter === "string" && cacheAdapter,
      store: typeof cacheAdapter !== "string" && cacheAdapter,
      namespace: "cacheable-request"
    });
    return this.createCacheableRequest(request);
  }
  createCacheableRequest(request) {
    return (opts, cb) => {
      if (typeof opts === "string") {
        opts = urlLib$2.parse(opts);
      }
      opts = Object.assign({
        headers: {},
        method: "GET",
        cache: true,
        strictTtl: false,
        automaticFailover: false
      }, opts);
      opts.headers = lowercaseKeys$1(opts.headers);
      const ee = new EventEmitter$1();
      const url2 = normalizeUrl(urlLib$2.format(opts));
      const key2 = `${opts.method}:${url2}`;
      let revalidate = false;
      let madeRequest = false;
      const makeRequest = (opts2) => {
        madeRequest = true;
        const handler = (response) => {
          if (revalidate) {
            const revalidatedPolicy = CachePolicy.fromObject(revalidate.cachePolicy).revalidatedPolicy(opts2, response);
            if (!revalidatedPolicy.modified) {
              const headers2 = revalidatedPolicy.policy.responseHeaders();
              response = new Response(response.statusCode, headers2, revalidate.body, revalidate.url);
              response.cachePolicy = revalidatedPolicy.policy;
              response.fromCache = true;
            }
          }
          if (!response.fromCache) {
            response.cachePolicy = new CachePolicy(opts2, response);
            response.fromCache = false;
          }
          let clonedResponse;
          if (opts2.cache && response.cachePolicy.storable()) {
            clonedResponse = cloneResponse(response);
            getStream$4.buffer(response).then((body) => {
              const value = {
                cachePolicy: response.cachePolicy.toObject(),
                url: response.url,
                statusCode: response.fromCache ? revalidate.statusCode : response.statusCode,
                body
              };
              const ttl = opts2.strictTtl ? response.cachePolicy.timeToLive() : void 0;
              return this.cache.set(key2, value, ttl);
            }).catch((err) => ee.emit("error", new CacheableRequest$1.CacheError(err)));
          } else if (opts2.cache && revalidate) {
            this.cache.delete(key2).catch((err) => ee.emit("error", new CacheableRequest$1.CacheError(err)));
          }
          ee.emit("response", clonedResponse || response);
          if (typeof cb === "function") {
            cb(clonedResponse || response);
          }
        };
        try {
          const req = request(opts2, handler);
          ee.emit("request", req);
        } catch (err) {
          ee.emit("error", new CacheableRequest$1.RequestError(err));
        }
      };
      const get2 = (opts2) => Promise.resolve().then(() => opts2.cache ? this.cache.get(key2) : void 0).then((cacheEntry) => {
        if (typeof cacheEntry === "undefined") {
          return makeRequest(opts2);
        }
        const policy = CachePolicy.fromObject(cacheEntry.cachePolicy);
        if (policy.satisfiesWithoutRevalidation(opts2)) {
          const headers2 = policy.responseHeaders();
          const response = new Response(cacheEntry.statusCode, headers2, cacheEntry.body, cacheEntry.url);
          response.cachePolicy = policy;
          response.fromCache = true;
          ee.emit("response", response);
          if (typeof cb === "function") {
            cb(response);
          }
        } else {
          revalidate = cacheEntry;
          opts2.headers = policy.revalidationHeaders(opts2);
          makeRequest(opts2);
        }
      });
      this.cache.on("error", (err) => ee.emit("error", new CacheableRequest$1.CacheError(err)));
      get2(opts).catch((err) => {
        if (opts.automaticFailover && !madeRequest) {
          makeRequest(opts);
        }
        ee.emit("error", new CacheableRequest$1.CacheError(err));
      });
      return ee;
    };
  }
}
CacheableRequest$1.RequestError = class extends Error {
  constructor(err) {
    super(err.message);
    this.name = "RequestError";
    Object.assign(this, err);
  }
};
CacheableRequest$1.CacheError = class extends Error {
  constructor(err) {
    super(err.message);
    this.name = "CacheError";
    Object.assign(this, err);
  }
};
var src = CacheableRequest$1;
var duplexer3$1 = { exports: {} };
var stream = require$$0__default$1.default;
function DuplexWrapper(options, writable, readable) {
  if (typeof readable === "undefined") {
    readable = writable;
    writable = options;
    options = null;
  }
  stream.Duplex.call(this, options);
  if (typeof readable.read !== "function") {
    readable = new stream.Readable(options).wrap(readable);
  }
  this._writable = writable;
  this._readable = readable;
  this._waiting = false;
  var self2 = this;
  writable.once("finish", function() {
    self2.end();
  });
  this.once("finish", function() {
    writable.end();
  });
  readable.on("readable", function() {
    if (self2._waiting) {
      self2._waiting = false;
      self2._read();
    }
  });
  readable.once("end", function() {
    self2.push(null);
  });
  if (!options || typeof options.bubbleErrors === "undefined" || options.bubbleErrors) {
    writable.on("error", function(err) {
      self2.emit("error", err);
    });
    readable.on("error", function(err) {
      self2.emit("error", err);
    });
  }
}
DuplexWrapper.prototype = Object.create(stream.Duplex.prototype, { constructor: { value: DuplexWrapper } });
DuplexWrapper.prototype._write = function _write2(input, encoding, done2) {
  this._writable.write(input, encoding, done2);
};
DuplexWrapper.prototype._read = function _read2() {
  var buf;
  var reads = 0;
  while ((buf = this._readable.read()) !== null) {
    this.push(buf);
    reads++;
  }
  if (reads === 0) {
    this._waiting = true;
  }
};
duplexer3$1.exports = function duplex2(options, writable, readable) {
  return new DuplexWrapper(options, writable, readable);
};
duplexer3$1.exports.DuplexWrapper = DuplexWrapper;
var intoStream$1 = { exports: {} };
var Readable = readableBrowser.exports.Readable;
var inherits = inherits_browser.exports;
var from2_1 = from2;
from2.ctor = ctor;
from2.obj = obj;
var Proto = ctor();
function toFunction(list) {
  list = list.slice();
  return function(_, cb) {
    var err = null;
    var item = list.length ? list.shift() : null;
    if (item instanceof Error) {
      err = item;
      item = null;
    }
    cb(err, item);
  };
}
function from2(opts, read2) {
  if (typeof opts !== "object" || Array.isArray(opts)) {
    read2 = opts;
    opts = {};
  }
  var rs = new Proto(opts);
  rs._from = Array.isArray(read2) ? toFunction(read2) : read2 || noop;
  return rs;
}
function ctor(opts, read2) {
  if (typeof opts === "function") {
    read2 = opts;
    opts = {};
  }
  opts = defaults$1(opts);
  inherits(Class, Readable);
  function Class(override) {
    if (!(this instanceof Class))
      return new Class(override);
    this._reading = false;
    this._callback = check;
    this.destroyed = false;
    Readable.call(this, override || opts);
    var self2 = this;
    var hwm = this._readableState.highWaterMark;
    function check(err, data) {
      if (self2.destroyed)
        return;
      if (err)
        return self2.destroy(err);
      if (data === null)
        return self2.push(null);
      self2._reading = false;
      if (self2.push(data))
        self2._read(hwm);
    }
  }
  Class.prototype._from = read2 || noop;
  Class.prototype._read = function(size) {
    if (this._reading || this.destroyed)
      return;
    this._reading = true;
    this._from(size, this._callback);
  };
  Class.prototype.destroy = function(err) {
    if (this.destroyed)
      return;
    this.destroyed = true;
    var self2 = this;
    process.nextTick(function() {
      if (err)
        self2.emit("error", err);
      self2.emit("close");
    });
  };
  return Class;
}
function obj(opts, read2) {
  if (typeof opts === "function" || Array.isArray(opts)) {
    read2 = opts;
    opts = {};
  }
  opts = defaults$1(opts);
  opts.objectMode = true;
  opts.highWaterMark = 16;
  return from2(opts, read2);
}
function noop() {
}
function defaults$1(opts) {
  opts = opts || {};
  return opts;
}
var pIsPromise$1 = (x) => x instanceof Promise || x !== null && typeof x === "object" && typeof x.then === "function" && typeof x.catch === "function";
const from = from2_1;
const pIsPromise = pIsPromise$1;
intoStream$1.exports = (x) => {
  if (Array.isArray(x)) {
    x = x.slice();
  }
  let promise;
  let iterator;
  prepare(x);
  function prepare(value) {
    x = value;
    promise = pIsPromise(x) ? x : null;
    const shouldIterate = !promise && x[Symbol.iterator] && typeof x !== "string" && !Buffer.isBuffer(x);
    iterator = shouldIterate ? x[Symbol.iterator]() : null;
  }
  return from(function reader(size, cb) {
    if (promise) {
      promise.then(prepare).then(() => reader.call(this, size, cb), cb);
      return;
    }
    if (iterator) {
      const obj2 = iterator.next();
      setImmediate(cb, null, obj2.done ? null : obj2.value);
      return;
    }
    if (x.length === 0) {
      setImmediate(cb, null, null);
      return;
    }
    const chunk = x.slice(0, size);
    x = x.slice(size);
    setImmediate(cb, null, chunk);
  });
};
intoStream$1.exports.obj = (x) => {
  if (Array.isArray(x)) {
    x = x.slice();
  }
  let promise;
  let iterator;
  prepare(x);
  function prepare(value) {
    x = value;
    promise = pIsPromise(x) ? x : null;
    iterator = !promise && x[Symbol.iterator] ? x[Symbol.iterator]() : null;
  }
  return from.obj(function reader(size, cb) {
    if (promise) {
      promise.then(prepare).then(() => reader.call(this, size, cb), cb);
      return;
    }
    if (iterator) {
      const obj2 = iterator.next();
      setImmediate(cb, null, obj2.done ? null : obj2.value);
      return;
    }
    this.push(x);
    setImmediate(cb, null, null);
  });
};
var dist = { exports: {} };
(function(module2, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  const util2 = require$$1__default.default;
  const toString3 = Object.prototype.toString;
  const isOfType = (type) => (value) => typeof value === type;
  const getObjectType = (value) => {
    const objectName = toString3.call(value).slice(8, -1);
    if (objectName) {
      return objectName;
    }
    return null;
  };
  const isObjectOfType = (typeName) => (value) => {
    return getObjectType(value) === typeName;
  };
  function is2(value) {
    if (value === null) {
      return "null";
    }
    if (value === true || value === false) {
      return "boolean";
    }
    const type = typeof value;
    if (type === "undefined") {
      return "undefined";
    }
    if (type === "string") {
      return "string";
    }
    if (type === "number") {
      return "number";
    }
    if (type === "symbol") {
      return "symbol";
    }
    if (is2.function_(value)) {
      return "Function";
    }
    if (Array.isArray(value)) {
      return "Array";
    }
    if (Buffer.isBuffer(value)) {
      return "Buffer";
    }
    const tagType = getObjectType(value);
    if (tagType) {
      return tagType;
    }
    if (value instanceof String || value instanceof Boolean || value instanceof Number) {
      throw new TypeError("Please don't use object wrappers for primitive types");
    }
    return "Object";
  }
  (function(is3) {
    const isObject3 = (value) => typeof value === "object";
    is3.undefined = isOfType("undefined");
    is3.string = isOfType("string");
    is3.number = isOfType("number");
    is3.function_ = isOfType("function");
    is3.null_ = (value) => value === null;
    is3.class_ = (value) => is3.function_(value) && value.toString().startsWith("class ");
    is3.boolean = (value) => value === true || value === false;
    is3.symbol = isOfType("symbol");
    is3.array = Array.isArray;
    is3.buffer = Buffer.isBuffer;
    is3.nullOrUndefined = (value) => is3.null_(value) || is3.undefined(value);
    is3.object = (value) => !is3.nullOrUndefined(value) && (is3.function_(value) || isObject3(value));
    is3.iterable = (value) => !is3.nullOrUndefined(value) && is3.function_(value[Symbol.iterator]);
    is3.generator = (value) => is3.iterable(value) && is3.function_(value.next) && is3.function_(value.throw);
    is3.nativePromise = isObjectOfType("Promise");
    const hasPromiseAPI = (value) => !is3.null_(value) && isObject3(value) && is3.function_(value.then) && is3.function_(value.catch);
    is3.promise = (value) => is3.nativePromise(value) || hasPromiseAPI(value);
    const isFunctionOfType = (type) => (value) => is3.function_(value) && is3.function_(value.constructor) && value.constructor.name === type;
    is3.generatorFunction = isFunctionOfType("GeneratorFunction");
    is3.asyncFunction = isFunctionOfType("AsyncFunction");
    is3.boundFunction = (value) => is3.function_(value) && !value.hasOwnProperty("prototype");
    is3.regExp = isObjectOfType("RegExp");
    is3.date = isObjectOfType("Date");
    is3.error = isObjectOfType("Error");
    is3.map = isObjectOfType("Map");
    is3.set = isObjectOfType("Set");
    is3.weakMap = isObjectOfType("WeakMap");
    is3.weakSet = isObjectOfType("WeakSet");
    is3.int8Array = isObjectOfType("Int8Array");
    is3.uint8Array = isObjectOfType("Uint8Array");
    is3.uint8ClampedArray = isObjectOfType("Uint8ClampedArray");
    is3.int16Array = isObjectOfType("Int16Array");
    is3.uint16Array = isObjectOfType("Uint16Array");
    is3.int32Array = isObjectOfType("Int32Array");
    is3.uint32Array = isObjectOfType("Uint32Array");
    is3.float32Array = isObjectOfType("Float32Array");
    is3.float64Array = isObjectOfType("Float64Array");
    is3.arrayBuffer = isObjectOfType("ArrayBuffer");
    is3.sharedArrayBuffer = isObjectOfType("SharedArrayBuffer");
    is3.dataView = isObjectOfType("DataView");
    is3.directInstanceOf = (instance, klass) => is3.object(instance) && is3.object(klass) && Object.getPrototypeOf(instance) === klass.prototype;
    is3.truthy = (value) => Boolean(value);
    is3.falsy = (value) => !value;
    is3.nan = (value) => Number.isNaN(value);
    const primitiveTypes = /* @__PURE__ */ new Set([
      "undefined",
      "string",
      "number",
      "boolean",
      "symbol"
    ]);
    is3.primitive = (value) => is3.null_(value) || primitiveTypes.has(typeof value);
    is3.integer = (value) => Number.isInteger(value);
    is3.safeInteger = (value) => Number.isSafeInteger(value);
    is3.plainObject = (value) => {
      let prototype;
      return getObjectType(value) === "Object" && (prototype = Object.getPrototypeOf(value), prototype === null || prototype === Object.getPrototypeOf({}));
    };
    const typedArrayTypes = /* @__PURE__ */ new Set([
      "Int8Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Int16Array",
      "Uint16Array",
      "Int32Array",
      "Uint32Array",
      "Float32Array",
      "Float64Array"
    ]);
    is3.typedArray = (value) => {
      const objectType = getObjectType(value);
      if (objectType === null) {
        return false;
      }
      return typedArrayTypes.has(objectType);
    };
    const isValidLength = (value) => is3.safeInteger(value) && value > -1;
    is3.arrayLike = (value) => !is3.nullOrUndefined(value) && !is3.function_(value) && isValidLength(value.length);
    is3.inRange = (value, range) => {
      if (is3.number(range)) {
        return value >= Math.min(0, range) && value <= Math.max(range, 0);
      }
      if (is3.array(range) && range.length === 2) {
        return value >= Math.min.apply(null, range) && value <= Math.max.apply(null, range);
      }
      throw new TypeError(`Invalid range: ${util2.inspect(range)}`);
    };
    const NODE_TYPE_ELEMENT = 1;
    const DOM_PROPERTIES_TO_CHECK = [
      "innerHTML",
      "ownerDocument",
      "style",
      "attributes",
      "nodeValue"
    ];
    is3.domElement = (value) => is3.object(value) && value.nodeType === NODE_TYPE_ELEMENT && is3.string(value.nodeName) && !is3.plainObject(value) && DOM_PROPERTIES_TO_CHECK.every((property) => property in value);
    is3.nodeStream = (value) => !is3.nullOrUndefined(value) && isObject3(value) && is3.function_(value.pipe);
    is3.infinite = (value) => value === Infinity || value === -Infinity;
    const isAbsoluteMod2 = (value) => (rem) => is3.integer(rem) && Math.abs(rem % 2) === value;
    is3.even = isAbsoluteMod2(0);
    is3.odd = isAbsoluteMod2(1);
    const isWhiteSpaceString = (value) => is3.string(value) && /\S/.test(value) === false;
    const isEmptyStringOrArray = (value) => (is3.string(value) || is3.array(value)) && value.length === 0;
    const isEmptyObject = (value) => !is3.map(value) && !is3.set(value) && is3.object(value) && Object.keys(value).length === 0;
    const isEmptyMapOrSet = (value) => (is3.map(value) || is3.set(value)) && value.size === 0;
    is3.empty = (value) => is3.falsy(value) || isEmptyStringOrArray(value) || isEmptyObject(value) || isEmptyMapOrSet(value);
    is3.emptyOrWhitespace = (value) => is3.empty(value) || isWhiteSpaceString(value);
    const predicateOnArray = (method, predicate, args) => {
      const values = Array.prototype.slice.call(args, 1);
      if (is3.function_(predicate) === false) {
        throw new TypeError(`Invalid predicate: ${util2.inspect(predicate)}`);
      }
      if (values.length === 0) {
        throw new TypeError("Invalid number of values");
      }
      return method.call(values, predicate);
    };
    function any(predicate) {
      return predicateOnArray(Array.prototype.some, predicate, arguments);
    }
    is3.any = any;
    function all(predicate) {
      return predicateOnArray(Array.prototype.every, predicate, arguments);
    }
    is3.all = all;
  })(is2 || (is2 = {}));
  Object.defineProperties(is2, {
    class: {
      value: is2.class_
    },
    function: {
      value: is2.function_
    },
    null: {
      value: is2.null_
    }
  });
  exports.default = is2;
  module2.exports = is2;
  module2.exports.default = is2;
})(dist, dist.exports);
var getStream$3 = { exports: {} };
const PassThrough$1 = require$$0__default$1.default.PassThrough;
var bufferStream$1 = (opts) => {
  opts = Object.assign({}, opts);
  const array = opts.array;
  let encoding = opts.encoding;
  const buffer2 = encoding === "buffer";
  let objectMode = false;
  if (array) {
    objectMode = !(encoding || buffer2);
  } else {
    encoding = encoding || "utf8";
  }
  if (buffer2) {
    encoding = null;
  }
  let len = 0;
  const ret = [];
  const stream2 = new PassThrough$1({ objectMode });
  if (encoding) {
    stream2.setEncoding(encoding);
  }
  stream2.on("data", (chunk) => {
    ret.push(chunk);
    if (objectMode) {
      len = ret.length;
    } else {
      len += chunk.length;
    }
  });
  stream2.getBufferedValue = () => {
    if (array) {
      return ret;
    }
    return buffer2 ? Buffer.concat(ret, len) : ret.join("");
  };
  stream2.getBufferedLength = () => len;
  return stream2;
};
const bufferStream = bufferStream$1;
function getStream$2(inputStream, opts) {
  if (!inputStream) {
    return Promise.reject(new Error("Expected a stream"));
  }
  opts = Object.assign({ maxBuffer: Infinity }, opts);
  const maxBuffer = opts.maxBuffer;
  let stream2;
  let clean;
  const p = new Promise((resolve2, reject2) => {
    const error = (err) => {
      if (err) {
        err.bufferedData = stream2.getBufferedValue();
      }
      reject2(err);
    };
    stream2 = bufferStream(opts);
    inputStream.once("error", error);
    inputStream.pipe(stream2);
    stream2.on("data", () => {
      if (stream2.getBufferedLength() > maxBuffer) {
        reject2(new Error("maxBuffer exceeded"));
      }
    });
    stream2.once("error", error);
    stream2.on("end", resolve2);
    clean = () => {
      if (inputStream.unpipe) {
        inputStream.unpipe(stream2);
      }
    };
  });
  p.then(clean, clean);
  return p.then(() => stream2.getBufferedValue());
}
getStream$3.exports = getStream$2;
getStream$3.exports.buffer = (stream2, opts) => getStream$2(stream2, Object.assign({}, opts, { encoding: "buffer" }));
getStream$3.exports.array = (stream2, opts) => getStream$2(stream2, Object.assign({}, opts, { array: true }));
var timedOut$1 = function(req, time) {
  if (req.timeoutTimer) {
    return req;
  }
  var delays = isNaN(time) ? time : { socket: time, connect: time };
  var host2 = req._headers ? " to " + req._headers.host : "";
  if (delays.connect !== void 0) {
    req.timeoutTimer = setTimeout(function timeoutHandler() {
      req.abort();
      var e = new Error("Connection timed out on request" + host2);
      e.code = "ETIMEDOUT";
      req.emit("error", e);
    }, delays.connect);
  }
  req.on("socket", function assign(socket) {
    if (!(socket.connecting || socket._connecting)) {
      connect();
      return;
    }
    socket.once("connect", connect);
  });
  function clear() {
    if (req.timeoutTimer) {
      clearTimeout(req.timeoutTimer);
      req.timeoutTimer = null;
    }
  }
  function connect() {
    clear();
    if (delays.socket !== void 0) {
      req.setTimeout(delays.socket, function socketTimeoutHandler() {
        req.abort();
        var e = new Error("Socket timed out on request" + host2);
        e.code = "ESOCKETTIMEDOUT";
        req.emit("error", e);
      });
    }
  }
  return req.on("error", clear);
};
const url = require$$0__default$5.default;
const prependHttp = prependHttp$2;
var urlParseLax$1 = (input, options) => {
  if (typeof input !== "string") {
    throw new TypeError(`Expected \`url\` to be of type \`string\`, got \`${typeof input}\` instead.`);
  }
  const finalUrl = prependHttp(input, Object.assign({ https: true }, options));
  return url.parse(finalUrl);
};
function urlToOptions$1(url2) {
  var options = {
    protocol: url2.protocol,
    hostname: url2.hostname,
    hash: url2.hash,
    search: url2.search,
    pathname: url2.pathname,
    path: `${url2.pathname}${url2.search}`,
    href: url2.href
  };
  if (url2.port !== "") {
    options.port = Number(url2.port);
  }
  if (url2.username || url2.password) {
    options.auth = `${url2.username}:${url2.password}`;
  }
  return options;
}
var urlToOptions_1 = urlToOptions$1;
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$16 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var WHITELIST = [
  "ETIMEDOUT",
  "ECONNRESET",
  "EADDRINUSE",
  "ESOCKETTIMEDOUT",
  "ECONNREFUSED",
  "EPIPE",
  "EHOSTUNREACH",
  "EAI_AGAIN"
];
var BLACKLIST = [
  "ENOTFOUND",
  "ENETUNREACH",
  "UNABLE_TO_GET_ISSUER_CERT",
  "UNABLE_TO_GET_CRL",
  "UNABLE_TO_DECRYPT_CERT_SIGNATURE",
  "UNABLE_TO_DECRYPT_CRL_SIGNATURE",
  "UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY",
  "CERT_SIGNATURE_FAILURE",
  "CRL_SIGNATURE_FAILURE",
  "CERT_NOT_YET_VALID",
  "CERT_HAS_EXPIRED",
  "CRL_NOT_YET_VALID",
  "CRL_HAS_EXPIRED",
  "ERROR_IN_CERT_NOT_BEFORE_FIELD",
  "ERROR_IN_CERT_NOT_AFTER_FIELD",
  "ERROR_IN_CRL_LAST_UPDATE_FIELD",
  "ERROR_IN_CRL_NEXT_UPDATE_FIELD",
  "OUT_OF_MEM",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "CERT_CHAIN_TOO_LONG",
  "CERT_REVOKED",
  "INVALID_CA",
  "PATH_LENGTH_EXCEEDED",
  "INVALID_PURPOSE",
  "CERT_UNTRUSTED",
  "CERT_REJECTED"
];
var isRetryAllowed$1 = function(err) {
  if (!err || !err.code) {
    return true;
  }
  if (WHITELIST.indexOf(err.code) !== -1) {
    return true;
  }
  if (BLACKLIST.indexOf(err.code) !== -1) {
    return false;
  }
  return true;
};
/**
 * @file Tests if ES6 Symbol is supported.
 * @version 1.4.2
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-symbol-support-x
 */
var hasSymbolSupportX = typeof Symbol === "function" && typeof Symbol("") === "symbol";
/**
 * @file Tests if ES6 @@toStringTag is supported.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-@@tostringtag|26.3.1 @@toStringTag}
 * @version 1.4.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-to-string-tag-x
 */
var hasToStringTagX = hasSymbolSupportX && typeof Symbol.toStringTag === "symbol";
var isObject$1 = function isObject2(x) {
  return typeof x === "object" && x !== null;
};
const hasToStringTag = hasToStringTagX;
const isObject = isObject$1;
const toString = Object.prototype.toString;
const urlClass = "[object URL]";
const hash = "hash";
const host = "host";
const hostname = "hostname";
const href = "href";
const password = "password";
const pathname = "pathname";
const port = "port";
const protocol = "protocol";
const search = "search";
const username = "username";
const isURL$1 = (url2, supportIncomplete) => {
  if (!isObject(url2))
    return false;
  if (!hasToStringTag && toString.call(url2) === urlClass)
    return true;
  if (!(href in url2))
    return false;
  if (!(protocol in url2))
    return false;
  if (!(username in url2))
    return false;
  if (!(password in url2))
    return false;
  if (!(hostname in url2))
    return false;
  if (!(port in url2))
    return false;
  if (!(host in url2))
    return false;
  if (!(pathname in url2))
    return false;
  if (!(search in url2))
    return false;
  if (!(hash in url2))
    return false;
  if (supportIncomplete !== true) {
    if (!isObject(url2.searchParams))
      return false;
  }
  return true;
};
isURL$1.lenient = (url2) => {
  return isURL$1(url2, true);
};
var isurl = isURL$1;
var pCancelable = { exports: {} };
class CancelError extends Error {
  constructor() {
    super("Promise was canceled");
    this.name = "CancelError";
  }
  get isCanceled() {
    return true;
  }
}
class PCancelable$2 {
  static fn(userFn) {
    return function() {
      const args = [].slice.apply(arguments);
      return new PCancelable$2((resolve2, reject2, onCancel) => {
        args.push(onCancel);
        userFn.apply(null, args).then(resolve2, reject2);
      });
    };
  }
  constructor(executor) {
    this._cancelHandlers = [];
    this._isPending = true;
    this._isCanceled = false;
    this._promise = new Promise((resolve2, reject2) => {
      this._reject = reject2;
      return executor(
        (value) => {
          this._isPending = false;
          resolve2(value);
        },
        (error) => {
          this._isPending = false;
          reject2(error);
        },
        (handler) => {
          this._cancelHandlers.push(handler);
        }
      );
    });
  }
  then(onFulfilled, onRejected) {
    return this._promise.then(onFulfilled, onRejected);
  }
  catch(onRejected) {
    return this._promise.catch(onRejected);
  }
  finally(onFinally) {
    return this._promise.finally(onFinally);
  }
  cancel() {
    if (!this._isPending || this._isCanceled) {
      return;
    }
    if (this._cancelHandlers.length > 0) {
      try {
        for (const handler of this._cancelHandlers) {
          handler();
        }
      } catch (err) {
        this._reject(err);
      }
    }
    this._isCanceled = true;
    this._reject(new CancelError());
  }
  get isCanceled() {
    return this._isCanceled;
  }
}
Object.setPrototypeOf(PCancelable$2.prototype, Promise.prototype);
pCancelable.exports = PCancelable$2;
pCancelable.exports.CancelError = CancelError;
var pTimeout$2 = { exports: {} };
var pFinally$1 = (promise, onFinally) => {
  onFinally = onFinally || (() => {
  });
  return promise.then(
    (val) => new Promise((resolve2) => {
      resolve2(onFinally());
    }).then(() => val),
    (err) => new Promise((resolve2) => {
      resolve2(onFinally());
    }).then(() => {
      throw err;
    })
  );
};
const pFinally = pFinally$1;
class TimeoutError extends Error {
  constructor(message2) {
    super(message2);
    this.name = "TimeoutError";
  }
}
pTimeout$2.exports = (promise, ms, fallback) => new Promise((resolve2, reject2) => {
  if (typeof ms !== "number" || ms < 0) {
    throw new TypeError("Expected `ms` to be a positive number");
  }
  const timer = setTimeout(() => {
    if (typeof fallback === "function") {
      try {
        resolve2(fallback());
      } catch (err2) {
        reject2(err2);
      }
      return;
    }
    const message2 = typeof fallback === "string" ? fallback : `Promise timed out after ${ms} milliseconds`;
    const err = fallback instanceof Error ? fallback : new TimeoutError(message2);
    if (typeof promise.cancel === "function") {
      promise.cancel();
    }
    reject2(err);
  }, ms);
  pFinally(
    promise.then(resolve2, reject2),
    () => {
      clearTimeout(timer);
    }
  );
});
pTimeout$2.exports.TimeoutError = TimeoutError;
const processFn$1 = (fn, opts) => function() {
  const P = opts.promiseModule;
  const args = new Array(arguments.length);
  for (let i = 0; i < arguments.length; i++) {
    args[i] = arguments[i];
  }
  return new P((resolve2, reject2) => {
    if (opts.errorFirst) {
      args.push(function(err, result) {
        if (opts.multiArgs) {
          const results = new Array(arguments.length - 1);
          for (let i = 1; i < arguments.length; i++) {
            results[i - 1] = arguments[i];
          }
          if (err) {
            results.unshift(err);
            reject2(results);
          } else {
            resolve2(results);
          }
        } else if (err) {
          reject2(err);
        } else {
          resolve2(result);
        }
      });
    } else {
      args.push(function(result) {
        if (opts.multiArgs) {
          const results = new Array(arguments.length - 1);
          for (let i = 0; i < arguments.length; i++) {
            results[i] = arguments[i];
          }
          resolve2(results);
        } else {
          resolve2(result);
        }
      });
    }
    fn.apply(this, args);
  });
};
var pify$4 = (obj2, opts) => {
  opts = Object.assign({
    exclude: [/.+(Sync|Stream)$/],
    errorFirst: true,
    promiseModule: Promise
  }, opts);
  const filter = (key2) => {
    const match = (pattern) => typeof pattern === "string" ? key2 === pattern : pattern.test(key2);
    return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
  };
  let ret;
  if (typeof obj2 === "function") {
    ret = function() {
      if (opts.excludeMain) {
        return obj2.apply(this, arguments);
      }
      return processFn$1(obj2, opts).apply(this, arguments);
    };
  } else {
    ret = Object.create(Object.getPrototypeOf(obj2));
  }
  for (const key2 in obj2) {
    const x = obj2[key2];
    ret[key2] = typeof x === "function" && filter(key2) ? processFn$1(x, opts) : x;
  }
  return ret;
};
const name = "got";
const version = "8.3.2";
const description = "Simplified HTTP requests";
const license = "MIT";
const repository = "sindresorhus/got";
const maintainers = [
  {
    name: "Sindre Sorhus",
    email: "sindresorhus@gmail.com",
    url: "sindresorhus.com"
  },
  {
    name: "Vsevolod Strukchinsky",
    email: "floatdrop@gmail.com",
    url: "github.com/floatdrop"
  },
  {
    name: "Alexander Tesfamichael",
    email: "alex.tesfamichael@gmail.com",
    url: "alextes.me"
  }
];
const engines = {
  node: ">=4"
};
const scripts = {
  test: "xo && nyc ava",
  coveralls: "nyc report --reporter=text-lcov | coveralls"
};
const files = [
  "index.js",
  "errors.js"
];
const keywords = [
  "http",
  "https",
  "get",
  "got",
  "url",
  "uri",
  "request",
  "util",
  "utility",
  "simple",
  "curl",
  "wget",
  "fetch",
  "net",
  "network",
  "electron"
];
const dependencies = {
  "@sindresorhus/is": "^0.7.0",
  "cacheable-request": "^2.1.1",
  "decompress-response": "^3.3.0",
  duplexer3: "^0.1.4",
  "get-stream": "^3.0.0",
  "into-stream": "^3.1.0",
  "is-retry-allowed": "^1.1.0",
  isurl: "^1.0.0-alpha5",
  "lowercase-keys": "^1.0.0",
  "mimic-response": "^1.0.0",
  "p-cancelable": "^0.4.0",
  "p-timeout": "^2.0.1",
  pify: "^3.0.0",
  "safe-buffer": "^5.1.1",
  "timed-out": "^4.0.1",
  "url-parse-lax": "^3.0.0",
  "url-to-options": "^1.0.1"
};
const devDependencies = {
  ava: "^0.25.0",
  coveralls: "^3.0.0",
  "form-data": "^2.1.1",
  "get-port": "^3.0.0",
  nyc: "^11.0.2",
  "p-event": "^1.3.0",
  pem: "^1.4.4",
  proxyquire: "^1.8.0",
  sinon: "^4.0.0",
  "slow-stream": "0.0.4",
  tempfile: "^2.0.0",
  tempy: "^0.2.1",
  "universal-url": "1.0.0-alpha",
  xo: "^0.20.0"
};
const ava = {
  concurrency: 4
};
const browser = {
  "decompress-response": false,
  electron: false
};
const require$$24 = {
  name,
  version,
  description,
  license,
  repository,
  maintainers,
  engines,
  scripts,
  files,
  keywords,
  dependencies,
  devDependencies,
  ava,
  browser
};
var errors$1 = {};
const urlLib$1 = require$$0__default$5.default;
const http$1 = require$$1__default$3.default;
const PCancelable$1 = pCancelable.exports;
const is$1 = dist.exports;
class GotError extends Error {
  constructor(message2, error, opts) {
    super(message2);
    Error.captureStackTrace(this, this.constructor);
    this.name = "GotError";
    if (!is$1.undefined(error.code)) {
      this.code = error.code;
    }
    Object.assign(this, {
      host: opts.host,
      hostname: opts.hostname,
      method: opts.method,
      path: opts.path,
      protocol: opts.protocol,
      url: opts.href
    });
  }
}
errors$1.GotError = GotError;
errors$1.CacheError = class extends GotError {
  constructor(error, opts) {
    super(error.message, error, opts);
    this.name = "CacheError";
  }
};
errors$1.RequestError = class extends GotError {
  constructor(error, opts) {
    super(error.message, error, opts);
    this.name = "RequestError";
  }
};
errors$1.ReadError = class extends GotError {
  constructor(error, opts) {
    super(error.message, error, opts);
    this.name = "ReadError";
  }
};
errors$1.ParseError = class extends GotError {
  constructor(error, statusCode, opts, data) {
    super(`${error.message} in "${urlLib$1.format(opts)}": 
${data.slice(0, 77)}...`, error, opts);
    this.name = "ParseError";
    this.statusCode = statusCode;
    this.statusMessage = http$1.STATUS_CODES[this.statusCode];
  }
};
errors$1.HTTPError = class extends GotError {
  constructor(statusCode, statusMessage, headers2, opts) {
    if (statusMessage) {
      statusMessage = statusMessage.replace(/\r?\n/g, " ").trim();
    } else {
      statusMessage = http$1.STATUS_CODES[statusCode];
    }
    super(`Response code ${statusCode} (${statusMessage})`, {}, opts);
    this.name = "HTTPError";
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.headers = headers2;
  }
};
errors$1.MaxRedirectsError = class extends GotError {
  constructor(statusCode, redirectUrls, opts) {
    super("Redirected 10 times. Aborting.", {}, opts);
    this.name = "MaxRedirectsError";
    this.statusCode = statusCode;
    this.statusMessage = http$1.STATUS_CODES[this.statusCode];
    this.redirectUrls = redirectUrls;
  }
};
errors$1.UnsupportedProtocolError = class extends GotError {
  constructor(opts) {
    super(`Unsupported protocol "${opts.protocol}"`, {}, opts);
    this.name = "UnsupportedProtocolError";
  }
};
errors$1.CancelError = PCancelable$1.CancelError;
const EventEmitter = require$$0__default$3.default;
const http = require$$1__default$3.default;
const https = require$$2__default.default;
const PassThrough = require$$0__default$1.default.PassThrough;
const Transform = require$$0__default$1.default.Transform;
const urlLib = require$$0__default$5.default;
const fs$2 = fs__default.default;
const querystring = require$$6__default$1.default;
const CacheableRequest = src;
const duplexer3 = duplexer3$1.exports;
const intoStream = intoStream$1.exports;
const is = dist.exports;
const getStream$1 = getStream$3.exports;
const timedOut = timedOut$1;
const urlParseLax = urlParseLax$1;
const urlToOptions = urlToOptions_1;
const lowercaseKeys = lowercaseKeys$2;
const decompressResponse = require$$16;
const mimicResponse = mimicResponse$2;
const isRetryAllowed = isRetryAllowed$1;
const isURL = isurl;
const PCancelable = pCancelable.exports;
const pTimeout$1 = pTimeout$2.exports;
const pify$3 = pify$4;
const Buffer$1 = safeBuffer$2.exports.Buffer;
const pkg = require$$24;
const errors = errors$1;
const getMethodRedirectCodes = /* @__PURE__ */ new Set([300, 301, 302, 303, 304, 305, 307, 308]);
const allMethodRedirectCodes = /* @__PURE__ */ new Set([300, 303, 307, 308]);
const isFormData = (body) => is.nodeStream(body) && is.function(body.getBoundary);
const getBodySize = (opts) => {
  const body = opts.body;
  if (opts.headers["content-length"]) {
    return Number(opts.headers["content-length"]);
  }
  if (!body && !opts.stream) {
    return 0;
  }
  if (is.string(body)) {
    return Buffer$1.byteLength(body);
  }
  if (isFormData(body)) {
    return pify$3(body.getLength.bind(body))();
  }
  if (body instanceof fs$2.ReadStream) {
    return pify$3(fs$2.stat)(body.path).then((stat2) => stat2.size);
  }
  if (is.nodeStream(body) && is.buffer(body._buffer)) {
    return body._buffer.length;
  }
  return null;
};
function requestAsEventEmitter(opts) {
  opts = opts || {};
  const ee = new EventEmitter();
  const requestUrl = opts.href || urlLib.resolve(urlLib.format(opts), opts.path);
  const redirects = [];
  const agents = is.object(opts.agent) ? opts.agent : null;
  let retryCount = 0;
  let redirectUrl;
  let uploadBodySize;
  let uploaded = 0;
  const get2 = (opts2) => {
    if (opts2.protocol !== "http:" && opts2.protocol !== "https:") {
      ee.emit("error", new got$1.UnsupportedProtocolError(opts2));
      return;
    }
    let fn = opts2.protocol === "https:" ? https : http;
    if (agents) {
      const protocolName = opts2.protocol === "https:" ? "https" : "http";
      opts2.agent = agents[protocolName] || opts2.agent;
    }
    if (opts2.useElectronNet && process.versions.electron) {
      const electron = require$$26__default.default;
      fn = electron.net || electron.remote.net;
    }
    let progressInterval;
    const cacheableRequest = new CacheableRequest(fn.request, opts2.cache);
    const cacheReq = cacheableRequest(opts2, (res) => {
      clearInterval(progressInterval);
      ee.emit("uploadProgress", {
        percent: 1,
        transferred: uploaded,
        total: uploadBodySize
      });
      const statusCode = res.statusCode;
      res.url = redirectUrl || requestUrl;
      res.requestUrl = requestUrl;
      const followRedirect = opts2.followRedirect && "location" in res.headers;
      const redirectGet = followRedirect && getMethodRedirectCodes.has(statusCode);
      const redirectAll = followRedirect && allMethodRedirectCodes.has(statusCode);
      if (redirectAll || redirectGet && (opts2.method === "GET" || opts2.method === "HEAD")) {
        res.resume();
        if (statusCode === 303) {
          opts2.method = "GET";
        }
        if (redirects.length >= 10) {
          ee.emit("error", new got$1.MaxRedirectsError(statusCode, redirects, opts2), null, res);
          return;
        }
        const bufferString = Buffer$1.from(res.headers.location, "binary").toString();
        redirectUrl = urlLib.resolve(urlLib.format(opts2), bufferString);
        redirects.push(redirectUrl);
        const redirectOpts = Object.assign({}, opts2, urlLib.parse(redirectUrl));
        ee.emit("redirect", res, redirectOpts);
        get2(redirectOpts);
        return;
      }
      setImmediate(() => {
        try {
          getResponse(res, opts2, ee, redirects);
        } catch (e) {
          ee.emit("error", e);
        }
      });
    });
    cacheReq.on("error", (err) => {
      if (err instanceof CacheableRequest.RequestError) {
        ee.emit("error", new got$1.RequestError(err, opts2));
      } else {
        ee.emit("error", new got$1.CacheError(err, opts2));
      }
    });
    cacheReq.once("request", (req) => {
      let aborted = false;
      req.once("abort", (_) => {
        aborted = true;
      });
      req.once("error", (err) => {
        clearInterval(progressInterval);
        if (aborted) {
          return;
        }
        const backoff = opts2.retries(++retryCount, err);
        if (backoff) {
          setTimeout(get2, backoff, opts2);
          return;
        }
        ee.emit("error", new got$1.RequestError(err, opts2));
      });
      ee.once("request", (req2) => {
        ee.emit("uploadProgress", {
          percent: 0,
          transferred: 0,
          total: uploadBodySize
        });
        const socket = req2.connection;
        if (socket) {
          const isConnecting = socket.connecting === void 0 ? socket._connecting : socket.connecting;
          const onSocketConnect = () => {
            const uploadEventFrequency = 150;
            progressInterval = setInterval(() => {
              if (socket.destroyed) {
                clearInterval(progressInterval);
                return;
              }
              const lastUploaded = uploaded;
              const headersSize = req2._header ? Buffer$1.byteLength(req2._header) : 0;
              uploaded = socket.bytesWritten - headersSize;
              if (uploadBodySize && uploaded > uploadBodySize) {
                uploaded = uploadBodySize;
              }
              if (uploaded === lastUploaded || uploaded === uploadBodySize) {
                return;
              }
              ee.emit("uploadProgress", {
                percent: uploadBodySize ? uploaded / uploadBodySize : 0,
                transferred: uploaded,
                total: uploadBodySize
              });
            }, uploadEventFrequency);
          };
          if (isConnecting) {
            socket.once("connect", onSocketConnect);
          } else {
            onSocketConnect();
          }
        }
      });
      if (opts2.gotTimeout) {
        clearInterval(progressInterval);
        timedOut(req, opts2.gotTimeout);
      }
      setImmediate(() => {
        ee.emit("request", req);
      });
    });
  };
  setImmediate(() => {
    Promise.resolve(getBodySize(opts)).then((size) => {
      uploadBodySize = size;
      if (is.undefined(opts.headers["content-length"]) && is.undefined(opts.headers["transfer-encoding"]) && isFormData(opts.body)) {
        opts.headers["content-length"] = size;
      }
      get2(opts);
    }).catch((err) => {
      ee.emit("error", err);
    });
  });
  return ee;
}
function getResponse(res, opts, ee, redirects) {
  const downloadBodySize = Number(res.headers["content-length"]) || null;
  let downloaded = 0;
  const progressStream = new Transform({
    transform(chunk, encoding, callback) {
      downloaded += chunk.length;
      const percent = downloadBodySize ? downloaded / downloadBodySize : 0;
      if (percent < 1) {
        ee.emit("downloadProgress", {
          percent,
          transferred: downloaded,
          total: downloadBodySize
        });
      }
      callback(null, chunk);
    },
    flush(callback) {
      ee.emit("downloadProgress", {
        percent: 1,
        transferred: downloaded,
        total: downloadBodySize
      });
      callback();
    }
  });
  mimicResponse(res, progressStream);
  progressStream.redirectUrls = redirects;
  const response = opts.decompress === true && is.function(decompressResponse) && opts.method !== "HEAD" ? decompressResponse(progressStream) : progressStream;
  if (!opts.decompress && ["gzip", "deflate"].indexOf(res.headers["content-encoding"]) !== -1) {
    opts.encoding = null;
  }
  ee.emit("response", response);
  ee.emit("downloadProgress", {
    percent: 0,
    transferred: 0,
    total: downloadBodySize
  });
  res.pipe(progressStream);
}
function asPromise(opts) {
  const timeoutFn = (requestPromise) => opts.gotTimeout && opts.gotTimeout.request ? pTimeout$1(requestPromise, opts.gotTimeout.request, new got$1.RequestError({ message: "Request timed out", code: "ETIMEDOUT" }, opts)) : requestPromise;
  const proxy = new EventEmitter();
  const cancelable = new PCancelable((resolve2, reject2, onCancel) => {
    const ee = requestAsEventEmitter(opts);
    let cancelOnRequest = false;
    onCancel(() => {
      cancelOnRequest = true;
    });
    ee.on("request", (req) => {
      if (cancelOnRequest) {
        req.abort();
      }
      onCancel(() => {
        req.abort();
      });
      if (is.nodeStream(opts.body)) {
        opts.body.pipe(req);
        opts.body = void 0;
        return;
      }
      req.end(opts.body);
    });
    ee.on("response", (res) => {
      const stream2 = is.null(opts.encoding) ? getStream$1.buffer(res) : getStream$1(res, opts);
      stream2.catch((err) => reject2(new got$1.ReadError(err, opts))).then((data) => {
        const statusCode = res.statusCode;
        const limitStatusCode = opts.followRedirect ? 299 : 399;
        res.body = data;
        if (opts.json && res.body) {
          try {
            res.body = JSON.parse(res.body);
          } catch (err) {
            if (statusCode >= 200 && statusCode < 300) {
              throw new got$1.ParseError(err, statusCode, opts, data);
            }
          }
        }
        if (opts.throwHttpErrors && statusCode !== 304 && (statusCode < 200 || statusCode > limitStatusCode)) {
          throw new got$1.HTTPError(statusCode, res.statusMessage, res.headers, opts);
        }
        resolve2(res);
      }).catch((err) => {
        Object.defineProperty(err, "response", { value: res });
        reject2(err);
      });
    });
    ee.once("error", reject2);
    ee.on("redirect", proxy.emit.bind(proxy, "redirect"));
    ee.on("uploadProgress", proxy.emit.bind(proxy, "uploadProgress"));
    ee.on("downloadProgress", proxy.emit.bind(proxy, "downloadProgress"));
  });
  Object.defineProperty(cancelable, "canceled", {
    get() {
      return cancelable.isCanceled;
    }
  });
  const promise = timeoutFn(cancelable);
  promise.cancel = cancelable.cancel.bind(cancelable);
  promise.on = (name2, fn) => {
    proxy.on(name2, fn);
    return promise;
  };
  return promise;
}
function asStream(opts) {
  opts.stream = true;
  const input = new PassThrough();
  const output2 = new PassThrough();
  const proxy = duplexer3(input, output2);
  let timeout;
  if (opts.gotTimeout && opts.gotTimeout.request) {
    timeout = setTimeout(() => {
      proxy.emit("error", new got$1.RequestError({ message: "Request timed out", code: "ETIMEDOUT" }, opts));
    }, opts.gotTimeout.request);
  }
  if (opts.json) {
    throw new Error("Got can not be used as a stream when the `json` option is used");
  }
  if (opts.body) {
    proxy.write = () => {
      throw new Error("Got's stream is not writable when the `body` option is used");
    };
  }
  const ee = requestAsEventEmitter(opts);
  ee.on("request", (req) => {
    proxy.emit("request", req);
    if (is.nodeStream(opts.body)) {
      opts.body.pipe(req);
      return;
    }
    if (opts.body) {
      req.end(opts.body);
      return;
    }
    if (opts.method === "POST" || opts.method === "PUT" || opts.method === "PATCH") {
      input.pipe(req);
      return;
    }
    req.end();
  });
  ee.on("response", (res) => {
    clearTimeout(timeout);
    const statusCode = res.statusCode;
    res.on("error", (err) => {
      proxy.emit("error", new got$1.ReadError(err, opts));
    });
    res.pipe(output2);
    if (opts.throwHttpErrors && statusCode !== 304 && (statusCode < 200 || statusCode > 299)) {
      proxy.emit("error", new got$1.HTTPError(statusCode, res.statusMessage, res.headers, opts), null, res);
      return;
    }
    proxy.emit("response", res);
  });
  ee.on("error", proxy.emit.bind(proxy, "error"));
  ee.on("redirect", proxy.emit.bind(proxy, "redirect"));
  ee.on("uploadProgress", proxy.emit.bind(proxy, "uploadProgress"));
  ee.on("downloadProgress", proxy.emit.bind(proxy, "downloadProgress"));
  return proxy;
}
function normalizeArguments(url2, opts) {
  if (!is.string(url2) && !is.object(url2)) {
    throw new TypeError(`Parameter \`url\` must be a string or object, not ${is(url2)}`);
  } else if (is.string(url2)) {
    url2 = url2.replace(/^unix:/, "http://$&");
    try {
      decodeURI(url2);
    } catch (err) {
      throw new Error("Parameter `url` must contain valid UTF-8 character sequences");
    }
    url2 = urlParseLax(url2);
    if (url2.auth) {
      throw new Error("Basic authentication must be done with the `auth` option");
    }
  } else if (isURL.lenient(url2)) {
    url2 = urlToOptions(url2);
  }
  opts = Object.assign(
    {
      path: "",
      retries: 2,
      cache: false,
      decompress: true,
      useElectronNet: false,
      throwHttpErrors: true
    },
    url2,
    {
      protocol: url2.protocol || "http:"
    },
    opts
  );
  const headers2 = lowercaseKeys(opts.headers);
  for (const key2 of Object.keys(headers2)) {
    if (is.nullOrUndefined(headers2[key2])) {
      delete headers2[key2];
    }
  }
  opts.headers = Object.assign({
    "user-agent": `${pkg.name}/${pkg.version} (https://github.com/sindresorhus/got)`
  }, headers2);
  if (opts.decompress && is.undefined(opts.headers["accept-encoding"])) {
    opts.headers["accept-encoding"] = "gzip, deflate";
  }
  const query = opts.query;
  if (query) {
    if (!is.string(query)) {
      opts.query = querystring.stringify(query);
    }
    opts.path = `${opts.path.split("?")[0]}?${opts.query}`;
    delete opts.query;
  }
  if (opts.json && is.undefined(opts.headers.accept)) {
    opts.headers.accept = "application/json";
  }
  const body = opts.body;
  if (is.nullOrUndefined(body)) {
    opts.method = (opts.method || "GET").toUpperCase();
  } else {
    const headers3 = opts.headers;
    if (!is.nodeStream(body) && !is.string(body) && !is.buffer(body) && !(opts.form || opts.json)) {
      throw new TypeError("The `body` option must be a stream.Readable, string, Buffer or plain Object");
    }
    const canBodyBeStringified = is.plainObject(body) || is.array(body);
    if ((opts.form || opts.json) && !canBodyBeStringified) {
      throw new TypeError("The `body` option must be a plain Object or Array when the `form` or `json` option is used");
    }
    if (isFormData(body)) {
      headers3["content-type"] = headers3["content-type"] || `multipart/form-data; boundary=${body.getBoundary()}`;
    } else if (opts.form && canBodyBeStringified) {
      headers3["content-type"] = headers3["content-type"] || "application/x-www-form-urlencoded";
      opts.body = querystring.stringify(body);
    } else if (opts.json && canBodyBeStringified) {
      headers3["content-type"] = headers3["content-type"] || "application/json";
      opts.body = JSON.stringify(body);
    }
    if (is.undefined(headers3["content-length"]) && is.undefined(headers3["transfer-encoding"]) && !is.nodeStream(body)) {
      const length = is.string(opts.body) ? Buffer$1.byteLength(opts.body) : opts.body.length;
      headers3["content-length"] = length;
    }
    if (is.buffer(body)) {
      opts.body = intoStream(body);
      opts.body._buffer = body;
    }
    opts.method = (opts.method || "POST").toUpperCase();
  }
  if (opts.hostname === "unix") {
    const matches = /(.+?):(.+)/.exec(opts.path);
    if (matches) {
      opts.socketPath = matches[1];
      opts.path = matches[2];
      opts.host = null;
    }
  }
  if (!is.function(opts.retries)) {
    const retries = opts.retries;
    opts.retries = (iter, err) => {
      if (iter > retries || !isRetryAllowed(err)) {
        return 0;
      }
      const noise = Math.random() * 100;
      return (1 << iter) * 1e3 + noise;
    };
  }
  if (is.undefined(opts.followRedirect)) {
    opts.followRedirect = true;
  }
  if (opts.timeout) {
    if (is.number(opts.timeout)) {
      opts.gotTimeout = { request: opts.timeout };
    } else {
      opts.gotTimeout = opts.timeout;
    }
    delete opts.timeout;
  }
  return opts;
}
function got$1(url2, opts) {
  try {
    const normalizedArgs = normalizeArguments(url2, opts);
    if (normalizedArgs.stream) {
      return asStream(normalizedArgs);
    }
    return asPromise(normalizedArgs);
  } catch (err) {
    return Promise.reject(err);
  }
}
got$1.stream = (url2, opts) => asStream(normalizeArguments(url2, opts));
const methods = [
  "get",
  "post",
  "put",
  "patch",
  "head",
  "delete"
];
for (const method of methods) {
  got$1[method] = (url2, opts) => got$1(url2, Object.assign({}, opts, { method }));
  got$1.stream[method] = (url2, opts) => got$1.stream(url2, Object.assign({}, opts, { method }));
}
Object.assign(got$1, errors);
var got_1 = got$1;
var makeDir$2 = { exports: {} };
const processFn = (fn, options) => function(...args) {
  const P = options.promiseModule;
  return new P((resolve2, reject2) => {
    if (options.multiArgs) {
      args.push((...result) => {
        if (options.errorFirst) {
          if (result[0]) {
            reject2(result);
          } else {
            result.shift();
            resolve2(result);
          }
        } else {
          resolve2(result);
        }
      });
    } else if (options.errorFirst) {
      args.push((error, result) => {
        if (error) {
          reject2(error);
        } else {
          resolve2(result);
        }
      });
    } else {
      args.push(resolve2);
    }
    fn.apply(this, args);
  });
};
var pify$2 = (input, options) => {
  options = Object.assign({
    exclude: [/.+(Sync|Stream)$/],
    errorFirst: true,
    promiseModule: Promise
  }, options);
  const objType = typeof input;
  if (!(input !== null && (objType === "object" || objType === "function"))) {
    throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? "null" : objType}\``);
  }
  const filter = (key2) => {
    const match = (pattern) => typeof pattern === "string" ? key2 === pattern : pattern.test(key2);
    return options.include ? options.include.some(match) : !options.exclude.some(match);
  };
  let ret;
  if (objType === "function") {
    ret = function(...args) {
      return options.excludeMain ? input(...args) : processFn(input, options).apply(this, args);
    };
  } else {
    ret = Object.create(Object.getPrototypeOf(input));
  }
  for (const key2 in input) {
    const property = input[key2];
    ret[key2] = typeof property === "function" && filter(key2) ? processFn(property, options) : property;
  }
  return ret;
};
var semver$1 = { exports: {} };
(function(module2, exports) {
  exports = module2.exports = SemVer;
  var debug2;
  if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
    debug2 = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift("SEMVER");
      console.log.apply(console, args);
    };
  } else {
    debug2 = function() {
    };
  }
  exports.SEMVER_SPEC_VERSION = "2.0.0";
  var MAX_LENGTH = 256;
  var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
  var MAX_SAFE_COMPONENT_LENGTH = 16;
  var re = exports.re = [];
  var src2 = exports.src = [];
  var R = 0;
  var NUMERICIDENTIFIER = R++;
  src2[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
  var NUMERICIDENTIFIERLOOSE = R++;
  src2[NUMERICIDENTIFIERLOOSE] = "[0-9]+";
  var NONNUMERICIDENTIFIER = R++;
  src2[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
  var MAINVERSION = R++;
  src2[MAINVERSION] = "(" + src2[NUMERICIDENTIFIER] + ")\\.(" + src2[NUMERICIDENTIFIER] + ")\\.(" + src2[NUMERICIDENTIFIER] + ")";
  var MAINVERSIONLOOSE = R++;
  src2[MAINVERSIONLOOSE] = "(" + src2[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src2[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src2[NUMERICIDENTIFIERLOOSE] + ")";
  var PRERELEASEIDENTIFIER = R++;
  src2[PRERELEASEIDENTIFIER] = "(?:" + src2[NUMERICIDENTIFIER] + "|" + src2[NONNUMERICIDENTIFIER] + ")";
  var PRERELEASEIDENTIFIERLOOSE = R++;
  src2[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src2[NUMERICIDENTIFIERLOOSE] + "|" + src2[NONNUMERICIDENTIFIER] + ")";
  var PRERELEASE = R++;
  src2[PRERELEASE] = "(?:-(" + src2[PRERELEASEIDENTIFIER] + "(?:\\." + src2[PRERELEASEIDENTIFIER] + ")*))";
  var PRERELEASELOOSE = R++;
  src2[PRERELEASELOOSE] = "(?:-?(" + src2[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src2[PRERELEASEIDENTIFIERLOOSE] + ")*))";
  var BUILDIDENTIFIER = R++;
  src2[BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
  var BUILD = R++;
  src2[BUILD] = "(?:\\+(" + src2[BUILDIDENTIFIER] + "(?:\\." + src2[BUILDIDENTIFIER] + ")*))";
  var FULL = R++;
  var FULLPLAIN = "v?" + src2[MAINVERSION] + src2[PRERELEASE] + "?" + src2[BUILD] + "?";
  src2[FULL] = "^" + FULLPLAIN + "$";
  var LOOSEPLAIN = "[v=\\s]*" + src2[MAINVERSIONLOOSE] + src2[PRERELEASELOOSE] + "?" + src2[BUILD] + "?";
  var LOOSE = R++;
  src2[LOOSE] = "^" + LOOSEPLAIN + "$";
  var GTLT = R++;
  src2[GTLT] = "((?:<|>)?=?)";
  var XRANGEIDENTIFIERLOOSE = R++;
  src2[XRANGEIDENTIFIERLOOSE] = src2[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
  var XRANGEIDENTIFIER = R++;
  src2[XRANGEIDENTIFIER] = src2[NUMERICIDENTIFIER] + "|x|X|\\*";
  var XRANGEPLAIN = R++;
  src2[XRANGEPLAIN] = "[v=\\s]*(" + src2[XRANGEIDENTIFIER] + ")(?:\\.(" + src2[XRANGEIDENTIFIER] + ")(?:\\.(" + src2[XRANGEIDENTIFIER] + ")(?:" + src2[PRERELEASE] + ")?" + src2[BUILD] + "?)?)?";
  var XRANGEPLAINLOOSE = R++;
  src2[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src2[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src2[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src2[XRANGEIDENTIFIERLOOSE] + ")(?:" + src2[PRERELEASELOOSE] + ")?" + src2[BUILD] + "?)?)?";
  var XRANGE = R++;
  src2[XRANGE] = "^" + src2[GTLT] + "\\s*" + src2[XRANGEPLAIN] + "$";
  var XRANGELOOSE = R++;
  src2[XRANGELOOSE] = "^" + src2[GTLT] + "\\s*" + src2[XRANGEPLAINLOOSE] + "$";
  var COERCE = R++;
  src2[COERCE] = "(?:^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
  var LONETILDE = R++;
  src2[LONETILDE] = "(?:~>?)";
  var TILDETRIM = R++;
  src2[TILDETRIM] = "(\\s*)" + src2[LONETILDE] + "\\s+";
  re[TILDETRIM] = new RegExp(src2[TILDETRIM], "g");
  var tildeTrimReplace = "$1~";
  var TILDE = R++;
  src2[TILDE] = "^" + src2[LONETILDE] + src2[XRANGEPLAIN] + "$";
  var TILDELOOSE = R++;
  src2[TILDELOOSE] = "^" + src2[LONETILDE] + src2[XRANGEPLAINLOOSE] + "$";
  var LONECARET = R++;
  src2[LONECARET] = "(?:\\^)";
  var CARETTRIM = R++;
  src2[CARETTRIM] = "(\\s*)" + src2[LONECARET] + "\\s+";
  re[CARETTRIM] = new RegExp(src2[CARETTRIM], "g");
  var caretTrimReplace = "$1^";
  var CARET = R++;
  src2[CARET] = "^" + src2[LONECARET] + src2[XRANGEPLAIN] + "$";
  var CARETLOOSE = R++;
  src2[CARETLOOSE] = "^" + src2[LONECARET] + src2[XRANGEPLAINLOOSE] + "$";
  var COMPARATORLOOSE = R++;
  src2[COMPARATORLOOSE] = "^" + src2[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
  var COMPARATOR = R++;
  src2[COMPARATOR] = "^" + src2[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
  var COMPARATORTRIM = R++;
  src2[COMPARATORTRIM] = "(\\s*)" + src2[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src2[XRANGEPLAIN] + ")";
  re[COMPARATORTRIM] = new RegExp(src2[COMPARATORTRIM], "g");
  var comparatorTrimReplace = "$1$2$3";
  var HYPHENRANGE = R++;
  src2[HYPHENRANGE] = "^\\s*(" + src2[XRANGEPLAIN] + ")\\s+-\\s+(" + src2[XRANGEPLAIN] + ")\\s*$";
  var HYPHENRANGELOOSE = R++;
  src2[HYPHENRANGELOOSE] = "^\\s*(" + src2[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src2[XRANGEPLAINLOOSE] + ")\\s*$";
  var STAR = R++;
  src2[STAR] = "(<|>)?=?\\s*\\*";
  for (var i = 0; i < R; i++) {
    debug2(i, src2[i]);
    if (!re[i]) {
      re[i] = new RegExp(src2[i]);
    }
  }
  exports.parse = parse2;
  function parse2(version2, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (version2 instanceof SemVer) {
      return version2;
    }
    if (typeof version2 !== "string") {
      return null;
    }
    if (version2.length > MAX_LENGTH) {
      return null;
    }
    var r = options.loose ? re[LOOSE] : re[FULL];
    if (!r.test(version2)) {
      return null;
    }
    try {
      return new SemVer(version2, options);
    } catch (er) {
      return null;
    }
  }
  exports.valid = valid;
  function valid(version2, options) {
    var v = parse2(version2, options);
    return v ? v.version : null;
  }
  exports.clean = clean;
  function clean(version2, options) {
    var s = parse2(version2.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
  }
  exports.SemVer = SemVer;
  function SemVer(version2, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (version2 instanceof SemVer) {
      if (version2.loose === options.loose) {
        return version2;
      } else {
        version2 = version2.version;
      }
    } else if (typeof version2 !== "string") {
      throw new TypeError("Invalid Version: " + version2);
    }
    if (version2.length > MAX_LENGTH) {
      throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
    }
    if (!(this instanceof SemVer)) {
      return new SemVer(version2, options);
    }
    debug2("SemVer", version2, options);
    this.options = options;
    this.loose = !!options.loose;
    var m = version2.trim().match(options.loose ? re[LOOSE] : re[FULL]);
    if (!m) {
      throw new TypeError("Invalid Version: " + version2);
    }
    this.raw = version2;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map(function(id) {
        if (/^[0-9]+$/.test(id)) {
          var num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  SemVer.prototype.format = function() {
    this.version = this.major + "." + this.minor + "." + this.patch;
    if (this.prerelease.length) {
      this.version += "-" + this.prerelease.join(".");
    }
    return this.version;
  };
  SemVer.prototype.toString = function() {
    return this.version;
  };
  SemVer.prototype.compare = function(other) {
    debug2("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return this.compareMain(other) || this.comparePre(other);
  };
  SemVer.prototype.compareMain = function(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  };
  SemVer.prototype.comparePre = function(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    var i2 = 0;
    do {
      var a = this.prerelease[i2];
      var b = other.prerelease[i2];
      debug2("prerelease compare", i2, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i2);
  };
  SemVer.prototype.inc = function(release, identifier) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier);
        this.inc("pre", identifier);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier);
        }
        this.inc("pre", identifier);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre":
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          var i2 = this.prerelease.length;
          while (--i2 >= 0) {
            if (typeof this.prerelease[i2] === "number") {
              this.prerelease[i2]++;
              i2 = -2;
            }
          }
          if (i2 === -1) {
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }
        break;
      default:
        throw new Error("invalid increment argument: " + release);
    }
    this.format();
    this.raw = this.version;
    return this;
  };
  exports.inc = inc;
  function inc(version2, release, loose, identifier) {
    if (typeof loose === "string") {
      identifier = loose;
      loose = void 0;
    }
    try {
      return new SemVer(version2, loose).inc(release, identifier).version;
    } catch (er) {
      return null;
    }
  }
  exports.diff = diff;
  function diff(version1, version2) {
    if (eq(version1, version2)) {
      return null;
    } else {
      var v1 = parse2(version1);
      var v2 = parse2(version2);
      var prefix = "";
      if (v1.prerelease.length || v2.prerelease.length) {
        prefix = "pre";
        var defaultResult = "prerelease";
      }
      for (var key2 in v1) {
        if (key2 === "major" || key2 === "minor" || key2 === "patch") {
          if (v1[key2] !== v2[key2]) {
            return prefix + key2;
          }
        }
      }
      return defaultResult;
    }
  }
  exports.compareIdentifiers = compareIdentifiers;
  var numeric = /^[0-9]+$/;
  function compareIdentifiers(a, b) {
    var anum = numeric.test(a);
    var bnum = numeric.test(b);
    if (anum && bnum) {
      a = +a;
      b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  }
  exports.rcompareIdentifiers = rcompareIdentifiers;
  function rcompareIdentifiers(a, b) {
    return compareIdentifiers(b, a);
  }
  exports.major = major;
  function major(a, loose) {
    return new SemVer(a, loose).major;
  }
  exports.minor = minor;
  function minor(a, loose) {
    return new SemVer(a, loose).minor;
  }
  exports.patch = patch2;
  function patch2(a, loose) {
    return new SemVer(a, loose).patch;
  }
  exports.compare = compare;
  function compare(a, b, loose) {
    return new SemVer(a, loose).compare(new SemVer(b, loose));
  }
  exports.compareLoose = compareLoose;
  function compareLoose(a, b) {
    return compare(a, b, true);
  }
  exports.rcompare = rcompare;
  function rcompare(a, b, loose) {
    return compare(b, a, loose);
  }
  exports.sort = sort;
  function sort(list, loose) {
    return list.sort(function(a, b) {
      return exports.compare(a, b, loose);
    });
  }
  exports.rsort = rsort;
  function rsort(list, loose) {
    return list.sort(function(a, b) {
      return exports.rcompare(a, b, loose);
    });
  }
  exports.gt = gt;
  function gt(a, b, loose) {
    return compare(a, b, loose) > 0;
  }
  exports.lt = lt;
  function lt(a, b, loose) {
    return compare(a, b, loose) < 0;
  }
  exports.eq = eq;
  function eq(a, b, loose) {
    return compare(a, b, loose) === 0;
  }
  exports.neq = neq;
  function neq(a, b, loose) {
    return compare(a, b, loose) !== 0;
  }
  exports.gte = gte;
  function gte(a, b, loose) {
    return compare(a, b, loose) >= 0;
  }
  exports.lte = lte;
  function lte(a, b, loose) {
    return compare(a, b, loose) <= 0;
  }
  exports.cmp = cmp;
  function cmp(a, op, b, loose) {
    switch (op) {
      case "===":
        if (typeof a === "object")
          a = a.version;
        if (typeof b === "object")
          b = b.version;
        return a === b;
      case "!==":
        if (typeof a === "object")
          a = a.version;
        if (typeof b === "object")
          b = b.version;
        return a !== b;
      case "":
      case "=":
      case "==":
        return eq(a, b, loose);
      case "!=":
        return neq(a, b, loose);
      case ">":
        return gt(a, b, loose);
      case ">=":
        return gte(a, b, loose);
      case "<":
        return lt(a, b, loose);
      case "<=":
        return lte(a, b, loose);
      default:
        throw new TypeError("Invalid operator: " + op);
    }
  }
  exports.Comparator = Comparator;
  function Comparator(comp, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp;
      } else {
        comp = comp.value;
      }
    }
    if (!(this instanceof Comparator)) {
      return new Comparator(comp, options);
    }
    debug2("comparator", comp, options);
    this.options = options;
    this.loose = !!options.loose;
    this.parse(comp);
    if (this.semver === ANY) {
      this.value = "";
    } else {
      this.value = this.operator + this.semver.version;
    }
    debug2("comp", this);
  }
  var ANY = {};
  Comparator.prototype.parse = function(comp) {
    var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
    var m = comp.match(r);
    if (!m) {
      throw new TypeError("Invalid comparator: " + comp);
    }
    this.operator = m[1];
    if (this.operator === "=") {
      this.operator = "";
    }
    if (!m[2]) {
      this.semver = ANY;
    } else {
      this.semver = new SemVer(m[2], this.options.loose);
    }
  };
  Comparator.prototype.toString = function() {
    return this.value;
  };
  Comparator.prototype.test = function(version2) {
    debug2("Comparator.test", version2, this.options.loose);
    if (this.semver === ANY) {
      return true;
    }
    if (typeof version2 === "string") {
      version2 = new SemVer(version2, this.options);
    }
    return cmp(version2, this.operator, this.semver, this.options);
  };
  Comparator.prototype.intersects = function(comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError("a Comparator is required");
    }
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    var rangeTmp;
    if (this.operator === "") {
      rangeTmp = new Range(comp.value, options);
      return satisfies(this.value, rangeTmp, options);
    } else if (comp.operator === "") {
      rangeTmp = new Range(this.value, options);
      return satisfies(comp.semver, rangeTmp, options);
    }
    var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
    var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
    var sameSemVer = this.semver.version === comp.semver.version;
    var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
    var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
    var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
    return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
  };
  exports.Range = Range;
  function Range(range, options) {
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (range instanceof Range) {
      if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
        return range;
      } else {
        return new Range(range.raw, options);
      }
    }
    if (range instanceof Comparator) {
      return new Range(range.value, options);
    }
    if (!(this instanceof Range)) {
      return new Range(range, options);
    }
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    this.raw = range;
    this.set = range.split(/\s*\|\|\s*/).map(function(range2) {
      return this.parseRange(range2.trim());
    }, this).filter(function(c) {
      return c.length;
    });
    if (!this.set.length) {
      throw new TypeError("Invalid SemVer Range: " + range);
    }
    this.format();
  }
  Range.prototype.format = function() {
    this.range = this.set.map(function(comps) {
      return comps.join(" ").trim();
    }).join("||").trim();
    return this.range;
  };
  Range.prototype.toString = function() {
    return this.range;
  };
  Range.prototype.parseRange = function(range) {
    var loose = this.options.loose;
    range = range.trim();
    var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
    range = range.replace(hr, hyphenReplace);
    debug2("hyphen replace", range);
    range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
    debug2("comparator trim", range, re[COMPARATORTRIM]);
    range = range.replace(re[TILDETRIM], tildeTrimReplace);
    range = range.replace(re[CARETTRIM], caretTrimReplace);
    range = range.split(/\s+/).join(" ");
    var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
    var set = range.split(" ").map(function(comp) {
      return parseComparator(comp, this.options);
    }, this).join(" ").split(/\s+/);
    if (this.options.loose) {
      set = set.filter(function(comp) {
        return !!comp.match(compRe);
      });
    }
    set = set.map(function(comp) {
      return new Comparator(comp, this.options);
    }, this);
    return set;
  };
  Range.prototype.intersects = function(range, options) {
    if (!(range instanceof Range)) {
      throw new TypeError("a Range is required");
    }
    return this.set.some(function(thisComparators) {
      return thisComparators.every(function(thisComparator) {
        return range.set.some(function(rangeComparators) {
          return rangeComparators.every(function(rangeComparator) {
            return thisComparator.intersects(rangeComparator, options);
          });
        });
      });
    });
  };
  exports.toComparators = toComparators;
  function toComparators(range, options) {
    return new Range(range, options).set.map(function(comp) {
      return comp.map(function(c) {
        return c.value;
      }).join(" ").trim().split(" ");
    });
  }
  function parseComparator(comp, options) {
    debug2("comp", comp, options);
    comp = replaceCarets(comp, options);
    debug2("caret", comp);
    comp = replaceTildes(comp, options);
    debug2("tildes", comp);
    comp = replaceXRanges(comp, options);
    debug2("xrange", comp);
    comp = replaceStars(comp, options);
    debug2("stars", comp);
    return comp;
  }
  function isX(id) {
    return !id || id.toLowerCase() === "x" || id === "*";
  }
  function replaceTildes(comp, options) {
    return comp.trim().split(/\s+/).map(function(comp2) {
      return replaceTilde(comp2, options);
    }).join(" ");
  }
  function replaceTilde(comp, options) {
    var r = options.loose ? re[TILDELOOSE] : re[TILDE];
    return comp.replace(r, function(_, M, m, p, pr) {
      debug2("tilde", comp, _, M, m, p, pr);
      var ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
      } else if (isX(p)) {
        ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
      } else if (pr) {
        debug2("replaceTilde pr", pr);
        ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
      } else {
        ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
      }
      debug2("tilde return", ret);
      return ret;
    });
  }
  function replaceCarets(comp, options) {
    return comp.trim().split(/\s+/).map(function(comp2) {
      return replaceCaret(comp2, options);
    }).join(" ");
  }
  function replaceCaret(comp, options) {
    debug2("caret", comp, options);
    var r = options.loose ? re[CARETLOOSE] : re[CARET];
    return comp.replace(r, function(_, M, m, p, pr) {
      debug2("caret", comp, _, M, m, p, pr);
      var ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
      } else if (isX(p)) {
        if (M === "0") {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else {
          ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
        }
      } else if (pr) {
        debug2("replaceCaret pr", pr);
        if (M === "0") {
          if (m === "0") {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
          } else {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
          }
        } else {
          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
        }
      } else {
        debug2("no pr");
        if (M === "0") {
          if (m === "0") {
            ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
          }
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
        }
      }
      debug2("caret return", ret);
      return ret;
    });
  }
  function replaceXRanges(comp, options) {
    debug2("replaceXRanges", comp, options);
    return comp.split(/\s+/).map(function(comp2) {
      return replaceXRange(comp2, options);
    }).join(" ");
  }
  function replaceXRange(comp, options) {
    comp = comp.trim();
    var r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
    return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
      debug2("xRange", comp, ret, gtlt, M, m, p, pr);
      var xM = isX(M);
      var xm = xM || isX(m);
      var xp = xm || isX(p);
      var anyX = xp;
      if (gtlt === "=" && anyX) {
        gtlt = "";
      }
      if (xM) {
        if (gtlt === ">" || gtlt === "<") {
          ret = "<0.0.0";
        } else {
          ret = "*";
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m = 0;
        }
        p = 0;
        if (gtlt === ">") {
          gtlt = ">=";
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === "<=") {
          gtlt = "<";
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }
        ret = gtlt + M + "." + m + "." + p;
      } else if (xm) {
        ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
      } else if (xp) {
        ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
      }
      debug2("xRange return", ret);
      return ret;
    });
  }
  function replaceStars(comp, options) {
    debug2("replaceStars", comp, options);
    return comp.trim().replace(re[STAR], "");
  }
  function hyphenReplace($0, from3, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
    if (isX(fM)) {
      from3 = "";
    } else if (isX(fm)) {
      from3 = ">=" + fM + ".0.0";
    } else if (isX(fp)) {
      from3 = ">=" + fM + "." + fm + ".0";
    } else {
      from3 = ">=" + from3;
    }
    if (isX(tM)) {
      to = "";
    } else if (isX(tm)) {
      to = "<" + (+tM + 1) + ".0.0";
    } else if (isX(tp)) {
      to = "<" + tM + "." + (+tm + 1) + ".0";
    } else if (tpr) {
      to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
    } else {
      to = "<=" + to;
    }
    return (from3 + " " + to).trim();
  }
  Range.prototype.test = function(version2) {
    if (!version2) {
      return false;
    }
    if (typeof version2 === "string") {
      version2 = new SemVer(version2, this.options);
    }
    for (var i2 = 0; i2 < this.set.length; i2++) {
      if (testSet(this.set[i2], version2, this.options)) {
        return true;
      }
    }
    return false;
  };
  function testSet(set, version2, options) {
    for (var i2 = 0; i2 < set.length; i2++) {
      if (!set[i2].test(version2)) {
        return false;
      }
    }
    if (version2.prerelease.length && !options.includePrerelease) {
      for (i2 = 0; i2 < set.length; i2++) {
        debug2(set[i2].semver);
        if (set[i2].semver === ANY) {
          continue;
        }
        if (set[i2].semver.prerelease.length > 0) {
          var allowed = set[i2].semver;
          if (allowed.major === version2.major && allowed.minor === version2.minor && allowed.patch === version2.patch) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  }
  exports.satisfies = satisfies;
  function satisfies(version2, range, options) {
    try {
      range = new Range(range, options);
    } catch (er) {
      return false;
    }
    return range.test(version2);
  }
  exports.maxSatisfying = maxSatisfying;
  function maxSatisfying(versions, range, options) {
    var max = null;
    var maxSV = null;
    try {
      var rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    versions.forEach(function(v) {
      if (rangeObj.test(v)) {
        if (!max || maxSV.compare(v) === -1) {
          max = v;
          maxSV = new SemVer(max, options);
        }
      }
    });
    return max;
  }
  exports.minSatisfying = minSatisfying;
  function minSatisfying(versions, range, options) {
    var min = null;
    var minSV = null;
    try {
      var rangeObj = new Range(range, options);
    } catch (er) {
      return null;
    }
    versions.forEach(function(v) {
      if (rangeObj.test(v)) {
        if (!min || minSV.compare(v) === 1) {
          min = v;
          minSV = new SemVer(min, options);
        }
      }
    });
    return min;
  }
  exports.minVersion = minVersion;
  function minVersion(range, loose) {
    range = new Range(range, loose);
    var minver = new SemVer("0.0.0");
    if (range.test(minver)) {
      return minver;
    }
    minver = new SemVer("0.0.0-0");
    if (range.test(minver)) {
      return minver;
    }
    minver = null;
    for (var i2 = 0; i2 < range.set.length; ++i2) {
      var comparators = range.set[i2];
      comparators.forEach(function(comparator) {
        var compver = new SemVer(comparator.semver.version);
        switch (comparator.operator) {
          case ">":
            if (compver.prerelease.length === 0) {
              compver.patch++;
            } else {
              compver.prerelease.push(0);
            }
            compver.raw = compver.format();
          case "":
          case ">=":
            if (!minver || gt(minver, compver)) {
              minver = compver;
            }
            break;
          case "<":
          case "<=":
            break;
          default:
            throw new Error("Unexpected operation: " + comparator.operator);
        }
      });
    }
    if (minver && range.test(minver)) {
      return minver;
    }
    return null;
  }
  exports.validRange = validRange;
  function validRange(range, options) {
    try {
      return new Range(range, options).range || "*";
    } catch (er) {
      return null;
    }
  }
  exports.ltr = ltr;
  function ltr(version2, range, options) {
    return outside(version2, range, "<", options);
  }
  exports.gtr = gtr;
  function gtr(version2, range, options) {
    return outside(version2, range, ">", options);
  }
  exports.outside = outside;
  function outside(version2, range, hilo, options) {
    version2 = new SemVer(version2, options);
    range = new Range(range, options);
    var gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case ">":
        gtfn = gt;
        ltefn = lte;
        ltfn = lt;
        comp = ">";
        ecomp = ">=";
        break;
      case "<":
        gtfn = lt;
        ltefn = gte;
        ltfn = gt;
        comp = "<";
        ecomp = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (satisfies(version2, range, options)) {
      return false;
    }
    for (var i2 = 0; i2 < range.set.length; ++i2) {
      var comparators = range.set[i2];
      var high = null;
      var low = null;
      comparators.forEach(function(comparator) {
        if (comparator.semver === ANY) {
          comparator = new Comparator(">=0.0.0");
        }
        high = high || comparator;
        low = low || comparator;
        if (gtfn(comparator.semver, high.semver, options)) {
          high = comparator;
        } else if (ltfn(comparator.semver, low.semver, options)) {
          low = comparator;
        }
      });
      if (high.operator === comp || high.operator === ecomp) {
        return false;
      }
      if ((!low.operator || low.operator === comp) && ltefn(version2, low.semver)) {
        return false;
      } else if (low.operator === ecomp && ltfn(version2, low.semver)) {
        return false;
      }
    }
    return true;
  }
  exports.prerelease = prerelease;
  function prerelease(version2, options) {
    var parsed = parse2(version2, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
  }
  exports.intersects = intersects;
  function intersects(r1, r2, options) {
    r1 = new Range(r1, options);
    r2 = new Range(r2, options);
    return r1.intersects(r2);
  }
  exports.coerce = coerce;
  function coerce(version2) {
    if (version2 instanceof SemVer) {
      return version2;
    }
    if (typeof version2 !== "string") {
      return null;
    }
    var match = version2.match(re[COERCE]);
    if (match == null) {
      return null;
    }
    return parse2(match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"));
  }
})(semver$1, semver$1.exports);
const fs$1 = fs__default.default;
const path$1 = require$$1__default$1.default;
const pify$1 = pify$2;
const semver = semver$1.exports;
const defaults = {
  mode: 511 & ~process.umask(),
  fs: fs$1
};
const useNativeRecursiveOption = semver.satisfies(process.version, ">=10.12.0");
const checkPath = (pth) => {
  if (process.platform === "win32") {
    const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path$1.parse(pth).root, ""));
    if (pathHasInvalidWinCharacters) {
      const error = new Error(`Path contains invalid characters: ${pth}`);
      error.code = "EINVAL";
      throw error;
    }
  }
};
const permissionError = (pth) => {
  const error = new Error(`operation not permitted, mkdir '${pth}'`);
  error.code = "EPERM";
  error.errno = -4048;
  error.path = pth;
  error.syscall = "mkdir";
  return error;
};
const makeDir$1 = (input, options) => Promise.resolve().then(() => {
  checkPath(input);
  options = Object.assign({}, defaults, options);
  const mkdir2 = pify$1(options.fs.mkdir);
  const stat2 = pify$1(options.fs.stat);
  if (useNativeRecursiveOption && options.fs.mkdir === fs$1.mkdir) {
    const pth = path$1.resolve(input);
    return mkdir2(pth, {
      mode: options.mode,
      recursive: true
    }).then(() => pth);
  }
  const make = (pth) => {
    return mkdir2(pth, options.mode).then(() => pth).catch((error) => {
      if (error.code === "EPERM") {
        throw error;
      }
      if (error.code === "ENOENT") {
        if (path$1.dirname(pth) === pth) {
          throw permissionError(pth);
        }
        if (error.message.includes("null bytes")) {
          throw error;
        }
        return make(path$1.dirname(pth)).then(() => make(pth));
      }
      return stat2(pth).then((stats) => stats.isDirectory() ? pth : Promise.reject()).catch(() => {
        throw error;
      });
    });
  };
  return make(path$1.resolve(input));
});
makeDir$2.exports = makeDir$1;
makeDir$2.exports.default = makeDir$1;
makeDir$2.exports.sync = (input, options) => {
  checkPath(input);
  options = Object.assign({}, defaults, options);
  if (useNativeRecursiveOption && options.fs.mkdirSync === fs$1.mkdirSync) {
    const pth = path$1.resolve(input);
    fs$1.mkdirSync(pth, {
      mode: options.mode,
      recursive: true
    });
    return pth;
  }
  const make = (pth) => {
    try {
      options.fs.mkdirSync(pth, options.mode);
    } catch (error) {
      if (error.code === "EPERM") {
        throw error;
      }
      if (error.code === "ENOENT") {
        if (path$1.dirname(pth) === pth) {
          throw permissionError(pth);
        }
        if (error.message.includes("null bytes")) {
          throw error;
        }
        make(path$1.dirname(pth));
        return make(pth);
      }
      try {
        if (!options.fs.statSync(pth).isDirectory()) {
          throw new Error("The path is not a directory");
        }
      } catch (_) {
        throw error;
      }
    }
    return pth;
  };
  return make(path$1.resolve(input));
};
var pEvent$1 = { exports: {} };
const pTimeout = pTimeout$2.exports;
const symbolAsyncIterator = Symbol.asyncIterator || "@@asyncIterator";
const normalizeEmitter = (emitter) => {
  const addListener = emitter.on || emitter.addListener || emitter.addEventListener;
  const removeListener = emitter.off || emitter.removeListener || emitter.removeEventListener;
  if (!addListener || !removeListener) {
    throw new TypeError("Emitter is not compatible");
  }
  return {
    addListener: addListener.bind(emitter),
    removeListener: removeListener.bind(emitter)
  };
};
const normalizeEvents = (event) => Array.isArray(event) ? event : [event];
const multiple = (emitter, event, options) => {
  let cancel;
  const ret = new Promise((resolve2, reject2) => {
    options = Object.assign({
      rejectionEvents: ["error"],
      multiArgs: false,
      resolveImmediately: false
    }, options);
    if (!(options.count >= 0 && (options.count === Infinity || Number.isInteger(options.count)))) {
      throw new TypeError("The `count` option should be at least 0 or more");
    }
    const events = normalizeEvents(event);
    const items = [];
    const { addListener, removeListener } = normalizeEmitter(emitter);
    const onItem = (...args) => {
      const value = options.multiArgs ? args : args[0];
      if (options.filter && !options.filter(value)) {
        return;
      }
      items.push(value);
      if (options.count === items.length) {
        cancel();
        resolve2(items);
      }
    };
    const rejectHandler = (error) => {
      cancel();
      reject2(error);
    };
    cancel = () => {
      for (const event2 of events) {
        removeListener(event2, onItem);
      }
      for (const rejectionEvent of options.rejectionEvents) {
        removeListener(rejectionEvent, rejectHandler);
      }
    };
    for (const event2 of events) {
      addListener(event2, onItem);
    }
    for (const rejectionEvent of options.rejectionEvents) {
      addListener(rejectionEvent, rejectHandler);
    }
    if (options.resolveImmediately) {
      resolve2(items);
    }
  });
  ret.cancel = cancel;
  if (typeof options.timeout === "number") {
    const timeout = pTimeout(ret, options.timeout);
    timeout.cancel = cancel;
    return timeout;
  }
  return ret;
};
pEvent$1.exports = (emitter, event, options) => {
  if (typeof options === "function") {
    options = { filter: options };
  }
  options = Object.assign({}, options, {
    count: 1,
    resolveImmediately: false
  });
  const arrayPromise = multiple(emitter, event, options);
  const promise = arrayPromise.then((array) => array[0]);
  promise.cancel = arrayPromise.cancel;
  return promise;
};
pEvent$1.exports.multiple = multiple;
pEvent$1.exports.iterator = (emitter, event, options) => {
  if (typeof options === "function") {
    options = { filter: options };
  }
  const events = normalizeEvents(event);
  options = Object.assign({
    rejectionEvents: ["error"],
    resolutionEvents: [],
    limit: Infinity,
    multiArgs: false
  }, options);
  const { limit } = options;
  const isValidLimit = limit >= 0 && (limit === Infinity || Number.isInteger(limit));
  if (!isValidLimit) {
    throw new TypeError("The `limit` option should be a non-negative integer or Infinity");
  }
  if (limit === 0) {
    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      next() {
        return Promise.resolve({ done: true, value: void 0 });
      }
    };
  }
  let isLimitReached = false;
  const { addListener, removeListener } = normalizeEmitter(emitter);
  let done2 = false;
  let error;
  let hasPendingError = false;
  const nextQueue = [];
  const valueQueue = [];
  let eventCount = 0;
  const valueHandler = (...args) => {
    eventCount++;
    isLimitReached = eventCount === limit;
    const value = options.multiArgs ? args : args[0];
    if (nextQueue.length > 0) {
      const { resolve: resolve2 } = nextQueue.shift();
      resolve2({ done: false, value });
      if (isLimitReached) {
        cancel();
      }
      return;
    }
    valueQueue.push(value);
    if (isLimitReached) {
      cancel();
    }
  };
  const cancel = () => {
    done2 = true;
    for (const event2 of events) {
      removeListener(event2, valueHandler);
    }
    for (const rejectionEvent of options.rejectionEvents) {
      removeListener(rejectionEvent, rejectHandler);
    }
    for (const resolutionEvent of options.resolutionEvents) {
      removeListener(resolutionEvent, resolveHandler);
    }
    while (nextQueue.length > 0) {
      const { resolve: resolve2 } = nextQueue.shift();
      resolve2({ done: true, value: void 0 });
    }
  };
  const rejectHandler = (...args) => {
    error = options.multiArgs ? args : args[0];
    if (nextQueue.length > 0) {
      const { reject: reject2 } = nextQueue.shift();
      reject2(error);
    } else {
      hasPendingError = true;
    }
    cancel();
  };
  const resolveHandler = (...args) => {
    const value = options.multiArgs ? args : args[0];
    if (options.filter && !options.filter(value)) {
      return;
    }
    if (nextQueue.length > 0) {
      const { resolve: resolve2 } = nextQueue.shift();
      resolve2({ done: true, value });
    } else {
      valueQueue.push(value);
    }
    cancel();
  };
  for (const event2 of events) {
    addListener(event2, valueHandler);
  }
  for (const rejectionEvent of options.rejectionEvents) {
    addListener(rejectionEvent, rejectHandler);
  }
  for (const resolutionEvent of options.resolutionEvents) {
    addListener(resolutionEvent, resolveHandler);
  }
  return {
    [symbolAsyncIterator]() {
      return this;
    },
    next() {
      if (valueQueue.length > 0) {
        const value = valueQueue.shift();
        return Promise.resolve({ done: done2 && valueQueue.length === 0 && !isLimitReached, value });
      }
      if (hasPendingError) {
        hasPendingError = false;
        return Promise.reject(error);
      }
      if (done2) {
        return Promise.resolve({ done: true, value: void 0 });
      }
      return new Promise((resolve2, reject2) => nextQueue.push({ resolve: resolve2, reject: reject2 }));
    },
    return(value) {
      cancel();
      return Promise.resolve({ done: done2, value });
    }
  };
};
var fileType$1 = { exports: {} };
var util = {};
util.stringToBytes = (string) => [...string].map((character) => character.charCodeAt(0));
const uint8ArrayUtf8ByteString = (array, start, end2) => {
  return String.fromCharCode(...array.slice(start, end2));
};
util.readUInt64LE = (buffer2, offset = 0) => {
  let n = buffer2[offset];
  let mul = 1;
  let i = 0;
  while (++i < 8) {
    mul *= 256;
    n += buffer2[offset + i] * mul;
  }
  return n;
};
util.tarHeaderChecksumMatches = (buffer2) => {
  if (buffer2.length < 512) {
    return false;
  }
  const MASK_8TH_BIT = 128;
  let sum = 256;
  let signedBitSum = 0;
  for (let i = 0; i < 148; i++) {
    const byte = buffer2[i];
    sum += byte;
    signedBitSum += byte & MASK_8TH_BIT;
  }
  for (let i = 156; i < 512; i++) {
    const byte = buffer2[i];
    sum += byte;
    signedBitSum += byte & MASK_8TH_BIT;
  }
  const readSum = parseInt(uint8ArrayUtf8ByteString(buffer2, 148, 154), 8);
  return readSum === sum || readSum === sum - (signedBitSum << 1);
};
util.uint8ArrayUtf8ByteString = uint8ArrayUtf8ByteString;
(function(module) {
  const { stringToBytes, readUInt64LE, tarHeaderChecksumMatches, uint8ArrayUtf8ByteString } = util;
  const xpiZipFilename = stringToBytes("META-INF/mozilla.rsa");
  const oxmlContentTypes = stringToBytes("[Content_Types].xml");
  const oxmlRels = stringToBytes("_rels/.rels");
  const fileType = (input) => {
    if (!(input instanceof Uint8Array || input instanceof ArrayBuffer || Buffer.isBuffer(input))) {
      throw new TypeError(`Expected the \`input\` argument to be of type \`Uint8Array\` or \`Buffer\` or \`ArrayBuffer\`, got \`${typeof input}\``);
    }
    const buffer2 = input instanceof Uint8Array ? input : new Uint8Array(input);
    if (!(buffer2 && buffer2.length > 1)) {
      return;
    }
    const check = (header, options) => {
      options = Object.assign({
        offset: 0
      }, options);
      for (let i = 0; i < header.length; i++) {
        if (options.mask) {
          if (header[i] !== (options.mask[i] & buffer2[i + options.offset])) {
            return false;
          }
        } else if (header[i] !== buffer2[i + options.offset]) {
          return false;
        }
      }
      return true;
    };
    const checkString = (header, options) => check(stringToBytes(header), options);
    if (check([255, 216, 255])) {
      return {
        ext: "jpg",
        mime: "image/jpeg"
      };
    }
    if (check([137, 80, 78, 71, 13, 10, 26, 10])) {
      return {
        ext: "png",
        mime: "image/png"
      };
    }
    if (check([71, 73, 70])) {
      return {
        ext: "gif",
        mime: "image/gif"
      };
    }
    if (check([87, 69, 66, 80], { offset: 8 })) {
      return {
        ext: "webp",
        mime: "image/webp"
      };
    }
    if (check([70, 76, 73, 70])) {
      return {
        ext: "flif",
        mime: "image/flif"
      };
    }
    if ((check([73, 73, 42, 0]) || check([77, 77, 0, 42])) && check([67, 82], { offset: 8 })) {
      return {
        ext: "cr2",
        mime: "image/x-canon-cr2"
      };
    }
    if (check([73, 73, 82, 79, 8, 0, 0, 0, 24])) {
      return {
        ext: "orf",
        mime: "image/x-olympus-orf"
      };
    }
    if (check([73, 73, 42, 0, 16, 251, 134, 1])) {
      return {
        ext: "arw",
        mime: "image/x-sony-arw"
      };
    }
    if (check([73, 73, 42, 0, 8, 0, 0, 0, 45])) {
      return {
        ext: "dng",
        mime: "image/x-adobe-dng"
      };
    }
    if (check([73, 73, 42, 0, 48, 61, 114, 1, 28])) {
      return {
        ext: "nef",
        mime: "image/x-nikon-nef"
      };
    }
    if (check([73, 73, 42, 0]) || check([77, 77, 0, 42])) {
      return {
        ext: "tif",
        mime: "image/tiff"
      };
    }
    if (check([66, 77])) {
      return {
        ext: "bmp",
        mime: "image/bmp"
      };
    }
    if (check([73, 73, 188])) {
      return {
        ext: "jxr",
        mime: "image/vnd.ms-photo"
      };
    }
    if (check([56, 66, 80, 83])) {
      return {
        ext: "psd",
        mime: "image/vnd.adobe.photoshop"
      };
    }
    if (check([80, 75, 3, 4])) {
      if (check([109, 105, 109, 101, 116, 121, 112, 101, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 101, 112, 117, 98, 43, 122, 105, 112], { offset: 30 })) {
        return {
          ext: "epub",
          mime: "application/epub+zip"
        };
      }
      if (check(xpiZipFilename, { offset: 30 })) {
        return {
          ext: "xpi",
          mime: "application/x-xpinstall"
        };
      }
      if (checkString("mimetypeapplication/vnd.oasis.opendocument.text", { offset: 30 })) {
        return {
          ext: "odt",
          mime: "application/vnd.oasis.opendocument.text"
        };
      }
      if (checkString("mimetypeapplication/vnd.oasis.opendocument.spreadsheet", { offset: 30 })) {
        return {
          ext: "ods",
          mime: "application/vnd.oasis.opendocument.spreadsheet"
        };
      }
      if (checkString("mimetypeapplication/vnd.oasis.opendocument.presentation", { offset: 30 })) {
        return {
          ext: "odp",
          mime: "application/vnd.oasis.opendocument.presentation"
        };
      }
      const findNextZipHeaderIndex = (arr, startAt = 0) => arr.findIndex((el, i, arr2) => i >= startAt && arr2[i] === 80 && arr2[i + 1] === 75 && arr2[i + 2] === 3 && arr2[i + 3] === 4);
      let zipHeaderIndex = 0;
      let oxmlFound = false;
      let type;
      do {
        const offset = zipHeaderIndex + 30;
        if (!oxmlFound) {
          oxmlFound = check(oxmlContentTypes, { offset }) || check(oxmlRels, { offset });
        }
        if (!type) {
          if (checkString("word/", { offset })) {
            type = {
              ext: "docx",
              mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            };
          } else if (checkString("ppt/", { offset })) {
            type = {
              ext: "pptx",
              mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            };
          } else if (checkString("xl/", { offset })) {
            type = {
              ext: "xlsx",
              mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            };
          }
        }
        if (oxmlFound && type) {
          return type;
        }
        zipHeaderIndex = findNextZipHeaderIndex(buffer2, offset);
      } while (zipHeaderIndex >= 0);
      if (type) {
        return type;
      }
    }
    if (check([80, 75]) && (buffer2[2] === 3 || buffer2[2] === 5 || buffer2[2] === 7) && (buffer2[3] === 4 || buffer2[3] === 6 || buffer2[3] === 8)) {
      return {
        ext: "zip",
        mime: "application/zip"
      };
    }
    if (check([48, 48, 48, 48, 48, 48], { offset: 148, mask: [248, 248, 248, 248, 248, 248] }) && tarHeaderChecksumMatches(buffer2)) {
      return {
        ext: "tar",
        mime: "application/x-tar"
      };
    }
    if (check([82, 97, 114, 33, 26, 7]) && (buffer2[6] === 0 || buffer2[6] === 1)) {
      return {
        ext: "rar",
        mime: "application/x-rar-compressed"
      };
    }
    if (check([31, 139, 8])) {
      return {
        ext: "gz",
        mime: "application/gzip"
      };
    }
    if (check([66, 90, 104])) {
      return {
        ext: "bz2",
        mime: "application/x-bzip2"
      };
    }
    if (check([55, 122, 188, 175, 39, 28])) {
      return {
        ext: "7z",
        mime: "application/x-7z-compressed"
      };
    }
    if (check([120, 1])) {
      return {
        ext: "dmg",
        mime: "application/x-apple-diskimage"
      };
    }
    if (check([102, 114, 101, 101], { offset: 4 }) || check([109, 100, 97, 116], { offset: 4 }) || check([109, 111, 111, 118], { offset: 4 }) || check([119, 105, 100, 101], { offset: 4 })) {
      return {
        ext: "mov",
        mime: "video/quicktime"
      };
    }
    if (check([102, 116, 121, 112], { offset: 4 }) && (buffer2[8] & 96) !== 0 && (buffer2[9] & 96) !== 0 && (buffer2[10] & 96) !== 0 && (buffer2[11] & 96) !== 0) {
      const brandMajor = uint8ArrayUtf8ByteString(buffer2, 8, 12);
      switch (brandMajor) {
        case "mif1":
          return { ext: "heic", mime: "image/heif" };
        case "msf1":
          return { ext: "heic", mime: "image/heif-sequence" };
        case "heic":
        case "heix":
          return { ext: "heic", mime: "image/heic" };
        case "hevc":
        case "hevx":
          return { ext: "heic", mime: "image/heic-sequence" };
        case "qt  ":
          return { ext: "mov", mime: "video/quicktime" };
        case "M4V ":
        case "M4VH":
        case "M4VP":
          return { ext: "m4v", mime: "video/x-m4v" };
        case "M4P ":
          return { ext: "m4p", mime: "video/mp4" };
        case "M4B ":
          return { ext: "m4b", mime: "audio/mp4" };
        case "M4A ":
          return { ext: "m4a", mime: "audio/x-m4a" };
        case "F4V ":
          return { ext: "f4v", mime: "video/mp4" };
        case "F4P ":
          return { ext: "f4p", mime: "video/mp4" };
        case "F4A ":
          return { ext: "f4a", mime: "audio/mp4" };
        case "F4B ":
          return { ext: "f4b", mime: "audio/mp4" };
        default:
          if (brandMajor.startsWith("3g")) {
            if (brandMajor.startsWith("3g2")) {
              return { ext: "3g2", mime: "video/3gpp2" };
            }
            return { ext: "3gp", mime: "video/3gpp" };
          }
          return { ext: "mp4", mime: "video/mp4" };
      }
    }
    if (check([77, 84, 104, 100])) {
      return {
        ext: "mid",
        mime: "audio/midi"
      };
    }
    if (check([26, 69, 223, 163])) {
      const sliced = buffer2.subarray(4, 4 + 4096);
      const idPos = sliced.findIndex((el, i, arr) => arr[i] === 66 && arr[i + 1] === 130);
      if (idPos !== -1) {
        const docTypePos = idPos + 3;
        const findDocType = (type) => [...type].every((c, i) => sliced[docTypePos + i] === c.charCodeAt(0));
        if (findDocType("matroska")) {
          return {
            ext: "mkv",
            mime: "video/x-matroska"
          };
        }
        if (findDocType("webm")) {
          return {
            ext: "webm",
            mime: "video/webm"
          };
        }
      }
    }
    if (check([82, 73, 70, 70])) {
      if (check([65, 86, 73], { offset: 8 })) {
        return {
          ext: "avi",
          mime: "video/vnd.avi"
        };
      }
      if (check([87, 65, 86, 69], { offset: 8 })) {
        return {
          ext: "wav",
          mime: "audio/vnd.wave"
        };
      }
      if (check([81, 76, 67, 77], { offset: 8 })) {
        return {
          ext: "qcp",
          mime: "audio/qcelp"
        };
      }
    }
    if (check([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
      let offset = 30;
      do {
        const objectSize = readUInt64LE(buffer2, offset + 16);
        if (check([145, 7, 220, 183, 183, 169, 207, 17, 142, 230, 0, 192, 12, 32, 83, 101], { offset })) {
          if (check([64, 158, 105, 248, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43], { offset: offset + 24 })) {
            return {
              ext: "wma",
              mime: "audio/x-ms-wma"
            };
          }
          if (check([192, 239, 25, 188, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43], { offset: offset + 24 })) {
            return {
              ext: "wmv",
              mime: "video/x-ms-asf"
            };
          }
          break;
        }
        offset += objectSize;
      } while (offset + 24 <= buffer2.length);
      return {
        ext: "asf",
        mime: "application/vnd.ms-asf"
      };
    }
    if (check([0, 0, 1, 186]) || check([0, 0, 1, 179])) {
      return {
        ext: "mpg",
        mime: "video/mpeg"
      };
    }
    for (let start = 0; start < 2 && start < buffer2.length - 16; start++) {
      if (check([73, 68, 51], { offset: start }) || check([255, 226], { offset: start, mask: [255, 230] })) {
        return {
          ext: "mp3",
          mime: "audio/mpeg"
        };
      }
      if (check([255, 228], { offset: start, mask: [255, 230] })) {
        return {
          ext: "mp2",
          mime: "audio/mpeg"
        };
      }
      if (check([255, 248], { offset: start, mask: [255, 252] })) {
        return {
          ext: "mp2",
          mime: "audio/mpeg"
        };
      }
      if (check([255, 240], { offset: start, mask: [255, 252] })) {
        return {
          ext: "mp4",
          mime: "audio/mpeg"
        };
      }
    }
    if (check([79, 112, 117, 115, 72, 101, 97, 100], { offset: 28 })) {
      return {
        ext: "opus",
        mime: "audio/opus"
      };
    }
    if (check([79, 103, 103, 83])) {
      if (check([128, 116, 104, 101, 111, 114, 97], { offset: 28 })) {
        return {
          ext: "ogv",
          mime: "video/ogg"
        };
      }
      if (check([1, 118, 105, 100, 101, 111, 0], { offset: 28 })) {
        return {
          ext: "ogm",
          mime: "video/ogg"
        };
      }
      if (check([127, 70, 76, 65, 67], { offset: 28 })) {
        return {
          ext: "oga",
          mime: "audio/ogg"
        };
      }
      if (check([83, 112, 101, 101, 120, 32, 32], { offset: 28 })) {
        return {
          ext: "spx",
          mime: "audio/ogg"
        };
      }
      if (check([1, 118, 111, 114, 98, 105, 115], { offset: 28 })) {
        return {
          ext: "ogg",
          mime: "audio/ogg"
        };
      }
      return {
        ext: "ogx",
        mime: "application/ogg"
      };
    }
    if (check([102, 76, 97, 67])) {
      return {
        ext: "flac",
        mime: "audio/x-flac"
      };
    }
    if (check([77, 65, 67, 32])) {
      return {
        ext: "ape",
        mime: "audio/ape"
      };
    }
    if (check([119, 118, 112, 107])) {
      return {
        ext: "wv",
        mime: "audio/wavpack"
      };
    }
    if (check([35, 33, 65, 77, 82, 10])) {
      return {
        ext: "amr",
        mime: "audio/amr"
      };
    }
    if (check([37, 80, 68, 70])) {
      return {
        ext: "pdf",
        mime: "application/pdf"
      };
    }
    if (check([77, 90])) {
      return {
        ext: "exe",
        mime: "application/x-msdownload"
      };
    }
    if ((buffer2[0] === 67 || buffer2[0] === 70) && check([87, 83], { offset: 1 })) {
      return {
        ext: "swf",
        mime: "application/x-shockwave-flash"
      };
    }
    if (check([123, 92, 114, 116, 102])) {
      return {
        ext: "rtf",
        mime: "application/rtf"
      };
    }
    if (check([0, 97, 115, 109])) {
      return {
        ext: "wasm",
        mime: "application/wasm"
      };
    }
    if (check([119, 79, 70, 70]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
      return {
        ext: "woff",
        mime: "font/woff"
      };
    }
    if (check([119, 79, 70, 50]) && (check([0, 1, 0, 0], { offset: 4 }) || check([79, 84, 84, 79], { offset: 4 }))) {
      return {
        ext: "woff2",
        mime: "font/woff2"
      };
    }
    if (check([76, 80], { offset: 34 }) && (check([0, 0, 1], { offset: 8 }) || check([1, 0, 2], { offset: 8 }) || check([2, 0, 2], { offset: 8 }))) {
      return {
        ext: "eot",
        mime: "application/vnd.ms-fontobject"
      };
    }
    if (check([0, 1, 0, 0, 0])) {
      return {
        ext: "ttf",
        mime: "font/ttf"
      };
    }
    if (check([79, 84, 84, 79, 0])) {
      return {
        ext: "otf",
        mime: "font/otf"
      };
    }
    if (check([0, 0, 1, 0])) {
      return {
        ext: "ico",
        mime: "image/x-icon"
      };
    }
    if (check([0, 0, 2, 0])) {
      return {
        ext: "cur",
        mime: "image/x-icon"
      };
    }
    if (check([70, 76, 86, 1])) {
      return {
        ext: "flv",
        mime: "video/x-flv"
      };
    }
    if (check([37, 33])) {
      return {
        ext: "ps",
        mime: "application/postscript"
      };
    }
    if (check([253, 55, 122, 88, 90, 0])) {
      return {
        ext: "xz",
        mime: "application/x-xz"
      };
    }
    if (check([83, 81, 76, 105])) {
      return {
        ext: "sqlite",
        mime: "application/x-sqlite3"
      };
    }
    if (check([78, 69, 83, 26])) {
      return {
        ext: "nes",
        mime: "application/x-nintendo-nes-rom"
      };
    }
    if (check([67, 114, 50, 52])) {
      return {
        ext: "crx",
        mime: "application/x-google-chrome-extension"
      };
    }
    if (check([77, 83, 67, 70]) || check([73, 83, 99, 40])) {
      return {
        ext: "cab",
        mime: "application/vnd.ms-cab-compressed"
      };
    }
    if (check([33, 60, 97, 114, 99, 104, 62, 10, 100, 101, 98, 105, 97, 110, 45, 98, 105, 110, 97, 114, 121])) {
      return {
        ext: "deb",
        mime: "application/x-deb"
      };
    }
    if (check([33, 60, 97, 114, 99, 104, 62])) {
      return {
        ext: "ar",
        mime: "application/x-unix-archive"
      };
    }
    if (check([237, 171, 238, 219])) {
      return {
        ext: "rpm",
        mime: "application/x-rpm"
      };
    }
    if (check([31, 160]) || check([31, 157])) {
      return {
        ext: "Z",
        mime: "application/x-compress"
      };
    }
    if (check([76, 90, 73, 80])) {
      return {
        ext: "lz",
        mime: "application/x-lzip"
      };
    }
    if (check([208, 207, 17, 224, 161, 177, 26, 225])) {
      return {
        ext: "msi",
        mime: "application/x-msi"
      };
    }
    if (check([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) {
      return {
        ext: "mxf",
        mime: "application/mxf"
      };
    }
    if (check([71], { offset: 4 }) && (check([71], { offset: 192 }) || check([71], { offset: 196 }))) {
      return {
        ext: "mts",
        mime: "video/mp2t"
      };
    }
    if (check([66, 76, 69, 78, 68, 69, 82])) {
      return {
        ext: "blend",
        mime: "application/x-blender"
      };
    }
    if (check([66, 80, 71, 251])) {
      return {
        ext: "bpg",
        mime: "image/bpg"
      };
    }
    if (check([0, 0, 0, 12, 106, 80, 32, 32, 13, 10, 135, 10])) {
      if (check([106, 112, 50, 32], { offset: 20 })) {
        return {
          ext: "jp2",
          mime: "image/jp2"
        };
      }
      if (check([106, 112, 120, 32], { offset: 20 })) {
        return {
          ext: "jpx",
          mime: "image/jpx"
        };
      }
      if (check([106, 112, 109, 32], { offset: 20 })) {
        return {
          ext: "jpm",
          mime: "image/jpm"
        };
      }
      if (check([109, 106, 112, 50], { offset: 20 })) {
        return {
          ext: "mj2",
          mime: "image/mj2"
        };
      }
    }
    if (check([70, 79, 82, 77])) {
      return {
        ext: "aif",
        mime: "audio/aiff"
      };
    }
    if (checkString("<?xml ")) {
      return {
        ext: "xml",
        mime: "application/xml"
      };
    }
    if (check([66, 79, 79, 75, 77, 79, 66, 73], { offset: 60 })) {
      return {
        ext: "mobi",
        mime: "application/x-mobipocket-ebook"
      };
    }
    if (check([171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10])) {
      return {
        ext: "ktx",
        mime: "image/ktx"
      };
    }
    if (check([68, 73, 67, 77], { offset: 128 })) {
      return {
        ext: "dcm",
        mime: "application/dicom"
      };
    }
    if (check([77, 80, 43])) {
      return {
        ext: "mpc",
        mime: "audio/x-musepack"
      };
    }
    if (check([77, 80, 67, 75])) {
      return {
        ext: "mpc",
        mime: "audio/x-musepack"
      };
    }
    if (check([66, 69, 71, 73, 78, 58])) {
      return {
        ext: "ics",
        mime: "text/calendar"
      };
    }
    if (check([103, 108, 84, 70, 2, 0, 0, 0])) {
      return {
        ext: "glb",
        mime: "model/gltf-binary"
      };
    }
    if (check([212, 195, 178, 161]) || check([161, 178, 195, 212])) {
      return {
        ext: "pcap",
        mime: "application/vnd.tcpdump.pcap"
      };
    }
    if (check([68, 83, 68, 32])) {
      return {
        ext: "dsf",
        mime: "audio/x-dsf"
      };
    }
    if (check([76, 0, 0, 0, 1, 20, 2, 0, 0, 0, 0, 0, 192, 0, 0, 0, 0, 0, 0, 70])) {
      return {
        ext: "lnk",
        mime: "application/x.ms.shortcut"
      };
    }
    if (check([98, 111, 111, 107, 0, 0, 0, 0, 109, 97, 114, 107, 0, 0, 0, 0])) {
      return {
        ext: "alias",
        mime: "application/x.apple.alias"
      };
    }
    if (checkString("Creative Voice File")) {
      return {
        ext: "voc",
        mime: "audio/x-voc"
      };
    }
    if (check([11, 119])) {
      return {
        ext: "ac3",
        mime: "audio/vnd.dolby.dd-raw"
      };
    }
  };
  module.exports = fileType;
  Object.defineProperty(fileType, "minimumBytes", { value: 4100 });
  fileType.stream = (readableStream) => new Promise((resolve, reject) => {
    const stream = eval("require")("stream");
    readableStream.once("readable", () => {
      const pass = new stream.PassThrough();
      const chunk = readableStream.read(module.exports.minimumBytes) || readableStream.read();
      try {
        pass.fileType = fileType(chunk);
      } catch (error) {
        reject(error);
      }
      readableStream.unshift(chunk);
      if (stream.pipeline) {
        resolve(stream.pipeline(readableStream, pass, () => {
        }));
      } else {
        resolve(readableStream.pipe(pass));
      }
    });
  });
})(fileType$1);
var extName$1 = { exports: {} };
var mimeDb$1 = { exports: {} };
const require$$0 = {
  "application/1d-interleaved-parityfec": {
    source: "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/3gpp-ims+xml": {
    source: "iana",
    compressible: true
  },
  "application/3gpphal+json": {
    source: "iana",
    compressible: true
  },
  "application/3gpphalforms+json": {
    source: "iana",
    compressible: true
  },
  "application/a2l": {
    source: "iana"
  },
  "application/ace+cbor": {
    source: "iana"
  },
  "application/activemessage": {
    source: "iana"
  },
  "application/activity+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-costmap+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-costmapfilter+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-directory+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-endpointcost+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-endpointcostparams+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-endpointprop+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-endpointpropparams+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-error+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-networkmap+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-networkmapfilter+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-updatestreamcontrol+json": {
    source: "iana",
    compressible: true
  },
  "application/alto-updatestreamparams+json": {
    source: "iana",
    compressible: true
  },
  "application/aml": {
    source: "iana"
  },
  "application/andrew-inset": {
    source: "iana",
    extensions: [
      "ez"
    ]
  },
  "application/applefile": {
    source: "iana"
  },
  "application/applixware": {
    source: "apache",
    extensions: [
      "aw"
    ]
  },
  "application/at+jwt": {
    source: "iana"
  },
  "application/atf": {
    source: "iana"
  },
  "application/atfx": {
    source: "iana"
  },
  "application/atom+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "atom"
    ]
  },
  "application/atomcat+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "atomcat"
    ]
  },
  "application/atomdeleted+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "atomdeleted"
    ]
  },
  "application/atomicmail": {
    source: "iana"
  },
  "application/atomsvc+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "atomsvc"
    ]
  },
  "application/atsc-dwd+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "dwd"
    ]
  },
  "application/atsc-dynamic-event-message": {
    source: "iana"
  },
  "application/atsc-held+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "held"
    ]
  },
  "application/atsc-rdt+json": {
    source: "iana",
    compressible: true
  },
  "application/atsc-rsat+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rsat"
    ]
  },
  "application/atxml": {
    source: "iana"
  },
  "application/auth-policy+xml": {
    source: "iana",
    compressible: true
  },
  "application/bacnet-xdd+zip": {
    source: "iana",
    compressible: false
  },
  "application/batch-smtp": {
    source: "iana"
  },
  "application/bdoc": {
    compressible: false,
    extensions: [
      "bdoc"
    ]
  },
  "application/beep+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/calendar+json": {
    source: "iana",
    compressible: true
  },
  "application/calendar+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xcs"
    ]
  },
  "application/call-completion": {
    source: "iana"
  },
  "application/cals-1840": {
    source: "iana"
  },
  "application/captive+json": {
    source: "iana",
    compressible: true
  },
  "application/cbor": {
    source: "iana"
  },
  "application/cbor-seq": {
    source: "iana"
  },
  "application/cccex": {
    source: "iana"
  },
  "application/ccmp+xml": {
    source: "iana",
    compressible: true
  },
  "application/ccxml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "ccxml"
    ]
  },
  "application/cdfx+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "cdfx"
    ]
  },
  "application/cdmi-capability": {
    source: "iana",
    extensions: [
      "cdmia"
    ]
  },
  "application/cdmi-container": {
    source: "iana",
    extensions: [
      "cdmic"
    ]
  },
  "application/cdmi-domain": {
    source: "iana",
    extensions: [
      "cdmid"
    ]
  },
  "application/cdmi-object": {
    source: "iana",
    extensions: [
      "cdmio"
    ]
  },
  "application/cdmi-queue": {
    source: "iana",
    extensions: [
      "cdmiq"
    ]
  },
  "application/cdni": {
    source: "iana"
  },
  "application/cea": {
    source: "iana"
  },
  "application/cea-2018+xml": {
    source: "iana",
    compressible: true
  },
  "application/cellml+xml": {
    source: "iana",
    compressible: true
  },
  "application/cfw": {
    source: "iana"
  },
  "application/city+json": {
    source: "iana",
    compressible: true
  },
  "application/clr": {
    source: "iana"
  },
  "application/clue+xml": {
    source: "iana",
    compressible: true
  },
  "application/clue_info+xml": {
    source: "iana",
    compressible: true
  },
  "application/cms": {
    source: "iana"
  },
  "application/cnrp+xml": {
    source: "iana",
    compressible: true
  },
  "application/coap-group+json": {
    source: "iana",
    compressible: true
  },
  "application/coap-payload": {
    source: "iana"
  },
  "application/commonground": {
    source: "iana"
  },
  "application/conference-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/cose": {
    source: "iana"
  },
  "application/cose-key": {
    source: "iana"
  },
  "application/cose-key-set": {
    source: "iana"
  },
  "application/cpl+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "cpl"
    ]
  },
  "application/csrattrs": {
    source: "iana"
  },
  "application/csta+xml": {
    source: "iana",
    compressible: true
  },
  "application/cstadata+xml": {
    source: "iana",
    compressible: true
  },
  "application/csvm+json": {
    source: "iana",
    compressible: true
  },
  "application/cu-seeme": {
    source: "apache",
    extensions: [
      "cu"
    ]
  },
  "application/cwt": {
    source: "iana"
  },
  "application/cybercash": {
    source: "iana"
  },
  "application/dart": {
    compressible: true
  },
  "application/dash+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mpd"
    ]
  },
  "application/dash-patch+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mpp"
    ]
  },
  "application/dashdelta": {
    source: "iana"
  },
  "application/davmount+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "davmount"
    ]
  },
  "application/dca-rft": {
    source: "iana"
  },
  "application/dcd": {
    source: "iana"
  },
  "application/dec-dx": {
    source: "iana"
  },
  "application/dialog-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/dicom": {
    source: "iana"
  },
  "application/dicom+json": {
    source: "iana",
    compressible: true
  },
  "application/dicom+xml": {
    source: "iana",
    compressible: true
  },
  "application/dii": {
    source: "iana"
  },
  "application/dit": {
    source: "iana"
  },
  "application/dns": {
    source: "iana"
  },
  "application/dns+json": {
    source: "iana",
    compressible: true
  },
  "application/dns-message": {
    source: "iana"
  },
  "application/docbook+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "dbk"
    ]
  },
  "application/dots+cbor": {
    source: "iana"
  },
  "application/dskpp+xml": {
    source: "iana",
    compressible: true
  },
  "application/dssc+der": {
    source: "iana",
    extensions: [
      "dssc"
    ]
  },
  "application/dssc+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xdssc"
    ]
  },
  "application/dvcs": {
    source: "iana"
  },
  "application/ecmascript": {
    source: "iana",
    compressible: true,
    extensions: [
      "es",
      "ecma"
    ]
  },
  "application/edi-consent": {
    source: "iana"
  },
  "application/edi-x12": {
    source: "iana",
    compressible: false
  },
  "application/edifact": {
    source: "iana",
    compressible: false
  },
  "application/efi": {
    source: "iana"
  },
  "application/elm+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/elm+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.cap+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/emergencycalldata.comment+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.control+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.deviceinfo+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.ecall.msd": {
    source: "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.serviceinfo+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    source: "iana",
    compressible: true
  },
  "application/emergencycalldata.veds+xml": {
    source: "iana",
    compressible: true
  },
  "application/emma+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "emma"
    ]
  },
  "application/emotionml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "emotionml"
    ]
  },
  "application/encaprtp": {
    source: "iana"
  },
  "application/epp+xml": {
    source: "iana",
    compressible: true
  },
  "application/epub+zip": {
    source: "iana",
    compressible: false,
    extensions: [
      "epub"
    ]
  },
  "application/eshop": {
    source: "iana"
  },
  "application/exi": {
    source: "iana",
    extensions: [
      "exi"
    ]
  },
  "application/expect-ct-report+json": {
    source: "iana",
    compressible: true
  },
  "application/express": {
    source: "iana",
    extensions: [
      "exp"
    ]
  },
  "application/fastinfoset": {
    source: "iana"
  },
  "application/fastsoap": {
    source: "iana"
  },
  "application/fdt+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "fdt"
    ]
  },
  "application/fhir+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/fhir+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/fido.trusted-apps+json": {
    compressible: true
  },
  "application/fits": {
    source: "iana"
  },
  "application/flexfec": {
    source: "iana"
  },
  "application/font-sfnt": {
    source: "iana"
  },
  "application/font-tdpfr": {
    source: "iana",
    extensions: [
      "pfr"
    ]
  },
  "application/font-woff": {
    source: "iana",
    compressible: false
  },
  "application/framework-attributes+xml": {
    source: "iana",
    compressible: true
  },
  "application/geo+json": {
    source: "iana",
    compressible: true,
    extensions: [
      "geojson"
    ]
  },
  "application/geo+json-seq": {
    source: "iana"
  },
  "application/geopackage+sqlite3": {
    source: "iana"
  },
  "application/geoxacml+xml": {
    source: "iana",
    compressible: true
  },
  "application/gltf-buffer": {
    source: "iana"
  },
  "application/gml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "gml"
    ]
  },
  "application/gpx+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "gpx"
    ]
  },
  "application/gxf": {
    source: "apache",
    extensions: [
      "gxf"
    ]
  },
  "application/gzip": {
    source: "iana",
    compressible: false,
    extensions: [
      "gz"
    ]
  },
  "application/h224": {
    source: "iana"
  },
  "application/held+xml": {
    source: "iana",
    compressible: true
  },
  "application/hjson": {
    extensions: [
      "hjson"
    ]
  },
  "application/http": {
    source: "iana"
  },
  "application/hyperstudio": {
    source: "iana",
    extensions: [
      "stk"
    ]
  },
  "application/ibe-key-request+xml": {
    source: "iana",
    compressible: true
  },
  "application/ibe-pkg-reply+xml": {
    source: "iana",
    compressible: true
  },
  "application/ibe-pp-data": {
    source: "iana"
  },
  "application/iges": {
    source: "iana"
  },
  "application/im-iscomposing+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/index": {
    source: "iana"
  },
  "application/index.cmd": {
    source: "iana"
  },
  "application/index.obj": {
    source: "iana"
  },
  "application/index.response": {
    source: "iana"
  },
  "application/index.vnd": {
    source: "iana"
  },
  "application/inkml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "ink",
      "inkml"
    ]
  },
  "application/iotp": {
    source: "iana"
  },
  "application/ipfix": {
    source: "iana",
    extensions: [
      "ipfix"
    ]
  },
  "application/ipp": {
    source: "iana"
  },
  "application/isup": {
    source: "iana"
  },
  "application/its+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "its"
    ]
  },
  "application/java-archive": {
    source: "apache",
    compressible: false,
    extensions: [
      "jar",
      "war",
      "ear"
    ]
  },
  "application/java-serialized-object": {
    source: "apache",
    compressible: false,
    extensions: [
      "ser"
    ]
  },
  "application/java-vm": {
    source: "apache",
    compressible: false,
    extensions: [
      "class"
    ]
  },
  "application/javascript": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "js",
      "mjs"
    ]
  },
  "application/jf2feed+json": {
    source: "iana",
    compressible: true
  },
  "application/jose": {
    source: "iana"
  },
  "application/jose+json": {
    source: "iana",
    compressible: true
  },
  "application/jrd+json": {
    source: "iana",
    compressible: true
  },
  "application/jscalendar+json": {
    source: "iana",
    compressible: true
  },
  "application/json": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "json",
      "map"
    ]
  },
  "application/json-patch+json": {
    source: "iana",
    compressible: true
  },
  "application/json-seq": {
    source: "iana"
  },
  "application/json5": {
    extensions: [
      "json5"
    ]
  },
  "application/jsonml+json": {
    source: "apache",
    compressible: true,
    extensions: [
      "jsonml"
    ]
  },
  "application/jwk+json": {
    source: "iana",
    compressible: true
  },
  "application/jwk-set+json": {
    source: "iana",
    compressible: true
  },
  "application/jwt": {
    source: "iana"
  },
  "application/kpml-request+xml": {
    source: "iana",
    compressible: true
  },
  "application/kpml-response+xml": {
    source: "iana",
    compressible: true
  },
  "application/ld+json": {
    source: "iana",
    compressible: true,
    extensions: [
      "jsonld"
    ]
  },
  "application/lgr+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "lgr"
    ]
  },
  "application/link-format": {
    source: "iana"
  },
  "application/load-control+xml": {
    source: "iana",
    compressible: true
  },
  "application/lost+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "lostxml"
    ]
  },
  "application/lostsync+xml": {
    source: "iana",
    compressible: true
  },
  "application/lpf+zip": {
    source: "iana",
    compressible: false
  },
  "application/lxf": {
    source: "iana"
  },
  "application/mac-binhex40": {
    source: "iana",
    extensions: [
      "hqx"
    ]
  },
  "application/mac-compactpro": {
    source: "apache",
    extensions: [
      "cpt"
    ]
  },
  "application/macwriteii": {
    source: "iana"
  },
  "application/mads+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mads"
    ]
  },
  "application/manifest+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "webmanifest"
    ]
  },
  "application/marc": {
    source: "iana",
    extensions: [
      "mrc"
    ]
  },
  "application/marcxml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mrcx"
    ]
  },
  "application/mathematica": {
    source: "iana",
    extensions: [
      "ma",
      "nb",
      "mb"
    ]
  },
  "application/mathml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mathml"
    ]
  },
  "application/mathml-content+xml": {
    source: "iana",
    compressible: true
  },
  "application/mathml-presentation+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-associated-procedure-description+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-deregister+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-envelope+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-msk+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-msk-response+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-protection-description+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-reception-report+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-register+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-register-response+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-schedule+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbms-user-service-description+xml": {
    source: "iana",
    compressible: true
  },
  "application/mbox": {
    source: "iana",
    extensions: [
      "mbox"
    ]
  },
  "application/media-policy-dataset+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mpf"
    ]
  },
  "application/media_control+xml": {
    source: "iana",
    compressible: true
  },
  "application/mediaservercontrol+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mscml"
    ]
  },
  "application/merge-patch+json": {
    source: "iana",
    compressible: true
  },
  "application/metalink+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "metalink"
    ]
  },
  "application/metalink4+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "meta4"
    ]
  },
  "application/mets+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mets"
    ]
  },
  "application/mf4": {
    source: "iana"
  },
  "application/mikey": {
    source: "iana"
  },
  "application/mipc": {
    source: "iana"
  },
  "application/missing-blocks+cbor-seq": {
    source: "iana"
  },
  "application/mmt-aei+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "maei"
    ]
  },
  "application/mmt-usd+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "musd"
    ]
  },
  "application/mods+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mods"
    ]
  },
  "application/moss-keys": {
    source: "iana"
  },
  "application/moss-signature": {
    source: "iana"
  },
  "application/mosskey-data": {
    source: "iana"
  },
  "application/mosskey-request": {
    source: "iana"
  },
  "application/mp21": {
    source: "iana",
    extensions: [
      "m21",
      "mp21"
    ]
  },
  "application/mp4": {
    source: "iana",
    extensions: [
      "mp4s",
      "m4p"
    ]
  },
  "application/mpeg4-generic": {
    source: "iana"
  },
  "application/mpeg4-iod": {
    source: "iana"
  },
  "application/mpeg4-iod-xmt": {
    source: "iana"
  },
  "application/mrb-consumer+xml": {
    source: "iana",
    compressible: true
  },
  "application/mrb-publish+xml": {
    source: "iana",
    compressible: true
  },
  "application/msc-ivr+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/msc-mixer+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/msword": {
    source: "iana",
    compressible: false,
    extensions: [
      "doc",
      "dot"
    ]
  },
  "application/mud+json": {
    source: "iana",
    compressible: true
  },
  "application/multipart-core": {
    source: "iana"
  },
  "application/mxf": {
    source: "iana",
    extensions: [
      "mxf"
    ]
  },
  "application/n-quads": {
    source: "iana",
    extensions: [
      "nq"
    ]
  },
  "application/n-triples": {
    source: "iana",
    extensions: [
      "nt"
    ]
  },
  "application/nasdata": {
    source: "iana"
  },
  "application/news-checkgroups": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-groupinfo": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-transmission": {
    source: "iana"
  },
  "application/nlsml+xml": {
    source: "iana",
    compressible: true
  },
  "application/node": {
    source: "iana",
    extensions: [
      "cjs"
    ]
  },
  "application/nss": {
    source: "iana"
  },
  "application/oauth-authz-req+jwt": {
    source: "iana"
  },
  "application/oblivious-dns-message": {
    source: "iana"
  },
  "application/ocsp-request": {
    source: "iana"
  },
  "application/ocsp-response": {
    source: "iana"
  },
  "application/octet-stream": {
    source: "iana",
    compressible: false,
    extensions: [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer"
    ]
  },
  "application/oda": {
    source: "iana",
    extensions: [
      "oda"
    ]
  },
  "application/odm+xml": {
    source: "iana",
    compressible: true
  },
  "application/odx": {
    source: "iana"
  },
  "application/oebps-package+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "opf"
    ]
  },
  "application/ogg": {
    source: "iana",
    compressible: false,
    extensions: [
      "ogx"
    ]
  },
  "application/omdoc+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "omdoc"
    ]
  },
  "application/onenote": {
    source: "apache",
    extensions: [
      "onetoc",
      "onetoc2",
      "onetmp",
      "onepkg"
    ]
  },
  "application/opc-nodeset+xml": {
    source: "iana",
    compressible: true
  },
  "application/oscore": {
    source: "iana"
  },
  "application/oxps": {
    source: "iana",
    extensions: [
      "oxps"
    ]
  },
  "application/p21": {
    source: "iana"
  },
  "application/p21+zip": {
    source: "iana",
    compressible: false
  },
  "application/p2p-overlay+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "relo"
    ]
  },
  "application/parityfec": {
    source: "iana"
  },
  "application/passport": {
    source: "iana"
  },
  "application/patch-ops-error+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xer"
    ]
  },
  "application/pdf": {
    source: "iana",
    compressible: false,
    extensions: [
      "pdf"
    ]
  },
  "application/pdx": {
    source: "iana"
  },
  "application/pem-certificate-chain": {
    source: "iana"
  },
  "application/pgp-encrypted": {
    source: "iana",
    compressible: false,
    extensions: [
      "pgp"
    ]
  },
  "application/pgp-keys": {
    source: "iana",
    extensions: [
      "asc"
    ]
  },
  "application/pgp-signature": {
    source: "iana",
    extensions: [
      "asc",
      "sig"
    ]
  },
  "application/pics-rules": {
    source: "apache",
    extensions: [
      "prf"
    ]
  },
  "application/pidf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/pidf-diff+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/pkcs10": {
    source: "iana",
    extensions: [
      "p10"
    ]
  },
  "application/pkcs12": {
    source: "iana"
  },
  "application/pkcs7-mime": {
    source: "iana",
    extensions: [
      "p7m",
      "p7c"
    ]
  },
  "application/pkcs7-signature": {
    source: "iana",
    extensions: [
      "p7s"
    ]
  },
  "application/pkcs8": {
    source: "iana",
    extensions: [
      "p8"
    ]
  },
  "application/pkcs8-encrypted": {
    source: "iana"
  },
  "application/pkix-attr-cert": {
    source: "iana",
    extensions: [
      "ac"
    ]
  },
  "application/pkix-cert": {
    source: "iana",
    extensions: [
      "cer"
    ]
  },
  "application/pkix-crl": {
    source: "iana",
    extensions: [
      "crl"
    ]
  },
  "application/pkix-pkipath": {
    source: "iana",
    extensions: [
      "pkipath"
    ]
  },
  "application/pkixcmp": {
    source: "iana",
    extensions: [
      "pki"
    ]
  },
  "application/pls+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "pls"
    ]
  },
  "application/poc-settings+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/postscript": {
    source: "iana",
    compressible: true,
    extensions: [
      "ai",
      "eps",
      "ps"
    ]
  },
  "application/ppsp-tracker+json": {
    source: "iana",
    compressible: true
  },
  "application/problem+json": {
    source: "iana",
    compressible: true
  },
  "application/problem+xml": {
    source: "iana",
    compressible: true
  },
  "application/provenance+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "provx"
    ]
  },
  "application/prs.alvestrand.titrax-sheet": {
    source: "iana"
  },
  "application/prs.cww": {
    source: "iana",
    extensions: [
      "cww"
    ]
  },
  "application/prs.cyn": {
    source: "iana",
    charset: "7-BIT"
  },
  "application/prs.hpub+zip": {
    source: "iana",
    compressible: false
  },
  "application/prs.nprend": {
    source: "iana"
  },
  "application/prs.plucker": {
    source: "iana"
  },
  "application/prs.rdf-xml-crypt": {
    source: "iana"
  },
  "application/prs.xsf+xml": {
    source: "iana",
    compressible: true
  },
  "application/pskc+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "pskcxml"
    ]
  },
  "application/pvd+json": {
    source: "iana",
    compressible: true
  },
  "application/qsig": {
    source: "iana"
  },
  "application/raml+yaml": {
    compressible: true,
    extensions: [
      "raml"
    ]
  },
  "application/raptorfec": {
    source: "iana"
  },
  "application/rdap+json": {
    source: "iana",
    compressible: true
  },
  "application/rdf+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rdf",
      "owl"
    ]
  },
  "application/reginfo+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rif"
    ]
  },
  "application/relax-ng-compact-syntax": {
    source: "iana",
    extensions: [
      "rnc"
    ]
  },
  "application/remote-printing": {
    source: "iana"
  },
  "application/reputon+json": {
    source: "iana",
    compressible: true
  },
  "application/resource-lists+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rl"
    ]
  },
  "application/resource-lists-diff+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rld"
    ]
  },
  "application/rfc+xml": {
    source: "iana",
    compressible: true
  },
  "application/riscos": {
    source: "iana"
  },
  "application/rlmi+xml": {
    source: "iana",
    compressible: true
  },
  "application/rls-services+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rs"
    ]
  },
  "application/route-apd+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rapd"
    ]
  },
  "application/route-s-tsid+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "sls"
    ]
  },
  "application/route-usd+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rusd"
    ]
  },
  "application/rpki-ghostbusters": {
    source: "iana",
    extensions: [
      "gbr"
    ]
  },
  "application/rpki-manifest": {
    source: "iana",
    extensions: [
      "mft"
    ]
  },
  "application/rpki-publication": {
    source: "iana"
  },
  "application/rpki-roa": {
    source: "iana",
    extensions: [
      "roa"
    ]
  },
  "application/rpki-updown": {
    source: "iana"
  },
  "application/rsd+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "rsd"
    ]
  },
  "application/rss+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "rss"
    ]
  },
  "application/rtf": {
    source: "iana",
    compressible: true,
    extensions: [
      "rtf"
    ]
  },
  "application/rtploopback": {
    source: "iana"
  },
  "application/rtx": {
    source: "iana"
  },
  "application/samlassertion+xml": {
    source: "iana",
    compressible: true
  },
  "application/samlmetadata+xml": {
    source: "iana",
    compressible: true
  },
  "application/sarif+json": {
    source: "iana",
    compressible: true
  },
  "application/sarif-external-properties+json": {
    source: "iana",
    compressible: true
  },
  "application/sbe": {
    source: "iana"
  },
  "application/sbml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "sbml"
    ]
  },
  "application/scaip+xml": {
    source: "iana",
    compressible: true
  },
  "application/scim+json": {
    source: "iana",
    compressible: true
  },
  "application/scvp-cv-request": {
    source: "iana",
    extensions: [
      "scq"
    ]
  },
  "application/scvp-cv-response": {
    source: "iana",
    extensions: [
      "scs"
    ]
  },
  "application/scvp-vp-request": {
    source: "iana",
    extensions: [
      "spq"
    ]
  },
  "application/scvp-vp-response": {
    source: "iana",
    extensions: [
      "spp"
    ]
  },
  "application/sdp": {
    source: "iana",
    extensions: [
      "sdp"
    ]
  },
  "application/secevent+jwt": {
    source: "iana"
  },
  "application/senml+cbor": {
    source: "iana"
  },
  "application/senml+json": {
    source: "iana",
    compressible: true
  },
  "application/senml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "senmlx"
    ]
  },
  "application/senml-etch+cbor": {
    source: "iana"
  },
  "application/senml-etch+json": {
    source: "iana",
    compressible: true
  },
  "application/senml-exi": {
    source: "iana"
  },
  "application/sensml+cbor": {
    source: "iana"
  },
  "application/sensml+json": {
    source: "iana",
    compressible: true
  },
  "application/sensml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "sensmlx"
    ]
  },
  "application/sensml-exi": {
    source: "iana"
  },
  "application/sep+xml": {
    source: "iana",
    compressible: true
  },
  "application/sep-exi": {
    source: "iana"
  },
  "application/session-info": {
    source: "iana"
  },
  "application/set-payment": {
    source: "iana"
  },
  "application/set-payment-initiation": {
    source: "iana",
    extensions: [
      "setpay"
    ]
  },
  "application/set-registration": {
    source: "iana"
  },
  "application/set-registration-initiation": {
    source: "iana",
    extensions: [
      "setreg"
    ]
  },
  "application/sgml": {
    source: "iana"
  },
  "application/sgml-open-catalog": {
    source: "iana"
  },
  "application/shf+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "shf"
    ]
  },
  "application/sieve": {
    source: "iana",
    extensions: [
      "siv",
      "sieve"
    ]
  },
  "application/simple-filter+xml": {
    source: "iana",
    compressible: true
  },
  "application/simple-message-summary": {
    source: "iana"
  },
  "application/simplesymbolcontainer": {
    source: "iana"
  },
  "application/sipc": {
    source: "iana"
  },
  "application/slate": {
    source: "iana"
  },
  "application/smil": {
    source: "iana"
  },
  "application/smil+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "smi",
      "smil"
    ]
  },
  "application/smpte336m": {
    source: "iana"
  },
  "application/soap+fastinfoset": {
    source: "iana"
  },
  "application/soap+xml": {
    source: "iana",
    compressible: true
  },
  "application/sparql-query": {
    source: "iana",
    extensions: [
      "rq"
    ]
  },
  "application/sparql-results+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "srx"
    ]
  },
  "application/spdx+json": {
    source: "iana",
    compressible: true
  },
  "application/spirits-event+xml": {
    source: "iana",
    compressible: true
  },
  "application/sql": {
    source: "iana"
  },
  "application/srgs": {
    source: "iana",
    extensions: [
      "gram"
    ]
  },
  "application/srgs+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "grxml"
    ]
  },
  "application/sru+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "sru"
    ]
  },
  "application/ssdl+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "ssdl"
    ]
  },
  "application/ssml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "ssml"
    ]
  },
  "application/stix+json": {
    source: "iana",
    compressible: true
  },
  "application/swid+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "swidtag"
    ]
  },
  "application/tamp-apex-update": {
    source: "iana"
  },
  "application/tamp-apex-update-confirm": {
    source: "iana"
  },
  "application/tamp-community-update": {
    source: "iana"
  },
  "application/tamp-community-update-confirm": {
    source: "iana"
  },
  "application/tamp-error": {
    source: "iana"
  },
  "application/tamp-sequence-adjust": {
    source: "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    source: "iana"
  },
  "application/tamp-status-query": {
    source: "iana"
  },
  "application/tamp-status-response": {
    source: "iana"
  },
  "application/tamp-update": {
    source: "iana"
  },
  "application/tamp-update-confirm": {
    source: "iana"
  },
  "application/tar": {
    compressible: true
  },
  "application/taxii+json": {
    source: "iana",
    compressible: true
  },
  "application/td+json": {
    source: "iana",
    compressible: true
  },
  "application/tei+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "tei",
      "teicorpus"
    ]
  },
  "application/tetra_isi": {
    source: "iana"
  },
  "application/thraud+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "tfi"
    ]
  },
  "application/timestamp-query": {
    source: "iana"
  },
  "application/timestamp-reply": {
    source: "iana"
  },
  "application/timestamped-data": {
    source: "iana",
    extensions: [
      "tsd"
    ]
  },
  "application/tlsrpt+gzip": {
    source: "iana"
  },
  "application/tlsrpt+json": {
    source: "iana",
    compressible: true
  },
  "application/tnauthlist": {
    source: "iana"
  },
  "application/token-introspection+jwt": {
    source: "iana"
  },
  "application/toml": {
    compressible: true,
    extensions: [
      "toml"
    ]
  },
  "application/trickle-ice-sdpfrag": {
    source: "iana"
  },
  "application/trig": {
    source: "iana",
    extensions: [
      "trig"
    ]
  },
  "application/ttml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "ttml"
    ]
  },
  "application/tve-trigger": {
    source: "iana"
  },
  "application/tzif": {
    source: "iana"
  },
  "application/tzif-leap": {
    source: "iana"
  },
  "application/ubjson": {
    compressible: false,
    extensions: [
      "ubj"
    ]
  },
  "application/ulpfec": {
    source: "iana"
  },
  "application/urc-grpsheet+xml": {
    source: "iana",
    compressible: true
  },
  "application/urc-ressheet+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "rsheet"
    ]
  },
  "application/urc-targetdesc+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "td"
    ]
  },
  "application/urc-uisocketdesc+xml": {
    source: "iana",
    compressible: true
  },
  "application/vcard+json": {
    source: "iana",
    compressible: true
  },
  "application/vcard+xml": {
    source: "iana",
    compressible: true
  },
  "application/vemmi": {
    source: "iana"
  },
  "application/vividence.scriptfile": {
    source: "apache"
  },
  "application/vnd.1000minds.decision-model+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "1km"
    ]
  },
  "application/vnd.3gpp-prose+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp-v2x-local-service-information": {
    source: "iana"
  },
  "application/vnd.3gpp.5gnas": {
    source: "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.bsf+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.gmop+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.gtpc": {
    source: "iana"
  },
  "application/vnd.3gpp.interworking-data": {
    source: "iana"
  },
  "application/vnd.3gpp.lpp": {
    source: "iana"
  },
  "application/vnd.3gpp.mc-signalling-ear": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcdata-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcdata-payload": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcdata-signalling": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-signed+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.mid-call+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.ngap": {
    source: "iana"
  },
  "application/vnd.3gpp.pfcp": {
    source: "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    source: "iana",
    extensions: [
      "plb"
    ]
  },
  "application/vnd.3gpp.pic-bw-small": {
    source: "iana",
    extensions: [
      "psb"
    ]
  },
  "application/vnd.3gpp.pic-bw-var": {
    source: "iana",
    extensions: [
      "pvb"
    ]
  },
  "application/vnd.3gpp.s1ap": {
    source: "iana"
  },
  "application/vnd.3gpp.sms": {
    source: "iana"
  },
  "application/vnd.3gpp.sms+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp.ussd+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.3gpp2.sms": {
    source: "iana"
  },
  "application/vnd.3gpp2.tcap": {
    source: "iana",
    extensions: [
      "tcap"
    ]
  },
  "application/vnd.3lightssoftware.imagescal": {
    source: "iana"
  },
  "application/vnd.3m.post-it-notes": {
    source: "iana",
    extensions: [
      "pwn"
    ]
  },
  "application/vnd.accpac.simply.aso": {
    source: "iana",
    extensions: [
      "aso"
    ]
  },
  "application/vnd.accpac.simply.imp": {
    source: "iana",
    extensions: [
      "imp"
    ]
  },
  "application/vnd.acucobol": {
    source: "iana",
    extensions: [
      "acu"
    ]
  },
  "application/vnd.acucorp": {
    source: "iana",
    extensions: [
      "atc",
      "acutc"
    ]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    source: "apache",
    compressible: false,
    extensions: [
      "air"
    ]
  },
  "application/vnd.adobe.flash.movie": {
    source: "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    source: "iana",
    extensions: [
      "fcdt"
    ]
  },
  "application/vnd.adobe.fxp": {
    source: "iana",
    extensions: [
      "fxp",
      "fxpl"
    ]
  },
  "application/vnd.adobe.partial-upload": {
    source: "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xdp"
    ]
  },
  "application/vnd.adobe.xfdf": {
    source: "iana",
    extensions: [
      "xfdf"
    ]
  },
  "application/vnd.aether.imp": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata-pagedef": {
    source: "iana"
  },
  "application/vnd.afpc.cmoca-cmresource": {
    source: "iana"
  },
  "application/vnd.afpc.foca-charset": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codedfont": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codepage": {
    source: "iana"
  },
  "application/vnd.afpc.modca": {
    source: "iana"
  },
  "application/vnd.afpc.modca-cmtable": {
    source: "iana"
  },
  "application/vnd.afpc.modca-formdef": {
    source: "iana"
  },
  "application/vnd.afpc.modca-mediummap": {
    source: "iana"
  },
  "application/vnd.afpc.modca-objectcontainer": {
    source: "iana"
  },
  "application/vnd.afpc.modca-overlay": {
    source: "iana"
  },
  "application/vnd.afpc.modca-pagesegment": {
    source: "iana"
  },
  "application/vnd.age": {
    source: "iana",
    extensions: [
      "age"
    ]
  },
  "application/vnd.ah-barcode": {
    source: "iana"
  },
  "application/vnd.ahead.space": {
    source: "iana",
    extensions: [
      "ahead"
    ]
  },
  "application/vnd.airzip.filesecure.azf": {
    source: "iana",
    extensions: [
      "azf"
    ]
  },
  "application/vnd.airzip.filesecure.azs": {
    source: "iana",
    extensions: [
      "azs"
    ]
  },
  "application/vnd.amadeus+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.amazon.ebook": {
    source: "apache",
    extensions: [
      "azw"
    ]
  },
  "application/vnd.amazon.mobi8-ebook": {
    source: "iana"
  },
  "application/vnd.americandynamics.acc": {
    source: "iana",
    extensions: [
      "acc"
    ]
  },
  "application/vnd.amiga.ami": {
    source: "iana",
    extensions: [
      "ami"
    ]
  },
  "application/vnd.amundsen.maze+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.android.ota": {
    source: "iana"
  },
  "application/vnd.android.package-archive": {
    source: "apache",
    compressible: false,
    extensions: [
      "apk"
    ]
  },
  "application/vnd.anki": {
    source: "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    source: "iana",
    extensions: [
      "cii"
    ]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    source: "apache",
    extensions: [
      "fti"
    ]
  },
  "application/vnd.antix.game-component": {
    source: "iana",
    extensions: [
      "atx"
    ]
  },
  "application/vnd.apache.arrow.file": {
    source: "iana"
  },
  "application/vnd.apache.arrow.stream": {
    source: "iana"
  },
  "application/vnd.apache.thrift.binary": {
    source: "iana"
  },
  "application/vnd.apache.thrift.compact": {
    source: "iana"
  },
  "application/vnd.apache.thrift.json": {
    source: "iana"
  },
  "application/vnd.api+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.aplextor.warrp+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.apothekende.reservation+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.apple.installer+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mpkg"
    ]
  },
  "application/vnd.apple.keynote": {
    source: "iana",
    extensions: [
      "key"
    ]
  },
  "application/vnd.apple.mpegurl": {
    source: "iana",
    extensions: [
      "m3u8"
    ]
  },
  "application/vnd.apple.numbers": {
    source: "iana",
    extensions: [
      "numbers"
    ]
  },
  "application/vnd.apple.pages": {
    source: "iana",
    extensions: [
      "pages"
    ]
  },
  "application/vnd.apple.pkpass": {
    compressible: false,
    extensions: [
      "pkpass"
    ]
  },
  "application/vnd.arastra.swi": {
    source: "iana"
  },
  "application/vnd.aristanetworks.swi": {
    source: "iana",
    extensions: [
      "swi"
    ]
  },
  "application/vnd.artisan+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.artsquare": {
    source: "iana"
  },
  "application/vnd.astraea-software.iota": {
    source: "iana",
    extensions: [
      "iota"
    ]
  },
  "application/vnd.audiograph": {
    source: "iana",
    extensions: [
      "aep"
    ]
  },
  "application/vnd.autopackage": {
    source: "iana"
  },
  "application/vnd.avalon+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.avistar+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.balsamiq.bmml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "bmml"
    ]
  },
  "application/vnd.balsamiq.bmpr": {
    source: "iana"
  },
  "application/vnd.banana-accounting": {
    source: "iana"
  },
  "application/vnd.bbf.usp.error": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.bekitzur-stech+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.bint.med-content": {
    source: "iana"
  },
  "application/vnd.biopax.rdf+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.blink-idb-value-wrapper": {
    source: "iana"
  },
  "application/vnd.blueice.multipass": {
    source: "iana",
    extensions: [
      "mpm"
    ]
  },
  "application/vnd.bluetooth.ep.oob": {
    source: "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    source: "iana"
  },
  "application/vnd.bmi": {
    source: "iana",
    extensions: [
      "bmi"
    ]
  },
  "application/vnd.bpf": {
    source: "iana"
  },
  "application/vnd.bpf3": {
    source: "iana"
  },
  "application/vnd.businessobjects": {
    source: "iana",
    extensions: [
      "rep"
    ]
  },
  "application/vnd.byu.uapi+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.cab-jscript": {
    source: "iana"
  },
  "application/vnd.canon-cpdl": {
    source: "iana"
  },
  "application/vnd.canon-lips": {
    source: "iana"
  },
  "application/vnd.capasystems-pg+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    source: "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    source: "iana"
  },
  "application/vnd.chemdraw+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "cdxml"
    ]
  },
  "application/vnd.chess-pgn": {
    source: "iana"
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    source: "iana",
    extensions: [
      "mmd"
    ]
  },
  "application/vnd.ciedi": {
    source: "iana"
  },
  "application/vnd.cinderella": {
    source: "iana",
    extensions: [
      "cdy"
    ]
  },
  "application/vnd.cirpack.isdn-ext": {
    source: "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "csl"
    ]
  },
  "application/vnd.claymore": {
    source: "iana",
    extensions: [
      "cla"
    ]
  },
  "application/vnd.cloanto.rp9": {
    source: "iana",
    extensions: [
      "rp9"
    ]
  },
  "application/vnd.clonk.c4group": {
    source: "iana",
    extensions: [
      "c4g",
      "c4d",
      "c4f",
      "c4p",
      "c4u"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    source: "iana",
    extensions: [
      "c11amc"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    source: "iana",
    extensions: [
      "c11amz"
    ]
  },
  "application/vnd.coffeescript": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    source: "iana"
  },
  "application/vnd.collection+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.collection.doc+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.collection.next+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.comicbook+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.comicbook-rar": {
    source: "iana"
  },
  "application/vnd.commerce-battelle": {
    source: "iana"
  },
  "application/vnd.commonspace": {
    source: "iana",
    extensions: [
      "csp"
    ]
  },
  "application/vnd.contact.cmsg": {
    source: "iana",
    extensions: [
      "cdbcmsg"
    ]
  },
  "application/vnd.coreos.ignition+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.cosmocaller": {
    source: "iana",
    extensions: [
      "cmc"
    ]
  },
  "application/vnd.crick.clicker": {
    source: "iana",
    extensions: [
      "clkx"
    ]
  },
  "application/vnd.crick.clicker.keyboard": {
    source: "iana",
    extensions: [
      "clkk"
    ]
  },
  "application/vnd.crick.clicker.palette": {
    source: "iana",
    extensions: [
      "clkp"
    ]
  },
  "application/vnd.crick.clicker.template": {
    source: "iana",
    extensions: [
      "clkt"
    ]
  },
  "application/vnd.crick.clicker.wordbank": {
    source: "iana",
    extensions: [
      "clkw"
    ]
  },
  "application/vnd.criticaltools.wbs+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "wbs"
    ]
  },
  "application/vnd.cryptii.pipe+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.crypto-shade-file": {
    source: "iana"
  },
  "application/vnd.cryptomator.encrypted": {
    source: "iana"
  },
  "application/vnd.cryptomator.vault": {
    source: "iana"
  },
  "application/vnd.ctc-posml": {
    source: "iana",
    extensions: [
      "pml"
    ]
  },
  "application/vnd.ctct.ws+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.cups-pdf": {
    source: "iana"
  },
  "application/vnd.cups-postscript": {
    source: "iana"
  },
  "application/vnd.cups-ppd": {
    source: "iana",
    extensions: [
      "ppd"
    ]
  },
  "application/vnd.cups-raster": {
    source: "iana"
  },
  "application/vnd.cups-raw": {
    source: "iana"
  },
  "application/vnd.curl": {
    source: "iana"
  },
  "application/vnd.curl.car": {
    source: "apache",
    extensions: [
      "car"
    ]
  },
  "application/vnd.curl.pcurl": {
    source: "apache",
    extensions: [
      "pcurl"
    ]
  },
  "application/vnd.cyan.dean.root+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.cybank": {
    source: "iana"
  },
  "application/vnd.cyclonedx+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.cyclonedx+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.d2l.coursepackage1p0+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.d3m-dataset": {
    source: "iana"
  },
  "application/vnd.d3m-problem": {
    source: "iana"
  },
  "application/vnd.dart": {
    source: "iana",
    compressible: true,
    extensions: [
      "dart"
    ]
  },
  "application/vnd.data-vision.rdz": {
    source: "iana",
    extensions: [
      "rdz"
    ]
  },
  "application/vnd.datapackage+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dataresource+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dbf": {
    source: "iana",
    extensions: [
      "dbf"
    ]
  },
  "application/vnd.debian.binary-package": {
    source: "iana"
  },
  "application/vnd.dece.data": {
    source: "iana",
    extensions: [
      "uvf",
      "uvvf",
      "uvd",
      "uvvd"
    ]
  },
  "application/vnd.dece.ttml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "uvt",
      "uvvt"
    ]
  },
  "application/vnd.dece.unspecified": {
    source: "iana",
    extensions: [
      "uvx",
      "uvvx"
    ]
  },
  "application/vnd.dece.zip": {
    source: "iana",
    extensions: [
      "uvz",
      "uvvz"
    ]
  },
  "application/vnd.denovo.fcselayout-link": {
    source: "iana",
    extensions: [
      "fe_launch"
    ]
  },
  "application/vnd.desmume.movie": {
    source: "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    source: "iana"
  },
  "application/vnd.dm.delegation+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dna": {
    source: "iana",
    extensions: [
      "dna"
    ]
  },
  "application/vnd.document+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dolby.mlp": {
    source: "apache",
    extensions: [
      "mlp"
    ]
  },
  "application/vnd.dolby.mobile.1": {
    source: "iana"
  },
  "application/vnd.dolby.mobile.2": {
    source: "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    source: "iana"
  },
  "application/vnd.dpgraph": {
    source: "iana",
    extensions: [
      "dpg"
    ]
  },
  "application/vnd.dreamfactory": {
    source: "iana",
    extensions: [
      "dfac"
    ]
  },
  "application/vnd.drive+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ds-keypoint": {
    source: "apache",
    extensions: [
      "kpxx"
    ]
  },
  "application/vnd.dtg.local": {
    source: "iana"
  },
  "application/vnd.dtg.local.flash": {
    source: "iana"
  },
  "application/vnd.dtg.local.html": {
    source: "iana"
  },
  "application/vnd.dvb.ait": {
    source: "iana",
    extensions: [
      "ait"
    ]
  },
  "application/vnd.dvb.dvbisl+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.dvbj": {
    source: "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    source: "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.notif-container+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.notif-generic+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.notif-init+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.dvb.pfr": {
    source: "iana"
  },
  "application/vnd.dvb.service": {
    source: "iana",
    extensions: [
      "svc"
    ]
  },
  "application/vnd.dxr": {
    source: "iana"
  },
  "application/vnd.dynageo": {
    source: "iana",
    extensions: [
      "geo"
    ]
  },
  "application/vnd.dzr": {
    source: "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    source: "iana"
  },
  "application/vnd.ecdis-update": {
    source: "iana"
  },
  "application/vnd.ecip.rlp": {
    source: "iana"
  },
  "application/vnd.eclipse.ditto+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ecowin.chart": {
    source: "iana",
    extensions: [
      "mag"
    ]
  },
  "application/vnd.ecowin.filerequest": {
    source: "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    source: "iana"
  },
  "application/vnd.ecowin.series": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    source: "iana"
  },
  "application/vnd.efi.img": {
    source: "iana"
  },
  "application/vnd.efi.iso": {
    source: "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.enliven": {
    source: "iana",
    extensions: [
      "nml"
    ]
  },
  "application/vnd.enphase.envoy": {
    source: "iana"
  },
  "application/vnd.eprints.data+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.epson.esf": {
    source: "iana",
    extensions: [
      "esf"
    ]
  },
  "application/vnd.epson.msf": {
    source: "iana",
    extensions: [
      "msf"
    ]
  },
  "application/vnd.epson.quickanime": {
    source: "iana",
    extensions: [
      "qam"
    ]
  },
  "application/vnd.epson.salt": {
    source: "iana",
    extensions: [
      "slt"
    ]
  },
  "application/vnd.epson.ssf": {
    source: "iana",
    extensions: [
      "ssf"
    ]
  },
  "application/vnd.ericsson.quickcall": {
    source: "iana"
  },
  "application/vnd.espass-espass+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.eszigno3+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "es3",
      "et3"
    ]
  },
  "application/vnd.etsi.aoc+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.asic-e+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.etsi.asic-s+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.etsi.cug+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvcommand+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvprofile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvservice+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvsync+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.mcid+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.mheg5": {
    source: "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.pstn+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.sci+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.simservs+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.timestamp-token": {
    source: "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.etsi.tsl.der": {
    source: "iana"
  },
  "application/vnd.eu.kasparian.car+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.eudora.data": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.profile": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.settings": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.theme": {
    source: "iana"
  },
  "application/vnd.exstream-empower+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.exstream-package": {
    source: "iana"
  },
  "application/vnd.ezpix-album": {
    source: "iana",
    extensions: [
      "ez2"
    ]
  },
  "application/vnd.ezpix-package": {
    source: "iana",
    extensions: [
      "ez3"
    ]
  },
  "application/vnd.f-secure.mobile": {
    source: "iana"
  },
  "application/vnd.familysearch.gedcom+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.fastcopy-disk-image": {
    source: "iana"
  },
  "application/vnd.fdf": {
    source: "iana",
    extensions: [
      "fdf"
    ]
  },
  "application/vnd.fdsn.mseed": {
    source: "iana",
    extensions: [
      "mseed"
    ]
  },
  "application/vnd.fdsn.seed": {
    source: "iana",
    extensions: [
      "seed",
      "dataless"
    ]
  },
  "application/vnd.ffsns": {
    source: "iana"
  },
  "application/vnd.ficlab.flb+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.filmit.zfc": {
    source: "iana"
  },
  "application/vnd.fints": {
    source: "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    source: "iana"
  },
  "application/vnd.flographit": {
    source: "iana",
    extensions: [
      "gph"
    ]
  },
  "application/vnd.fluxtime.clip": {
    source: "iana",
    extensions: [
      "ftc"
    ]
  },
  "application/vnd.font-fontforge-sfd": {
    source: "iana"
  },
  "application/vnd.framemaker": {
    source: "iana",
    extensions: [
      "fm",
      "frame",
      "maker",
      "book"
    ]
  },
  "application/vnd.frogans.fnc": {
    source: "iana",
    extensions: [
      "fnc"
    ]
  },
  "application/vnd.frogans.ltf": {
    source: "iana",
    extensions: [
      "ltf"
    ]
  },
  "application/vnd.fsc.weblaunch": {
    source: "iana",
    extensions: [
      "fsc"
    ]
  },
  "application/vnd.fujifilm.fb.docuworks": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.binder": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.jfi+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.fujitsu.oasys": {
    source: "iana",
    extensions: [
      "oas"
    ]
  },
  "application/vnd.fujitsu.oasys2": {
    source: "iana",
    extensions: [
      "oa2"
    ]
  },
  "application/vnd.fujitsu.oasys3": {
    source: "iana",
    extensions: [
      "oa3"
    ]
  },
  "application/vnd.fujitsu.oasysgp": {
    source: "iana",
    extensions: [
      "fg5"
    ]
  },
  "application/vnd.fujitsu.oasysprs": {
    source: "iana",
    extensions: [
      "bh2"
    ]
  },
  "application/vnd.fujixerox.art-ex": {
    source: "iana"
  },
  "application/vnd.fujixerox.art4": {
    source: "iana"
  },
  "application/vnd.fujixerox.ddd": {
    source: "iana",
    extensions: [
      "ddd"
    ]
  },
  "application/vnd.fujixerox.docuworks": {
    source: "iana",
    extensions: [
      "xdw"
    ]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    source: "iana",
    extensions: [
      "xbd"
    ]
  },
  "application/vnd.fujixerox.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    source: "iana"
  },
  "application/vnd.fut-misnet": {
    source: "iana"
  },
  "application/vnd.futoin+cbor": {
    source: "iana"
  },
  "application/vnd.futoin+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.fuzzysheet": {
    source: "iana",
    extensions: [
      "fzs"
    ]
  },
  "application/vnd.genomatix.tuxedo": {
    source: "iana",
    extensions: [
      "txd"
    ]
  },
  "application/vnd.gentics.grd+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.geo+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.geocube+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.geogebra.file": {
    source: "iana",
    extensions: [
      "ggb"
    ]
  },
  "application/vnd.geogebra.slides": {
    source: "iana"
  },
  "application/vnd.geogebra.tool": {
    source: "iana",
    extensions: [
      "ggt"
    ]
  },
  "application/vnd.geometry-explorer": {
    source: "iana",
    extensions: [
      "gex",
      "gre"
    ]
  },
  "application/vnd.geonext": {
    source: "iana",
    extensions: [
      "gxt"
    ]
  },
  "application/vnd.geoplan": {
    source: "iana",
    extensions: [
      "g2w"
    ]
  },
  "application/vnd.geospace": {
    source: "iana",
    extensions: [
      "g3w"
    ]
  },
  "application/vnd.gerber": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    source: "iana"
  },
  "application/vnd.gmx": {
    source: "iana",
    extensions: [
      "gmx"
    ]
  },
  "application/vnd.google-apps.document": {
    compressible: false,
    extensions: [
      "gdoc"
    ]
  },
  "application/vnd.google-apps.presentation": {
    compressible: false,
    extensions: [
      "gslides"
    ]
  },
  "application/vnd.google-apps.spreadsheet": {
    compressible: false,
    extensions: [
      "gsheet"
    ]
  },
  "application/vnd.google-earth.kml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "kml"
    ]
  },
  "application/vnd.google-earth.kmz": {
    source: "iana",
    compressible: false,
    extensions: [
      "kmz"
    ]
  },
  "application/vnd.gov.sk.e-form+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.gov.sk.e-form+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.grafeq": {
    source: "iana",
    extensions: [
      "gqf",
      "gqs"
    ]
  },
  "application/vnd.gridmp": {
    source: "iana"
  },
  "application/vnd.groove-account": {
    source: "iana",
    extensions: [
      "gac"
    ]
  },
  "application/vnd.groove-help": {
    source: "iana",
    extensions: [
      "ghf"
    ]
  },
  "application/vnd.groove-identity-message": {
    source: "iana",
    extensions: [
      "gim"
    ]
  },
  "application/vnd.groove-injector": {
    source: "iana",
    extensions: [
      "grv"
    ]
  },
  "application/vnd.groove-tool-message": {
    source: "iana",
    extensions: [
      "gtm"
    ]
  },
  "application/vnd.groove-tool-template": {
    source: "iana",
    extensions: [
      "tpl"
    ]
  },
  "application/vnd.groove-vcard": {
    source: "iana",
    extensions: [
      "vcg"
    ]
  },
  "application/vnd.hal+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.hal+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "hal"
    ]
  },
  "application/vnd.handheld-entertainment+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "zmm"
    ]
  },
  "application/vnd.hbci": {
    source: "iana",
    extensions: [
      "hbci"
    ]
  },
  "application/vnd.hc+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.hcl-bireports": {
    source: "iana"
  },
  "application/vnd.hdt": {
    source: "iana"
  },
  "application/vnd.heroku+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.hhe.lesson-player": {
    source: "iana",
    extensions: [
      "les"
    ]
  },
  "application/vnd.hl7cda+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/vnd.hl7v2+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/vnd.hp-hpgl": {
    source: "iana",
    extensions: [
      "hpgl"
    ]
  },
  "application/vnd.hp-hpid": {
    source: "iana",
    extensions: [
      "hpid"
    ]
  },
  "application/vnd.hp-hps": {
    source: "iana",
    extensions: [
      "hps"
    ]
  },
  "application/vnd.hp-jlyt": {
    source: "iana",
    extensions: [
      "jlt"
    ]
  },
  "application/vnd.hp-pcl": {
    source: "iana",
    extensions: [
      "pcl"
    ]
  },
  "application/vnd.hp-pclxl": {
    source: "iana",
    extensions: [
      "pclxl"
    ]
  },
  "application/vnd.httphone": {
    source: "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    source: "iana",
    extensions: [
      "sfd-hdstx"
    ]
  },
  "application/vnd.hyper+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.hyper-item+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.hyperdrive+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.hzn-3d-crossword": {
    source: "iana"
  },
  "application/vnd.ibm.afplinedata": {
    source: "iana"
  },
  "application/vnd.ibm.electronic-media": {
    source: "iana"
  },
  "application/vnd.ibm.minipay": {
    source: "iana",
    extensions: [
      "mpy"
    ]
  },
  "application/vnd.ibm.modcap": {
    source: "iana",
    extensions: [
      "afp",
      "listafp",
      "list3820"
    ]
  },
  "application/vnd.ibm.rights-management": {
    source: "iana",
    extensions: [
      "irm"
    ]
  },
  "application/vnd.ibm.secure-container": {
    source: "iana",
    extensions: [
      "sc"
    ]
  },
  "application/vnd.iccprofile": {
    source: "iana",
    extensions: [
      "icc",
      "icm"
    ]
  },
  "application/vnd.ieee.1905": {
    source: "iana"
  },
  "application/vnd.igloader": {
    source: "iana",
    extensions: [
      "igl"
    ]
  },
  "application/vnd.imagemeter.folder+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.imagemeter.image+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.immervision-ivp": {
    source: "iana",
    extensions: [
      "ivp"
    ]
  },
  "application/vnd.immervision-ivu": {
    source: "iana",
    extensions: [
      "ivu"
    ]
  },
  "application/vnd.ims.imsccv1p1": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    source: "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.informedcontrol.rms+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.informix-visionary": {
    source: "iana"
  },
  "application/vnd.infotech.project": {
    source: "iana"
  },
  "application/vnd.infotech.project+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.innopath.wamp.notification": {
    source: "iana"
  },
  "application/vnd.insors.igm": {
    source: "iana",
    extensions: [
      "igm"
    ]
  },
  "application/vnd.intercon.formnet": {
    source: "iana",
    extensions: [
      "xpw",
      "xpx"
    ]
  },
  "application/vnd.intergeo": {
    source: "iana",
    extensions: [
      "i2g"
    ]
  },
  "application/vnd.intertrust.digibox": {
    source: "iana"
  },
  "application/vnd.intertrust.nncp": {
    source: "iana"
  },
  "application/vnd.intu.qbo": {
    source: "iana",
    extensions: [
      "qbo"
    ]
  },
  "application/vnd.intu.qfx": {
    source: "iana",
    extensions: [
      "qfx"
    ]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ipunplugged.rcprofile": {
    source: "iana",
    extensions: [
      "rcprofile"
    ]
  },
  "application/vnd.irepository.package+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "irp"
    ]
  },
  "application/vnd.is-xpr": {
    source: "iana",
    extensions: [
      "xpr"
    ]
  },
  "application/vnd.isac.fcs": {
    source: "iana",
    extensions: [
      "fcs"
    ]
  },
  "application/vnd.iso11783-10+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.jam": {
    source: "iana",
    extensions: [
      "jam"
    ]
  },
  "application/vnd.japannet-directory-service": {
    source: "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-registration": {
    source: "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-verification": {
    source: "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    source: "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    source: "iana",
    extensions: [
      "rms"
    ]
  },
  "application/vnd.jisp": {
    source: "iana",
    extensions: [
      "jisp"
    ]
  },
  "application/vnd.joost.joda-archive": {
    source: "iana",
    extensions: [
      "joda"
    ]
  },
  "application/vnd.jsk.isdn-ngn": {
    source: "iana"
  },
  "application/vnd.kahootz": {
    source: "iana",
    extensions: [
      "ktz",
      "ktr"
    ]
  },
  "application/vnd.kde.karbon": {
    source: "iana",
    extensions: [
      "karbon"
    ]
  },
  "application/vnd.kde.kchart": {
    source: "iana",
    extensions: [
      "chrt"
    ]
  },
  "application/vnd.kde.kformula": {
    source: "iana",
    extensions: [
      "kfo"
    ]
  },
  "application/vnd.kde.kivio": {
    source: "iana",
    extensions: [
      "flw"
    ]
  },
  "application/vnd.kde.kontour": {
    source: "iana",
    extensions: [
      "kon"
    ]
  },
  "application/vnd.kde.kpresenter": {
    source: "iana",
    extensions: [
      "kpr",
      "kpt"
    ]
  },
  "application/vnd.kde.kspread": {
    source: "iana",
    extensions: [
      "ksp"
    ]
  },
  "application/vnd.kde.kword": {
    source: "iana",
    extensions: [
      "kwd",
      "kwt"
    ]
  },
  "application/vnd.kenameaapp": {
    source: "iana",
    extensions: [
      "htke"
    ]
  },
  "application/vnd.kidspiration": {
    source: "iana",
    extensions: [
      "kia"
    ]
  },
  "application/vnd.kinar": {
    source: "iana",
    extensions: [
      "kne",
      "knp"
    ]
  },
  "application/vnd.koan": {
    source: "iana",
    extensions: [
      "skp",
      "skd",
      "skt",
      "skm"
    ]
  },
  "application/vnd.kodak-descriptor": {
    source: "iana",
    extensions: [
      "sse"
    ]
  },
  "application/vnd.las": {
    source: "iana"
  },
  "application/vnd.las.las+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.las.las+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "lasxml"
    ]
  },
  "application/vnd.laszip": {
    source: "iana"
  },
  "application/vnd.leap+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.liberty-request+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    source: "iana",
    extensions: [
      "lbd"
    ]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "lbe"
    ]
  },
  "application/vnd.logipipe.circuit+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.loom": {
    source: "iana"
  },
  "application/vnd.lotus-1-2-3": {
    source: "iana",
    extensions: [
      "123"
    ]
  },
  "application/vnd.lotus-approach": {
    source: "iana",
    extensions: [
      "apr"
    ]
  },
  "application/vnd.lotus-freelance": {
    source: "iana",
    extensions: [
      "pre"
    ]
  },
  "application/vnd.lotus-notes": {
    source: "iana",
    extensions: [
      "nsf"
    ]
  },
  "application/vnd.lotus-organizer": {
    source: "iana",
    extensions: [
      "org"
    ]
  },
  "application/vnd.lotus-screencam": {
    source: "iana",
    extensions: [
      "scm"
    ]
  },
  "application/vnd.lotus-wordpro": {
    source: "iana",
    extensions: [
      "lwp"
    ]
  },
  "application/vnd.macports.portpkg": {
    source: "iana",
    extensions: [
      "portpkg"
    ]
  },
  "application/vnd.mapbox-vector-tile": {
    source: "iana",
    extensions: [
      "mvt"
    ]
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.marlin.drm.license+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.marlin.drm.mdcf": {
    source: "iana"
  },
  "application/vnd.mason+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.maxar.archive.3tz+zip": {
    source: "iana",
    compressible: false
  },
  "application/vnd.maxmind.maxmind-db": {
    source: "iana"
  },
  "application/vnd.mcd": {
    source: "iana",
    extensions: [
      "mcd"
    ]
  },
  "application/vnd.medcalcdata": {
    source: "iana",
    extensions: [
      "mc1"
    ]
  },
  "application/vnd.mediastation.cdkey": {
    source: "iana",
    extensions: [
      "cdkey"
    ]
  },
  "application/vnd.meridian-slingshot": {
    source: "iana"
  },
  "application/vnd.mfer": {
    source: "iana",
    extensions: [
      "mwf"
    ]
  },
  "application/vnd.mfmp": {
    source: "iana",
    extensions: [
      "mfm"
    ]
  },
  "application/vnd.micro+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.micrografx.flo": {
    source: "iana",
    extensions: [
      "flo"
    ]
  },
  "application/vnd.micrografx.igx": {
    source: "iana",
    extensions: [
      "igx"
    ]
  },
  "application/vnd.microsoft.portable-executable": {
    source: "iana"
  },
  "application/vnd.microsoft.windows.thumbnail-cache": {
    source: "iana"
  },
  "application/vnd.miele+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.mif": {
    source: "iana",
    extensions: [
      "mif"
    ]
  },
  "application/vnd.minisoft-hp3000-save": {
    source: "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    source: "iana"
  },
  "application/vnd.mobius.daf": {
    source: "iana",
    extensions: [
      "daf"
    ]
  },
  "application/vnd.mobius.dis": {
    source: "iana",
    extensions: [
      "dis"
    ]
  },
  "application/vnd.mobius.mbk": {
    source: "iana",
    extensions: [
      "mbk"
    ]
  },
  "application/vnd.mobius.mqy": {
    source: "iana",
    extensions: [
      "mqy"
    ]
  },
  "application/vnd.mobius.msl": {
    source: "iana",
    extensions: [
      "msl"
    ]
  },
  "application/vnd.mobius.plc": {
    source: "iana",
    extensions: [
      "plc"
    ]
  },
  "application/vnd.mobius.txf": {
    source: "iana",
    extensions: [
      "txf"
    ]
  },
  "application/vnd.mophun.application": {
    source: "iana",
    extensions: [
      "mpn"
    ]
  },
  "application/vnd.mophun.certificate": {
    source: "iana",
    extensions: [
      "mpc"
    ]
  },
  "application/vnd.motorola.flexsuite": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    source: "iana"
  },
  "application/vnd.motorola.iprm": {
    source: "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xul"
    ]
  },
  "application/vnd.ms-3mfdocument": {
    source: "iana"
  },
  "application/vnd.ms-artgalry": {
    source: "iana",
    extensions: [
      "cil"
    ]
  },
  "application/vnd.ms-asf": {
    source: "iana"
  },
  "application/vnd.ms-cab-compressed": {
    source: "iana",
    extensions: [
      "cab"
    ]
  },
  "application/vnd.ms-color.iccprofile": {
    source: "apache"
  },
  "application/vnd.ms-excel": {
    source: "iana",
    compressible: false,
    extensions: [
      "xls",
      "xlm",
      "xla",
      "xlc",
      "xlt",
      "xlw"
    ]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlam"
    ]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsb"
    ]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsm"
    ]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "xltm"
    ]
  },
  "application/vnd.ms-fontobject": {
    source: "iana",
    compressible: true,
    extensions: [
      "eot"
    ]
  },
  "application/vnd.ms-htmlhelp": {
    source: "iana",
    extensions: [
      "chm"
    ]
  },
  "application/vnd.ms-ims": {
    source: "iana",
    extensions: [
      "ims"
    ]
  },
  "application/vnd.ms-lrm": {
    source: "iana",
    extensions: [
      "lrm"
    ]
  },
  "application/vnd.ms-office.activex+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ms-officetheme": {
    source: "iana",
    extensions: [
      "thmx"
    ]
  },
  "application/vnd.ms-opentype": {
    source: "apache",
    compressible: true
  },
  "application/vnd.ms-outlook": {
    compressible: false,
    extensions: [
      "msg"
    ]
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    source: "apache"
  },
  "application/vnd.ms-pki.seccat": {
    source: "apache",
    extensions: [
      "cat"
    ]
  },
  "application/vnd.ms-pki.stl": {
    source: "apache",
    extensions: [
      "stl"
    ]
  },
  "application/vnd.ms-playready.initiator+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ms-powerpoint": {
    source: "iana",
    compressible: false,
    extensions: [
      "ppt",
      "pps",
      "pot"
    ]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppam"
    ]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    source: "iana",
    extensions: [
      "pptm"
    ]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    source: "iana",
    extensions: [
      "sldm"
    ]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppsm"
    ]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "potm"
    ]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ms-printing.printticket+xml": {
    source: "apache",
    compressible: true
  },
  "application/vnd.ms-printschematicket+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ms-project": {
    source: "iana",
    extensions: [
      "mpp",
      "mpt"
    ]
  },
  "application/vnd.ms-tnef": {
    source: "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    source: "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    source: "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    source: "iana",
    extensions: [
      "docm"
    ]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "dotm"
    ]
  },
  "application/vnd.ms-works": {
    source: "iana",
    extensions: [
      "wps",
      "wks",
      "wcm",
      "wdb"
    ]
  },
  "application/vnd.ms-wpl": {
    source: "iana",
    extensions: [
      "wpl"
    ]
  },
  "application/vnd.ms-xpsdocument": {
    source: "iana",
    compressible: false,
    extensions: [
      "xps"
    ]
  },
  "application/vnd.msa-disk-image": {
    source: "iana"
  },
  "application/vnd.mseq": {
    source: "iana",
    extensions: [
      "mseq"
    ]
  },
  "application/vnd.msign": {
    source: "iana"
  },
  "application/vnd.multiad.creator": {
    source: "iana"
  },
  "application/vnd.multiad.creator.cif": {
    source: "iana"
  },
  "application/vnd.music-niff": {
    source: "iana"
  },
  "application/vnd.musician": {
    source: "iana",
    extensions: [
      "mus"
    ]
  },
  "application/vnd.muvee.style": {
    source: "iana",
    extensions: [
      "msty"
    ]
  },
  "application/vnd.mynfc": {
    source: "iana",
    extensions: [
      "taglet"
    ]
  },
  "application/vnd.nacamar.ybrid+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.ncd.control": {
    source: "iana"
  },
  "application/vnd.ncd.reference": {
    source: "iana"
  },
  "application/vnd.nearst.inv+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.nebumind.line": {
    source: "iana"
  },
  "application/vnd.nervana": {
    source: "iana"
  },
  "application/vnd.netfpx": {
    source: "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    source: "iana",
    extensions: [
      "nlu"
    ]
  },
  "application/vnd.nimn": {
    source: "iana"
  },
  "application/vnd.nintendo.nitro.rom": {
    source: "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    source: "iana"
  },
  "application/vnd.nitf": {
    source: "iana",
    extensions: [
      "ntf",
      "nitf"
    ]
  },
  "application/vnd.noblenet-directory": {
    source: "iana",
    extensions: [
      "nnd"
    ]
  },
  "application/vnd.noblenet-sealer": {
    source: "iana",
    extensions: [
      "nns"
    ]
  },
  "application/vnd.noblenet-web": {
    source: "iana",
    extensions: [
      "nnw"
    ]
  },
  "application/vnd.nokia.catalogs": {
    source: "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.conml+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.nokia.iptv.config+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.nokia.isds-radio-presets": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "ac"
    ]
  },
  "application/vnd.nokia.n-gage.data": {
    source: "iana",
    extensions: [
      "ngdat"
    ]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    source: "iana",
    extensions: [
      "n-gage"
    ]
  },
  "application/vnd.nokia.ncd": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.nokia.radio-preset": {
    source: "iana",
    extensions: [
      "rpst"
    ]
  },
  "application/vnd.nokia.radio-presets": {
    source: "iana",
    extensions: [
      "rpss"
    ]
  },
  "application/vnd.novadigm.edm": {
    source: "iana",
    extensions: [
      "edm"
    ]
  },
  "application/vnd.novadigm.edx": {
    source: "iana",
    extensions: [
      "edx"
    ]
  },
  "application/vnd.novadigm.ext": {
    source: "iana",
    extensions: [
      "ext"
    ]
  },
  "application/vnd.ntt-local.content-share": {
    source: "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    source: "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    source: "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    source: "iana",
    extensions: [
      "odc"
    ]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    source: "iana",
    extensions: [
      "otc"
    ]
  },
  "application/vnd.oasis.opendocument.database": {
    source: "iana",
    extensions: [
      "odb"
    ]
  },
  "application/vnd.oasis.opendocument.formula": {
    source: "iana",
    extensions: [
      "odf"
    ]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    source: "iana",
    extensions: [
      "odft"
    ]
  },
  "application/vnd.oasis.opendocument.graphics": {
    source: "iana",
    compressible: false,
    extensions: [
      "odg"
    ]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    source: "iana",
    extensions: [
      "otg"
    ]
  },
  "application/vnd.oasis.opendocument.image": {
    source: "iana",
    extensions: [
      "odi"
    ]
  },
  "application/vnd.oasis.opendocument.image-template": {
    source: "iana",
    extensions: [
      "oti"
    ]
  },
  "application/vnd.oasis.opendocument.presentation": {
    source: "iana",
    compressible: false,
    extensions: [
      "odp"
    ]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    source: "iana",
    extensions: [
      "otp"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    source: "iana",
    compressible: false,
    extensions: [
      "ods"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    source: "iana",
    extensions: [
      "ots"
    ]
  },
  "application/vnd.oasis.opendocument.text": {
    source: "iana",
    compressible: false,
    extensions: [
      "odt"
    ]
  },
  "application/vnd.oasis.opendocument.text-master": {
    source: "iana",
    extensions: [
      "odm"
    ]
  },
  "application/vnd.oasis.opendocument.text-template": {
    source: "iana",
    extensions: [
      "ott"
    ]
  },
  "application/vnd.oasis.opendocument.text-web": {
    source: "iana",
    extensions: [
      "oth"
    ]
  },
  "application/vnd.obn": {
    source: "iana"
  },
  "application/vnd.ocf+cbor": {
    source: "iana"
  },
  "application/vnd.oci.image.manifest.v1+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oftn.l10n+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.cspg-hexbinary": {
    source: "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.pae.gem": {
    source: "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.spdlist+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.ueprofile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oipf.userprofile+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.olpc-sugar": {
    source: "iana",
    extensions: [
      "xo"
    ]
  },
  "application/vnd.oma-scws-config": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-request": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-response": {
    source: "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.imd+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.ltkm": {
    source: "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.sgdu": {
    source: "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    source: "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.sprov+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.bcast.stkm": {
    source: "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.cab-pcc+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.dcd": {
    source: "iana"
  },
  "application/vnd.oma.dcdc": {
    source: "iana"
  },
  "application/vnd.oma.dd2+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "dd2"
    ]
  },
  "application/vnd.oma.drm.risd+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.group-usage-list+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.lwm2m+cbor": {
    source: "iana"
  },
  "application/vnd.oma.lwm2m+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.lwm2m+tlv": {
    source: "iana"
  },
  "application/vnd.oma.pal+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.poc.final-report+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.poc.groups+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.push": {
    source: "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oma.xcap-directory+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.omads-email+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/vnd.omads-file+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/vnd.omads-folder+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/vnd.omaloc-supl-init": {
    source: "iana"
  },
  "application/vnd.onepager": {
    source: "iana"
  },
  "application/vnd.onepagertamp": {
    source: "iana"
  },
  "application/vnd.onepagertamx": {
    source: "iana"
  },
  "application/vnd.onepagertat": {
    source: "iana"
  },
  "application/vnd.onepagertatp": {
    source: "iana"
  },
  "application/vnd.onepagertatx": {
    source: "iana"
  },
  "application/vnd.openblox.game+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "obgx"
    ]
  },
  "application/vnd.openblox.game-binary": {
    source: "iana"
  },
  "application/vnd.openeye.oeb": {
    source: "iana"
  },
  "application/vnd.openofficeorg.extension": {
    source: "apache",
    extensions: [
      "oxt"
    ]
  },
  "application/vnd.openstreetmap.data+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "osm"
    ]
  },
  "application/vnd.opentimestamps.ots": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    source: "iana",
    compressible: false,
    extensions: [
      "pptx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    source: "iana",
    extensions: [
      "sldx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    source: "iana",
    extensions: [
      "ppsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    source: "iana",
    extensions: [
      "potx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    source: "iana",
    compressible: false,
    extensions: [
      "xlsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    source: "iana",
    extensions: [
      "xltx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    source: "iana",
    compressible: false,
    extensions: [
      "docx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    source: "iana",
    extensions: [
      "dotx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oracle.resource+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.orange.indata": {
    source: "iana"
  },
  "application/vnd.osa.netdeploy": {
    source: "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    source: "iana",
    extensions: [
      "mgp"
    ]
  },
  "application/vnd.osgi.bundle": {
    source: "iana"
  },
  "application/vnd.osgi.dp": {
    source: "iana",
    extensions: [
      "dp"
    ]
  },
  "application/vnd.osgi.subsystem": {
    source: "iana",
    extensions: [
      "esa"
    ]
  },
  "application/vnd.otps.ct-kip+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.oxli.countgraph": {
    source: "iana"
  },
  "application/vnd.pagerduty+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.palm": {
    source: "iana",
    extensions: [
      "pdb",
      "pqa",
      "oprc"
    ]
  },
  "application/vnd.panoply": {
    source: "iana"
  },
  "application/vnd.paos.xml": {
    source: "iana"
  },
  "application/vnd.patentdive": {
    source: "iana"
  },
  "application/vnd.patientecommsdoc": {
    source: "iana"
  },
  "application/vnd.pawaafile": {
    source: "iana",
    extensions: [
      "paw"
    ]
  },
  "application/vnd.pcos": {
    source: "iana"
  },
  "application/vnd.pg.format": {
    source: "iana",
    extensions: [
      "str"
    ]
  },
  "application/vnd.pg.osasli": {
    source: "iana",
    extensions: [
      "ei6"
    ]
  },
  "application/vnd.piaccess.application-licence": {
    source: "iana"
  },
  "application/vnd.picsel": {
    source: "iana",
    extensions: [
      "efif"
    ]
  },
  "application/vnd.pmi.widget": {
    source: "iana",
    extensions: [
      "wg"
    ]
  },
  "application/vnd.poc.group-advertisement+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.pocketlearn": {
    source: "iana",
    extensions: [
      "plf"
    ]
  },
  "application/vnd.powerbuilder6": {
    source: "iana",
    extensions: [
      "pbd"
    ]
  },
  "application/vnd.powerbuilder6-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder7": {
    source: "iana"
  },
  "application/vnd.powerbuilder7-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder75": {
    source: "iana"
  },
  "application/vnd.powerbuilder75-s": {
    source: "iana"
  },
  "application/vnd.preminet": {
    source: "iana"
  },
  "application/vnd.previewsystems.box": {
    source: "iana",
    extensions: [
      "box"
    ]
  },
  "application/vnd.proteus.magazine": {
    source: "iana",
    extensions: [
      "mgz"
    ]
  },
  "application/vnd.psfs": {
    source: "iana"
  },
  "application/vnd.publishare-delta-tree": {
    source: "iana",
    extensions: [
      "qps"
    ]
  },
  "application/vnd.pvi.ptid1": {
    source: "iana",
    extensions: [
      "ptid"
    ]
  },
  "application/vnd.pwg-multiplexed": {
    source: "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.qualcomm.brew-app-res": {
    source: "iana"
  },
  "application/vnd.quarantainenet": {
    source: "iana"
  },
  "application/vnd.quark.quarkxpress": {
    source: "iana",
    extensions: [
      "qxd",
      "qxt",
      "qwd",
      "qwt",
      "qxl",
      "qxb"
    ]
  },
  "application/vnd.quobject-quoxdocument": {
    source: "iana"
  },
  "application/vnd.radisys.moml+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-audit+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-conf+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.rainstor.data": {
    source: "iana"
  },
  "application/vnd.rapid": {
    source: "iana"
  },
  "application/vnd.rar": {
    source: "iana",
    extensions: [
      "rar"
    ]
  },
  "application/vnd.realvnc.bed": {
    source: "iana",
    extensions: [
      "bed"
    ]
  },
  "application/vnd.recordare.musicxml": {
    source: "iana",
    extensions: [
      "mxl"
    ]
  },
  "application/vnd.recordare.musicxml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "musicxml"
    ]
  },
  "application/vnd.renlearn.rlprint": {
    source: "iana"
  },
  "application/vnd.resilient.logic": {
    source: "iana"
  },
  "application/vnd.restful+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.rig.cryptonote": {
    source: "iana",
    extensions: [
      "cryptonote"
    ]
  },
  "application/vnd.rim.cod": {
    source: "apache",
    extensions: [
      "cod"
    ]
  },
  "application/vnd.rn-realmedia": {
    source: "apache",
    extensions: [
      "rm"
    ]
  },
  "application/vnd.rn-realmedia-vbr": {
    source: "apache",
    extensions: [
      "rmvb"
    ]
  },
  "application/vnd.route66.link66+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "link66"
    ]
  },
  "application/vnd.rs-274x": {
    source: "iana"
  },
  "application/vnd.ruckus.download": {
    source: "iana"
  },
  "application/vnd.s3sms": {
    source: "iana"
  },
  "application/vnd.sailingtracker.track": {
    source: "iana",
    extensions: [
      "st"
    ]
  },
  "application/vnd.sar": {
    source: "iana"
  },
  "application/vnd.sbm.cid": {
    source: "iana"
  },
  "application/vnd.sbm.mid2": {
    source: "iana"
  },
  "application/vnd.scribus": {
    source: "iana"
  },
  "application/vnd.sealed.3df": {
    source: "iana"
  },
  "application/vnd.sealed.csf": {
    source: "iana"
  },
  "application/vnd.sealed.doc": {
    source: "iana"
  },
  "application/vnd.sealed.eml": {
    source: "iana"
  },
  "application/vnd.sealed.mht": {
    source: "iana"
  },
  "application/vnd.sealed.net": {
    source: "iana"
  },
  "application/vnd.sealed.ppt": {
    source: "iana"
  },
  "application/vnd.sealed.tiff": {
    source: "iana"
  },
  "application/vnd.sealed.xls": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    source: "iana"
  },
  "application/vnd.seemail": {
    source: "iana",
    extensions: [
      "see"
    ]
  },
  "application/vnd.seis+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.sema": {
    source: "iana",
    extensions: [
      "sema"
    ]
  },
  "application/vnd.semd": {
    source: "iana",
    extensions: [
      "semd"
    ]
  },
  "application/vnd.semf": {
    source: "iana",
    extensions: [
      "semf"
    ]
  },
  "application/vnd.shade-save-file": {
    source: "iana"
  },
  "application/vnd.shana.informed.formdata": {
    source: "iana",
    extensions: [
      "ifm"
    ]
  },
  "application/vnd.shana.informed.formtemplate": {
    source: "iana",
    extensions: [
      "itp"
    ]
  },
  "application/vnd.shana.informed.interchange": {
    source: "iana",
    extensions: [
      "iif"
    ]
  },
  "application/vnd.shana.informed.package": {
    source: "iana",
    extensions: [
      "ipk"
    ]
  },
  "application/vnd.shootproof+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.shopkick+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.shp": {
    source: "iana"
  },
  "application/vnd.shx": {
    source: "iana"
  },
  "application/vnd.sigrok.session": {
    source: "iana"
  },
  "application/vnd.simtech-mindmapper": {
    source: "iana",
    extensions: [
      "twd",
      "twds"
    ]
  },
  "application/vnd.siren+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.smaf": {
    source: "iana",
    extensions: [
      "mmf"
    ]
  },
  "application/vnd.smart.notebook": {
    source: "iana"
  },
  "application/vnd.smart.teacher": {
    source: "iana",
    extensions: [
      "teacher"
    ]
  },
  "application/vnd.snesdev-page-table": {
    source: "iana"
  },
  "application/vnd.software602.filler.form+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "fo"
    ]
  },
  "application/vnd.software602.filler.form-xml-zip": {
    source: "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "sdkm",
      "sdkd"
    ]
  },
  "application/vnd.spotfire.dxp": {
    source: "iana",
    extensions: [
      "dxp"
    ]
  },
  "application/vnd.spotfire.sfs": {
    source: "iana",
    extensions: [
      "sfs"
    ]
  },
  "application/vnd.sqlite3": {
    source: "iana"
  },
  "application/vnd.sss-cod": {
    source: "iana"
  },
  "application/vnd.sss-dtf": {
    source: "iana"
  },
  "application/vnd.sss-ntf": {
    source: "iana"
  },
  "application/vnd.stardivision.calc": {
    source: "apache",
    extensions: [
      "sdc"
    ]
  },
  "application/vnd.stardivision.draw": {
    source: "apache",
    extensions: [
      "sda"
    ]
  },
  "application/vnd.stardivision.impress": {
    source: "apache",
    extensions: [
      "sdd"
    ]
  },
  "application/vnd.stardivision.math": {
    source: "apache",
    extensions: [
      "smf"
    ]
  },
  "application/vnd.stardivision.writer": {
    source: "apache",
    extensions: [
      "sdw",
      "vor"
    ]
  },
  "application/vnd.stardivision.writer-global": {
    source: "apache",
    extensions: [
      "sgl"
    ]
  },
  "application/vnd.stepmania.package": {
    source: "iana",
    extensions: [
      "smzip"
    ]
  },
  "application/vnd.stepmania.stepchart": {
    source: "iana",
    extensions: [
      "sm"
    ]
  },
  "application/vnd.street-stream": {
    source: "iana"
  },
  "application/vnd.sun.wadl+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "wadl"
    ]
  },
  "application/vnd.sun.xml.calc": {
    source: "apache",
    extensions: [
      "sxc"
    ]
  },
  "application/vnd.sun.xml.calc.template": {
    source: "apache",
    extensions: [
      "stc"
    ]
  },
  "application/vnd.sun.xml.draw": {
    source: "apache",
    extensions: [
      "sxd"
    ]
  },
  "application/vnd.sun.xml.draw.template": {
    source: "apache",
    extensions: [
      "std"
    ]
  },
  "application/vnd.sun.xml.impress": {
    source: "apache",
    extensions: [
      "sxi"
    ]
  },
  "application/vnd.sun.xml.impress.template": {
    source: "apache",
    extensions: [
      "sti"
    ]
  },
  "application/vnd.sun.xml.math": {
    source: "apache",
    extensions: [
      "sxm"
    ]
  },
  "application/vnd.sun.xml.writer": {
    source: "apache",
    extensions: [
      "sxw"
    ]
  },
  "application/vnd.sun.xml.writer.global": {
    source: "apache",
    extensions: [
      "sxg"
    ]
  },
  "application/vnd.sun.xml.writer.template": {
    source: "apache",
    extensions: [
      "stw"
    ]
  },
  "application/vnd.sus-calendar": {
    source: "iana",
    extensions: [
      "sus",
      "susp"
    ]
  },
  "application/vnd.svd": {
    source: "iana",
    extensions: [
      "svd"
    ]
  },
  "application/vnd.swiftview-ics": {
    source: "iana"
  },
  "application/vnd.sycle+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.syft+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.symbian.install": {
    source: "apache",
    extensions: [
      "sis",
      "sisx"
    ]
  },
  "application/vnd.syncml+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "xsm"
    ]
  },
  "application/vnd.syncml.dm+wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "bdm"
    ]
  },
  "application/vnd.syncml.dm+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "xdm"
    ]
  },
  "application/vnd.syncml.dm.notification": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "ddf"
    ]
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: true
  },
  "application/vnd.syncml.ds.notification": {
    source: "iana"
  },
  "application/vnd.tableschema+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.tao.intent-module-archive": {
    source: "iana",
    extensions: [
      "tao"
    ]
  },
  "application/vnd.tcpdump.pcap": {
    source: "iana",
    extensions: [
      "pcap",
      "cap",
      "dmp"
    ]
  },
  "application/vnd.think-cell.ppttc+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.tml": {
    source: "iana"
  },
  "application/vnd.tmobile-livetv": {
    source: "iana",
    extensions: [
      "tmo"
    ]
  },
  "application/vnd.tri.onesource": {
    source: "iana"
  },
  "application/vnd.trid.tpt": {
    source: "iana",
    extensions: [
      "tpt"
    ]
  },
  "application/vnd.triscape.mxs": {
    source: "iana",
    extensions: [
      "mxs"
    ]
  },
  "application/vnd.trueapp": {
    source: "iana",
    extensions: [
      "tra"
    ]
  },
  "application/vnd.truedoc": {
    source: "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    source: "iana"
  },
  "application/vnd.ufdl": {
    source: "iana",
    extensions: [
      "ufd",
      "ufdl"
    ]
  },
  "application/vnd.uiq.theme": {
    source: "iana",
    extensions: [
      "utz"
    ]
  },
  "application/vnd.umajin": {
    source: "iana",
    extensions: [
      "umj"
    ]
  },
  "application/vnd.unity": {
    source: "iana",
    extensions: [
      "unityweb"
    ]
  },
  "application/vnd.uoml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "uoml"
    ]
  },
  "application/vnd.uplanet.alert": {
    source: "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.channel": {
    source: "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.list": {
    source: "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.signal": {
    source: "iana"
  },
  "application/vnd.uri-map": {
    source: "iana"
  },
  "application/vnd.valve.source.material": {
    source: "iana"
  },
  "application/vnd.vcx": {
    source: "iana",
    extensions: [
      "vcx"
    ]
  },
  "application/vnd.vd-study": {
    source: "iana"
  },
  "application/vnd.vectorworks": {
    source: "iana"
  },
  "application/vnd.vel+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.verimatrix.vcas": {
    source: "iana"
  },
  "application/vnd.veritone.aion+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.veryant.thin": {
    source: "iana"
  },
  "application/vnd.ves.encrypted": {
    source: "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    source: "iana"
  },
  "application/vnd.visio": {
    source: "iana",
    extensions: [
      "vsd",
      "vst",
      "vss",
      "vsw"
    ]
  },
  "application/vnd.visionary": {
    source: "iana",
    extensions: [
      "vis"
    ]
  },
  "application/vnd.vividence.scriptfile": {
    source: "iana"
  },
  "application/vnd.vsf": {
    source: "iana",
    extensions: [
      "vsf"
    ]
  },
  "application/vnd.wap.sic": {
    source: "iana"
  },
  "application/vnd.wap.slc": {
    source: "iana"
  },
  "application/vnd.wap.wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "wbxml"
    ]
  },
  "application/vnd.wap.wmlc": {
    source: "iana",
    extensions: [
      "wmlc"
    ]
  },
  "application/vnd.wap.wmlscriptc": {
    source: "iana",
    extensions: [
      "wmlsc"
    ]
  },
  "application/vnd.webturbo": {
    source: "iana",
    extensions: [
      "wtb"
    ]
  },
  "application/vnd.wfa.dpp": {
    source: "iana"
  },
  "application/vnd.wfa.p2p": {
    source: "iana"
  },
  "application/vnd.wfa.wsc": {
    source: "iana"
  },
  "application/vnd.windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.wmc": {
    source: "iana"
  },
  "application/vnd.wmf.bootstrap": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    source: "iana"
  },
  "application/vnd.wolfram.player": {
    source: "iana",
    extensions: [
      "nbp"
    ]
  },
  "application/vnd.wordperfect": {
    source: "iana",
    extensions: [
      "wpd"
    ]
  },
  "application/vnd.wqd": {
    source: "iana",
    extensions: [
      "wqd"
    ]
  },
  "application/vnd.wrq-hp3000-labelled": {
    source: "iana"
  },
  "application/vnd.wt.stf": {
    source: "iana",
    extensions: [
      "stf"
    ]
  },
  "application/vnd.wv.csp+wbxml": {
    source: "iana"
  },
  "application/vnd.wv.csp+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.wv.ssp+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.xacml+json": {
    source: "iana",
    compressible: true
  },
  "application/vnd.xara": {
    source: "iana",
    extensions: [
      "xar"
    ]
  },
  "application/vnd.xfdl": {
    source: "iana",
    extensions: [
      "xfdl"
    ]
  },
  "application/vnd.xfdl.webform": {
    source: "iana"
  },
  "application/vnd.xmi+xml": {
    source: "iana",
    compressible: true
  },
  "application/vnd.xmpie.cpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.dpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.plan": {
    source: "iana"
  },
  "application/vnd.xmpie.ppkg": {
    source: "iana"
  },
  "application/vnd.xmpie.xlim": {
    source: "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    source: "iana",
    extensions: [
      "hvd"
    ]
  },
  "application/vnd.yamaha.hv-script": {
    source: "iana",
    extensions: [
      "hvs"
    ]
  },
  "application/vnd.yamaha.hv-voice": {
    source: "iana",
    extensions: [
      "hvp"
    ]
  },
  "application/vnd.yamaha.openscoreformat": {
    source: "iana",
    extensions: [
      "osf"
    ]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "osfpvg"
    ]
  },
  "application/vnd.yamaha.remote-setup": {
    source: "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    source: "iana",
    extensions: [
      "saf"
    ]
  },
  "application/vnd.yamaha.smaf-phrase": {
    source: "iana",
    extensions: [
      "spf"
    ]
  },
  "application/vnd.yamaha.through-ngn": {
    source: "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    source: "iana"
  },
  "application/vnd.yaoweme": {
    source: "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    source: "iana",
    extensions: [
      "cmp"
    ]
  },
  "application/vnd.youtube.yt": {
    source: "iana"
  },
  "application/vnd.zul": {
    source: "iana",
    extensions: [
      "zir",
      "zirz"
    ]
  },
  "application/vnd.zzazz.deck+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "zaz"
    ]
  },
  "application/voicexml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "vxml"
    ]
  },
  "application/voucher-cms+json": {
    source: "iana",
    compressible: true
  },
  "application/vq-rtcpxr": {
    source: "iana"
  },
  "application/wasm": {
    source: "iana",
    compressible: true,
    extensions: [
      "wasm"
    ]
  },
  "application/watcherinfo+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "wif"
    ]
  },
  "application/webpush-options+json": {
    source: "iana",
    compressible: true
  },
  "application/whoispp-query": {
    source: "iana"
  },
  "application/whoispp-response": {
    source: "iana"
  },
  "application/widget": {
    source: "iana",
    extensions: [
      "wgt"
    ]
  },
  "application/winhlp": {
    source: "apache",
    extensions: [
      "hlp"
    ]
  },
  "application/wita": {
    source: "iana"
  },
  "application/wordperfect5.1": {
    source: "iana"
  },
  "application/wsdl+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "wsdl"
    ]
  },
  "application/wspolicy+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "wspolicy"
    ]
  },
  "application/x-7z-compressed": {
    source: "apache",
    compressible: false,
    extensions: [
      "7z"
    ]
  },
  "application/x-abiword": {
    source: "apache",
    extensions: [
      "abw"
    ]
  },
  "application/x-ace-compressed": {
    source: "apache",
    extensions: [
      "ace"
    ]
  },
  "application/x-amf": {
    source: "apache"
  },
  "application/x-apple-diskimage": {
    source: "apache",
    extensions: [
      "dmg"
    ]
  },
  "application/x-arj": {
    compressible: false,
    extensions: [
      "arj"
    ]
  },
  "application/x-authorware-bin": {
    source: "apache",
    extensions: [
      "aab",
      "x32",
      "u32",
      "vox"
    ]
  },
  "application/x-authorware-map": {
    source: "apache",
    extensions: [
      "aam"
    ]
  },
  "application/x-authorware-seg": {
    source: "apache",
    extensions: [
      "aas"
    ]
  },
  "application/x-bcpio": {
    source: "apache",
    extensions: [
      "bcpio"
    ]
  },
  "application/x-bdoc": {
    compressible: false,
    extensions: [
      "bdoc"
    ]
  },
  "application/x-bittorrent": {
    source: "apache",
    extensions: [
      "torrent"
    ]
  },
  "application/x-blorb": {
    source: "apache",
    extensions: [
      "blb",
      "blorb"
    ]
  },
  "application/x-bzip": {
    source: "apache",
    compressible: false,
    extensions: [
      "bz"
    ]
  },
  "application/x-bzip2": {
    source: "apache",
    compressible: false,
    extensions: [
      "bz2",
      "boz"
    ]
  },
  "application/x-cbr": {
    source: "apache",
    extensions: [
      "cbr",
      "cba",
      "cbt",
      "cbz",
      "cb7"
    ]
  },
  "application/x-cdlink": {
    source: "apache",
    extensions: [
      "vcd"
    ]
  },
  "application/x-cfs-compressed": {
    source: "apache",
    extensions: [
      "cfs"
    ]
  },
  "application/x-chat": {
    source: "apache",
    extensions: [
      "chat"
    ]
  },
  "application/x-chess-pgn": {
    source: "apache",
    extensions: [
      "pgn"
    ]
  },
  "application/x-chrome-extension": {
    extensions: [
      "crx"
    ]
  },
  "application/x-cocoa": {
    source: "nginx",
    extensions: [
      "cco"
    ]
  },
  "application/x-compress": {
    source: "apache"
  },
  "application/x-conference": {
    source: "apache",
    extensions: [
      "nsc"
    ]
  },
  "application/x-cpio": {
    source: "apache",
    extensions: [
      "cpio"
    ]
  },
  "application/x-csh": {
    source: "apache",
    extensions: [
      "csh"
    ]
  },
  "application/x-deb": {
    compressible: false
  },
  "application/x-debian-package": {
    source: "apache",
    extensions: [
      "deb",
      "udeb"
    ]
  },
  "application/x-dgc-compressed": {
    source: "apache",
    extensions: [
      "dgc"
    ]
  },
  "application/x-director": {
    source: "apache",
    extensions: [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa"
    ]
  },
  "application/x-doom": {
    source: "apache",
    extensions: [
      "wad"
    ]
  },
  "application/x-dtbncx+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "ncx"
    ]
  },
  "application/x-dtbook+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "dtb"
    ]
  },
  "application/x-dtbresource+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "res"
    ]
  },
  "application/x-dvi": {
    source: "apache",
    compressible: false,
    extensions: [
      "dvi"
    ]
  },
  "application/x-envoy": {
    source: "apache",
    extensions: [
      "evy"
    ]
  },
  "application/x-eva": {
    source: "apache",
    extensions: [
      "eva"
    ]
  },
  "application/x-font-bdf": {
    source: "apache",
    extensions: [
      "bdf"
    ]
  },
  "application/x-font-dos": {
    source: "apache"
  },
  "application/x-font-framemaker": {
    source: "apache"
  },
  "application/x-font-ghostscript": {
    source: "apache",
    extensions: [
      "gsf"
    ]
  },
  "application/x-font-libgrx": {
    source: "apache"
  },
  "application/x-font-linux-psf": {
    source: "apache",
    extensions: [
      "psf"
    ]
  },
  "application/x-font-pcf": {
    source: "apache",
    extensions: [
      "pcf"
    ]
  },
  "application/x-font-snf": {
    source: "apache",
    extensions: [
      "snf"
    ]
  },
  "application/x-font-speedo": {
    source: "apache"
  },
  "application/x-font-sunos-news": {
    source: "apache"
  },
  "application/x-font-type1": {
    source: "apache",
    extensions: [
      "pfa",
      "pfb",
      "pfm",
      "afm"
    ]
  },
  "application/x-font-vfont": {
    source: "apache"
  },
  "application/x-freearc": {
    source: "apache",
    extensions: [
      "arc"
    ]
  },
  "application/x-futuresplash": {
    source: "apache",
    extensions: [
      "spl"
    ]
  },
  "application/x-gca-compressed": {
    source: "apache",
    extensions: [
      "gca"
    ]
  },
  "application/x-glulx": {
    source: "apache",
    extensions: [
      "ulx"
    ]
  },
  "application/x-gnumeric": {
    source: "apache",
    extensions: [
      "gnumeric"
    ]
  },
  "application/x-gramps-xml": {
    source: "apache",
    extensions: [
      "gramps"
    ]
  },
  "application/x-gtar": {
    source: "apache",
    extensions: [
      "gtar"
    ]
  },
  "application/x-gzip": {
    source: "apache"
  },
  "application/x-hdf": {
    source: "apache",
    extensions: [
      "hdf"
    ]
  },
  "application/x-httpd-php": {
    compressible: true,
    extensions: [
      "php"
    ]
  },
  "application/x-install-instructions": {
    source: "apache",
    extensions: [
      "install"
    ]
  },
  "application/x-iso9660-image": {
    source: "apache",
    extensions: [
      "iso"
    ]
  },
  "application/x-iwork-keynote-sffkey": {
    extensions: [
      "key"
    ]
  },
  "application/x-iwork-numbers-sffnumbers": {
    extensions: [
      "numbers"
    ]
  },
  "application/x-iwork-pages-sffpages": {
    extensions: [
      "pages"
    ]
  },
  "application/x-java-archive-diff": {
    source: "nginx",
    extensions: [
      "jardiff"
    ]
  },
  "application/x-java-jnlp-file": {
    source: "apache",
    compressible: false,
    extensions: [
      "jnlp"
    ]
  },
  "application/x-javascript": {
    compressible: true
  },
  "application/x-keepass2": {
    extensions: [
      "kdbx"
    ]
  },
  "application/x-latex": {
    source: "apache",
    compressible: false,
    extensions: [
      "latex"
    ]
  },
  "application/x-lua-bytecode": {
    extensions: [
      "luac"
    ]
  },
  "application/x-lzh-compressed": {
    source: "apache",
    extensions: [
      "lzh",
      "lha"
    ]
  },
  "application/x-makeself": {
    source: "nginx",
    extensions: [
      "run"
    ]
  },
  "application/x-mie": {
    source: "apache",
    extensions: [
      "mie"
    ]
  },
  "application/x-mobipocket-ebook": {
    source: "apache",
    extensions: [
      "prc",
      "mobi"
    ]
  },
  "application/x-mpegurl": {
    compressible: false
  },
  "application/x-ms-application": {
    source: "apache",
    extensions: [
      "application"
    ]
  },
  "application/x-ms-shortcut": {
    source: "apache",
    extensions: [
      "lnk"
    ]
  },
  "application/x-ms-wmd": {
    source: "apache",
    extensions: [
      "wmd"
    ]
  },
  "application/x-ms-wmz": {
    source: "apache",
    extensions: [
      "wmz"
    ]
  },
  "application/x-ms-xbap": {
    source: "apache",
    extensions: [
      "xbap"
    ]
  },
  "application/x-msaccess": {
    source: "apache",
    extensions: [
      "mdb"
    ]
  },
  "application/x-msbinder": {
    source: "apache",
    extensions: [
      "obd"
    ]
  },
  "application/x-mscardfile": {
    source: "apache",
    extensions: [
      "crd"
    ]
  },
  "application/x-msclip": {
    source: "apache",
    extensions: [
      "clp"
    ]
  },
  "application/x-msdos-program": {
    extensions: [
      "exe"
    ]
  },
  "application/x-msdownload": {
    source: "apache",
    extensions: [
      "exe",
      "dll",
      "com",
      "bat",
      "msi"
    ]
  },
  "application/x-msmediaview": {
    source: "apache",
    extensions: [
      "mvb",
      "m13",
      "m14"
    ]
  },
  "application/x-msmetafile": {
    source: "apache",
    extensions: [
      "wmf",
      "wmz",
      "emf",
      "emz"
    ]
  },
  "application/x-msmoney": {
    source: "apache",
    extensions: [
      "mny"
    ]
  },
  "application/x-mspublisher": {
    source: "apache",
    extensions: [
      "pub"
    ]
  },
  "application/x-msschedule": {
    source: "apache",
    extensions: [
      "scd"
    ]
  },
  "application/x-msterminal": {
    source: "apache",
    extensions: [
      "trm"
    ]
  },
  "application/x-mswrite": {
    source: "apache",
    extensions: [
      "wri"
    ]
  },
  "application/x-netcdf": {
    source: "apache",
    extensions: [
      "nc",
      "cdf"
    ]
  },
  "application/x-ns-proxy-autoconfig": {
    compressible: true,
    extensions: [
      "pac"
    ]
  },
  "application/x-nzb": {
    source: "apache",
    extensions: [
      "nzb"
    ]
  },
  "application/x-perl": {
    source: "nginx",
    extensions: [
      "pl",
      "pm"
    ]
  },
  "application/x-pilot": {
    source: "nginx",
    extensions: [
      "prc",
      "pdb"
    ]
  },
  "application/x-pkcs12": {
    source: "apache",
    compressible: false,
    extensions: [
      "p12",
      "pfx"
    ]
  },
  "application/x-pkcs7-certificates": {
    source: "apache",
    extensions: [
      "p7b",
      "spc"
    ]
  },
  "application/x-pkcs7-certreqresp": {
    source: "apache",
    extensions: [
      "p7r"
    ]
  },
  "application/x-pki-message": {
    source: "iana"
  },
  "application/x-rar-compressed": {
    source: "apache",
    compressible: false,
    extensions: [
      "rar"
    ]
  },
  "application/x-redhat-package-manager": {
    source: "nginx",
    extensions: [
      "rpm"
    ]
  },
  "application/x-research-info-systems": {
    source: "apache",
    extensions: [
      "ris"
    ]
  },
  "application/x-sea": {
    source: "nginx",
    extensions: [
      "sea"
    ]
  },
  "application/x-sh": {
    source: "apache",
    compressible: true,
    extensions: [
      "sh"
    ]
  },
  "application/x-shar": {
    source: "apache",
    extensions: [
      "shar"
    ]
  },
  "application/x-shockwave-flash": {
    source: "apache",
    compressible: false,
    extensions: [
      "swf"
    ]
  },
  "application/x-silverlight-app": {
    source: "apache",
    extensions: [
      "xap"
    ]
  },
  "application/x-sql": {
    source: "apache",
    extensions: [
      "sql"
    ]
  },
  "application/x-stuffit": {
    source: "apache",
    compressible: false,
    extensions: [
      "sit"
    ]
  },
  "application/x-stuffitx": {
    source: "apache",
    extensions: [
      "sitx"
    ]
  },
  "application/x-subrip": {
    source: "apache",
    extensions: [
      "srt"
    ]
  },
  "application/x-sv4cpio": {
    source: "apache",
    extensions: [
      "sv4cpio"
    ]
  },
  "application/x-sv4crc": {
    source: "apache",
    extensions: [
      "sv4crc"
    ]
  },
  "application/x-t3vm-image": {
    source: "apache",
    extensions: [
      "t3"
    ]
  },
  "application/x-tads": {
    source: "apache",
    extensions: [
      "gam"
    ]
  },
  "application/x-tar": {
    source: "apache",
    compressible: true,
    extensions: [
      "tar"
    ]
  },
  "application/x-tcl": {
    source: "apache",
    extensions: [
      "tcl",
      "tk"
    ]
  },
  "application/x-tex": {
    source: "apache",
    extensions: [
      "tex"
    ]
  },
  "application/x-tex-tfm": {
    source: "apache",
    extensions: [
      "tfm"
    ]
  },
  "application/x-texinfo": {
    source: "apache",
    extensions: [
      "texinfo",
      "texi"
    ]
  },
  "application/x-tgif": {
    source: "apache",
    extensions: [
      "obj"
    ]
  },
  "application/x-ustar": {
    source: "apache",
    extensions: [
      "ustar"
    ]
  },
  "application/x-virtualbox-hdd": {
    compressible: true,
    extensions: [
      "hdd"
    ]
  },
  "application/x-virtualbox-ova": {
    compressible: true,
    extensions: [
      "ova"
    ]
  },
  "application/x-virtualbox-ovf": {
    compressible: true,
    extensions: [
      "ovf"
    ]
  },
  "application/x-virtualbox-vbox": {
    compressible: true,
    extensions: [
      "vbox"
    ]
  },
  "application/x-virtualbox-vbox-extpack": {
    compressible: false,
    extensions: [
      "vbox-extpack"
    ]
  },
  "application/x-virtualbox-vdi": {
    compressible: true,
    extensions: [
      "vdi"
    ]
  },
  "application/x-virtualbox-vhd": {
    compressible: true,
    extensions: [
      "vhd"
    ]
  },
  "application/x-virtualbox-vmdk": {
    compressible: true,
    extensions: [
      "vmdk"
    ]
  },
  "application/x-wais-source": {
    source: "apache",
    extensions: [
      "src"
    ]
  },
  "application/x-web-app-manifest+json": {
    compressible: true,
    extensions: [
      "webapp"
    ]
  },
  "application/x-www-form-urlencoded": {
    source: "iana",
    compressible: true
  },
  "application/x-x509-ca-cert": {
    source: "iana",
    extensions: [
      "der",
      "crt",
      "pem"
    ]
  },
  "application/x-x509-ca-ra-cert": {
    source: "iana"
  },
  "application/x-x509-next-ca-cert": {
    source: "iana"
  },
  "application/x-xfig": {
    source: "apache",
    extensions: [
      "fig"
    ]
  },
  "application/x-xliff+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "xlf"
    ]
  },
  "application/x-xpinstall": {
    source: "apache",
    compressible: false,
    extensions: [
      "xpi"
    ]
  },
  "application/x-xz": {
    source: "apache",
    extensions: [
      "xz"
    ]
  },
  "application/x-zmachine": {
    source: "apache",
    extensions: [
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "z8"
    ]
  },
  "application/x400-bp": {
    source: "iana"
  },
  "application/xacml+xml": {
    source: "iana",
    compressible: true
  },
  "application/xaml+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "xaml"
    ]
  },
  "application/xcap-att+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xav"
    ]
  },
  "application/xcap-caps+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xca"
    ]
  },
  "application/xcap-diff+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xdf"
    ]
  },
  "application/xcap-el+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xel"
    ]
  },
  "application/xcap-error+xml": {
    source: "iana",
    compressible: true
  },
  "application/xcap-ns+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xns"
    ]
  },
  "application/xcon-conference-info+xml": {
    source: "iana",
    compressible: true
  },
  "application/xcon-conference-info-diff+xml": {
    source: "iana",
    compressible: true
  },
  "application/xenc+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xenc"
    ]
  },
  "application/xhtml+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xhtml",
      "xht"
    ]
  },
  "application/xhtml-voice+xml": {
    source: "apache",
    compressible: true
  },
  "application/xliff+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xlf"
    ]
  },
  "application/xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xml",
      "xsl",
      "xsd",
      "rng"
    ]
  },
  "application/xml-dtd": {
    source: "iana",
    compressible: true,
    extensions: [
      "dtd"
    ]
  },
  "application/xml-external-parsed-entity": {
    source: "iana"
  },
  "application/xml-patch+xml": {
    source: "iana",
    compressible: true
  },
  "application/xmpp+xml": {
    source: "iana",
    compressible: true
  },
  "application/xop+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xop"
    ]
  },
  "application/xproc+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "xpl"
    ]
  },
  "application/xslt+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xsl",
      "xslt"
    ]
  },
  "application/xspf+xml": {
    source: "apache",
    compressible: true,
    extensions: [
      "xspf"
    ]
  },
  "application/xv+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "mxml",
      "xhvml",
      "xvml",
      "xvm"
    ]
  },
  "application/yang": {
    source: "iana",
    extensions: [
      "yang"
    ]
  },
  "application/yang-data+json": {
    source: "iana",
    compressible: true
  },
  "application/yang-data+xml": {
    source: "iana",
    compressible: true
  },
  "application/yang-patch+json": {
    source: "iana",
    compressible: true
  },
  "application/yang-patch+xml": {
    source: "iana",
    compressible: true
  },
  "application/yin+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "yin"
    ]
  },
  "application/zip": {
    source: "iana",
    compressible: false,
    extensions: [
      "zip"
    ]
  },
  "application/zlib": {
    source: "iana"
  },
  "application/zstd": {
    source: "iana"
  },
  "audio/1d-interleaved-parityfec": {
    source: "iana"
  },
  "audio/32kadpcm": {
    source: "iana"
  },
  "audio/3gpp": {
    source: "iana",
    compressible: false,
    extensions: [
      "3gpp"
    ]
  },
  "audio/3gpp2": {
    source: "iana"
  },
  "audio/aac": {
    source: "iana"
  },
  "audio/ac3": {
    source: "iana"
  },
  "audio/adpcm": {
    source: "apache",
    extensions: [
      "adp"
    ]
  },
  "audio/amr": {
    source: "iana",
    extensions: [
      "amr"
    ]
  },
  "audio/amr-wb": {
    source: "iana"
  },
  "audio/amr-wb+": {
    source: "iana"
  },
  "audio/aptx": {
    source: "iana"
  },
  "audio/asc": {
    source: "iana"
  },
  "audio/atrac-advanced-lossless": {
    source: "iana"
  },
  "audio/atrac-x": {
    source: "iana"
  },
  "audio/atrac3": {
    source: "iana"
  },
  "audio/basic": {
    source: "iana",
    compressible: false,
    extensions: [
      "au",
      "snd"
    ]
  },
  "audio/bv16": {
    source: "iana"
  },
  "audio/bv32": {
    source: "iana"
  },
  "audio/clearmode": {
    source: "iana"
  },
  "audio/cn": {
    source: "iana"
  },
  "audio/dat12": {
    source: "iana"
  },
  "audio/dls": {
    source: "iana"
  },
  "audio/dsr-es201108": {
    source: "iana"
  },
  "audio/dsr-es202050": {
    source: "iana"
  },
  "audio/dsr-es202211": {
    source: "iana"
  },
  "audio/dsr-es202212": {
    source: "iana"
  },
  "audio/dv": {
    source: "iana"
  },
  "audio/dvi4": {
    source: "iana"
  },
  "audio/eac3": {
    source: "iana"
  },
  "audio/encaprtp": {
    source: "iana"
  },
  "audio/evrc": {
    source: "iana"
  },
  "audio/evrc-qcp": {
    source: "iana"
  },
  "audio/evrc0": {
    source: "iana"
  },
  "audio/evrc1": {
    source: "iana"
  },
  "audio/evrcb": {
    source: "iana"
  },
  "audio/evrcb0": {
    source: "iana"
  },
  "audio/evrcb1": {
    source: "iana"
  },
  "audio/evrcnw": {
    source: "iana"
  },
  "audio/evrcnw0": {
    source: "iana"
  },
  "audio/evrcnw1": {
    source: "iana"
  },
  "audio/evrcwb": {
    source: "iana"
  },
  "audio/evrcwb0": {
    source: "iana"
  },
  "audio/evrcwb1": {
    source: "iana"
  },
  "audio/evs": {
    source: "iana"
  },
  "audio/flexfec": {
    source: "iana"
  },
  "audio/fwdred": {
    source: "iana"
  },
  "audio/g711-0": {
    source: "iana"
  },
  "audio/g719": {
    source: "iana"
  },
  "audio/g722": {
    source: "iana"
  },
  "audio/g7221": {
    source: "iana"
  },
  "audio/g723": {
    source: "iana"
  },
  "audio/g726-16": {
    source: "iana"
  },
  "audio/g726-24": {
    source: "iana"
  },
  "audio/g726-32": {
    source: "iana"
  },
  "audio/g726-40": {
    source: "iana"
  },
  "audio/g728": {
    source: "iana"
  },
  "audio/g729": {
    source: "iana"
  },
  "audio/g7291": {
    source: "iana"
  },
  "audio/g729d": {
    source: "iana"
  },
  "audio/g729e": {
    source: "iana"
  },
  "audio/gsm": {
    source: "iana"
  },
  "audio/gsm-efr": {
    source: "iana"
  },
  "audio/gsm-hr-08": {
    source: "iana"
  },
  "audio/ilbc": {
    source: "iana"
  },
  "audio/ip-mr_v2.5": {
    source: "iana"
  },
  "audio/isac": {
    source: "apache"
  },
  "audio/l16": {
    source: "iana"
  },
  "audio/l20": {
    source: "iana"
  },
  "audio/l24": {
    source: "iana",
    compressible: false
  },
  "audio/l8": {
    source: "iana"
  },
  "audio/lpc": {
    source: "iana"
  },
  "audio/melp": {
    source: "iana"
  },
  "audio/melp1200": {
    source: "iana"
  },
  "audio/melp2400": {
    source: "iana"
  },
  "audio/melp600": {
    source: "iana"
  },
  "audio/mhas": {
    source: "iana"
  },
  "audio/midi": {
    source: "apache",
    extensions: [
      "mid",
      "midi",
      "kar",
      "rmi"
    ]
  },
  "audio/mobile-xmf": {
    source: "iana",
    extensions: [
      "mxmf"
    ]
  },
  "audio/mp3": {
    compressible: false,
    extensions: [
      "mp3"
    ]
  },
  "audio/mp4": {
    source: "iana",
    compressible: false,
    extensions: [
      "m4a",
      "mp4a"
    ]
  },
  "audio/mp4a-latm": {
    source: "iana"
  },
  "audio/mpa": {
    source: "iana"
  },
  "audio/mpa-robust": {
    source: "iana"
  },
  "audio/mpeg": {
    source: "iana",
    compressible: false,
    extensions: [
      "mpga",
      "mp2",
      "mp2a",
      "mp3",
      "m2a",
      "m3a"
    ]
  },
  "audio/mpeg4-generic": {
    source: "iana"
  },
  "audio/musepack": {
    source: "apache"
  },
  "audio/ogg": {
    source: "iana",
    compressible: false,
    extensions: [
      "oga",
      "ogg",
      "spx",
      "opus"
    ]
  },
  "audio/opus": {
    source: "iana"
  },
  "audio/parityfec": {
    source: "iana"
  },
  "audio/pcma": {
    source: "iana"
  },
  "audio/pcma-wb": {
    source: "iana"
  },
  "audio/pcmu": {
    source: "iana"
  },
  "audio/pcmu-wb": {
    source: "iana"
  },
  "audio/prs.sid": {
    source: "iana"
  },
  "audio/qcelp": {
    source: "iana"
  },
  "audio/raptorfec": {
    source: "iana"
  },
  "audio/red": {
    source: "iana"
  },
  "audio/rtp-enc-aescm128": {
    source: "iana"
  },
  "audio/rtp-midi": {
    source: "iana"
  },
  "audio/rtploopback": {
    source: "iana"
  },
  "audio/rtx": {
    source: "iana"
  },
  "audio/s3m": {
    source: "apache",
    extensions: [
      "s3m"
    ]
  },
  "audio/scip": {
    source: "iana"
  },
  "audio/silk": {
    source: "apache",
    extensions: [
      "sil"
    ]
  },
  "audio/smv": {
    source: "iana"
  },
  "audio/smv-qcp": {
    source: "iana"
  },
  "audio/smv0": {
    source: "iana"
  },
  "audio/sofa": {
    source: "iana"
  },
  "audio/sp-midi": {
    source: "iana"
  },
  "audio/speex": {
    source: "iana"
  },
  "audio/t140c": {
    source: "iana"
  },
  "audio/t38": {
    source: "iana"
  },
  "audio/telephone-event": {
    source: "iana"
  },
  "audio/tetra_acelp": {
    source: "iana"
  },
  "audio/tetra_acelp_bb": {
    source: "iana"
  },
  "audio/tone": {
    source: "iana"
  },
  "audio/tsvcis": {
    source: "iana"
  },
  "audio/uemclip": {
    source: "iana"
  },
  "audio/ulpfec": {
    source: "iana"
  },
  "audio/usac": {
    source: "iana"
  },
  "audio/vdvi": {
    source: "iana"
  },
  "audio/vmr-wb": {
    source: "iana"
  },
  "audio/vnd.3gpp.iufp": {
    source: "iana"
  },
  "audio/vnd.4sb": {
    source: "iana"
  },
  "audio/vnd.audiokoz": {
    source: "iana"
  },
  "audio/vnd.celp": {
    source: "iana"
  },
  "audio/vnd.cisco.nse": {
    source: "iana"
  },
  "audio/vnd.cmles.radio-events": {
    source: "iana"
  },
  "audio/vnd.cns.anp1": {
    source: "iana"
  },
  "audio/vnd.cns.inf1": {
    source: "iana"
  },
  "audio/vnd.dece.audio": {
    source: "iana",
    extensions: [
      "uva",
      "uvva"
    ]
  },
  "audio/vnd.digital-winds": {
    source: "iana",
    extensions: [
      "eol"
    ]
  },
  "audio/vnd.dlna.adts": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    source: "iana"
  },
  "audio/vnd.dolby.mlp": {
    source: "iana"
  },
  "audio/vnd.dolby.mps": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2x": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2z": {
    source: "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    source: "iana"
  },
  "audio/vnd.dra": {
    source: "iana",
    extensions: [
      "dra"
    ]
  },
  "audio/vnd.dts": {
    source: "iana",
    extensions: [
      "dts"
    ]
  },
  "audio/vnd.dts.hd": {
    source: "iana",
    extensions: [
      "dtshd"
    ]
  },
  "audio/vnd.dts.uhd": {
    source: "iana"
  },
  "audio/vnd.dvb.file": {
    source: "iana"
  },
  "audio/vnd.everad.plj": {
    source: "iana"
  },
  "audio/vnd.hns.audio": {
    source: "iana"
  },
  "audio/vnd.lucent.voice": {
    source: "iana",
    extensions: [
      "lvp"
    ]
  },
  "audio/vnd.ms-playready.media.pya": {
    source: "iana",
    extensions: [
      "pya"
    ]
  },
  "audio/vnd.nokia.mobile-xmf": {
    source: "iana"
  },
  "audio/vnd.nortel.vbk": {
    source: "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    source: "iana",
    extensions: [
      "ecelp4800"
    ]
  },
  "audio/vnd.nuera.ecelp7470": {
    source: "iana",
    extensions: [
      "ecelp7470"
    ]
  },
  "audio/vnd.nuera.ecelp9600": {
    source: "iana",
    extensions: [
      "ecelp9600"
    ]
  },
  "audio/vnd.octel.sbc": {
    source: "iana"
  },
  "audio/vnd.presonus.multitrack": {
    source: "iana"
  },
  "audio/vnd.qcelp": {
    source: "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    source: "iana"
  },
  "audio/vnd.rip": {
    source: "iana",
    extensions: [
      "rip"
    ]
  },
  "audio/vnd.rn-realaudio": {
    compressible: false
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    source: "iana"
  },
  "audio/vnd.vmx.cvsd": {
    source: "iana"
  },
  "audio/vnd.wave": {
    compressible: false
  },
  "audio/vorbis": {
    source: "iana",
    compressible: false
  },
  "audio/vorbis-config": {
    source: "iana"
  },
  "audio/wav": {
    compressible: false,
    extensions: [
      "wav"
    ]
  },
  "audio/wave": {
    compressible: false,
    extensions: [
      "wav"
    ]
  },
  "audio/webm": {
    source: "apache",
    compressible: false,
    extensions: [
      "weba"
    ]
  },
  "audio/x-aac": {
    source: "apache",
    compressible: false,
    extensions: [
      "aac"
    ]
  },
  "audio/x-aiff": {
    source: "apache",
    extensions: [
      "aif",
      "aiff",
      "aifc"
    ]
  },
  "audio/x-caf": {
    source: "apache",
    compressible: false,
    extensions: [
      "caf"
    ]
  },
  "audio/x-flac": {
    source: "apache",
    extensions: [
      "flac"
    ]
  },
  "audio/x-m4a": {
    source: "nginx",
    extensions: [
      "m4a"
    ]
  },
  "audio/x-matroska": {
    source: "apache",
    extensions: [
      "mka"
    ]
  },
  "audio/x-mpegurl": {
    source: "apache",
    extensions: [
      "m3u"
    ]
  },
  "audio/x-ms-wax": {
    source: "apache",
    extensions: [
      "wax"
    ]
  },
  "audio/x-ms-wma": {
    source: "apache",
    extensions: [
      "wma"
    ]
  },
  "audio/x-pn-realaudio": {
    source: "apache",
    extensions: [
      "ram",
      "ra"
    ]
  },
  "audio/x-pn-realaudio-plugin": {
    source: "apache",
    extensions: [
      "rmp"
    ]
  },
  "audio/x-realaudio": {
    source: "nginx",
    extensions: [
      "ra"
    ]
  },
  "audio/x-tta": {
    source: "apache"
  },
  "audio/x-wav": {
    source: "apache",
    extensions: [
      "wav"
    ]
  },
  "audio/xm": {
    source: "apache",
    extensions: [
      "xm"
    ]
  },
  "chemical/x-cdx": {
    source: "apache",
    extensions: [
      "cdx"
    ]
  },
  "chemical/x-cif": {
    source: "apache",
    extensions: [
      "cif"
    ]
  },
  "chemical/x-cmdf": {
    source: "apache",
    extensions: [
      "cmdf"
    ]
  },
  "chemical/x-cml": {
    source: "apache",
    extensions: [
      "cml"
    ]
  },
  "chemical/x-csml": {
    source: "apache",
    extensions: [
      "csml"
    ]
  },
  "chemical/x-pdb": {
    source: "apache"
  },
  "chemical/x-xyz": {
    source: "apache",
    extensions: [
      "xyz"
    ]
  },
  "font/collection": {
    source: "iana",
    extensions: [
      "ttc"
    ]
  },
  "font/otf": {
    source: "iana",
    compressible: true,
    extensions: [
      "otf"
    ]
  },
  "font/sfnt": {
    source: "iana"
  },
  "font/ttf": {
    source: "iana",
    compressible: true,
    extensions: [
      "ttf"
    ]
  },
  "font/woff": {
    source: "iana",
    extensions: [
      "woff"
    ]
  },
  "font/woff2": {
    source: "iana",
    extensions: [
      "woff2"
    ]
  },
  "image/aces": {
    source: "iana",
    extensions: [
      "exr"
    ]
  },
  "image/apng": {
    compressible: false,
    extensions: [
      "apng"
    ]
  },
  "image/avci": {
    source: "iana",
    extensions: [
      "avci"
    ]
  },
  "image/avcs": {
    source: "iana",
    extensions: [
      "avcs"
    ]
  },
  "image/avif": {
    source: "iana",
    compressible: false,
    extensions: [
      "avif"
    ]
  },
  "image/bmp": {
    source: "iana",
    compressible: true,
    extensions: [
      "bmp"
    ]
  },
  "image/cgm": {
    source: "iana",
    extensions: [
      "cgm"
    ]
  },
  "image/dicom-rle": {
    source: "iana",
    extensions: [
      "drle"
    ]
  },
  "image/emf": {
    source: "iana",
    extensions: [
      "emf"
    ]
  },
  "image/fits": {
    source: "iana",
    extensions: [
      "fits"
    ]
  },
  "image/g3fax": {
    source: "iana",
    extensions: [
      "g3"
    ]
  },
  "image/gif": {
    source: "iana",
    compressible: false,
    extensions: [
      "gif"
    ]
  },
  "image/heic": {
    source: "iana",
    extensions: [
      "heic"
    ]
  },
  "image/heic-sequence": {
    source: "iana",
    extensions: [
      "heics"
    ]
  },
  "image/heif": {
    source: "iana",
    extensions: [
      "heif"
    ]
  },
  "image/heif-sequence": {
    source: "iana",
    extensions: [
      "heifs"
    ]
  },
  "image/hej2k": {
    source: "iana",
    extensions: [
      "hej2"
    ]
  },
  "image/hsj2": {
    source: "iana",
    extensions: [
      "hsj2"
    ]
  },
  "image/ief": {
    source: "iana",
    extensions: [
      "ief"
    ]
  },
  "image/jls": {
    source: "iana",
    extensions: [
      "jls"
    ]
  },
  "image/jp2": {
    source: "iana",
    compressible: false,
    extensions: [
      "jp2",
      "jpg2"
    ]
  },
  "image/jpeg": {
    source: "iana",
    compressible: false,
    extensions: [
      "jpeg",
      "jpg",
      "jpe"
    ]
  },
  "image/jph": {
    source: "iana",
    extensions: [
      "jph"
    ]
  },
  "image/jphc": {
    source: "iana",
    extensions: [
      "jhc"
    ]
  },
  "image/jpm": {
    source: "iana",
    compressible: false,
    extensions: [
      "jpm"
    ]
  },
  "image/jpx": {
    source: "iana",
    compressible: false,
    extensions: [
      "jpx",
      "jpf"
    ]
  },
  "image/jxr": {
    source: "iana",
    extensions: [
      "jxr"
    ]
  },
  "image/jxra": {
    source: "iana",
    extensions: [
      "jxra"
    ]
  },
  "image/jxrs": {
    source: "iana",
    extensions: [
      "jxrs"
    ]
  },
  "image/jxs": {
    source: "iana",
    extensions: [
      "jxs"
    ]
  },
  "image/jxsc": {
    source: "iana",
    extensions: [
      "jxsc"
    ]
  },
  "image/jxsi": {
    source: "iana",
    extensions: [
      "jxsi"
    ]
  },
  "image/jxss": {
    source: "iana",
    extensions: [
      "jxss"
    ]
  },
  "image/ktx": {
    source: "iana",
    extensions: [
      "ktx"
    ]
  },
  "image/ktx2": {
    source: "iana",
    extensions: [
      "ktx2"
    ]
  },
  "image/naplps": {
    source: "iana"
  },
  "image/pjpeg": {
    compressible: false
  },
  "image/png": {
    source: "iana",
    compressible: false,
    extensions: [
      "png"
    ]
  },
  "image/prs.btif": {
    source: "iana",
    extensions: [
      "btif"
    ]
  },
  "image/prs.pti": {
    source: "iana",
    extensions: [
      "pti"
    ]
  },
  "image/pwg-raster": {
    source: "iana"
  },
  "image/sgi": {
    source: "apache",
    extensions: [
      "sgi"
    ]
  },
  "image/svg+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "svg",
      "svgz"
    ]
  },
  "image/t38": {
    source: "iana",
    extensions: [
      "t38"
    ]
  },
  "image/tiff": {
    source: "iana",
    compressible: false,
    extensions: [
      "tif",
      "tiff"
    ]
  },
  "image/tiff-fx": {
    source: "iana",
    extensions: [
      "tfx"
    ]
  },
  "image/vnd.adobe.photoshop": {
    source: "iana",
    compressible: true,
    extensions: [
      "psd"
    ]
  },
  "image/vnd.airzip.accelerator.azv": {
    source: "iana",
    extensions: [
      "azv"
    ]
  },
  "image/vnd.cns.inf2": {
    source: "iana"
  },
  "image/vnd.dece.graphic": {
    source: "iana",
    extensions: [
      "uvi",
      "uvvi",
      "uvg",
      "uvvg"
    ]
  },
  "image/vnd.djvu": {
    source: "iana",
    extensions: [
      "djvu",
      "djv"
    ]
  },
  "image/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "image/vnd.dwg": {
    source: "iana",
    extensions: [
      "dwg"
    ]
  },
  "image/vnd.dxf": {
    source: "iana",
    extensions: [
      "dxf"
    ]
  },
  "image/vnd.fastbidsheet": {
    source: "iana",
    extensions: [
      "fbs"
    ]
  },
  "image/vnd.fpx": {
    source: "iana",
    extensions: [
      "fpx"
    ]
  },
  "image/vnd.fst": {
    source: "iana",
    extensions: [
      "fst"
    ]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    source: "iana",
    extensions: [
      "mmr"
    ]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    source: "iana",
    extensions: [
      "rlc"
    ]
  },
  "image/vnd.globalgraphics.pgb": {
    source: "iana"
  },
  "image/vnd.microsoft.icon": {
    source: "iana",
    compressible: true,
    extensions: [
      "ico"
    ]
  },
  "image/vnd.mix": {
    source: "iana"
  },
  "image/vnd.mozilla.apng": {
    source: "iana"
  },
  "image/vnd.ms-dds": {
    compressible: true,
    extensions: [
      "dds"
    ]
  },
  "image/vnd.ms-modi": {
    source: "iana",
    extensions: [
      "mdi"
    ]
  },
  "image/vnd.ms-photo": {
    source: "apache",
    extensions: [
      "wdp"
    ]
  },
  "image/vnd.net-fpx": {
    source: "iana",
    extensions: [
      "npx"
    ]
  },
  "image/vnd.pco.b16": {
    source: "iana",
    extensions: [
      "b16"
    ]
  },
  "image/vnd.radiance": {
    source: "iana"
  },
  "image/vnd.sealed.png": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    source: "iana"
  },
  "image/vnd.svf": {
    source: "iana"
  },
  "image/vnd.tencent.tap": {
    source: "iana",
    extensions: [
      "tap"
    ]
  },
  "image/vnd.valve.source.texture": {
    source: "iana",
    extensions: [
      "vtf"
    ]
  },
  "image/vnd.wap.wbmp": {
    source: "iana",
    extensions: [
      "wbmp"
    ]
  },
  "image/vnd.xiff": {
    source: "iana",
    extensions: [
      "xif"
    ]
  },
  "image/vnd.zbrush.pcx": {
    source: "iana",
    extensions: [
      "pcx"
    ]
  },
  "image/webp": {
    source: "apache",
    extensions: [
      "webp"
    ]
  },
  "image/wmf": {
    source: "iana",
    extensions: [
      "wmf"
    ]
  },
  "image/x-3ds": {
    source: "apache",
    extensions: [
      "3ds"
    ]
  },
  "image/x-cmu-raster": {
    source: "apache",
    extensions: [
      "ras"
    ]
  },
  "image/x-cmx": {
    source: "apache",
    extensions: [
      "cmx"
    ]
  },
  "image/x-freehand": {
    source: "apache",
    extensions: [
      "fh",
      "fhc",
      "fh4",
      "fh5",
      "fh7"
    ]
  },
  "image/x-icon": {
    source: "apache",
    compressible: true,
    extensions: [
      "ico"
    ]
  },
  "image/x-jng": {
    source: "nginx",
    extensions: [
      "jng"
    ]
  },
  "image/x-mrsid-image": {
    source: "apache",
    extensions: [
      "sid"
    ]
  },
  "image/x-ms-bmp": {
    source: "nginx",
    compressible: true,
    extensions: [
      "bmp"
    ]
  },
  "image/x-pcx": {
    source: "apache",
    extensions: [
      "pcx"
    ]
  },
  "image/x-pict": {
    source: "apache",
    extensions: [
      "pic",
      "pct"
    ]
  },
  "image/x-portable-anymap": {
    source: "apache",
    extensions: [
      "pnm"
    ]
  },
  "image/x-portable-bitmap": {
    source: "apache",
    extensions: [
      "pbm"
    ]
  },
  "image/x-portable-graymap": {
    source: "apache",
    extensions: [
      "pgm"
    ]
  },
  "image/x-portable-pixmap": {
    source: "apache",
    extensions: [
      "ppm"
    ]
  },
  "image/x-rgb": {
    source: "apache",
    extensions: [
      "rgb"
    ]
  },
  "image/x-tga": {
    source: "apache",
    extensions: [
      "tga"
    ]
  },
  "image/x-xbitmap": {
    source: "apache",
    extensions: [
      "xbm"
    ]
  },
  "image/x-xcf": {
    compressible: false
  },
  "image/x-xpixmap": {
    source: "apache",
    extensions: [
      "xpm"
    ]
  },
  "image/x-xwindowdump": {
    source: "apache",
    extensions: [
      "xwd"
    ]
  },
  "message/cpim": {
    source: "iana"
  },
  "message/delivery-status": {
    source: "iana"
  },
  "message/disposition-notification": {
    source: "iana",
    extensions: [
      "disposition-notification"
    ]
  },
  "message/external-body": {
    source: "iana"
  },
  "message/feedback-report": {
    source: "iana"
  },
  "message/global": {
    source: "iana",
    extensions: [
      "u8msg"
    ]
  },
  "message/global-delivery-status": {
    source: "iana",
    extensions: [
      "u8dsn"
    ]
  },
  "message/global-disposition-notification": {
    source: "iana",
    extensions: [
      "u8mdn"
    ]
  },
  "message/global-headers": {
    source: "iana",
    extensions: [
      "u8hdr"
    ]
  },
  "message/http": {
    source: "iana",
    compressible: false
  },
  "message/imdn+xml": {
    source: "iana",
    compressible: true
  },
  "message/news": {
    source: "iana"
  },
  "message/partial": {
    source: "iana",
    compressible: false
  },
  "message/rfc822": {
    source: "iana",
    compressible: true,
    extensions: [
      "eml",
      "mime"
    ]
  },
  "message/s-http": {
    source: "iana"
  },
  "message/sip": {
    source: "iana"
  },
  "message/sipfrag": {
    source: "iana"
  },
  "message/tracking-status": {
    source: "iana"
  },
  "message/vnd.si.simp": {
    source: "iana"
  },
  "message/vnd.wfa.wsc": {
    source: "iana",
    extensions: [
      "wsc"
    ]
  },
  "model/3mf": {
    source: "iana",
    extensions: [
      "3mf"
    ]
  },
  "model/e57": {
    source: "iana"
  },
  "model/gltf+json": {
    source: "iana",
    compressible: true,
    extensions: [
      "gltf"
    ]
  },
  "model/gltf-binary": {
    source: "iana",
    compressible: true,
    extensions: [
      "glb"
    ]
  },
  "model/iges": {
    source: "iana",
    compressible: false,
    extensions: [
      "igs",
      "iges"
    ]
  },
  "model/mesh": {
    source: "iana",
    compressible: false,
    extensions: [
      "msh",
      "mesh",
      "silo"
    ]
  },
  "model/mtl": {
    source: "iana",
    extensions: [
      "mtl"
    ]
  },
  "model/obj": {
    source: "iana",
    extensions: [
      "obj"
    ]
  },
  "model/step": {
    source: "iana"
  },
  "model/step+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "stpx"
    ]
  },
  "model/step+zip": {
    source: "iana",
    compressible: false,
    extensions: [
      "stpz"
    ]
  },
  "model/step-xml+zip": {
    source: "iana",
    compressible: false,
    extensions: [
      "stpxz"
    ]
  },
  "model/stl": {
    source: "iana",
    extensions: [
      "stl"
    ]
  },
  "model/vnd.collada+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "dae"
    ]
  },
  "model/vnd.dwf": {
    source: "iana",
    extensions: [
      "dwf"
    ]
  },
  "model/vnd.flatland.3dml": {
    source: "iana"
  },
  "model/vnd.gdl": {
    source: "iana",
    extensions: [
      "gdl"
    ]
  },
  "model/vnd.gs-gdl": {
    source: "apache"
  },
  "model/vnd.gs.gdl": {
    source: "iana"
  },
  "model/vnd.gtw": {
    source: "iana",
    extensions: [
      "gtw"
    ]
  },
  "model/vnd.moml+xml": {
    source: "iana",
    compressible: true
  },
  "model/vnd.mts": {
    source: "iana",
    extensions: [
      "mts"
    ]
  },
  "model/vnd.opengex": {
    source: "iana",
    extensions: [
      "ogex"
    ]
  },
  "model/vnd.parasolid.transmit.binary": {
    source: "iana",
    extensions: [
      "x_b"
    ]
  },
  "model/vnd.parasolid.transmit.text": {
    source: "iana",
    extensions: [
      "x_t"
    ]
  },
  "model/vnd.pytha.pyox": {
    source: "iana"
  },
  "model/vnd.rosette.annotated-data-model": {
    source: "iana"
  },
  "model/vnd.sap.vds": {
    source: "iana",
    extensions: [
      "vds"
    ]
  },
  "model/vnd.usdz+zip": {
    source: "iana",
    compressible: false,
    extensions: [
      "usdz"
    ]
  },
  "model/vnd.valve.source.compiled-map": {
    source: "iana",
    extensions: [
      "bsp"
    ]
  },
  "model/vnd.vtu": {
    source: "iana",
    extensions: [
      "vtu"
    ]
  },
  "model/vrml": {
    source: "iana",
    compressible: false,
    extensions: [
      "wrl",
      "vrml"
    ]
  },
  "model/x3d+binary": {
    source: "apache",
    compressible: false,
    extensions: [
      "x3db",
      "x3dbz"
    ]
  },
  "model/x3d+fastinfoset": {
    source: "iana",
    extensions: [
      "x3db"
    ]
  },
  "model/x3d+vrml": {
    source: "apache",
    compressible: false,
    extensions: [
      "x3dv",
      "x3dvz"
    ]
  },
  "model/x3d+xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "x3d",
      "x3dz"
    ]
  },
  "model/x3d-vrml": {
    source: "iana",
    extensions: [
      "x3dv"
    ]
  },
  "multipart/alternative": {
    source: "iana",
    compressible: false
  },
  "multipart/appledouble": {
    source: "iana"
  },
  "multipart/byteranges": {
    source: "iana"
  },
  "multipart/digest": {
    source: "iana"
  },
  "multipart/encrypted": {
    source: "iana",
    compressible: false
  },
  "multipart/form-data": {
    source: "iana",
    compressible: false
  },
  "multipart/header-set": {
    source: "iana"
  },
  "multipart/mixed": {
    source: "iana"
  },
  "multipart/multilingual": {
    source: "iana"
  },
  "multipart/parallel": {
    source: "iana"
  },
  "multipart/related": {
    source: "iana",
    compressible: false
  },
  "multipart/report": {
    source: "iana"
  },
  "multipart/signed": {
    source: "iana",
    compressible: false
  },
  "multipart/vnd.bint.med-plus": {
    source: "iana"
  },
  "multipart/voice-message": {
    source: "iana"
  },
  "multipart/x-mixed-replace": {
    source: "iana"
  },
  "text/1d-interleaved-parityfec": {
    source: "iana"
  },
  "text/cache-manifest": {
    source: "iana",
    compressible: true,
    extensions: [
      "appcache",
      "manifest"
    ]
  },
  "text/calendar": {
    source: "iana",
    extensions: [
      "ics",
      "ifb"
    ]
  },
  "text/calender": {
    compressible: true
  },
  "text/cmd": {
    compressible: true
  },
  "text/coffeescript": {
    extensions: [
      "coffee",
      "litcoffee"
    ]
  },
  "text/cql": {
    source: "iana"
  },
  "text/cql-expression": {
    source: "iana"
  },
  "text/cql-identifier": {
    source: "iana"
  },
  "text/css": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "css"
    ]
  },
  "text/csv": {
    source: "iana",
    compressible: true,
    extensions: [
      "csv"
    ]
  },
  "text/csv-schema": {
    source: "iana"
  },
  "text/directory": {
    source: "iana"
  },
  "text/dns": {
    source: "iana"
  },
  "text/ecmascript": {
    source: "iana"
  },
  "text/encaprtp": {
    source: "iana"
  },
  "text/enriched": {
    source: "iana"
  },
  "text/fhirpath": {
    source: "iana"
  },
  "text/flexfec": {
    source: "iana"
  },
  "text/fwdred": {
    source: "iana"
  },
  "text/gff3": {
    source: "iana"
  },
  "text/grammar-ref-list": {
    source: "iana"
  },
  "text/html": {
    source: "iana",
    compressible: true,
    extensions: [
      "html",
      "htm",
      "shtml"
    ]
  },
  "text/jade": {
    extensions: [
      "jade"
    ]
  },
  "text/javascript": {
    source: "iana",
    compressible: true
  },
  "text/jcr-cnd": {
    source: "iana"
  },
  "text/jsx": {
    compressible: true,
    extensions: [
      "jsx"
    ]
  },
  "text/less": {
    compressible: true,
    extensions: [
      "less"
    ]
  },
  "text/markdown": {
    source: "iana",
    compressible: true,
    extensions: [
      "markdown",
      "md"
    ]
  },
  "text/mathml": {
    source: "nginx",
    extensions: [
      "mml"
    ]
  },
  "text/mdx": {
    compressible: true,
    extensions: [
      "mdx"
    ]
  },
  "text/mizar": {
    source: "iana"
  },
  "text/n3": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "n3"
    ]
  },
  "text/parameters": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/parityfec": {
    source: "iana"
  },
  "text/plain": {
    source: "iana",
    compressible: true,
    extensions: [
      "txt",
      "text",
      "conf",
      "def",
      "list",
      "log",
      "in",
      "ini"
    ]
  },
  "text/provenance-notation": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/prs.fallenstein.rst": {
    source: "iana"
  },
  "text/prs.lines.tag": {
    source: "iana",
    extensions: [
      "dsc"
    ]
  },
  "text/prs.prop.logic": {
    source: "iana"
  },
  "text/raptorfec": {
    source: "iana"
  },
  "text/red": {
    source: "iana"
  },
  "text/rfc822-headers": {
    source: "iana"
  },
  "text/richtext": {
    source: "iana",
    compressible: true,
    extensions: [
      "rtx"
    ]
  },
  "text/rtf": {
    source: "iana",
    compressible: true,
    extensions: [
      "rtf"
    ]
  },
  "text/rtp-enc-aescm128": {
    source: "iana"
  },
  "text/rtploopback": {
    source: "iana"
  },
  "text/rtx": {
    source: "iana"
  },
  "text/sgml": {
    source: "iana",
    extensions: [
      "sgml",
      "sgm"
    ]
  },
  "text/shaclc": {
    source: "iana"
  },
  "text/shex": {
    source: "iana",
    extensions: [
      "shex"
    ]
  },
  "text/slim": {
    extensions: [
      "slim",
      "slm"
    ]
  },
  "text/spdx": {
    source: "iana",
    extensions: [
      "spdx"
    ]
  },
  "text/strings": {
    source: "iana"
  },
  "text/stylus": {
    extensions: [
      "stylus",
      "styl"
    ]
  },
  "text/t140": {
    source: "iana"
  },
  "text/tab-separated-values": {
    source: "iana",
    compressible: true,
    extensions: [
      "tsv"
    ]
  },
  "text/troff": {
    source: "iana",
    extensions: [
      "t",
      "tr",
      "roff",
      "man",
      "me",
      "ms"
    ]
  },
  "text/turtle": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "ttl"
    ]
  },
  "text/ulpfec": {
    source: "iana"
  },
  "text/uri-list": {
    source: "iana",
    compressible: true,
    extensions: [
      "uri",
      "uris",
      "urls"
    ]
  },
  "text/vcard": {
    source: "iana",
    compressible: true,
    extensions: [
      "vcard"
    ]
  },
  "text/vnd.a": {
    source: "iana"
  },
  "text/vnd.abc": {
    source: "iana"
  },
  "text/vnd.ascii-art": {
    source: "iana"
  },
  "text/vnd.curl": {
    source: "iana",
    extensions: [
      "curl"
    ]
  },
  "text/vnd.curl.dcurl": {
    source: "apache",
    extensions: [
      "dcurl"
    ]
  },
  "text/vnd.curl.mcurl": {
    source: "apache",
    extensions: [
      "mcurl"
    ]
  },
  "text/vnd.curl.scurl": {
    source: "apache",
    extensions: [
      "scurl"
    ]
  },
  "text/vnd.debian.copyright": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.dmclientscript": {
    source: "iana"
  },
  "text/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "text/vnd.esmertec.theme-descriptor": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.familysearch.gedcom": {
    source: "iana",
    extensions: [
      "ged"
    ]
  },
  "text/vnd.ficlab.flt": {
    source: "iana"
  },
  "text/vnd.fly": {
    source: "iana",
    extensions: [
      "fly"
    ]
  },
  "text/vnd.fmi.flexstor": {
    source: "iana",
    extensions: [
      "flx"
    ]
  },
  "text/vnd.gml": {
    source: "iana"
  },
  "text/vnd.graphviz": {
    source: "iana",
    extensions: [
      "gv"
    ]
  },
  "text/vnd.hans": {
    source: "iana"
  },
  "text/vnd.hgl": {
    source: "iana"
  },
  "text/vnd.in3d.3dml": {
    source: "iana",
    extensions: [
      "3dml"
    ]
  },
  "text/vnd.in3d.spot": {
    source: "iana",
    extensions: [
      "spot"
    ]
  },
  "text/vnd.iptc.newsml": {
    source: "iana"
  },
  "text/vnd.iptc.nitf": {
    source: "iana"
  },
  "text/vnd.latex-z": {
    source: "iana"
  },
  "text/vnd.motorola.reflex": {
    source: "iana"
  },
  "text/vnd.ms-mediapackage": {
    source: "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    source: "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    source: "iana"
  },
  "text/vnd.senx.warpscript": {
    source: "iana"
  },
  "text/vnd.si.uricatalogue": {
    source: "iana"
  },
  "text/vnd.sosi": {
    source: "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "jad"
    ]
  },
  "text/vnd.trolltech.linguist": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.wap.si": {
    source: "iana"
  },
  "text/vnd.wap.sl": {
    source: "iana"
  },
  "text/vnd.wap.wml": {
    source: "iana",
    extensions: [
      "wml"
    ]
  },
  "text/vnd.wap.wmlscript": {
    source: "iana",
    extensions: [
      "wmls"
    ]
  },
  "text/vtt": {
    source: "iana",
    charset: "UTF-8",
    compressible: true,
    extensions: [
      "vtt"
    ]
  },
  "text/x-asm": {
    source: "apache",
    extensions: [
      "s",
      "asm"
    ]
  },
  "text/x-c": {
    source: "apache",
    extensions: [
      "c",
      "cc",
      "cxx",
      "cpp",
      "h",
      "hh",
      "dic"
    ]
  },
  "text/x-component": {
    source: "nginx",
    extensions: [
      "htc"
    ]
  },
  "text/x-fortran": {
    source: "apache",
    extensions: [
      "f",
      "for",
      "f77",
      "f90"
    ]
  },
  "text/x-gwt-rpc": {
    compressible: true
  },
  "text/x-handlebars-template": {
    extensions: [
      "hbs"
    ]
  },
  "text/x-java-source": {
    source: "apache",
    extensions: [
      "java"
    ]
  },
  "text/x-jquery-tmpl": {
    compressible: true
  },
  "text/x-lua": {
    extensions: [
      "lua"
    ]
  },
  "text/x-markdown": {
    compressible: true,
    extensions: [
      "mkd"
    ]
  },
  "text/x-nfo": {
    source: "apache",
    extensions: [
      "nfo"
    ]
  },
  "text/x-opml": {
    source: "apache",
    extensions: [
      "opml"
    ]
  },
  "text/x-org": {
    compressible: true,
    extensions: [
      "org"
    ]
  },
  "text/x-pascal": {
    source: "apache",
    extensions: [
      "p",
      "pas"
    ]
  },
  "text/x-processing": {
    compressible: true,
    extensions: [
      "pde"
    ]
  },
  "text/x-sass": {
    extensions: [
      "sass"
    ]
  },
  "text/x-scss": {
    extensions: [
      "scss"
    ]
  },
  "text/x-setext": {
    source: "apache",
    extensions: [
      "etx"
    ]
  },
  "text/x-sfv": {
    source: "apache",
    extensions: [
      "sfv"
    ]
  },
  "text/x-suse-ymp": {
    compressible: true,
    extensions: [
      "ymp"
    ]
  },
  "text/x-uuencode": {
    source: "apache",
    extensions: [
      "uu"
    ]
  },
  "text/x-vcalendar": {
    source: "apache",
    extensions: [
      "vcs"
    ]
  },
  "text/x-vcard": {
    source: "apache",
    extensions: [
      "vcf"
    ]
  },
  "text/xml": {
    source: "iana",
    compressible: true,
    extensions: [
      "xml"
    ]
  },
  "text/xml-external-parsed-entity": {
    source: "iana"
  },
  "text/yaml": {
    compressible: true,
    extensions: [
      "yaml",
      "yml"
    ]
  },
  "video/1d-interleaved-parityfec": {
    source: "iana"
  },
  "video/3gpp": {
    source: "iana",
    extensions: [
      "3gp",
      "3gpp"
    ]
  },
  "video/3gpp-tt": {
    source: "iana"
  },
  "video/3gpp2": {
    source: "iana",
    extensions: [
      "3g2"
    ]
  },
  "video/av1": {
    source: "iana"
  },
  "video/bmpeg": {
    source: "iana"
  },
  "video/bt656": {
    source: "iana"
  },
  "video/celb": {
    source: "iana"
  },
  "video/dv": {
    source: "iana"
  },
  "video/encaprtp": {
    source: "iana"
  },
  "video/ffv1": {
    source: "iana"
  },
  "video/flexfec": {
    source: "iana"
  },
  "video/h261": {
    source: "iana",
    extensions: [
      "h261"
    ]
  },
  "video/h263": {
    source: "iana",
    extensions: [
      "h263"
    ]
  },
  "video/h263-1998": {
    source: "iana"
  },
  "video/h263-2000": {
    source: "iana"
  },
  "video/h264": {
    source: "iana",
    extensions: [
      "h264"
    ]
  },
  "video/h264-rcdo": {
    source: "iana"
  },
  "video/h264-svc": {
    source: "iana"
  },
  "video/h265": {
    source: "iana"
  },
  "video/iso.segment": {
    source: "iana",
    extensions: [
      "m4s"
    ]
  },
  "video/jpeg": {
    source: "iana",
    extensions: [
      "jpgv"
    ]
  },
  "video/jpeg2000": {
    source: "iana"
  },
  "video/jpm": {
    source: "apache",
    extensions: [
      "jpm",
      "jpgm"
    ]
  },
  "video/jxsv": {
    source: "iana"
  },
  "video/mj2": {
    source: "iana",
    extensions: [
      "mj2",
      "mjp2"
    ]
  },
  "video/mp1s": {
    source: "iana"
  },
  "video/mp2p": {
    source: "iana"
  },
  "video/mp2t": {
    source: "iana",
    extensions: [
      "ts"
    ]
  },
  "video/mp4": {
    source: "iana",
    compressible: false,
    extensions: [
      "mp4",
      "mp4v",
      "mpg4"
    ]
  },
  "video/mp4v-es": {
    source: "iana"
  },
  "video/mpeg": {
    source: "iana",
    compressible: false,
    extensions: [
      "mpeg",
      "mpg",
      "mpe",
      "m1v",
      "m2v"
    ]
  },
  "video/mpeg4-generic": {
    source: "iana"
  },
  "video/mpv": {
    source: "iana"
  },
  "video/nv": {
    source: "iana"
  },
  "video/ogg": {
    source: "iana",
    compressible: false,
    extensions: [
      "ogv"
    ]
  },
  "video/parityfec": {
    source: "iana"
  },
  "video/pointer": {
    source: "iana"
  },
  "video/quicktime": {
    source: "iana",
    compressible: false,
    extensions: [
      "qt",
      "mov"
    ]
  },
  "video/raptorfec": {
    source: "iana"
  },
  "video/raw": {
    source: "iana"
  },
  "video/rtp-enc-aescm128": {
    source: "iana"
  },
  "video/rtploopback": {
    source: "iana"
  },
  "video/rtx": {
    source: "iana"
  },
  "video/scip": {
    source: "iana"
  },
  "video/smpte291": {
    source: "iana"
  },
  "video/smpte292m": {
    source: "iana"
  },
  "video/ulpfec": {
    source: "iana"
  },
  "video/vc1": {
    source: "iana"
  },
  "video/vc2": {
    source: "iana"
  },
  "video/vnd.cctv": {
    source: "iana"
  },
  "video/vnd.dece.hd": {
    source: "iana",
    extensions: [
      "uvh",
      "uvvh"
    ]
  },
  "video/vnd.dece.mobile": {
    source: "iana",
    extensions: [
      "uvm",
      "uvvm"
    ]
  },
  "video/vnd.dece.mp4": {
    source: "iana"
  },
  "video/vnd.dece.pd": {
    source: "iana",
    extensions: [
      "uvp",
      "uvvp"
    ]
  },
  "video/vnd.dece.sd": {
    source: "iana",
    extensions: [
      "uvs",
      "uvvs"
    ]
  },
  "video/vnd.dece.video": {
    source: "iana",
    extensions: [
      "uvv",
      "uvvv"
    ]
  },
  "video/vnd.directv.mpeg": {
    source: "iana"
  },
  "video/vnd.directv.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dlna.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dvb.file": {
    source: "iana",
    extensions: [
      "dvb"
    ]
  },
  "video/vnd.fvt": {
    source: "iana",
    extensions: [
      "fvt"
    ]
  },
  "video/vnd.hns.video": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsavc": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    source: "iana"
  },
  "video/vnd.motorola.video": {
    source: "iana"
  },
  "video/vnd.motorola.videop": {
    source: "iana"
  },
  "video/vnd.mpegurl": {
    source: "iana",
    extensions: [
      "mxu",
      "m4u"
    ]
  },
  "video/vnd.ms-playready.media.pyv": {
    source: "iana",
    extensions: [
      "pyv"
    ]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    source: "iana"
  },
  "video/vnd.nokia.mp4vr": {
    source: "iana"
  },
  "video/vnd.nokia.videovoip": {
    source: "iana"
  },
  "video/vnd.objectvideo": {
    source: "iana"
  },
  "video/vnd.radgamettools.bink": {
    source: "iana"
  },
  "video/vnd.radgamettools.smacker": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg1": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg4": {
    source: "iana"
  },
  "video/vnd.sealed.swf": {
    source: "iana"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    source: "iana"
  },
  "video/vnd.uvvu.mp4": {
    source: "iana",
    extensions: [
      "uvu",
      "uvvu"
    ]
  },
  "video/vnd.vivo": {
    source: "iana",
    extensions: [
      "viv"
    ]
  },
  "video/vnd.youtube.yt": {
    source: "iana"
  },
  "video/vp8": {
    source: "iana"
  },
  "video/vp9": {
    source: "iana"
  },
  "video/webm": {
    source: "apache",
    compressible: false,
    extensions: [
      "webm"
    ]
  },
  "video/x-f4v": {
    source: "apache",
    extensions: [
      "f4v"
    ]
  },
  "video/x-fli": {
    source: "apache",
    extensions: [
      "fli"
    ]
  },
  "video/x-flv": {
    source: "apache",
    compressible: false,
    extensions: [
      "flv"
    ]
  },
  "video/x-m4v": {
    source: "apache",
    extensions: [
      "m4v"
    ]
  },
  "video/x-matroska": {
    source: "apache",
    compressible: false,
    extensions: [
      "mkv",
      "mk3d",
      "mks"
    ]
  },
  "video/x-mng": {
    source: "apache",
    extensions: [
      "mng"
    ]
  },
  "video/x-ms-asf": {
    source: "apache",
    extensions: [
      "asf",
      "asx"
    ]
  },
  "video/x-ms-vob": {
    source: "apache",
    extensions: [
      "vob"
    ]
  },
  "video/x-ms-wm": {
    source: "apache",
    extensions: [
      "wm"
    ]
  },
  "video/x-ms-wmv": {
    source: "apache",
    compressible: false,
    extensions: [
      "wmv"
    ]
  },
  "video/x-ms-wmx": {
    source: "apache",
    extensions: [
      "wmx"
    ]
  },
  "video/x-ms-wvx": {
    source: "apache",
    extensions: [
      "wvx"
    ]
  },
  "video/x-msvideo": {
    source: "apache",
    extensions: [
      "avi"
    ]
  },
  "video/x-sgi-movie": {
    source: "apache",
    extensions: [
      "movie"
    ]
  },
  "video/x-smv": {
    source: "apache",
    extensions: [
      "smv"
    ]
  },
  "x-conference/x-cooltalk": {
    source: "apache",
    extensions: [
      "ice"
    ]
  },
  "x-shader/x-fragment": {
    compressible: true
  },
  "x-shader/x-vertex": {
    compressible: true
  }
};
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(module2) {
  module2.exports = require$$0;
})(mimeDb$1);
var mimeDb = mimeDb$1.exports;
var extList$1 = function() {
  var ret = {};
  Object.keys(mimeDb).forEach(function(x) {
    var val = mimeDb[x];
    if (val.extensions && val.extensions.length > 0) {
      val.extensions.forEach(function(y) {
        ret[y] = x;
      });
    }
  });
  return ret;
};
var sortKeysLength$1 = {};
var isPlainObj = isPlainObj$2;
var sortKeys$1 = function(obj2, opts) {
  if (!isPlainObj(obj2)) {
    throw new TypeError("Expected a plain object");
  }
  opts = opts || {};
  if (typeof opts === "function") {
    opts = { compare: opts };
  }
  var deep = opts.deep;
  var seenInput = [];
  var seenOutput = [];
  var sortKeys2 = function(x) {
    var seenIndex = seenInput.indexOf(x);
    if (seenIndex !== -1) {
      return seenOutput[seenIndex];
    }
    var ret = {};
    var keys = Object.keys(x).sort(opts.compare);
    seenInput.push(x);
    seenOutput.push(ret);
    for (var i = 0; i < keys.length; i++) {
      var key2 = keys[i];
      var val = x[key2];
      ret[key2] = deep && isPlainObj(val) ? sortKeys2(val) : val;
    }
    return ret;
  };
  return sortKeys2(obj2);
};
var sortKeys = sortKeys$1;
sortKeysLength$1.desc = function(obj2) {
  return sortKeys(obj2, function(a, b) {
    return b.length - a.length;
  });
};
sortKeysLength$1.asc = function(obj2) {
  return sortKeys(obj2, function(a, b) {
    return a.length - b.length;
  });
};
const extList = extList$1;
const sortKeysLength = sortKeysLength$1;
extName$1.exports = (str) => {
  const obj2 = sortKeysLength.desc(extList());
  const exts2 = Object.keys(obj2).filter((x) => str.endsWith(x));
  if (exts2.length === 0) {
    return [];
  }
  return exts2.map((x) => ({
    ext: x,
    mime: obj2[x]
  }));
};
extName$1.exports.mime = (str) => {
  const obj2 = sortKeysLength.desc(extList());
  const exts2 = Object.keys(obj2).filter((x) => obj2[x] === str);
  if (exts2.length === 0) {
    return [];
  }
  return exts2.map((x) => ({
    ext: x,
    mime: obj2[x]
  }));
};
const fs = fs__default.default;
const path = require$$1__default$1.default;
const { URL } = require$$0__default$5.default;
const contentDisposition = contentDisposition$2.exports;
const archiveType = archiveType$1;
const decompress = decompress$1;
const filenamify = filenamify$2.exports;
const getStream = getStream$8.exports;
const got = got_1;
const makeDir = makeDir$2.exports;
const pify = pify$2;
const pEvent = pEvent$1.exports;
const fileType = fileType$1.exports;
const extName = extName$1.exports;
const fsP = pify(fs);
const filenameFromPath = (res) => path.basename(new URL(res.requestUrl).pathname);
const getExtFromMime = (res) => {
  const header = res.headers["content-type"];
  if (!header) {
    return null;
  }
  const exts2 = extName.mime(header);
  if (exts2.length !== 1) {
    return null;
  }
  return exts2[0].ext;
};
const getFilename = (res, data) => {
  const header = res.headers["content-disposition"];
  if (header) {
    const parsed = contentDisposition.parse(header);
    if (parsed.parameters && parsed.parameters.filename) {
      return parsed.parameters.filename;
    }
  }
  let filename = filenameFromPath(res);
  if (!path.extname(filename)) {
    const ext = (fileType(data) || {}).ext || getExtFromMime(res);
    if (ext) {
      filename = `${filename}.${ext}`;
    }
  }
  return filename;
};
var download = (uri, output2, opts) => {
  if (typeof output2 === "object") {
    opts = output2;
    output2 = null;
  }
  opts = Object.assign({
    encoding: null,
    rejectUnauthorized: process.env.npm_config_strict_ssl !== "false"
  }, opts);
  const stream2 = got.stream(uri, opts);
  const promise = pEvent(stream2, "response").then((res) => {
    const encoding = opts.encoding === null ? "buffer" : opts.encoding;
    return Promise.all([getStream(stream2, { encoding }), res]);
  }).then((result) => {
    const [data, res] = result;
    if (!output2) {
      return opts.extract && archiveType(data) ? decompress(data, opts) : data;
    }
    const filename = opts.filename || filenamify(getFilename(res, data));
    const outputFilepath = path.join(output2, filename);
    if (opts.extract && archiveType(data)) {
      return decompress(data, path.dirname(outputFilepath), opts);
    }
    return makeDir(path.dirname(outputFilepath)).then(() => fsP.writeFile(outputFilepath, data)).then(() => data);
  });
  stream2.then = promise.then.bind(promise);
  stream2.catch = promise.catch.bind(promise);
  return stream2;
};
async function read() {
  try {
    return await lib$1.exports.readJson(appConfigPath);
  } catch (e) {
    return Promise.resolve([]);
  }
}
async function save(appConfig) {
  lib$1.exports.writeJson(appConfigPath, appConfig, { spaces: "	" });
}
async function readCookie() {
  try {
    return await lib$1.exports.readJson(appCookiePath);
  } catch (e) {
    return Promise.resolve({});
  }
}
async function saveCookie(cookie) {
  lib$1.exports.writeJson(appCookiePath, cookie, { spaces: "	" });
}
const readFile$1 = async (option) => {
  const { requestPath: requestPath2, max_cursor, path: path2, callback, dimensions, num, page, browser: browser2 } = option;
  let getAppNamesRes;
  try {
    getAppNamesRes = await page.evaluate(
      async (external) => {
        async function getData() {
          return new Promise((resolve2, reject2) => {
            function urlEncode(param, key2, encode2) {
              if (param == null)
                return "";
              var paramStr = "";
              var t = typeof param;
              if (t == "string" || t == "number" || t == "boolean") {
                paramStr += "&" + key2 + "=" + (encode2 == null || encode2 ? encodeURIComponent(param) : param);
              } else {
                for (var i in param) {
                  var k = key2 == null ? i : key2 + (param instanceof Array ? "[" + i + "]" : "." + i);
                  paramStr += urlEncode(param[i], k, encode2);
                }
              }
              return paramStr;
            }
            const query = {
              screen_height: 1964,
              screen_width: 3024,
              webid: 7180727602210392e3,
              effective_type: "wifi",
              count: external.num,
              aid: 6383,
              publish_video_strategy_type: 2,
              show_live_replay_strategy: 1,
              sec_user_id: external.path,
              max_cursor: external.max_cursor
            };
            let url2 = external.requestPath + "?" + urlEncode(query);
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url2, true);
            xhr.timeout = 6e4;
            xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send();
            xhr.onload = function(e) {
              let data = "response" in xhr ? xhr.response : xhr.responseText;
              resolve2({
                url: url2,
                data: JSON.parse(data)
              });
            };
          });
        }
        if (document.title == "\u9A8C\u8BC1\u7801\u4E2D\u95F4\u9875") {
          return {
            url: window.location.href,
            cookie: document.cookie,
            title: document.title,
            success: false
          };
        }
        let result = await getData();
        return {
          url: window.location.href,
          cookie: document.cookie,
          title: document.title,
          url: result.url,
          data: result.data,
          success: true
        };
      },
      { requestPath: requestPath2, max_cursor, path: path2, dimensions, num }
    );
  } catch (error) {
    console.log(error);
  }
  if (!getAppNamesRes) {
    console.log(`download ${path2} ${chalk.red(` \u51FA\u9519\u4E86`)}`);
    return;
  }
  console.log(`>>>>  ${getAppNamesRes.title}`);
  if (!getAppNamesRes.success) {
    console.log(`download ${path2} ${chalk.red(` \u88AB\u62E6\u622A\uFF0C\u8BF7\u66F4\u6362token`)}`);
    return;
  }
  if (getAppNamesRes.data) {
    let filepath = `${defaultDownloadDir}/video/${dimensions.title}`;
    let video = getAppNamesRes.data.aweme_list.map((item) => {
      if (item.images) {
        return {
          name: `${item.desc}${item.images.length}`,
          desc: item.desc,
          author: item.author,
          cover: item.video.cover.url_list[0],
          image: item.images.map((image) => {
            let url2 = image.url_list[0].split("&from=")[0].replace("&", "&");
            let name2 = `${item.desc}___${item.author.nickname}___${item.create_time}_${image.uri}.webp`.replaceAll("/", "_");
            var isExist2 = fs__default.default.existsSync(filepath + "/" + name2);
            return {
              name: name2,
              url: url2,
              isExist: isExist2
            };
          })
        };
      }
      if (item.video) {
        let name2 = `${item.desc}___${item.author.nickname}___${item.create_time}.mp4`;
        console.log(filepath + "/" + name2);
        var isExist = fs__default.default.existsSync(filepath + "/" + name2);
        return {
          name: name2,
          desc: item.desc,
          author: item.author,
          cover: item.video.cover.url_list[0],
          isExist,
          video: item.video.bit_rate && item.video.bit_rate[0] && item.video.bit_rate[0].play_addr ? item.video.bit_rate[0].play_addr.url_list[2] : ""
        };
      }
    });
    option.data = option.data.concat(video);
    if (getAppNamesRes.data.has_more) {
      readFile$1({
        ...option,
        max_cursor: getAppNamesRes.data.max_cursor
      });
    } else {
      callback(option.data);
      console.log(`download ` + chalk.green(` END`));
    }
  } else {
    console.log(`download ${path2} ${chalk.grey(` \u9650\u6D41\u4E86`)}`);
    let time = setTimeout(() => {
      clearTimeout(time);
      readFile$1(option);
    }, 3e3);
  }
};
const downloadVideo = (dimensions, video, data) => {
  return new Promise(async (resolve2, reject2) => {
    try {
      let type = "video";
      if (dimensions.type && dimensions.type === "search") {
        type = "search";
      }
      let filepath = `${defaultDownloadDir}/${type}/${dimensions.title}`;
      if (video.video) {
        try {
          let isExist = fs__default.default.existsSync(filepath + "/" + video.name);
          if (isExist) {
            console.log(`${video.name} ` + chalk.green(` DOWNLOADED`));
          }
          await download(video.video, filepath, {
            filename: video.name
          });
          console.log(`${video.name} ` + chalk.green(` SUCCESS`));
        } catch (error) {
          console.log(error);
          await download(video.video, filepath, {
            filename: video.name
          });
        }
      }
      if (video.image) {
        let images = video.image;
        for (let l = 0; l < images.length; l++) {
          try {
            let isExist = fs__default.default.existsSync(filepath + "/" + images[l].url);
            if (isExist) {
              console.log(`${images[l].url} ` + chalk.green(` DOWNLOADED`));
              continue;
            }
            await download(images[l].url, filepath, {
              filename: images[l].name
            });
            console.log(`${images[l].name} ` + chalk.green(` SUCCESS`));
          } catch (error) {
            await download(images[l].url, filepath, {
              filename: images[l].name
            });
          }
        }
      }
      data.forEach((item) => {
        if (item.video) {
          let isExist = fs__default.default.existsSync(filepath + "/" + item.name);
          item.isExist = isExist;
        }
        if (video.image) {
          let isExist = fs__default.default.existsSync(filepath + "/" + video.image[0].url);
          item.isExist = isExist;
        }
      });
      resolve2(data);
    } catch (error) {
      resolve2(error);
    }
  });
};
const getCookie = async () => {
  return await readCookie();
};
const requestPath$1 = `https://www.douyin.com/aweme/v1/web/aweme/post/`;
const init$1 = async (config2) => {
  return new Promise(async (resolve2, reject2) => {
    let inputRes = {
      path: config2.path
    };
    const regexp = /((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/gi;
    const path2 = inputRes.path.match(regexp);
    if (!path2[0])
      return;
    const configData = await read();
    const browser2 = await puppeteer__namespace.launch();
    const page = await browser2.newPage();
    let cookie = await getCookie();
    cookie["domain"] = "douyin.com";
    console.log(cookie);
    for (let attr in cookie) {
      await page.setCookie({
        name: attr,
        value: cookie[attr],
        domain: "v.douyin.com",
        path: "/",
        expires: Date.now() + 3600 * 1e3
      });
    }
    for (let attr in cookie) {
      await page.setCookie({
        name: attr,
        value: cookie[attr],
        domain: "www.douyin.com",
        path: "/",
        expires: Date.now() + 3600 * 1e3
      });
    }
    for (let attr in cookie) {
      await page.setCookie({
        name: attr,
        value: cookie[attr],
        domain: "www.iesdouyin.com",
        path: "/",
        expires: Date.now() + 3600 * 1e3
      });
    }
    await page.goto(path2[0]);
    await page.cookies(path2[0]);
    const dimensions = await page.evaluate(async (evaluate) => {
      async function timeout(t) {
        return new Promise((resolve3, reject3) => {
          setTimeout(() => resolve3(), t);
        });
      }
      await timeout(2e3);
      let titleDom = document.querySelector(".Nu66P_ba");
      let title = "";
      if (titleDom) {
        title = titleDom.innerText;
      }
      return {
        avatar: document.querySelectorAll(".PbpHcHqa")[1]?.src || document.querySelectorAll(".RUVTDzAp")[0]?.src,
        path: window.location.href,
        title: title || document.title.split("\u7684\u4E3B\u9875")[0],
        cookie: document.cookie
      };
    });
    console.log(cookie);
    if (dimensions.title.indexOf("\u9A8C\u8BC1\u7801") != -1) {
      console.log("\u9A8C\u8BC1\u7801...  END");
      reject2();
      return;
    }
    let dataIndex;
    const filterConfigData = configData.filter((item, index) => {
      if (item.path == dimensions.path) {
        dataIndex = index;
        return true;
      }
      return false;
    })[0];
    if (!filterConfigData) {
      configData.push({
        url: inputRes.path,
        ...dimensions
      });
      save(configData);
    } else {
      if (filterConfigData.complete === true) {
        console.log("\u5DF2\u4E0B\u8F7D...");
        return;
      }
      if (!filterConfigData.avatar) {
        configData[dataIndex] = {
          url: inputRes.path,
          ...dimensions
        };
        save(configData);
      }
    }
    try {
      console.log(`download` + chalk.green(` START`));
      let userId = dimensions.path.split("?")[0].replace("https://www.douyin.com/user/", "");
      let data = [];
      readFile$1({
        requestPath: requestPath$1,
        max_cursor: Date.now(),
        path: userId,
        dimensions,
        num: 10,
        page,
        browser: browser2,
        data,
        callback: (config3) => {
          browser2.close();
          configData.forEach((item) => {
            if (item.path == dimensions.path) {
            }
          });
          save(configData);
          resolve2({ config: config3, dimensions });
        }
      });
    } catch (error) {
      console.log(`download` + chalk.red(` END`));
      console.log(error);
      resolve2(error);
    }
  });
};
const requestPath = `https://www.douyin.com/aweme/v1/web/general/search/single/`;
const readFile = async (option) => {
  const { search: search2, offset = 0, page, callback } = option;
  const getAppNamesRes = await page.evaluate(
    async (external) => {
      async function getData() {
        return new Promise((resolve2, reject2) => {
          function urlEncode(param, key2, encode2) {
            if (param == null)
              return "";
            var paramStr = "";
            var t = typeof param;
            if (t == "string" || t == "number" || t == "boolean") {
              paramStr += "&" + key2 + "=" + (encode2 == null || encode2 ? encodeURIComponent(param) : param);
            } else {
              for (var i in param) {
                var k = key2 == null ? i : key2 + (param instanceof Array ? "[" + i + "]" : "." + i);
                paramStr += urlEncode(param[i], k, encode2);
              }
            }
            return paramStr;
          }
          const query = {
            aid: "6383",
            keyword: external.search,
            search_source: "search_sug",
            offset: external.offset + "",
            count: "10"
          };
          let url2 = external.requestPath + "?" + urlEncode(query);
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url2, true);
          xhr.timeout = 6e4;
          xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
          xhr.send();
          xhr.onload = function(e) {
            let data = "response" in xhr ? xhr.response : xhr.responseText;
            resolve2({
              url: url2,
              query,
              data: JSON.parse(data)
            });
          };
        });
      }
      let result = await getData();
      return {
        cookie: document.cookie,
        url: result.url,
        query: result.query,
        data: result.data
      };
    },
    { requestPath, search: search2, offset }
  );
  if (getAppNamesRes.data.data) {
    let video = getAppNamesRes.data.data.reduce((prev, row) => {
      let awemeInfo = row.aweme_info;
      if (!awemeInfo)
        return prev;
      let filepath = `${defaultDownloadDir}/search/${search2}`;
      if (awemeInfo.images) {
        prev.push({
          esc: awemeInfo.desc,
          author: awemeInfo.author,
          cover: awemeInfo.video.cover.url_list[0],
          image: awemeInfo.images.map((image) => {
            let url2 = image.url_list[0].split("&from=")[0].replace("&", "&");
            let name2 = `${awemeInfo.desc}___${awemeInfo.author.nickname}___${awemeInfo.create_time}_${image.uri}.webp`.replaceAll("/", "_");
            var isExist2 = fs__namespace.existsSync(filepath + "/" + name2);
            return {
              name: name2,
              url: url2,
              isExist: isExist2
            };
          })
        });
      }
      if (awemeInfo.video) {
        let name2 = `${awemeInfo.desc}___${awemeInfo.author.nickname}___${awemeInfo.create_time}.mp4`;
        var isExist = fs__namespace.existsSync(filepath + "/" + name2);
        prev.push({
          name: name2,
          isExist,
          esc: awemeInfo.desc,
          author: awemeInfo.author,
          cover: awemeInfo.video.cover.url_list[0],
          video: awemeInfo.video.bit_rate && awemeInfo.video.bit_rate[0] && awemeInfo.video.bit_rate[0].play_addr ? awemeInfo.video.bit_rate[0].play_addr.url_list[2] : ""
        });
      }
      return prev;
    }, []);
    console.log(`total\uFF1A${video.length}\u6761`);
    option.data = option.data.concat(video);
    if (getAppNamesRes.data.has_more && option.offset < 100) {
      console.log(`download` + chalk.green(` START`));
      readFile({
        ...option,
        offset: option.offset + 10
      });
    } else {
      console.log(`download ${search2} ${chalk.green(` END`)}`);
      callback(option.data);
    }
  } else {
    console.log(`download ${search2} ${chalk.grey(` \u9650\u6D41\u4E86`)}`);
    let time = setTimeout(() => {
      clearTimeout(time);
      readFile(search2);
    }, 3e3);
  }
};
const init = async (config2) => {
  return new Promise(async (resolve2, reject2) => {
    let inputRes = {
      path: config2.path
    };
    console.log(`url ---> ${inputRes.path}`);
    const browser2 = await puppeteer__namespace.launch();
    const page = await browser2.newPage();
    let cookie = getCookie();
    for (let attr in cookie) {
      await page.setCookie({
        name: attr,
        value: cookie[attr],
        domain: "www.douyin.com",
        path: "/",
        expires: Date.now() + 3600 * 1e3
      });
    }
    await page.goto("https://www.douyin.com/search/" + inputRes.path);
    await page.cookies("https://www.douyin.com/search/" + inputRes.path);
    try {
      let data = [];
      readFile({
        search: inputRes.path,
        offset: 0,
        page,
        data,
        callback: (config3) => {
          browser2.close();
          resolve2(config3);
        }
      });
    } catch (error) {
      console.log(`download` + chalk.red(` END`));
      console.log(error);
    }
  });
};
const EVENT_APP_CONFIG = "app.config";
const EVENT_APP_CONFIG_SAVE = "app.config.save";
const EVENT_APP_CONFIG_COOKIE = "app.config.cookie";
const EVENT_WEB_USER = "web.user";
const EVENT_WEB_USER_INFO = "web.user.info";
const EVENT_WEB_SEARCH = "web.search";
const EVENT_WEB_DOWNLOAD = "web.download";
require$$26.ipcMain.on(EVENT_WEB_USER, async (e, params) => {
  let { config: config2, dimensions } = await init$1({
    path: params.path
  });
  sendData(EVENT_WEB_USER, config2).then();
  sendData(EVENT_WEB_USER_INFO, dimensions).then();
});
require$$26.ipcMain.on(EVENT_WEB_SEARCH, async (e, params) => {
  let data = await init({
    path: params.path
  });
  sendData(EVENT_WEB_SEARCH, data).then();
});
require$$26.ipcMain.on(EVENT_APP_CONFIG_COOKIE, async (e, params) => {
  saveCookie(params);
});
require$$26.ipcMain.handle(EVENT_WEB_USER, async (e, params) => {
  let data = await init$1({
    path: params.path
  });
  return data;
});
require$$26.ipcMain.handle(EVENT_WEB_DOWNLOAD, async (e, params) => {
  let data = await downloadVideo(params.dimensions, params.current, params.data);
  return data;
});
require$$26.ipcMain.handle(EVENT_APP_CONFIG, async (e, params) => {
  let data = await read();
  return data;
});
require$$26.ipcMain.on(EVENT_APP_CONFIG_SAVE, async (e, params) => {
  let config2 = await lib$1.exports.readJson(params.path);
  await save(config2);
});
require$$26.app.commandLine.appendSwitch("wm-window-animations-disabled");
require$$26.app.whenReady().then((e) => {
  console.log("\u542F\u52A8\u5B8C\u6210");
  init$2();
  init$3();
  createTray();
  createWindow();
});
require$$26.app.on("will-quit", () => {
  require$$26.globalShortcut.unregisterAll();
  console.log("will-quit");
});
require$$26.app.on("before-quit", (event) => {
  console.log("before-quit");
  clearTray();
});
require$$26.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    require$$26.app.quit();
  }
});
