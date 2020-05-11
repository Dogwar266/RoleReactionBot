

/*
    Discord includes
 */


const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ['MESSAGE']
});
const {prefix} = require('./config.json');
const CronJob = require('cron').CronJob;
const token = process.env.token;
const cheerio = require('cheerio');
const request = require('request');
client.commands = new Discord.Collection();
const fs = require('fs');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
const cooldowns = new Discord.Collection();
client.login(token);
/*
    GW2 Includes

 */

// const gw2 = require('gw2-api');
// const api = new gw2.gw2();

// api.setStorage(new gw2.memStore());



/*
    CSV Includes
 */
// const csv = require('fast-csv');

/*
    Google Includes
 */

/*
    Discord Logins
 */


client.on('ready', () => {
    console.log(client.user.tag + " has logged in.");

    client.user.setActivity('Coded by Dogwar#2002');
});

let channel_id = "650567782890471436";
let message_id = "651598494141775872";

client.on("ready", (reaction, user) => {

    client.channels.get(channel_id).fetchMessage(message_id).then(m => {
        console.log("Cached reaction message.");
    }).catch(e => {
        console.error("Error loading message.");
        console.error(e);
    });

    // Play bot crontab message
    botUpdatePosts();

    client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();


        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('I can\'t execute that command inside DMs!');
        }

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        /*const now = Date.now();
        const timestamps = cooldowns.get(commandName);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);


            }
        }



        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

         */

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }

        // Commands related to Reaction Roles
        if (command === 'react') {
            console.log("react works");

            const embed = new Discord.RichEmbed()
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
            } catch (err) {
                console.log(err);
            }
        }
        if (!reaction.message.partial) {

            try {
                    console.log("Cached")
                    applyRole();

            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("Not a partial.");
            console.log(true);
            applyRole();

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

            } catch (err) {
                console.log(err);
            }
        }
        if (!reaction.message.partial) {
            try {
                    console.log("Cached")
                    removeRole();
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("Not a partial.");
            console.log(true);
            removeRole();

        }
    })

});

/*
    Function that takes care of scheduled Bot posts
 */
function botUpdatePosts(){

    var LWS4Train = new CronJob('45 7 * * *', function(){
        //Notification Message
    }, null, true, 'UTC');
    LWS4Train.start();

    var theTalk = new CronJob('45 10 * * 6', function(){
        // Notification message
    }, null, true, 'UTC');
    theTalk.start();

    var LWS3Train = new CronJob('45 13 * * 3', function(){
        // Notification Message
    }, null, true, 'UTC');
    //LWS3Train.start();

    var HPTrain = new CronJob('0 1 * * 1', function(){
        // Notification Message
    }, null, true, 'UTC');

    var WPTrain = new CronJob('* * * * SUN', function(){
        // Notification Message
    }, null, true, 'UTC');
    //WPTrain.start();

    var Strikes = new CronJob('0 2 * * 2,4,6', function(){
        // Notification Message
    }, null, true, 'UTC');
    Strikes.start();

    var Raids = new CronJob('0 3 * * 5,6', function(){
        // Notification Message
    }, null, true, 'UTC');
    //Raids.start();

    var GuildMissions = new CronJob('45 10 * * SUN', function(){
        // Notification Message
    }, null, true, 'UTC');
    GuildMissions.start();

    var test = new CronJob('45 13 * * *', function(){
        client.channels.get('679972927500058634').send("test");
    }, null, true, 'UTC')
}