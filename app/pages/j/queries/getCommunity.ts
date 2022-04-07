import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetCommunity = z.object({ name: z.string() })

export default resolver.pipe(resolver.zod(GetCommunity), async ({ name }) => {
  // Find Community
  const c = await db.community.findFirst({
    where: {
      name,
    },
    select: {
      id: true,
      name: true,
      title: true,
      description: true,
      banner: true,
      picture: true,
      posts: true,
      members: true,
      createdAt: true,
    },
  })

  if (!c) throw new NotFoundError()
  return c
})
