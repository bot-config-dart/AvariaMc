const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'remove',

    async execute(client, message) {

      const args = message.mentions.users.first()
      if (!message.member.permissions.has('ADMINISTRATOR') && (!message.member.roles.cache.has(client.config.supportrole))) return;
      await message.delete();
      if(!message.channel.name.startsWith(client.config.prefixticket)) {
         message.channel.send('***Erreur*** : Ce canal n\'est pas un ticket.');return;
     }
     if(args === message.author.id) return message.reply("Vous ne pouvez pas vous retirer vous même du ticket.");
     if (!args) {
         message.channel.send('Veuillez mentionnez la personne a retiré du ticket.')
     } else {
        message.channel.updateOverwrite(args, { VIEW_CHANNEL: false });
        message.channel.send(`${message.author.username}, Vous avez bien retiré ${args} du ticket.`)
     }

     if (message.author.bot) return;

    }
};