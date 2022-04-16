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
  if (e.key === 'Control') {
    e.preventDefault();
    mainLinks.forEach((link) => {
      link === mainLinks[currentLink]
        ? (link.style.backgroundColor = 'green')
        : (link.style.backgroundColor = 'white');
    });
    currentLink++;
  }
});
