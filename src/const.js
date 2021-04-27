const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'Dresden'];

const FILTERS = ['Everything', 'Future', 'Past'];

const ALL_OFFERS = [
  {
    'type': 'taxi',
    'offers': [
      {
        'title': 'Choose the radio station',
        'price': 60,
      },
      {
        'title': 'Non-smoking driver',
        'price': 30,
      },
      {
        'title': 'Air conditioning',
        'price': 20,
      },
    ],
  },
  {
    'type': 'bus',
    'offers': [
      {
        'title': 'Air conditioning',
        'price': 30,
      },
      {
        'title': 'WC',
        'price': 15,
      },
      {
        'title': 'Comfortable armchairs',
        'price': 60,
      },
      {
        'title': 'TV near the armchairs',
        'price': 80,
      },
    ],
  },
  {
    'type': 'train',
    'offers': [
      {
        'title': 'Air conditioning',
        'price': 30,
      },
      {
        'title': 'Comfortable armchairs',
        'price': 60,
      },
      {
        'title': 'TV near the armchairs',
        'price': 80,
      },
      {
        'title': 'Сanteen and drinks bar',
        'price': 60,
      },
    ],
  },
  {
    'type': 'ship',
    'offers': [
      {
        'title': 'Live music on board',
        'price': 120,
      },
      {
        'title': 'Restaurant',
        'price': 100,
      },
      {
        'title': 'Guided tour',
        'price': 180,
      },
    ],
  },
  {
    'type': 'transport',
    'offers': [
      {
        'title': 'Ship',
        'price': 300,
      },
      {
        'title': 'Taxi',
        'price': 60,
      },
      {
        'title': 'Train',
        'price': 100,
      },
      {
        'title': 'Bus',
        'price': 30,
      },
    ],
  },
  {
    'type': 'drive',
    'offers': [
      {
        'title': 'Non-smoking car',
        'price': 30,
      },
      {
        'title': 'Air conditioning',
        'price': 60,
      },
      {
        'title': 'Electric car',
        'price': 300,
      },
      {
        'title': 'Trailer on wheels',
        'price': 300,
      },
    ],
  },
  {
    'type': 'flight',
    'offers': [
      {
        'title': 'Comfortable armchairs',
        'price': 60,
      },
      {
        'title': 'TV near the armchairs',
        'price': 80,
      },
      {
        'title': 'Сanteen and drinks bar',
        'price': 60,
      },
    ],
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'title': 'Wonderful view from the room',
        'price': 150,
      },
      {
        'title': 'Large balcony or terrace',
        'price': 150,
      },
      {
        'title': 'Breakfast included',
        'price': 30,
      },
      {
        'title': 'Extra large bed',
        'price': 10,
      },
      {
        'title': 'Extra bed for a child',
        'price': 50,
      },
      {
        'title': 'Extra space for a pet',
        'price': 70,
      },
    ],
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'title': 'Guided tour',
        'price': 200,
      },
      {
        'title': 'Professional photography',
        'price': 200,
      },
      {
        'title': 'Souvenirs',
        'price': 50,
      },
      {
        'title': 'Helicopter tour',
        'price': 300,
      },
    ],
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'title': 'Vegetarian cuisine',
        'price': 60,
      },
      {
        'title': 'Local kitchen',
        'price': 80,
      },
      {
        'title': 'Quick snack',
        'price': 20,
      },
      {
        'title': 'Coffee and drinks',
        'price': 10,
      },
    ],
  },
];

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const POINT_COUNT = 20;

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortListChecked = {
  DAY: 'checked',
  TIME: '',
  PRICE: '',
};
export { TYPES, CITIES, ALL_OFFERS, RenderPosition, POINT_COUNT, FILTERS, Mode, SortListChecked };
