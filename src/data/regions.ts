import type { CulinaryRegion } from '../types';

export const regions: CulinaryRegion[] = [
  {
    id: 'east-asia',
    name: 'East Asia',
    description:
      'East Asian cuisine emphasizes balance, harmony, and the art of presentation. From Chinese wok cooking to Japanese precision and Korean fermentation, this region offers some of the world\'s most refined culinary traditions.',
    color: '#EF4444',
    hoverColor: '#F87171',
    keyIngredients: ['soy sauce', 'rice', 'ginger', 'sesame oil', 'tofu', 'noodles', 'seaweed', 'miso'],
    signatureDishes: [
      { name: 'Peking Duck', country: 'China', description: 'Crispy-skinned roasted duck served with thin pancakes, scallions, and hoisin sauce.' },
      { name: 'Sushi', country: 'Japan', description: 'Vinegared rice paired with fresh raw fish, showcasing the purity of ingredients.' },
      { name: 'Kimchi Jjigae', country: 'South Korea', description: 'A hearty, spicy stew made with fermented kimchi, pork, and tofu.' },
      { name: 'Dim Sum', country: 'China', description: 'An array of bite-sized steamed and fried dumplings served during brunch.' },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80', alt: 'Sushi platter', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80', alt: 'Dim sum bamboo steamers', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&q=80', alt: 'Ramen bowl', credit: 'Unsplash' },
    ],
    funFact: 'In Japan, slurping noodles loudly is considered a compliment to the chef and is believed to enhance the flavor.',
  },
  {
    id: 'southeast-asia',
    name: 'Southeast Asia',
    description:
      'Southeast Asian cuisine is a vibrant explosion of sweet, sour, salty, and spicy flavors. Street food culture thrives here, with night markets offering everything from satay to tropical fruit shakes.',
    color: '#F97316',
    hoverColor: '#FB923C',
    keyIngredients: ['lemongrass', 'fish sauce', 'coconut milk', 'chili', 'lime', 'galangal', 'tamarind', 'palm sugar'],
    signatureDishes: [
      { name: 'Pad Thai', country: 'Thailand', description: 'Stir-fried rice noodles with shrimp, peanuts, bean sprouts, and tamarind sauce.' },
      { name: 'Pho', country: 'Vietnam', description: 'A fragrant beef or chicken broth with rice noodles, herbs, and lime.' },
      { name: 'Nasi Goreng', country: 'Indonesia', description: 'Indonesian fried rice with sweet soy sauce, topped with a fried egg.' },
      { name: 'Laksa', country: 'Malaysia', description: 'A spicy coconut curry noodle soup with shrimp and fresh herbs.' },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&q=80', alt: 'Pad Thai', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&q=80', alt: 'Vietnamese pho', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=600&q=80', alt: 'Thai street food market', credit: 'Unsplash' },
    ],
    funFact: 'Thailand\'s street food culture is so important that Bangkok was named the world\'s best street food city by CNN multiple years in a row.',
  },
  {
    id: 'south-asia',
    name: 'South Asia',
    description:
      'South Asian cuisine is a kaleidoscope of spices and techniques, from slow-cooked curries to tandoori grilling. The region\'s vegetarian traditions are among the most diverse and flavorful in the world.',
    color: '#F59E0B',
    hoverColor: '#FBBF24',
    keyIngredients: ['turmeric', 'cumin', 'cardamom', 'ghee', 'chili powder', 'coriander', 'garam masala', 'basmati rice'],
    signatureDishes: [
      { name: 'Butter Chicken', country: 'India', description: 'Tender chicken in a creamy, spiced tomato-butter sauce — the world\'s favorite curry.' },
      { name: 'Biryani', country: 'India', description: 'Fragrant layered rice with marinated meat, saffron, and caramelized onions.' },
      { name: 'Momo', country: 'Nepal', description: 'Steamed or fried dumplings filled with spiced meat or vegetables.' },
      { name: 'Kottu Roti', country: 'Sri Lanka', description: 'Chopped flatbread stir-fried with vegetables, egg, and spices on a hot griddle.' },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80', alt: 'Indian butter chicken', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80', alt: 'Biryani', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80', alt: 'Indian spice market', credit: 'Unsplash' },
    ],
    funFact: 'India is home to the world\'s largest vegetarian population, and its cuisine includes over 30 distinct regional cooking styles.',
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    description:
      'Middle Eastern cuisine is built on generous hospitality and ancient traditions. Mezze spreads, slow-roasted meats, and aromatic spice blends create communal dining experiences that have influenced cuisines worldwide.',
    color: '#84CC16',
    hoverColor: '#A3E635',
    keyIngredients: ['tahini', 'sumac', 'za\'atar', 'pomegranate', 'chickpeas', 'olive oil', 'saffron', 'lamb'],
    signatureDishes: [
      { name: 'Shawarma', country: 'Lebanon', description: 'Spit-roasted marinated meat shaved into warm pita with garlic sauce and pickles.' },
      { name: 'Hummus', country: 'Lebanon', description: 'Silky blended chickpeas with tahini, lemon, and garlic — the ultimate dip.' },
      { name: 'Kebab', country: 'Turkey', description: 'Skewered and grilled seasoned meats, a cornerstone of Middle Eastern grilling.' },
      { name: 'Mansaf', country: 'Jordan', description: 'Lamb cooked in dried yogurt sauce, served over rice — Jordan\'s national dish.' },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80', alt: 'Mezze spread', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=600&q=80', alt: 'Shawarma', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1547424850-28ac9a01a858?w=600&q=80', alt: 'Hummus and falafel', credit: 'Unsplash' },
    ],
    funFact: 'Coffee was first discovered in the Middle East, and the tradition of Turkish coffee has been recognized by UNESCO as an Intangible Cultural Heritage.',
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean',
    description:
      'Mediterranean cuisine celebrates fresh, seasonal ingredients with olive oil as its foundation. The Mediterranean diet is recognized worldwide for its health benefits and emphasis on whole grains, seafood, and vegetables.',
    color: '#22C55E',
    hoverColor: '#4ADE80',
    keyIngredients: ['olive oil', 'tomatoes', 'garlic', 'basil', 'feta cheese', 'oregano', 'capers', 'anchovies'],
    signatureDishes: [
      { name: 'Moussaka', country: 'Greece', description: 'Layered eggplant, ground meat, and béchamel sauce baked to golden perfection.' },
      { name: 'Paella', country: 'Spain', description: 'Saffron-infused rice with seafood, chicken, and vegetables in a wide shallow pan.' },
      { name: 'Risotto', country: 'Italy', description: 'Creamy Arborio rice slowly stirred with broth, butter, and Parmigiano-Reggiano.' },
      { name: 'Bouillabaisse', country: 'France', description: 'A Provençal fish stew with saffron broth, multiple fish varieties, and rouille.' },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=600&q=80', alt: 'Paella in a pan', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&q=80', alt: 'Italian pasta', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', alt: 'Mediterranean feast', credit: 'Unsplash' },
    ],
    funFact: 'The Mediterranean diet was inscribed on UNESCO\'s Intangible Cultural Heritage list in 2013, recognizing it as more than food — a way of life.',
  },
  {
    id: 'west-europe',
    name: 'Western Europe',
    description:
      'Western European cuisine gave the world haute cuisine, artisan baking, and the concept of fine dining. From French techniques to German hearty comfort food, this region prizes craftsmanship and tradition.',
    color: '#06B6D4',
    hoverColor: '#22D3EE',
    keyIngredients: ['butter', 'cream', 'wine', 'mustard', 'cheese', 'potatoes', 'herbs de Provence', 'chocolate'],
    signatureDishes: [
      { name: 'Croissant', country: 'France', description: 'Flaky, buttery layered pastry — the symbol of French baking perfection.' },
      { name: 'Wiener Schnitzel', country: 'Austria', description: 'Thin breaded and fried veal cutlet, golden and crispy, served with lemon.' },
      { name: 'Stamppot', country: 'Netherlands', description: 'Mashed potatoes mixed with vegetables like kale or sauerkraut, served with smoked sausage.' },
      { name: 'Belgian Waffles', country: 'Belgium', description: 'Light, crispy waffles with deep pockets, topped with cream and strawberries.' },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=600&q=80', alt: 'French croissants', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', alt: 'Fine dining plating', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80', alt: 'Artisan bread', credit: 'Unsplash' },
    ],
    funFact: 'France has over 1,600 distinct varieties of cheese — Charles de Gaulle once asked, "How can you govern a country with 246 varieties of cheese?"',
  },
  {
    id: 'east-europe',
    name: 'Eastern Europe',
    description:
      'Eastern European cuisine is hearty, soulful comfort food born from harsh winters and rich farmland. Dumplings, stews, fermented foods, and root vegetables form the backbone of these warming traditions.',
    color: '#3B82F6',
    hoverColor: '#60A5FA',
    keyIngredients: ['beets', 'dill', 'sour cream', 'cabbage', 'rye bread', 'paprika', 'mushrooms', 'pork'],
    signatureDishes: [
      { name: 'Borscht', country: 'Ukraine', description: 'A vibrant beet soup served hot or cold with a generous dollop of sour cream.' },
      { name: 'Pierogi', country: 'Poland', description: 'Stuffed dumplings filled with potato-cheese, meat, or sauerkraut and pan-fried in butter.' },
      { name: 'Goulash', country: 'Hungary', description: 'A rich paprika-spiced beef and vegetable stew with a deep red color.' },
      { name: 'Pljeskavica', country: 'Serbia', description: 'A massive seasoned meat patty grilled and served in lepinja bread with kajmak.' },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&q=80', alt: 'Borscht soup', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1587730608849-19markup0f?w=600&q=80', alt: 'Pierogi dumplings', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&q=80', alt: 'Hungarian goulash', credit: 'Unsplash' },
    ],
    funFact: 'Poland holds an annual pierogi festival, and the country consumes an estimated 500 million pierogi per year.',
  },
  {
    id: 'north-africa',
    name: 'North Africa',
    description:
      'North African cuisine weaves together Berber, Arab, and Mediterranean influences into aromatic, slow-cooked masterpieces. Tagines, couscous, and preserved lemons define this sun-drenched culinary tradition.',
    color: '#8B5CF6',
    hoverColor: '#A78BFA',
    keyIngredients: ['cumin', 'preserved lemons', 'harissa', 'couscous', 'dates', 'almonds', 'ras el hanout', 'mint'],
    signatureDishes: [
      { name: 'Tagine', country: 'Morocco', description: 'A slow-cooked stew of meat, vegetables, and dried fruits in a conical clay pot.' },
      { name: 'Couscous', country: 'Morocco', description: 'Steamed semolina granules served with a rich vegetable and meat broth.' },
      { name: 'Shakshuka', country: 'Tunisia', description: 'Eggs poached in a spiced tomato and pepper sauce, eaten with crusty bread.' },
      { name: 'Ful Medames', country: 'Egypt', description: 'Slow-cooked fava beans with olive oil, lemon, and cumin — Egypt\'s national breakfast.' },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1541518763-a89b30a36d6d?w=600&q=80', alt: 'Moroccan tagine', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=600&q=80', alt: 'Shakshuka', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1511690743698-d9d18f7e20f1?w=600&q=80', alt: 'Moroccan spice market', credit: 'Unsplash' },
    ],
    funFact: 'Moroccan mint tea is poured from a height to create a frothy top and is always served three times — the first glass is gentle like life, the second strong like love, the third bitter like death.',
  },
  {
    id: 'west-africa',
    name: 'West Africa',
    description:
      'West African cuisine is bold, communal, and deeply flavorful. One-pot stews, grilled meats, and starchy sides create satisfying meals meant to be shared, with each country adding its own unique twist.',
    color: '#A855F7',
    hoverColor: '#C084FC',
    keyIngredients: ['scotch bonnet peppers', 'palm oil', 'yams', 'plantains', 'groundnuts', 'okra', 'cassava', 'smoked fish'],
    signatureDishes: [
      { name: 'Jollof Rice', country: 'Nigeria', description: 'A one-pot tomato rice dish seasoned with peppers and spices — West Africa\'s most famous dish.' },
      { name: 'Fufu', country: 'Ghana', description: 'Pounded starchy dough served with rich soups and stews, eaten by hand.' },
      { name: 'Suya', country: 'Nigeria', description: 'Spicy skewered grilled meat coated in a ground peanut and chili spice mix.' },
      { name: 'Thieboudienne', country: 'Senegal', description: 'Fish and rice cooked in a rich tomato sauce with vegetables — Senegal\'s national dish.' },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80', alt: 'Jollof rice', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1567364816519-cbc9c4a9b8b4?w=600&q=80', alt: 'West African market', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80', alt: 'Grilled meat skewers', credit: 'Unsplash' },
    ],
    funFact: 'The "Jollof Wars" is a friendly rivalry between Nigeria and Ghana over who makes the best Jollof Rice — a debate that has gone viral on social media.',
  },
  {
    id: 'east-africa',
    name: 'East & Southern Africa',
    description:
      'From Ethiopia\'s ancient injera tradition to South Africa\'s braai culture, this vast region offers incredible diversity. Spice routes, colonial influences, and indigenous ingredients create a rich culinary tapestry.',
    color: '#EC4899',
    hoverColor: '#F472B6',
    keyIngredients: ['berbere spice', 'injera', 'peri-peri', 'maize', 'coconut', 'cardamom', 'cinnamon', 'dried meat'],
    signatureDishes: [
      { name: 'Injera & Wot', country: 'Ethiopia', description: 'Spongy sourdough flatbread topped with spicy lentil and meat stews, eaten by hand.' },
      { name: 'Nyama Choma', country: 'Kenya', description: 'Simply grilled goat or beef — East Africa\'s beloved barbecue tradition.' },
      { name: 'Bobotie', country: 'South Africa', description: 'Spiced minced meat baked with an egg custard topping — a Cape Malay classic.' },
      { name: 'Bunny Chow', country: 'South Africa', description: 'A hollowed-out bread loaf filled with fragrant curry — Durban street food at its best.' },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80', alt: 'Ethiopian injera platter', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80', alt: 'Grilled meat', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&q=80', alt: 'African spices', credit: 'Unsplash' },
    ],
    funFact: 'Ethiopia has its own unique calendar with 13 months and is considered the birthplace of coffee — the word "coffee" may derive from Kaffa, an Ethiopian region.',
  },
  {
    id: 'latin-america',
    name: 'Latin America',
    description:
      'Latin American cuisine pulses with energy — from Mexico\'s ancient corn-based traditions to Peru\'s world-renowned ceviche scene and Brazil\'s churrasco culture. Bold flavors and festive spirit define every dish.',
    color: '#F43F5E',
    hoverColor: '#FB7185',
    keyIngredients: ['corn', 'beans', 'chili peppers', 'avocado', 'lime', 'cilantro', 'plantains', 'cassava'],
    signatureDishes: [
      { name: 'Tacos al Pastor', country: 'Mexico', description: 'Spit-roasted marinated pork on corn tortillas with pineapple, onion, and cilantro.' },
      { name: 'Ceviche', country: 'Peru', description: 'Raw fish cured in citrus juices with onions, chili, and fresh herbs.' },
      { name: 'Feijoada', country: 'Brazil', description: 'A rich black bean stew with pork, served with rice, collard greens, and orange slices.' },
      { name: 'Empanadas', country: 'Argentina', description: 'Baked or fried pastry pockets filled with seasoned beef, onions, and olives.' },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80', alt: 'Mexican tacos', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&q=80', alt: 'Ceviche', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=600&q=80', alt: 'Empanadas', credit: 'Unsplash' },
    ],
    funFact: 'Mexico\'s cuisine was the first to be inscribed on UNESCO\'s Intangible Cultural Heritage list (2010), recognizing its deep cultural significance.',
  },
  {
    id: 'north-america',
    name: 'North America',
    description:
      'North American cuisine is a melting pot of immigrant traditions and indigenous ingredients. From Southern BBQ low-and-slow smoking to Canadian comfort classics, this region innovates by blending global influences.',
    color: '#14B8A6',
    hoverColor: '#2DD4BF',
    keyIngredients: ['corn', 'maple syrup', 'barbecue spice rubs', 'cheddar cheese', 'bison', 'wild rice', 'pecans', 'hot sauce'],
    signatureDishes: [
      { name: 'BBQ Ribs', country: 'United States', description: 'Slow-smoked pork ribs basted with tangy-sweet barbecue sauce until fall-off-the-bone tender.' },
      { name: 'Poutine', country: 'Canada', description: 'Crispy fries smothered in gravy and fresh cheese curds — Québec\'s gift to the world.' },
      { name: 'Clam Chowder', country: 'United States', description: 'A creamy New England soup packed with clams, potatoes, and smoky bacon.' },
      { name: 'Fried Chicken', country: 'United States', description: 'Buttermilk-brined chicken fried to golden, crunchy perfection — the South\'s crowning glory.' },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80', alt: 'BBQ ribs', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&q=80', alt: 'Poutine', credit: 'Unsplash' },
      { url: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=80', alt: 'Fried chicken', credit: 'Unsplash' },
    ],
    funFact: 'Americans consume about 1.2 billion pounds of barbecue sauce annually, and every BBQ region fiercely defends its own style — Kansas City, Texas, Carolina, and Memphis.',
  },
];
