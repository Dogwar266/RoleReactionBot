import * as Discord from "discord.js";

const { get } = require("snekfetch");

module.exports = {

    name: 'dog',
    description : 'Sends a random image of a dog.',
    guildOnly: true,

    execute(message, args) {
        try {
            get('https://random.dog/woof').then(res => {
                const embed = new Discord.RichEmbed()
                    .setImage(res.body.file)
                    return message.channel.send({embed});
                console.log('random dog picture');
            })
        } catch (e) {
            console.log(e.stack);
        }
    }
}
