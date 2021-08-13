const connection = require('../database.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildCreate',
    once: true,
    async execute(client) {

        let guildName = guild.name;
        let guildId = guild.id;
        let ownerID = guild.ownerID;
        let ownerName = client.users.cache.get(ownerID).username;
        let discrim = ownerID.discriminator;
        let region = guild.region;
        let auditLog = 'off';
        let currentPrefix = 's.';
        let thanks = 'off';
        const channel = client.channels.cache.find(channel => channel.id === '852192258156920853');

        let newGuild = new MessageEmbed()
            .setColor('#BB41CE')
            .setTitle('I got added to a new guild!')
            .setDescription(`I was just added to a new guild named: ${guildName}`)
            .addFields({
                name: 'Guild ID:',
                value: `${guildId}`
            }, {
                name: 'Owner ID:',
                value: `${ownerID}`
            }, {
                name: 'Owner Name:',
                value: `${ownerName}#${discrim}`
            }, {
                name: 'Guild Name:',
                value: `${guildName}`
            }, {
                name: 'Guild Region:',
                value: `${region}`
            }, {
                name: 'Audit Log:',
                value: `${auditLog}`
            }, {
                name: 'Prefix:',
                value: `${currentPrefix}`
            }, {
                name: 'Thanks System',
                value: `${thanks}`
            })
            .setTimestamp()
            .setFooter('I have added this information to the Guilds Database.', 'https://codinghelp.site/bots/sm/neon-moon.jpg')
        channel.send(newGuild)
        try {
            await connection.query(
                `INSERT INTO Guilds (guildId, guildName, ownerID, region, auditLog, prefix, thanks) VALUES(?, ?, ?, ?, ?, ?, ?);`,
                [guildId, guildName, ownerID, region, auditLog, currentPrefix, thanks]
            );
        } catch (err) {
            console.log(err);
        }
    }
}