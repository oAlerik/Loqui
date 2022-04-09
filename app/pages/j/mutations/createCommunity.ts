import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateCommunity = z.object({
  communityName: z.string(),
})

export default resolver.pipe(resolver.zod(CreateCommunity), async ({ communityName }) => {
  const c = await db.community.create({
    data: {
      name: communityName,
      title: communityName,
      picture:
        "https://cdn.discordapp.com/attachments/361518030657814541/961389637606211614/unknown.png",
    },
  })

  if (!c) throw new NotFoundError() // Should be bad request?
  return c
})
