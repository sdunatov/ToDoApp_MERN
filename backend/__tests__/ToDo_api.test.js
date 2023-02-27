const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const ToDo = require('../models/todoModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('ToDo', () => {
  test('Sprema to do u bazu.', async () => {
    const todoData = {
      name: 'Test todo',
      completed: false,
    };

    const todo = new ToDo(todoData);
    const savedTodo = await todo.save();

    expect(savedTodo._id).toBeDefined();
    expect(savedTodo.name).toBe(todoData.name);
    expect(savedTodo.completed).toBe(todoData.completed);
  });


});

test('Ažurira to do u bazi.', async () => {
  const todoData = {
    name: 'Test todo',
    completed: false,
  };

  const todo = new ToDo(todoData);
  const savedTodo = await todo.save();

  const updatedTodoData = {
    name: 'Updated todo',
    completed: true,
  };

  const updatedTodo = await ToDo.findByIdAndUpdate(
    savedTodo._id,
    updatedTodoData,
    { new: true }
  );

  expect(updatedTodo).toBeDefined();
  expect(updatedTodo.name).toBe(updatedTodoData.name);
  expect(updatedTodo.completed).toBe(updatedTodoData.completed);
});

test('Briše to do iz baze.', async () => {
  const todoData = {
    name: 'Test todo',
    completed: false,
  };

  const todo = new ToDo(todoData);
  const savedTodo = await todo.save();

  const deletedTodo = await ToDo.findByIdAndDelete(savedTodo._id);

  expect(deletedTodo).toBeDefined();
  expect(deletedTodo._id.toString()).toBe(savedTodo._id.toString());
});
