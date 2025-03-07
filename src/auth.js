import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import getUserByEmail from "./services/supabase/selectUsuario";
import { verifyPassword } from "./utils/passwordHash";


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
            },
            profile(profile) {
                return {
                    id: profile.email,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    };
                },
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
                    id: profile.email,
                    name: profile.name || profile.first_name + " " + profile.last_name,
                    email: profile.email,
                    image: profile.picture?.data?.url || "/icon.svg",
                };
            },
        }),
        CredentialsProvider({
            async authorize(credentials) {
                if (credentials == null) return null;

                try {
                    const user = await getUserByEmail(credentials.email);
                    if (!user) return null;
                    const isMatch = await verifyPassword(credentials?.senha, user.senha);
                    if (!isMatch) return null;

                    return {
                        id: user.id,
                        name: user.nome,
                        email: user.email,
                        image: user.foto || "/icon.svg",
                    }

                } catch (error) {
                    throw new Error(error.message);
                }
            }
        }),
    ],
})