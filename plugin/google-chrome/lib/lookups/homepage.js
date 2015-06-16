define('homepage', function() {
  var lookupUrl = 'http://lukaszewski.it/tibia-character-lookup/';

  function getSiteUrl() {
    return lookupUrl;
  }

  return {
    getSiteUrl: getSiteUrl
  }
});
