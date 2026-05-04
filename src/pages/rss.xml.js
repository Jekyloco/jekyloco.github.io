import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { resolvePostDescription } from '../utils/postDescription';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			description: resolvePostDescription(post.data.description, post.body, post.data.title),
			link: `/blog/${post.id}/`,
		})),
	});
}
