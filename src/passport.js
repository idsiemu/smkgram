import dotenv  from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname, ".env")});

import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

//jwt를 가져와서 해석하고 확인하는 작업임.
//여기서 done은 사용자를 찾을 때 호출하는 함수임.
const verifyUser = async (payload, done) => {
    try{
        const user = await prisma.user({id: payload.id});
        if(user !== null){
            return done(null, user);
        }else {
            return done(null, false);
        }
    } catch {
        return done(error, false);
    }
};

//미들웨어함수?? -- req, res, next 를 인자로 받는다.
//passport는 쿠키와 세션작업하기 좋다. 쿠키를 가져오고 만들어주는 모든일을 함.
//이 함수에는 passport에 어떤것도 입력되지 않기를 원한다. 그래서 session: false 옵션을 추가함.
//passport가 함수에 사용자 정보를 전달해줌
export const authenticateJwt = (req, res, next) => passport.authenticate("jwt", {sessions:false}, (error, user) => {
    if(user){
        req.user = user;
    }
    next();
})(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();