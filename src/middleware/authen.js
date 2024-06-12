


// Middleware to check if the user is an admin
export const isAdmin =(req, res, next) => {
    if (req.user && req.user.isAdmin === true) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
    }
  }

