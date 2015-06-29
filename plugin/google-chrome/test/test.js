require(['homepage'], function (homepage) {
  QUnit.test("homepage module available and functional", function(assert) {
    assert.ok(typeof homepage === 'object');
  });

  QUnit.test("homepage module has getSiteUrl() method", function(assert) {
    assert.ok(typeof homepage.getSiteUrl === 'function');
  });

  QUnit.test("homepage module returns correct URL", function(assert) {
    assert.ok(homepage.getSiteUrl() === 'http://lukaszewski.it/tibia-character-lookup/');
  });
});

require(['tibia.com'], function (tibiaCom) {
  var lookupUrl = 'https://secure.tibia.com/community/?subtopic=characters&name=';
      testCases = [
        {nameMock: "", expected: lookupUrl, desc: "empty value"},
        {nameMock: "A", expected: lookupUrl + "A", desc: "single uppercase letter"},
        {nameMock: "a", expected: lookupUrl + "a", desc: "single lowercase letter"},
        {nameMock: "Aa", expected: lookupUrl + "Aa", desc: "two letters"},
        {nameMock: "AaA", expected: lookupUrl + "AaA", desc: "three letters"},
        {nameMock: "Kumulu", expected: lookupUrl + "Kumulu", desc: "real player name"},
        {nameMock: "Andre from Rohan", expected: lookupUrl + "Andre+from+Rohan", desc: "three words"},
        {nameMock: "<script>alert('XSS!');</script>", expected: lookupUrl + "", desc: "XSS attempt"},
        // An error from tibia.com character creator:
        // This name contains invalid letters. Please use only A-Z, a-z and space!
        {nameMock: "Nara'kan Belgon", expected: lookupUrl + "", desc: "illegal name"}
      ];

  QUnit.test("tibia.com module available and functional", function(assert) {
    assert.ok(typeof tibiaCom === 'object');
  });

  QUnit.test("tibia.com module has getSiteUrl() method", function(assert) {
    assert.ok(typeof tibiaCom.getSiteUrl === 'function');
  });

  Object.keys(testCases).forEach(function (k) {
    var testCase = testCases[k];
    QUnit.test("tibia.com module returns correct URLs: " + testCase.desc, function(assert) {
      assert.ok(
          tibiaCom.getSiteUrl(testCase.nameMock) === testCase.expected);
    });
  });
});