setTimeout(() => {
  let resultLinks = Array.from(
    document.querySelectorAll('.js-result-title-link')
  );
  let mainLinks = [...resultLinks];
  console.log(mainLinks);
}, 1000);
