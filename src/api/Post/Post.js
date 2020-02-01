import { prisma } from "../../../generated/prisma-client";

export default {
    Post: {
        //files, comments, user 해당 부분으로 추가함으로써 seeFullPost fragment를 더이상 사용하지않음.
        files: ({id}) => prisma.post({id}).files(),
        comments: ({id}) => prisma.post({id}).comments(),
        user: ({id}) => prisma.post({id}).user(),
        isLiked: async(parent, _, { request }) => {
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.like({
                AND:[
                        {
                            user: {
                                id: user.id
                            }
                        },
                        {
                            post: {
                                id
                            }
                        }
                ]
            });
        },
        likeCount: parent => prisma.likesConnection({
            where: {post:{id: parent.id}}
        })
        .aggregate()
        .count(),
        commentCount: parent => prisma.commentsConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count()
    }
}