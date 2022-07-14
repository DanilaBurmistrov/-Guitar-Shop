import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectBasketGuitars } from '../../store/selectors';
import { Guitar } from '../../types/types';
import ModalAddSuccess from '../modal-add-success/modal-add-success';
import ModallAdd from '../modal-add/modal-add';
import StarRating from '../star-rating/star-rating';
import { getGuitarImgForSrcSet } from '../utils/utils';

type ProductCardProps = {
  guitar: Guitar
}

export default function ProductCard({guitar}: ProductCardProps): JSX.Element {

  const guitars = useAppSelector(selectBasketGuitars);

  const { id, name, price, rating, previewImg, comments } = guitar;

  const [isAddToBasketModalOpened, setIsAddToBasketModalOpened] = useState(false);
  const [isModalAddSuccessOpened, setIsAModalAddSuccessOpened] = useState(false);

  if(isAddToBasketModalOpened || isModalAddSuccessOpened) {
    document.body.style.overflow = 'hidden';
  }
  else {
    document.body.style.overflow = 'unset';
  }

  return (
    <>
      <div className="product-card" key={id}><img src={`/${previewImg}`} srcSet={`/${getGuitarImgForSrcSet(previewImg)}@2x.jpg 2x`} width={75} height={190} alt={name} />
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <StarRating ratingNumber={rating}/>
            <p className="visually-hidden">Рейтинг: {rating}</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{comments.length}</p>
          </div>
          <p className="product-card__title">{name}</p>
          <p className="product-card__price"><span className="visually-hidden">Цена: {price} ₽</span>
          </p>
        </div>
        <div className="product-card__buttons"><Link className="button button--mini" to={`/product/${id}`}>Подробнее</Link>{!guitars.some((product) => product.id === guitar.id) ? (
          <button
            className='button button--red button--mini button--add-to-cart'
            onClick={() => {
              setIsAddToBasketModalOpened(true);
            }}
          >
            Купить
          </button>
        ) : (
          <Link className='button button--red-border button--mini button--in-cart' to={AppRoute.Basket}>
            В Корзине
          </Link>
        )}
        </div>
      </div>
      {isAddToBasketModalOpened && <ModallAdd setIsAddToBasketModalOpened={setIsAddToBasketModalOpened} guitar={guitar} setIsAModalAddSuccessOpened={setIsAModalAddSuccessOpened}/>}
      {isModalAddSuccessOpened && <ModalAddSuccess setIsAModalAddSuccessOpened={setIsAModalAddSuccessOpened}/>}
    </>
  );
}
