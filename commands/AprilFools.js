

module.exports = {

    name: 'aprilFools',
    description : 'One time only command',


    execute(message)
    {
        async function aprilFoolsJoke()
        {
            console.log('I got here');
            try {
<<<<<<< HEAD
                for (let i = 0; i < 15; i++) {
                    message.channel.send('@everyone');
=======
                for (var i = 0; i < 15; i++) {
                    message.channel.send("@everyone");
>>>>>>> parent of b9de218... changed var to let
                    await sleep(5000);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
};
