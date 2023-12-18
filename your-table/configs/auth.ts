import type { AuthOptions, User } from 'next-auth'
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
                    placeholder: "Enter your name",
                    required: true
                },
                password: { 
                    label: "Password",
                    type: "password",
                    placeholder: "enter your password",
                    required: true
                },
            },
            async authorize(credentials, req) {
                const userAuthData : any = await fetch(`http://localhost:3000/api/users?username=${credentials?.username}&password=${credentials?.password}`);
                const user = await userAuthData.json()
                //tut budet vzaimodestvie s bd 
                // Add logic here to look up the user from the credentials supplied
                if (
                  credentials?.username === user?.name && 
                  credentials?.password === user?.password ) {
                    // Any object returned will be saved in `user` property of the JWT
                    const resp = {
                      id :user?.id,
                      name: user?.name,
                      password: user?.password,
                      type: user?.type
                    }
                    return resp;
                  } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                  }
            },
          })
      ],
      callbacks: {
        jwt: ( { token, user } ) => {
          if(user) {
            token.id = user.id;
            token.type = user.type;
          }
          return token;
        },
        session: ({ session, token }) => {
          if(token) {
            session.user.id = token.id;
            session.user.type = token.type;
          }
          return session;
        } 
      },
      secret: process.env.NEXTAUTH_SECRET,
      jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        encryption: true,
      },
}

