'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import 'babel-polyfill';

var BirdcageRepository = function () {
    function BirdcageRepository() {
        _classCallCheck(this, BirdcageRepository);
    }

    _createClass(BirdcageRepository, [{
        key: 'getTweets',
        value: function getTweets() {
            return fetch('http://localhost:5984/birdcage/_design/tweets/_view/all', { headers: { 'Cache-Control': 'no-cache' } }).then(function (r) {
                return r.json();
            }).then(function (v) {
                return v.rows.map(function (r) {
                    return r.value;
                });
            }).catch(function (e) {
                return console.log(e);
            });
        }
    }]);

    return BirdcageRepository;
}();

exports.default = BirdcageRepository;