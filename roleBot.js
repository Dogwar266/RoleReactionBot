

/*
    Discord includes
 */
const snekfetch = require('snekfetch');
const discord = require('discord.js');
const client = new discord.Client({
    partials: ['MESSAGE']
});
const fs = require('fs');

/*
    CSV Includes
 */
const csv = require('fast-csv');

/*
    Google Includes
 */
const readline = require('readline');
const {google} = require('googleapis');

/*
    Discord Logins
 */
const {prefix} = require('./config.json');
const token = process.env.token;
client.login(token);
client.on('ready', () => {
    console.log(client.user.tag + " has logged in.");
});

let channel_id = "650567782890471436";
let message_id = "651598494141775872";

const SCOPES = ['https://www.googleapis.com/auth/spreadhseets.readonly'];
const TOKEN_PATH = 'token.json';

fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file: ', err);
    authorize(JSON.parse(content), listMajors);
});

function authorize(credentials, callback){
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials((JSON.parse(token)));
        callback(oAuth2Client);
    });
}

function getNewToken(oAuth2Client, callback) {
    const authURL = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorise this app by visiting this url: ', authURL);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to ', TOKEN_PATH);
        });
        callback(oAuth2Client);
    });
}

function listMajors(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.value.get({
        spreadsheetId: '17QRSyBhAvjp6GIXGcKki16jj8F6HhmC8Nt0YPyRqhPI',
        range: 'Class Data ! A2:E',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            console.log('Name, Major: ');
            rows.map((row)=> {
                console.log(`${row[0]}, ${row[4]}`);
            });
        } else {
            console.log('No data found');
        }

    });
    }


client.on("ready", (reaction, user) => {

    client.channels.get(channel_id).fetchMessage(message_id).then(m => {
        console.log("Cached reaction message.");
    }).catch(e => {
        console.error("Error loading message.");
        console.error(e);
    });

    client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();


        if (command === 'react') {
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

