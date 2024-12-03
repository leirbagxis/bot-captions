import commands from "../config/config.js";
import getChannels from "../utils/getChannels.js";

const command = commands()

const myChannelsHandler = async (bot, msg) => {
    const chatID = msg.from.id
    const message_id = msg.message.message_id
    const data = msg.data

    const channels = await getChannels(chatID)
    const message = command[`/${data}`].message;

    console.log(channels);
    const buttons = channels.map(channel => {
        return [
            {
                text: channel.channelName,
                callback_data: `config_${channel.id}`
            }
        ]
    })

    //console.log(message_id);
    

    return bot.editMessageText(message, {
        chat_id: chatID,
        message_id,
        reply_to_message_id: message_id,
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: buttons
        }
    })


    
}

export default myChannelsHandler