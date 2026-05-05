import BackgroundImage from './images/image_250427_20.jpg';
import LogoImage from './images/logo.jpg';

export const SITE_CONFIG = {
	theme: {
		default: 'dark',
		light: {
			accentRgb: '99, 102, 241',
			link: '#4f46e5',
			linkHover: '#4338ca',
			bgRgb: '248, 250, 252',
			cardRgb: '255, 255, 255',
			borderRgb: '226, 232, 240',
		},
		dark: {
			accentRgb: '129, 140, 248',
			link: '#a5b4fc',
			linkHover: '#c7d2fe',
			bgRgb: '2, 6, 23',
			cardRgb: '15, 23, 42',
			borderRgb: '51, 65, 85',
		},
	},
	music: {
		src: '/media/01%20%E5%89%B5%E9%80%A0.flac',
		lrc: '/media/01%20%E5%89%B5%E9%80%A0.lrc',
		lrcEncoding: 'gb18030',
		lang: 'ja',
		random: true,
		autoplay: false,
		showOnLoad: false,
		loop: true,
		preload: 'auto',
	},
	backgroundImage: BackgroundImage.src,
	markdown: {
		fontFamily: '',
		fontSize: '1.15rem',
		lineHeight: '1.95',
		backgroundRgb: '',
	},
	/** Auto-generated `description` excerpt when frontmatter omits it (plain text after stripping Markdown). */
	content: {
		autoDescriptionMaxChars: 88,
	},
	favicon: {
		svg: '',
		ico: LogoImage.src,
	},
} as const;
