// Array of all the search results shown by Google
let resultsLinks = Array.from(
  document.querySelectorAll('.LC20lb.MBeuO.DKV0Md')
);
// Links which are shown by Google in the "People also ask" section
let askBox = document.querySelector('.ULSxyf');
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
    knowledgePanel.querySelectorAll('.LC20lb.MBeuO.DKV0Md')
  );
}

// Decalaring an empty array to hold the iterable array of links
let mainLinks = [];

// Removing the askBoxLinks from the resultsLinks
if (askBoxLinks.length > 0) {
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
let temp = [];
for (let link of mainLinks) {
  if (!knowledgePanelLinks.includes(link)) {
    temp.push(link);
  }
}
mainLinks = [...temp];

// Initializing a variable to help cycle between the mainLinks
let currentLink = 0;
// Event listener to listen for the keyup event of the Control key
window.addEventListener('keyup', (e) => {
  // Circles back to the first link the user reaches the last link on the search page
  if (currentLink > mainLinks.length - 1) currentLink = 0;
  // Removing focus from the selected link when the user goes back to the search bar
  if (e.key == '/') {
    mainLinks[currentLink - 1].style.textDecoration = 'none';
    currentLink = 0;
  }
  // First part of the condition ensures that the user is not focusing on something specific like tht search input
  if (document.activeElement.localName === 'body' && e.key === 'Control') {
    e.preventDefault();
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
    currentLink++;
  } else if (e.key === 'Enter') {
    e.preventDefault();
    // The link at the currentLink minus 1 of the array mainLinks is clicked when Enter key is lifted. minus 1 is needed since the currentLink is incremented by 1 at the end when the Control key is lifted.
    mainLinks[currentLink - 1].click();
  }
});

// Removing the focus from the link when the user clicks
window.addEventListener('click', () => {
  mainLinks[currentLink - 1].style.textDecoration = 'none';
  currentLink = 0;
});
