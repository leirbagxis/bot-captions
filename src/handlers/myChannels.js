import verifyChannels from "../utils/verifyChanels.js"

const myChannel = async (bot, msg) => {

    if (msg.forward_from_chat && msg.forward_from_chat.type === "channel"){
        const channelID = msg.forward_from_chat.id
        const chatID = msg.from.id        

        const channelAdmins = await bot.getChatAdministrators(channelID)
        const admin = channelAdmins.find(admin => admin.user.id === chatID && admin.status === "creator")
        
        if (admin !== undefined){
            const channels = await verifyChannels(channelID, chatID) 
            console.log(channels);
            
        }
        
    }
    //console.log(msg);
    
}

export default myChannel