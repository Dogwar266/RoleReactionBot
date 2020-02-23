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
                for (let i = 0; i < dogArray.length; i++){
                   console.log(dogArray[i]);
                }
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
};
