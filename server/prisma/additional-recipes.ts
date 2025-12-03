// Additional recipes from all supermarkets to add to seed.ts
// This file contains recipes to append to the main seed file

import { Supermarket, Difficulty } from '@prisma/client';

export const additionalRecipes = [
  // Additional ALDI Recipes
  {
    title: 'Air Fryer Crispy Prawn Toast Bites',
    description: 'Golden prawn toast bites with a crispy exterior. Perfect party appetizer.',
    supermarket: Supermarket.ALDI,
    sourceUrl: 'https://www.aldi.co.uk/recipes/collections/air-fryer/air-fryer-crispy-prawn-toast-bites',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    prepTime: 15,
    cookTime: 8,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '200g prawns, minced',
      '2 spring onions, finely chopped',
      '1 tsp ginger, grated',
      '1 tsp soy sauce',
      '1 tsp sesame oil',
      '4 slices white bread',
      '1 egg, beaten',
      'Sesame seeds',
      'Cooking spray'
    ],
    instructions: [
      'Mix prawns, spring onions, ginger, soy sauce, and sesame oil',
      'Cut bread into triangles',
      'Spread prawn mixture on bread',
      'Brush with beaten egg and sprinkle sesame seeds',
      'Preheat air fryer to 180°C',
      'Cook for 6-8 minutes until golden',
      'Serve hot'
    ],
    tags: ['prawn', 'toast', 'appetizer', 'asian', 'party food']
  },
  {
    title: 'Air Fryer Roast Potatoes',
    description: 'Ultra-crispy roast potatoes with fluffy interiors. The perfect Sunday roast side.',
    supermarket: Supermarket.ALDI,
    sourceUrl: 'https://www.aldi.co.uk/recipes/collections/air-fryer/air-fryer-roast-potatoes',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800',
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    difficulty: Difficulty.EASY,
    ingredients: [
      '1kg Maris Piper potatoes',
      '2 tbsp olive oil',
      '1 tsp salt',
      'Fresh rosemary',
      '2 cloves garlic, crushed'
    ],
    instructions: [
      'Par-boil potatoes for 10 minutes',
      'Drain and rough up edges',
      'Toss with oil, salt, rosemary, and garlic',
      'Preheat air fryer to 200°C',
      'Cook for 25-30 minutes, shaking halfway',
      'Serve crispy and golden'
    ],
    tags: ['potatoes', 'roast', 'side dish', 'crispy', 'british']
  },
  {
    title: 'Mini Chicken Kievs',
    description: 'Crispy chicken kievs with garlic butter filling. Perfect finger food.',
    supermarket: Supermarket.ALDI,
    sourceUrl: 'https://www.aldi.co.uk/recipes/collections/air-fryer/mini-chicken-kievs',
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800',
    prepTime: 20,
    cookTime: 15,
    servings: 6,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '6 chicken mini fillets',
      '50g butter, softened',
      '2 cloves garlic, minced',
      'Fresh parsley, chopped',
      '100g breadcrumbs',
      '2 eggs, beaten',
      '50g flour',
      'Cooking spray'
    ],
    instructions: [
      'Mix butter, garlic, and parsley',
      'Make pocket in each chicken fillet',
      'Fill with garlic butter',
      'Coat in flour, egg, then breadcrumbs',
      'Spray with cooking spray',
      'Preheat air fryer to 180°C',
      'Cook for 12-15 minutes until golden'
    ],
    tags: ['chicken', 'kiev', 'garlic', 'party food', 'crispy']
  },
  {
    title: 'Air Fryer Beef Lasagne',
    description: 'Layered beef lasagne with crispy top. Comfort food made easy.',
    supermarket: Supermarket.ALDI,
    sourceUrl: 'https://www.aldi.co.uk/recipes/collections/air-fryer/air-fryer-beef-lasagne',
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
    prepTime: 30,
    cookTime: 25,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '400g minced beef',
      '1 onion, diced',
      '2 cloves garlic',
      '400g tin chopped tomatoes',
      '2 tbsp tomato paste',
      'Lasagne sheets',
      '250g ricotta',
      '100g mozzarella, grated',
      'Fresh basil'
    ],
    instructions: [
      'Cook beef with onion and garlic',
      'Add tomatoes and paste, simmer',
      'Layer lasagne sheets, meat, and ricotta',
      'Top with mozzarella',
      'Preheat air fryer to 160°C',
      'Cook for 20-25 minutes until bubbling',
      'Garnish with fresh basil'
    ],
    tags: ['lasagne', 'beef', 'pasta', 'italian', 'comfort food']
  },
  {
    title: 'Air Fryer Donut Bites',
    description: 'Light, fluffy donut bites dusted with cinnamon sugar. Irresistible sweet treat.',
    supermarket: Supermarket.ALDI,
    sourceUrl: 'https://www.aldi.co.uk/recipes/collections/air-fryer/air-fryer-donut-bites',
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800',
    prepTime: 15,
    cookTime: 8,
    servings: 6,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '200g self-raising flour',
      '50g caster sugar',
      '100ml milk',
      '1 egg',
      '50g butter, melted',
      'Cinnamon sugar for coating',
      'Cooking spray'
    ],
    instructions: [
      'Mix flour, sugar, milk, egg, and butter',
      'Form into small balls',
      'Spray with cooking spray',
      'Preheat air fryer to 160°C',
      'Cook for 6-8 minutes until golden',
      'Roll in cinnamon sugar while warm'
    ],
    tags: ['donuts', 'dessert', 'sweet', 'cinnamon', 'snack']
  },
  // Additional Waitrose Recipes
  {
    title: 'Air Fryer Lemon, Garlic Chicken with Crispy Feta',
    description: 'Tender chicken with crispy feta and zesty lemon. Mediterranean flavors.',
    supermarket: Supermarket.WAITROSE,
    sourceUrl: 'https://www.waitrose.com/ecom/recipes/air-fryer-lemon-garlic-chicken',
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: Difficulty.EASY,
    ingredients: [
      '4 chicken thighs',
      '2 lemons, sliced',
      '4 cloves garlic',
      '200g feta cheese',
      '2 tbsp olive oil',
      'Fresh oregano',
      'Salt and pepper'
    ],
    instructions: [
      'Season chicken with oil, garlic, and herbs',
      'Place lemon slices in air fryer basket',
      'Add chicken on top',
      'Crumble feta around chicken',
      'Preheat air fryer to 180°C',
      'Cook for 18-20 minutes until golden',
      'Serve with fresh oregano'
    ],
    tags: ['chicken', 'feta', 'lemon', 'mediterranean', 'garlic']
  },
  {
    title: 'Mediterranean Air Fried Lamb with Cauliflower Couscous',
    description: 'Tender lamb with herby cauliflower couscous. Healthy and flavorful.',
    supermarket: Supermarket.WAITROSE,
    sourceUrl: 'https://www.waitrose.com/ecom/recipes/mediterranean-air-fried-lamb',
    imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '500g lamb leg, diced',
      '1 cauliflower, riced',
      '2 tbsp olive oil',
      '1 tsp cumin',
      '1 tsp coriander',
      'Fresh mint',
      'Pomegranate seeds',
      'Lemon juice'
    ],
    instructions: [
      'Marinate lamb with spices and oil',
      'Preheat air fryer to 200°C',
      'Cook lamb for 20-25 minutes',
      'Meanwhile, sauté cauliflower rice',
      'Mix cauliflower with herbs and pomegranate',
      'Serve lamb over cauliflower couscous',
      'Drizzle with lemon juice'
    ],
    tags: ['lamb', 'mediterranean', 'cauliflower', 'healthy', 'herbs']
  },
  {
    title: 'Air Fryer Rump Steak Bites',
    description: 'Juicy steak bites cooked to perfection. Quick and impressive.',
    supermarket: Supermarket.WAITROSE,
    sourceUrl: 'https://www.waitrose.com/ecom/recipes/air-fryer-rump-steak-bites',
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800',
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: Difficulty.EASY,
    ingredients: [
      '400g rump steak, cubed',
      '2 tbsp olive oil',
      '2 cloves garlic, minced',
      'Fresh thyme',
      'Salt and pepper',
      'Butter for finishing'
    ],
    instructions: [
      'Toss steak with oil, garlic, and thyme',
      'Season generously',
      'Preheat air fryer to 200°C',
      'Cook for 8-10 minutes for medium-rare',
      'Toss with butter before serving',
      'Serve immediately'
    ],
    tags: ['steak', 'beef', 'quick', 'protein', 'dinner']
  },
  {
    title: 'Air Fryer Cheesy Garlic Crumpet Tear and Share',
    description: 'Pull-apart crumpets with cheesy garlic filling. Perfect sharing dish.',
    supermarket: Supermarket.WAITROSE,
    sourceUrl: 'https://www.waitrose.com/ecom/recipes/cheesy-garlic-crumpet',
    imageUrl: 'https://images.unsplash.com/photo-1573140401552-3fab0b24f0e6?w=800',
    prepTime: 10,
    cookTime: 12,
    servings: 4,
    difficulty: Difficulty.EASY,
    ingredients: [
      '6 crumpets',
      '100g butter, softened',
      '4 cloves garlic, minced',
      '150g cheddar, grated',
      'Fresh parsley',
      'Salt'
    ],
    instructions: [
      'Mix butter, garlic, and parsley',
      'Cut crumpets into quarters',
      'Spread with garlic butter',
      'Layer in air fryer-safe dish',
      'Top with cheese',
      'Preheat air fryer to 180°C',
      'Cook for 10-12 minutes until golden'
    ],
    tags: ['crumpets', 'cheese', 'garlic', 'sharing', 'british']
  },
  {
    title: 'Air Fryer Apple & Blackberry Crumble',
    description: 'Classic British crumble with seasonal fruits. Comforting dessert.',
    supermarket: Supermarket.WAITROSE,
    sourceUrl: 'https://www.waitrose.com/ecom/recipes/air-fryer-apple-blackberry-crumble',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: Difficulty.EASY,
    ingredients: [
      '4 apples, sliced',
      '200g blackberries',
      '50g sugar',
      '100g flour',
      '75g butter',
      '50g brown sugar',
      '50g oats',
      'Vanilla ice cream'
    ],
    instructions: [
      'Mix apples and blackberries with sugar',
      'Place in air fryer-safe dish',
      'Rub butter into flour',
      'Mix in brown sugar and oats',
      'Sprinkle over fruit',
      'Preheat air fryer to 160°C',
      'Cook for 18-20 minutes',
      'Serve with ice cream'
    ],
    tags: ['crumble', 'apple', 'blackberry', 'dessert', 'british']
  },
  // Additional M&S Recipes
  {
    title: 'Air Fryer Easter Pork Roast',
    description: 'Succulent pork roast with crackling. Perfect for Easter dinner.',
    supermarket: Supermarket.MARKS_AND_SPENCER,
    sourceUrl: 'https://www.marksandspencer.com/recipes/air-fryer-easter-pork-roast',
    imageUrl: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800',
    prepTime: 15,
    cookTime: 45,
    servings: 6,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '1.5kg pork shoulder',
      '2 tbsp olive oil',
      '1 tbsp fennel seeds',
      'Salt',
      '2 apples, sliced',
      'Fresh sage'
    ],
    instructions: [
      'Score pork skin deeply',
      'Rub with oil, fennel seeds, and salt',
      'Preheat air fryer to 200°C',
      'Cook for 40-45 minutes',
      'Add apples in last 10 minutes',
      'Rest for 10 minutes before carving'
    ],
    tags: ['pork', 'roast', 'easter', 'crackling', 'dinner']
  },
  {
    title: 'Mini White Chocolate and Raspberry Éclairs',
    description: 'Delicate éclairs with white chocolate and fresh raspberries.',
    supermarket: Supermarket.MARKS_AND_SPENCER,
    sourceUrl: 'https://www.marksandspencer.com/recipes/mini-eclairs',
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800',
    prepTime: 30,
    cookTime: 15,
    servings: 8,
    difficulty: Difficulty.HARD,
    ingredients: [
      'Choux pastry',
      '200ml double cream',
      '100g white chocolate',
      '150g raspberries',
      'Icing sugar'
    ],
    instructions: [
      'Pipe choux pastry into éclair shapes',
      'Preheat air fryer to 180°C',
      'Cook for 12-15 minutes until golden',
      'Cool completely',
      'Whip cream and fold in melted chocolate',
      'Fill éclairs with cream',
      'Top with raspberries and dust with icing sugar'
    ],
    tags: ['éclairs', 'dessert', 'chocolate', 'raspberry', 'fancy']
  },
  // Additional Tesco Recipes
  {
    title: 'Crispy Chicken, Corn & Mash',
    description: 'Crispy chicken with sweetcorn and creamy mash. Family favorite.',
    supermarket: Supermarket.TESCO,
    sourceUrl: 'https://realfood.tesco.com/recipes/crispy-chicken-corn-mash',
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: Difficulty.EASY,
    ingredients: [
      '4 chicken thighs',
      '100g breadcrumbs',
      '1 tsp paprika',
      '400g tin sweetcorn',
      '600g potatoes',
      '50g butter',
      '50ml milk',
      'Salt and pepper'
    ],
    instructions: [
      'Coat chicken in breadcrumbs and paprika',
      'Preheat air fryer to 180°C',
      'Cook chicken for 18-20 minutes',
      'Meanwhile, boil and mash potatoes',
      'Drain sweetcorn and warm through',
      'Serve chicken with mash and sweetcorn'
    ],
    tags: ['chicken', 'mash', 'corn', 'family', 'comfort food']
  },
  {
    title: 'Air Fryer Gnocchi Lasagne',
    description: 'Layered gnocchi lasagne with rich tomato sauce. Italian comfort food.',
    supermarket: Supermarket.TESCO,
    sourceUrl: 'https://realfood.tesco.com/recipes/air-fryer-gnocchi-lasagne',
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '500g gnocchi',
      '400g tin chopped tomatoes',
      '200g mozzarella',
      '50g parmesan',
      'Fresh basil',
      '2 cloves garlic',
      'Olive oil'
    ],
    instructions: [
      'Cook gnocchi according to package',
      'Make tomato sauce with garlic',
      'Layer gnocchi, sauce, and cheese',
      'Preheat air fryer to 160°C',
      'Cook for 20-25 minutes until bubbling',
      'Garnish with fresh basil'
    ],
    tags: ['gnocchi', 'lasagne', 'italian', 'pasta', 'cheese']
  },
  // BBC Good Food Recipes
  {
    title: 'Air Fryer Chicken Fajitas',
    description: 'Spicy chicken fajitas with peppers and onions. Quick Mexican feast.',
    supermarket: Supermarket.BBC_GOOD_FOOD,
    sourceUrl: 'https://www.bbcgoodfood.com/recipes/air-fryer-chicken-fajitas',
    imageUrl: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: Difficulty.EASY,
    ingredients: [
      '500g chicken breast, sliced',
      '2 bell peppers, sliced',
      '1 large onion, sliced',
      '2 tbsp fajita seasoning',
      '8 flour tortillas',
      'Sour cream',
      'Guacamole',
      'Salsa'
    ],
    instructions: [
      'Toss chicken and vegetables with seasoning',
      'Preheat air fryer to 200°C',
      'Cook for 12-15 minutes, shaking halfway',
      'Warm tortillas',
      'Fill with chicken mixture',
      'Serve with sour cream, guacamole, and salsa'
    ],
    tags: ['chicken', 'fajitas', 'mexican', 'spicy', 'quick']
  },
  {
    title: 'Air Fryer Sticky Chicken Wings',
    description: 'Sticky, sweet chicken wings with Asian flavors. Irresistible!',
    supermarket: Supermarket.BBC_GOOD_FOOD,
    sourceUrl: 'https://www.bbcgoodfood.com/recipes/air-fryer-sticky-chicken-wings',
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800',
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    difficulty: Difficulty.EASY,
    ingredients: [
      '1kg chicken wings',
      '3 tbsp honey',
      '2 tbsp soy sauce',
      '1 tbsp rice vinegar',
      '1 tsp ginger, grated',
      '2 cloves garlic, minced',
      'Sesame seeds',
      'Spring onions'
    ],
    instructions: [
      'Preheat air fryer to 180°C',
      'Cook wings for 20 minutes',
      'Mix honey, soy, vinegar, ginger, and garlic',
      'Toss wings in sauce',
      'Return to air fryer for 5 minutes',
      'Garnish with sesame seeds and spring onions'
    ],
    tags: ['chicken', 'wings', 'sticky', 'asian', 'sweet']
  },
  {
    title: 'Air Fryer Crispy Tofu',
    description: 'Perfectly crispy tofu cubes. Great for stir-fries and bowls.',
    supermarket: Supermarket.BBC_GOOD_FOOD,
    sourceUrl: 'https://www.bbcgoodfood.com/recipes/air-fryer-crispy-tofu',
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
      'Sesame seeds'
    ],
    instructions: [
      'Press tofu to remove excess water',
      'Cut into 2cm cubes',
      'Toss with cornflour',
      'Mix soy sauce, sesame oil, and garlic powder',
      'Coat tofu in sauce',
      'Preheat air fryer to 180°C',
      'Cook for 12-15 minutes, shaking every 5 minutes',
      'Garnish with sesame seeds'
    ],
    tags: ['tofu', 'vegan', 'crispy', 'protein', 'healthy']
  },
  {
    title: 'Air Fryer Fish Tacos',
    description: 'Crispy fish tacos with fresh slaw. Light and delicious.',
    supermarket: Supermarket.BBC_GOOD_FOOD,
    sourceUrl: 'https://www.bbcgoodfood.com/recipes/air-fryer-fish-tacos',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    prepTime: 15,
    cookTime: 12,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '4 white fish fillets',
      '100g flour',
      '2 eggs, beaten',
      '150g panko breadcrumbs',
      '8 small tortillas',
      '200g coleslaw',
      'Lime wedges',
      'Chipotle mayo'
    ],
    instructions: [
      'Coat fish in flour, egg, then panko',
      'Preheat air fryer to 180°C',
      'Cook fish for 10-12 minutes',
      'Warm tortillas',
      'Fill with fish and coleslaw',
      'Serve with lime and chipotle mayo'
    ],
    tags: ['fish', 'tacos', 'mexican', 'crispy', 'healthy']
  },
  {
    title: 'Air Fryer Chocolate Brownies',
    description: 'Fudgy chocolate brownies with a crackly top. No oven needed!',
    supermarket: Supermarket.BBC_GOOD_FOOD,
    sourceUrl: 'https://www.bbcgoodfood.com/recipes/air-fryer-chocolate-brownies',
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
      'Pinch of salt'
    ],
    instructions: [
      'Melt chocolate and butter',
      'Whisk in sugar and eggs',
      'Fold in flour, cocoa, and salt',
      'Pour into greased air fryer-safe pan',
      'Preheat air fryer to 160°C',
      'Bake for 18-20 minutes',
      'Cool before cutting'
    ],
    tags: ['brownies', 'chocolate', 'dessert', 'baking', 'sweet']
  },
  // The Happy Foodie Recipes
  {
    title: 'Air Fryer Crispy Duck',
    description: 'Crispy-skinned duck with orange glaze. Restaurant quality.',
    supermarket: Supermarket.HAPPY_FOODIE,
    sourceUrl: 'https://www.thehappyfoodie.co.uk/recipes/air-fryer-crispy-duck',
    imageUrl: 'https://images.unsplash.com/photo-1619149877002-4f8b6ed6c148?w=800',
    prepTime: 10,
    cookTime: 25,
    servings: 2,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '2 duck breasts',
      '1 tsp five-spice powder',
      'Salt',
      'Orange marmalade',
      'Soy sauce',
      'Spring onions',
      'Cucumber'
    ],
    instructions: [
      'Score duck skin',
      'Season with five-spice and salt',
      'Preheat air fryer to 180°C',
      'Cook skin-side up for 20 minutes',
      'Brush with marmalade glaze',
      'Cook for 5 more minutes',
      'Serve with spring onions and cucumber'
    ],
    tags: ['duck', 'crispy', 'asian', 'fancy', 'dinner']
  },
  {
    title: 'Air Fryer Tempura Vegetables',
    description: 'Light, crispy tempura vegetables. Perfect Japanese-style appetizer.',
    supermarket: Supermarket.HAPPY_FOODIE,
    sourceUrl: 'https://www.thehappyfoodie.co.uk/recipes/air-fryer-tempura-vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800',
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      'Assorted vegetables (peppers, courgette, aubergine)',
      '100g tempura flour',
      '150ml ice-cold sparkling water',
      'Soy sauce for dipping',
      'Cooking spray'
    ],
    instructions: [
      'Cut vegetables into thin slices',
      'Mix tempura flour with cold sparkling water',
      'Dip vegetables in batter',
      'Spray with cooking spray',
      'Preheat air fryer to 200°C',
      'Cook for 8-10 minutes until crispy',
      'Serve with soy sauce'
    ],
    tags: ['tempura', 'vegetables', 'japanese', 'crispy', 'appetizer']
  },
  {
    title: 'Air Fryer Sticky Toffee Pudding',
    description: 'Warm sticky toffee pudding with caramel sauce. Classic British dessert.',
    supermarket: Supermarket.HAPPY_FOODIE,
    sourceUrl: 'https://www.thehappyfoodie.co.uk/recipes/air-fryer-sticky-toffee-pudding',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '200g dates, chopped',
      '100g butter',
      '150g brown sugar',
      '2 eggs',
      '150g self-raising flour',
      '200ml double cream',
      '100g brown sugar (for sauce)',
      'Vanilla ice cream'
    ],
    instructions: [
      'Soak dates in boiling water',
      'Mix butter, sugar, eggs, and flour',
      'Fold in dates',
      'Pour into ramekins',
      'Preheat air fryer to 160°C',
      'Cook for 20-25 minutes',
      'Make caramel sauce with cream and sugar',
      'Serve with ice cream and sauce'
    ],
    tags: ['sticky toffee', 'pudding', 'dessert', 'british', 'caramel']
  },
  {
    title: 'Air Fryer Korean Fried Chicken',
    description: 'Crispy Korean-style fried chicken with gochujang glaze. Spicy and addictive.',
    supermarket: Supermarket.HAPPY_FOODIE,
    sourceUrl: 'https://www.thehappyfoodie.co.uk/recipes/air-fryer-korean-fried-chicken',
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800',
    prepTime: 20,
    cookTime: 20,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      '8 chicken drumsticks',
      '100g cornflour',
      '2 tbsp gochujang',
      '2 tbsp honey',
      '2 tbsp soy sauce',
      '1 tbsp rice vinegar',
      'Sesame seeds',
      'Spring onions'
    ],
    instructions: [
      'Coat chicken in cornflour',
      'Preheat air fryer to 180°C',
      'Cook for 15 minutes',
      'Mix gochujang, honey, soy, and vinegar',
      'Toss chicken in sauce',
      'Return to air fryer for 5 minutes',
      'Garnish with sesame seeds and spring onions'
    ],
    tags: ['chicken', 'korean', 'spicy', 'crispy', 'asian']
  },
  {
    title: 'Air Fryer Chocolate Chip Cookies',
    description: 'Soft, chewy chocolate chip cookies. Perfect with a glass of milk.',
    supermarket: Supermarket.HAPPY_FOODIE,
    sourceUrl: 'https://www.thehappyfoodie.co.uk/recipes/air-fryer-chocolate-chip-cookies',
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800',
    prepTime: 15,
    cookTime: 10,
    servings: 12,
    difficulty: Difficulty.EASY,
    ingredients: [
      '200g butter, softened',
      '150g brown sugar',
      '100g caster sugar',
      '1 egg',
      '250g plain flour',
      '1 tsp baking soda',
      '200g chocolate chips',
      'Pinch of salt'
    ],
    instructions: [
      'Cream butter and sugars',
      'Beat in egg',
      'Mix in flour, baking soda, and salt',
      'Fold in chocolate chips',
      'Form into cookie dough balls',
      'Preheat air fryer to 160°C',
      'Cook for 8-10 minutes',
      'Cool on wire rack'
    ],
    tags: ['cookies', 'chocolate', 'dessert', 'baking', 'sweet']
  }
];

