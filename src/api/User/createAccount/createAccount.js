import { prisma } from "../../../../generated/prisma-client"
export default {
    Mutation: {
        createAccount: async(_, args)=>{
            const {name, email, firstName = "", lastName = "", bio = ""} = args;
            const exists = await prisma.$exists.user({
                OR:[
                    {
                        name
                    },
                    {email}
                ]
            });
            if(exists){
                throw Error("This name / email already taken");
            }
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