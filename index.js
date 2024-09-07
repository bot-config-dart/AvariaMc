// Const
const mongoose = require("mongoose");

mongoose.connect(``, { useNewUrlParser: true }, () => console.log("Connected to mongodb!"));
const Discord = require("discord.js");
const client = new Discord.Client({ ws: { intents: Discord.Intents.ALL}});
client.config = require('./config');

const fs = require("fs");
const disbut = require("discord-buttons");
disbut(client);
const logs = require('discord-logs');
logs(client); 
const {MessageEmbed} = require('discord.js');

client.disbut = disbut;
client.commands = new Discord.Collection();

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

client.login(client.config.token);
client.login(client.config.toLowerCa)