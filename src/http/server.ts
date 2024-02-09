import fastify from "fastify";
import cookie from '@fastify/cookie'
import fastifyWebsocket from "@fastify/websocket";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import { pollResults } from "./ws/poll-results";

const app = fastify()

//peguei do fasitfy
app.register(cookie, {
  secret: "polls-app-nlw", // for cookies signature
  hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  })

app.register(fastifyWebsocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.register(pollResults)


app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!")
})
