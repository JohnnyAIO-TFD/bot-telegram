const { Telegraf } = require('telegraf');
const bot = new Telegraf('1866857285:AAEodjK-iIYUmDUzzDN3sKmw8OGObCU08AM');

// const { Composer } = require('micro-bot');
// const bot = new Composer;

var odooProducts = [];

const getProducts = async () => {
    console.log('Consultando a Odoo');
    await fetch('http://localhost:3000/api/products/lists').then(response => response.json()).then(result => {
        console.log('Obteniendo los productos: ', result);
        odooProducts = result.data;
    });
}

const orderProducts = async (id, ctx) => {
    odooProducts.filter(async producto => {
        if(producto.categ_id[0] == id){
            await ctx.telegram.sendMessage(ctx.chat.id, producto.name + ' ' + producto.list_price + ' ' + producto.categ_id[1]);
        }
    });
}

const searchProduct = async (key, ctx) => {
    odooProducts.filter(producto => {
        if(String(producto.name).includes(key.toUpperCase())){
            ctx.telegram.sendMessage(ctx.chat.id, producto.name + ' ' + producto.list_price + ' ' + producto.categ_id[1]);
        }
    })
}

/* Reemplaza los comandos por defecto, eso debe consultar las guias */
bot.start((ctx) => {
    console.log(ctx);
    ctx.reply('Bienvenidos' + ' ' + ctx.from.first_name + ' ' + ctx.from.last_name + ' ' + 'al sistema de pedidos');
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
                [
                    {
                        text: "Categorias de Canguro 🦘",
                        callback_data: "canguroCategory",
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

        bot.action("canguroCategory", (ctx) => {
            ctx.reply("Tenemos las siguientes categorias:", {
                "reply_markup": {
                    "inline_keyboard":
                    [
                        [
                            { 
                                text: "VASOS",
                                callback_data: "11"
                            }
                        ],
                        [
                            {
                                text: "ACCESORIOS",
                                callback_data: "12"
                            }
                        ],
                        [
                            {
                                text: "Accesorios de Belleza",
                                callback_data: "5"
                            }
                        ],
                        [
                            {
                                text: "ACCESORIOS MAQUINA Hcallback_dataROGEL",
                                callback_data: "28"
                            }
                        ],
                        [
                            {
                                text: "ACCESORIOS MICROSCOPIOS",
                                callback_data: "66"
                            }
                        ],
                        [
                            {
                                text: "Accesorios para Maquillaje",
                                callback_data: "6"
                            }
                        ],
                        [
                            {
                                text: "ACRILICOS Y CASES",
                                callback_data: "42"
                            }
                        ],
                        [
                            {
                                text: "ADAPTADOR",
                                callback_data: "24"
                            }
                        ],
                        [
                            {
                                text: "AIRPODS",
                                callback_data: "49"
                            }
                        ],
                        [
                            {
                                text: "All",
                                callback_data: "1"
                            }
                        ],
                        [
                            {
                                text: "Expenses",
                                callback_data: "3"
                            }
                        ],
                        [
                            {
                                text: "Saleable",
                                callback_data: "2"
                            }
                        ],
                        [
                            {
                                text: "PoS",
                                callback_data: "4"
                            }
                        ],
                        [
                            {
                                text: "AMELOW",
                                callback_data: "31"
                            }
                        ],
                        [
                            {
                                text: "Aparatologia",
                                callback_data: "9"
                            }
                        ],
                        [
                            {
                                text: "AUDIFONOS",
                                callback_data: "15"
                            }
                        ],
                        [
                            {
                                text: "AUDIFONOS GAMER",
                                callback_data: "50"
                            }
                        ],
                        [
                            {
                                text: "AUDIFONOS INALAMBRICOS",
                                callback_data: "55"
                            }
                        ],
                        [
                            {
                                text: "AURICULARES INALAMBRICOS",
                                callback_data: "56"
                            }
                        ],
                        [
                            {
                                text: "AURICULARES SENCILLOS",
                                callback_data: "51"
                            }
                        ],
                        [
                            {
                                text: "Barber Shop",
                                callback_data: "44"
                            }
                        ],
                        [
                            {
                                text: "BATERIAS",
                                callback_data: "37"
                            }
                        ],
                        [ 
                            { 
                                text: 'Bioaqua',
                                callback_data: "13"
                            } 
                        ],
                        [ 
                            { 
                                text: 'BOLSOS', 
                                callback_data: "84"
                            } 
                        ],
                        [ 
                            { 
                                text: 'Cabello', 
                                callback_data: "8"
                            } 
                        ],
                        [ 
                            { 
                                text: 'CABLES', 
                                callback_data: "23"
                            } 
                        ],
                        [ 
                            { 
                                text: 'CANGURO CAFE', 
                                callback_data: "111"
                            } 
                        ],
                        [ 
                            { 
                                text: 'CARGADORES', 
                                callback_data: "25"
                            } 
                        ],
                        [ 
                            { 
                                text: 'CASES PARA TABLET',
                                callback_data: "43"
                            } 
                        ],
                        [ 
                            { 
                                text: 'Cejas y Pestañas',
                                callback_data: "17"
                            } 
                        ],
                        [ 
                            { 
                                text: 'COCINAS ELECTRICAS',
                                callback_data: "90"
                            } 
                        ],
                        [ 
                            {  
                                text: 'CONECTORES',
                                callback_data: "26"
                            } 
                        ],
                        [ 
                            { 
                                text: 'CONSUMIBLES',
                                callback_data: "27"
                            } 
                        ],
                        [ 
                            {  
                                text: 'CONTROLES DE PLAY',
                                callback_data: "85"
                            } 
                        ],
                        [ 
                            { 
                                text: 'COREANO', 
                                callback_data: "61"
                            } 
                        ],
                        [ 
                            { 
                                text: 'CORNETAS DE COMPUTADORAS',
                                callback_data: "32"
                            } 
                        ],
                        [ 
                            { 
                                text: 'CORNETAS INALAMBRICAS',
                                callback_data: "33"
                            }
                        ],
                        [ 
                            { 
                                text: 'CUcallback_dataADO PERSONAL',
                                callback_data: "16"
                            }
                        ],
                        [
                            { 
                                text: 'CYCLING PRO', 
                                callback_data: "9"
                            } 
                        ],
                        [ 
                            { 
                                text: 'EQUIPOS ELECTRONICOS',
                                callback_data: "14"
                            }
                        ],
                        [
                            { 
                                text: 'Estetica y Spa',
                                callback_data: "10"
                            }
                        ],
                        [
                            { 
                                text: 'EVENTO ANKARA', 
                                callback_data: "115"
                            }
                        ],
                        [
                            { 
                                text: 'FOR ME',
                                callback_data: "112"
                            }
                        ],
                        [
                            { 
                                text: 'HERRAMIENTAS GRANDES',
                                callback_data: "62"
                            }
                        ],
                        [
                            { 
                                text: 'HERRAMIENTAS PEQUEÑAS',
                                callback_data: "65"
                            }
                        ],
                        [ 
                            { 
                                text: 'HIGH BEAUTY',
                                callback_data: "68"
                            }
                        ],
                        [ 
                            { 
                                text: 'HUMIFICADOR',
                                callback_data: "83"
                            }
                        ],
                        [ 
                            { 
                                text: 'IC DE CARGA STENCIL',
                                callback_data: "71"
                            }
                        ],
                        [ 
                            {
                                text: 'LAMINAS DE Hcallback_dataROGEL',
                                callback_data: "77"
                            }
                        ],
                        [
                            { 
                                text: 'LAMPARAS PARA HERRAMIENTAS',
                                callback_data: "67"
                            }
                        ],
                        [ 
                            { 
                                text: 'Linea Febble',
                                callback_data: "58"
                            }
                        ],
                        [
                            { 
                                text: 'Linea Huda',
                                callback_data: "18"
                            }
                        ],
                        [
                            {
                                text: 'Linea Meis',
                                callback_data: "48"
                            }
                        ],
                        [
                            { 
                                text: 'Linea Ushas',
                                callback_data: "57"
                            }
                        ],
                        [
                            {
                                text: 'Manos y Pies',
                                callback_data: "22"
                            } 
                        ],
                        [
                            { 
                                text: 'Maquillaje Colombiano',
                                callback_data: "59"
                            }
                        ],
                        [
                            { 
                                text: 'Maquillaje Profesional',
                                callback_data: "52"
                            }
                        ],
                        [
                            { 
                                text: 'MAQUINAS DE Hcallback_dataROGEL',
                                callback_data: "89"
                            }
                        ],
                        [
                            { 
                                text: 'MATERIAL DE USO',
                                callback_data: "104"
                            }
                        ],
                        [
                            { 
                                text: 'MEMORIAS',
                                callback_data: "86"
                            }
                        ],
                        [
                            { 
                                text: 'MICAS',
                                callback_data: "69"
                            }
                        ],
                        [
                            { 
                                text: 'MICROPIEZAS',
                                callback_data: "74"
                            }
                        ],
                        [
                            { 
                                text: 'NACIONAL',
                                callback_data: "41"
                            }
                        ],
                        [ 
                            { 
                                text: 'PANTALLAS COMPLETAS',
                                callback_data: "73"
                            }
                        ],
                        [ 
                            {
                                text: 'PANTALLAS SENCILLAS',
                                callback_data: "79"
                            }
                        ],
                        [
                            {
                                text: 'PAPELERIA',
                                callback_data: "99"
                            }
                        ],
                        [
                            { 
                                text: 'paplere',
                                callback_data: "113"
                            }
                        ],
                        [
                            { 
                                text: 'PENDRIVE',
                                callback_data: "87"
                            }
                        ],
                        [
                            { 
                                text: 'POWER BANKS',
                                callback_data: "82"
                            }
                        ],
                        [
                            { 
                                text: 'PROTECTORES DE PANTALLA',
                                callback_data: "75"
                            }
                        ],
                        [ 
                            { 
                                text: 'PROTECTORES DE TAPAS',
                                callback_data: "76"
                            }
                        ],
                        [ 
                            { 
                                text: 'RECARGAS',
                                callback_data: "101"
                            }
                        ],
                        [ 
                            { 
                                text: 'RED',
                                callback_data: "88"
                            }
                        ],
                        [ 
                            { 
                                text: 'REPUESTOS DE CAUTIN',
                                callback_data: "64"
                            }
                        ],
                        [
                            { 
                                text: 'REPUESTOS PISTOLA DE CALOR',
                                callback_data: "63"
                            }
                        ],
                        [ 
                            { 
                                text: 'SCOOTERS',
                                callback_data: "91"
                            } 
                        ],
                        [ 
                            { 
                                text: 'SERVICIOS', 
                                callback_data: "100"
                            } 
                        ],
                        [ 
                            { 
                                text: 'SERVICIOS FIX', 
                                callback_data: "98"
                            }
                        ],
                        [ 
                            { 
                                text: 'SMARPH',
                                callback_data: "114"
                            } 
                        ],
                        [ 
                            { 
                                text: 'SMARTPHONES', 
                                callback_data: "93"
                            } 
                        ],
                        [ 
                            {
                                text: 'SMARTWATCHS', 
                                callback_data: "94"
                            } 
                        ],
                        [ 
                            { 
                                text: 'TABLETS', 
                                callback_data: "92"
                            } 
                        ],
                        [ 
                            { 
                                text: 'TACTILES', 
                                callback_data: "70"
                            }
                        ],
                        [ 
                            { 
                                text: 'TAPAS TRASERAS',
                                callback_data: "80"
                            } 
                        ],
                        [ 
                            { 
                                text: 'TELEFONOS BASICOS', 
                                callback_data: "95"
                            } 
                        ],
                        [ 
                            { 
                                text: 'TELEFONOS FIJOS',
                                callback_data: "96"
                            } 
                        ]
                    ]
                    
                },
            });
        });

        bot.action("11", (ctx) => {
            orderProducts("11", ctx);
        });

        bot.action("12", (ctx) => {
            orderProducts("12", ctx);
        });

        bot.action("5", (ctx) => {
            orderProducts("5", ctx);
        });

        bot.action("28", (ctx) => {
            orderProducts("28", ctx);
        });

        bot.action("66", (ctx) => {
            orderProducts("66", ctx);
        });

        bot.action("6", (ctx) => {
            orderProducts("6", ctx);
        });

        bot.action("42", (ctx) => {
            orderProducts("42", ctx);
        });

        bot.action("24", (ctx) => {
            orderProducts("24", ctx);
        });

        bot.action("49", (ctx) => {
            orderProducts("49", ctx);
        });

        bot.action("1", (ctx) => {
            orderProducts("1", ctx);
        });

        bot.action("3", (ctx) => {
            orderProducts("3", ctx);
        });

        bot.action("2", (ctx) => {
            orderProducts("2", ctx);
        });

        bot.action("4", (ctx) => {
            orderProducts("4", ctx);
        });

        bot.action("31", (ctx) => {
            orderProducts("31", ctx);
        });

        bot.action("9", (ctx) => {
            orderProducts("9", ctx);
        });

        bot.action("15", (ctx) => {
            orderProducts("15", ctx);
        });

        bot.action("50", (ctx) => {
            orderProducts("50", ctx);
        });

        bot.action("55", (ctx) => {
            orderProducts("55", ctx);
        });

        bot.action("56", (ctx) => {
            orderProducts("56", ctx);
        });

        bot.action("51", (ctx) => {
            orderProducts("51", ctx);
        });

        bot.action("44", (ctx) => {
            orderProducts("44", ctx);
        });

        bot.action("37", (ctx) => {
            orderProducts("37", ctx);
        });

        bot.action("13", (ctx) => {
            orderProducts("13", ctx);
        });

        bot.action("84", (ctx) => {
            orderProducts("84", ctx);
        });

        bot.action("8", (ctx) => {
            orderProducts("8", ctx);
        });

        bot.action("23", (ctx) => {
            orderProducts("23", ctx);
        });

        bot.action("111", (ctx) => {
            orderProducts("111", ctx);
        });

        bot.action("25", (ctx) => {
            orderProducts("25", ctx);
        });

        bot.action("43", (ctx) => {
            orderProducts("43", ctx);
        });

        bot.action("17", (ctx) => {
            orderProducts("17", ctx);
        });

        bot.action("90", (ctx) => {
            orderProducts("90", ctx);
        });

        bot.action("26", (ctx) => {
            orderProducts("26", ctx);
        });

        bot.action("27", (ctx) => {
            orderProducts("27", ctx);
        });

        bot.action("85", (ctx) => {
            orderProducts("85", ctx);
        });

        bot.action("61", (ctx) => {
            orderProducts("61", ctx);
        });

        bot.action("32", (ctx) => {
            orderProducts("32", ctx);
        });

        bot.action("33", (ctx) => {
            orderProducts("33", ctx);
        });

        bot.action("16", (ctx) => {
            orderProducts("16", ctx);
        });

        bot.action("9", (ctx) => {
            orderProducts("9", ctx);
        });

        bot.action("14", (ctx) => {
            orderProducts("14", ctx);
        });

        bot.action("10", (ctx) => {
            orderProducts("10", ctx);
        });

        bot.action("115", (ctx) => {
            orderProducts("115", ctx);
        });

        bot.action("112", (ctx) => {
            orderProducts("112", ctx);
        });

        bot.action("62", (ctx) => {
            orderProducts("62", ctx);
        });

        bot.action("65", (ctx) => {
            orderProducts("65", ctx);
        });

        bot.action("68", (ctx) => {
            orderProducts("68", ctx);
        });

        bot.action("83", (ctx) => {
            orderProducts("83", ctx);
        });

        bot.action("71", (ctx) => {
            orderProducts("71", ctx);
        });

        bot.action("77", (ctx) => {
            orderProducts("77", ctx);
        });

        bot.action("67", (ctx) => {
            orderProducts("67", ctx);
        });

        bot.action("58", (ctx) => {
            orderProducts("58", ctx);
        });

        bot.action("18", (ctx) => {
            orderProducts("18", ctx);
        });

        bot.action("48", (ctx) => {
            orderProducts("48", ctx);
        });

        bot.action("57", (ctx) => {
            orderProducts("57", ctx);
        });

        bot.action("22", (ctx) => {
            orderProducts("22", ctx);
        });

        bot.action("59", (ctx) => {
            orderProducts("59", ctx);
        });

        bot.action("52", (ctx) => {
            orderProducts("52", ctx);
        });

        bot.action("89", (ctx) => {
            orderProducts("89", ctx);
        });

        bot.action("104", (ctx) => {
            orderProducts("104", ctx);
        });

        bot.action("86", (ctx) => {
            orderProducts("86", ctx);
        });

        bot.action("69", (ctx) => {
            orderProducts("69", ctx);
        });

        bot.action("74", (ctx) => {
            orderProducts("74", ctx);
        });

        bot.action("41", (ctx) => {
            orderProducts("41", ctx);
        });

        bot.action("73", (ctx) => {
            orderProducts("73", ctx);
        });

        bot.action("79", (ctx) => {
            orderProducts("79", ctx);
        });

        bot.action("99", (ctx) => {
            orderProducts("99", ctx);
        });

        bot.action("113", (ctx) => {
            orderProducts("113", ctx);
        });

        bot.action("87", (ctx) => {
            orderProducts("87", ctx);
        });

        bot.action("82", (ctx) => {
            orderProducts("82", ctx);
        });

        bot.action("75", (ctx) => {
            orderProducts("75", ctx);
        });

        bot.action("76", (ctx) => {
            orderProducts("76", ctx);
        });

        bot.action("101", (ctx) => {
            orderProducts("101", ctx);
        });

        bot.action("88", (ctx) => {
            orderProducts("88", ctx);
        });

        bot.action("64", (ctx) => {
            orderProducts("64", ctx);
        });

        bot.action("63", (ctx) => {
            orderProducts("63", ctx);
        });

        bot.action("91", (ctx) => {
            orderProducts("91", ctx);
        });

        bot.action("100", (ctx) => {
            orderProducts("100", ctx);
        });

        bot.action("98", (ctx) => {
            orderProducts("98", ctx);
        });

        bot.action("114", (ctx) => {
            orderProducts("114", ctx);
        });

        bot.action("93", (ctx) => {
            orderProducts("93", ctx);
        });

        bot.action("94", (ctx) => {
            orderProducts("94", ctx);
        });

        bot.action("92", (ctx) => {
            orderProducts("92", ctx);
        });

        bot.action("70", (ctx) => {
            orderProducts("70", ctx);
        });

        bot.action("80", (ctx) => {
            orderProducts("80", ctx);
        });

        bot.action("95", (ctx) => {
            orderProducts("95", ctx);
        });

        bot.action("96", (ctx) => {
            orderProducts("96", ctx);
        });

        bot.hears(['busqueda', 'Busqueda'], (ctx) => {
            console.log('VAMOS A VER QUE TAL: ', ctx);
        });

        bot.on('text', (ctx) => {
            let keyword = ctx.message.text.toLowerCase().split(' ')[0];
            let keyproduct = ctx.message.text.toLowerCase().split(' ')[1];
            if(keyword.toLowerCase() == 'busqueda'){
                searchProduct(keyproduct, ctx);
            }
        });
        
        getProducts();
        bot.launch();