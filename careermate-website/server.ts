import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { SqliteUserRepository } from './src/server/repositories/UserRepository';
import { UserService } from './src/server/services/UserService';
import { UserController } from './src/server/controllers/UserController';
import { SqliteJobRepository } from './src/server/repositories/JobRepository';
import { JobService } from './src/server/services/JobService';
import { JobController } from './src/server/controllers/JobController';
import { getDatabase } from './src/server/db';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Database
  const db = await getDatabase();

  // Seed Data if empty
  const jobsCount = await db.get('SELECT COUNT(*) as count FROM jobs');
  if (jobsCount.count === 0) {
    console.log('Seeding initial data...');
    
    // Create a recruiter user
    await db.run(
      `INSERT INTO users (email, password, full_name, role, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      'recruiter@careermate.com', 'password123', 'Recruiter Admin', 'recruiter', new Date().toISOString(), new Date().toISOString()
    );
    
    // Create recruiter profile
    await db.run(
      `INSERT INTO recruiters (user_id, company_name, description, website, created_at) 
       VALUES (?, ?, ?, ?, ?)`,
      1, 'TechFlow Solutions', 'Leading tech solutions provider.', 'https://techflow.com', new Date().toISOString()
    );

    // Create initial jobs
    const initialJobs = [
      {
        recruiter_id: 1,
        title: 'Senior Frontend Developer (React)',
        description: 'We are looking for an expert in React and Tailwind CSS.',
        requirements: '5+ years of experience, proficiency in TypeScript and modern frontend tools.',
        salary: '$2,500 - $4,000',
        location: 'Ho Chi Minh City, VN'
      },
      {
        recruiter_id: 1,
        title: 'Backend Engineer (Node.js/SQL)',
        description: 'Join our backend team to build scalable APIs with Node.js and SQLite.',
        requirements: 'Experience with Express, SQL, and SOLID principles.',
        salary: '$2,000 - $3,500',
        location: 'Hanoi, VN'
      },
      {
        recruiter_id: 1,
        title: 'AI/ML Research Intern',
        description: 'Work with our AI team to integrate Gemini models into our products.',
        requirements: 'Strong Python skills, interest in LLMs and prompt engineering.',
        salary: '$800 - $1,200',
        location: 'Remote'
      }
    ];

    for (const job of initialJobs) {
      await db.run(
        `INSERT INTO jobs (recruiter_id, title, description, requirements, salary, location, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        job.recruiter_id, job.title, job.description, job.requirements, job.salary, job.location, new Date().toISOString()
      );
    }
    console.log('Seeding completed.');
  }

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Dependency Injection (SOLID: Dependency Inversion)
  const userRepository = new SqliteUserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  const jobRepository = new SqliteJobRepository();
  const jobService = new JobService(jobRepository);
  const jobController = new JobController(jobService);

  // API Routes
  app.get('/api/profile/:id', (req, res) => userController.getProfile(req, res));
  app.post('/api/profile', (req, res) => userController.saveProfile(req, res));
  app.post('/api/analyze-cv', (req, res) => userController.analyzeCV(req, res));

  app.get('/api/jobs', (req, res) => jobController.getAll(req, res));
  app.get('/api/jobs/:id', (req, res) => jobController.getById(req, res));
  app.post('/api/jobs', (req, res) => jobController.create(req, res));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
