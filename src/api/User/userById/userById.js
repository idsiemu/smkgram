import {prisma} from "../../../../generated/prisma-client"
export default{
    Query:{
        userById: async(_, args) => {
            //첫번째 인자는 아무것도 안받고, 두번째 인자는 args라고 한다는 의미임

            const { id } = args;
            //args에 id를 받는다는 뜻
            return await prisma.user({ id }).$fragment();
        }
    }
}