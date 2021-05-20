const MAX_SIZE_DESCRIPTION = 5;

const MAX_SIZE_PHOTO = 6;

const COUNT_PHOTO = 50;

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'Dresden'];

const OFFERS = {
  'radio': {
    'title': 'Choose the radio station',
    'price': 60,
    'name': 'radio',
  },
  'non_smoking': {
    'title': 'Non-smoking driver',
    'price': 30,
    'name': 'non_smoking',
  },
  'conditioning': {
    'title': 'Air conditioning',
    'price': 20,
    'name': 'conditioning',
  },
  'wc': {
    'title': 'WC',
    'price': 15,
    'name': 'wc',
  },
  'armchair': {
    'title': 'Comfortable armchairs',
    'price': 60,
    'name': 'armchair',
  },
  'tv': {
    'title': 'TV near the armchairs',
    'price': 80,
    'name': 'tv',
  },
  'canteen': {
    'title': 'Сanteen and drinks bar',
    'price': 60,
    'name': 'canteen',
  },
  'music': {
    'title': 'Live music on board',
    'price': 120,
    'name': 'music',
  },
  'restaurant': {
    'title': 'Restaurant',
    'price': 100,
    'name': 'restaurant',
  },
  'guid': {
    'title': 'Guided tour',
    'price': 180,
    'name': 'guid',
  },
  'ship': {
    'title': 'Ship',
    'price': 300,
    'name': 'ship',
  },
  'taxi': {
    'title': 'Taxi',
    'price': 60,
    'name': 'taxi',
  },
  'train': {
    'title': 'Train',
    'price': 100,
    'name': 'train',
  },
  'bus': {
    'title': 'Bus',
    'price': 30,
    'name': 'bus',
  },
  'electric': {
    'title': 'Electric car',
    'price': 300,
    'name': 'electric',
  },
  'trailer': {
    'title': 'Trailer on wheels',
    'price': 300,
    'name': 'trailer',
  },
  'view': {
    'title': 'Wonderful view from the room',
    'price': 150,
    'name': 'view',
  },
  'balcony': {
    'title': 'Large balcony or terrace',
    'price': 150,
    'name': 'balcony',
  },
  'breakfast': {
    'title': 'Breakfast included',
    'price': 30,
    'name': 'breakfast',
  },
  'child': {
    'title': 'Extra bed for a child',
    'price': 50,
    'name': 'child',
  },
  'pet': {
    'title': 'Extra space for a pet',
    'price': 70,
    'name': 'pet',
  },
  'photography': {
    'title': 'Professional photography',
    'price': 200,
    'name': 'photography',
  },
  'heliicopter': {
    'title': 'Helicopter tour',
    'price': 300,
    'name': 'heliicopter',
  },
  'vegetarian': {
    'title': 'Vegetarian cuisine',
    'price': 60,
    'name': 'vegetarian',
  },
  'local_kitchen': {
    'title': 'Local kitchen',
    'price': 80,
    'name': 'local_kitchen',
  },
  'snack': {
    'title': 'Quick snack',
    'price': 20,
    'name': 'snack',
  },
  'coffe': {
    'title': 'Coffee and drinks',
    'price': 10,
    'name': 'coffe',
  },
};

const TYPE_WITH_OFFERS = {
  'taxi': [OFFERS.radio, OFFERS.non_smoking, OFFERS.conditioning],
  'bus': [OFFERS.conditioning, OFFERS.wc, OFFERS.armchair, OFFERS.tv, OFFERS.canteen, OFFERS.coffe],
  'train': [OFFERS.conditioning, OFFERS.armchair, OFFERS.tv, OFFERS.canteen, OFFERS.coffe],
  'ship': [OFFERS.music, OFFERS.restaurant, OFFERS.guid, OFFERS.canteen],
  'transport': [OFFERS.ship, OFFERS.taxi, OFFERS.train, OFFERS.bus],
  'drive': [OFFERS.non_smoking, OFFERS.conditioning, OFFERS.electric, OFFERS.trailer],
  'flight': [OFFERS.armchair, OFFERS.tv, OFFERS.canteen, OFFERS.coffe],
  'check-in': [OFFERS.view, OFFERS.balcony, OFFERS.breakfast, OFFERS.child, OFFERS.pet],
  'sightseeing': [OFFERS.guid, OFFERS.photography, OFFERS.heliicopter, OFFERS.local_kitchen],
  'restaurant': [OFFERS.vegetarian, OFFERS.local_kitchen, OFFERS.snack, OFFERS.coffe],
};

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

export { MAX_SIZE_PHOTO, MAX_SIZE_DESCRIPTION, DESCRIPTIONS, COUNT_PHOTO, TYPE_WITH_OFFERS, CITIES,OFFERS };
