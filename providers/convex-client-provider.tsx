"use client";
import { ClerkProvider, SignInButton, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
    AuthLoading,
    Authenticated,
    ConvexReactClient,
    Unauthenticated
} from "convex/react";
import { Loading } from "@/components/auth/loading";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);


export const ConvexClientProvider = ({ children }: {children : React.ReactNode}) => {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <Authenticated>{children}</Authenticated>
            <AuthLoading><Loading/></AuthLoading>
            <Unauthenticated><SignInButton/></Unauthenticated>
        {/* you can keep just {children} here if you don't want to show anything while loading */}
        </ConvexProviderWithClerk>
      </ClerkProvider>
    )
}
