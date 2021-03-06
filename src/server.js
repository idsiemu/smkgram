import "./env";

import { GraphQLServer} from "graphql-yoga";
//grapql-yoga에서 graphQLServer 불러옴
//노드가 import 를 인식할 수 있게 .babelrc에 프리셋을 설정해준다.
//프리셋이 무엇인지는 공부해야함
import logger from "morgan";
import schema from "./schema";

//jwt TOKEN 생성을 위해 import해야함.
//import passport from "passport";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

//메일 가는지 테스트용
//import {sendSecretMail} from "./utils";
// sendSecretMail("idsiemu@gmail.com","123");

const PORT = process.env.PORT || 4000;
//env에서 불러옴   설정값은 env에 앞으로 세팅하도록 하자

// const typeDefs = `
//     type Query{
//         hello: String!      -----------> schema.js를 통해서 한꺼번에 생성관리 할 수 있다.
//     }
// `;
//type 정의와 resolver 들을 여기 적는듯?


// const resolvers = {
//     Query:{
//         hello: () => "HI"   -----------> schema.js를 통해서 한꺼번에 생성관리 할 수 있다.
//     }
// };

const server = new GraphQLServer({
    schema, 
    context: ({request}) => ({request, isAuthenticated})
});
//context는 resolver 사이에 정보를 공유할 때 사용
//서버생성  생성하면서 type, resolver 등록 해당것들을 아마 사용하겠지
//GraphQLServer에는 express 서버가 내장되어있음 그래서 server.express 라고하면 express 서버에 접근가능
server.express.use(logger("dev"));

//jwt TOKEN 생성
//server.express.use(passport.Authenticator("jwt"));

server.express.use(authenticateJwt);

server.start({port: PORT}, () => console.log(`Server running on http://localhost:${PORT}`));
//port 는 dotenv config 에서 .env를 통해서 port를 읽어 오게 할 수 있다.
// () => 콜백을 뜻한다.