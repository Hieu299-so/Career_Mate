import { IJobRepository } from '../repositories/JobRepository';
import { Job } from '../entities/Job';

export class JobService {
  constructor(private jobRepository: IJobRepository) {}

  async getAllJobs(): Promise<Job[]> {
    return await this.jobRepository.findAll();
  }

  async getJobById(id: number): Promise<Job | null> {
    return await this.jobRepository.findById(id);
  }

  async createJob(job: Job): Promise<number> {
    return await this.jobRepository.save(job);
  }

  async getJobsByRecruiter(recruiterId: number): Promise<Job[]> {
    return await this.jobRepository.findByRecruiterId(recruiterId);
  }
}
