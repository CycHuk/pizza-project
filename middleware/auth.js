const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma/prisma-client");

const auth = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Токен отсутствует" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    const secret = process.env.JWT_SECRET;

    token = jwt.sign({ id: user.id }, secret, { expiresIn: "30m" });

    res.cookie("token", token, {
      httpOnly: true,
    });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ massage: "Не авторизован" });
  }
};

module.exports = {
  auth,
};
