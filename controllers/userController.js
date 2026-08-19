const prisma = require("../prisma/prisma");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await prisma.user.findUnique({ where: { id: id } });
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" }); //maybe add error handdler middleware
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const postUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; //maybe status is set on create

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: hashedPassword,
      },
    });

    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const patchUser = async (req, res) => {};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.userId;

    const user = await prisma.user.delete({ where: { id: id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUser, getUsers, postUser, patchUser, deleteUser };
