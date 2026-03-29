// ============================================
//  Campus Connect – Backend Server (server.js)
//  Tech: Node.js + Express.js
//  Data: JSON files (no real database)
// ============================================

const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// ── Helper: Read JSON file ──────────────────
function readJSON(filename) {
  const filepath = path.join(__dirname, filename);
  const data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data);
}

// ── Helper: Write JSON file ─────────────────
function writeJSON(filename, data) {
  const filepath = path.join(__dirname, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

// ── ROOT route ──────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

// ────────────────────────────────────────────
//  STUDENTS API
// ────────────────────────────────────────────

app.get('/api/students', (req, res) => {
  const students = readJSON('students.json');
  res.json({ success: true, count: students.length, data: students });
});

app.get('/api/students/:id', (req, res) => {
  const students = readJSON('students.json');
  const student  = students.find(s => s.id === req.params.id);
  if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
  res.json({ success: true, data: student });
});

app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;
  if (role === 'admin') {
    if (email === 'admin@campus.edu' && password === 'admin123') {
      return res.json({ success: true, role: 'admin', name: 'Dr. Priya R.', message: 'Admin login success' });
    }
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }
  const students = readJSON('students.json');
  const student  = students.find(s => s.email === email && s.password === password);
  if (!student) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  res.json({ success: true, role: 'student', name: student.name, id: student.id, data: student });
});

// ────────────────────────────────────────────
//  EVENTS API
// ────────────────────────────────────────────

app.get('/api/events', (req, res) => {
  const events = readJSON('events.json');
  const { type } = req.query;
  const filtered = type ? events.filter(e => e.type === type) : events;
  res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/events/:id', (req, res) => {
  const events = readJSON('events.json');
  const event  = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
  res.json({ success: true, data: event });
});

app.post('/api/events', (req, res) => {
  const events   = readJSON('events.json');
  const newEvent = { id: Date.now(), ...req.body };
  events.push(newEvent);
  writeJSON('events.json', events);
  res.json({ success: true, message: 'Event created', data: newEvent });
});

app.delete('/api/events/:id', (req, res) => {
  let events   = readJSON('events.json');
  const before = events.length;
  events = events.filter(e => e.id !== parseInt(req.params.id));
  if (events.length === before) return res.status(404).json({ success: false, message: 'Event not found' });
  writeJSON('events.json', events);
  res.json({ success: true, message: 'Event deleted' });
});

// ────────────────────────────────────────────
//  NOTES API
// ────────────────────────────────────────────

app.get('/api/notes', (req, res) => {
  const notes = readJSON('notes.json');
  const { year, department } = req.query;
  let filtered = notes;
  if (year)       filtered = filtered.filter(n => n.year === parseInt(year));
  if (department) filtered = filtered.filter(n => n.department.toLowerCase() === department.toLowerCase());
  res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/notes/:id', (req, res) => {
  const notes = readJSON('notes.json');
  const note  = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, data: note });
});

app.post('/api/notes', (req, res) => {
  const notes   = readJSON('notes.json');
  const newNote = { id: Date.now(), ...req.body };
  notes.push(newNote);
  writeJSON('notes.json', notes);
  res.json({ success: true, message: 'Resource added', data: newNote });
});

app.delete('/api/notes/:id', (req, res) => {
  let notes    = readJSON('notes.json');
  const before = notes.length;
  notes = notes.filter(n => n.id !== parseInt(req.params.id));
  if (notes.length === before) return res.status(404).json({ success: false, message: 'Not found' });
  writeJSON('notes.json', notes);
  res.json({ success: true, message: 'Deleted' });
});

// ────────────────────────────────────────────
//  ANNOUNCEMENTS API
// ────────────────────────────────────────────

let announcements = [
  { id: 1, title: 'IA Marks Uploaded – DSA', message: 'Internal Assessment marks uploaded.', category: 'Exam', audience: 'All Students', createdAt: new Date().toISOString() },
  { id: 2, title: 'Semester 7 Hall Ticket', message: 'Hall tickets available from April 28 at admin office.', category: 'Exam', audience: 'Final Year', createdAt: new Date().toISOString() },
];

app.get('/api/announcements', (req, res) => {
  res.json({ success: true, count: announcements.length, data: announcements });
});

app.post('/api/announcements', (req, res) => {
  const ann = { id: Date.now(), ...req.body, createdAt: new Date().toISOString() };
  announcements.push(ann);
  res.json({ success: true, message: 'Announcement posted', data: ann });
});

// ────────────────────────────────────────────
//  HEALTH CHECK
// ────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Campus Connect API is running!', timestamp: new Date().toISOString() });
});

// ────────────────────────────────────────────
//  START SERVER
// ────────────────────────────────────────────

app.listen(PORT, () => {
  console.log('');
  console.log('  ✅ Campus Connect Server Started!');
  console.log(`  🌐 Open: http://localhost:${PORT}`);
  console.log(`  🔗 API:  http://localhost:${PORT}/api/events`);
  console.log('');
});