import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent",
                    response_type: "code",
                }
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,

            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent",
                    response_type: "code",
                    scope: "email public_profile",
                }
            },
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name || profile.first_name + " " + profile.last_name,
                    email: profile.email,
                    image: profile.picture?.data?.url || "/images/user.svg",
                };
            },
        }),
    ]
})