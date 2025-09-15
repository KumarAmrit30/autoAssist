// Note: Public assets should be referenced from "/assets/..." so Vite serves them correctly

export const carsData = [
  {
    id: "1",
    name: "Creta",
    brand: "Hyundai",
    price: "11.00 - 20.15 lakh",
    rating: 4.5,
    fuelType: "Petrol",
    transmission: "Manual",
    seating: 5,
    mileage: "17.4 kmpl",
    features: ["Sunroof", "Wireless Charging", "LED Headlights", "Touchscreen", "Cruise Control"],
    images: [
      "/assets/images/Creta/creta-n-line-exterior-right-front-three-quarter-25.webp",
      "/assets/images/Creta/creta-n-line-exterior-right-side-view-4.webp",
      "/assets/images/Creta/cretakingknightinnerkv-pc.webp",
      "/assets/images/Creta/hyundai-creta-left-rear-three-quarter0.webp"
    ]
  },
  {
    id: "2",
    name: "Seltos",
    brand: "Kia",
    price: "10.90 - 20.35 Lakh",
    images: [
      "/placeholder.svg"
    ],
    rating: 4.4,
    fuelType: "Diesel",
    transmission: "Automatic",
    seating: 5,
    mileage: "16.8 kmpl",
    features: ["360° Camera", "Ventilated Seats", "Wireless Charging", "Premium Audio"]
  },
  {
    id: "3",
    name: "XUV700",
    brand: "Mahindra",
    price: "13.45 - 25.15 Lakh",
    images: [
      "/placeholder.svg"
    ],
    rating: 4.6,
    fuelType: "Petrol",
    transmission: "Automatic",
    seating: 7,
    mileage: "13.1 kmpl",
    features: ["ADAS", "Sky Roof", "Premium Audio", "Wireless Charging", "360° Camera"]
  },
  {
    id: "4",
    name: "Harrier",
    brand: "Tata",
    price: "15.49 - 26.44 Lakh",
    images: [
      "/placeholder.svg"
    ],
    rating: 4.3,
    fuelType: "Diesel",
    transmission: "Automatic",
    seating: 5,
    mileage: "14.6 kmpl",
    features: ["JBL Audio", "Panoramic Sunroof", "Wireless Charging", "Terrain Modes"]
  },
  {
    id: "5",
    name: "Compass",
    brand: "Jeep",
    price: "18.99 - 31.99 Lakh",
    images: [
      "/placeholder.svg"
    ],
    rating: 4.2,
    fuelType: "Petrol",
    transmission: "Automatic",
    seating: 5,
    mileage: "14.2 kmpl",
    features: ["4x4", "Uconnect", "Dual Pane Sunroof", "Premium Interior"]
  },
  {
    id: "6",
    name: "Fortuner",
    brand: "Toyota",
    price: "33.43 - 51.44 Lakh",
    images: [
      "/placeholder.svg"
    ],
    rating: 4.7,
    fuelType: "Diesel",
    transmission: "Automatic",
    seating: 7,
    mileage: "10.0 kmpl",
    features: ["4WD", "Premium Audio", "Leather Seats", "Multi-terrain Select"]
  },
  {
    id: "7",
    name: "Swift",
    brand: "Maruti Suzuki",
    price: "6.49 - 9.64 Lakh",
    images: [
      "/placeholder.svg"
    ],
    rating: 4.1,
    fuelType: "Petrol",
    transmission: "Manual",
    seating: 5,
    mileage: "23.2 kmpl",
    features: ["Touchscreen", "Keyless Entry", "ABS", "Dual Airbags"]
  },
  {
    id: "8",
    name: "City",
    brand: "Honda",
    price: "11.82 - 16.35 Lakh",
    images: [
      "/placeholder.svg"
    ],
    rating: 4.4,
    fuelType: "Petrol",
    transmission: "CVT",
    seating: 5,
    mileage: "17.8 kmpl",
    features: ["Honda SENSING", "Sunroof", "Wireless Charging", "Premium Audio"]
  }
];

export const getCarById = (id: string) => {
  return carsData.find(car => car.id === id);
};

export const searchCars = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return carsData.filter(car => 
    car.name.toLowerCase().includes(lowerQuery) ||
    car.brand.toLowerCase().includes(lowerQuery) ||
    car.fuelType.toLowerCase().includes(lowerQuery)
  );
};