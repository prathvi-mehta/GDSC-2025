# E-Waste Scanner Application

A comprehensive application for scanning and analyzing electronic waste to determine recyclability, value, and proper disposal methods. The application uses Google's Gemini AI to analyze images of electronic devices and provide detailed recycling information.

## Features

- **Device Scanning**: Take pictures of e-waste devices using your camera or upload images
- **AI-Powered Analysis**: Uses Google's Gemini AI to analyze e-waste components
- **Recycling Information**: Get detailed recycling instructions, hazardous material warnings, and value assessment
- **User Authentication**: Secure user accounts (coming soon)

## Tech Stack

- **Frontend**: React, Vite, Framer Motion, Tailwind CSS
- **Backend**: Node.js, Express
- **AI/ML**: Google Gemini API for image analysis
- **Authentication**: Firebase (coming soon)

## Project Structure

```
ewaste/
├── src/                  # React frontend code
├── server/               # Express backend API
│   ├── index.js          # Server entry point
│   └── .env              # Environment variables for server
├── public/               # Static assets
└── package.json          # Project dependencies
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```
git clone <repository-url>
cd ewaste
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
```
# Make sure you have the following in the server/.env file
GOOGLE_API_KEY=your_gemini_api_key
PORT=5000
```

### Running the Application

To run both the frontend and backend concurrently:

```
npm start
```

To run just the frontend:

```
npm run dev
```

To run just the backend:

```
npm run server
```

For development with auto-reloading on the backend:

```
npm run server:dev
```

## Building for Production

```
npm run build
```

This will create a production build in the `dist` directory.

## API Endpoints

- `POST /api/analyze` - Upload and analyze images of e-waste (accepts up to 3 images)

## Future Enhancements

- Firebase integration for user authentication
- Saved scan history
- Recycling center locator
- Carbon footprint calculation
