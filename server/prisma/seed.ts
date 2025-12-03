import { PrismaClient, Supermarket, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

const sampleRecipes = [
  {
    title: 'Crispy Air Fryer Chicken Wings',
    description: 'Perfectly crispy chicken wings with minimal oil. Great for game day or as a quick dinner.',
    supermarket: Supermarket.ALDI,
    sourceUrl: 'https://www.aldi.co.uk/recipes/chicken-wings',
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800',
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    difficulty: Difficulty.EASY,
    ingredients: [
      '1kg chicken wings',
      '2 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp paprika',
      '1 tsp salt',
      '1/2 tsp black pepper',
      'Optional: hot sauce for serving'
    ],
    instructions: [
      'Pat chicken wings dry with paper towels',
      'In a large bowl, toss wings with oil and all seasonings',
      'Preheat air fryer to 180°C',
      'Place wings in a single layer in the air fryer basket',
      'Cook for 25 minutes, flipping halfway through',
      'Increase temperature to 200°C for final 5 minutes for extra crispiness',
      'Serve hot with your favorite dipping sauce'
    ],
    tags: ['chicken', 'wings', 'crispy', 'easy', 'party food']
  },
  {
    title: 'Air Fryer Salmon with Lemon',
    description: 'Tender, flaky salmon fillets with a bright lemon flavor. Ready in under 15 minutes.',
    supermarket: Supermarket.WAITROSE,
    sourceUrl: 'https://www.waitrose.com/recipes/salmon',
    imageUrl: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800',
    prepTime: 5,
    cookTime: 12,
    servings: 2,
    difficulty: Difficulty.EASY,
    ingredients: [
      '2 salmon fillets (150g each)',
      '1 tbsp olive oil',
      '1 lemon, sliced',
      '2 cloves garlic, minced',
      'Fresh dill',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Brush salmon fillets with olive oil',
      'Season with salt, pepper, and minced garlic',
      'Place lemon slices on top of each fillet',
      'Preheat air fryer to 180°C',
      'Cook salmon for 10-12 minutes until flaky',
      'Garnish with fresh dill before serving'
    ],
    tags: ['salmon', 'fish', 'healthy', 'quick', 'lemon']
  },
  {
    title: 'Vegetable Spring Rolls',
    description: 'Crispy vegetable spring rolls without deep frying. Perfect as a starter or snack.',
    supermarket: Supermarket.TESCO,
    sourceUrl: 'https://www.tesco.com/recipes/spring-rolls',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
    prepTime: 20,
    cookTime: 12,
    servings: 6,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '12 spring roll wrappers',
      '200g shredded cabbage',
      '1 large carrot, julienned',
      '100g bean sprouts',
      '2 spring onions, sliced',
      '2 tbsp soy sauce',
      '1 tsp sesame oil',
      'Cooking spray'
    ],
    instructions: [
      'Mix vegetables with soy sauce and sesame oil',
      'Place 2 tbsp filling on each wrapper',
      'Roll tightly, sealing edges with water',
      'Spray rolls lightly with cooking spray',
      'Preheat air fryer to 180°C',
      'Cook for 10-12 minutes, turning halfway',
      'Serve with sweet chili sauce'
    ],
    tags: ['vegetarian', 'spring rolls', 'asian', 'appetizer']
  },
  {
    title: 'Air Fryer Steak with Garlic Butter',
    description: 'Juicy, perfectly cooked steak with rich garlic butter. Restaurant quality at home.',
    supermarket: Supermarket.MARKS_AND_SPENCER,
    sourceUrl: 'https://www.marksandspencer.com/recipes/steak',
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800',
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '2 ribeye steaks (250g each)',
      '2 tbsp olive oil',
      'Sea salt and black pepper',
      '50g butter, softened',
      '3 cloves garlic, minced',
      'Fresh parsley, chopped',
      '1 tsp lemon juice'
    ],
    instructions: [
      'Bring steaks to room temperature for 30 minutes',
      'Rub with olive oil, salt, and pepper',
      'Preheat air fryer to 200°C',
      'Cook steaks for 10-12 minutes for medium-rare, flipping halfway',
      'Mix butter with garlic, parsley, and lemon juice',
      'Let steaks rest for 5 minutes',
      'Top with garlic butter before serving'
    ],
    tags: ['steak', 'beef', 'garlic butter', 'dinner', 'luxury']
  },
  {
    title: 'Crispy Air Fryer Chips',
    description: 'Golden, crispy chips with a fluffy interior. Much healthier than deep-fried.',
    supermarket: Supermarket.ALDI,
    sourceUrl: 'https://www.aldi.co.uk/recipes/chips',
    imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: Difficulty.EASY,
    ingredients: [
      '4 large potatoes',
      '2 tbsp olive oil',
      '1 tsp salt',
      '1/2 tsp paprika (optional)',
      'Fresh herbs for garnish'
    ],
    instructions: [
      'Cut potatoes into even-sized chips',
      'Soak in cold water for 30 minutes',
      'Drain and pat completely dry',
      'Toss with oil, salt, and paprika',
      'Preheat air fryer to 180°C',
      'Cook for 15-20 minutes, shaking basket every 5 minutes',
      'Increase to 200°C for final 3 minutes for extra crispiness'
    ],
    tags: ['chips', 'potatoes', 'side dish', 'crispy', 'easy']
  },
  {
    title: 'Air Fryer Falafel',
    description: 'Crispy on the outside, soft on the inside. A healthy Middle Eastern favorite.',
    supermarket: Supermarket.WAITROSE,
    sourceUrl: 'https://www.waitrose.com/recipes/falafel',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '400g chickpeas, drained',
      '1 small onion, chopped',
      '3 cloves garlic',
      'Fresh parsley and coriander',
      '1 tsp cumin',
      '1 tsp coriander powder',
      '2 tbsp flour',
      'Salt and pepper',
      'Cooking spray'
    ],
    instructions: [
      'Blend chickpeas, onion, garlic, and herbs in food processor',
      'Add spices, flour, salt, and pepper',
      'Form mixture into small balls',
      'Spray lightly with cooking spray',
      'Preheat air fryer to 180°C',
      'Cook for 12-15 minutes, turning halfway',
      'Serve in pita with tahini sauce'
    ],
    tags: ['falafel', 'vegetarian', 'middle eastern', 'chickpeas', 'healthy']
  },
  {
    title: 'Air Fryer Bacon',
    description: 'Perfectly crispy bacon without the mess. Quick breakfast solution.',
    supermarket: Supermarket.TESCO,
    sourceUrl: 'https://www.tesco.com/recipes/bacon',
    imageUrl: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=800',
    prepTime: 2,
    cookTime: 10,
    servings: 4,
    difficulty: Difficulty.EASY,
    ingredients: [
      '8 rashers of bacon',
      'No additional ingredients needed'
    ],
    instructions: [
      'Arrange bacon in a single layer in air fryer basket',
      'Preheat air fryer to 180°C',
      'Cook for 8-10 minutes depending on thickness',
      'No need to flip',
      'Remove when desired crispiness is reached',
      'Drain on paper towels before serving'
    ],
    tags: ['bacon', 'breakfast', 'quick', 'easy', 'crispy']
  },
  {
    title: 'Stuffed Bell Peppers',
    description: 'Colorful bell peppers stuffed with seasoned rice and vegetables.',
    supermarket: Supermarket.MARKS_AND_SPENCER,
    sourceUrl: 'https://www.marksandspencer.com/recipes/stuffed-peppers',
    imageUrl: 'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=800',
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '4 large bell peppers',
      '200g cooked rice',
      '1 onion, diced',
      '200g mushrooms, chopped',
      '100g sweetcorn',
      '100g grated cheese',
      '2 tbsp tomato paste',
      'Italian herbs',
      'Salt and pepper'
    ],
    instructions: [
      'Cut tops off peppers and remove seeds',
      'Mix rice, vegetables, herbs, and half the cheese',
      'Stuff peppers with mixture',
      'Top with remaining cheese',
      'Preheat air fryer to 160°C',
      'Cook for 20-25 minutes until peppers are tender',
      'Serve hot with a side salad'
    ],
    tags: ['vegetarian', 'stuffed peppers', 'rice', 'healthy', 'dinner']
  },
  {
    title: 'Air Fryer Prawns',
    description: 'Succulent garlic prawns ready in minutes. Perfect for pasta or as a starter.',
    supermarket: Supermarket.WAITROSE,
    sourceUrl: 'https://www.waitrose.com/recipes/prawns',
    imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800',
    prepTime: 10,
    cookTime: 8,
    servings: 2,
    difficulty: Difficulty.EASY,
    ingredients: [
      '300g raw king prawns',
      '3 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tsp paprika',
      'Juice of 1 lemon',
      'Fresh parsley',
      'Salt and pepper'
    ],
    instructions: [
      'Marinate prawns with garlic, oil, paprika, and lemon juice',
      'Let sit for 10 minutes',
      'Preheat air fryer to 180°C',
      'Arrange prawns in a single layer',
      'Cook for 6-8 minutes until pink and cooked through',
      'Garnish with fresh parsley',
      'Serve immediately'
    ],
    tags: ['prawns', 'seafood', 'garlic', 'quick', 'healthy']
  },
  {
    title: 'Air Fryer Chocolate Brownies',
    description: 'Fudgy chocolate brownies with a crispy top. No oven required!',
    supermarket: Supermarket.ALDI,
    sourceUrl: 'https://www.aldi.co.uk/recipes/brownies',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800',
    prepTime: 15,
    cookTime: 20,
    servings: 8,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '200g dark chocolate',
      '150g butter',
      '200g sugar',
      '3 eggs',
      '100g plain flour',
      '50g cocoa powder',
      'Pinch of salt',
      'Optional: chocolate chips'
    ],
    instructions: [
      'Melt chocolate and butter together',
      'Whisk in sugar and eggs',
      'Fold in flour, cocoa, and salt',
      'Pour into greased air fryer-safe pan',
      'Preheat air fryer to 160°C',
      'Bake for 18-20 minutes until set but still fudgy',
      'Cool completely before cutting'
    ],
    tags: ['brownies', 'chocolate', 'dessert', 'baking', 'sweet']
  },
  {
    title: 'Air Fryer Roasted Vegetables',
    description: 'Perfectly roasted mixed vegetables with herbs. Healthy and delicious side dish.',
    supermarket: Supermarket.TESCO,
    sourceUrl: 'https://www.tesco.com/recipes/roasted-vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: Difficulty.EASY,
    ingredients: [
      '2 courgettes, chopped',
      '1 red pepper, chopped',
      '1 yellow pepper, chopped',
      '200g cherry tomatoes',
      '1 red onion, wedged',
      '3 tbsp olive oil',
      '2 tsp mixed herbs',
      'Salt and pepper'
    ],
    instructions: [
      'Cut all vegetables into similar-sized pieces',
      'Toss with olive oil, herbs, salt, and pepper',
      'Preheat air fryer to 180°C',
      'Cook for 15-20 minutes, shaking basket every 5 minutes',
      'Vegetables should be tender and lightly charred',
      'Serve as a side or add to pasta'
    ],
    tags: ['vegetables', 'vegan', 'healthy', 'side dish', 'roasted']
  },
  {
    title: 'Air Fryer Fish and Chips',
    description: 'Classic British fish and chips made healthier in the air fryer.',
    supermarket: Supermarket.MARKS_AND_SPENCER,
    sourceUrl: 'https://www.marksandspencer.com/recipes/fish-chips',
    imageUrl: 'https://images.unsplash.com/photo-1580217593608-61931cefc821?w=800',
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '2 cod fillets',
      '100g breadcrumbs',
      '50g flour',
      '1 egg, beaten',
      '3 large potatoes',
      '2 tbsp olive oil',
      'Salt and pepper',
      'Lemon wedges'
    ],
    instructions: [
      'Cut potatoes into chips and toss with 1 tbsp oil',
      'Cook chips at 180°C for 15 minutes',
      'Meanwhile, coat fish in flour, egg, then breadcrumbs',
      'Remove chips and add fish to air fryer',
      'Cook fish at 180°C for 10 minutes',
      'Return chips to air fryer for final 5 minutes',
      'Serve with lemon wedges and tartar sauce'
    ],
    tags: ['fish', 'chips', 'british', 'cod', 'dinner']
  },
  {
    title: 'Air Fryer Mozzarella Sticks',
    description: 'Crispy, gooey mozzarella sticks perfect for snacking or party food.',
    supermarket: Supermarket.ALDI,
    sourceUrl: 'https://www.aldi.co.uk/recipes/mozzarella-sticks',
    imageUrl: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=800',
    prepTime: 20,
    cookTime: 8,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '250g mozzarella cheese',
      '100g flour',
      '2 eggs, beaten',
      '150g breadcrumbs',
      '1 tsp Italian herbs',
      '1/2 tsp garlic powder',
      'Cooking spray',
      'Marinara sauce for dipping'
    ],
    instructions: [
      'Cut mozzarella into sticks and freeze for 30 minutes',
      'Mix breadcrumbs with herbs and garlic powder',
      'Coat sticks in flour, egg, then breadcrumb mixture',
      'Double coat for extra crispiness',
      'Spray with cooking spray',
      'Preheat air fryer to 180°C',
      'Cook for 6-8 minutes until golden',
      'Serve immediately with marinara sauce'
    ],
    tags: ['mozzarella', 'cheese', 'appetizer', 'party food', 'crispy']
  },
  {
    title: 'Air Fryer Pork Chops',
    description: 'Juicy pork chops with a flavorful herb crust. Quick weeknight dinner.',
    supermarket: Supermarket.WAITROSE,
    sourceUrl: 'https://www.waitrose.com/recipes/pork-chops',
    imageUrl: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: Difficulty.EASY,
    ingredients: [
      '2 pork chops (200g each)',
      '2 tbsp olive oil',
      '1 tsp dried thyme',
      '1 tsp dried rosemary',
      '1 tsp garlic powder',
      '1 tsp paprika',
      'Salt and pepper'
    ],
    instructions: [
      'Pat pork chops dry',
      'Rub with olive oil and all seasonings',
      'Let rest for 10 minutes',
      'Preheat air fryer to 180°C',
      'Cook for 12-15 minutes, flipping halfway',
      'Internal temperature should reach 63°C',
      'Rest for 5 minutes before serving'
    ],
    tags: ['pork', 'chops', 'herbs', 'dinner', 'quick']
  },
  {
    title: 'Air Fryer Onion Rings',
    description: 'Crispy, golden onion rings without deep frying. Perfect side or snack.',
    supermarket: Supermarket.TESCO,
    sourceUrl: 'https://www.tesco.com/recipes/onion-rings',
    imageUrl: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=800',
    prepTime: 15,
    cookTime: 12,
    servings: 4,
    difficulty: Difficulty.EASY,
    ingredients: [
      '2 large onions',
      '100g flour',
      '200ml buttermilk',
      '150g breadcrumbs',
      '1 tsp paprika',
      '1/2 tsp cayenne pepper',
      'Salt and pepper',
      'Cooking spray'
    ],
    instructions: [
      'Slice onions into 1cm thick rings',
      'Separate into individual rings',
      'Mix breadcrumbs with paprika, cayenne, salt, and pepper',
      'Dip rings in flour, buttermilk, then breadcrumbs',
      'Spray with cooking spray',
      'Preheat air fryer to 180°C',
      'Cook for 10-12 minutes until golden',
      'Serve with ranch or aioli'
    ],
    tags: ['onion rings', 'crispy', 'side dish', 'snack', 'party food']
  },
  {
    title: 'Air Fryer Chicken Breast',
    description: 'Perfectly cooked, juicy chicken breast every time. Meal prep friendly.',
    supermarket: Supermarket.MARKS_AND_SPENCER,
    sourceUrl: 'https://www.marksandspencer.com/recipes/chicken-breast',
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800',
    prepTime: 5,
    cookTime: 18,
    servings: 2,
    difficulty: Difficulty.EASY,
    ingredients: [
      '2 chicken breasts',
      '2 tbsp olive oil',
      '1 tsp garlic powder',
      '1 tsp onion powder',
      '1 tsp paprika',
      'Salt and pepper',
      'Fresh herbs for garnish'
    ],
    instructions: [
      'Pound chicken to even thickness',
      'Rub with oil and all seasonings',
      'Preheat air fryer to 180°C',
      'Cook for 16-18 minutes, flipping halfway',
      'Check internal temperature reaches 74°C',
      'Rest for 5 minutes',
      'Slice and serve with your favorite sides'
    ],
    tags: ['chicken', 'breast', 'protein', 'meal prep', 'healthy']
  },
  {
    title: 'Air Fryer Apple Crumble',
    description: 'Warm, comforting apple crumble with a crispy topping. Classic British dessert.',
    supermarket: Supermarket.WAITROSE,
    sourceUrl: 'https://www.waitrose.com/recipes/apple-crumble',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: Difficulty.EASY,
    ingredients: [
      '4 apples, peeled and sliced',
      '50g sugar',
      '1 tsp cinnamon',
      '100g flour',
      '75g butter, cold',
      '50g brown sugar',
      '50g oats',
      'Vanilla ice cream to serve'
    ],
    instructions: [
      'Toss apples with sugar and cinnamon',
      'Place in air fryer-safe dish',
      'Rub butter into flour until crumbly',
      'Mix in brown sugar and oats',
      'Sprinkle crumble over apples',
      'Preheat air fryer to 160°C',
      'Cook for 18-20 minutes until golden',
      'Serve warm with ice cream'
    ],
    tags: ['apple', 'crumble', 'dessert', 'british', 'comfort food']
  },
  {
    title: 'Air Fryer Lamb Chops',
    description: 'Tender lamb chops with rosemary and garlic. Elegant dinner in minutes.',
    supermarket: Supermarket.MARKS_AND_SPENCER,
    sourceUrl: 'https://www.marksandspencer.com/recipes/lamb-chops',
    imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800',
    prepTime: 10,
    cookTime: 12,
    servings: 2,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '4 lamb chops',
      '2 tbsp olive oil',
      '3 cloves garlic, minced',
      '2 sprigs fresh rosemary',
      '1 tsp Dijon mustard',
      'Salt and pepper',
      'Lemon wedges'
    ],
    instructions: [
      'Marinate lamb with oil, garlic, rosemary, and mustard',
      'Let rest for 30 minutes at room temperature',
      'Season with salt and pepper',
      'Preheat air fryer to 200°C',
      'Cook for 10-12 minutes for medium-rare',
      'Flip halfway through cooking',
      'Rest for 5 minutes before serving with lemon'
    ],
    tags: ['lamb', 'chops', 'rosemary', 'garlic', 'elegant']
  },
  {
    title: 'Air Fryer Sausage Rolls',
    description: 'Flaky, golden sausage rolls perfect for parties or lunch boxes.',
    supermarket: Supermarket.ALDI,
    sourceUrl: 'https://www.aldi.co.uk/recipes/sausage-rolls',
    imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800',
    prepTime: 20,
    cookTime: 15,
    servings: 8,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '400g sausage meat',
      '320g puff pastry',
      '1 small onion, finely chopped',
      '1 tsp dried sage',
      '1 egg, beaten',
      'Sesame seeds (optional)',
      'Salt and pepper'
    ],
    instructions: [
      'Mix sausage meat with onion, sage, salt, and pepper',
      'Roll out pastry and cut into rectangles',
      'Place sausage mixture along one edge',
      'Roll up and seal with egg wash',
      'Cut into individual rolls',
      'Brush with egg and sprinkle with sesame seeds',
      'Preheat air fryer to 180°C',
      'Cook for 12-15 minutes until golden'
    ],
    tags: ['sausage rolls', 'pastry', 'party food', 'british', 'lunch']
  },
  {
    title: 'Air Fryer Tofu',
    description: 'Crispy tofu cubes perfect for stir-fries or Buddha bowls. Vegan protein.',
    supermarket: Supermarket.TESCO,
    sourceUrl: 'https://www.tesco.com/recipes/tofu',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: Difficulty.EASY,
    ingredients: [
      '400g firm tofu',
      '2 tbsp cornflour',
      '2 tbsp soy sauce',
      '1 tbsp sesame oil',
      '1 tsp garlic powder',
      '1 tsp ginger powder',
      'Sesame seeds for garnish'
    ],
    instructions: [
      'Press tofu to remove excess water',
      'Cut into 2cm cubes',
      'Toss with cornflour until coated',
      'Mix soy sauce, sesame oil, and spices',
      'Toss tofu in sauce mixture',
      'Preheat air fryer to 180°C',
      'Cook for 12-15 minutes, shaking basket every 5 minutes',
      'Garnish with sesame seeds'
    ],
    tags: ['tofu', 'vegan', 'protein', 'asian', 'crispy']
  }
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing recipes
  await prisma.recipe.deleteMany({});
  console.log('🗑️  Cleared existing recipes');

  // Insert sample recipes
  for (const recipe of sampleRecipes) {
    await prisma.recipe.create({
      data: recipe,
    });
  }

  console.log(`✅ Seeded ${sampleRecipes.length} recipes successfully!`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

