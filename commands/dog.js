function image(message) {
    let options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "dog",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    }
}
request (options, function(error, response, responseBody){
    if (error){
        return;
    }
    let $ = cheerio.load(responseBody)

    let links = $(".image a.link");

    let urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

    console.log(urls);

    if (!urls.length) {
        return;
    }


});


module.exports = {

    name: 'dog',
    description : 'Sends a random image of a dog.',
    guildOnly: true,

    execute(message, args) {

        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    }
};
