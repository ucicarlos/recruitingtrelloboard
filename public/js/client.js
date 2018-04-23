/* global TrelloPowerUp */

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';
var RECRUIT_ICON = 'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_work_white_24px.svg';


var boardButtonCallback = function (t) {
  return t.get('member', 'private', 'token')
    .then(function (token) {
      console.log(token);
      if (!token) {
        return t.popup({
          title: 'Authorize Your Account',
          url: './authorize.html',
          height: 75
        });
      } else {
        return t.popup({
          title: 'Select',
          items: [
            {
              callback: function (t) {
                return t.modal({
                  url: './job_position.html', // The URL to load for the iframe
                  accentColor: '#425381', // Optional color for the modal header
                  width: 400,
                  background: '#fff',
                  //height: 600, // Initial height for iframe; not used if fullscreen is true
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
                  width: 400,
                  accentColor: '#425381', // Optional color for the modal header
                  //height: 600, // Initial height for iframe; not used if fullscreen is true
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
      }
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
  },
  'authorization-status': function (t, options) {
    // Return a promise that resolves to an object with a boolean property 'authorized' of true or false
    // The boolean value determines whether your Power-Up considers the user to be authorized or not.

    // When the value is false, Trello will show the user an "Authorize Account" options when
    // they click on the Power-Up's gear icon in the settings. The 'show-authorization' capability
    // below determines what should happen when the user clicks "Authorize Account"

    // For instance, if your Power-Up requires a token to be set for the member you could do the following:
    return t.get('member', 'private', 'token')
    // Or if you needed to set/get a non-Trello secret token, like an oauth token, you could
    // use t.storeSecret('key', 'value') and t.loadSecret('key')
      .then(function (token) {
        if (token) {
          return {authorized: true};
        }
        return {authorized: false};
      });
    // You can also return the object synchronously if you know the answer synchronously.
  },
  'show-authorization': function (t, options) {
    // Returns what to do when a user clicks the 'Authorize Account' link from the Power-Up gear icon
    // which shows when 'authorization-status' returns { authorized: false }.

    // If we want to ask the user to authorize our Power-Up to make full use of the Trello API
    // you'll need to add your API from trello.com/app-key below:
    let trelloAPIKey = '805550e507939ed01e3dd28d0d55f61a';
    // This key will be used to generate a token that you can pass along with the API key to Trello's
    // RESTful API. Using the key/token pair, you can make requests on behalf of the authorized user.

    // In this case we'll open a popup to kick off the authorization flow.
    if (trelloAPIKey) {
      return t.popup({
        title: 'My Auth Popup',
        args: {apiKey: trelloAPIKey}, // Pass in API key to the iframe
        url: './authorize.html', // Check out public/authorize.html to see how to ask a user to auth
        height: 140,
      });
    } else {
      console.log("🙈 Looks like you need to add your API key to the project!");
    }
  }
});

