import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import supabase from "./lib/supabase/client";
import { SupabaseAdapter } from "@auth/supabase-adapter";

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
    ],
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    }),
    callbacks: {
        async session(params) {
          // Adiciona informações do usuário à sessão
          const { data } = await supabase
            .from('users')
            .select('*')
            .eq('id', params.user.id)
            .single();
    
          if (data) {
            params.session.user = {
              ...params.session.user,
              ...data,
            };
          }
    
          return params.session;
        },
      },
})