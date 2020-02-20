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
                let dogArray = JSON.parse(r.body);
                for (let i = 0; i < dogArray.length; i++){
                    if(dogArray[i].endsWith('.png' || '.jpg')){
                        console.log(i);
                    }
                }
              
            });

        } catch (e) {
            console.log(e.stack);
        }
    }
}
