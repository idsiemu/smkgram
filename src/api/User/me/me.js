import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        me: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const userProfile = await prisma.user({id:user.id});
            const posts = await prisma.user({id:user.id}).posts();

            //fragment를 써서 쿼리를 날리는 것보다 graphql에 정의를 통해서 하나의 쿼리안에 여러가지의 속성값을 추가해서 만드는게 더욱더 효율적이고 가독성이 좋다
            //return prisma.user({id:user.id}).$fragment(USER_FRAGMENT);
            return {
                user: userProfile,
                posts
            }
        }
    }
};