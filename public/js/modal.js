/* global TrelloPowerUp */
var t = TrelloPowerUp.iframe();
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
