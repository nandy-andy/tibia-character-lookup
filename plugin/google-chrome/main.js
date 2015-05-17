var id,
    tibiaCharacterLookupUrl = 'https://secure.tibia.com/community/?subtopic=characters&name=',
    characterName = '',
    ga = ga || function() {};

function lookupCharacter(info, tab) {
  ga('send', 'event', 'context-menu-item', 'click', 'tibia-com-search');
  characterName = info.selectionText;

  chrome.tabs.create({
    url: tibiaCharacterLookupUrl + characterName
  });
}

id = chrome.contextMenus.create({
  "title": "Lookup Tibia character...",
  "contexts": ["selection"],
  "onclick": lookupCharacter
});
