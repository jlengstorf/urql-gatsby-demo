import React from "react"
import { createClient, Provider, dedupExchange, fetchExchange } from "urql"
import { cacheExchange } from "@urql/exchange-graphcache"
import fetch from "isomorphic-fetch"
import gql from "graphql-tag"
import App from "../component/app"

const client = createClient({
  url: "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn",
  fetch,
  exchanges: [
    dedupExchange, // dedupe first so we don’t do unnecessary work
    cacheExchange({
      optimistic: {
        updatePost: (variables, _cache, _info) => {
          console.log(variables)
          return {
            __typename: "Post",
            id: variables.id,
            votes: variables.votes,
          }
        },
      },
      updates: {
        Mutation: {
          createPost: (result, _args, cache, _info) => {
            cache.updateQuery(
              {
                query: gql`
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
              },
              cacheData => {
                cacheData.allPosts.unshift(result.createPost)

                return cacheData
              }
            )
          },
        },
      },
    }),
    fetchExchange, // async, so it needs to go last
  ],
})

export default () => (
  <Provider value={client}>
    <App />
  </Provider>
)
