import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        me: async (_, __, { request, isAuthenticated }) => {
            //여기서 _ <- 이것을 console.log(_)로 호출하면 undefined라고 뜬다. 즉 먼저 정의된 리졸버가 없기때문에 parent자체가 정의될 수 없는 것이다.
            isAuthenticated(request);
            const { user } = request;
            console.log(user);
            return await prisma.user({ id: user.id });

            // 2020.01.14
            // const userProfile = await prisma.user({id:user.id});
            // const posts = await prisma.user({id:user.id}).posts();

            //fragment를 써서 쿼리를 날리는 것보다 graphql에 정의를 통해서 하나의 쿼리안에 여러가지의 속성값을 추가해서 만드는게 더욱더 효율적이고 가독성이 좋다
            //return prisma.user({id:user.id}).$fragment(USER_FRAGMENT);

            // 2020.01.14
            // return {
            //     user: userProfile, //만약에 userProfile 대신에 null을 넣을 경우 하위에 fullName을 호출하는 리졸버를 만들어서 parent를 호출하면 null 이기 때문에 hit 하지도 않는다.
            //     posts
            // }
        }
    }
    // ,
    //parants요소는 해당 리졸버의 call하는 상위의 리졸버를 준다 즉 부모 개념이랑 비슷함.  --> 여기서는 fullName 리졸버의 부모인 User가 바로 parent가 된다.
    //그리고 여기서 User란 위의 user: userProfile이 된다. 먼저 정의된 리졸버를 받아온다.
    // User: {
    //     fullName: (parent) => {
    //         return `${parent.firstName} ${parent.lastName}`;
    //     }
    // }
};