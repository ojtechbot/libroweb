- **Real-time Updates** - Live notifications and status updates

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Backend**: Firebase Authentication & Cloud Firestore
- **AI Integration**: Google Gemini AI with GenKit
- **Deployment**: Vercel (optimized for Next.js)
- **State Management**: React Context + Custom Hooks

## 📦 Installation & Setup

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Firebase project with Firestore database

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ojtechbot/libroweb.git
   cd libroweb
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended for Next.js)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy automatically with every push to main branch

### Manual Build
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
libroweb/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable React components
│   ├── context/             # React Context providers
│   ├── lib/                 # Utility libraries and configurations
│   ├── firebase/            # Firebase configuration and services
│   ├── types/               # TypeScript type definitions
│   └── styles/              # Global styles and Tailwind config
├── public/                  # Static assets
├── .github/                 # GitHub Actions workflows
└── documentation/           # Project documentation
```

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create Firestore Database in test mode initially
4. Update security rules for production
5. Copy configuration to your environment variables

### Gemini AI Setup
1. Obtain API key from [Google AI Studio](https://makersuite.google.com/)
2. Add to your environment variables as `NEXT_PUBLIC_GEMINI_API_KEY`

## 🤝 Contributing

We welcome contributions to enhance LibroWeb! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is developed for Foundation Polytechnic, Ikot Ekpene. All rights reserved.

## 🙏 Acknowledgments

- **Foundation Polytechnic** - For the opportunity to develop this system
- **Google** - For Firebase and Gemini AI technologies
- **Next.js Team** - For the excellent React framework
- **Tailwind CSS** - For the utility-first CSS framework

## 📞 Support

For technical support or questions about LibroWeb, please contact:

- **Email**: [your-email@foundationpolytechnic.edu.ng]
- **Issue Tracker**: [GitHub Issues](https://github.com/your-username/libroweb/issues)

---

**Developed with ❤️ for Foundation Polytechnic, Ikot Ekpene**

*Transforming library management through modern technology and artificial intelligence.*
```

## Key Features Highlighted:

1. **Professional Presentation**: Badges showcase the tech stack
2. **Comprehensive Features**: Highlights both library management and AI capabilities
3. **Clear Installation Steps**: Easy-to-follow setup instructions
4. **Project Structure**: Shows organized code architecture
5. **Configuration Guidance**: Helps with Firebase and Gemini setup
6. **Institutional Focus**: Specifically mentions Foundation Polytechnic
7. **Modern Tech Stack**: Emphasizes Next.js, React, TypeScript, Tailwind, Firebase

## To use this README:

1. Create a file named `README.md` in your `libroweb` folder
2. Copy and paste the content above
3. Replace placeholder values like `your-username`, `your-email`, and API keys
4. Customize any sections specific to your implementation
5. Commit and push to GitHub


This README presents your project professionally and demonstrates the sophisticated technology stack you've used for Foundation Polytechnic!
