const api = "https://dog.ceo/api/breeds/image/random Fetch!";
const snekfetch = require("snekfetch");
const Discord = require("discord.js");

module.exports = {

    name: 'dog',
    description : 'Sends a random image of a dog.',
    guildOnly: true,

    execute(message, args) {
        try {
            snekfetch.get(api).then(r => {
                let embed = new Discord.RichEmbed()
                    .setImage(r.body.file)
                return message.channel.send({embed});
            });

            } catch (e) {
            console.log(e.stack);
        }
    }
}
