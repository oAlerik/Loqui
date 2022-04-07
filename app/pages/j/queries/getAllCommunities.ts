import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetAllCommunities = z.object({
  communities: z.array(z.object({ id: z.string(), name: z.string() })),
})

export default resolver.pipe(resolver.zod(GetAllCommunities), async () => {
  const c = await db.community.findMany({ take: 5 })

  if (!c) throw new NotFoundError()

  return c
})
