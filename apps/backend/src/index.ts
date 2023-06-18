import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import express from "express";
import http from "http";
import morgan from "morgan";
import db from "./modules/db";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const app = express();
const httpServer = http.createServer(app);
app.use(morgan("dev"));

const port = Number(process.env.PORT ?? 8080);

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startServer = async () => {
    await server.start();
    app.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server)
    );

    await new Promise<void>((resolve) =>
        httpServer.listen({ host: "0.0.0.0", port: port }, resolve)
    );
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
};

startServer();

app.get("/", async (req, res) => {
    const submissions = await db.submission.findMany();
    res.json(submissions);
});
