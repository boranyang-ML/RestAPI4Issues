const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// hard code initial issues
let issues = [
  { id: 1, title: "First Issue", description: "This is the first issue" },
  { id: 2, title: "Second Issue", description: "This is the second issue" }
];

// Create
app.post('/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.id = issues.length + 1;
  issues.push(newIssue);
  console.log('Created:', newIssue);
  res.status(201).json(newIssue);
});

// Read
app.get('/issues/:id', (req, res) => {
  const issue = issues.find(i => i.id === parseInt(req.params.id));
  if (issue) {
    res.json(issue);
  } else {
    res.status(404).json({ error: 'Issue not found' });
  }
});

// Update
app.put('/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedIssue = req.body;
  const index = issues.findIndex(i => i.id === id);
  if (index !== -1) {
    issues[index] = { ...issues[index], ...updatedIssue };
    console.log('Updated:', issues[index]);
    res.json(issues[index]);
  } else {
    res.status(404).json({ error: 'Issue not found' });
  }
});

// Delete
app.delete('/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = issues.findIndex(i => i.id === id);
  if (index !== -1) {
    const deletedIssue = issues.splice(index, 1)[0];
    console.log('Deleted:', deletedIssue);
    res.json(deletedIssue);
  } else {
    res.status(404).json({ error: 'Issue not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});