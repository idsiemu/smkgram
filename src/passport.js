import dotenv  from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname, ".env")});

import passport from "passport";
import JwtStratgy from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest: JwtStratgy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secret: process.env.JWT_SECRET
};

//여기서 done은 사용자를 찾을 때 호출하는 함수임.
const verifyUser = (payload, done) => {
    try{
        const user = await prisma.user({id: payload.id});
        if(user != null){
            return done(null, user);
        }else {
            return done(null, false);
        }
    } catch {
        return done(error, false);
    }
};

passport.use(new JwtStratgy(jwtOptions, verifyUser))