// Load every portfolio image (image-1.jpeg ... image-15.jpeg) from src/assets/portfolio-images
const portfolioModules = import.meta.glob('../assets/portfolio-images/image-*.{jpeg,jpg,png,webp}', {
  eager: true,
  import: 'default'
});

// Sort numerically so image-2 comes before image-10
const portfolioImages = Object.entries(portfolioModules)
  .sort(([a], [b]) => {
    const numA = parseInt(a.match(/image-(\d+)/)?.[1] ?? '0', 10);
    const numB = parseInt(b.match(/image-(\d+)/)?.[1] ?? '0', 10);
    return numA - numB;
  })
  .map(([, url]) => url);

const MAP_QUERY = '30.1575,71.5249';
export const site = {
  name: 'Asad Hair Saloon',
  shortName: 'ASAD',
  tagline: "Redefining men's grooming.",
  description: 'Precision cuts, clean fades, sharp beard work, and an elevated studio experience for modern men.',
  address: 'Main Boulevard, Your City, Pakistan',
  city: 'Your City, Pakistan',
  phone: '+92 300 0000000',
  hours: 'Mon — Sun · 11:00 AM — 11:00 PM',
  instagramUrl: 'https://www.instagram.com/',
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`,
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`,
  bookingEmail: 'hello@asadhairsaloon.com'
};

export const media = {
  hero: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2200&q=88',
  studio: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2200&q=88',
  appointment: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=88',
  map: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?auto=format&fit=crop&w=1100&q=82',
  workCarousel: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=88',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1800&q=88',
    'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1800&q=88',
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=88',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=88',
  ],
  gallery: portfolioImages
};

export const team = [
  {
    id: 'asad',
    name: 'Asad',
    role: 'Founder & Master Barber',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1100&q=88',
    actionLabel: 'Book with Asad'
  },
  {
    id: 'stylist',
    name: 'Stylist',
    role: 'Available barber',
    placeholder: true,
    actionLabel: 'Book with'
  }
];

export const services = [
  {
    category: 'Haircuts',
    items: [
      ['Classic Cut', 'Rs. 1,200', 'Cut, finish & styling'],
      ['Skin Fade', 'Rs. 1,500', 'Precision fade with finish'],
      ['Taper Fade', 'Rs. 1,500', 'Clean taper & styling'],
      ['Scissor Cut', 'Rs. 1,600', 'Detailed scissor work'],
      ['Kids Cut', 'Rs. 1,000', 'For guests under 12']
    ]
  },
  {
    category: 'Hair & Beard',
    items: [
      ['Haircut + Beard', 'Rs. 2,300', 'Complete grooming service'],
      ['Skin Fade + Beard', 'Rs. 2,600', 'Fade, shape & hot towel'],
      ['Executive Grooming', 'Rs. 3,200', 'Premium head-to-beard service'],
      ['Hair + Beard Express', 'Rs. 2,000', 'Fast clean-up & finish']
    ]
  },
  {
    category: 'Beard',
    items: [
      ['Beard Trim', 'Rs. 800', 'Shape, trim & finish'],
      ['Beard Sculpt', 'Rs. 1,000', 'Detailed beard design'],
      ['Hot Towel Beard', 'Rs. 1,200', 'Steam, towel & styling'],
      ['Moustache Trim', 'Rs. 500', 'Sharp line and finish']
    ]
  },
  {
    category: 'Color',
    items: [
      ['Hair Color', 'Rs. 3,500', 'Professional full color'],
      ['Highlights', 'Rs. 4,500+', 'Custom highlights & toning'],
      ['Beard Color', 'Rs. 1,200', 'Natural-looking beard color'],
      ['Ammonia-Free Color', 'Rs. 4,500+', 'Gentler premium color']
    ]
  },
  {
    category: 'Treatment',
    items: [
      ['Hair Spa', 'Rs. 2,500', 'Deep conditioning treatment'],
      ['Protein Treatment', 'Rs. 4,000', 'Strength and smoothness'],
      ['Anti-Dandruff Care', 'Rs. 2,000', 'Scalp cleanse & treatment'],
      ['Keratin Treatment', 'Rs. 7,500+', 'Smoothing treatment']
    ]
  },
  {
    category: 'Massage',
    items: [
      ['Head Massage', 'Rs. 1,000', '15-minute relaxation'],
      ['Head & Shoulder', 'Rs. 1,500', '20-minute massage'],
      ['Hot Towel Ritual', 'Rs. 900', 'Relaxing towel service']
    ]
  },
  {
    category: 'Waxing',
    items: [
      ['Face Wax', 'Rs. 1,200', 'Gentle facial waxing'],
      ['Nose & Ear Wax', 'Rs. 700', 'Quick clean-up'],
      ['Full Beard Clean-up', 'Rs. 900', 'Edge and line precision']
    ]
  },
  {
    category: 'Care',
    items: [
      ['Express Facial', 'Rs. 1,800', 'Cleanse, exfoliate & hydrate'],
      ['Blackhead Clean-up', 'Rs. 1,500', 'Targeted skin refresh'],
      ['Scalp Detox', 'Rs. 1,700', 'Deep scalp cleanse']
    ]
  }
];

export const faqs = [
  {
    question: 'What are your hours of operation?',
    answer: 'We are open Monday to Sunday from 11:00 AM to 11:00 PM. Holiday hours may vary.'
  },
  {
    question: 'Do I need to book in advance?',
    answer: 'Walk-ins are welcome when a barber is available. Booking ahead is recommended for a specific time.'
  },
  {
    question: 'What services do you offer?',
    answer: 'Haircuts, fades, beard grooming, color, treatments, massage, waxing, facials and grooming packages.'
  },
  {
    question: 'Can I choose my barber?',
    answer: 'Yes. You can request a preferred barber when booking. Availability is shown by the salon team.'
  },
  {
    question: 'How does payment work?',
    answer: 'Payment can be completed at the saloon by cash or your available digital payment method.'
  },
  {
    question: 'Can I cancel or reschedule?',
    answer: 'Yes. Contact the saloon as early as possible so we can release or move the slot.'
  },
  {
    question: 'Do you accept kids?',
    answer: 'Yes. Kids cuts are available and are listed under the Haircuts category.'
  }
];

export const navigationSections = [
  { label: 'Team', id: 'team' },
  { label: 'Our Menu', id: 'menu' },
  { label: 'Our Work', id: 'work' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Visit Us', id: 'visit' }
];
