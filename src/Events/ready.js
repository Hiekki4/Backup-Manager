const { bot } = require("../../index");
const color = require("colors");
const config = require("../Structures/jsons/config.json")


bot.on("ready", async () => {

    console.log(`[LOGIN] - Bot iniciado com ${bot.guilds.cache.size} servidores`.brightCyan);
    console.log(`[LOGIN] - Memoria usada ${(process.memoryUsage().rss/1024/1024).toFixed(2)}MB`.brightCyan)
    var presences = [
        {name: `Versão atual: [${(config.versão)}]`, type: 'PLAYING'},
        {name: `🔧 Sendo desenvolvido`, type: 'WATCHING'},
]
function setPresence(){
 var altpresence = presences[Math.floor(Math.random() * presences.length)]
 bot.user.setActivity(altpresence)
}

setPresence();
setInterval(() => setPresence(), 50000)
})