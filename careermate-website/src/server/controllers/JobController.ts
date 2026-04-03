import { Request, Response } from 'express';
import { JobService } from '../services/JobService';
import { Job } from '../entities/Job';

export class JobController {
  constructor(private jobService: JobService) {}

  async getAll(req: Request, res: Response) {
    try {
      const jobs = await this.jobService.getAllJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const job = await this.jobService.getJobById(id);
      if (job) {
        res.json(job);
      } else {
        res.status(404).json({ error: 'Job not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response) {
    const jobData = req.body;
    try {
      const job = new Job(
        null,
        jobData.recruiterId,
        jobData.title,
        jobData.description,
        jobData.requirements,
        jobData.salary,
        jobData.location,
        new Date()
      );
      const id = await this.jobService.createJob(job);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
