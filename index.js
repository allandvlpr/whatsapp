const {Client,  LocalAuth, MessageMedia} = require('whatsapp-web.js')
const qrcode = require("qrcode-terminal")


const client = new Client({
    authStrategy: new LocalAuth(), // mantém sessão salva localmente
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }})


client.on('qr', qr=>qrcode.generate(qr, {small:true}))

client.on('ready', ()=>console.log("whatsapp totalmente pronto para uso"))



client.on('message', async(msg)=>{
    if(msg.body == "plano" || msg.body == "Plano"){
        const media = MessageMedia.fromFilePath('./criativo.jpg')
        await client.sendMessage(msg.from, media, {caption:"Temos planos ambulatoriais e completos, qual você prefere?"})
        console.log("mensagem com midia enviada com sucesso")
    }
})

client.initialize()