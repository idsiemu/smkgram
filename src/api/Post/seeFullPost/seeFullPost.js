import { prisma } from "../../../../generated/prisma-client";
//import { COMMENT_FRAGMENT, FULL_POST_FRAGMENT } from "../../../fragments";
//computed.js => Post.js 를 통해서 fragment를 더 이상 사용하지 않도록한다.

export default {
    Query:{
        seeFullPost: async(_,args) => {
            const { id } = args;
            return prisma.post({id});
            //return prisma.post({id}).$fragment(FULL_POST_FRAGMENT);

            // 리팩토링 fragments.js 에 정의를 통해서 한꺼번에 처리함.
            // const post = await prisma.post({id});
            // const comments = await prisma.post({id}).comments().$fragment(COMMENT_FRAGMENT);
            // const files = await prisma.post({id}).files();
            // const user = await prisma.post({id}).user();


            // 리팩토링 computed.js 에 likeCount 정의해서 씀
            // const likeCount = await prisma.likesConnection({
            //     where: {post:{id}}
            // })
            // .aggregate()
            // .count();

            
            // return {
            //     post,
            //     comments,
            //     files,
            //     user
            // };
        }
    }
}