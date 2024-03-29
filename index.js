require("dotenv").config();
require('isomorphic-fetch');

const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

fs.readdir("./events/", (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  });
});

client.login(process.env.BOT_TOKEN);