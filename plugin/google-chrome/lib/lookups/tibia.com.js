define('tibia.com', function() {
  var lookupUrl = 'https://secure.tibia.com/community/?subtopic=characters&name=';

  function getSiteUrl(characterName) {
    return lookupUrl + characterName;
  }

  return {
    getSiteUrl: getSiteUrl
  }
});
