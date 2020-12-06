const Discord = require("discord.js")
const backup = require("discord-backup")
backup.setStorageFolder(__dirname+"backups/")
const config = require("../../Structures/jsons/config.json")
const e = require("../../Structures/jsons/emojis.json")


module.exports.run = async (bot, message, args) => {
    let avatar = message.author.avatarURL()
    let member = message.author.tag
    let backupID = args[0];
    if (!backupID) {
        const notvaild = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(`${member}`, `${avatar}`)
            .setDescription(`${e.errado} - Você precisa fornecer um ID de backup valido.`)
            .setFooter(config.footer)
            .setTimestamp()
        return message.quote(notvaild);
    }
    backup.fetch(backupID).then((backupInfos) => {
        const date = new Date(backupInfos.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth() + 1).toString(), dd = date.getDate().toString();
        const formatedDate = `${(dd[1] ? dd : "0" + dd[0])}/${(mm[1] ? mm : "0" + mm[0])}/${yyyy}`;
        let embed = new Discord.MessageEmbed()
            .setAuthor("Informações do backup")
            .setThumbnail(backupInfos.data.iconURL)
            .addField("Backup ID", backupInfos.id, false)
            .addField("ID do servidor", backupInfos.data.guildID, false)
            .addField("Nome do servidor", backupInfos.data.name, false)
            .addField("Tamanho do backup", `${backupInfos.size} mb`, false)
            .addField("Criado em", formatedDate, false)
            .setFooter(config.footer)
            .setTimestamp()
            .setColor(config.color)
        message.quote(embed);
    }).catch((err) => {
        let nobackupfound = new Discord.MessageEmbed()
            .setTitle("Erro")
            .setDescription(`Nenhum backup encontrado com o ID \`${backupID}\`.`)
            .setFooter(config.footer)
            .setTimestamp()
            .setColor(config.color)
        return message.quote(nobackupfound);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["infobackup", "info-backup", "backup-info"]
}
exports.help = {
    nome: "backupinfo",
    descrição: "Envia as informações do backup do seu servidor do discord.",
    uso: `${config.prefix}backupinfo`,
    categoria: "Backup"
}