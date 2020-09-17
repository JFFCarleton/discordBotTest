# discordBotTest

Started playing with discord.js as a way to practice javascript in the summer
## THIS IS UNFINISHED AND PROBABLY NOT WORKING CORRECTLY ##

This is meant to be a auto-moderator discord bot that watches servers for restricted language, IE slurs or swears as to be defined by the server admin.

Bot uses a trie data structure to quickly read every word in a given message. If it hits a defined word, it then will carry out the action as defined in the trie.

## ACTIONS ##
Automatic actions which the bot will do without a command. Currently listens on a message sent event and scans message content for restricted words

## COMMANDS ##
Actions the bot will take if given a command with the command prefex '!'

## LOGS ##
Automatically generated logs to record actions taken and their context
