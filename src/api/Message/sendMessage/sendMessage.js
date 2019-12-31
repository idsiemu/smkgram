import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
    Mutation :{
        sendMessage: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;
            //roomId 가 없으면 방을 생성한다 -- 메시지를 해당 toId로 보낼 때 방이 있는지 판별하고 있으면 roomId를 생성하는 방식을 구현해야함.
            //roomId 가 있을 경우 해당 방이 id를 가져온다.
            if(roomId === undefined){
                if(user.id !== toId){
                    room = await prisma.createRoom({
                        participants:
                        {
                            connect: [{id: toId},{id: user.id}]
                        }
                    }).$fragment(ROOM_FRAGMENT);
                }
            } else {
                room = await prisma.room({id: roomId}).$fragment(ROOM_FRAGMENT);
            }
            if(!room) {
                throw Error("Room not found");
            }
            //request 의 user 아이디 말고 다른 아이디를 가쟈와서 누구에게 보낼지 판별함.
            const getTo = room.participants.filter(participant => participant.id !== user.id)[0];
            return prisma.createMessage({
                text:message,
                from: {
                    connect: {id: user.id}
                },
                to: {
                    connect: {
                        id: roomId ? getTo.id : toId
                    }
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            })
        }
    }
}