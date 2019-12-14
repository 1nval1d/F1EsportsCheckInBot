const { token, channels } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log(`Ready!`);
});

const filter = (reaction, user) => true;
const userlist = {};

client.login(token);
client.on('message', msg => {
   if(channels.includes(msg.channel.id)){
    const collector = msg.createReactionCollector(filter);
    collector.on('collect', (reaction, reactionCollector) =>{
        console.log(`Collected ${reaction.emoji.identifier}`);
    });
    
    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });
   }
});

