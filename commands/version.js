const {MessageEmbed} = require('discord.js');
const GuildOption = require('../model/GuildOption')
module.exports = {
    name: 'version',
    async execute(client, message) {
        const guildoption = JSON.parse(
          JSON.stringify(await GuildOption.findOne({ guildid: message.guild.id }))
        );
      message.channel.send(guildoption.version)
    message.delete();

},
};
