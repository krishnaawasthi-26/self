require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'replace-this-in-production';
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'portfolio.json');
const UPLOAD_DIR = path.join(__dirname, 'public', 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({ storage });

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const defaultPortfolio = {
  name: 'Krishna Awasthi',
  title: 'Backend & IoT Engineer',
  location: 'Jaipur, Rajasthan',
  email: 'krishna.Awasthi.CSE@gmail.com',
  phone: '+91 9649722470',
  resumeUrl: '#',
  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/krishnaawasthi/' },
    { label: 'GitHub', url: 'https://github.com/krishnaawasthi_26' },
    { label: 'Codolio', url: 'https://codolio.com/profile/KrishnaAwasthi_26' },
  ],
  about:
    'I build real-time backend and IoT systems with strong focus on API design, reliability, and measurable performance improvements.',
  skills: [
    'Python',
    'FastAPI',
    'MongoDB',
    'MQTT',
    'Java',
    'Spring Boot',
    'MySQL',
    'REST APIs',
  ],
  achievements: [
    'Reduced API latency by 50% during internship projects.',
    'Built a fault-tolerant MQTT pipeline with 99.9% message delivery.',
    'Solved 1300+ DSA problems across coding platforms.',
  ],
  experiences: [
    {
      company: 'Swami Keshvanand Institute of Technology',
      role: 'Backend & IoT Engineering Intern',
      duration: 'Jul 2025 - Aug 2025',
      points: [
        'Developed 12+ FastAPI endpoints for real-time sensor ingestion.',
        'Improved API response time from 400ms to 200ms.',
      ],
    },
  ],
  projects: [
    {
      name: 'LeetCode Progress Tracker & Analytics Dashboard',
      stack: 'Python, FastAPI, MongoDB',
      description: 'Analytics microservice for coding progress with topic-wise insights.',
      github: 'https://github.com/krishnaawasthi-26/backend-leetcode-tracker.git',
      demo: 'https://backend-leetcode-tracker--krishnaasfafav.replit.app/',
    },
    {
      name: 'Smart Agriculture Management System',
      stack: 'Python, FastAPI, MongoDB, MQTT',
      description: 'IoT backend for sensor telemetry ingestion and analytics.',
      github: 'https://github.com/parthCJ/Aarma-be.git',
      demo: '',
    },
  ],
  certificates: [
    {
      name: 'Programming in Java',
      issuer: 'IIT Kharagpur (NPTEL)',
      url: 'https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS57S114740173504421650',
    },
    {
      name: 'CS50: Intro to CS',
      issuer: 'Harvard University',
      url: 'https://cs50.harvard.edu/certificates/20876423-5430-474a-85e8-073387ba6e34',
    },
  ],
  photos: [
    {
      url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Building and shipping projects',
    },
    {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      caption: 'IoT and embedded systems work',
    },
  ],
};

async function ensureStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(defaultPortfolio, null, 2));
  }
}

async function getPortfolio() {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

async function savePortfolio(payload) {
  await fs.writeFile(DATA_FILE, JSON.stringify(payload, null, 2));
  return payload;
}

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing token' });
  }

  const token = header.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== 'admin' || password !== '123') {
    return res.status(401).json({ message: 'Invalid username/password' });
  }

  const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

app.get('/api/portfolio', async (_req, res) => {
  const portfolio = await getPortfolio();
  res.json(portfolio);
});

app.put('/api/portfolio', auth, async (req, res) => {
  const saved = await savePortfolio(req.body);
  res.json(saved);
});

app.post('/api/upload', auth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  res.json({
    url: `/uploads/${req.file.filename}`,
  });
});

app.get('/login', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/admin', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

async function start() {
  await ensureStorage();
  app.listen(PORT, () => {
    console.log(`Portfolio app running on http://localhost:${PORT}`);
    console.log('Using local JSON storage (MongoDB not required).');
  });
}

start();
