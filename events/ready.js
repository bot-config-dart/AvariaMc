const {MessageEmbed} = require('discord.js');
module.exports = async (client) => {
    client.user.setStatus("online");
    var status = '';
    
    var players = '0'
    setInterval(function(){
        let statuses = [
            " Membre sur notre discord : "+client.guilds.cache.get("894211425340358666").memberCount,
            " Membre connecter sur le serveur : "+ players + " STATUT : " +status,
            " AlkiaMC",
            
        ]
            let statusp = statuses[Math.floor(Math.random() * statuses.length)];
            client.user.setActivity(statusp, {type:"WATCHING"})
    
    }, 15000);
    var request = require('request');
    var mcIP = client.config.ip;
    var mcPort = client.config.port;
    
    setInterval(function(){ 
            
        var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
            request(url, function(err, response, body) {
                try {
                    if(err) {
                        console.log(err);
                        return console.log('Error getting Minecraft server status...');
                    }
                    body = JSON.parse(body);

                    if(body.online) {
                        status = 'Ouvert';
                        if(body.players.now) {
                            players = body.players.now;
                        } else {
                            players = '0';
                        }
                    } else {

                        status = "Fermé"

                        players = '0';

                    }
                } catch(err) {
                    console.log(err);
                    status = "Fermé"
                    players = '0';
                }
            });
    
    }, 2400);

};