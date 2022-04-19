// Selecting the search bar
// let searchBar = document.querySelector('.gLFyf.gsfi');

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
let currentLink = 0;
// Event listener to listen for the keyup event of the Control key
window.addEventListener('keyup', (e) => {
  // Removing focus from the selected link when the user goes back to the search bar
  // First part of the condition ensures that the user is not focusing on something specific like the search input
  if (document.activeElement.localName === 'body' && e.key === 's') {
    e.preventDefault();
    // Circles forward to the first link the user reaches past the last link on the search page
    if (currentLink === mainLinks.length) currentLink = 0;
    mainLinks.forEach((link) => {
      if (link === mainLinks[currentLink]) {
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
    console.log(
      `BEFORE: currentLink: ${currentLink}, Length: ${mainLinks.length}`
    );
    currentLink++;
    console.log(
      `AFTER: currentLink: ${currentLink}, Length: ${mainLinks.length}`
    );
  }

  if (document.activeElement.localName === 'body' && e.key === 'w') {
    e.preventDefault();
    // Circles back to the last link if the user reaches past the first link on the search page
    if (currentLink === 1) currentLink = mainLinks.length + 1;
    mainLinks.forEach((link) => {
      if (link === mainLinks[currentLink - 2]) {
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
    console.log(
      `BEFORE: currentLink: ${currentLink}, Length: ${mainLinks.length}`
    );
    currentLink--;
    console.log(
      `AFTER: currentLink: ${currentLink}, Length: ${mainLinks.length}`
    );
  }
});

// Selecting the link to perform actions on
window.addEventListener('keydown', (e) => {
  if (e.key === 'q') {
    e.preventDefault();
    mainLinks[currentLink - 1].style.textDecoration = 'none';
    currentLink = 0;
    scrollToTop();
  }
  // Ensures page's functionality works as expected in the Search bar
  if (document.activeElement.localName === 'body') {
    if (e.key == '/') {
      mainLinks[currentLink - 1].style.textDecoration = 'none';
      currentLink = 0;
    }
    if (e.ctrlKey && e.key == 'Enter') {
      e.preventDefault();
      window.open(mainLinks[currentLink - 1].parentNode.href);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      mainLinks[currentLink - 1].click();
    }
  }
});

// Removing the focus from the link when the user clicks
window.addEventListener('click', () => {
  mainLinks[currentLink - 1].style.textDecoration = 'none';
  currentLink = 0;
});
