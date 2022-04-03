import db from "db"

type CreatePost = {
  title: string
  content: string
  authorId: number
}

export default function createPost(post: CreatePost) {
  const { title, content, authorId } = post
  return db.post.create({
    data: {
      title,
      content,
      authorId,
    },
  })
}
