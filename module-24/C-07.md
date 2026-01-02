// Advanced Authentication Configuration & Best Practices

/*
1. Email Verification Auto Sign-In
To enhance user experience, you can configure Better Auth to automatically sign in users after they verify their email addresses. This can be done by setting the autoSignInAfterVerification option to true in the emailVerification configuration.
 emailVerification: {
        autoSignInAfterVerification: true
    }



2. Social Authentication Providers
Add social authentication providers to your Better Auth configuration to allow users to sign in using their social media accounts. Here's an example of how to set up Google as a social provider:

socialProviders: {
    google: {
        prompt: "select_account consent", 
         accessType: "offline", 
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
}
    */
