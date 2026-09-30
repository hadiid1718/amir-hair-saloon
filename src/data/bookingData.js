export const bookingProviders = [
  {
    id: 'asad',
    name: 'Asad',
    subtitle: 'Founder & Master Barber',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=500&q=88',
    services: [
      { id: 'asad-signature-cut', name: 'Signature Cut', price: 1800, duration: 45, description: 'Personalized cut & styling' },
      { id: 'asad-skin-fade', name: 'Skin Fade', price: 1800, duration: 50, description: 'Detailed fade with premium finish' },
      { id: 'asad-executive-grooming', name: 'Executive Grooming', price: 3200, duration: 75, description: 'Premium head-to-beard service' },
      { id: 'asad-skin-fade-beard', name: 'Skin Fade + Beard', price: 2600, duration: 65, description: 'Fade, shape & hot towel' },
      { id: 'asad-beard-sculpt', name: 'Beard Sculpt', price: 1000, duration: 30, description: 'Detailed beard design' },
      { id: 'asad-hot-towel', name: 'Hot Towel Ritual', price: 900, duration: 20, description: 'Relaxing towel service' },
      { id: 'asad-hair-spa', name: 'Hair Spa', price: 2500, duration: 45, description: 'Deep conditioning treatment' }
    ]
  },
  {
    id: 'stylist',
    name: 'Stylist',
    subtitle: 'Everyday grooming & modern cuts',
    services: [
      { id: 'stylist-classic-cut', name: 'Classic Cut', price: 1200, duration: 30, description: 'Clean cut, finish & styling' },
      { id: 'stylist-skin-fade', name: 'Skin Fade', price: 1500, duration: 45, description: 'Precision fade with finish' },
      { id: 'stylist-taper-fade', name: 'Taper Fade', price: 1500, duration: 45, description: 'Clean taper & styling' },
      { id: 'stylist-scissor-cut', name: 'Scissor Cut', price: 1600, duration: 45, description: 'Detailed scissor work' },
      { id: 'stylist-haircut-beard', name: 'Haircut + Beard', price: 2300, duration: 60, description: 'Complete grooming service' },
      { id: 'stylist-beard-trim', name: 'Beard Trim', price: 800, duration: 20, description: 'Shape, trim & finish' },
      { id: 'stylist-head-massage', name: 'Head Massage', price: 1000, duration: 15, description: '15-minute relaxation' }
    ]
  }
];

export const bookingSteps = [
  'Choose a professional',
  'Select a service',
  'Choose your date and time',
  'Confirm your booking'
];
