
export const TIMEOUT_SHOW_ERROR = 4000;

export const GUITAR_PER_PAGE = 9;

export const COMMENTS_COUNT_PER_STEP = 3;

export const STARS_COUNT = 5;

export const TOTAL_GUITAR_COUNT = 27;

export const GUITAR_TYPE = {
  ukulele: 'Укулеле',
  electric: 'Электрогитара',
  acoustic: 'Акустическая гитара',
};

export const RATING = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Удовлетворительно',
  4: 'Хорошо',
  5: 'Отлично',
};

export const GUITAR_STRING_COUNT = {
  acoustic: [6, 7, 12],
  electric: [4, 6, 7],
  ukulele: [4],
};

export const TYPES_FOR_STRINGS = {
  '4': ['electric', 'ukulele'],
  '6': ['acoustic', 'electric'],
  '7': ['acoustic', 'electric'],
  '12': ['acoustic'],
};

export enum AppRoute {
  MainScreen = '/',
  CatalogPage = '/catalog/page_:pageNumber',
  ProductPage = '/product/:id',
  ServerError= '/500',
  Basket = '/basket'
}

export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
  Coupons = '/coupons',
}

export enum NameSpace {
  Data = 'DATA',
  Site = 'SITE',
  Basket = 'BASKET',
}

export enum HttpCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export const INITIAL_GUITAR = {
  id: 0,
  name: '',
  vendorCode: '',
  type: '',
  description: '',
  previewImg: '',
  stringCount: 0,
  rating: 0,
  price: 0,
  comments: [],
  count: 0,
};
