window.addEventListener('DOMContentLoaded', () => {
  let scrollDown = document.getElementById('down');
  let submit = document.getElementById('save');

  submit.addEventListener('click', () => {
    let userOptions = {
      scrollDownKey: scrollDown.value,
    };

    localStorage.setItem('options', JSON.stringify(userOptions));
  });
});
