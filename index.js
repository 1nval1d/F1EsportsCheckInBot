const config = require('./config.json');
const userlist = require('./userlist.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

client.login(config.token);
var roles = [];
var reserves = [];
const filter = (reaction, user) => {
    for(let role in roles){
        if(roles[role].members.has(user.id)){
            reserves.push(user);
            break;
        }
    }
    return true;
};


client.once('ready', () => {
    var guild = client.guilds.first();
    for(let key in config.roles){
        var roleId = config.roles[key];
        roles.push(guild.roles.get(roleId));
    }
    
    console.log(`Ready!`);
});


client.on('message', msg => {
   if(config.channels.includes(msg.channel.id)){
        console.log("this is my buisness!")
        const collector = msg.createReactionCollector(filter);
        collector.on('collect', (reaction, reactionCollector) =>{
            console.log(`Collected ${reaction.emoji.identifier}`);
        });
    
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
   }
   else{
       console.log("not my buisness!");
   }
});

