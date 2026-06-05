# 🔧 Puthankada Hardware - Frontend

E-commerce website for Puthankada Hardware Items online shop.

## Features

- 🛒 Product catalog with search and filters
- 📱 Responsive design for all devices
- 🛍️ Shopping cart functionality
- 📦 Product categories and subcategories
- 🎨 Orange and green brand theme
- 🖼️ Image gallery for products
- 💬 WhatsApp integration (configurable)

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **UI Components:** Radix UI, Framer Motion
- **Icons:** React Icons, Lucide React

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create `.env` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5001/api
   # NEXT_PUBLIC_WHATSAPP_PHONE=your_number_here
   ```

3. **Place logo image:**
   Add your Puthankada logo to:
   ```
   /public/images/puthankada-logo.png
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   Navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Brand Colors

- Primary Orange: `#f57c00`
- Secondary Green: `#4caf50`

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── layout/      # Header, Footer, Navbar
│   └── product-page/# Product display components
├── lib/             # Utility functions
└── styles/          # Global styles
```

## Notes

- All Gracio branding has been removed
- Social media links removed (can be added later)
- Phone numbers removed from hardcoded locations
- Updated to hardware-focused content