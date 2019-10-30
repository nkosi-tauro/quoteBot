 
const quote = require("../commands/quote");

module.exports = (client, message) => {
  if (message.content.startsWith("!quote")) {
    return quote(message);
  }
};