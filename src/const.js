const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'Dresden'];

const OFFERS_CLASS_NAME = ['luggage', 'comfort', 'meal', 'seats','train'];

const ALL_OFFERS = [
  {
    name: 'Add luggage',
    price: 30,
  },
  {
    name: 'Switch to comfort class',
    price: 100,
  },
  {
    name: 'Add meal',
    price: 15,
  },
  {
    name: 'Choose seats',
    price: 5,
  },
  {
    name: 'Travel by train',
    price: 40,
  },
];

export { TYPES, CITIES, OFFERS_CLASS_NAME, ALL_OFFERS };
