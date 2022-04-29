// Initializing the shortcut keys from chrome.storage

chrome.storage.sync.get((data) => {
  scrollDownKey = String(data.down);
  scrollUpKey = String(data.up);
  scrollTopKey = String(data.top);
});

// Removing the message shown by Google when a user presses a key other than /
let tipMessage = document.querySelector('.SaJ9Qe');
tipMessage.style.overflow = 'hidden';

// Array of all the search results shown by Google. First group of class below targets on all main search resuts. The second targets Twitter profile links. The third group targets ad links.
let resultsLinks = Array.from(
  document.querySelectorAll(
    '.LC20lb.MBeuO, .haz7je, .CCgQ5.vCa9Yd.QfkTvb.MUxGbd.v0nnCb'
  )
);
// Links which are shown by Google in the "People also ask" section
let askBox = document.querySelector('.Wt5Tfe');

let askBoxLinks;
// Array of links in the askBox section
if (askBox) {
  askBoxLinks = Array.from(askBox.querySelectorAll('.LC20lb.MBeuO.DKV0Md'));
}

// Links which are shown by Google in the "Knowledge Panel" section
let knowledgePanel = document.querySelector('.I6TXqe');
let knowledgePanelLinks;
// Array of links in the Knowledge Panel section
if (knowledgePanel) {
  knowledgePanelLinks = Array.from(
    knowledgePanel.querySelectorAll('.LC20lb.MBeuO')
  );
}

// Decalaring an empty array to hold the iterable array of links
let mainLinks = [];

// Removing the askBoxLinks from the resultsLinks
if (askBoxLinks) {
  for (let rLink of resultsLinks) {
    let count = 0;
    for (let aLink of askBoxLinks) {
      if (rLink !== aLink) {
        count++;
      }
    }
    if (count === askBoxLinks.length) {
      mainLinks.push(rLink);
    }
  }
} else {
  mainLinks = [...resultsLinks];
}

// Removing a link from the mainLinks array if the link is found in the knowledgePanelSection as well
if (knowledgePanelLinks) {
  let temp = [];
  for (let link of mainLinks) {
    if (!knowledgePanelLinks.includes(link)) {
      temp.push(link);
    }
  }
  mainLinks = [...temp];
}

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
  if (document.activeElement.localName === 'body' && e.key === scrollDownKey) {
    e.preventDefault();
    // Circles forward to the first link the user reaches past the last link on the search page
    if (currentLinkIndex === mainLinks.length) currentLinkIndex = 0;
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

  if (document.activeElement.localName === 'body' && e.key === scrollUpKey) {
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

// Selecting the link to perform actions on
window.addEventListener('keydown', (e) => {
  if (document.activeElement.localName === 'body') {
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
  if (document.activeElement.localName === 'body' && currentLinkIndex >= 1) {
    mainLinks[currentLinkIndex - 1].style.textDecoration = 'none';
    currentLinkIndex = 0;
  }
});
