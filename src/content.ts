chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      // DO SOMETHING

      chrome.runtime.sendMessage({});
    }
  }
);

(function checkUrl() {
  console.log('doing stuff here');
  chrome.storage.local.get(['domains'], result => {
    if(!result) {
      return;
    }

    let localDomain = window.location.host.toLowerCase();
    localDomain = localDomain.substring(0, 4) == 'www.' ? localDomain.substring(4): localDomain;

    result.domains.forEach(domain => {
      if (domain.domain.includes(localDomain)) {
        let optionsUrl = chrome.extension.getURL('index.html'); 

        window.location.href = optionsUrl;
      }
    });
  });
})()