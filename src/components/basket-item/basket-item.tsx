import { useState, ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import ModalDelete from '../modal-delete/modal-delete';
import { raiseGuitarQuantity, reduceGuitarQuantity, setGuitarQuantity } from '../../store/basket-process-data/basket-process-data';
import { InitialGuitar } from '../../types/types';
import { getGuitarImgForSrcSet } from '../utils/utils';

type BasketItemProps = {
  guitar: InitialGuitar,
}

export default function BasketItem({guitar} : BasketItemProps): JSX.Element {

  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  const { id, name, vendorCode, stringCount, type, price, previewImg, count } = guitar;

  const dispatch = useAppDispatch();

  const [number, setNumber] = useState(count);

  const handleNumberChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (+evt.target.value < 1) {
      setNumber(1);

      return;
    }

    if (+evt.target.value > 99) {
      setNumber(99);

      return;
    }
    setNumber(Number(evt.target.value));
    dispatch(setGuitarQuantity({ id, count: +evt.target.value }));
  };

  if(isDeleteModalOpened) {
    document.body.style.overflow = 'hidden';
  }
  else {
    document.body.style.overflow = 'unset';
  }

  return (
    <div className="cart-item" key={id}>
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={() => setIsDeleteModalOpened(true)}><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={`/${previewImg}`} srcSet={`/${getGuitarImgForSrcSet(previewImg)}@2x.jpg 2x`} width={55} height={130} alt={name} />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{type}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button
          className='quantity__button'
          aria-label='Уменьшить количество'
          data-testid='minus-btn'
          disabled={number === 1}
          onClick={() => {
            setNumber((prev) => prev - 1);
            dispatch(reduceGuitarQuantity(guitar));
          }}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className='quantity__input'
          type='number'
          placeholder={String(number)}
          id='2-count'
          name='2-count'
          max={99}
          value={number}
          onBlur={handleNumberChange}
          onChange={handleNumberChange}
          data-testid='counter'
        />
        <button
          data-testid='plus-btn'
          className='quantity__button'
          aria-label='Увеличить количество'
          disabled={number === 99}
          onClick={() => {
            setNumber((prev) => prev + 1);
            dispatch(raiseGuitarQuantity(id));
          }}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{price * count} ₽</div>
      {isDeleteModalOpened && <ModalDelete setIsDeleteModalOpened={setIsDeleteModalOpened} guitar={guitar}/>}
    </div>
  );
}
