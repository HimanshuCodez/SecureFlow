import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  const token =
    req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Token not found' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: 'Not Authorized. Login again.',
      });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res
      .status(401)
      .json({ success: false, message: 'Invalid or expired token' });
  }
};

export default userAuth;
