// Authentication Middleware – Part 1 (Basic Protection)
/*
1. Import fromNodeHeaders from better-auth/node

2. Create a protected route example:

import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth"; // Your Better Auth instance

app.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
	return res.json(session);
});
This route checks for a valid session and returns the authenticated user's session data.
*/
