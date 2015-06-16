require.config({
  baseUrl: 'lib'
});

require(
  [
    'tibia.com',
    'homepage'
  ],
  function (
    tibiaCom,
    homepage
  ) {
    var characterName = '',
        ga = ga || function () {};

    chrome.browserAction.onClicked.addListener(handleHomepageButtonClick);

    chrome.contextMenus.create({
      "title": "Lookup Tibia character...",
      "contexts": ["selection"],
      "onclick": lookupCharacter
    });

    function lookupCharacter(info, tab) {
      ga('send', 'event', 'chrome/context-menu-item', 'click', 'tibia-com-search');
      characterName = info.selectionText;

      chrome.tabs.create({
        url: tibiaCom.getSiteUrl(characterName)
      });
    }

    function handleHomepageButtonClick() {
      ga('send', 'event', 'chrome/homepage-button', 'click');
      chrome.tabs.create({
        url: homepage.getSiteUrl()
      });
    }
  }
);
