// Simple implmentation of token with environment variable
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    throw new Error("Not Authenticated");
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    throw new Error("Not Authenticated");
  }
  if (token != process.env.TOKEN) {
    throw new Error("Not Authenticated");
  }
  next();
};
