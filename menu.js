var id,
  tibiaCharacterLookupUrl = 'https://secure.tibia.com/community/?subtopic=characters&name=',
      characterName = '';

function lookupCharacter(info, tab) {
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
