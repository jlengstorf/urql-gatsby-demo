import React from "react"
import { useQuery } from "urql"
import CreatePost from "./create-post"
import Upvote from "./upvote"

const App = () => {
  const [{ fetching, data, error }] = useQuery({
    query: `
      {
        allPosts(orderBy: createdAt_DESC, first: 10, skip: 0) {
          id
          title
          votes
          url
          createdAt
        }
      }
    `,
  })

  return fetching ? (
    <p>Loading...</p>
  ) : (
    <>
      <CreatePost />
      <ul>
        {data.allPosts.map(post => (
          <li key={post.id}>
            <a href={post.url}>{post.title}</a> · <Upvote post={post} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
