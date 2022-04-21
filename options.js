// All the validation happens on the options page. There are two click event listeners. One for save - which saves the data to chrome.storage and the other for restore - which restores the data in chrome.storage.

let saveBtn = document.getElementById('save');
let restoreBtn = document.getElementById('restore');
let messageParagraph = document.getElementById('message');

function displayMessage(message, color) {
  messageParagraph.textContent = message;
  messageParagraph.style.color = color;
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

function validateEntry(value) {
  let valueCode = value.codePointAt(0);
  if (
    // Letters a - z
    (valueCode >= 97 && valueCode <= 122) ||
    // Numbers 0 - 9
    (valueCode >= 48 && value <= 57)
  ) {
    return true;
  } else {
    restoreBtn.click();
    displayMessage('Please enter valid values (0 - 9 or a - z).', 'red');
    return false;
  }
}

saveBtn.addEventListener('click', () => {
  let scrollDownKey = document.getElementById('down');
  let scrollUpKey = document.getElementById('up');
  let scrollTopKey = document.getElementById('top');

  // Checking if all three shortcuts have unique values
  if (
    scrollDownKey.value === scrollUpKey.value ||
    scrollDownKey.value === scrollTopKey.value ||
    scrollUpKey.value === scrollTopKey.value
  ) {
    restoreBtn.click();
    displayMessage('Each shortcut should be assigned a unique key.', 'red');
    return;
  }
  if (
    validateEntry(scrollDownKey.value) &&
    validateEntry(scrollUpKey.value) &&
    validateEntry(scrollTopKey.value)
  ) {
    chrome.storage.sync.set({
      down: scrollDownKey.value,
      up: scrollUpKey.value,
      top: scrollTopKey.value,
    });

    updateScreen();
    displayMessage('Shortcuts saved successfully.', 'green');
  }
});

restoreBtn.addEventListener('click', () => {
  chrome.storage.sync.set({
    down: 's',
    up: 'w',
    top: 'q',
  });

  updateScreen();
  displayMessage('Shortcuts reset to default.', 'green');
});

// Displaying the current shortcut keys on page render

window.addEventListener('DOMContentLoaded', () => {
  updateScreen();
});
