var buttons = require('sdk/ui/button/action'),
    contextMenu = require('sdk/context-menu'),
    tabs = require('sdk/tabs'),
    button,
    characterName = '',
    menuItem,
    tibiaCharacterLookupHomepageUrl = 'http://lukaszewski.it/tibia-character-lookup/',
    tibiaCharacterLookupUrl = 'https://secure.tibia.com/community/?subtopic=characters&name=',
    analyticsUrl = 'http://lukaszewski.it/tibia-character-lookup/analytics.php';

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

function ga() {
  var Request = require("sdk/request").Request,
      command = arguments[0] || false,
      action = arguments[1] || false,
      analyticsObject = {};

  if(command === 'send' && action === 'event') {
    analyticsObject.category = arguments[2];
    analyticsObject.action = arguments[3];

    if(arguments[4]) {
      analyticsObject.label = arguments[4];
    }

    try {
      Request({
        url: analyticsUrl,
        content: 'data=' + JSON.stringify(analyticsObject)
      }).post();
    } catch(e) {
      // don't care; just don't block other features of add-on
    }
  }
}

function lookupCharacter(selectedText) {
  ga('send', 'event', 'firefox/context-menu-item', 'click', 'tibia-com-search');
  characterName = selectedText;
  tabs.open(tibiaCharacterLookupUrl + characterName);
}

function handleHomepageButtonClick() {
  ga('send', 'event', 'firefox/homepage-button', 'click');
  tabs.open(tibiaCharacterLookupHomepageUrl);
}
