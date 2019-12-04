import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"))
//모든 타입은 해당 위치에 그래프큐엘에서 읽어 온다는 뜻
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"))
//모든 리졸버를 해당 위치에서 읽어온다는뜻
const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;