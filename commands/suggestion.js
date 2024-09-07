const {MessageEmbed} = require('discord.js');
const GuildOption = require('../model/GuildOption')
module.exports = {
    name: 'suggestion',
    async execute(client, message) {
      if (message.guild.id != "894211425340358666")return;
      if(!message.member.permissions.has('ADMINISTRATOR'))return;
    let embed = new MessageEmbed()
      .setTitle("Veuillez écrire une suggestion dans ce salon. Attention l'abus pourra être sanctionée.", "https://cdn.discordapp.com/attachments/910998821629231114/921531520353718342/icon_1000x1000_square.png")
      .setAuthor("AlkiaMC", "https://cdn.discordapp.com/attachments/910998821629231114/921531520353718342/icon_1000x1000_square.png")
      .setColor("PURPLE")
      .setFooter("AlkiaMC 2024", "https://cdn.discordapp.com/attachments/910998821629231114/921531520353718342/icon_1000x1000_square.png")
      message.channel.send(embed)
    message.delete();

},
};
