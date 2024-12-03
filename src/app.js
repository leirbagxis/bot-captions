import TelegramBot  from "node-telegram-bot-api";
import verifyUser from "./utils/verifyUser.js";
import myChannelsHandler from "./handlers/myChannelsHandler.js";
import commands from "./config/config.js";

var command = commands()


const token = "7467025456:AAHflftO3o0pkU8jowg5yiEgsuD1Sz52L9U"
const bot = new TelegramBot(token, {polling: true})



const parseMessage = (template, params) => {
    return template.replace(/{(\w+)}/g, (_, key) => params[key] || `{${key}}`)
}

const groupButtons = (buttons, itemsPerRow = 2) => {
    const rows = [];
    for (let i = 0; i < buttons.length; i += itemsPerRow) {
      rows.push(buttons.slice(i, i + itemsPerRow));
    }
    return rows;
  };

bot.onText(/\/\w+/, async msg => {
    const chatID = msg.from.id
    const input = msg.text
    const message_id = msg.message_id

    await verifyUser(chatID)

    const params = {
        name: msg.from.first_name || "Usuario"
    }
    

    if (command[input]){
        const { message, buttons } = command[input]
        const parsedMessage = parseMessage(message, params)
        console.log(parsedMessage);
        

        if (buttons){
            console.log(buttons);
            
            const keyboard = {
                parse_mode: "Markdown",
                reply_to_message_id: message_id,
                reply_markup: {
                    inline_keyboard: groupButtons(
                        buttons.map((btn) => ({
                            text: btn.text,
                            callback_data: btn.callback_data
                        })),
                        2
                    )
                }
            }

            console.log(keyboard);
            

            bot.sendMessage(chatID, parsedMessage, keyboard);
        } else {
            bot.sendMessage(chatID, parsedMessage, {parse_mode: "Markdown", reply_to_message_id: message_id});
        }
    }
    
})

bot.on("callback_query", async msg => {
    const chatID = msg.message.chat.id
    const data = msg.data;
    const message_id = msg.message.message_id

    const params = {
        name: msg.message.chat.first_name || "Usuario"
    }


    if (command[`/${data}`]){

        if (data === "my_groups"){
            return myChannelsHandler(bot, msg)
        }

        const { message, buttons } = command[`/${data}`]
        const parsedMessage = parseMessage(message, params)

        if (buttons){
            const keyboard = {
                parse_mode: "Markdown",
                message_id,
                chat_id: chatID,
                reply_to_message_id: message_id,
                reply_markup: {
                    inline_keyboard: groupButtons(
                        buttons.map((btn) => ({
                            text: btn.text,
                            callback_data: btn.callback_data
                        })),
                        2
                    )
                }
            }

            bot.editMessageText(parsedMessage, keyboard);
        } else {            
            bot.editMessageText(parsedMessage, {chat_id: chatID, parse_mode: "Markdown", message_id, reply_to_message_id: message_id});
        }
        
    }
    
})

bot.on("message", async msg => {

    //await myChannelsHandler(bot, msg)
    
})