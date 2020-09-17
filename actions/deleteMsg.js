const { Message } = require("discord.js")

module.exports = {
    name:'deleteMsg',
    description:'automatically deletes a message',
    execute(message, args){
        message.delete();
        message.channel.send("I delorted the morrssage!!");
    }
}