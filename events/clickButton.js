const { channel } = require('diagnostics_channel');
const {MessageEmbed} = require('discord.js');
const GuildOption = require('../model/GuildOption')
const fs = require('fs');
const message = require('./message');

module.exports = async (client, button) => {
    if (button.message.guild.id != "894211425340358666")return;
    if (button.id == "close_ticket") {
      let button3 = new client.disbut.MessageButton()
      .setLabel("Delete le ticket")
      .setStyle("blurple")
      .setID("close_deletedticket");
      const embed = new MessageEmbed()
      .setDescription("***DELETED TICKET*** | => Si vous voulez définitivement supprimer le ticket veuillez cliquer sur le boutton ci dessous.")
      .setColor("PURPLE")
      .addField("Ticket fermé par", button.clicker.user.username);
      button.channel.send({ component: button3, embed: embed });
        let category = button.message.guild.channels.cache.find(c => c.id == client.config.categorydeletedticket && c.type == "category")
        await button.message.channel.setParent(category.id, { lockPermissions: true});
        await button.reply.defer()
  }
  if (button.id == "close_deletedticket") {
    button.channel.delete()
  }
  if (button.id == "create_ticket") {
    var nameer = client.config.prefixticket +`-${button.clicker.user.username}`
    var checkTickets = button.guild.channels.cache.find(c => {return c.name == nameer.split(' ').join('-').toLocaleLowerCase() && c.parentID == client.config.categoryticket});
    if (checkTickets) {
        button.channel.send(`<@${button.clicker.user.id}> Vous avez déjà un ticket !`).then(msg => msg.delete({ timeout: 1000 * 5 }));
        return await button.reply.defer()

      
    } 
    button.message.guild.channels
      .create(client.config.prefixticket +`-${button.clicker.user.username}`)
      .then((channel) => {
        let button2 = new client.disbut.MessageButton()
          .setLabel("Clôturer le ticket")
          .setStyle("red")
          .setID("close_ticket");
        const embed = new MessageEmbed() // embed envoyé dans le ticket
        .setDescription("→ Merci à vous d'avoir ouvert un ticket. \n→ Un membre de notre équipe sera à vous le plus rapidement possible.\n → Merci de détailler votre ticket et d'être patient.")
          .setColor("PURPLE")
          .addField("Auteur", button.clicker.user.username);
          channel.send(`<@${button.clicker.user.id}>`)
        channel.updateOverwrite(button.message.guild.roles.everyone, {
          VIEW_CHANNEL: false,
          SEND_MESSAGES: true,
        });
        channel.updateOverwrite(button.clicker.user, { VIEW_CHANNEL: true });
        channel.updateOverwrite(button.message.guild.roles.cache.find(r => r.id == client.config.supportrole), { VIEW_CHANNEL: true });
        channel.updateOverwrite(button.message.guild.roles.cache.find(r => r.id == button.message.guild.id), { VIEW_CHANNEL: false });
        let category = button.message.guild.channels.cache.find(r => r.id == client.config.categoryticket && r.type == "category")
        channel.setParent(category.id);
        channel.send({ component: button2, embed: embed });
      });

    await button.reply.defer()
  }
};