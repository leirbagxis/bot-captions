import { getChannelByID } from "../utils/getChannels.js"
import saveChannels from "../utils/saveChanels.js"


const saveChannelHandler = async (bot, msg) => {
    if (msg.forward_from_chat && msg.forward_from_chat.type === "channel"){
        const channelID = msg.forward_from_chat.id
        const chatID = msg.from.id
        const channelName = msg.forward_from_chat.title

        const channelAdmins = await bot.getChatAdministrators(channelID)
        //const admin = channelAdmins.find(admin => admin.user.id === chatID && admin.status === "creator")
        var confirmMessage = {}

        console.log(admin);
        
        /*
        if (admin !== undefined){
            const verifyChannel = await getChannelByID(channelID)
            console.log(verifyChannel);
            
            if (verifyChannel === null) {
                confirmMessage = await bot.sendMessage(chatID, `Canal ${channelName} nao esta cadastrado... por favor aguarde`)
                var message_id = confirmMessage.message_id

                const saveChannel = await saveChannels(channelID, chatID, channelName)

                if (saveChannel) {
                    return bot.editMessageText(`O Canal *${channelName}* foi adcionado com sucesso!!\n\nVerifique no menu *Meus Canais* para configurar`, {
                        chat_id: chatID,
                        parse_mode: "Markdown",
                        message_id,
                        reply_markup: {
                            inline_keyboard: [[{ text: "Menu", callback_data: "start"}]]
                        }
                    })
                }
            } else {
                return bot.sendMessage(chatID, "algo deu errado")
            }
            
        }*/
        
    }
}

export default saveChannelHandler