

module.exports = {

    name: 'aprilFools',
    description : 'One time only command',

    execute(message) {

        console.log('I got here');
        try {
            for (let i = 0; i < 15; i++) {
                message.channel.send('@everyone');
            }
            for (let i = 0; i < 15; i++) {
                message.channel.send("@everyone");
            }
        } catch (e) {
            console.log(e);
        }
    }
};
