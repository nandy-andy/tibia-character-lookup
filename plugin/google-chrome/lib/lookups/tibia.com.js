define('tibia.com', function() {
  var lookupUrl = 'https://www.tibia.com/community/?name=';

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
