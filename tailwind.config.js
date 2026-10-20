/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Specified Base Colors
        background: '#F8F4EC',
        'pearl-ivory': '#F8F4EC',
        pearl: '#F8F4EC',
        porcelain: '#EEE9DF',

        text: '#383B35',
        'charcoal-olive': '#383B35',
        charcoal: '#383B35',

        // Specified Brand Accents
        accent: {
          pink: '#D8B4AE',
          sage: '#9EAA96',
          clay: '#B99B89',
          blue: '#91ACB5',
        },
        'accent-pink': '#D8B4AE',
        'accent-sage': '#9EAA96',
        'accent-clay': '#B99B89',
        'accent-blue': '#91ACB5',
        'soft-blush-pink': '#D8B4AE',
        'muted-sage-green': '#9EAA96',
        'soft-clay': '#B99B89',
        'soft-ocean-blue': '#91ACB5',

        // Nuanced extensions
        sage: {
          light: '#A8C5A0',
          DEFAULT: '#657363',
          muted: '#9EAA96',
          deep: '#4A7050',
        },
        gold: {
          antique: '#A98B52',
          champagne: '#C4A66A',
        },
        ocean: {
          soft: '#91ACB5',
          DEFAULT: '#91ACB5',
          deep: '#526D79',
        },
        taupe: '#A29A8E',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
