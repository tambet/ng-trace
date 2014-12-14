chrome.runtime.sendMessage({type: 'activate'}, function(message) {
  window.sessionStorage.setItem('ng-trace', message && message.activate);
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  window.sessionStorage.setItem('ng-trace', message && message.activate);
});

var observer = new MutationObserver(function() {
  injectTracer() && observer.disconnect();
});

observer.observe(document, {
  subtree: true, childList: true, 
  attributes: true, characterData: true
});

function injectTracer() {
  var scriptTag = document.createElement('script');
  scriptTag.type = 'text/javascript';
  scriptTag.src = chrome.extension.getURL('/scripts/ng-trace.js');
  document.head && document.head.appendChild(scriptTag);
  return true;
}
