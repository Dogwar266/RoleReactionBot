module.exports = {

    name: 'SafeFromAbreesShaft',
    description : 'Lists all members safe from Abrees shaft',

    execute(message) {
        try {
            message.channel.send('Anyone with a vagina');
        } catch (e){
            console.log(e);
        }
    },
};