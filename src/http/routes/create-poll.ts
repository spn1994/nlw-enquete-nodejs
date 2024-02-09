import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { FastifyInstance } from "fastify";

export async function createPoll(app: FastifyInstance) {
  //corpo da quisição q eu acesso
app.post('/polls', async (request, reply) => {
  const createPollBody = z.object({
    title: z.string(),
    // tbm recebo opçes
    options: z.array(z.string()),
  })

  const { title, options } = createPollBody.parse(request.body)

  //
  const poll = await prisma.poll.create({
    data: {
      title,
      options: {
        createMany: {
          data: options.map(option => {
          return { title: option }
        }),
      }
    },
    }
  })
//sempre devolver  status resposta
  return reply.status(201).send({ pollId: poll.id })
})
}