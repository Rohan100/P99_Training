// authDecorator.js
// Decorator to add authentication checks

function withAuth(handler) {
  return async function (req, res) {
    try {
      const token = req.headers.authorization;

      // Simple token validation
      if (!token || token !== "Bearer SECRET_TOKEN") {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      // Add user info to request
      req.user = {
        id: 1,
        name: "Rohan",
        role: "admin",
      };

      // Call original handler
      return handler(req, res);

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
}

module.exports = withAuth;