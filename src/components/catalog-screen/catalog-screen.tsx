import { FormEvent, useCallback, useEffect, useRef } from 'react';
import { fetchGuitars } from '../../store/api-action';
import ProductList from '../product-list/product-list';
import { useAppDispatch, useAppSelector} from '../../hooks';
import { getGuitarsDataLoadedStatus, getTotalGuitarsCount } from '../../store/selectors';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../pagination/pagination';
import LoadingScreen from '../loading-screen/loading-screen';
import Footer from '../footer/footer';
import Header from '../header/header';
import { GUITAR_STRING_COUNT, GUITAR_PER_PAGE, TYPES_FOR_STRINGS } from '../../const';

export default function CatalogScreen(): JSX.Element {

  const dispatch = useAppDispatch();

  const isGuitarsDataLoaded = useAppSelector(getGuitarsDataLoadedStatus);
  const totalGuitarsCount = useAppSelector(getTotalGuitarsCount);

  const {pageNumber} = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const { guitars } = useAppSelector(({ DATA }) => DATA);
  const { sortedGuitars } = useAppSelector(({ DATA }) => DATA);

  const maxRef = useRef<HTMLInputElement>(null);

  const currentSortType = searchParams.get('_sort') ? `&_sort=${searchParams.get('_sort')}` : '';
  const currentSortDirection = searchParams.get('_order') ? `&_order=${searchParams.get('_order')}` : '';
  const sortStroke = `${currentSortType}${currentSortDirection}`;

  const currentMinFilter = searchParams.get('price_gte') ? `&price_gte=${searchParams.get('price_gte')}` : '';
  const currentMaxFilter = searchParams.get('price_lte') ? `&price_lte=${searchParams.get('price_lte')}` : '';
  const currentPriceFilter = `${currentMinFilter}${currentMaxFilter}`;
  const currentTypeFilter = searchParams.get('type') ? `&type=${searchParams.getAll('type').join('&type=')}` : '';
  const currentStringFilter = searchParams.get('stringCount') ? `&stringCount=${searchParams.getAll('stringCount').join('&stringCount=')}` : '';

  const currentAvailableStrings = (strings: number) => {
    if (searchParams.getAll('type').length) {
      return !searchParams
        .getAll('type')
        .map((type) => GUITAR_STRING_COUNT?.[type as keyof typeof GUITAR_STRING_COUNT])
        .flat()
        .includes(strings);
    }
    return false;
  };

  const currentAvailableTypes = (types: string) => {
    if (searchParams.getAll('stringCount').length) {
      return !searchParams
        .getAll('stringCount')
        .map((stringCount) => TYPES_FOR_STRINGS?.[stringCount as keyof typeof TYPES_FOR_STRINGS])
        .flat()
        .includes(types);
    }
    return false;
  };

  const filterStroke = `${currentTypeFilter}${currentStringFilter}${currentPriceFilter}`;

  const pages = Math.ceil(totalGuitarsCount / GUITAR_PER_PAGE);

  const currentPage = () => {
    if (!pageNumber) {
      return 1;
    }
    if (pages === 1) {
      return 1;
    }
    if (Number(pageNumber) > pages) {
      return pages;
    }
    return Number(pageNumber);
  };

  const lastIndex = currentPage() * GUITAR_PER_PAGE;
  const firstIndex = lastIndex - GUITAR_PER_PAGE;
  const filterParams = `${currentTypeFilter}${currentStringFilter}`;
  const sortParams = `${currentSortType}${currentSortDirection}`;

  useEffect(() => {

    dispatch(fetchGuitars([pageNumber, firstIndex, lastIndex, filterParams, sortParams, currentPriceFilter]));
  }, [currentPriceFilter, dispatch, filterParams, firstIndex, lastIndex, pageNumber, sortParams]);

  const handlePriceFilter = useCallback(
    (evt: { currentTarget: HTMLInputElement }, filter = 'price_gte') => {
      const input = evt.currentTarget;
      const currentMin = Number(searchParams.get('price_gte'));

      if (+input.value < 0) {
        input.value = '0';
      }
      if (+input.value < sortedGuitars[0].price) {
        input.value = `${sortedGuitars[0].price}`;
      }
      if (+input.value > sortedGuitars[sortedGuitars.length - 1].price) {
        input.value = `${sortedGuitars[sortedGuitars.length - 1].price}`;
      }
      if (filter === 'price_lte' && +input.value < currentMin) {
        input.value = `${currentMin}`;
      }
      searchParams.set(filter, input.value);

      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams, sortedGuitars]
  );

  const handleFilter = useCallback(
    (evt: FormEvent) => {
      const searchInput = evt.target as HTMLInputElement;
      if (searchInput.type === 'number') {
        return;
      }
      const inputs = Array.from(evt.currentTarget.querySelectorAll('input'));

      const availableStringsCount = new Set(inputs.map((input) => (input.checked ? GUITAR_STRING_COUNT[input.id as keyof typeof GUITAR_STRING_COUNT] : null)).flat());

      availableStringsCount.delete(null);

      setSearchParams(
        `${currentPriceFilter}${inputs
          .map((input) => {
            if (!input.checked) {
              return '';
            }
            if (availableStringsCount.size === 0) {
              return input.name;
            }
            if (availableStringsCount.has(parseInt(input.id, 10))) {
              return input.name;
            }
            return input.name.includes(filterParams) ? input.name : '';
          })
          .join('&')}${sortStroke}`
      );
    },
    [currentPriceFilter, setSearchParams, sortStroke]
  );

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link to='/' className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <button className="link">Каталог</button>
            </li>
          </ul>
          <div className="catalog">
            <form
              className='catalog-filter'
              onChange={handleFilter}
            >
              <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Цена, ₽</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden">Минимальная цена</label>
                    <input
                      type='number'
                      placeholder={`${sortedGuitars[0] ? sortedGuitars[0].price : 0}`}
                      id='priceMin'
                      name='от'
                      min={sortedGuitars[0]?.price || 0}
                      max={sortedGuitars[sortedGuitars.length - 1]?.price || 0}
                      defaultValue={searchParams ? `${searchParams?.get('price_gte')}` : ''}
                      onBlur={handlePriceFilter}
                      onKeyDown={(evt) => {
                        if (evt.key === 'Enter') {
                          handlePriceFilter(evt);
                        }
                      }}
                    />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input
                      ref={maxRef}
                      type='number'
                      placeholder={`${sortedGuitars[sortedGuitars.length - 1] ? sortedGuitars[sortedGuitars.length - 1]?.price : 0}`}
                      id='priceMax'
                      name='до'
                      min={0}
                      defaultValue={searchParams.get('price_lte') || ''}
                      onBlur={(evt) => handlePriceFilter(evt, 'price_lte')}
                      onKeyDown={(evt) => {
                        if (evt.key === 'Enter') {
                          handlePriceFilter(evt, 'price_lte');
                        }
                      }}
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className='catalog-filter__block'>
                <legend className='catalog-filter__block-title'>Тип гитар</legend>
                <div className='form-checkbox catalog-filter__block-item'>
                  <input className='visually-hidden' type='checkbox' id='acoustic' name='type=acoustic' defaultChecked={currentTypeFilter.includes('acoustic')} disabled={currentAvailableTypes('acoustic')} />
                  <label htmlFor='acoustic'>Акустические гитары</label>
                </div>
                <div className='form-checkbox catalog-filter__block-item'>
                  <input className='visually-hidden' type='checkbox' id='electric' name='type=electric' defaultChecked={currentTypeFilter.includes('electric')} disabled={currentAvailableTypes('electric')}/>
                  <label htmlFor='electric'>Электрогитары</label>
                </div>
                <div className='form-checkbox catalog-filter__block-item'>
                  <input className='visually-hidden' type='checkbox' id='ukulele' name='type=ukulele' defaultChecked={currentTypeFilter.includes('ukulele')} disabled={currentAvailableTypes('ukulele')}/>
                  <label htmlFor='ukulele'>Укулеле</label>
                </div>
              </fieldset>
              <fieldset className='catalog-filter__block'>
                <legend className='catalog-filter__block-title'>Количество струн</legend>
                <div className='form-checkbox catalog-filter__block-item'>
                  <input
                    className='visually-hidden'
                    type='checkbox'
                    id='4-strings'
                    name='stringCount=4'
                    defaultChecked={currentStringFilter.includes('stringCount=4')}
                    disabled={currentAvailableStrings(4)}
                  />
                  <label htmlFor='4-strings'>4</label>
                </div>
                <div className='form-checkbox catalog-filter__block-item'>
                  <input
                    className='visually-hidden'
                    type='checkbox'
                    id='6-strings'
                    name='stringCount=6'
                    defaultChecked={currentStringFilter.includes('stringCount=6')}
                    disabled={currentAvailableStrings(6)}
                  />
                  <label htmlFor='6-strings'>6</label>
                </div>
                <div className='form-checkbox catalog-filter__block-item'>
                  <input
                    className='visually-hidden'
                    type='checkbox'
                    id='7-strings'
                    name='stringCount=7'
                    defaultChecked={currentStringFilter.includes('stringCount=7')}
                    disabled={currentAvailableStrings(7)}
                  />
                  <label htmlFor='7-strings'>7</label>
                </div>
                <div className='form-checkbox catalog-filter__block-item'>
                  <input
                    className='visually-hidden'
                    type='checkbox'
                    id='12-strings'
                    name='stringCount=12'
                    defaultChecked={currentStringFilter.includes('stringCount=12')}
                    disabled={currentAvailableStrings(12)}
                  />
                  <label htmlFor='12-strings'>12</label>
                </div>
              </fieldset>
              <button className='catalog-filter__reset-btn button button--black-border button--medium' type='reset' onClick={() => setSearchParams(`${sortStroke}`)}>
              Очистить
              </button>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button
                  className={`catalog-sort__type-button ${searchParams.get('_sort') === 'price' && 'catalog-sort__type-button--active'}`}
                  aria-label='по цене'
                  onClick={() => {
                    if (!currentSortDirection) {
                      setSearchParams(`${filterStroke}&_sort=price&_order=asc`);
                    } else {
                      setSearchParams(`${filterStroke}&_sort=price${currentSortDirection}`);
                    }
                  }}
                >
                по цене
                </button>
                <button
                  className={`catalog-sort__type-button ${searchParams.get('_sort') === 'rating' && 'catalog-sort__type-button--active'}`}
                  aria-label='по популярности'
                  onClick={() => {
                    if (!currentSortDirection) {
                      setSearchParams(`${filterStroke}&_sort=rating&_order=asc`);
                    } else {
                      setSearchParams(`${filterStroke}&_sort=rating${currentSortDirection}`);
                    }
                  }}
                >
                по популярности
                </button>
              </div>
              <div className='catalog-sort__order'>
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--up ${searchParams.get('_order') === 'asc' && 'catalog-sort__order-button--active'}`}
                  aria-label='По возрастанию'
                  onClick={() => {
                    if (!currentSortType) {
                      setSearchParams(`${filterStroke}&_sort=price&_order=asc`);
                    } else {
                      setSearchParams(`${filterStroke}&${currentSortType}&_order=asc`);
                    }
                  }}
                />
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--down ${searchParams.get('_order') === 'desc' && 'catalog-sort__order-button--active'}`}
                  aria-label='По убыванию'
                  onClick={() => {
                    if (!currentSortType) {
                      setSearchParams(`${filterStroke}&_sort=price&_order=desc`);
                    } else {
                      setSearchParams(`${filterStroke}&${currentSortType}&_order=desc`);
                    }
                  }}
                />
              </div>
            </div>
            <div className="cards catalog__cards">
              {
                !isGuitarsDataLoaded ? <LoadingScreen/> :
                  <ProductList guitars={guitars}/>
              }
            </div>
            <Pagination totalGuitarsCount={totalGuitarsCount}/>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
