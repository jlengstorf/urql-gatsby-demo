import React, { useState } from "react"
import { useMutation } from "urql"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [{ fetching, data, error }, createPost] = useMutation(`
    mutation ($title: String! $url: String!) {
      createPost(title: $title, url: $url) {
        id
        title
        url
        votes
      }
    }
  `)

  const handleSubmit = event => {
    event.preventDefault()

    createPost({
      title,
      url,
    }).then(({ error }) => {
      if (!error) {
        setTitle("")
        setUrl("")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <label htmlFor="url">URL</label>
      <input
        id="url"
        name="url"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <button disabled={fetching}>{fetching ? "Saving..." : "Save"}</button>
    </form>
  )
}

export default CreatePost
