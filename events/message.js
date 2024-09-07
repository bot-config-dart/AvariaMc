const {MessageEmbed} = require('discord.js');
const antiLink = require("anti-link-discord");
const {config} = require('process');
module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;
    if (message.channel.id == client.config.suggestionchannel && message.content != "+suggestion") {
        const SayMessage = message.content
        let embed = new MessageEmbed()
            .setAuthor("Suggestion de " + message.author.username + "")
            .setDescription(SayMessage + ' \n \n Vous pouvez voter avec ' + client.config.suggestion_emojiok + ' ou ' + client.config.suggestion_emojino + '')
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}) + "?size=1024")
            .setColor("PURPLE")
            .setFooter("AlkiaMC - 2024", "https://cdn.discordapp.com/attachments/910998821629231114/921531520353718342/icon_1000x1000_square.png")
        message.channel.send(embed).then(msg => {
            msg.react(client.config.suggestion_emojiok)
            msg.react(client.config.suggestion_emojino)
        });
        message.delete();
    }

    if (!message.channel.name.startsWith(client.config.prefixticket) && message.channel.id != client.config.linkchannel && message.channel.id != client.config.linkchannel2) {
        antiLink(client, message, {
            staffRole: client.config.supportrole,
            warnMSG: client.config.emoji + `<@${message.author.id}> Merci de ne pas envoyer de lien ici.`,
        });
    }

    if (message.channel.id === client.config.avis) {
        if (!message.author.bot) message.delete();
    }

    const prefix = client.config.prefix;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, message, args);

};