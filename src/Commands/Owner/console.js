const Discord = require("discord.js");
const config = require('../../Structures/jsons/config.json')
const e = require("../../Structures/jsons/emojis.json")
const process = require("child_process")

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith(config.prefix)) return;
  let avatar = message.author.avatarURL()
  let member = message.author.tag
  if (config.owner.includes(message.author.id) == false) {
    const erroembed = new Discord.MessageEmbed()
      .setColor("RED")
      .setAuthor(`${member}`, `${avatar}`)
      .setDescription(`${e.errado} - Você não pode executar este comando porque você está sem as seguintes permissões: Bot Developer`)
    return message.quote(erroembed)
  }
  if (!args.join(" ")) { return message.reply("escreve ai") }

  message.quote("Aguarde").then(m => m.delete({ timeout: 5000 }));

  process.exec(args.join(" "), (error, stdout) => {

    let response = (error || stdout);

    message.quote(response, { code: "asciidoc", split: "\n" }).catch(err => message.channel.send(err));
  })
  return;
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliase: []
}
exports.help = {
  nome: "console",
  descrição: "executa codigos.",
  uso: `${config.prefix}console`,
  categoria: "Owner"
}