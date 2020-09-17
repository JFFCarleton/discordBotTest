const Discord = require('discord.js');
const fs = require("fs");
const Client = new Discord.Client();
const logInToken ='REMOVED FOR GITHUB UPLOAD';
const Prefix = "!"
const masterCodex = require("./targetWords.json");
//const deleteMsg = require('./actions/deleteMsg');
Client.commands = new Discord.Collection();
Client.botActions = new Discord.Collection();
Client.offenderList = new Discord.Collection();

//NOTE TO SELF: You need to make sure the bot does not listen to DMs=== I think i did that.
//FUNCTIONS------------------------------------------------------------------------------------------------------
//TRIEMAP CODE///////////////////////////////////////////////////////////////////////////////////////////////////
class Node {
    constructor() {
        this.keys = new Map();
        this.value = undefined;

        this.setValue = function (newValue) { this.value = newValue; };
        this.getValue = function () { return this.value; };
    }
}

class Trie {
    constructor() {

        this.root = new Node();
        //node = this.node
        //      - This will take an input OR this.root if no input is provided
        this.add = function (targetWord, value, node = this.root) {
            if (targetWord.length == 0) {
                node.setValue(value);
                return;
            }
            if (!node.keys.has(targetWord[0])) {
                node.keys.set(targetWord[0], new Node());
                return this.add(targetWord.substr(1), value, node.keys.get(targetWord[0]));
            }
            return this.add(targetWord.substr(1), value, node.keys.get(targetWord[0]));
        };

        this.isWord = function (word) {
            let node = this.root;
            while (word.length > 0) {
                if (!node.keys.has(word[0])) { return undefined; }
                else {
                    node = node.keys.get(word[0]);
                    word = word.substr(1);
                };
            };
            return node.value;
        };
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

//"Offnder" object. use unique discord idea to store in a map and track number of offences committed
class Offender{
    constructor(message){
        this.userName = message.author.username,
        this.serverName = message.guild.member(message.author).nickname,
        this.userID = message.author.id;
        this.yellow = 0,
        this.orange = 0,
        this.red = 0,
        this.black = 0

        //looks like methods go in constructor as well
    }
}

//loads differnt types of commands and actions from a targeted dir for a Discord.js collection
function loadFromFile(catagory, catagoryFile, targetDir){
    for (const file of catagoryFile){
        const scriptFile = require(`./${targetDir}/${file}`);
        catagory.set(scriptFile.name, scriptFile);
    }
}

//LISTENERS------------------------------------------------------------------------------------------------------
Client.on('message',message=>{
    
    //ignore self and DMs
    if(message.author.bot || message.guild === null) {return;} 

    //Listen for preix and execute commands
    if(message.content.startsWith(Prefix)){
        let args = message.content.slice(Prefix.length).split(/ +/);
        let command = args.shift().toLowerCase();

        if(Client.commands.has(command)){ Client.commands.get(command).execute(message, args); }
        else{ message.channel.send(`command: ${command} does not exist.`); }
        }

    //Watch messages from users. Put messages in [arr] and check agaisnt the trie.
    let wordsInMsg = message.content.toLocaleLowerCase().split(" ");
        for (word in wordsInMsg){
        
            //this will return the action code.
            let modLevel = masterTrie.isWord(wordsInMsg[word]);
            
            

            if(Client.botActions.has(modLevel)){
                Client.offenderList.set(new Offender(message));
                console.log(Client.offenderList);
                /*
                //IDEA of how this code would look like. Test after setting up .json and load in.
                //Checks if this person already exists on the offender list, if so, increase the appropriate offender count
                //so I can make an object here that has info on what happened, then pass it to the log
                if (Client.offenderList.has(message.author.id)){
                    Client.offenderList.get(message.author.id).modLevel +=1;
                }*/

                Client.botActions.get(modLevel).execute(message);
                Client.botActions.get("writeLog").execute(message, modLevel);
            }

        /*if (not undef){
            check if user exists here?
            
            execute script action code
            write a log
            
            or check if user still exists in the server here?
        }
        */
    }
});

//INIT SCRIPT------------------------------------------------------------------------------------------------------

//could probably make this a function
//TRIE BUILDING SCRIPT
let masterTrie = new Trie();
let keys = Object.keys(masterCodex);
keys.forEach(word =>{masterTrie.add(word, masterCodex[word])});
//

//following along online tut:
//open dir 'commands' and grab everything that ends with '.js'
//then, we'll require each file and set the command name
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const botActionFiles = fs.readdirSync('./actions/').filter(file => file.endsWith('.js'));

loadFromFile(Client.commands, commandFiles, "commands");
loadFromFile(Client.botActions, botActionFiles, "actions");


//BOT LOGIN---------------------------------------------------------------------------------------------------------
Client.once('ready',()=>{
    console.log('Bot is online');
});

Client.login(logInToken);
//

//notes

/**
 * Text Valadation practice via a Discord bot.
 * This bot will take a .json file and build a trie.
 * It will then use that trie to listen for key words said in chat and respond.
 * EXPANSION IDEA:
 *  could be used as an auto mod for people who break text chat rules.
 * 
 * okay so i'm making scripts that can now be commands or auto actions! They are loading
 * and executing correclty. Just need to make the action script modular now
 * 
 * 
 */