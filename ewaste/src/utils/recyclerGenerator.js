import { calculateDistance } from './locationUtils';

const recyclerNames = [
  "EcoRecycle Center",
  "Green E-Waste Solutions",
  "TechReclaim Hub",
  "Sustainable Electronics",
  "EarthTech Recyclers",
  "CircuitCycle",
  "WasteWise Electronics",
  "EcoTech Recovery",
  "Digital Disposal Experts",
  "Planet-Friendly Recycling",
  "GreenChip Recyclers",
  "BioTech Disposal",
  "EcoCircuit Systems",
  "UrbanReclaim Center",
];

const acceptedItemsOptions = [
  ["Batteries", "Computers", "Mobile Phones", "Printers"],
  ["TVs", "Refrigerators", "Air Conditioners", "Washing Machines"],
  ["Laptops", "Tablets", "Monitors", "Keyboards"],
  ["Cameras", "Gaming Consoles", "Speakers", "Headphones"],
  ["All Electronics", "Batteries", "Computers", "Mobile Phones"],
];

const hoursOptions = [
  "Mon-Fri: 9 AM - 6 PM",
  "Mon-Sat: 8 AM - 5 PM",
  "Mon-Sun: 10 AM - 8 PM",
  "Tue-Sat: 9 AM - 7 PM",
  "Mon-Fri: 8 AM - 9 PM, Sat: 10 AM - 5 PM",
];

const addressPrefixes = [
  "123 Green St",
  "456 Eco Ave",
  "789 Recycling Blvd",
  "321 Environment Rd",
  "555 Sustainable Way",
  "987 Tech Park",
  "654 Circuit Dr",
  "852 Digital Lane",
  "741 Earth Rd",
  "369 Electronic Way",
];

// Function to generate random locations around a central point
export const generateRandomLocations = (centerLat, centerLng, count = 10, radiusKm = 5) => {
  // Earth's radius in kilometers
  const earthRadius = 6371;

  return Array.from({ length: count }, (_, index) => {
    // Generate a more realistic distance - between 1.5 and 10km
    const distanceKm = 1.5 + Math.random() * 8.5;
    
    // Convert distance from km to radians
    const distanceRadians = distanceKm / earthRadius;
    
    // Generate random angle
    const randomAngle = Math.random() * Math.PI * 2;
    
    // Calculate position based on distance and angle
    const randomLat = centerLat + distanceRadians * Math.cos(randomAngle);
    const randomLng = centerLng + distanceRadians * Math.sin(randomAngle);
    
    // Random rating between 3.0 and 5.0
    const rating = (3 + Math.random() * 2).toFixed(1);
    
    // Select random items from options
    const acceptedItems = acceptedItemsOptions[Math.floor(Math.random() * acceptedItemsOptions.length)];
    const hours = hoursOptions[Math.floor(Math.random() * hoursOptions.length)];
    const addressPrefix = addressPrefixes[Math.floor(Math.random() * addressPrefixes.length)];
    
    return {
      id: index + 1,
      name: recyclerNames[index % recyclerNames.length],
      address: `${addressPrefix}, ${Math.floor(Math.random() * 100) + 1}${Math.random() > 0.5 ? 'A' : 'B'}, City Area ${Math.floor(Math.random() * 10) + 1}`,
      hours: hours,
      phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      acceptedItems: acceptedItems,
      coordinates: {
        lat: randomLat,
        lng: randomLng,
      },
      rating: parseFloat(rating),
      distance: distanceKm.toFixed(1),
    };
  });
};

// Default recycler locations for Gorakhpur
export const defaultRecyclers = [
  {
    id: 1,
    name: "EcoRecycle Center",
    address: "123 Green St, Gorakhpur",
    hours: "Mon-Fri: 9 AM - 6 PM",
    phone: "+91 9876543210",
    acceptedItems: ["Batteries", "Computers", "Mobile Phones", "Printers"],
    coordinates: {
      lat: 26.7606,
      lng: 83.3732,
    },
    rating: 4.5,
    distance: 1.2,
  },
  {
    id: 2,
    name: "EcoWaste Solutions",
    address: "Tech Park, Innovation District",
    hours: "Mon-Fri: 8AM-8PM, Sat-Sun: 10AM-4PM",
    phone: "+91 98765 43211",
    acceptedItems: ["Computers", "Phones", "Printers", "Cables"],
    coordinates: { lat: 26.7550, lng: 83.3775 },
    rating: 4.5,
    distance: 2.4
  },
  {
    id: 3,
    name: "CleanTech Disposal",
    address: "Eco Zone, Green Valley",
    hours: "Mon-Sun: 24 hours (Dropbox)",
    phone: "+91 98765 43212",
    acceptedItems: ["Small Electronics", "Batteries", "Light Bulbs"],
    coordinates: { lat: 26.7589, lng: 83.3721 },
    rating: 4.2,
    distance: 3.1
  },
  {
    id: 4,
    name: "Green Planet Recycling",
    address: "Sustainability Lane, Eco District",
    hours: "Tue-Sat: 10AM-7PM, Sun-Mon: Closed",
    phone: "+91 98765 43213",
    acceptedItems: ["Computers", "Phones", "Tablets", "Gaming Consoles", "TVs"],
    coordinates: { lat: 26.7634, lng: 83.3812 },
    rating: 4.9,
    distance: 3.8
  },
  {
    id: 5,
    name: "Eco-Friendly Waste Management",
    address: "Recycling Drive, Industrial Zone",
    hours: "Mon-Fri: 9AM-5PM, Sat-Sun: Closed",
    phone: "+91 98765 43214",
    acceptedItems: ["Industrial Electronics", "Office Equipment", "Servers"],
    coordinates: { lat: 26.7523, lng: 83.3654 },
    rating: 4.6,
    distance: 4.5
  }
]; 