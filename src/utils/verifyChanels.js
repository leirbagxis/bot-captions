import prisma from "../db/prisma.js"

const verifyChannels = async (channelID, ownerID) => {
    const verify = await prisma.channels.findMany({
        where: {
            ownerID
        }
    })

    if (!verify[0]) {
        const save = await prisma.channels.create({
            data: {
                ownerID,
                id: channelID
            }
        })

        return save        
    }

    return verify
    
}

export default verifyChannels