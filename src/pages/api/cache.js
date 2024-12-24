// pages/api/cache.js

export default function handler(req, res) {
  // Set the cache control header
  res.setHeader("Cache-Control", "s-maxage=10");

  // Send a response back to the client
  res.status(200).json({ message: "Cache-Control header set successfully" });
}
