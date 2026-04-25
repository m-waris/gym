import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent:  '#FF2020',
        dark:    '#0A0A0A',
        card:    '#111111',
        borderClr: '#2A2A2A',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config