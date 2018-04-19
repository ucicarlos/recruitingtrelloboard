/* global TrelloPowerUp */
var t = TrelloPowerUp.iframe();
var data = null;
var xhr = new XMLHttpRequest();
// you can access arguments passed to your iframe like so
// var num = t.arg('text');

window.contact.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  t.board('id', 'name')
    .then(function (board) {
      console.log(board);
      console.log(JSON.stringify(board, null, 2));
      let name = window.fullName.value;
      let email = window.email.value;
      let phone = window.phone.value;
      let comments = window.comments.value;
      let title = name + " | " + email + " | " + phone;
      console.log(title);

      // var options = { method: 'POST',
      //   url: 'https://api.trello.com/1/lists',
      //   qs:
      //     { name: title,
      //       idBoard: board.id,
      //       key: '805550e507939ed01e3dd28d0d55f61a',
      //       token: 'f1635aff34517609c4f7c1ca29c2c75116fb56282fd9c3ea35028dbbf9d1e4bd' } };
      //
      // request(options, function (error, response, body) {
      //   if (error) throw new Error(error);
      //   t.closeModal();
      //   console.log(body);
      // });

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          console.log(this.responseText);
          t.closeModal();
        }
      });

      xhr.open("POST", "https://api.trello.com/1/lists?name="+ title + "&idBoard=" + board.id + "&key=805550e507939ed01e3dd28d0d55f61a&token=f1635aff34517609c4f7c1ca29c2c75116fb56282fd9c3ea35028dbbf9d1e4bd");

      xhr.send(data);
    });

  // return t.set('card', 'shared', 'estimate', window.estimateSize.value)
  //   .then(function(){
  //     t.closeModal();
  //   });
});

t.render(function(){
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
});
