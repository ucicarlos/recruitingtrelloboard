/* global TrelloPowerUp */
var t = TrelloPowerUp.iframe();
var data = null;
var xhr = new XMLHttpRequest();
// you can access arguments passed to your iframe like so
// var num = t.arg('text');

window.contact.addEventListener('submit', function (event) {
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  var Promise = TrelloPowerUp.Promise;
  var t = TrelloPowerUp.iframe();

  var apiKey = '805550e507939ed01e3dd28d0d55f61a'; // Passed in as an argument to our iframe

  var trelloAuthUrl = `https://trello.com/1/authorize?expiration=1hour&name=Example%20Trello%20Power-Up&scope=read&key=${apiKey}&callback_method=fragment&return_url=${window.location.origin}%2Fauth-success.html`;

  var tokenLooksValid = function (token) {
    // If this returns false, the Promise won't resolve.
    return /^[0-9a-f]{64}$/.test(token);
  }

  t.authorize(trelloAuthUrl, {height: 680, width: 580, validToken: tokenLooksValid})
    .then(function (token) {
      // store the token in Trello private Power-Up storage
      return t.set('member', 'private', 'token', token)
    })
    .then(function () {
      t.get('member', 'private', 'token')
      // Or if you needed to set/get a non-Trello secret token, like an oauth token, you could
      // use t.storeSecret('key', 'value') and t.loadSecret('key')
        .then(function (token) {
          if (token) {
            t.board('id', 'name')
              .then(function (board) {
                let title = window.jobPosition.value + " | " + window.dueDate.value + " | " + window.company.value;

                xhr.addEventListener("readystatechange", function () {
                  if (this.readyState === this.DONE) {
                    t.closeModal();
                  }
                });
                xhr.open("POST", "https://api.trello.com/1/lists?name=" + title + "&idBoard=" + board.id + "&key=805550e507939ed01e3dd28d0d55f61a&token=" + token);
                xhr.send(data);
              });
          }
        })
    });


});


t.render(function () {
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
  return t.sizeTo('#contact');
});
