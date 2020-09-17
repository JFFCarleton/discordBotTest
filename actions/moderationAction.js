const { Message } = require("discord.js")

module.exports = {
    name:'Moderation Action',
    description:'Unified mod action script. Trial might not work out.',
    execute(message, args){
        logObj = { actionTaken:args, autoMessagedSent:true };
        message.delete();

        switch(args){
            case 'yellow':
                message.author.send("You sent a yellow level message. This is a warning. Don't do that.").catch(err =>{
                    logObj.autoMessagedSent = false;
                });
            
            case 'orange':
                message.author.send("You sent a orange level message. This is a warning. Don't do that.");

            case 'red':
                message.author.send("You sent a red level message. This is a warning. Don't do that.");

            case 'black':
                message.author.send("You sent a black level message. This is a warning. Don't do that.");
        }
    }
}