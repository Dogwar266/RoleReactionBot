

module.exports = {

    name: 'aprilFools',
    description : 'One time only command',


    execute(message)
    {
        async function aprilFoolsJoke()
        {
            console.log('I got here');
            try {

                for (let i = 0; i < 15; i++) {
                    message.channel.send('@everyone');
                }
                    for (let i = 0; i < 15; i++) {
                        message.channel.send("@everyone");
                        await sleep(5000);
                    }
                } catch (e){
                console.log(e);
            }
        }
    }
};
