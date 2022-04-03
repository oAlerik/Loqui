import db from "db"

export default function getAllPosts() {
  return db.post.findMany()
}
