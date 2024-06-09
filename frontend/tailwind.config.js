/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'light-coffee-cream': 'hsl(25.7, 48.3%, 88.6%)',
                'medium-coffee-latte': 'hsl(27.4, 29.1%, 69%)',
                'dark-espresso': 'hsl(21.4, 100%, 8.2%)',
                'mocha-brown': 'hsl(30, 30%, 40%)',
                'rich-chocolate': 'hsl(15, 50%, 25%)',
            },
        },
    },
    plugins: [],
}