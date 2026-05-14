const admin = require("firebase-admin");

const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    req.user = await admin.auth().verifyIdToken(header.split(" ")[1]);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

const requireAdmin = (req, res, next) => {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (req.user?.email?.toLowerCase() !== adminEmail) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

module.exports = { verifyToken, requireAdmin };
