const config = require("../../Structures/jsons/config.json")
const Discord = require('discord.js')
const e = require("../../Structures/jsons/emojis.json")

module.exports.run = (bot, message, args) => {

    let avatar = message.author.avatarURL()
    let member = message.author.tag
        if (args[0]) {

            let cmd = bot.commands.find(c => c.help.nome.toLowerCase() === args[0] || (c.help.aliase && c.help.aliase.includes(args[0])));
            if (!cmd) {
                const embed2 = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setAuthor(`${member}`, `${avatar}`)
                    .setDescription(`${e.errado} - Esse comando não existe.`)
                message.quote(embed2)
                message.channel.stopTyping()
            } else {
                if (cmd) {
                    const embed1 = new Discord.MessageEmbed()
                    embed1.setColor(config.color)
                    embed1.setTitle("Central de ajuda")
                    embed1.addField(`Informações do comando:`, `\`${cmd.help.nome}\``)
                    embed1.addField(`Descrição do comando:`, `\`${cmd.help.descrição}\``, false)
                    if (cmd.conf.aliase.length == false) {
                        embed1.addField(`Alternativas:`, `\`Sem alternativas\``, false)
                    } else if (cmd.conf.aliase.map(c => c) == true) {
                    }
                    embed1.addField(`Modo de uso:`, `\`${cmd.help.uso}\``, false)
                    embed1.addField(`Categoria:`, `\`${cmd.help.categoria}\``, false)
                    message.quote(embed1)
                    message.channel.stopTyping()
                }
            }
        } else {
            const embed = new Discord.MessageEmbed()
            embed.setColor(config.color)
            embed.setDescription(`Comandos no total: \`${bot.commands.size}\`\nCriado por: \`${bot.users.cache.get("709883330472050768").tag}\`\nPrefixo: \`${config.prefix}\``)
            embed.setAuthor(`${bot.user.username}`, `${bot.user.avatarURL()}`)
            embed.setFooter(`Utilize ${config.prefix}ajuda <comando> para saber mais informações sobre o comando - ${config.name} ${config.versão}`);
            embed.addField(`${config.prefix}criarbackup`, `Cria um backup do seu servidor.`)
            embed.addField(`${config.prefix}backupinfo`, `Envia as informações do backup do seu servidor do discord.`)
            embed.addField(`${config.prefix}carregarbackup`, `Carrega um backup para o seu servidor.`)
            embed.addField(`${config.prefix}botinfo`, `Veja as informações do ${config.name}.`)
            embed.addField(`${config.prefix}convite`, `Manda o convite do ${config.name}.`)
            embed.addField(`${config.prefix}ping`, `Veja a latencia do ${config.name}.`)
            embed.addField(`${config.prefix}ajuda`, `Mostra os comandos do ${config.name}.`)
            message.quote(embed)
        }
    }

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["ajuda", "comandos", "cmds"]
}
exports.help = {
    nome: "help",
    descrição: "Mostra os comandos do bot.",
    uso: `${config.prefix}help`,
    categoria: "Utilitários"
}