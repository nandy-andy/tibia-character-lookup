define('tibia.com', function() {
  var lookupUrl = 'https://secure.tibia.com/community/?subtopic=characters&name=';

  function getSiteUrl(characterName) {
    var validatedCharacterName = characterName.split(' ').join('+'),
        matches = validatedCharacterName.match(/[^a-zA-Z\+]+/g);

    if (matches && matches.length > 0) {
      validatedCharacterName = "";
    }

    return lookupUrl + validatedCharacterName;
  }

  return {
    getSiteUrl: getSiteUrl
  }
});
