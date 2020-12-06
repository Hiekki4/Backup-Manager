const Discord = require("discord.js");
const config = require('../../Structures/jsons/config.json')
const db = require("../../Structures/Database/blacklist.js");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith(config.prefix))return;
    if(config.owner.includes(message.author.id) == false) {
        const erroembed = new Discord.MessageEmbed()
        .setTitle("Erro")
        .setColor(config.color)
        .setDescription("Você não pode executar este comando porque você está sem as seguintes permissões: Bot Developer")
        return message.quote(erroembed)
    }
  const id = args[0]
  const username = await bot.users.fetch(id).then(a => a.tag)
  if(!id) return message.quote("Você precisa adicionar o ID do usuário")
    if(isNaN(id)) return message.quote(`Você sabia que o ID do usuário é somente números? Então por que colocou: "${id}"?`)
      if(id.length < 18 || id.length > 18) return message.quote("Um ID contém 18 caracteres.")
    db.findOneAndDelete({_id:id}, (err, a) => {
      if(a) {
        const dd = new Discord.MessageEmbed()
        .setTitle("Você que manda!")
        .setColor(config.color)
        .setDescription(`O usuário ${username} foi removido da blacklist`)
        return message.quote(dd);
      } else {

        const erro = new Discord.MessageEmbed()
        .setTitle("Erro")
        .setColor(config.color)
        .setDescription(`O usuário ${username} não está na Blacklist para ser removido`)
        return message.quote(erro)
      }
    })
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: []
}
exports.help = {
    nome: "rbl",
    descrição: "Remove um usuário da blacklist.",
    uso: `${config.prefix}rbl`,
    categoria: "Owner"
}