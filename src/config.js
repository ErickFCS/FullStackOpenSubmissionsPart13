import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const URI = process.env.URI || "NO URI";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";