import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// import { ObjectId } from 'bson';

// const recipes = [
//     {
//       _id: ObjectId(),
//       nameRecipe: "סלט טאבולה",
//       category: "סלטים",
//       image: "https://example.com/tabbouleh.jpg",
//       ingredients: ["1 כוס בורגול", "1 עגבנייה חתוכה לקוביות", "חצי כוס פטרוזיליה קצוצה", "מיץ מלימון אחד", "מלח ופלפל לפי הטעם"],
//       preparationInstructions: "לערבב את כל החומרים בקערה גדולה ולהגיש.",
//     },
//     {
//       _id: ObjectId(),
//       nameRecipe: "חומוס ביתי",
//       category: "מנות ראשונות",
//       image: "https://example.com/hummus.jpg",
//       ingredients: ["2 כוסות גרגרי חומוס מבושלים", "2 כפות טחינה", "מיץ מלימון אחד", "2 כפות שמן זית", "מלח לפי הטעם"],
//       preparationInstructions: "לטחון את כל המרכיבים במעבד מזון עד לקבלת מרקם חלק. להגיש עם פיתה.",
//     },
//     {
//       _id: ObjectId(),
//       nameRecipe: "עוף בתנור עם ירקות",
//       category: "עיקריות",
//       image: "https://example.com/roasted_chicken.jpg",
//       ingredients: ["4 כרעי עוף", "2 תפוחי אדמה חתוכים לקוביות", "1 בצל חתוך לרבעים", "3 כפות שמן זית", "מלח ופלפל לפי הטעם"],
//       preparationInstructions: "לערבב את כל החומרים, לשים בתבנית, ולאפות בתנור בחום של 180 מעלות למשך 1 שעה.",
//     },
//     {
//       _id: ObjectId(),
//       nameRecipe: "שקשוקה",
//       category: "ארוחות בוקר",
//       image: "https://example.com/shakshuka.jpg",
//       ingredients: ["1 כף שמן זית", "1 בצל קצוץ", "3 עגבניות חתוכות", "2 ביצים", "מלח ופלפל לפי הטעם"],
//       preparationInstructions: "לטגן את הבצל, להוסיף את העגבניות ולבשל כ-10 דקות. לשבור את הביצים לתוך המחבת ולבשל עד שהן מוכנות.",
//     },
//     {
//       _id: ObjectId(),
//       nameRecipe: "מרק ירקות",
//       category: "מרקים",
//       image: "https://example.com/vegetable_soup.jpg",
//       ingredients: ["2 גזרים", "2 קישואים", "1 בצל", "2 תפוחי אדמה", "מלח ופלפל לפי הטעם"],
//       preparationInstructions: "לחתוך את הירקות, להוסיף מים ולהביא לרתיחה. לבשל עד שהירקות רכים.",
//     },
//     {
//       _id: ObjectId(),
//       nameRecipe: "סלט קיסר",
//       category: "סלטים",
//       image: "https://example.com/caesar_salad.jpg",
//       ingredients: ["חסה רומית", "קרוטונים", "רוטב קיסר", "פרמזן מגורר"],
//       preparationInstructions: "לערבב את כל המרכיבים ולהגיש מיד.",
//     },
//     {
//       _id: ObjectId(),
//       nameRecipe: "עוגת שוקולד",
//       category: "קינוחים",
//       image: "https://example.com/chocolate_cake.jpg",
//       ingredients: ["1 כוס קמח", "1 כוס סוכר", "1 כוס חלב", "1/2 כוס קקאו", "3 ביצים"],
//       preparationInstructions: "לערבב את כל החומרים, לשפוך לתבנית ולאפות בחום של 180 מעלות למשך 30 דקות.",
//     },
//     {
//       _id: ObjectId(),
//       nameRecipe: "פסטה ברוטב עגבניות",
//       category: "עיקריות",
//       image: "https://example.com/pasta_tomato_sauce.jpg",
//       ingredients: ["250 גרם פסטה", "2 כוסות רוטב עגבניות", "2 כפות שמן זית", "בזיליקום טרי"],
//       preparationInstructions: "לבשל את הפסטה לפי ההוראות, לחמם את הרוטב במחבת ולהוסיף את הפסטה.",
//     },
//     {
//       _id: ObjectId(),
//       nameRecipe: "חביתת ירק",
//       category: "ארוחות בוקר",
//       image: "https://example.com/vegetable_omelette.jpg",
//       ingredients: ["2 ביצים", "1 כף שמן", "עשבי תיבול קצוצים", "מלח ופלפל לפי הטעם"],
//       preparationInstructions: "לטרוף את הביצים עם עשבי התיבול, לטגן במחבת חמה עם שמן ולהגיש.",
//     },
//     {
//       _id: ObjectId(),
//       nameRecipe: "פאי תפוחים",
//       category: "קינוחים",
//       image: "https://example.com/apple_pie.jpg",
//       ingredients: ["3 תפוחים חתוכים לקוביות", "1 כוס סוכר", "1 כוס קמח", "חמאה מומסת"],
//       preparationInstructions: "לערבב את כל החומרים, לשפוך לתבנית ולאפות בחום של 180 מעלות למשך 45 דקות.",
//     }
// ];

// export default recipes;
