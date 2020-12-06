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
    .setDescription(`${e.errado} - Eu preciso de permissão de MANAGE_GUILD para o comando \`carregarbackup\` funcionar.`)
  if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.quote(embedbp);
  let backupID = args[0];
  if (!backupID) {
    let Speficyid = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`ID de backup invalida!`)
      .setFooter(config.footer)
      .setTimestamp()
      .setColor(config.color)

    return message.quote(Speficyid);
  }

  backup.fetch(backupID).then(async () => {

    let warning = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`Para carregar o backup digite sim para sim`)
      .setFooter(config.footer)
      .setTimestamp()
      .setColor(config.color)

    message.quote(warning);
    await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "sim"), {
      max: 1,
      time: 20000,
      errors: ["time"]
    }).catch((err) => {
      let timeisup = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`O tempo acabou carregamento de backup cancelado`)
        .setFooter(config.footer)
        .setTimestamp()
        .setColor(config.color)

      return message.quote(timeisup);
    });
    let loadingstarting = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`Começando a carregar o backup`)
      .setFooter(config.footer)
      .setTimestamp()
      .setColor(config.color)

    message.quote(loadingstarting);

    backup.load(backupID, message.guild).then(() => {
    }).catch((err) => {
      let permissionserorr = new Discord.MessageEmbed()
        .setTitle("Erro")
        .setDescription(`Ocorreu um erro... Verifique se você tem permições de adminstrador!`)
        .setFooter(config.footer)
        .setTimestamp()
        .setColor(config.color)

      return message.author.send(permissionserorr);
    });
  }).catch((err) => {
    console.log(err);
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
  aliase: ["backupload", "loadbackup"]
}
exports.help = {
  nome: "carregarbackup",
  descrição: "Carrega um backup para o seu servidor.",
  uso: `${config.prefix}carregarbackup`,
  categoria: "Backup"
}