const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

let todos = [];

app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.post('/add', (req, res) => {
  const { task, priority } = req.body;
  if (!task.trim()) {
    return res.send('<script>alert("Please enter a task"); window.location.href="/";</script>');
  }
  todos.push({ task, priority });
  res.redirect('/');
});

app.post('/edit', (req, res) => {
  const { index, task, priority } = req.body;
  todos[index] = { task, priority };
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  todos.splice(req.body.index, 1);
  res.redirect('/');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
