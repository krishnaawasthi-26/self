require('dotenv').config();
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/krishna_portfolio';
const JWT_SECRET = process.env.JWT_SECRET || 'replace-this-in-production';

app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const portfolioSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    location: String,
    email: String,
    phone: String,
    resumeUrl: String,
    links: [
      {
        label: String,
        url: String,
      },
    ],
    about: String,
    skills: [String],
    achievements: [String],
    experiences: [
      {
        company: String,
        role: String,
        duration: String,
        points: [String],
      },
    ],
    projects: [
      {
        name: String,
        stack: String,
        description: String,
        github: String,
        demo: String,
      },
    ],
    certificates: [
      {
        name: String,
        issuer: String,
        url: String,
      },
    ],
    photos: [
      {
        url: String,
        caption: String,
      },
    ],
  },
  { timestamps: true }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

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

async function getOrCreatePortfolio() {
  let portfolio = await Portfolio.findOne();
  if (!portfolio) {
    portfolio = await Portfolio.create(defaultPortfolio);
  }
  return portfolio;
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

  if (username !== 'me' || password !== '123') {
    return res.status(401).json({ message: 'Invalid username/password' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

app.get('/api/portfolio', async (req, res) => {
  const portfolio = await getOrCreatePortfolio();
  res.json(portfolio);
});

app.put('/api/portfolio', auth, async (req, res) => {
  const existing = await getOrCreatePortfolio();

  const update = {
    ...req.body,
    _id: existing._id,
  };

  const saved = await Portfolio.findByIdAndUpdate(existing._id, update, {
    new: true,
    runValidators: true,
    overwrite: true,
  });

  res.json(saved);
});

app.get('/admin', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});


app.get('/login', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB: ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Portfolio app running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server. Make sure MongoDB is running locally.');
    console.error(error.message);
    process.exit(1);
  }
}

start();
