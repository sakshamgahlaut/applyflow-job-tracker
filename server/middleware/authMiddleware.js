const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    let token;

    // token Authorization header se nikaalna
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // agar token nahi mila
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // req ke andar user id set kar di
    req.user = decoded.id;

    // next middleware / controller ko jaane do
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = protect;
