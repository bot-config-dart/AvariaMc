const {MessageEmbed} = require("discord.js");
const GuildOption = require("../model/GuildOption");
module.exports = async (client, oldMember, newMember) => {
    const guildoption = JSON.parse(
        JSON.stringify(await GuildOption.findOne({guildid: newMember.guild.id}))
    );

    let ownerbot = guildoption.ownerbot1;
    let ownerbot2 = guildoption.ownerbot2;

    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        oldMember.roles.cache.forEach(async (role) => {
            if (!newMember.roles.cache.has(role.id)) {
                const fetchedLogs = await oldMember.guild.fetchAuditLogs({
                    limit: 1,
                    type: "MEMBER_ROLE_UPDATE",
                });

                const roleAddLog = fetchedLogs.entries.first();
                if (!roleAddLog) return;
                const {executor, target, changes} = roleAddLog;
                if (executor.id == client.user.id) return;
                if (!guildoption.whitelistlist.includes(executor.id)) {
                    newMember.roles.add(role.id);
                    executor.send(
                        "***Erreur*** : Vous n'avez pas la permission de retirer un role a quelqu'un."
                    );
                    const guild = client.guilds.cache.get(guildoption.guildid);
                    const owner = guild.owner;
                    client.channels.cache.get(client.config.logs).send(`Attention, <@${executor.id}> a essayer de retirer le rôle ${role.name} a ${newMember}`)
                    owner.send(
                        `Attention, <@${executor.id}> a essayer de retirer le rôle ${role.name} a ${newMember}`
                    ).catch(e => {
                    });
                }
            }
        });
    } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        newMember.roles.cache.forEach(async (role) => {
            if (!oldMember.roles.cache.has(role.id)) {
                const fetchedLogs = await oldMember.guild.fetchAuditLogs({
                    limit: 1,
                    type: "MEMBER_ROLE_UPDATE",
                });

                const roleAddLog = fetchedLogs.entries.first();
                if (!roleAddLog) return;
                const {executor, target, changes} = roleAddLog;
                if (executor.id == client.user.id) return;
                if (!guildoption.whitelistlist.includes(executor.id)) {
                    newMember.roles.remove(role.id);
                    executor.send(
                        "***Erreur*** : Vous n'avez pas la permission d'ajouter un role a quelqu'un."
                    );
                    const guild = client.guilds.cache.get(guildoption.guildid);
                    const owner = guild.owner;
                    client.channels.cache.get(client.config.logs).send(`Attention, <@${executor.id}> a essayer d'ajouter le rôle ${role.name} a ${newMember}`)
                    owner.send(
                        `Attention, <@${executor.id}> a essayer d'ajouter le rôle ${role.name} a ${newMember}`
                    ).catch(e => {
                    });
                }
            }
        });
    }
};
