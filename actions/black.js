const { Message } = require("discord.js")

module.exports = {
    name:'black',
    description:'message moderation level: black. 0 tolorence, bannable offence.',
    execute(message, args){
        message.delete();
        message.author.send("black level infraction. You are banned.");
        message.guild.member(message.author).ban();
    }
}