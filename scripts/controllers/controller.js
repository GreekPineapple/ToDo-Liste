const db = require("../models");
const Todo = db.todos;

// Create and Save a new ToDo
exports.create = async(req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Content can not be empty!" });
    }
    const newTodo = await Todo.create(req.body);
    res.json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } 
}; 

// Retrieve all ToDos from the database.
exports.findAll = async(req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}; 

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Todo by the id in the request
  exports.update = async (req, res) => {
    const id = req.params.id;
    console.log("Controller: Updating Todo with ID:", id);
  
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(updatedTodo);
    } catch (error) {
      console.error("Update Error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

// Delete a ToDO with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Todo.findByIdAndDelete(id);
    if (result) {
      res.json({ message: "Todo deleted successfully" });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};