import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const LeaveCommunity = z.object({
  userId: z.string(),
  communityId: z.string(),
})

export default resolver.pipe(resolver.zod(LeaveCommunity), async ({ userId, communityId }) => {
  // Find full User object
  const u = await db.user.findUnique({
    where: {
      id: userId,
    },
  })

  // Find members array from Community
  const c = await db.community.findFirst({
    where: {
      id: communityId,
    },
    select: {
      members: true,
    },
  })

  if (c && u) {
    const uIndex = c?.members.findIndex((user) => user.id === u.id)
    c?.members.splice(uIndex, 1)
    const userIdArr = c.members.map((user) => {
      return { id: user.id }
    })
    const newUserArr = [...userIdArr]

    const res = await db.community.update({
      where: {
        id: communityId,
      },
      data: {
        members: {
          set: newUserArr,
        },
      },
    })

    if (!res) throw new NotFoundError()
    return res
  }
})
