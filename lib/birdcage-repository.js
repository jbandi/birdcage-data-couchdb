'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

require('isomorphic-fetch');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BirdcageRepository = function () {
    function BirdcageRepository() {
        _classCallCheck(this, BirdcageRepository);
    }

    _createClass(BirdcageRepository, [{
        key: 'getTweets',
        value: function getTweets() {
            return fetch('http://127.0.0.1:5984/birdcage/_design/tweets/_view/all').then(function (r) {
                return r.json();
            }).then(function (v) {
                return v.rows.map(function (r) {
                    return r.value;
                });
            }).catch(function (e) {
                return console.log(e);
            });
        }
    }, {
        key: 'initDb',
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var tweetView, tweet;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return fetch('http://127.0.0.1:5984/birdcage', { method: 'DELETE' }).then(function () {
                                    return console.log('db deleted');
                                });

                            case 2:
                                _context.next = 4;
                                return fetch('http://127.0.0.1:5984/birdcage', { method: 'PUT' }).then(function () {
                                    return console.log('db created');
                                });

                            case 4:
                                tweetView = {
                                    "_id": "_design/tweets",
                                    "language": "javascript",
                                    "views": {
                                        "all": {
                                            "map": "function(doc) { if (doc.type == 'tweet')  emit(doc.priority, doc) }"
                                        }
                                    }
                                };
                                _context.next = 7;
                                return fetch('http://127.0.0.1:5984/birdcage/_design/tweets', { method: 'PUT', body: JSON.stringify(tweetView) }).then(function () {
                                    return console.log('tweet view created');
                                });

                            case 7:
                                tweet = {
                                    type: 'tweet',
                                    title: 'Use CouchDB',
                                    priority: Date.now(),
                                    created: new Date(),
                                    tweeted: null,
                                    count: 0

                                };
                                _context.next = 10;
                                return fetch('http://127.0.0.1:5984/birdcage/' + _uuid2.default.v4(), { method: 'PUT', body: JSON.stringify(tweet) }).then(function () {
                                    return console.log('tweet created');
                                });

                            case 10:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function initDb() {
                return _ref.apply(this, arguments);
            }

            return initDb;
        }()
    }]);

    return BirdcageRepository;
}();

exports.default = BirdcageRepository;