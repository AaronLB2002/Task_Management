const prisma = require("../prisma/prisma");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordValid) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .send({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      secure: false,
    })
    .send({ success: true });
};

module.exports = { login, logout };
