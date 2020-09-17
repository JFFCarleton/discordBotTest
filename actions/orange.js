const { Message } = require("discord.js")

module.exports = {
    name:'orange',
    description:'message moderation level: orange(severe warning) 3 stikes and you\'re out.(kick)',
    execute(message, args){
        message.delete();
        message.author.send("you sent an orange level message. These offences are less tolerable.");
    }
}