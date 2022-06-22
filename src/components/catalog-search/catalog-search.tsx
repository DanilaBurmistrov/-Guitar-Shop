import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { Guitars } from '../../types/types';

export default function CatalogSearch(): JSX.Element {
  const [isEmpty, setIsEmpty] = useState(true);
  const { guitars } = useAppSelector(({ DATA }) => DATA);
  const [searchResult, setSearchResult] = useState<Guitars>([]);
  const searchRef = useRef<HTMLFormElement>(null);
  const searchContainer = useRef<HTMLDivElement>(null);

  const resetSearch = () => {
    setSearchResult([]);
    setIsEmpty(true);
    searchRef.current?.reset();
  };

  const handleOutsideClick = (evt: Event) => {
    const target = evt.target as Node;
    if (searchContainer.current && !searchContainer.current.contains(target)) {
      resetSearch();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  const handleSearch = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setIsEmpty(!evt.currentTarget.value);
      setSearchResult(guitars.slice().filter((guitar) => guitar.name.toLowerCase().includes(evt.currentTarget.value.toLowerCase())));
    },
    [guitars]
  );

  return (
    <div className='form-search' ref={searchContainer}>
      <form className='form-search__form' id='form-search' ref={searchRef}>
        <button className='form-search__submit' type='submit' onClick={(evt) => evt.preventDefault()}>
          <svg className='form-search__icon' width={14} height={15} aria-hidden='true'>
            <use href='#icon-search' />
          </svg>
          <span className='visually-hidden'>Начать поиск</span>
        </button>
        <input className='form-search__input' id='search' type='text' autoComplete='off' placeholder='что вы ищите?' onChange={handleSearch} />
        <label className='visually-hidden' htmlFor='search'>
          Поиск
        </label>
      </form>
      {!isEmpty && (
        <ul className={`form-search__select-list list-opened ${!searchResult.length && 'form-search__select-list--no-match'}`}>
          {searchResult.map((guitar) => (
            <Link className='form-search__select-item' key={guitar.id} to={`/product/${guitar.id}`} onClick={resetSearch}>
              <li className='form-search__select-item' tabIndex={1}>
                {guitar.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
      <button className='form-search__reset' type='reset' form='form-search' onClick={() => setIsEmpty(true)}>
        <svg className='form-search__icon' width={14} height={15} aria-hidden='true'>
          <use xlinkHref='#icon-close' />
        </svg>
        <span className='visually-hidden'>Сбросить поиск</span>
      </button>
    </div>
  );
}
