const api = "https://api.guildwars2.com/v2/guild/F5BF2DF0-A119-E911-81AA-D66D0E22CAB6/members?access_token=70428CD7-F1EA-6642-A4AF-A6F28396D184E753B2A8-9618-40F1-82DB-8DFF2118F29D";
const snekfetch = require("snekfetch");
const Discord = require("discord.js");


module.exports = {

    name: 'verify',
    description: 'Verify your Discord account with your GW2 ingame Account',
    guildOnly: true,

    execute(message, args){
        const ingameName = args[0];
        let role = message.guild.roles.find(role => role.name === 'Guild Members');
        let member = message.mentions.members.first();

        console.log(ingameName);


        
        try {
            snekfetch.get(api).then(r => {
                let memberArray = JSON.parse(JSON.stringify(r.body));
<<<<<<< HEAD
                for (let i = 0; i < memberArray.length; i++) {
                    console.log(memberArray[i].name);
                    if (ingameName === memberArray[i].name){
                        member.addRole(role);
                        console.log('success');
                        return message.reply('You are in the guild!');
                    } else {
                        return message.reply('You are not in the guild!');
=======
                for (let i = 0; i <memberArray.length; i++) {
                    console.log(memberArray[i].name);
                    if (ingameName === memberArray[i].name){
                        member.addRole(roleId).catch(console.error);
>>>>>>> parent of 7cd197e... Stopped array output
                    }
                }
            });
        } catch (e){
            console.log(e);
        }

    }
};