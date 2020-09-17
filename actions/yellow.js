const { Message } = require("discord.js")

module.exports = {
    name:'yellow',
    description:'message moderation level: Yellow(warning). 6 strikes and you\'re out. (kick)',
    execute(message, args){
        message.delete();
        message.author.send("You sent a yellow level message. This is a warning. Don't do that.").catch(err =>{
            console.log("DM rejected!");
        });
    }
}