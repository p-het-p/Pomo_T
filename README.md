# 🍅 Pomodoro Timer Widget

A beautiful, minimalist Pomodoro timer application with multiple modes, built with React, TypeScript, and Tailwind CSS. Features a clean, distraction-free interface with smooth animations and keyboard shortcuts for maximum productivity.

![Pomodoro Timer Widget](https://img.shields.io/badge/version-0.1.0-blue) ![React](https://img.shields.io/badge/React-18.3.1-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-✓-3178c6) ![Vite](https://img.shields.io/badge/Vite-6.3.5-646cff)

## ✨ Features

### 🎯 Three Powerful Modes

- **Pomodoro Mode**: Classic work/break cycle with customizable durations
  - Track your rounds and progress
  - Automatic transition between work and break sessions
  - Visual completion indicators
  
- **Timer Mode**: Simple countdown timer for any task
  - Set custom durations up to 24 hours
  - Perfect for focused work sessions
  
- **Clock Mode**: Live world clock with timezone support
  - 17+ timezones available
  - 24-hour format with date display
  - Real-time updates

### 🎨 Modern Design

- **Light & Dark Modes**: Toggle between themes instantly
- **Smooth Animations**: Beautiful transitions using Framer Motion
- **Responsive Layout**: Works perfectly on all screen sizes
- **Minimalist Interface**: Clean, distraction-free design
- **Animated Clock Frame**: Dynamic visual feedback while timer is running

### ⌨️ Keyboard Shortcuts

- `[1]` - Switch to Pomodoro mode
- `[2]` - Switch to Timer mode
- `[3]` - Switch to Clock mode
- `[SPACE]` - Start/Pause timer
- `[R]` - Reset timer
- `[M]` - Open/Close menu
- `[D]` - Toggle dark mode
- `[ESC]` - Close menu
- `[ENTER]` - Next round (Pomodoro mode only)
- **Click timer** - Start/Pause

### 🎛️ Customization

- **Quick Presets**: Classic (25/5), Long (50/10), Short (15/3), Deep Work (45/15)
- **Custom Durations**: Set work time, break time, and timer duration (1-1440 minutes)
- **Timezone Selection**: Choose from major world timezones for the clock
- **Theme Preference**: Light or dark mode with smooth transitions

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Pomodoro Timer Widget"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The optimized production build will be created in the `dist` directory.

## 📦 Deployment

### Deploy to Vercel

This project is optimized for [Vercel](https://vercel.com) deployment with a pre-configured `vercel.json` file.

#### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   # Preview deployment
   vercel
   
   # Production deployment
   vercel --prod
   ```

#### Option 2: Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the Vite configuration
   - Click "Deploy"

#### Option 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

### Environment Variables

No environment variables are required for this project. The application runs entirely client-side.

### Deploy to Other Platforms

The build output in `dist/` is a static site that can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder or connect your Git repository
- **GitHub Pages**: Use the `gh-pages` branch with the `dist` folder
- **Cloudflare Pages**: Connect your repository and set build command to `npm run build`
- **Surge**: Run `surge dist/` after building

## 🛠️ Technology Stack

- **[React](https://react.dev/)** (18.3.1) - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** (6.3.5) - Build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Icon library

## 📁 Project Structure

```
Pomodoro Timer Widget/
├── src/
│   ├── components/          # Reusable React components
│   │   └── AnimatedClockFrame.tsx
│   ├── styles/             # CSS styles
│   ├── App.tsx             # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles & Tailwind config
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

## 🎮 Usage Guide

### Starting a Pomodoro Session

1. Open the app and select **POMODORO** mode (or press `[1]`)
2. Customize work/break durations in the menu (`[M]`) if needed
3. Click the timer or press `[SPACE]` to start
4. Work until the timer completes
5. Press `[ENTER]` or click "next" to start your break
6. Repeat the cycle!

### Using the Timer

1. Switch to **TIMER** mode (press `[2]`)
2. Set your desired duration in the menu
3. Click the timer or press `[SPACE]` to start
4. Press `[R]` to reset if needed

### Viewing World Clock

1. Switch to **CLOCK** mode (press `[3]`)
2. Open the menu (`[M]`) to select a different timezone
3. View current time and date in 24-hour format

### Quick Presets

Access the menu (`[M]`) and choose from:
- **Classic**: 25 minutes work, 5 minutes break
- **Long**: 50 minutes work, 10 minutes break
- **Short**: 15 minutes work, 3 minutes break
- **Deep Work**: 45 minutes work, 15 minutes break

## 🎨 Design Philosophy

This timer embraces minimalism and focuses on what matters - helping you stay productive. The interface is intentionally simple, with:

- **No clutter**: Only essential information is displayed
- **Keyboard-first**: Optimized for keyboard navigation
- **Smooth animations**: Delightful but not distracting
- **Accessible**: Built with Radix UI primitives for accessibility
- **Responsive**: Works beautifully on desktop, tablet, and mobile

## 📄 License

This project is based on a Figma design available at: https://www.figma.com/design/IbdovSSuqF04uDYX1UFrps/Pomodoro-Timer-Widget

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 🙏 Acknowledgments

- Design inspiration from the Figma community
- Built with modern React best practices
- Icons by [Lucide](https://lucide.dev/)
- UI components by [Radix UI](https://www.radix-ui.com/)

---

**Made with ❤️ for productivity enthusiasts**

Need help? Open an issue or check the keyboard shortcuts by pressing `[M]` in the app!