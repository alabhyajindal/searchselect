// Wrapping the program in setTimeout as there is a delay in loading of search results. Without the timeout, the array returns empty
setTimeout(() => {
  let mainLinks = Array.from(
    document.querySelectorAll('.js-result-title-link')
  );
  console.log(mainLinks);

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
      currentLink++;
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
      currentLink--;
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
        window.open(mainLinks[currentLink - 1].parentNode.firstChild.href);
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
}, 1000);
