var activated = false;

var images = {
  true:  {'19': 'images/active-19.png',   '38': 'images/active-38.png'},
  false: {'19': 'images/inactive-19.png', '38': 'images/inactive-38.png'}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  sendResponse({activate: activated});
});

chrome.browserAction.onClicked.addListener(function(tab) {
  activated = !activated;
  chrome.browserAction.setIcon({path: images[activated]});
  chrome.tabs.sendMessage(tab.id, {activate: activated});
});

chrome.browserAction.setIcon({path: images[activated]});
