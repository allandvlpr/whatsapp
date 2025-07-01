const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js')
const {Sequelize, DataTypes} = require('sequelize')
const qrcode = require("qrcode-terminal")
const xlsx = require('read-excel-file/node')


const client = new Client({
    authStrategy: new LocalAuth(), // mantém sessão salva localmente
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
})


const db = new Sequelize('postgresql://neondb_owner:npg_57ueVELgdYZD@ep-bitter-union-ac40n7zb-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require?ssl=true')
db.authenticate().then(()=>console.log('conectado ao banco de dados !')).catch(error=>console.log(error.message))


const lead = db.define('lead', {
    nome:{
        type: DataTypes.STRING,
        allowNull:false
    },
    telefone:{
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    tableName:'leads',
    freezeTableName:true
})

//lead.sync({force:true}).then(()=>console.log('tabela criada com sucesso')).catch(error=>console.log(error.message))

client.on('qr', qr => qrcode.generate(qr, { small: true }))

client.on('ready', async () => {

    console.log("bot funcionando\n")

    // xlsx('./leads.xlsx', {
    //     schema: {
    //         'NOME': {
    //             prop: 'nome',
    //             type: String,
    //             //required: true
    //         },
    //         'TELEFONE': {
    //             prop: 'telefone',
    //             type: Number,
    //             //required: true,
    //         }

    //     }
    // }).then(({rows}) => {
    //     rows.map(async(item)=>{
    //         try{
    //             await lead.create({nome:item.nome, telefone:item.telefone})
    //             console.log("leads salvos com sucesso")
    //         }
    //         catch(error){
    //             console.log(error.message)
    //         }
    //     })
    // })


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
					const media = MessageMedia.fromFilePath('./criativo.jpg')
                     await client.sendMessage(item,media,{caption:"PLANO DE SAÚDE SEM CARÊNCIA PARA CONSULTAS, EXAMES, URGÊNCIA E EMERGÊNCIA"})
  	                 console.log(`Grupo ${ep.name} foi enviado`)
                 }
                 catch (error) {
                     console.log(error.message)
                 }

             }, 10800000)
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


client.on('message', async(msg)=>{
    if(msg.hasMedia){
        const epa = await msg.downloadMedia()
        console.log(epa.filesize, epa.filename, epa.mimetype)
    }
        
    
})


client.initialize()
