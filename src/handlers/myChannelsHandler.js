import commands from "../config/config.js";
import getChannels from "../utils/getChannels.js";

const command = commands()
const groupButtons = (buttons, itemsPerRow = 2) => {
    const rows = [];
    for (let i = 0; i < buttons.length; i += itemsPerRow) {
      rows.push(buttons.slice(i, i + itemsPerRow));
    }
    return rows;
};

const myChannelsHandler = async (bot, msg) => {
    const chatID = msg.from.id
    const message_id = msg.message.message_id
    const data = msg.data
    
    const channels = await getChannels(chatID)
    const {message, buttons } = command[`/${data}`];
    

    if (channels){

        const button = channels.map(channel => {
            return [
                {
                    text: channel.channelName,
                    callback_data: `config_${channel.id}`
                }
            ]
        })

        return bot.editMessageText(message, {
            chat_id: chatID,
            message_id,
            reply_to_message_id: message_id,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: button
            }
        })
    }

    return bot.editMessageText(`Voce nao tem nenhum grupo adicionado`, {
        chat_id: chatID,
        message_id,
        reply_to_message_id: message_id,
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [buttons.map((btn) => ({ text: btn.text, callback_data: btn.callback_data}))]
        }
    })

    
}

export default myChannelsHandler