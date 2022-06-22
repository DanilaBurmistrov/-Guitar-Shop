import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSearchResultGuitars } from '../../store/api-action';
import { getSearchResultGuitars } from '../../store/selectors';


export default function CatalogSearch(): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchInputValue, setSearchInputValue] = useState('');

  function handleSearchInputChange(value: string) {

    setSearchInputValue(value);
  }

  useEffect(() => {

    dispatch(fetchSearchResultGuitars(searchInputValue));

  }, [dispatch, searchInputValue]);

  const serchResultGuitars = useAppSelector(getSearchResultGuitars);

  function handleSearchInputSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if(searchInputValue) {
      dispatch(fetchSearchResultGuitars(searchInputValue));
    }
  }

  function handleSelectListClick(evt: React.MouseEvent<HTMLUListElement>) {
    evt.preventDefault();
    const target = evt.target as HTMLUListElement;
    navigate(`/product/${target.dataset.guitarid}`);
    setSearchInputValue('');

  }

  return (
    <div className='form-search'>
      <form className='form-search__form' id='form-search' onSubmit={(evt) => handleSearchInputSubmit(evt)} onReset={() => handleSearchInputChange('')}>
        <button className='form-search__submit' type='submit' onClick={(evt) => evt.preventDefault()}>
          <svg className='form-search__icon' width={14} height={15} aria-hidden='true'>
            <use href='#icon-search' />
          </svg>
          <span className='visually-hidden'>Начать поиск</span>
        </button>
        <input className='form-search__input' id='search' type='text' autoComplete='off' placeholder='что вы ищите?' onChange={(evt) => { handleSearchInputChange(evt.target.value);}} />
        <label className='visually-hidden' htmlFor='search'>
          Поиск
        </label>
      </form>
      <ul className={`form-search__select-list ${(serchResultGuitars[0]) ? 'list-opened' : 'hidden'} `} onClick={(evt) => handleSelectListClick(evt)}>
        {serchResultGuitars.map((serchedGuitar) => <li key={serchedGuitar.id} className="form-search__select-item" data-guitarid={serchedGuitar.id} tabIndex={1}>{serchedGuitar.name}</li>)}
      </ul>
      <button className='form-search__reset' type='reset' form='form-search' style={ {display: searchInputValue ? 'block' : 'none'}}>
        <svg className='form-search__icon' width={14} height={15} aria-hidden='true'>
          <use xlinkHref='#icon-close' />
        </svg>
        <span className='visually-hidden'>Сбросить поиск</span>
      </button>
    </div>
  );
}
