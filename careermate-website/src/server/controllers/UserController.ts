import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  async getProfile(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const profile = await this.userService.getUserProfile(id);
      if (profile) {
        res.json(profile);
      } else {
        res.status(404).json({ error: 'Profile not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async saveProfile(req: Request, res: Response) {
    const user = req.body;
    try {
      await this.userService.createOrUpdateUser(user);
      res.status(200).json({ status: 'Profile saved' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async analyzeCV(req: Request, res: Response) {
    const { userId, cvText } = req.body;
    try {
      const analysis = await this.userService.analyzeCV(parseInt(userId), cvText);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
