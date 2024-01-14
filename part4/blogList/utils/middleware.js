const logger = require("./logger");
const jwt = require("jsonwebtoken");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  }

  logger.error(error.message);
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("Authorization");

  try {
    if (authorization && authorization.startsWith("Bearer ")) {
      // Extract the token and set it in the request object
      request.token = authorization.replace("Bearer ", "");
    }
  } catch (error) {
    // Handle the error, e.g., log it
    console.error("Error extracting JWT:", error.message);
    // Send an error response
    response.status(401).json({ error: "Invalid token" });
    return; // Stop the middleware chain
  }

  // Continue to the next middleware or route handler
  next();
};

const tokenValidator = (request, response, next) => {
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "token missing" });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token" });
  }
  next();
};
const userExtractor = (request, response, next) => {
  try {
    if (request.token) {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      request.user = decodedToken;
    }
  } catch (error) {
    console.error("Error extracting user:", error.message);
    // You might want to handle the error, e.g., log it
  }

  // Continue to the next middleware or route handler
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  tokenValidator,
  userExtractor,
};
