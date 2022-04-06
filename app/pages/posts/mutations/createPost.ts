import db from "db"

type CreatePost = {
  title: string
  content: string
  authorId: string
}

export default function createPost(post: CreatePost) {
  const { title, content, authorId } = post
  return db.post.create({
    data: {
      title,
      content,
      authorId,
      votes: 0,
      community: "Comedy",
      createdAt: new Date(),
    },
  })
}
