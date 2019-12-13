const snekfetch = require('snekfetch');
const discord = require('discord.js');
const client = new discord.Client({
    partials: ['MESSAGE']
});
const {prefix} = require('./config.json');
const token = process.env.token;
client.login(token);
client.on('ready', () => {
    console.log(client.user.tag + " has logged in.");
});

client.on('message', message =>{
   if (!message.content.startsWith(prefix) || message.author.bot) return;

   const args = message.content.slice(prefix.length).split(/ +/);
   const command = args.shift().toLowerCase();


   if (command === 'react'){
       console.log("react works");

    const embed = new discord.RichEmbed()
        .setColor('#da36cc')
        .setTitle('Welcome to Life!')
        .setAuthor('Life')
        .setDescription(`If you wish to have a role within the guild, please react to this message with the appropriate emoji. ${client.emojis.find(emoji => emoji.name === 'Raids')}, ${client.emojis.find(emoji => emoji.name === 'Fractals')}, ${client.emojis.find(emoji => emoji.name === 'Shardkeeper')}, ${client.emojis.find(emoji => emoji.name === 'Dungeons')} or ${client.emojis.find(emoji => emoji.name === 'Metatrain')} `)
        .setFooter('Thanks for joining Life and please ask questions whenever you like')
        .setFooter('This bot was coded by @Dogwar#2002 please contact him for enquiries');
       message.channel.send(embed);
   }
});

client.on('messageReactionAdd', async (reaction, user) => {

    let applyRole = async () => {
        let emojiName = reaction.emoji.name;
        console.log(reaction.emoji.name.toString());
        let role = reaction.message.guild.roles.find(role => role.name.toLowerCase() === emojiName.toString().toLowerCase());
        let member = reaction.message.guild.members.find(member => member.id === user.id);
        try {
                console.log("Role and member found.");
                console.log(role);
                await member.addRole(role);
                console.log("Done.");
        }
        catch(err) {
            console.log(err);
        }
    }
    if(!reaction.message.partial)
    {
        let msg = await reaction.message.fetch();
        try {

            console.log(msg.id);
            if(msg.id === '651226425671680000')
            {
                console.log("Cached")
                applyRole();
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    else
    {
        if (msg.id === '651598494141775872') {
            console.log("Not a partial.");
            console.log(true);
            applyRole();
        }

    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    let removeRole = async () => {
        let emojiName = reaction.emoji.name;
        let role = reaction.message.guild.roles.find(role => role.name.toLowerCase() === emojiName.toLowerCase());
        let member = reaction.message.guild.members.find(member => member.id === user.id);
        try {
                console.log("Role and member found.");
                await member.removeRole(role);
                console.log("Done.");

        }
        catch(err) {
            console.log(err);
        }
    }
    if(!reaction.message.partial)
    {
        try {
            let msg = await reaction.message.fetch();
            console.log(msg.id);
            if(msg.id === '651226425671680000')
            {
                console.log("Cached")
                removeRole();
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    else
    {
        console.log("Not a partial.");
            console.log(true);
            removeRole();

    }
})

