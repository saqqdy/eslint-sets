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
				text: 'v7.0.0',
				items: [
					{ text: 'v6.6.1', link: 'https://github.com/saqqdy/eslint-sets/tree/v6.6.1' },
					{ text: 'v6.6.0', link: 'https://github.com/saqqdy/eslint-sets/tree/v6.6.0' },
					{ text: 'v6.5.1', link: 'https://github.com/saqqdy/eslint-sets/tree/v6.5.1' },
					{ text: 'v6.5.0', link: 'https://github.com/saqqdy/eslint-sets/tree/v6.5.0' },
					{ text: 'v6.4.0', link: 'https://github.com/saqqdy/eslint-sets/tree/v6.4.0' },
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
						{ text: 'Migrate to v7', link: '/guide/migrate-to-v7' },
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
			themeConfig: {
				sidebar: {
					'/zh/guide/': [
						{
							text: '指南',
							items: [
								{ text: '快速开始', link: '/zh/guide/getting-started' },
								{ text: '基础用法', link: '/zh/guide/basic-usage' },
								{ text: '进阶用法', link: '/zh/guide/advanced-usage' },
								{ text: 'CLI', link: '/zh/guide/cli' },
								{ text: '从 v5 迁移', link: '/zh/guide/migration' },
								{ text: '从 v6 升级到 v7', link: '/zh/guide/migrate-to-v7' },
							],
						},
						{
							text: '测试',
							items: [
								{ text: '测试指南', link: '/zh/TESTING' },
								{ text: 'Monorepo 指南', link: '/zh/MONOREPO' },
							],
						},
					],
					'/zh/configs/': [
						{
							text: '配置',
							items: [
								{ text: '概览', link: '/zh/configs/' },
								{ text: 'Vue', link: '/zh/configs/vue' },
								{ text: 'React', link: '/zh/configs/react' },
							],
						},
					],
					'/zh/api/': [
						{
							text: 'API 参考',
							items: [
								{ text: '概览', link: '/zh/api/' },
								{ text: '选项', link: '/zh/api/options' },
							],
						},
					],
				},
			},
		},
	},
})
