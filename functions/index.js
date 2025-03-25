import functions from 'firebase-functions';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import multer from 'multer';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Setup ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize environment variables - specify the path to .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - Use CORS with proper configuration for production
const corsOptions = {
<<<<<<< HEAD
  origin: '*', // Allow all origins for testing
  methods: ['GET', 'POST', 'OPTIONS'],
=======
  origin: [
    'https://fir-452812.web.app', 
    'https://firebase-452812.web.app',
    'http://localhost:5173', // For local development
    'http://localhost:5000'  // For local development
  ],
  methods: ['GET', 'POST'],
>>>>>>> bdf707c (..)
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
// Configure storage for multer
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Add preflight OPTIONS handler
app.options('*', cors(corsOptions));
=======
// Debugging endpoint to verify API is working
app.get('/api/test', (req, res) => {
  res.json({ status: 'API is working' });
});

// Configure file upload
const upload = multer({ storage: multer.memoryStorage() });
>>>>>>> bdf707c (..)

// Check if .env file exists and read API key directly if needed
let API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  try {
    // Try to read directly from .env file
    const envPath = path.resolve(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/GOOGLE_API_KEY=([^\r\n]+)/);
      if (match && match[1]) {
        API_KEY = match[1];
        console.log("API key loaded directly from .env file");
      }
    }
  } catch (err) {
    console.error("Error reading .env file:", err);
  }
}

// Hardcode the API key if it's still not found (as a last resort)
if (!API_KEY) {
  API_KEY = "AIzaSyCKa0qKc7KT2MSamM_30u1SX7kmdsjmllI"; // This is the key from your original .env file
  console.log("Using hardcoded API key as fallback");
}

console.log("Using API Key:", API_KEY ? "API key is present" : "API key is still missing");

const genAI = new GoogleGenerativeAI(API_KEY);

// Initialize Gemini AI with the latest model
let model;
try {
  // Use the latest gemini-2.0-flash model
  model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  console.log("Using Gemini 2.0 Flash model - the latest version");
} catch (error) {
  console.warn("Failed to load gemini-2.0-flash model, falling back to gemini-pro...", error.message);
  try {
    // Fallback to gemini-pro if needed
    model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    console.log("Using Gemini Pro model as fallback");
  } catch (error2) {
    console.error("Failed to initialize Gemini model:", error2.message);
    // We'll handle this when the model is used
  }
}

// Serve static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
} else {
  // In development mode, serve static files from the current directory
  console.log('Serving static files from:', __dirname);
  app.use(express.static(__dirname));
}

<<<<<<< HEAD
// Helper function for image analysis logic
async function analyzeImages(req, res) {
  console.log('=== API analyze request received ===');
  
  try {
    if (!req.files || req.files.length === 0) {
      console.log('ERROR: No images uploaded in request');
=======
// API endpoint for image analysis
app.post('/api/analyze', upload.array('images', 3), async (req, res) => {
  console.log('API analyze request received');
  
  try {
    if (!req.files || req.files.length === 0) {
      console.log('No images uploaded');
>>>>>>> bdf707c (..)
      return res.status(400).json({ error: 'No images uploaded' });
    }
    
    console.log(`Received ${req.files.length} images for analysis`);
    
    if (req.files.length > 3) {
<<<<<<< HEAD
      console.log('ERROR: Too many images uploaded:', req.files.length);
=======
      console.log('Too many images uploaded');
>>>>>>> bdf707c (..)
      return res.status(400).json({ error: 'Maximum 3 images allowed' });
    }

    // Convert image buffer to Gemini-compatible format
    const imageParts = [];
    
    // Process each uploaded file
    for (const file of req.files) {
      try {
        // Validate buffer
        if (!file.buffer || file.buffer.length === 0) {
          console.error(`Invalid buffer for file ${file.originalname}`);
          continue;
        }
        
        // Convert to base64
        const base64Data = file.buffer.toString('base64');
        
        imageParts.push({
          inlineData: {
            data: base64Data,
            mimeType: file.mimetype
          }
        });
        
        console.log(`Processed file: ${file.originalname}, size: ${file.size} bytes, mime: ${file.mimetype}`);
      } catch (fileError) {
        console.error(`Error processing file ${file.originalname}:`, fileError);
      }
    }
    
    if (imageParts.length === 0) {
      return res.status(400).json({ error: 'Failed to process any of the uploaded images' });
    }
    
    // Prompt for the AI
    const PROMPT = `
You are an expert E-Waste analysis system designed to help users identify, recycle, and safely dispose of electronic waste. Carefully analyze the ${imageParts.length} uploaded image(s) of electronic devices or components.

Provide a comprehensive analysis with the following sections:

1. Device Identification:
   - Primary device type with specificity (e.g., "iPhone 11 smartphone" rather than just "smartphone")
   - Manufacturer and specific model if identifiable
   - Approximate production year range, if possible
   - Key technical specifications if visible

2. Sustainability Assessment:
   - Precise recyclability score (0-100%) with justification
   - Complexity rating (1-5): 1=simple home recycling, 5=requires specialized facilities
   - Detailed breakdown of all recoverable materials (e.g., specific metals, plastic types)
   - Environmental impact score (1-10) with explanation

3. Safety Information:
   - All hazardous components with specific details (e.g., "lithium-ion battery - 10.8V, 5800mAh" rather than just "battery")
   - Comprehensive handling precautions prioritizing user safety
   - Regulatory compliance requirements with reference to e-waste standards
   - Health risks if improperly handled

4. Disposal Guidelines:
   - Detailed, numbered step-by-step disassembly instructions (when safe)
   - Required tools and safety equipment for disassembly
   - Specific recycling certifications to look for (R2, e-Stewards, etc.)
   - Regional regulations with actionable disposal locations:
     - EU (WEEE Directive compliance details)
     - US (state-specific requirements)
     - Asia (country-specific guidelines)

5. Resource Recovery Value:
   - Specific components with resale/reuse potential and estimated value
   - Precise rare/valuable materials content (quantities when possible)
   - Data security considerations with specific wiping procedures if needed
   - Circular economy opportunities for the device
   - Detailed price estimate in USD range (min-max) for:
     - Recycling value (what recyclers might pay for the device)
     - Resale value (if refurbished/functional)
     - Raw materials value (metals, rare earths, etc.)
   - Carbon footprint reduction estimate from recycling this device

Format your response as a clean, well-structured JSON object without markdown formatting:
{
  "device": {
    "type": string,
    "manufacturer": string,
    "model": string|null,
    "year_estimate": string|null,
    "specifications": string[]
  },
  "sustainability": {
    "recyclability_score": number,
    "complexity_rating": number,
    "recoverable_materials": string[],
    "environmental_impact": {
      "score": number,
      "explanation": string
    },
    "carbon_footprint_savings": string
  },
  "safety": {
    "hazardous_components": string[],
    "handling_precautions": string[],
    "regulatory_requirements": string[],
    "health_risks": string[]
  },
  "disposal": {
    "disassembly_steps": string[],
    "required_tools": string[],
    "certifications": string[],
    "regional_guidelines": {
      "EU": string,
      "US": string,
      "Asia": string
    }
  },
  "value": {
    "reusable_components": string[],
    "valuable_materials": string[],
    "data_security_required": boolean,
    "data_wiping_procedure": string|null,
    "estimated_recycling_value": string,
    "price_estimates": {
      "recycling_value": string,
      "resale_value": string,
      "raw_materials_value": string
    },
    "recommended_disposal_method": string
  }
}

Be extremely precise and technical in your analysis. If you cannot identify something with certainty, use "unknown" or null values rather than making assumptions. Focus on providing actionable information for responsible e-waste handling and accurate price estimates.
`;
<<<<<<< HEAD

    if (!model) {
      console.error('ERROR: Gemini model not initialized');
=======
    
    console.log('Sending request to Gemini with', imageParts.length, 'images');
    console.log('API Key status:', API_KEY ? 'present' : 'missing');
    
    if (!model) {
      console.error('Gemini model not initialized');
>>>>>>> bdf707c (..)
      return res.status(500).json({ 
        error: 'AI model not initialized', 
        message: 'The AI service is currently unavailable. Please try again later.' 
      });
    }
    
    console.log('Sending request to Gemini with', imageParts.length, 'images...');
    
    // Call Gemini with safety measures
    try {
<<<<<<< HEAD
      // Set a timeout for the Gemini API call
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Gemini API request timed out')), 30000); // 30 second timeout
      });
      
      // Make the actual API call
      const geminiPromise = model.generateContent([PROMPT, ...imageParts]);
      
      // Race the API call against the timeout
      const result = await Promise.race([geminiPromise, timeoutPromise]);
      const response = await result.response;
      const text = response.text();
  
      console.log('Received response from Gemini');
      
      // Parse the JSON response (Gemini may return markdown, so clean it)
      let jsonString = text.replace(/```json|```/g, '').trim();
      
      // Additional cleanup if needed
      jsonString = jsonString.replace(/^[\s\n]*{/, '{').replace(/}[\s\n]*$/, '}');
      
      try {
        const analysis = JSON.parse(jsonString);
        console.log('Successfully parsed Gemini response into JSON');
        return res.json(analysis);
      } catch (parseError) {
        console.error('ERROR: Failed to parse Gemini response as JSON:', parseError);
        console.log('Raw response sample for debugging:', text.substring(0, 500) + '...');
        
        // Attempt to handle non-JSON responses
        if (text.includes('device') && text.includes('sustainability')) {
          return res.status(200).send({ 
            raw_response: text,
            note: 'The AI returned a response but not in valid JSON format.' 
          });
        }
        
        return res.status(500).json({ 
          error: 'Failed to parse AI response', 
          message: 'The AI returned an invalid format. Please try again.' 
        });
      }
    } catch (geminiError) {
      console.error('ERROR: Gemini API error:', geminiError);
      return res.status(500).json({ 
        error: 'Gemini API error', 
        message: geminiError.message || 'An error occurred while analyzing the images' 
      });
    }
  } catch (error) {
    console.error('ERROR: General server error:', error);
=======
      const analysis = JSON.parse(jsonString);
      console.log('Successfully parsed Gemini response');
      return res.json(analysis);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      console.log('Raw response:', text.substring(0, 200) + '...');
      return res.status(500).json({ 
        error: 'Failed to parse AI response', 
        message: 'The AI returned an invalid format. Please try again.' 
      });
    }
  } catch (error) {
    console.error('Gemini error:', error);
>>>>>>> bdf707c (..)
    return res.status(500).json({ 
      error: 'AI analysis failed', 
      message: error.message || 'An unknown error occurred'
    });
  }
}

// Make the analyze endpoint work both with and without the /api prefix
app.post('/analyze', upload.array('images', 3), async (req, res) => {
  return analyzeImages(req, res);
});

// Keep the /api/analyze endpoint for backward compatibility
app.post('/api/analyze', upload.array('images', 3), async (req, res) => {
  return analyzeImages(req, res);
});

// In production, handle any requests that don't match the above by serving the React app
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Start the server in development mode only
<<<<<<< HEAD
if (process.env.NODE_ENV === 'development') {
  app.listen(PORT, () => {
    console.log(`======================================================`);
    console.log(`🚀 Local development server running at http://localhost:${PORT}`);
    console.log(`- Main API endpoint: http://localhost:${PORT}/analyze`);
    console.log(`======================================================`);
    console.log(`💡 TIP: Use the frontend with API_URL set to http://localhost:${PORT}`);
    console.log(`======================================================`);
  });
} else if (process.env.NODE_ENV !== 'production') {
=======
if (process.env.NODE_ENV !== 'production') {
>>>>>>> bdf707c (..)
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the Express app as a Firebase Function called 'api'
export const api = functions.https.onRequest(app);