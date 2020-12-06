const config = require("../Structures/jsons/config.json");
const { bot } = require("../../index");
const Discord = require("discord.js");
const e = require("..//Structures/jsons/emojis.json");
const bldb = require("../Structures/Database/blacklist.js");
cooldown = new Set()

bot.on("message", async message => {
  let user = message.author
  let avatar = message.author.avatarURL()
  let member = message.author.tag
  if (message.author.bot) return;
    let messageArray = message.content.split(' ')
    let cmd = messageArray[0]
    let args = messageArray.slice(1);
    if (!message.guild) return;
    if (!message.channel.permissionsFor(message.guild.me).missing('SEND_MESSAGES') || !message.channel.permissionsFor(message.guild.me).missing('EMBED_LINKS')) return;
    if (!message.content.startsWith(config.prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(config.prefix.length))
    if (!commandfile) commandfile = bot.aliases.get(cmd.slice(config.prefix.length).toLowerCase())
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;
    if (message.author.bot) return;
    bldb.findOne({ _id: message.author.id }, (err, bl) => {
      if (bl) {
        const detectado = new Discord.MessageEmbed()
          .setTitle("Você está na Blacklist!")
          .setColor(config.color)
        if (!bl.motivo) {
          detectado.setDescription(`Motivo: \`Não definido\``)
        } else if (bl.motivo) {
          detectado.setDescription(`Motivo: \`${bl.motivo}\``)
        }
        return message.quote(detectado)
      }
      const cmd = require("../Structures/Database/commands.js");
      cmd.findOne({ procu: "comandos" }, (err, resultado) => {
        if (resultado) {
          resultado.cmd = resultado.cmd + 1;
          resultado.save();
        } else {
          new cmd({
            procu: "comandos",
            cmd: 1
          }).save();
        }
      })
      if (commandfile) {


        if (cooldown.has(user.id)) {
          return message.reply('Você deve esperar 5 segundos para executar outro comando novamente.').then(msg => {
            setTimeout(() => {
              msg.delete()
            }, 1000 * 5)
          })
        }


        if (!cooldown.has(user.id)) {
          cooldown.add(user.id)
          setTimeout(() => {
            cooldown.delete(user.id)
          }, 1000 * 5)
        }
      }
      if (commandfile && commandfile.conf.enabled !== true) {
        if (!commandfile) { return }
        const embed = new Discord.MessageEmbed()
          .setAuthor(`${member}`, `${avatar}`)
          .setColor("RED")
          .setDescription(`${e.errado} - Este comando esta desabilitado.`)
        return message.channel.send(embed)
      }
      if (!message.guild) return;
      if (commandfile) commandfile.run(bot, message, args)
    })
  })
