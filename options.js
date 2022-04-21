// All the validation happens on the options page. There are two click event listeners. One for save - which saves the data to chrome.storage and the other for restore - which restores the data in chrome.storage.

let save = document.getElementById('save');
let restore = document.getElementById('restore');

function displayData() {
  chrome.storage.sync.get((data) => {
    console.log(
      `Down Key: ${data.down}\nUp Key: ${data.up}\nTop Key: ${data.top}`
    );
  });
}

function updateScreen() {
  let scrollDownKey = document.getElementById('down');
  let scrollUpKey = document.getElementById('up');
  let scrollTopKey = document.getElementById('top');
  chrome.storage.sync.get((data) => {
    scrollDownKey.value = data.down;
    scrollUpKey.value = data.up;
    scrollTopKey.value = data.top;
  });
}

save.addEventListener('click', () => {
  let scrollDownKey = document.getElementById('down');
  let scrollUpKey = document.getElementById('up');
  let scrollTopKey = document.getElementById('top');

  chrome.storage.sync.set({
    down: scrollDownKey.value,
    up: scrollUpKey.value,
    top: scrollTopKey.value,
  });

  updateScreen();
  displayData();
});

restore.addEventListener('click', () => {
  chrome.storage.sync.set({
    down: 's',
    up: 'w',
    top: 'q',
  });

  updateScreen();
  displayData();
});
