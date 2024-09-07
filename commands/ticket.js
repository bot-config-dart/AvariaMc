const {MessageEmbed} = require('discord.js');
const disbut = require("discord-buttons");
module.exports = {
    name: 'ticket',

    execute(client, message) {
      if (message.guild.id != "894211425340358666")return;
        if(!message.member.permissions.has('ADMINISTRATOR'))return;
          const embed = new MessageEmbed()
          .setTitle("__・AvariaMC - Ticket__")
            .setDescription(
              "➜ Pour faire un ticket, je vous invite à presser le bouton ci-dessous. ! \n\nMerci de bien vouloir patientez une fois le ticket créer. \n Vous êtes limité à un ticket par utilisateur. \n Vous pouvez faire une demande pour y ajouter une personne.")
            .setColor("PURPLE")
            .setThumbnail(
              "https://cdn.discordapp.com/attachments/910998821629231114/921531520353718342/icon_1000x1000_square.png"
            )
            .setFooter("AvariaMC - 2024", "https://cdn.discordapp.com/attachments/910998821629231114/921531520353718342/icon_1000x1000_square.png")
            .setTimestamp();
            let button = new disbut.MessageButton()
            .setLabel("🎫 Ouvrir un ticket")
            .setStyle("green")
            .setID("create_ticket");
          message.channel.send({ component: button, embed: embed });
          message.delete();
    },
};
