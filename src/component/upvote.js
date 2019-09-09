import React from "react"
import { useMutation } from "urql"

const Upvote = ({ post }) => {
  const [{ fetching, error }, addUpvote] = useMutation(`
    mutation ($id: ID!, $votes: Int!) {
      updatePost(id: $id, votes: $votes) {
        id
        votes
      }
    }
  `)

  if (error) {
    return <p>Womp womp</p>
  }

  return (
    <>
      ({post.votes} votes){" "}
      <button
        onClick={() => {
          addUpvote({
            id: post.id,
            votes: post.votes + 1,
          })
        }}
        disabled={fetching}
      >
        {fetching ? "saving..." : "upvote"}
      </button>
    </>
  )
}

export default Upvote
