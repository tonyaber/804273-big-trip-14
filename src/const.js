const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const cities = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'Dresden'];

const offersClassName = ['luggage', 'comfort', 'meal', 'seats','train'];

const allOffers = [
  {
    name: 'Add luggage',
    price: 30,
    id: 0,
  },
  {
    name: 'Switch to comfort class',
    price: 100,
    id: 1,
  },
  {
    name: 'Add meal',
    price: 15,
    id: 2,
  },
  {
    name: 'Choose seats',
    price: 5,
    id: 3,
  },
  {
    name: 'Travel by train',
    price: 40,
    id: 4,
  },
];

export { types, cities, allOffers, offersClassName };
