const { get } = require('snekfetch');

module.exports = {

    name: 'dog',
    description : 'Sends a random image of a dog.',
    guildOnly: true,

    execute(message, args) {
        try {
            get('https://dog.ceo/api/breeds/image/random').then(response => {
                message.channel.send({files: [{attachment: response.body.file, name: `dog.${response.body.file.split('.')[2]}`}]});
                console.log('random dog picture');
            })
        } catch (e) {
            console.log(e.stack);
        }
    }
}
