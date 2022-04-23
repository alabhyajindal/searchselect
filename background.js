chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    down: 's',
    up: 'w',
    top: 'q',
  });

  let onboardingPage = chrome.runtime.getURL('onboarding.html');
  chrome.tabs.create({
    url: onboardingPage,
    active: true,
  });
});
