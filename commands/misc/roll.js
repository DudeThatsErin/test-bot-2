module.exports = {
    name: 'roll',
    aliases: ['rolling'],
    description: 'Rolls a die that you specify.',
    note: 'if you just run d!roll, it rolls a 6-sided die by default.',
    userPerms: [''],
    botPerms: [''],
    execute(message, args, client) {
        const messageWords = message.content.split(' ');

        if (messageWords.length === 1) {
            return message.reply({ content: `You rolled a... \`` +
                (Math.floor(Math.random() * 6) + 1) + '\`!', allowedMentions: { repliedUser: false }
            });
        }
            let sides = messageWords[1];
            let rolls = 1;
            if (!isNaN(messageWords[1][0] / 1) && messageWords[1].includes('d')) {
                rolls = messageWords[1].split('d')[0] / 1;
                sides = messageWords[1].split('d')[1];
            } else if (messageWords[1][0] == 'd') {
                sides = sides.slice(1);
            }
            sides = sides / 1; // convert to number
            if (isNaN(sides) || isNaN(rolls)) {
                return;
            }
            if (rolls > 1) {
                const rollResults = [];
                for (let i = 0; i < rolls; i++) {
                    rollResults.push(Math.floor(Math.random() * sides) + 1);
                }
                const sum = rollResults.reduce((a, b) => a + b);
            return message.reply({content: `You rolled... \`${rollResults.toString()}\``, allowedMentions: { repliedUser: false }});
            } else {
                return message.reply({content: `You rolled... \`` +
                    (Math.floor(Math.random() * sides) + 1) + '\`!', allowedMentions: { repliedUser: false }});
            }
        }
    }