export interface Guide {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  visitedCount: number;
  since: string;
  languages: string[];
  specialties: Specialty[];
  description: string;
  reviews: Review[];
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Tour {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  country: string;
  price: number;
  discount?: number;
  duration: string;
  languages: string[];
  description: string;
  highlights: string[];
  guideId: string;
}

export const guides: Guide[] = [
  {
    id: "guide1",
    name: "Alexander",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5.0,
    reviewCount: 722,
    visitedCount: 3643,
    since: "1995",
    languages: ["English", "Russian", "Uzbek"],
    specialties: [
      {
        id: "spec1",
        name: "Mountain hiking & adventure trips",
        icon: "mountain",
        description:
          "You can travel with me to Chimgan, Humsan, Beldersay, and many other mountains.",
      },
      {
        id: "spec2",
        name: "Tashkent city tours",
        icon: "building",
        description: "History, sights, architecture, and hidden gems",
      },
      {
        id: "spec3",
        name: "Cultural & Historical Tours",
        icon: "landmark",
        description:
          "Visit ancient cities like Samarkand, Bukhara, and Khiva to discover Uzbekistan's fascinating history and architectural wonders",
      },
      {
        id: "spec4",
        name: "Food & Culinary Experiences",
        icon: "utensils",
        description:
          "Taste the best traditional Uzbek dishes, from plov to shashlik, while exploring local bazaars and restaurants",
      },
    ],
    description:
      "Experienced and passionate tour guide, ready to make your journey unforgettable! With deep knowledge of history, culture, and hidden gems, I provide engaging and insightful tours tailored to your interests.",
    reviews: [
      {
        id: "rev1",
        author: "Stephanie",
        rating: 5,
        comment:
          "Alexander was an excellent guide! His knowledge of Uzbekistan's history and culture was impressive. He took us to all the best spots and even found us the best restaurant for authentic plov!",
        date: "October 2023",
      },
      {
        id: "rev2",
        author: "Michael",
        rating: 5,
        comment:
          "Our tour with Alexander was the highlight of our trip. He's knowledgeable, friendly, and went above and beyond to make our experience special.",
        date: "September 2023",
      },
    ],
  },
  {
    id: "guide2",
    name: "Constantine",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    reviewCount: 348,
    visitedCount: 1541,
    since: "2010",
    languages: ["English", "French", "Uzbek"],
    specialties: [
      {
        id: "spec1",
        name: "Silk Road History",
        icon: "route",
        description:
          "Explore the ancient Silk Road routes and learn about the trading history",
      },
      {
        id: "spec2",
        name: "Architectural Tours",
        icon: "building",
        description: "Discover the unique Islamic architecture of Uzbekistan",
      },
    ],
    description:
      "Professional guide with over 10 years of experience. Specialized in architectural and historical tours across Uzbekistan.",
    reviews: [
      {
        id: "rev1",
        author: "Emma",
        rating: 5,
        comment:
          "Constantine was incredibly knowledgeable about the architecture and history. Highly recommend!",
        date: "November 2023",
      },
    ],
  },
];

export const tours: Tour[] = [
  {
    id: "tour1",
    title: "Samarkand One day Tour",
    image: "/placeholder.svg?height=200&width=300",
    rating: 5.0,
    reviewCount: 722,
    location: "Samarkand",
    country: "Uzbekistan",
    price: 450,
    discount: 25,
    duration: "1 day",
    languages: ["English", "Russian", "Uzbek"],
    description:
      "Explore Samarkand, one of the oldest cities in Central Asia and a major hub on the Great Silk Road, on this 1-day adventure from Tashkent. Explore the main attractions across the city to understand the rich history, magnificent art, and immerse yourself in the ancient wonders of Samarkand. Visit the Registan Square, Bibi-Khanym Mosque, the Shahi-Zinda Necropolis, Gur-Emir Mausoleum, and many other important sites.",
    highlights: [
      "Explore Samarkand, Uzbekistan on a 3-day tour from Dushanbe",
      "Uncover the ancient Silk Road history while you explore",
      "Two nights in a hotel and most meals are included",
      "Enjoy private tours in all destinations for a personalized experience",
    ],
    guideId: "guide1",
  },
  {
    id: "tour2",
    title: "Tashkent City Tour",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    reviewCount: 93,
    location: "Tashkent",
    country: "Uzbekistan",
    price: 950,
    discount: 15,
    duration: "1 day",
    languages: ["English", "French", "Uzbek"],
    description:
      "Discover the vibrant capital of Uzbekistan on this comprehensive city tour. Visit the main attractions including Independence Square, Amir Timur Square, and the historic Old City with its bazaars and mosques.",
    highlights: [
      "Visit the main squares and monuments of Tashkent",
      "Explore the historic Old City and its bazaars",
      "Learn about Uzbekistan's Soviet past and independent present",
      "Taste local cuisine at a traditional restaurant",
    ],
    guideId: "guide2",
  },
  {
    id: "tour3",
    title: "Registan Square - The Jewel of the Silk Road",
    image: "/placeholder.svg?height=200&width=300",
    rating: 5.0,
    reviewCount: 156,
    location: "Samarkand",
    country: "Uzbekistan",
    price: 350,
    duration: "3 days (approx.)",
    languages: ["English", "Russian", "German"],
    description:
      "Embark on a journey to Samarkand, one of the world's oldest cities and a major hub on the Great Silk Road, on this 3-day adventure from Tajikistan. Explore the main attractions across the city to understand the rich history, magnificent art, and immerse yourself in the ancient wonders of Samarkand. Visit the Registan Square, Bibi-Khanym Mosque, the Shahi-Zinda Necropolis, Gur-Emir Mausoleum, and many other important sites.",
    highlights: [
      "Explore Samarkand, Uzbekistan on a 3-day tour from Dushanbe",
      "Uncover the ancient Silk Road history while you explore",
      "Two nights in a hotel and most meals are included",
      "Enjoy private tours in all destinations for a personalized experience",
    ],
    guideId: "guide1",
  },
];

export const wishlist: string[] = ["tour1", "tour3"];
