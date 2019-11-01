const quote = require("../commands/quote");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage('./inspire_me');

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let sent = false;

const checkDay = () => {
  const savedDay = localStorage.getItem("inspire_day");
  const currentDay = days[new Date().getDay()];

  if (savedDay !== currentDay) {
    localStorage.setItem("inspire_day", currentDay);
    sent = false;
  };
}

const setTime = (message) => {
  try {
    const storeTime = message.content.split(" ")[1];
    localStorage.setItem("inspire_time", storeTime);
    sent = false;
    return message.channel.send(`Time set to ${storeTime}`);
  }
  catch (err) {
    return message.channel.send(`Error: ${err}`);
  }
}

module.exports = (client, message) => {

  if (message.content.startsWith("!start")) {
    message.channel.send("Prepare to get inspired!");
    setInterval(() => {
      checkDay();
      const hour = new Date().getHours() >= 10 ? new Date().getHours() : "0" + new Date().getHours();
      const minute = new Date().getMinutes() >= 10 ? new Date().getMinutes() : "0" + new Date().getMinutes();
      const dateNow = `${hour}:${minute}`;
      const desiredDate = localStorage.getItem("inspire_time");

      if (dateNow == desiredDate && !sent) {
        sent = true;
        return quote(message);
      };

    }, 1000);
  };

  if (message.content.startsWith("!inspire")) {
    return quote(message);
  };

  if (message.content.startsWith("!settime")) {
    return setTime(message);
  };

  if (message.content.startsWith("!time")) {
    const desiredDate = localStorage.getItem("inspire_time");
    return message.channel.send(`Inspire bot is set to inspire at ${desiredDate} everyday!`);
  };

  if (message.content.startsWith("!restart")) {
    message.channel.send("Restarting...");
    return sent = false;
  };

  if (message.content.startsWith("!help")) {
    return message.channel.send("```start - Start inspire bot \n inspire - To get inspired \n restart - To restart inspire bot \n time - Get time to be inspired \n settime - To set time to get inspired```")
  };

};