chrome.runtime.onInstalled.addListener(({ reason }) => {
  chrome.storage.sync.set({
    down: 's',
    up: 'w',
    top: 'q',
  });

  let onboardingPage = chrome.runtime.getURL('onboarding.html');

  if (reason === 'install') {
    chrome.tabs.create({
      url: onboardingPage,
      active: true,
    });
  }
});
