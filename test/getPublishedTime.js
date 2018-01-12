const parseScrapedTimes = require('../dist');
const assert = require('assert');

describe('getPublishedTime', () => {
  const { consts, getPublishedTime } = parseScrapedTimes;
  console.log(parseScrapedTimes)
  describe('Open Graph', () => {
    const props = consts.published.openGraphSelectors.map(selector => selector.replace(/\[|\]/g, ''));

    props.forEach(prop => {
      it(`${prop}`, () => {
        const expectedResult = 'foobar';
        const result = getPublishedTime(`<meta ${ prop } content="${ expectedResult }"/>`);
        assert.deepEqual(result, expectedResult);
      });
    });
  });

  describe('Other content attribute sources', () => {
    const props = consts.published.otherContentAttributeSelectors.map(selector => selector.replace(/\[|\]/g, ''));

    props.forEach(prop => {
      it(`${prop}`, () => {
        const expectedResult = 'foobar';
        const result = getPublishedTime(`<meta ${ prop } content="${ expectedResult }"/>`);
        assert.deepEqual(result, expectedResult);
      });
    });
  });

  describe('datetime', () => {
    it(`attribute`, () => {
      const expectedResult = 'foobar';
      const result = getPublishedTime(`<time datetime="${ expectedResult }">fff</time>`);
      assert.deepEqual(result, expectedResult);
    });

    it(`text`, () => {
      const expectedResult = 'foobar';
      const result = getPublishedTime(`<time datetime>${ expectedResult }</time>`);
      assert.deepEqual(result, expectedResult);
    });
  });

  describe('datetime attribute', () => {
    it(`attribute`, () => {
      const expectedResult = 'foobar';
      const result = getPublishedTime(`<time datetime="${ expectedResult }">fff</time>`);
      assert.deepEqual(result, expectedResult);
    });

    it(`text`, () => {
      const expectedResult = 'foobar';
      const result = getPublishedTime(`<time datetime>${ expectedResult }</time>`);
      assert.deepEqual(result, expectedResult);
    });
  });

  describe('time tag', () => {
    it(`1`, () => {
      const expectedResult = 'foobar';
      const result = getPublishedTime(`<time>${ expectedResult }</time>`);
      assert.deepEqual(result, expectedResult);
    });
  });

  describe('Likely H2s', () => {
    it(`class="date(ish)"`, () => {
      const expectedResult = 'foobar';
      const result = getPublishedTime(`<h2 class="datetimeblahblah">${ expectedResult }</h2>`);
      assert.deepEqual(result, expectedResult);
    });

    it(`id="date(ish)"`, () => {
      const expectedResult = 'foobar';
      const result = getPublishedTime(`<h2 id="datetimeblahblah">${ expectedResult }</h2>`);
      assert.deepEqual(result, expectedResult);
    });
  });

  describe('Real world cases', () => {
    it(`class="dt-tip-date"`, () => {
      const expectedResult = 'foobar';
      const result = getPublishedTime(`<span class="dt-tip-date">${ expectedResult }</span>`);
      assert.deepEqual(result, expectedResult);
    });

    // it(`h2 with recent year`, () => {
    //   const expectedResult = 'September 5, 2017';
    //   const result = getPublishedTime(`<h2 class="subtitle is-5">${ expectedResult }  | by foobar</h2>`);
    //   assert.deepEqual(result, expectedResult);
    // });

    // it(`datetime attribute with garbage`, () => {
    //   const expectedResult = '2017-11-27 15:23:31';
    //   const result = getPublishedTime(`<time datetime="${ expectedResult } &#43;0100 &#43;0100" class="js-time-ago"></time>`);
    //   assert.deepEqual(result, expectedResult);
    // });
  });
});