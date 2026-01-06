# SAP BTP AI Learning Hub

A comprehensive, interactive learning platform for mastering AI business solutions on SAP Business Technology Platform (BTP). This website provides hands-on tutorials, best practices, and resources for developers, architects, and business professionals.

## 🎯 Features

- **6 Comprehensive Tutorials**: From beginner to advanced levels
- **Modern Design**: Clean, professional interface with SAP brand colors
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Components**: Smooth navigation and engaging user experience
- **Up-to-Date Content**: Covers latest SAP BTP AI capabilities (2025-2026)
- **Production-Ready**: Built with React 19, Tailwind CSS 4, and shadcn/ui

## 📚 Tutorial Content

### 1. Getting Started with SAP BTP Trial (Beginner - 15 min)
Learn how to set up your SAP BTP trial account and provision AI services.

### 2. Exploring the Generative AI Hub Playground (Beginner - 20 min)
Discover LLMs and craft effective prompts using the interactive playground.

### 3. Building a RAG Solution with SAP BTP (Intermediate - 45 min)
Create a Retrieval-Augmented Generation system for context-aware answers.

### 4. Creating AI Agents with Joule Studio (Intermediate - 50 min)
Build intelligent agents that perform multi-step tasks autonomously.

### 5. Automating Document Processing (Intermediate - 40 min)
Use SAP Document AI to extract and classify information automatically.

### 6. Advanced Topics - Custom AI Models (Advanced - 60 min)
Build and deploy custom machine learning models on SAP BTP.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Git
- GitHub account

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/DruHustle/sap-btp-ai-hub.git
cd sap-btp-ai-hub
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Start development server**
```bash
pnpm dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

### Build for Production

```bash
pnpm build
```

This creates an optimized production build in the `dist/` directory.

## 📁 Project Structure

```
sap-btp-ai-hub/
├── client/
│   ├── public/
│   │   └── images/              # Visual assets (hero, illustrations, patterns)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx         # Main landing page
│   │   │   └── NotFound.tsx     # 404 page
│   │   ├── components/          # Reusable UI components
│   │   ├── contexts/            # React contexts (theme, etc.)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utility functions
│   │   ├── App.tsx              # Main app component with routing
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styles and design tokens
│   └── index.html               # HTML template
├── TUTORIALS.md                 # Comprehensive tutorial documentation
├── README.md                    # This file
├── package.json                 # Dependencies and scripts
└── .gitignore                   # Git ignore rules
```

## 🎨 Design System

### Color Palette
- **Primary**: SAP Blue (#0070F2) - Trust and technical competence
- **Accent**: Warm Gold (#F5A623) - Highlights and CTAs
- **Neutral**: Grays (charcoal to light silver) - Text and backgrounds

### Typography
- **Headlines**: Poppins (bold, geometric) - 600-700 weight
- **Body**: Inter (clean, readable) - 400-600 weight

### Components
- Built with shadcn/ui for consistency
- Tailwind CSS 4 for styling
- Responsive design with mobile-first approach

## 🌐 Deployment Options

### Option 1: GitHub Pages (Recommended for Static Sites)

See the [GitHub Pages Deployment Guide](#github-pages-deployment-guide) below.

### Option 2: Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Vercel auto-detects the build settings
5. Click "Deploy"

### Option 3: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Set build command to `pnpm build`
6. Set publish directory to `dist`
7. Click "Deploy"

## 📖 GitHub Pages Deployment Guide

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Enter repository name: `sap-btp-ai-hub`
3. Choose "Public" (required for free GitHub Pages)
4. Click "Create repository"

### Step 2: Configure GitHub Pages

1. Go to your repository settings
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select branch: **main** (or your default branch)
5. Select folder: **/ (root)**
6. Click "Save"

### Step 3: Prepare Your Project

1. **Update package.json** to include the homepage:
```json
{
  "name": "sap-btp-ai-hub",
  "homepage": "https://DruHustle.github.io/sap-btp-ai-hub",
  "type": "module",
  ...
}
```

2. **Install gh-pages package** (if not already installed):
```bash
pnpm add -D gh-pages
```

3. **Update package.json scripts**:
```json
{
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "predeploy": "pnpm build",
    "deploy": "gh-pages -d dist",
    "preview": "vite preview --host"
  }
}
```

### Step 4: Build and Deploy

1. **Build the project**:
```bash
pnpm build
```

2. **Deploy to GitHub Pages**:
```bash
pnpm deploy
```

This command:
- Builds your project (via predeploy script)
- Pushes the `dist` folder to the `gh-pages` branch
- GitHub Pages automatically serves the content

### Step 5: Verify Deployment

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. You should see a message: "Your site is published at `https://DruHustle.github.io/sap-btp-ai-hub`"
4. Click the link to view your live website

### Step 6: Automate Deployment with GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - run: pnpm install
      
      - run: pnpm build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Now, every push to `main` branch automatically deploys to GitHub Pages.

## 🔄 Continuous Updates

The content in this learning hub is regularly updated to reflect the latest SAP BTP AI capabilities. To stay current:

1. **Check for updates**: `git pull origin main`
2. **Review changelog**: See `CHANGELOG.md` for recent updates
3. **Report issues**: Use GitHub Issues to report bugs or suggest improvements

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m "Add your feature"`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

## 📝 Tutorial Content

For detailed tutorial content, see [TUTORIALS.md](./TUTORIALS.md). This file contains comprehensive, step-by-step guides for all 6 tutorials with code examples, best practices, and troubleshooting tips.

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Routing**: Wouter
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Language**: TypeScript

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

- **Documentation**: See [TUTORIALS.md](./TUTORIALS.md)
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **SAP Resources**: Visit [help.sap.com](https://help.sap.com)

## 🔗 Useful Links

- [SAP BTP Documentation](https://help.sap.com/docs/btp)
- [SAP AI Core Guide](https://help.sap.com/docs/sap-ai-core)
- [Generative AI Hub](https://learning.sap.com/courses/discovering-sap-s-generative-ai-hub)
- [SAP Community](https://community.sap.com)
- [SAP Learning Hub](https://learning.sap.com)

## 👨‍💻 Author

Created by **Manus AI** - AI-powered development platform

---

**Last Updated**: January 2026

**Status**: ✅ Production Ready

For the latest updates and announcements, follow this repository or check the [Releases](https://github.com/DruHustle/sap-btp-ai-hub/releases) page.
