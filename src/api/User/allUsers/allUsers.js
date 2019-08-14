import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        allUsers: () => prisma.users()
        //이렇게만해도 prisma가 자동으로 리턴해줌
    }
}