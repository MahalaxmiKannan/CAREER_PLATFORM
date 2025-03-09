import { IStorage } from "./types";
import { User, InsertUser, Mentorship, Resource } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private mentorships: Map<number, Mentorship>;
  private resources: Map<number, Resource>;
  public sessionStore: session.Store;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.mentorships = new Map();
    this.resources = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMentors(): Promise<User[]> {
    return Array.from(this.users.values()).filter((user) => user.isMentor);
  }

  async getMentorships(userId: number): Promise<Mentorship[]> {
    return Array.from(this.mentorships.values()).filter(
      (m) => m.mentorId === userId || m.menteeId === userId,
    );
  }

  async createMentorship(mentorship: Omit<Mentorship, "id">): Promise<Mentorship> {
    const id = this.currentId++;
    const newMentorship = { ...mentorship, id };
    this.mentorships.set(id, newMentorship);
    return newMentorship;
  }

  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }
}

export const storage = new MemStorage();
