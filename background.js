chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    down: 's',
    up: 'w',
    top: 'q',
  });
});
