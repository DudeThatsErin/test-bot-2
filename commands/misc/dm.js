const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'dm',
    userPerms: ['ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_ROLES', 'MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
    botPerms: ['ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_ROLES', 'MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
    usage: '/dm <@member or member ID> <message>',
    example: '/dm @DudeThatsErin#8061 Why are you being stupid?',
    description: 'Allows **mods** to DM a user from the server.',
    options: [
        {
            name: 'userID',
            type: 'STRING',
            description: 'Provide the userID of the user you would like to DM.',
            required: true,
        },
        {
            name: 'message',
            type: 'STRING',
            description: 'What message would you like to send to the user?',
            required: true,
        }
    ],
    inHelp: 'yes',
    async execute(interaction, client) {
        // define variables
        const user = client.users.cache.get(interaction.options.get('userID').value);
        const dmmessage = interaction.options.get('message').value;
        const placeName = interaction.guild.name;
        const author = interaction.user.tag;
        const icon = interaction.guild.iconURL({ dynamic: true });

        // define embed
        const embed = new MessageEmbed()
            .setColor('WHITE')
            .setTitle(`Official Message from ${placeName}`)
            .setDescription(`${dmmessage}`)
            .addFields({
                name: 'If you have questions, please contact the author of this message...',
                value: author,
                inline: false
            })
            .setThumbnail(`${icon}`)
            .setFooter('If this is received in error, please report this with the s.report command!', `${icon}`);

        // ultimate send
        interaction.reply(`📨 I have sent the message to ${user}.`)
        user.send({ embeds: [embed] });
    }
}