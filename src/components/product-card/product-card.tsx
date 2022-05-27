import { Link } from 'react-router-dom';
import { Guitar } from '../../types/types';
import StarRating from '../star-rating/star-rating';
import { getGuitarImgForSrcSet } from '../utils/utils';

type ProductPageProps = {
  guitar: Guitar
}

export default function ProductCard({guitar}: ProductPageProps): JSX.Element {

  return (
    <div className="product-card">
      <img src={`/${guitar.previewImg}`} srcSet={`/${getGuitarImgForSrcSet(guitar.previewImg)}@2x.jpg 2x`} width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <StarRating ratingNumber={guitar.rating}/>
          <p className="visually-hidden">Рейтинг: {guitar.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{guitar.comments.length}</p>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена: {guitar.price} ₽</span>
        </p>
      </div>
      <div className="product-card__buttons"><Link className="button button--mini" to={`/product/${guitar.id}`}>Подробнее</Link><a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>
      </div>
    </div>
  );
}
