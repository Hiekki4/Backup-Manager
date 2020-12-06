const { bot } = require("../../index");

bot.on("guildCreate", guild => {
  console.log(`Guild: ${guild.name}(${guild.id})! Usuários:${guild.members.cache.filter(m => !m.user.bot).size} | Bots:${guild.members.cache.filter(m => m.user.bot).size} | Região:${guild.region}`)
})
