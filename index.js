const {Client,  LocalAuth} = require('whatsapp-web.js')
const qrcode = require("qrcode-terminal")


const client = new Client({
    authStrategy: new LocalAuth(), // mantém sessão salva localmente
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }})


client.on('qr', qr=>qrcode.generate(qr, {small:true}))

client.on('ready', ()=>console.log("whatsapp totalmente pronto para uso"))

client.on('message', msg=>{
    if(msg.body === "plano"){
        msg.reply("A Leve Saúde, o melhor plano da sua vida !")
    }
})


client.initialize()