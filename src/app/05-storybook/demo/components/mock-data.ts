/**
 * Mock data for Storybook examples
 * Sample books, categories, and loan statistics
 */

import { Book, BookCategory, LoanStats } from '../../../shared/models/library.models';

export const MOCK_CATEGORIES: BookCategory[] = [
  'מדע בדיוני',
  'מתח',
  'רומנטיקה',
  'ביוגרפיה',
  'היסטוריה',
  'פנטזיה',
  'מדע',
];

export const MOCK_BOOKS: Book[] = [
  {
    id: 1,
    title: 'הארי פוטר ואבן החכמים',
    author: 'ג.ק. רולינג',
    isbn: '9789655521234',
    category: 'פנטזיה',
    publishYear: 1997,
    pages: 309,
    available: true,
    rating: 4.8,
    description: 'ספר ראשון בסדרת הארי פוטר הפופולרית',
  },
  {
    id: 2,
    title: 'מדריך הטרמפיסט לגלקסיה',
    author: 'דאגלס אדמס',
    isbn: '9780345391803',
    category: 'מדע בדיוני',
    publishYear: 1979,
    pages: 216,
    available: true,
    rating: 4.7,
    description: 'קומדיה מדע בדיונית קלאסית',
  },
  {
    id: 3,
    title: 'הרוצח בכרם',
    author: 'אגתה כריסטי',
    isbn: '9780062073556',
    category: 'מתח',
    publishYear: 1934,
    pages: 256,
    available: false,
    rating: 4.5,
    description: 'מסתרין קלאסי של הרקול פוארו',
  },
  {
    id: 4,
    title: 'ספיינס: קצר תולדות האנושות',
    author: 'יובל נח הררי',
    isbn: '9789655521112',
    category: 'היסטוריה',
    publishYear: 2011,
    pages: 443,
    available: true,
    rating: 4.9,
    description: 'מבט היסטורי על התפתחות המין האנושי',
  },
  {
    id: 5,
    title: 'גאווה ודעה קדומה',
    author: 'ג\'יין אוסטן',
    isbn: '9780141439518',
    category: 'רומנטיקה',
    publishYear: 1813,
    pages: 432,
    available: true,
    rating: 4.6,
    description: 'רומן קלאסי על אהבה ומעמד חברתי',
  },
  {
    id: 6,
    title: 'סטיב ג\'ובס',
    author: 'וולטר אייזקסון',
    isbn: '9781451648539',
    category: 'ביוגרפיה',
    publishYear: 2011,
    pages: 656,
    available: true,
    rating: 4.4,
    description: 'ביוגרפיה מורשית של מייסד אפל',
  },
  {
    id: 7,
    title: 'שר הטבעות: חבר הטבעת',
    author: 'ג.ר.ר. טולקין',
    isbn: '9780544003415',
    category: 'פנטזיה',
    publishYear: 1954,
    pages: 423,
    available: false,
    rating: 5.0,
    description: 'אפוס פנטזיה קלאסי',
  },
  {
    id: 8,
    title: 'קצר תולדות הזמן',
    author: 'סטיבן הוקינג',
    isbn: '9780553380163',
    category: 'מדע',
    publishYear: 1988,
    pages: 256,
    available: true,
    rating: 4.3,
    description: 'הסבר נגיש לקוסמולוגיה ופיזיקה תיאורטית',
  },
  {
    id: 9,
    title: 'דיון',
    author: 'פרנק הרברט',
    isbn: '9780441172719',
    category: 'מדע בדיוני',
    publishYear: 1965,
    pages: 688,
    available: true,
    rating: 4.8,
    description: 'אחד מספרי המדע הבדיוני הגדולים בכל הזמנים',
  },
  {
    id: 10,
    title: 'הקוד של דה-וינצ\'י',
    author: 'דן בראון',
    isbn: '9780307474278',
    category: 'מתח',
    publishYear: 2003,
    pages: 489,
    available: true,
    rating: 4.1,
    description: 'מותחן שעוסק בסודות היסטוריים',
  },
];

export const MOCK_LOAN_STATS: LoanStats = {
  totalLoans: 150,
  activeLoans: 23,
  overdueLoans: 3,
  returnedLoans: 124,
  popularBooks: [MOCK_BOOKS[0], MOCK_BOOKS[3], MOCK_BOOKS[8]],
};

/**
 * Helper function to create mock books with specified count
 */
export function createMockBooks(count: number, availableRatio = 0.7): Book[] {
  const books: Book[] = [];
  const categories = MOCK_CATEGORIES;
  const titles = [
    'הרפתקאות',
    'סיפורים',
    'מסע',
    'חיפוש',
    'גילוי',
    'מסתורין',
    'אהבה',
    'היסטוריה',
  ];
  const authors = [
    'יוסי כהן',
    'שרה לוי',
    'דוד מזרחי',
    'רחל ברק',
    'משה אברהם',
    'תמר שמיר',
  ];

  for (let i = 0; i < count; i++) {
    books.push({
      id: i + 100,
      title: `${titles[i % titles.length]} ${Math.floor(i / titles.length) + 1}`,
      author: authors[i % authors.length],
      isbn: `978${Math.random().toString().slice(2, 12)}`,
      category: categories[i % categories.length],
      publishYear: 1980 + Math.floor(Math.random() * 44),
      pages: 150 + Math.floor(Math.random() * 500),
      available: Math.random() < availableRatio,
      rating: 3 + Math.random() * 2,
    });
  }

  return books;
}

/**
 * Helper function to create mock loan stats
 */
export function createMockLoanStats(
  total: number,
  overdueRatio = 0.05
): LoanStats {
  const overdue = Math.floor(total * overdueRatio);
  const returned = Math.floor(total * 0.7);
  const active = total - returned;

  return {
    totalLoans: total,
    activeLoans: active,
    overdueLoans: overdue,
    returnedLoans: returned,
    popularBooks: MOCK_BOOKS.slice(0, 3),
  };
}
