const { Message } = require("discord.js")

module.exports = {
    name:'ping',
    description:'it is a ping',
    execute(message, args){
        message.channel.send('pong!');
    }
}