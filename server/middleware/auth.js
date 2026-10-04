const jwt = require("jsonwebtoken");

const projectId = process.env.FIREBASE_PROJECT_ID;
const issuer = `https://securetoken.google.com/${projectId}`;
const certificatesUrl = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";
let certificates;
let certificatesExpiresAt = 0;

const getCertificates = async (forceRefresh = false) => {
  if (!forceRefresh && certificates && Date.now() < certificatesExpiresAt) {
    return certificates;
  }

  const response = await fetch(certificatesUrl);
  if (!response.ok) throw new Error("Unable to fetch Firebase signing certificates");
  certificates = await response.json();
  const cacheControl = response.headers.get("cache-control") || "";
  const maxAge = Number(cacheControl.match(/max-age=(\d+)/)?.[1] || 3600);
  certificatesExpiresAt = Date.now() + maxAge * 1000;
  return certificates;
};

const getSigningKey = async (header, callback) => {
  try {
    let currentCertificates = await getCertificates();
    let certificate = currentCertificates[header.kid];
    if (!certificate) {
      currentCertificates = await getCertificates(true);
      certificate = currentCertificates[header.kid];
    }
    if (!certificate) throw new Error("Unknown Firebase signing key");
    callback(null, certificate);
  } catch (error) {
    callback(error);
  }
};

const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    req.user = await new Promise((resolve, reject) => {
      jwt.verify(
        header.split(" ")[1],
        getSigningKey,
        {
          algorithms: ["RS256"],
          audience: projectId,
          issuer,
        },
        (error, decoded) => (error ? reject(error) : resolve(decoded)),
      );
    });
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
