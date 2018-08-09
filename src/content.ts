chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      // DO SOMETHING

      chrome.runtime.sendMessage({});
    }
  }
);