const { MessageEmbed } = require("discord.js");
const { isGeneratorFunction } = require("util/types");
const GuildOption = require("../model/GuildOption");
module.exports = {
  name: "whitelist",

  async execute(client, message) {
    if (message.guild.id != "894211425340358666")return;
    const guildoption = JSON.parse(
      JSON.stringify(await GuildOption.findOne({ guildid: message.guild.id }))
    );

    let ownerbot = guildoption.ownerbot1;
    let ownerbot2 = guildoption.ownerbot2;

    let args = message.mentions.users.first();
    const argsremove = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);

    await message.delete();
    if (
      message.author.id !== ownerbot &&
      message.author.id !== ownerbot2 &&
      message.author.id !== message.guild.owner.id
    ) {
      return message.reply(
        "Seul le compte couronne :crown: a la permission d'utiliser cette commande."
      );
    }

    if (
      message.content.toLowerCase() ===
      client.config.prefix + "whitelist list"
    ) {
      message.channel.send("Voici la liste des personnes dans la whitelist.");
      var string = "";
      if (!guildoption.whitelistlist[0]) {
        string += "Aucune personne n'a été ajouter a la whitelist.";
      } else {
        await guildoption.whitelistlist?.forEach(async (item) => {
          const member = await message.guild.members.cache.get(item);
          if (!member) string += "-" + item + "\n";
          if (member) string += "- <@" + member.id + ">\n";
        });
      }
      let embed = new MessageEmbed()
        .setAuthor("AlkiaMC")
        .setDescription(string)
        .setColor("PURPLE")
        .setFooter("AlkiaMC - 2024");
      message.channel.send(embed);
    } else {
      if (args && argsremove[1] != "remove") {
        if (guildoption.whitelistlist.includes(args.id)) {
          message.channel.send(
            "***Erreur*** : Cette personne est déjà présente dans la liste."
          );
          return;
        }
        message.channel.send(
          "Vous avez ajouter <@" +
            args +
            "> ( **ID :** " +
            args +
            " )" +
            " dans la whitelist"
        );
        await GuildOption.updateOne(
          { guildid: guildoption.guildid },
          { $push: { whitelistlist: args.id } }
        );
      } else if (
        argsremove[1] &&
        argsremove[1] == "remove" &&
        argsremove[2] &&
        !args
      ) {
        if (!guildoption.whitelistlist.includes(argsremove[2])) {
          message.channel.send(
            "***Erreur*** : Cette personne n'est pas présente dans la liste."
          );
          return;
        }
        message.channel.send(
          "Vous avez retiré <@" +
            argsremove[2] +
            "> ( **ID :** " +
            argsremove[2] +
            " )" +
            " de la whitelist"
        );
        await GuildOption.updateOne(
          { guildid: guildoption.guildid },
          { $pull: { whitelistlist: argsremove[2] } }
        );
        return;
      } else if (argsremove[1] && argsremove[1] == "remove" && args) {
        if (!guildoption.whitelistlist.includes(args.id)) {
          message.channel.send(
            "***Erreur*** : Cette personne n'est pas présente dans la liste."
          );
          return;
        }
        message.channel.send(
          "Vous avez retiré <@" +
            args +
            "> ( **ID :** " +
            args +
            " )" +
            " de la whitelist"
        );
        await GuildOption.updateOne(
          { guildid: guildoption.guildid },
          { $pull: { whitelistlist: args.id } }
        );
        return;
      } else if (argsremove[1]) {
        if (guildoption.whitelistlist.includes(argsremove[1])) {
          message.channel.send(
            "***Erreur*** : Cette personne est déjà présente dans la liste."
          );
          return;
        }
        message.channel.send(
          "Vous avez ajouter <@" +
            argsremove[1] +
            "> ( **ID :** " +
            argsremove[1] +
            " )" +
            " dans la whitelist"
        );
        await GuildOption.updateOne(
          { guildid: guildoption.guildid },
          { $push: { whitelistlist: argsremove[1] } }
        );
      } else {
        let embed = new MessageEmbed()
          .setAuthor("WHITELIST | PANEL D'AIDE")
          .setDescription(
            "whitelist <@user/ou ID> - Permet d'ajouter quelqu'un a la whitelist. \n whitelist remove <@user/ou ID> - Permet de retiré quelqu'un de la whitelist. \n whitelist list - Permet d'afficher la liste des membres ajouter a la whitelist."
          )
          .setColor("PURPLE")
          .setFooter("AlkiaMC - 2024");
        message.channel.send(embed);
      }
    }
  },
};
