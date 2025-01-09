import fp from "fastify-plugin";
import level, { FastifyLeveldbOptions } from "@fastify/leveldb";

export default fp<FastifyLeveldbOptions>(async (fastify, options) => {
    fastify.register(level, {
        path: "./db",
        name: "listsdb",
    });
});