import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

const clientId = process.env.SPOTIFY_CLIENT_ID || "";
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";
/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
const refreshAccessToken = async (token) => {
  try {
    const url =
      'https://accounts.spotify.com/api/token?' +
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken
      })

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
      },
      method: 'POST'
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user
        }
      }
      
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
          return token
        }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    }
  }
}

export default NextAuth(authOptions);
