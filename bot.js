// const { Telegraf } = require('telegraf');
const { Composer } = require('micro-bot');
// const bot = new Telegraf('1866857285:AAEodjK-iIYUmDUzzDN3sKmw8OGObCU08AM');
const bot = new Composer;
const axios = require('axios');
const cheerio = require('cheerio');

/* Variables para el Dollar */
var dollar = axios.get('http://www.bcv.org.ve/').then(response => {
const html = response.data;
const $ = cheerio.load(html);
const scrapedata = $('strong', '.row .recuadrotsmc').text();
let backupDollar = scrapedata.slice(50, 63);
dollar = '';
for(let i = 0; i < backupDollar.length; i++){
        dollar += backupDollar[i];
    }

    return dollar;

}).catch( error => {
console.log(error);
});

/* Reemplaza los comandos por defecto, eso debe consultar las guias */
bot.start( (ctx) => {
    console.log(ctx);
    ctx.reply('Bienvenidos' + ' ' + ctx.from.first_name + ' ' + ctx.from.last_name + ' ' + 'al sistema de pedidos');
    ctx.reply('Si necesita consultar el precio del dollar escriba: /dollar');
    ctx.reply('Si necesita alguna consulta, por favor escriba: /menu');
});

/* Crea los comandos con /comando */
bot.command('menu', (ctx) => {
    /* Esto genera los botenes en el chat */
    ctx.reply("Tenemos los siguientes menus", {
        "reply_markup": {
            "inline_keyboard": [
            [
                {
                text: "🥐 Desayunos",
                callback_data: "desayunos",
                },
            ],
            [
                {
                text: "🍰 Dulces",
                callback_data: "dulces",
                },
            ],
            [
                {
                text: "🍕 Pizza",
                callback_data: "pizza",
                },
            ],
            [
                {
                text: "🍗 Almuerzos",
                callback_data: "almuerzos",
                },
            ],
        ],
        },
        
    });
});
// Respuesta de cada callback_data
bot.action("desayunos", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, 'Tenemos los mejores desayunos a 1💲 ');
});

bot.action("dulces", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, 'Tenemos los dulces pequeños 3x1 1💲 ');
});

bot.action("pizza", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, 'Tenemos las raciones de pizza a 1.5💲 ');
});

bot.action("almuerzos", (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, 'Tenemos las ventas de almuerzos a 3💲 ');
});

/* Este escritor nos da la posibilidad de generar los botones de respuestas */
bot.hears("location", (ctx) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Podemos obtener su numero de telefono?', requestLocationKeyboard);
});

const requestLocationKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "Mi Localidad",
                request_location: true,
                one_time_keyboard: true
            }],
            ["Cancel"]
        ]
    }

}

bot.command('dollar', (ctx) => {
    console.log(dollar);
    ctx.reply('Recordamos que la tasa del dolar manejamos al BCV');
    ctx.reply('Precio del dolar: 🤑' + dollar);
});

bot.command('test', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Enlace disponible', keyboard);
});

const concordelinst = {
    "reply_markup": {
        "inline_keyboard":[
            [{text: "✔️ @concordeli", url: "https://www.instagram.com/concordeli/"}],
        ]
    }
};

bot.hashtag(['concorDeli', 'ConcorDeli', 'concordeli'], (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Siganos en Instagram los mejores desayunos, almuerzos y merienda del mercado de CCS!!', concordelinst);
});


// bot.launch();
module.exports = bot;