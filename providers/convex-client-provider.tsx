"use client";
import { ClerkProvider, RedirectToSignIn, RedirectToSignUp, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated
} from "convex/react";
import { Loading } from "@/components/auth/loading";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

export const ConvexClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
        <Unauthenticated>
          {/* Use Clerk's RedirectToSignIn or RedirectToSignUp to redirect */}
          <RedirectToSignIn />
          {/* Or RedirectToSignUp if you want to show the sign-up page */}
          {/* <RedirectToSignUp /> */}
        </Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
