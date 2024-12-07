import prisma from "../db/prisma.js"

const getChannels = async (chatID) => {
    const verify = await prisma.channels.findMany({
        where: {
            owner: {
                id: chatID
            }
        }
    })

    if (!verify[0]) {
        return false
    }

    return verify;

}

const getChannelByID = async (channelID) => {
    const verify = await prisma.channels.findUnique({
        where: {
            id: channelID
        }
    })

    return verify
}

export {getChannels, getChannelByID}