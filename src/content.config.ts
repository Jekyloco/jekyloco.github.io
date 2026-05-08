import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()).optional().default([]),
			lang: z.string().optional().default('English'),
		}),
});

const reading = defineCollection({
	loader: glob({ base: './src/content/reading', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		kind: z.enum(['Book Note', 'Poem', 'Lyric', 'Excerpt']),
		source: z.string().optional(),
		author: z.string().optional(),
		tags: z.array(z.string()).optional().default([]),
		note: z.string().optional(),
		song_path: z.string().optional(),
		lrc_path: z.string().optional(),
	}),
});

export const collections = { blog, reading };
