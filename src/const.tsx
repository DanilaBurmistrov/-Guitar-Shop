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

export enum AppRoute {
  MainScreen = '/',
  CatalogPage = '/catalog/page_:pageNumber',
  ProductPage = '/product/:id',
  ServerError= '/500',
}

export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
}

export enum NameSpace {
  Data = 'DATA',
  Site = 'SITE',
}

export enum HttpCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

