import prisma from "../db/prisma.js"

const verifyUser = async (chatID) => {
    const users = await prisma.user.findUnique({
        where: {
            id: chatID
        }
    });

    if (!users){
        const save = await prisma.user.create({
            data:{
                id: chatID
            }
        })
        return save
        
    }
    return users
}

export default verifyUser