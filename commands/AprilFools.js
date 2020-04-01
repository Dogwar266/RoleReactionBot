module.exports = {

    name: 'AprilFools',
    description : 'One time only command',


    execute(message, args)
    {
        for (var i = 0; i < 15; i++){
            message.channel.send("@everyone");
        }
    }

};
