import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: (parent) => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try{
                return prisma.$exists.user({
                    //AND연산을 해서 ture false를 반환하는데 여기서의 조건은 내가 해당 유저를 팔라우 하고있냐?를 판별하는 것이다.
                    //그래서 user.id는 나를 뜻하고 parentId 는 해당 프로필을 보고하자는 대상을 말한다.
                    AND: [{id:user.id}, {following_some: {id: parentId}}]
                });
            }catch(error){
                console.log(error);
                return false;
            }
        },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    }
};