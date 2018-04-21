

/* global TrelloPowerUp */
var t = TrelloPowerUp.iframe();
var data = null;
var xhr = new XMLHttpRequest();
// you can access arguments passed to your iframe like so
// var num = t.arg('text');

window.contact.addEventListener('submit', function (event) {
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  console.log(window.loading);
  t.board('id', 'name')
    .then(function (board) {
      let title = window.jobPosition.value + " | " + window.dueDate.value + " | " + window.company.value;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          t.closeModal();
        }
      });
      xhr.open("POST", "https://api.trello.com/1/lists?name="+ title + "&idBoard=" + board.id + "&key=805550e507939ed01e3dd28d0d55f61a&token=f1635aff34517609c4f7c1ca29c2c75116fb56282fd9c3ea35028dbbf9d1e4bd");
      xhr.send(data);
    });
});



t.render(function () {
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
  return t.sizeTo('#contact');
});
