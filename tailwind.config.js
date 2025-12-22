/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet Organic Luxury (Pilihan Anda: Opsi C)
        luxury: {
          cream: "#FEFCF5",    // Background Utama
          dark: "#2F3E46",     // Teks Utama 
          green: "#354F52",    // Aksen Utama (Tombol)
          sage: "#84A98C",     // Aksen Sekunder
          terracotta: "#CAD2C5", // Variasi Card
          alert: "#E07A5F",    // Error/Notifikasi
        },
      },
    },
  },
  plugins: [],
}