/* global TrelloPowerUp */

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';
var RECRUIT_ICON = 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_work_white_24px.svg';


var boardButtonCallback = function (t) {
  return t.popup({
    title: 'Select',
    items: [
      {
        callback: function (t) {
          return t.modal({
            url: './job_position.html', // The URL to load for the iframe
            args: {text: 'Hello'}, // Optional args to access later with t.arg('text') on './jobposition.html'
            accentColor: '#425381', // Optional color for the modal header
            width: '80%',
            background: '#fff',
            height: 600, // Initial height for iframe; not used if fullscreen is true
            fullscreen: false, // Whether the modal should stretch to take up the whole screen
            callback: () => console.log('Goodbye.'), // optional function called if user closes modal (via `X` or escape)
            title: 'Job Position!', // Optional title for modal header
            // You can add up to 3 action buttons on the modal header - max 1 on the right side.
            actions: [],
          })
        },
        text: 'New Job position'
      },
      {
        text: 'Add new recruit',
        callback: function (t) {
          return t.modal({
            url: './new_recruit.html', // The URL to load for the iframe
            args: {text: 'Hello'}, // Optional args to access later with t.arg('text') on './jobposition.html'
            width: '80%',
            accentColor: '#425381', // Optional color for the modal header
            height: 600, // Initial height for iframe; not used if fullscreen is true
            fullscreen: false, // Whether the modal should stretch to take up the whole screen
            callback: () => console.log('Goodbye.'), // optional function called if user closes modal (via `X` or escape)
            title: 'Add New Recruit!', // Optional title for modal header
            // You can add up to 3 action buttons on the modal header - max 1 on the right side.
            actions: [],
          });
        }
      }
    ]
  });
};

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
  'board-buttons': function (t, options) {
    return [{
      // we can either provide a button that has a callback function
      // that callback function should probably open a popup, overlay, or boardBar
      icon: RECRUIT_ICON,
      text: 'Recruiting',
      callback: boardButtonCallback
    }];
  }
});

