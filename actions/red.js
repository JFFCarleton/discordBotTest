const { Message, Guild } = require("discord.js")

module.exports = {
    name:'red',
    description:'message moderation level: red (only 1 warning) Kick. Autokicks for now, for testing.',
    execute(message, args){
        message.delete();
        message.author.send("Red level offence: You will be kicked and must ask again for a new invite.");
        message.guild.member(message.author).kick();
    }
}