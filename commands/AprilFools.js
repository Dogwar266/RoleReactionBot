

module.exports = {

    name: 'aprilFools',
    description : 'One time only command',


    async execute(message)
    {
        try {
            for (var i = 0; i < 15; i++) {
                message.channel.send("@everyone");
                await sleep(5000);
            }
        } catch (e){
            console.log(e);
        }
    }

};
