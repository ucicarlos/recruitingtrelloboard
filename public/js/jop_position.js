/* global TrelloPowerUp */
var t = TrelloPowerUp.iframe();
var data = null;
var xhr = new XMLHttpRequest();
// you can access arguments passed to your iframe like so
// var num = t.arg('text');

window.contact.addEventListener('submit', function (event) {
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  t.get('member', 'private', 'token')
  // Or if you needed to set/get a non-Trello secret token, like an oauth token, you could
  // use t.storeSecret('key', 'value') and t.loadSecret('key')
    .then(function(token){
      if(token){
        t.board('id', 'name')
          .then(function (board) {
            let title = window.jobPosition.value + " | " + window.dueDate.value + " | " + window.company.value;

            xhr.addEventListener("readystatechange", function () {
              if (this.readyState === this.DONE) {
                t.closeModal();
              }
            });
            xhr.open("POST", "https://api.trello.com/1/lists?name="+ title + "&idBoard=" + board.id + "&key=805550e507939ed01e3dd28d0d55f61a&token="+token);
            xhr.send(data);
          });
      }
    })

});



t.render(function () {
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
  return t.sizeTo('#contact');
});
