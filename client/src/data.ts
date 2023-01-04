import {Food} from './app/shared/models/Food';
// import { Tag } from './app/shared/models/Tag';

export const sample_foods: Food[] = [
  {
    id:'1',
    name: 'Pizza Pepperoni',
    price: 10,
    stars: 4.5,
    imageUrl: 'assets/Farmhouse.jpg',
    tags: ['FastFood', 'Pizza', 'Lunch'],
  },
  {
    id:'2',
    name: 'Chicken Biryani',
    price: 20,
    stars: 4.7,
    imageUrl: 'assets/ChickenBiryani.webp',
    tags: ['SlowFood', 'Lunch'],
  },
  {
    id:'3',
    name: 'Chicken Fried Rice',
    price: 5,
    stars: 3.5,
    imageUrl: 'assets/ChickenFriedRice.jpg',
    tags: ['FastFood', 'FriedRice'],
  },
  {
    id:'4',
    name: 'Chicken Hakka Noodles',
    price: 2,
    stars: 3.3,
    imageUrl: 'assets/ChickenHakkaNoodles.webp',
    tags: ['FastFood', 'Fry'],
  },
  {
    id:'5',
    name: 'Chilli Chicken',
    price: 11,
    stars: 3.0,
    imageUrl: 'assets/ChiliChicken.jpg',
    tags: ['SlowFood', 'Chinese'],
  },
  {
    id:'6',
    name: 'Mutton Biryani',
    price: 9,
    stars: 4.0,
    imageUrl: 'assets/MuttonBiryani.jpg',
    tags: ['FastFood', 'Biryani', 'Lunch'],
  },
]

// export const sample_tags:Tag[] = [
//   { name: 'All', count: 6 },
//   { name: 'FastFood', count: 4 },
//   { name: 'Pizza', count: 2 },
//   { name: 'Lunch', count: 3 },
//   { name: 'SlowFood', count: 2 },
//   { name: 'Hamburger', count: 1 },
//   { name: 'Fry', count: 1 },
//   { name: 'Soup', count: 1 },
// ]