// Initializing the shortcut keys from chrome.storage

chrome.storage.sync.get((data) => {
  scrollDownKey = String(data.down);
  scrollUpKey = String(data.up);
  scrollTopKey = String(data.top);
});

let mainLinks;

// Initializing a variable to help cycle between the mainLinks
let currentLinkIndex = 0;

// Function to scroll to the top of the page
const scrollToTop = function () {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

setTimeout(() => {
  mainLinks = document.querySelectorAll(
    '#video-title.ytd-playlist-renderer, #video-title.ytd-video-renderer, #video-title.ytd-radio-renderer'
  );

  // Event listener to listen for the keyup event of the Control key
  window.addEventListener('keyup', (e) => {
    // Removing focus from the selected link when the user goes back to the search bar
    // First part of the condition ensures that the user is not focusing on something specific like the search input
    if (e.key === 's') {
      e.preventDefault();
      mainLinks.forEach((link) => {
        if (link === mainLinks[currentLinkIndex]) {
          // Visual indication that the link is in focus
          link.style.textDecoration = 'underline';
          // Smooth scrolling the selected link to the center of the screen
          link.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          });
        } else {
          link.style.textDecoration = 'none';
        }
      });
      currentLinkIndex++;
    }

    if (e.key === scrollUpKey) {
      e.preventDefault();
      // Circles back to the last link if the user reaches past the first link on the search page
      if (currentLinkIndex === 1) currentLinkIndex = mainLinks.length + 1;
      mainLinks.forEach((link) => {
        if (link === mainLinks[currentLinkIndex - 2]) {
          // Visual indication that the link is in focus
          link.style.textDecoration = 'underline';
          // Smooth scrolling the selected link to the center of the screen
          link.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          });
        } else {
          link.style.textDecoration = 'none';
        }
      });
      currentLinkIndex--;
    }
  });

  document.querySelector('body').click();
  console.log(mainLinks);
}, 3000);

// Selecting the link to perform actions on
window.addEventListener('keydown', (e) => {
  if (document.activeElement.localName === 'tp-yt-paper-button') {
    if (e.key === scrollTopKey) {
      e.preventDefault();
      scrollToTop();
      if (currentLinkIndex >= 1) {
        mainLinks[currentLinkIndex - 1].style.textDecoration = 'none';
        currentLinkIndex = 0;
      }
    }

    // Ensures page's functionality works as expected in the Search bar
    if (e.key == '/') {
      if (currentLinkIndex >= 1) {
        mainLinks[currentLinkIndex - 1].style.textDecoration = 'none';
        currentLinkIndex = 0;
      }
    }
    if ((e.metaKey || e.ctrlKey) && e.key == 'Enter' && currentLinkIndex >= 1) {
      e.preventDefault();
      window.open(mainLinks[currentLinkIndex - 1].parentNode.href);
    } else if (e.key === 'Enter' && currentLinkIndex >= 1) {
      e.preventDefault();
      mainLinks[currentLinkIndex - 1].click();
    }
  }
});

// Removing the focus from the link when the user clicks
window.addEventListener('click', () => {
  if (currentLinkIndex >= 1) {
    mainLinks[currentLinkIndex - 1].style.textDecoration = 'none';
    currentLinkIndex = 0;
  }
});
