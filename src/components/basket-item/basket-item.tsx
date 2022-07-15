import { useState, ChangeEvent, useRef } from 'react';
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

  const inputRef = useRef<HTMLInputElement>(null);

  const handleNumberChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (+evt.target.value < 1) {
      evt.target.value = '1';
      dispatch(setGuitarQuantity({ id, count: 1 }));
      return;
    }

    if (+evt.target.value > 99) {
      return;
    }
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
          onClick={() => {
            if (Number(inputRef.current?.value) === 1) {
              dispatch(reduceGuitarQuantity(guitar));
              return;
            }
            if (inputRef.current?.value) {
              inputRef.current.value = `${count - 1}`;
            }
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
          placeholder={String(count)}
          id='2-count'
          name='2-count'
          max={99}
          ref={inputRef}
          defaultValue={count}
          data-testid='counter'
          onBlur={handleNumberChange}
        />
        <button
          className='quantity__button'
          data-testid='plus-btn'
          aria-label='Увеличить количество'
          disabled={Number(inputRef.current?.value) === 99}
          onClick={() => {
            if (inputRef.current?.value) {
              inputRef.current.value = `${count + 1}`;
            }
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
