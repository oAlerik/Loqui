import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetCommunityPosts = z.object({
  communityId: z.string(),
})

export default resolver.pipe(resolver.zod(GetCommunityPosts), async ({ communityId }) => {
  const c = await db.community.findUnique({
    where: {
      id: communityId,
    },
    select: {
      posts: {
        select: {
          id: true,
          authorId: true,
          title: true,
          content: true,
          comments: true,
          votes: true,
          community: true,
          createdAt: true,
        },
      },
    },
  })

  if (!c) throw new NotFoundError()

  return c.posts
})
