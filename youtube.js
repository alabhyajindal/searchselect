let mainLinks = document.querySelectorAll(
  '#video-title.ytd-playlist-renderer, #video-title.ytd-video-renderer, #video-title.ytd-radio-renderer'
);

// mainLinks.forEach((link) => (link.style.textDecoration = 'underline'));

// Function to scroll to the top of the page
const scrollToTop = function () {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

// Initializing a variable to help cycle between the mainLinks
let currentLinkIndex = 0;
// Event listener to listen for the keyup event of the Control key
window.addEventListener('keyup', (e) => {
  // Removing focus from the selected link when the user goes back to the search bar
  // First part of the condition ensures that the user is not focusing on something specific like the search input
  if (document.activeElement.localName === 'body' && e.key === 's') {
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
});

console.log(mainLinks);
