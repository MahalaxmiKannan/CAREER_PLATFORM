import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  title: text("title"),
  bio: text("bio"),
  expertise: text("expertise").array(),
  goals: text("goals").array(),
  isMentor: boolean("is_mentor").default(false),
});

export const mentorships = pgTable("mentorships", {
  id: serial("id").primaryKey(),
  mentorId: integer("mentor_id").references(() => users.id),
  menteeId: integer("mentee_id").references(() => users.id),
  status: text("status").notNull(), // pending, active, completed
  goals: text("goals"),
  createdAt: text("created_at").notNull(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // article, video, course
  url: text("url").notNull(),
  category: text("category").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  title: true,
  bio: true,
  expertise: true,
  goals: true,
  isMentor: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Mentorship = typeof mentorships.$inferSelect;
export type Resource = typeof resources.$inferSelect;
