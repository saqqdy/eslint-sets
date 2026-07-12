export const scenarios = {
	vue3Basic: {
		name: 'vue3-basic',
		framework: 'vue',
		configOptions: { vue: true, typescript: true },
		files: {
			'src/App.vue': '<template><div>{{ message }}</div></template>\n<script setup lang="ts">const message = "Hello"</script>',
		},
	},

	reactBasic: {
		name: 'react-basic',
		framework: 'react',
		configOptions: { react: true, typescript: true },
		files: {
			'App.tsx': 'export function App() { return <div>Hello</div> }',
		},
	},

	mixedFramework: {
		name: 'mixed-frameworks',
		configOptions: { vue: true, react: true, typescript: true },
	},
}
