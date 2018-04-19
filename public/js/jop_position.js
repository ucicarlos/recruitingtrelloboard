/* global TrelloPowerUp */
var t = TrelloPowerUp.iframe();
var data = null;
var xhr = new XMLHttpRequest();
// you can access arguments passed to your iframe like so
// var num = t.arg('text');

window.contact.addEventListener('submit', function (event) {
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  let idList = window.recruit.value;
  let date = window.dueDate.value;
  let description = "Job Assigned: " + window.jobPosition.value + ", Company: " + window.company.value;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://api.trello.com/1/cards?name=Job%20Position&desc=" + description + "&pos=bottom&due=" + date + "&idList=" + idList + "&keepFromSource=all&key=805550e507939ed01e3dd28d0d55f61a&token=f1635aff34517609c4f7c1ca29c2c75116fb56282fd9c3ea35028dbbf9d1e4bd");

  xhr.send(data);

});

t.render(function () {
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
  return t.lists('all')
    .then(function (lists) {
      let select = window.recruit;
      lists.forEach(function (recruit) {
        let option = document.createElement('option');
        option.value = recruit.id;
        option.innerHTML = recruit.name.split(' | ')[0];
        select.appendChild(option);
      });
    })
});
