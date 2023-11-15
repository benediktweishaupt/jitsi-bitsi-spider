const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{svelte,js,ts}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans]
            },
            animation: {
                fadein: 'fadein 0.6s'
            }
        }
    },
    plugins: [require('tailwind-scrollbar')({nocompatible: true})],
    variants: {
        scrollbar: ['rounded']
    }
};
