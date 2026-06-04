/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        /* Primary scale */
        primary: '#1d5cab',
        'primary-900': '#0a192f',
        'primary-800': '#133d71',
        'primary-100': '#e6f0fa',

        /* Backward compat aliases */
        'primary-dark': '#0a192f',
        'primary-mid': '#133d71',
        'primary-light': '#e6f0fa',

        /* Accent & neutrals */
        accent: '#F59E0B',
        secondary: '#1E293B',
        surface: '#f4f0eb',
        muted: '#64748B',
        border: '#e2e8f0',

        /* Backward compat alias */
        'wit-bg': '#f4f0eb',

        /* Semantic status */
        success: '#16a34a',
        warning: '#d97706',
        error: '#dc2626',
        info: '#2563eb',

        /* Recruiter brand colors */
        brands: {
          tcs: '#0093D0',
          infosys: '#5E6EBF',
          capgemini: '#0070ad',
          persistent: '#e21a22',
          techm: '#ff1d25',
          amdocs: '#ff5f00',
          hitachi: '#dd2026',
          cognizant: '#2f78c4',
          wipro: '#2a8f8e',
          hexaware: '#e46424',
          atlas: '#1e293b',
          shapoorji: '#0c4ca3',
          ibm: '#006699',
          lt: '#E8762D',
          tatamotors: '#1C3D5A',
          bajaj: '#0D47A1',
          kirloskar: '#003D6B',
        },
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}
