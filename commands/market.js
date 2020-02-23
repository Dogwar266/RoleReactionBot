const snekfetch = require("snekfetch");
const Discord = require("discord.js");



module.exports = {

  name: "market",
  description: "Display various GW2 Market information",
  guildOnly: true,

  execute(message, args){

      let choice = args[0];

      while (true){
          message.channel.send('**WELCOME TO THE MARKET COMMAND**\n ----------------------------------------\nPlease choose an option from the menu below!1. Buy Price of an Item\n 2. Sell Price of an Item\n 3. Stack Price of an Item\n 4. Custom Quantity Price of an Item\n 5. Exit');

          switch (choice){
              case 1:
                  break;
              case 2:
                  break;
              case 3:
                  break;
              case 4:
                  break;
              case 5:
                  break;
              default:
                  break;
          }

      }



  }




};