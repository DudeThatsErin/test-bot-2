module.exports = {
    description: 'Allows users to see other users avatars in a big form.',
    aliases: ['a', 'av', 'avatar', 'icon', 'pfp'],
    name: "avatar",
    categories: "Miscellaneous",
    permissions: " ",
    usage: "/avatar @username or ID",
    example: '/avatar @DudeThatsErin#8061',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    async execute(client, message, args) {
        let user = message.author || message.mentions.users.first();
        let avs = new MessageEmbed()
            .setAuthor(
                `Avatar from: ${user.tag}`,
                user.displayAvatarURL({ dynamic: true }),
                "https://discord.gg/UA6sSqKXpZ"
            )
            .setColor(ee.color)
            .addField(
                "❱ PNG",
                `[\`LINK\`](${user.displayAvatarURL({ format: "png" })})`,
                true
            )
            .addField(
                "❱ JPEG",
                `[\`LINK\`](${user.displayAvatarURL({ format: "jpg" })})`,
                true
            )
            .addField(
                "❱ WEBP",
                `[\`LINK\`](${user.displayAvatarURL({ format: "webp" })})`,
                true
            )
            .setURL(
                user.displayAvatarURL({
                    dynamic: true,
                })
            )
            .setFooter(ee.footertext, ee.footericon)
            .setImage(
                user.displayAvatarURL({
                    dynamic: true,
                    size: 512,
                })
            );

        message.channel.send({ embeds: [avs] })
    },

};