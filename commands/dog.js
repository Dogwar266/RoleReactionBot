const api = "https://dog.ceo/api/breeds/image/random";
const snekfetch = require("snekfetch");
const Discord = require("discord.js");

module.exports = {

    name: 'dog',
    description : 'Sends a random image of a dog.',
    guildOnly: true,

    execute(message) {
        try {
            message.channel.send('doggo pic here eventually');
            snekfetch.get(api).then(r => {
                let dogArray = JSON.parse(JSON.stringify(r.body));
                console.log(r.body);
                let embed = new Discord.RichEmbed()
                    .setImage(r.body.message);
                message.channel.send(embed);
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
};
