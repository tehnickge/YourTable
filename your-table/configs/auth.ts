import type { AuthOptions } from 'next-auth'
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google"

export const authOptions : AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          }),
          GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
          }),
          CredentialsProvider({
            name: "Your-Table",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Enter your name"
                },
                password: { 
                    label: "Password",
                    type: "password",
                    placeholder: "enter your password"
                },
            },
            async authorize(credentials, req) {
                //tut budet vzaimodestvie s bd 
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "1", name: "tehnick", password: "123"}
                if (credentials?.username === user.name && credentials?.password === user.password) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                  } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                  }
            }
          })
      ]
}

