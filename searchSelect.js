// Array of all the search results shown by Google
let resultsLinks = Array.from(
  document.querySelectorAll('.LC20lb.MBeuO.DKV0Md')
);
// Links which are shown by Google in the "People also ask" section
let askBox = document.querySelector('.ULSxyf');
// Array of links in the askBox section
let askBoxLinks = Array.from(askBox.querySelectorAll('.LC20lb.MBeuO.DKV0Md'));

// Decalaring an empty array to hold all resultLinks minus askBoxLinks
let mainLinks = [];

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

// Initializing a variable to help cycle between the mainLinks
let currentLink = 0;
// Event listener to listen for the keyup event of the Ctrl key
window.addEventListener('keyup', (e) => {
  if (currentLink > mainLinks.length - 1) currentLink = 0;
  if (e.key === 'Control') {
    e.preventDefault();
    mainLinks.forEach((link) => {
      if (link === mainLinks[currentLink]) {
        // link.classList.add('selected');
        link.style.textDecoration = 'underline';
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
