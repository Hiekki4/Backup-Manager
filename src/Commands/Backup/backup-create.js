const Discord = require("discord.js")
const backup = require("discord-backup")
backup.setStorageFolder(__dirname+"backups/")
const config = require("../../Structures/jsons/config.json")
const e = require("../../Structures/jsons/emojis.json")


module.exports.run = async (bot, message, args) => {
    let avatar = message.author.avatarURL()
    let member = message.author.tag
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        const embedersd = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(`${member}`, `${avatar}`)
            .setDescription(`${e.errado} - Você precisa de permissão de ADMINISTRADOR para utilizar este comando.`)
            .setFooter(config.footer)
            .setTimestamp()
        message.quote(embedersd)
        return;
    }
    const embedbp = new Discord.MessageEmbed()
        .setColor(config.color)
        .setFooter(config.footer)
        .setTimestamp()
        .setAuthor(`${member}`, `${avatar}`)
        .setDescription(`${e.errado} - Eu preciso de permissão de MANAGE_GUILD para o comando \`criarbackup\` funcionar.`)
    if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.quote(embedbp);
    const embedct = new Discord.MessageEmbed()
        .setDescription("Criado backup...")
        .setFooter(config.footer)
        .setTimestamp()
        .setColor(config.color)
    const msg = await message.quote(embedct);
    backup.create(message.guild, {
        jsonBeautify: true,
        doNotBackup: ["emojis"],
    }).then((backupData) => {
        message.author.send(
            new Discord.MessageEmbed()
                .setTitle(`Backup criado com sucesso`)
                .setDescription(`Para carregar o backup use ${config.prefix}loadbackup \`${backupData.id}\`\nPara ver as informações do backup use ${config.prefix}backupinfo \`${backupData.id}\``)
                .setFooter(config.footer)
                .setTimestamp()
                .setColor(config.color)
        )
        let datacreated = new Discord.MessageEmbed()
            .setDescription(`Backup Criado com sucesso, veja seu privado.`)
            .setFooter(config.footer)
            .setTimestamp()
            .setColor(config.color)
        msg.edit(datacreated);
        msg.edit("\u200b");
    });
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["backupcreate", "criar-backup", "createbackup"]
}
exports.help = {
    nome: "criarbackup",
    descrição: "Cria um backup do seu servidor.",
    uso: `${config.prefix}criarbackup`,
    categoria: "Backup"
}