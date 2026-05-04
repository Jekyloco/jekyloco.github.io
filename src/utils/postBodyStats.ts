/** 正文字数：非空白字符（含标点），与正文语言无关的同一统计口径。 */
export function countPostBodyCharacters(body: string): number {
	return (body ?? '').replace(/\s/g, '').length;
}

/**
 * 列表 / 文章 meta 展示：不依赖 `lang`（单篇可中英日混排），统一用中性英文缩写 + 固定数字分组。
 */
export function formatPostBodyCharCount(count: number): string {
	return `${count.toLocaleString('en-US')} chars`;
}
