
module.exports = message => {
  let text = "";
  fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then((data) => {
      text = `${data.content} —${data.author}`;
      message.reply(text);
    })
};