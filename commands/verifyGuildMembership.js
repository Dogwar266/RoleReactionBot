const api = "https://api.guildwars2.com/v2/guild/F5BF2DF0-A119-E911-81AA-D66D0E22CAB6/members?access_token=70428CD7-F1EA-6642-A4AF-A6F28396D184E753B2A8-9618-40F1-82DB-8DFF2118F29D";
const snekfetch = require("snekfetch");
const Discord = require("discord.js");

let nameMap = new Map();

module.exports = {

    name: 'verify',
    description: 'Verify your Discord account with your GW2 ingame Account',
    guildOnly: true,

    execute(message){

        let input = message.content;
        let splitInput = input.split(' ');
        splitInput.shift();
        let splitInputString = splitInput.toString();
        const ingameName = splitInputString.replace(/,/g, " ");

        // const discordName = args[1];
        let role = message.guild.roles.find(role => role.name === 'Guild Members');
        //let member = message.guild.members.find(message.author.id).username;
        console.log(ingameName);

        
        try {
            snekfetch.get(api).then(r => {
                let memberArray = JSON.parse(JSON.stringify(r.body));
                for (let i = 0; i <memberArray.length; i++) {
                    if (ingameName === memberArray[i].name){
                        message.reply(nameMap.get(`${ingameName}`));
                        if (nameMap.has(`${ingameName}`)){
                            message.reply("Oops! It looks like someone already verified that name!");
                            nameMap.delete(`${ingameName}`);
                        } else if(!nameMap.has(`${ingameName}`)){
                            message.reply('You are in the guild!');
                            message.member.addRole(role);
                            nameMap.set(`${ingameName}`, `${message.member}`);
                        }
                        break;
                    } else if (ingameName != memberArray[i].name && i === memberArray.length - 1) {
                            console.log('I got here!');
                            let embed = new Discord.RichEmbed()
                                .setColor('#15aedb')
                                .setTitle('Something went wrong!')
                                .setDescription('It looks like you\'re either not in the guild or you\'ve mistyped the command!\n ' +
                                    'Try retyping the command, an example of how it\s supposed to look can be found in the image below!\n If the command still doesn\'t work' +
                                    ' make sure you triple check your ingame name to make sure it matches!')
                                .addField('Example command', 'Below is an example of how the command should look in your client!')
                                .setImage('https://i.imgur.com/A2TKYWu.png');
                            message.channel.send({embed}).catch(console.error);

                    }
                }
            });
        } catch (e){
            console.log(e);
        }

    }
};



