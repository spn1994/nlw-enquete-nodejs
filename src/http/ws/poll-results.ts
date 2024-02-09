import { FastifyInstance } from "fastify";
import { voting } from "../../utils/voting-pub-sub";
import z from "zod";

export async function pollResults(app: FastifyInstance) {
  app.get('/polls/:pollsId/results', { websocket:true }, (connection, request,) => {
    const getPollParams = z.object({
      //obrigatorio uuid
      pollId: z.string().uuid(),      
    })

    const { pollId } = getPollParams.parse(request.params)
    voting.subscribe(pollId, (message) => {
      connection.socket.send(JSON.stringify(message))
    })// Inscrever apenas nas mensagens postadas no canal com a id daquela enquete (:pollId)      
  })
}

//Pub/sub - Publish(eventos) que precisam geral efeito colateral

//id 1 só vai ser vista pelas canais q assinaram 1