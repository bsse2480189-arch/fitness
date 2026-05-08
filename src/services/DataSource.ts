import { UserProfile, WorkoutPlan, ActivityLog, Post, Subscription } from '../types';

export interface IDataSource {
  getUser(userId: string): Promise<UserProfile | null>;
  getWorkouts(category?: string): Promise<WorkoutPlan[]>;
  getLogs(userId: string, date: string): Promise<ActivityLog[]>;
  getSocialFeed(): Promise<Post[]>;
  getSubscription(userId: string): Promise<Subscription | null>;
  
  // Mutations
  saveLog(log: Omit<ActivityLog, 'id'>): Promise<ActivityLog>;
  updateUser(userId: string, data: Partial<UserProfile>): Promise<void>;
  createPost(post: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt'>): Promise<Post>;
  
  // AI placeholders
  generateAIWorkout(goal: string): Promise<WorkoutPlan>;
}

export class MockDataSource implements IDataSource {
  private users: UserProfile[] = [
    {
      userId: 'user123',
      email: 'alex.rivers@forge.com',
      displayName: 'Alex Rivers',
      role: 'user',
      fitnessGoals: ['Build Muscle', 'Endurance'],
      height: 180,
      weight: 78.4,
      targetWeight: 82,
      bmi: 24.2,
      createdAt: new Date().toISOString(),
      streak: 12,
    }
  ];

  private workouts: WorkoutPlan[] = [
    {
      id: 'w1',
      title: 'Power Lifting Pro',
      description: 'Master the big three with elite form and progressive overload.',
      level: 'advanced',
      duration: 60,
      category: 'Strength',
      exercises: [],
      thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA_2mygc1S9nAxDpEJ8BphQ4m22pZXWuGJKVe8q3FTWsjYrqX0TOZ1c1DqoXMrPWb6VBkEmGSw8eJ2PcLX5Xw_mGIVxFY26hY83CsWNh6kBlacxksai_RUHPjKSBqIARBu0wMwO9AbwfqUTcMhYkzyrFS_O6BXN6lJ0cmeiXQwye0isCfGIudq8BFNtOCuouKZPIzNliGtDexxkFLlKdcbEKNP5j8gekipM0Tsq2-FeXSbVG5W_FwtYQJLz1XwJzXIQN2uSIHvsI0'
    },
    {
      id: 'w2',
      title: 'HIIT Fusion',
      description: 'Burn maximum calories with short bursts of high-octane energy.',
      level: 'intermediate',
      duration: 30,
      category: 'Cardio',
      exercises: [],
      thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAROObUFWbXgG_IS5qGHXouL-srpF4H5ZEI9qcBKha40HcqGPnK1vDoyZLpr9ZkM6AoW4NKOzVH0cL5vjfC9VPKnRG15L8nYNqMNDMXLrx3yLNfMpO3ELXvTsZ9119omfPuL4BE1QfdS49SLO0jHp-mJugFOkmogxBkW_igUmV6a7fBtvRZvIjuBSSq8V-wV9zMPkQA3Qgv1oO9u3uYwsoTPpbNtyO-sbc8vu3YS4nx482PzzKRSuVq5QoINGEkGNHn0OqfJJ_DkFM'
    }
  ];

  private posts: Post[] = [
    {
      id: 'p1',
      userId: 'user123',
      userName: 'Alex Rivers',
      content: 'Just smashed my PR on the Deadlift! 220kg felt like a breeze today.',
      likes: 482,
      comments: [],
      createdAt: new Date().toISOString()
    }
  ];

  async getUser(userId: string) {
    return this.users.find(u => u.userId === userId) || null;
  }

  async getWorkouts(category?: string) {
    if (category && category !== 'All Workouts') {
      return this.workouts.filter(w => w.category === category);
    }
    return this.workouts;
  }

  async getLogs(userId: string, date: string) {
    return [];
  }

  async getSocialFeed() {
    return this.posts;
  }

  async getSubscription(userId: string) {
    return {
      id: 'sub1',
      userId,
      plan: 'free',
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString()
    } as Subscription;
  }

  async saveLog(log: Omit<ActivityLog, 'id'>) {
    const newLog = { ...log, id: Math.random().toString(36).substr(2, 9) };
    return newLog;
  }

  async updateUser(userId: string, data: Partial<UserProfile>) {
    const user = this.users.find(u => u.userId === userId);
    if (user) Object.assign(user, data);
  }

  async createPost(post: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt'>) {
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };
    this.posts.unshift(newPost);
    return newPost;
  }

  async generateAIWorkout(goal: string) {
    return this.workouts[0]; // Simple mock
  }
}

export const dataSource = new MockDataSource();
