import { useState } from 'react';
import { Guitar } from '../../types/types';
import ModalAddSuccess from '../modal-add-success/modal-add-success';
import ModallAdd from '../modal-add/modal-add';
import StarRating from '../star-rating/star-rating';
import Tabs from '../tabs/tabs';
import { getGuitarImgForSrcSet } from '../utils/utils';

type ProductDetailedCardProps = {
  guitar: Guitar
}

export default function ProductDetailedCard({guitar}: ProductDetailedCardProps): JSX.Element {

  const [isAddToBasketModalOpened, setIsAddToBasketModalOpened] = useState(false);
  const [isModalAddSuccessOpened, setIsAModalAddSuccessOpened] = useState(false);

  if(isAddToBasketModalOpened || isModalAddSuccessOpened) {
    document.body.style.overflow = 'hidden';
  }
  else {
    document.body.style.overflow = 'unset';
  }

  return (
    <div className="product-container">
      <img className="product-container__img" src={`/${guitar.previewImg}`} srcSet={`/${getGuitarImgForSrcSet(guitar.previewImg)}@2x.jpg 2x`} width="90" height="235" alt={guitar.name} />
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{guitar.name}</h2>
        <div className="rate product-container__rating">
          <StarRating ratingNumber={guitar.rating}/>
          <p className="visually-hidden">Оценка: {guitar.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{guitar.comments.length}</p>
        </div>
        <Tabs guitar={guitar}/>
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">Цена:</p>
        <p className="product-container__price-info product-container__price-info--value">{guitar.price} ₽</p><button className="button button--red button--big product-container__button" onClick={() => setIsAddToBasketModalOpened(true)}>Добавить в корзину</button>
      </div>
      {isAddToBasketModalOpened && <ModallAdd setIsAddToBasketModalOpened={setIsAddToBasketModalOpened} guitar={guitar} setIsAModalAddSuccessOpened={setIsAModalAddSuccessOpened}/>}
      {isModalAddSuccessOpened && <ModalAddSuccess setIsAModalAddSuccessOpened={setIsAModalAddSuccessOpened}/>}
    </div>
  );
}
