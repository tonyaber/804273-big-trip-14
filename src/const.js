const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const cities = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'Dresden'];

const offersClassName = ['luggage', 'comfort', 'meal', 'seats','train'];

const allOffers = [
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

export { TYPES, cities, allOffers, offersClassName };
