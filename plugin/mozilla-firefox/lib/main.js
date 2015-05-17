var buttons = require('sdk/ui/button/action'),
    contextMenu = require('sdk/context-menu'),
    tabs = require('sdk/tabs'),
    button,
    characterName = '',
    menuItem,
    tibiaCharacterLookupHomepageUrl = 'http://lukaszewski.it/tibia-character-lookup/',
    tibiaCharacterLookupUrl = 'https://secure.tibia.com/community/?subtopic=characters&name=';

button = buttons.ActionButton({
  id: "tibia-character-lookup-link",
  label: "Visit Tibia Character Lookup homepage",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleHomepageButtonClick
});

menuItem = contextMenu.Item({
  label: "Lookup Tibia character...",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
  '  var text = window.getSelection().toString();' +
  '  self.postMessage(text);' +
  '});',
  onMessage: lookupCharacter
});

function lookupCharacter(selectedText) {
  characterName = selectedText;
  tabs.open(tibiaCharacterLookupUrl + characterName);
}

function handleHomepageButtonClick() {
  tabs.open(tibiaCharacterLookupHomepageUrl);
}
