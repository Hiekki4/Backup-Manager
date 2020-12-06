const Discord = require('discord.js');
const config = require("../../Structures/jsons/config.json");
const os = require("os");
const cmd = require("../../Structures/Database/commands.js");

module.exports.run = (bot, message, args) => {
    cmd.findOne({ procu: "comandos" }, (err, resultado) => {
        let totalSeconds = bot.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        let botinfoEmbed = new Discord.MessageEmbed()
        botinfoEmbed.setColor(config.color)
        botinfoEmbed.setTitle(`Informações do ${config.name}`)
        botinfoEmbed.setTimestamp()
        botinfoEmbed.setFooter(`${message.author.tag} - ${config.footer}`, message.author.avatarURL())
        botinfoEmbed.addField(`Criador`, `\`\`\`${bot.users.cache.get("709883330472050768").tag}\`\`\``, false)
        botinfoEmbed.addField(`Sistema Operacional`, `\`\`\`${os.platform()}\`\`\``, true)
        botinfoEmbed.addField(`Processador`, `\`\`\`${os.cpus()[0].model.toString().trim()}\`\`\``, false)
        botinfoEmbed.addField(`CPU`, `\`\`\`${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%\`\`\``, true)
        botinfoEmbed.addField(`Memória RAM`, `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\`\`\``, false)
        botinfoEmbed.addField(`Ping`, `\`\`\`${bot.ws.ping}\`\`\``, true)
        botinfoEmbed.addField(`Tempo online`, `\`\`\`${days.toFixed()} Dias, ${hours.toFixed()} Horas, ${minutes.toFixed()} Minutos e ${seconds.toFixed()} Segundos\`\`\``, false)
        botinfoEmbed.addField(`Versão`, `\`\`\`${(config.versão)}\`\`\``, true)
        botinfoEmbed.addField(`Discord.js`, `\`\`\`12.5.1\`\`\``, false)
        botinfoEmbed.addField(`Servidores`, `\`\`\`${bot.guilds.cache.size}\`\`\``, false)
        botinfoEmbed.addField(`Usuários`, `\`\`\`${bot.users.cache.size}\`\`\``, true)
        botinfoEmbed.addField(`Canais`, `\`\`\`${bot.channels.cache.size}\`\`\``, false)
        botinfoEmbed.addField(`Comandos executados`, `\`\`\`${resultado.cmd}\`\`\``, true)
        message.quote(botinfoEmbed)
    })
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["bot-info", "bot", "about"]
}
exports.help = {
    nome: "botinfo",
    descrição: "Veja as informações do bot.",
    uso: "gb.botinfo",
    categoria: "Utilitarios"
}