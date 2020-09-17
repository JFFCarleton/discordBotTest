const { Message } = require("discord.js")
const fs = require("fs");

module.exports = {
    name:'writeLog',
    description:'write a .txt log detailing User, Message, Time, and actions taken',
    execute(message, modLevel){
        //Convert time to something that can be written as a filename
        let unixTime = message.createdTimestamp;
        let dateTime = new Date(unixTime);
        let ymdtStamp = dateTime.getFullYear()+" "+dateTime.getDay()+" "+dateTime.getHours()+"-"+dateTime.getMinutes()+"-"+dateTime.getSeconds();
        
        //constuct the filename in a way that it's sorted by user and time.
        //Need to handel null
        let fileName = `${message.author.username} ${ymdtStamp} AKA ${(message.guild.member(message.author).nickname)}`;
        
/////////////it has to be like this or formatting is off in the .txt file. Ty js./////////////////////////////
        let logToWrite = 
`Username: ${message.author.username}
Nickname: ${(message.guild.member(message.author).nickname)}
Discord ID: ${message.author.id}
Time: ${message.createdAt}
Message: ${message.content}
Action Taken: ${modLevel}`;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        fs.writeFileSync(`./logs/${fileName}.txt`,logToWrite, function(err){
            if(err){return console.log(err);}
        });
    }
}
/*
 * So right now i'm passing a string with the moderation level
 * Redesign: Pass an object with info
 * 1. Moderation level
 * 2. Action taken (warning/kick/ban)
 * 3. If a warning DM was successfully delivered
 * so it'd look like:
    * Username: Nori
    * Nickname: Nonori Nori
    * Number of warnings issued to date: <yellow: 0, orange:0, red: 0>
    * Discord ID: <0000000000000000>
    * Message: FoR rIFt ENergy uNnecEsSAry iT iS? oUtPut mAXimiZeD, BUg mAss pROducTIOn... hELLo, WOrlD!?
    * Infraction Level: <yellow/orange/red/black>
    * DM Successfully sent?: <Yes: <message sent>/ No>
    * Action Taken: <warn/kick/ban>
 */