const config = require("./src/Structures/jsons/config.json")
const Discord = require("discord.js")
const bot = new Discord.Client
const color = require("colors")
const fs = require("fs");
const glob = require('glob');
backup = require("discord-backup")

const mongoose = require("mongoose");
require("snekfetch")
mongoose.connect(config.mongoDB, { 
  
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then (function () {
  console.log("[BANCO DE DADOS] Banco de dados foi ligado".brightCyan)
}).catch (function () {
  console.log("[BANCO DE DADOS] Banco de dados não conectado".brightRed)
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


glob(__dirname+'/src/Commands/*/*.js', function (er, files) {
    if(er) console.log(er)
    files.forEach(f => {
        let props = require(`${f.replace('.js', '')}`)
        bot.commands.set(props.help.nome,props)
        for (const aliase of props.conf.aliase){
            bot.aliases.set(aliase,props)
        };})
    
    console.log("[COMANDOS] - Carregados com sucesso".brightCyan)
})


fs.readdir("./src/Events/", (err, files) => {
    if(err)
        console.error(err);
    const eventsFiles = files.filter(file => file.split(".").pop() == "js");
    if(eventsFiles.length <= 0)
        return console.warn("[EVENTOS] - Não existem eventos para ser carregado".brightRed);
    eventsFiles.forEach((file, i) => {
        require("./src/Events/" + file);
    })
    console.log("[EVENTOS] - Carregados com sucesso".brightCyan)
});
 
bot.login(config.token);

module.exports = {
    bot
}