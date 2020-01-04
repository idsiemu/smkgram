import { prisma } from "../../../../generated/prisma-client"
export default {
    Mutation: {
        createAccount: async(_, args)=>{
            const {name, email, firstName = "", lastName = "", bio = ""} = args;
            await await prisma.createUser({
                name,
                email,
                firstName,
                lastName,
                bio
            });
            return true;
        }
    }
}