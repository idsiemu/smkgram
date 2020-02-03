import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUser: async (_, args) => {
            const { name } = args;
            const user = await prisma.user({name});
            const posts = await prisma.user({name}).posts();
            return {
                user,
                posts
            }
            //UserProfile graphql 정의를 통해 리펙토링
            //return prisma.user({id});
        }
    }
}