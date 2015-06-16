require.config({
  baseUrl: 'lib'
});

require(
  [
    'ga',
    'tibia.com',
    'homepage'
  ],
  function (
    ga,
    tibiaCom,
    homepage
  ) {
    chrome.browserAction.onClicked.addListener(handleHomepageButtonClick);

    chrome.contextMenus.create({
      "title": "Lookup Tibia character...",
      "contexts": ["selection"],
      "onclick": lookupCharacter
    });

    function lookupCharacter(info, tab) {
      ga('send', 'event', 'chrome/context-menu-item', 'click', 'tibia-com-search');

      chrome.tabs.create({
        url: tibiaCom.getSiteUrl(info.selectionText)
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
