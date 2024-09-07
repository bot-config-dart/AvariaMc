const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'add',

    async execute(client, message) {

      const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
     if (!message.member.permissions.has('ADMINISTRATOR') && (!message.member.roles.cache.has(client.config.supportrole))) return;
     await message.delete();
     if(!message.channel.name.startsWith(client.config.prefixticket)) {
         message.channel.send('***Erreur*** : Ce canal n\'est pas un ticket.');return;
     }
     if(args[1] === message.author.id) return message.reply("Vous êtes déjà dans le ticket.");
     if (!args[1]) {
         message.channel.send('Veuillez indiqué l\'id de la personne a ajouter dans le ticket.')
     } else {
        message.channel.updateOverwrite(args[1], { VIEW_CHANNEL: true });
        message.channel.send(`${message.author.username}, Vous avez bien ajouter <@${args[1]}> dans le ticket.`)
     }

     if (message.author.bot) return;

    }
};