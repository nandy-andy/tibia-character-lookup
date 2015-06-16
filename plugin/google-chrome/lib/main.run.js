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
    // plugin icon clicked
    chrome.browserAction.onClicked.addListener(function (){
      ga('send', 'event', 'chrome/homepage-button', 'click');

      chrome.tabs.create({
        url: homepage.getSiteUrl()
      });
    });

    // create menu item
    chrome.contextMenus.create({
      "title": "Lookup Tibia character...",
      "contexts": ["selection"],
      "onclick": function () {
        ga('send', 'event', 'chrome/context-menu-item', 'click', 'tibia-com-search');

        chrome.tabs.create({
          url: tibiaCom.getSiteUrl(info.selectionText)
        });
      }
    });
  }
);
