module.exports = {
    name: 'coinflip',
    aliases: ['flipacoin', 'headstails', 'heads', 'tails', 'tailsneverfails', 'cf'],
    description: 'Flip a coin and get heads or tails.',
    userPerms: [''],
    botPerms: [''],
    execute(message, args) {
        const coins = ["heads", "tails"];
        const coinz = coins[Math.floor(Math.random() * coins.length)];
        
        message.reply({ content: `I got \`${coinz}\`!`, allowedMentions: { repliedUser: false }});
        
    }
}