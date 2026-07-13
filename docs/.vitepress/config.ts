import { defineConfig } from 'vitepress'

export default defineConfig({
	base: '/eslint-sets/',
	title: '@eslint-sets/eslint-config',
	description: 'Modern ESLint config with flat config support',

	head: [
		['link', { rel: 'icon', href: '/favicon.ico' }],
	],

	themeConfig: {
		logo: '/logo.svg',

		nav: [
			{ text: 'Guide', link: '/guide/getting-started' },
			{ text: 'Config', link: '/configs/' },
			{ text: 'API', link: '/api/' },
			{
				text: 'v6.5.0',
				items: [
					{ text: 'v6.4.0', link: 'https://github.com/saqqdy/eslint-sets/tree/v6.4.0' },
					{ text: 'v6.3.1', link: 'https://github.com/saqqdy/eslint-sets/tree/v6.3.1' },
					{ text: 'Changelog', link: 'https://github.com/saqqdy/eslint-sets/blob/master/CHANGELOG.md' },
				],
			},
		],

		sidebar: {
			'/guide/': [
				{
					text: 'Guide',
					items: [
						{ text: 'Getting Started', link: '/guide/getting-started' },
						{ text: 'Basic Usage', link: '/guide/basic-usage' },
						{ text: 'Advanced Usage', link: '/guide/advanced-usage' },
					],
				},
				{
					text: 'Testing',
					items: [
						{ text: 'Testing Guide', link: '/TESTING' },
						{ text: 'Monorepo Guide', link: '/MONOREPO' },
					],
				},
			],
			'/configs/': [
				{
					text: 'Configurations',
					items: [
						{ text: 'Overview', link: '/configs/' },
						{ text: 'JavaScript', link: '/configs/javascript' },
						{ text: 'TypeScript', link: '/configs/typescript' },
						{ text: 'Vue', link: '/configs/vue' },
						{ text: 'React', link: '/configs/react' },
					],
				},
			],
			'/api/': [
				{
					text: 'API Reference',
					items: [
						{ text: 'Overview', link: '/api/' },
						{ text: 'Options', link: '/api/options' },
						{ text: 'Rules', link: '/api/rules' },
					],
				},
			],
		},

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/saqqdy/eslint-sets' },
		],

		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2026-present saqqdy',
		},

		search: {
			provider: 'local',
		},

		editLink: {
			pattern: 'https://github.com/saqqdy/eslint-sets/edit/master/docs/:path',
			text: 'Edit this page on GitHub',
		},
	},

	locales: {
		root: {
			label: 'English',
			lang: 'en',
		},
		zh: {
			label: '简体中文',
			lang: 'zh-CN',
			link: '/zh/',
		},
	},
})
