const MAX_SIZE_DESCRIPTION = 5;

const MAX_SIZE_PHOTO = 6;

const COUNT_PHOTO = 50;

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'Dresden'];

const OFFEFS = {
  'radio': {
    'title': 'Choose the radio station',
    'price': 60,
  },
  'non_smoking': {
    'title': 'Non-smoking driver',
    'price': 30,
  },
  'conditioning': {
    'title': 'Air conditioning',
    'price': 20,
  },
  'wc': {
    'title': 'WC',
    'price': 15,
  },
  'armchair': {
    'title': 'Comfortable armchairs',
    'price': 60,
  },
  'tv': {
    'title': 'TV near the armchairs',
    'price': 80,
  },
  'canteen': {
    'title': 'Сanteen and drinks bar',
    'price': 60,
  },
  'music': {
    'title': 'Live music on board',
    'price': 120,
  },
  'restaurant': {
    'title': 'Restaurant',
    'price': 100,
  },
  'guid': {
    'title': 'Guided tour',
    'price': 180,
  },
  'ship': {
    'title': 'Ship',
    'price': 300,
  },
  'taxi': {
    'title': 'Taxi',
    'price': 60,
  },
  'train': {
    'title': 'Train',
    'price': 100,
  },
  'bus': {
    'title': 'Bus',
    'price': 30,
  },
  'electric': {
    'title': 'Electric car',
    'price': 300,
  },
  'trailer': {
    'title': 'Trailer on wheels',
    'price': 300,
  },
  'view': {
    'title': 'Wonderful view from the room',
    'price': 150,
  },
  'balcony': {
    'title': 'Large balcony or terrace',
    'price': 150,
  },
  'breakfast': {
    'title': 'Breakfast included',
    'price': 30,
  },
  'child': {
    'title': 'Extra bed for a child',
    'price': 50,
  },
  'pet': {
    'title': 'Extra space for a pet',
    'price': 70,
  },
  'photography': {
    'title': 'Professional photography',
    'price': 200,
  },
  'heliicopter': {
    'title': 'Helicopter tour',
    'price': 300,
  },
  'vegetarian': {
    'title': 'Vegetarian cuisine',
    'price': 60,
  },
  'local_kitchen': {
    'title': 'Local kitchen',
    'price': 80,
  },
  'snack': {
    'title': 'Quick snack',
    'price': 20,
  },
  'coffe': {
    'title': 'Coffee and drinks',
    'price': 10,
  },
};

const TYPE_WITH_OFFERS = {
  'taxi': [OFFEFS.radio, OFFEFS.non_smoking, OFFEFS.conditioning],
  'bus': [OFFEFS.conditioning, OFFEFS.wc, OFFEFS.armchair, OFFEFS.tv, OFFEFS.canteen, OFFEFS.coffe],
  'train': [OFFEFS.conditioning, OFFEFS.armchair, OFFEFS.tv, OFFEFS.canteen, OFFEFS.coffe],
  'ship': [OFFEFS.music, OFFEFS.restaurant, OFFEFS.guid, OFFEFS.canteen],
  'transport': [OFFEFS.ship, OFFEFS.taxi, OFFEFS.train, OFFEFS.bus],
  'drive': [OFFEFS.non_smoking, OFFEFS.conditioning, OFFEFS.electric, OFFEFS.trailer],
  'flight': [OFFEFS.armchair, OFFEFS.tv, OFFEFS.canteen, OFFEFS.coffe],
  'check-in': [OFFEFS.view, OFFEFS.balcony, OFFEFS.breakfast, OFFEFS.child, OFFEFS.pet],
  'sightseeing': [OFFEFS.guid, OFFEFS.photography, OFFEFS.heliicopter, OFFEFS.local_kitchen],
  'restaurant': [OFFEFS.vegetarian, OFFEFS.local_kitchen, OFFEFS.snack, OFFEFS.coffe],
};

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

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  'Cras aliquet varius magna, non porta ligula feugiat eget. ',
  'Fusce tristique felis at fermentum pharetra. ',
  'Aliquam id orci ut lectus varius viverra. ',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
  'Sed sed nisi sed augue convallis suscipit in sed felis. ',
  'Aliquam erat volutpat. ',
  'Nunc fermentum tortor ac porta dapibus. ',
  'In rutrum ac purus sit amet tempus. ',
];

export { MAX_SIZE_PHOTO, MAX_SIZE_DESCRIPTION, DESCRIPTIONS, ALL_OFFERS, COUNT_PHOTO, TYPE_WITH_OFFERS, CITIES };
