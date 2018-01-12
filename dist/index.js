(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'cheerio'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('cheerio'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.cheerio);
    global.index = mod.exports;
  }
})(this, function (module, exports, _cheerio) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _cheerio2 = _interopRequireDefault(_cheerio);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var consts = {
    published: {
      contentAttribute: 'content',
      openGraphSelectors: ['[property="article:published_time"]', '[property="music:release_date"]', '[property="video:release_date"]', '[property="book:release_date"]'],
      otherContentAttributeSelectors: ['[property="article:post_date"]', '[itemprop="datePublished"]', '[name="date"]', '[name="search_date"]', '[name="pubdate"]', '[property="datePublished"]', '[property="DC.date.issued"]', '[itemprop="startDate"]'],
      datetime: 'datetime',
      time: 'time',
      likelyH2s: ['[class*="date"]', '[id*="date"]'],
      likelyWildcards: ['[class*="date"]', '[id*="date"]']
    }
  };

  var getText = function getText($, cssSelector) {
    return $(cssSelector).text();
  };

  var getAttribute = function getAttribute($, cssSelector, attribute) {
    return $(cssSelector).attr(attribute);
  };

  var getPublishedOpenGraphTime = function getPublishedOpenGraphTime($) {
    return getAttribute($, consts.published.openGraphSelectors.join(', '), consts.published.contentAttribute);
  };

  var getOtherContentAttributeSelectors = function getOtherContentAttributeSelectors($) {
    return getAttribute($, consts.published.otherContentAttributeSelectors.join(', '), consts.published.contentAttribute);
  };

  var getDateTimeTag = function getDateTimeTag($) {
    return getAttribute($, '[' + consts.published.datetime + ']', consts.published.datetime);
  };

  var getDateTimeText = function getDateTimeText($) {
    return getText($, '[' + consts.published.datetime + ']');
  };

  var getTimeText = function getTimeText($) {
    return getText($, consts.published.time);
  };

  var getLikelyH2s = function getLikelyH2s($) {
    return getText($, consts.published.likelyH2s.map(function (attr) {
      return 'h2' + attr;
    }).join(', '));
  };

  var getLikelyWildcards = function getLikelyWildcards($) {
    return getText($, consts.published.likelyWildcards.map(function (attr) {
      return '' + attr;
    }).join(', '));
  };

  var getPublishedTime = function getPublishedTime(html) {
    var $ = _cheerio2.default.load(html);

    var openGraphTime = getPublishedOpenGraphTime($);
    var otherContentAttributeSelectors = getOtherContentAttributeSelectors($);
    var dateTimeTag = getDateTimeTag($);
    var dateTimeText = getDateTimeText($);
    var timeText = getTimeText($);
    var likelyH2s = getLikelyH2s($);
    var likelyWildcards = getLikelyWildcards($);

    return openGraphTime || otherContentAttributeSelectors || dateTimeTag || dateTimeText || timeText || likelyH2s || likelyWildcards;
  };

  exports.default = {
    getPublishedTime: getPublishedTime,
    consts: consts
  };
  module.exports = exports['default'];
});
