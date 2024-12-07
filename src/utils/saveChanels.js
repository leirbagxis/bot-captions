import prisma from "../db/prisma.js"

const saveChannels = async (channelID, ownerID, channelName) => {
    const save = await prisma.channels.create({
        data: {
            ownerID,
            id: channelID,
            channelName
        }
    })

    return save;
    
}

export default saveChannels