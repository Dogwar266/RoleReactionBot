const api = "https://dog.ceo/api/breeds/image/random";
const snekfetch = require("snekfetch");
const Discord = require("discord.js");

module.exports = {

    name: 'dog',
    description : 'Sends a random image of a dog.',
    guildOnly: true,

    execute(message, args) {
        try {
            snekfetch.get(api).then(r => {
                let message = r.body;
                let image = r.body.find.message.stringify();
              console.log(image);
            });

        } catch (e) {
            console.log(e.stack);
        }
    }
}
