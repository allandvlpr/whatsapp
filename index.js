const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js')
const qrcode = require("qrcode-terminal")


const client = new Client({
    authStrategy: new LocalAuth(), // mantém sessão salva localmente
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
})


client.on('qr', qr => qrcode.generate(qr, { small: true }))

client.on('ready', async () => {

    console.log("bot funcionando \n\n")


    const grupos = [
        '120363263565615003@g.us',
        '120363276145647961@g.us',
        '120363315933663865@g.us',
        '120363365271228729@g.us',
        '120363413005097742@g.us',
        '120363399454185415@g.us',
        '120363416232648389@g.us',
        '120363357248655142@g.us',
        '120363400625158166@g.us',
        '120363037513854823@g.us',
        '120363021912106993@g.us',
        '120363367809699487@g.us',
        '120363391574653154@g.us',
        '120363020331141303@g.us'
    ]


    const intervalo = {}

    grupos.forEach(async (item) => {
        const ep = await client.getChatById(item)

        if (!intervalo[item]) {
            intervalo[item] = setInterval(async () => {
                try {
                    await client.sendMessage(item, "Bom domingo a todos no grupo")
                    console.log(`Grupo ${ep.name} foi enviado`, intervalo[item])
                }
                catch (error) {
                    console.log(error.message)
                }

            }, 60000)
        }

    })

    // grupos.map(async(item)=>{
    //     try{
    //         const media = MessageMedia.fromFilePath('./criativo.jpg')
    //         await client.sendMessage(item, media, {caption:'🚨 *ATENÇÃO !!!* 🚨 \n\nPLANO DE SAÚDE SEM CARÊNCIA PARA CONSULTAS, EXAMES, TERAPIAS, URGÊNCIA E EMERGÊNCIA \n\nME CHAMA NO ZAP PARA SIMULAÇÃO'})
    //         console.log(`Grupo ${item.name} prospectado com sucesso`)
    //         const opa = await client.getNumberId('5521986113683')
    //         const ep = await client.getContactById(item)
    //         await client.sendMessage(opa._serialized,`Grupo ${ep.name} prospectado com sucesso`)
    //     }
    //     catch(error){
    //         console.log(error.message)
    //     }
    // })

})


// client.on('message', async(msg)=>{
//     if(msg.body == "plano" || msg.body == "Plano"){
//         const media = MessageMedia.fromFilePath('./criativo.jpg')
//         await client.sendMessage(msg.from, media, {caption:"Temos planos ambulatoriais e completos, qual você prefere?"})
//         console.log("mensagem com midia enviada com sucesso")
//     }
// })

client.initialize()