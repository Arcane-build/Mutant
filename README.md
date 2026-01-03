# Mutant Landing Page

A modern, responsive landing page built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Modular Components** - Clean, reusable component architecture

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar with logo placeholder
│   ├── Hero.tsx            # Hero section with CTA
│   ├── EarlyAccess.tsx     # Early access section
│   └── Footer.tsx          # Footer with links and logo placeholder
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies

```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Logo Placeholders

The design includes two logo placeholders:

- **Navbar**: Top-left corner
- **Footer**: Bottom-left section

Replace these placeholders with your SVG logo by updating the respective components.

## Color Scheme

- Background: `#0a0a0a`
- Card Background: `#0f0f0f`
- Primary Button: `#2563eb` (Blue)
- Text: White with various opacity levels

## Build for Production

```bash
npm run build
npm start
```

## License

Private
