require("dotenv").config()
//dotenv 불러옴

import { GraphQLServer} from "graphql-yoga";
//grapql-yoga에서 graphQLServer 불러옴
//노드가 import 를 인식할 수 있게 .babelrc에 프리셋을 설정해준다.
//프리셋이 무엇인지는 공부해야함

const PORT = process.env.PORT || 4000;
//env에서 불러옴   설정값은 env에 앞으로 세팅하도록 하자

const typeDefs = `
    type Query{
        hello: String!
    }
`;
//type 정의와 resolver 들을 여기 적는듯?


const resolvers = {
    Query:{
        hello: () => "HI"
    }
};

const server = new GraphQLServer({typeDefs, resolvers});
//서버생성  생성하면서 type, resolver 등록 해당것들을 아마 사용하겠지

server.start({port: PORT}, () => console.log(`Server running on http://localhost:${PORT}`));
//port 는 dotenv config 에서 .env를 통해서 port를 읽어 오게 할 수 있다.
// () => 콜백을 뜻한다.