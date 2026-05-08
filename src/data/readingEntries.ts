export const formatReadingDate = (value: Date | string) => {
	const date = value instanceof Date ? value : new Date(`${value}T00:00:00`);
	return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
};

export const getReadingPlainText = (markdown: string) =>
	markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/^#{1,6}\s+/gm, '')
		.replace(/^>\s?/gm, '')
		.replace(/[*_~>#-]/g, '')
		.replace(/\s+/g, ' ')
		.trim();

export const getReadingPreviewLines = (markdown: string, limit = 4) =>
	markdown
		.split(/\r?\n/)
		.map((line) => getReadingPlainText(line))
		.filter(Boolean)
		.slice(0, limit);
