import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    readTime: z.number(),
    difficulty: z.enum(['Principiante', 'Intermedio', 'Avanzado']).default('Principiante'),
    author: z.string().default('KetoCore Team'),
    publishedAt: z.coerce.date(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    mealType: z.string(),
    category: z.string().default('Keto'),
    prepTime: z.number(),
    difficulty: z.enum(['Fácil', 'Medio', 'Difícil']).default('Fácil'),
    servings: z.number().default(2),
    calories: z.number(),
    protein: z.number(),
    fat: z.number(),
    netCarbs: z.number(),
    fiber: z.number().default(0),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const foods = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/foods' }),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    calories: z.number(),
    protein: z.number(),
    fat: z.number(),
    carbs: z.number(),
    fiber: z.number().default(0),
    netCarbs: z.number(),
    benefits: z.array(z.string()).default([]),
    drawbacks: z.array(z.string()).default([]),
    diets: z.array(z.string()).default([]),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const protocols = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/protocols' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    goal: z.string(),
    category: z.string(),
    duration: z.string(),
    difficulty: z.enum(['Principiante', 'Intermedio', 'Avanzado']).default('Principiante'),
    benefits: z.array(z.string()).default([]),
    risks: z.array(z.string()).default([]),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const challenges = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/challenges' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    duration: z.string(),
    difficulty: z.enum(['Fácil', 'Moderado', 'Intenso']).default('Fácil'),
    participants: z.number().default(0),
    category: z.string(),
    benefits: z.array(z.string()).default([]),
    image: z.string().optional(),
    active: z.boolean().default(true),
  }),
});

const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    name: z.string(),
    age: z.number(),
    weightLost: z.number(),
    duration: z.string(),
    protocol: z.string(),
    startWeight: z.number(),
    currentWeight: z.number(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const supplements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/supplements' }),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    description: z.string(),
    benefits: z.array(z.string()).default([]),
    evidence: z.enum(['Alta', 'Moderada', 'Baja', 'Mixta']).default('Moderada'),
    recommended: z.boolean().default(false),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  articles,
  recipes,
  foods,
  protocols,
  challenges,
  stories,
  supplements,
};
