# 📌 Smart E-Waste Connect  

## 🚀 Google Developers Solutions Challenge 2025

**Team Members:**
- Prithvi Mehta
- Rahul Shukla
- Pranshul Mishra
- Shaurya Srivastava

## ♻️ Overview  
**Smart E-Waste Connect** is an AI-powered platform that simplifies **e-waste recycling** by connecting individuals with e-waste to certified recyclers. Using **Google Gemini AI**, the platform classifies e-waste and suggests recycling methods, while cloud technology ensures **secure data management and efficient recycler matching**.  

## 🚀 Features  
✅ **AI-Powered Waste Classification** – Users upload images, and AI identifies e-waste type.  
✅ **Recycler Matching System** – Instantly connects users to nearby certified recyclers.  
✅ **Pickup Scheduling & Tracking** – Users can schedule pickups and track their recycling progress.  
✅ **Cloud-Based Data Management** – Ensures secure and scalable storage for transactions and users.  
✅ **Incentive System** – Encourages responsible recycling through reward points.  

## 🛠 Tech Stack  
- **Frontend:** React.js, Tailwind CSS, Framer Motion  
- **Backend:** Node.js, Express.js  
- **AI Integration:** Google Gemini AI (for waste classification)  
- **Cloud Services:** Google Cloud (for hosting and database management)
- **Maps Integration:** Google Maps API

## 💻 Installation & Setup  

### Prerequisites
- Node.js (v16 or higher) - [Download Node.js](https://nodejs.org/)
- npm (comes with Node.js) or yarn
- Git - [Download Git](https://git-scm.com/downloads)

### 1️⃣ Clone the Repository  

**Bash (Linux/macOS):**
```bash
git clone https://github.com/yourusername/smart-ewaste-connect.git
cd smart-ewaste-connect/ewaste
```

**PowerShell (Windows):**
```powershell
git clone https://github.com/yourusername/smart-ewaste-connect.git
cd .\smart-ewaste-connect\ewaste
```

### 2️⃣ Install Dependencies

**Bash (Linux/macOS):**
```bash
npm install
```

**PowerShell (Windows):**
```powershell
npm install
```

### 3️⃣ Environment Setup

**Bash (Linux/macOS):**
```bash
# Create .env file from template
cp .env.example .env
# Edit the file with your API keys
nano .env  # or use any text editor
```

**PowerShell (Windows):**
```powershell
# Create .env file from template
Copy-Item .env.example -Destination .env
# Edit the file with your API keys using Notepad
notepad .env
```

Required environment variables:
- `VITE_GOOGLE_MAPS_API_KEY`: Your Google Maps API key
- `VITE_GOOGLE_GEMINI_API_KEY`: Your Google Gemini API key

### 4️⃣ Start the Application

**Bash (Linux/macOS):**
```bash
# Run both frontend and backend
npm start

# Run only frontend
npm run dev

# Run only backend
npm run server
```

**PowerShell (Windows):**
```powershell
# Run both frontend and backend
npm start

# Run only frontend
npm run dev

# Run only backend
npm run server
```

The application will be available at:
- Frontend: http://localhost:5173 (or the port shown in terminal)
- Backend API: http://localhost:5000

## 🔧 Project Structure
```
smart-ewaste-connect/
└── ewaste/
    ├── src/                  # React frontend code
    │   ├── Pages/            # Page components
    │   ├── Components/       # Reusable components
    │   ├── Assets/           # Images and static files
    │   └── Utils/            # Helper functions
    ├── server/               # Express backend API
    │   ├── index.js          # Server entry point
    │   └── .env              # Environment variables for server
    ├── public/               # Static assets
    ├── package.json          # Project dependencies
    ├── .env.example          # Template for environment variables
    └── vite.config.js        # Vite configuration
```

## 🛠️ Troubleshooting

### Common Issues

1. **API Key Issues:**
   - Ensure all API keys in your `.env` file are correct and have the necessary permissions.

2. **Node.js Version:**
   - If you encounter errors, make sure you're using Node.js v16 or higher.
   ```powershell
   node --version
   ```

3. **Port Conflicts:**
   - If ports are already in use, edit the `PORT` variable in your `.env` file.

## 🔄 Deployment

For production deployment:

```bash
# Build the production version
npm run build

# The build output will be in the 'dist' directory
```

## 🎯 Contributing

We welcome contributions! If you'd like to improve the project, follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to your fork (`git push origin feature-branch`)
5. Create a pull request

Please ensure your contributions align with the project's goal and maintain clean, readable code.

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for more details.
