# Auto Chronicle Lab - CarVault 🚗

A modern, responsive car information platform built with React, TypeScript, and Tailwind CSS. Discover, compare, and explore cars with our comprehensive automotive platform.

## 🌟 Features

- **🔍 Advanced Search**: Search cars by name, brand, or fuel type
- **📱 Responsive Design**: Optimized for all devices
- **🎨 Modern UI**: Built with Shadcn UI components and Tailwind CSS
- **⚡ Fast Performance**: Powered by Vite for lightning-fast development
- **🔧 TypeScript**: Full type safety and better development experience
- **📊 Car Statistics**: View detailed car information and ratings
- **🏷️ Smart Filtering**: Filter by popular brands and fuel types

## 🚀 Live Demo

Visit the live application: [https://kumaramrit30.github.io/autoAssist/](https://kumaramrit30.github.io/autoAssist/)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Radix UI
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack Query
- **Deployment**: GitHub Pages + GitHub Actions

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/KumarAmrit30/autoAssist.git
   cd autoAssist
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🏗️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/
│   └── ui/           # Reusable UI components
├── pages/            # Page components
├── data/             # Static data and utilities
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── assets/           # Static assets
```

## 🎯 Key Components

- **Navigation**: Responsive navigation bar
- **CarCard**: Individual car display component
- **Search**: Advanced search functionality
- **Filtering**: Brand and fuel type filters
- **Statistics**: Car platform statistics

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a new deployment.

### Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. The `dist/` folder contains the production-ready files

## 🔧 Configuration

### GitHub Pages Setup

The project is configured with the correct base path (`/autoAssist/`) for GitHub Pages deployment in `vite.config.ts`:

```typescript
export default defineConfig({
  base: "/autoAssist/",
  // ... other config
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Development Workflow

This project follows a feature branch workflow:

1. **Main Branch**: Production-ready code
2. **Feature Branches**: New features and bug fixes
3. **Pull Requests**: Code review and testing
4. **Automatic Deployment**: GitHub Actions handles deployment

## 🐛 Troubleshooting

### Common Issues

**Blank white page on GitHub Pages**

- Ensure the base path is correctly set in `vite.config.ts`
- Check that all assets are loading from the correct path

**Build errors**

- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors with `npm run lint`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kumar Amrit**

- GitHub: [@KumarAmrit30](https://github.com/KumarAmrit30)
- Project: [Auto Chronicle Lab](https://github.com/KumarAmrit30/autoAssist)

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [React](https://reactjs.org/) for the amazing frontend library

---

⭐ **Star this repository if you found it helpful!**
