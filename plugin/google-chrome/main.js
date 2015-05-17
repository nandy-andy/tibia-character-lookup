var characterName = '',
    menuItem,
    tibiaCharacterLookupHomepageUrl = 'http://lukaszewski.it/tibia-character-lookup/',
    tibiaCharacterLookupUrl = 'https://secure.tibia.com/community/?subtopic=characters&name=',
    ga = ga || function() {};

chrome.browserAction.onClicked.addListener(handleHomepageButtonClick);

menuItem = chrome.contextMenus.create({
  "title": "Lookup Tibia character...",
  "contexts": ["selection"],
  "onclick": lookupCharacter
});

function lookupCharacter(info, tab) {
  ga('send', 'event', 'context-menu-item', 'click', 'tibia-com-search');
  characterName = info.selectionText;

  chrome.tabs.create({
    url: tibiaCharacterLookupUrl + characterName
  });
}

function handleHomepageButtonClick() {
  chrome.tabs.create({
    url: tibiaCharacterLookupHomepageUrl
  });
}
