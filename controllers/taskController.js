const express = require("express");

const prisma = require("../prisma/prisma");

const getTask = async (req, res) => {
  try {
    const id = req.params.taskId;
    const task = await prisma.task.findUnique({ where: { id: id } });
    return res.status(200).json({ data: task });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" }); //maybe add error handdler middleware
  }
};

const getTasks = async (req, res) => {
  try {
    const task = await prisma.task.findMany({ where: { userId: req.user.id } });
    return res.status(200).json({ data: task });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const postTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body; //maybe status is set on create

    const task = await prisma.task.create({
      data: {
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate,
      },
    });

    return res.status(201).json({ data: task });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const patchTask = async (req, res) => {};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.taskId;

    const task = await prisma.task.delete({ where: { id: id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getTask, getTasks, postTask, patchTask, deleteTask };
