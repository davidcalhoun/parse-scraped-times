import cheerio from 'cheerio';

const consts = {
  published: {
    contentAttribute: 'content',
    openGraphSelectors: [
      '[property="article:published_time"]',
      '[property="music:release_date"]',
      '[property="video:release_date"]',
      '[property="book:release_date"]'
    ],
    otherContentAttributeSelectors: [
      '[property="article:post_date"]',
      '[itemprop="datePublished"]',
      '[name="date"]',
      '[name="search_date"]',
      '[name="pubdate"]',
      '[property="datePublished"]',
      '[property="DC.date.issued"]',
      '[itemprop="startDate"]'
    ],
    datetime: 'datetime',
    time: 'time',
    likelyH2s: [
      '[class*="date"]',
      '[id*="date"]'
    ],
    likelyWildcards: [
      '[class*="date"]',
      '[id*="date"]'
    ]
  }
};

const getText = ($, cssSelector) => $(cssSelector).text();

const getAttribute = ($, cssSelector, attribute) => $(cssSelector).attr(attribute);

const getPublishedOpenGraphTime = $ =>
  getAttribute($, consts.published.openGraphSelectors.join(', '), consts.published.contentAttribute);

const getOtherContentAttributeSelectors = $ =>
  getAttribute($, consts.published.otherContentAttributeSelectors.join(', '), consts.published.contentAttribute);

const getDateTimeTag = $ => getAttribute($, `[${ consts.published.datetime }]`, consts.published.datetime);

const getDateTimeText = $ => getText($, `[${ consts.published.datetime }]`);

const getTimeText = $ => getText($, consts.published.time);

const getLikelyH2s = $ =>
  getText($, consts.published.likelyH2s.map(attr => `h2${ attr }`).join(', '));

const getLikelyWildcards = $ =>
  getText($, consts.published.likelyWildcards.map(attr => `${ attr }`).join(', '));

const getPublishedTime = html => {
  const $ = cheerio.load(html);

  const openGraphTime = getPublishedOpenGraphTime($);
  const otherContentAttributeSelectors = getOtherContentAttributeSelectors($);
  const dateTimeTag = getDateTimeTag($);
  const dateTimeText = getDateTimeText($);
  const timeText = getTimeText($);
  const likelyH2s = getLikelyH2s($);
  const likelyWildcards = getLikelyWildcards($);

  return openGraphTime ||
    otherContentAttributeSelectors ||
    dateTimeTag ||
    dateTimeText ||
    timeText ||
    likelyH2s ||
    likelyWildcards;
}

export default {
  getPublishedTime,
  consts
};
