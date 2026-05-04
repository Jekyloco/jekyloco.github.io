import { SITE_CONFIG } from '../site.config';

const defaultExcerptMax = SITE_CONFIG.content.autoDescriptionMaxChars;

/** Strip common Markdown / MDX noise and take a short plain-text lead for listings & meta. */
export function excerptFromMarkdownBody(body: string, maxLen = defaultExcerptMax): string {
	const raw = (body ?? '').trim();
	if (!raw) return '';

	let s = raw.replace(/^\uFEFF/, '');
	s = s.replace(/```[\w-]*\n?[\s\S]*?```/g, ' ');
	s = s.replace(/~~~[\w-]*\n?[\s\S]*?~~~/g, ' ');
	s = s.replace(/!\[[^\]]*\]\([^)]*\)/g, '');
	s = s.replace(/!\[[^\]]*\]\[[^\]]*\]/g, '');
	s = s.replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1');
	s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
	s = s.replace(/<https?:\/\/[^>\s]+>/g, '');
	s = s.replace(/^#{1,6}\s+/gm, '');
	s = s.replace(/^(-{3,}|\*{3,}|_{3,})\s*$/gm, ' ');
	s = s.replace(/^>\s?/gm, '');
	s = s.replace(/^\s{0,3}[-*+]\s+/gm, '');
	s = s.replace(/^\s{0,3}\d+\.\s+/gm, '');
	s = s.replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, ''));
	s = s.replace(/\*\*\*([^*]+)\*\*\*/g, '$1');
	s = s.replace(/\*\*([^*]+)\*\*/g, '$1');
	s = s.replace(/\*([^*]+)\*/g, '$1');
	s = s.replace(/___([^_]+)___/g, '$1');
	s = s.replace(/__([^_]+)__/g, '$1');
	s = s.replace(/_([^_]+)_/g, '$1');
	s = s.replace(/~~([^~]+)~~/g, '$1');
	s = s.replace(/<[^>]+>/g, ' ');
	s = s.replace(/\|/g, ' ');
	s = s.replace(/\s+/g, ' ').trim();
	if (!s) return '';
	if (s.length <= maxLen) return s;
	const slice = s.slice(0, maxLen);
	const lastSpace = slice.lastIndexOf(' ');
	const trimmed = lastSpace > maxLen * 0.55 ? slice.slice(0, lastSpace) : slice;
	return `${trimmed.trimEnd()}…`;
}

export function resolvePostDescription(
	description: string | undefined,
	body: string,
	title: string,
): string {
	const manual = (description ?? '').trim();
	if (manual) return manual;
	const fromBody = excerptFromMarkdownBody(body);
	if (fromBody) return fromBody;
	return (title ?? '').trim() || '';
}
