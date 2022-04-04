import db from "db"

export default function getAllPosts() {
  return db.post.findMany({
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
  })
}
