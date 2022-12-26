process.env.NTBA_FIX_319 = 'test';
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// const { Composer } = require('micro-bot');
// const bot = new Composer;
module.exports = async (request, response) => {
    try {
        /* Reemplaza los comandos por defecto, eso debe consultar las guias */
        bot.start((ctx) => {
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
            ctx.telegram.sendMessage(ctx.chat.id, 'Tenemos los mejores desayunos a 1💲 ');
        });

        bot.action("dulces", (ctx) => {
            ctx.telegram.sendMessage(ctx.chat.id, 'Tenemos los dulces pequeños 3x1 1💲 ');
        });

        bot.action("pizza", (ctx) => {
            ctx.telegram.sendMessage(ctx.chat.id, 'Tenemos las raciones de pizza a 1.5💲 ');
        });

        bot.action("almuerzos", (ctx) => {
            ctx.telegram.sendMessage(ctx.chat.id, 'Tenemos las ventas de almuerzos a 3💲 ');
        });

        /* Este escritor nos da la posibilidad de generar los botones de respuestas */
        bot.hears("location", (ctx) => {
            console.log(ctx.from)
            ctx.telegram.sendMessage(ctx.chat.id, 'Podemos obtener su numero de telefono?', requestLocationKeyboard);
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

        /*
        bot.command('test', (ctx) => {
            ctx.telegram.sendMessage(ctx.chat.id, 'Enlace disponible', keyboard);
        }); */

        const concordelinst = {
            "reply_markup": {
                "inline_keyboard": [
                    [{ text: "✔️ @concordeli", url: "https://www.instagram.com/concordeli/" }],
                ]
            }
        };

        bot.hears(['concorDeli', 'ConcorDeli', 'concordeli'], (ctx) => {
            ctx.telegram.sendMessage(ctx.chat.id, 'Siganos en Instagram los mejores desayunos, almuerzos y merienda del mercado de CCS!!', concordelinst);
        });


        bot.launch();
    } catch (error) {
        console.error('Error sending message');
        console.log(error.toString());
    }

    response.send('BOT INICIALIZADO');
}