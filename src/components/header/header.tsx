import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectBasketGuitars } from '../../store/selectors';
import CatalogSearch from '../catalog-search/catalog-search';

export default function Header(): JSX.Element {

  const guitars = useAppSelector(selectBasketGuitars);

  const guitarsCount = guitars.reduce((acc, cur) => acc + cur.count, 0);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={AppRoute.MainScreen}>
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><a className="link main-nav__link link--current" href="/">Каталог</a>
            </li>
            <li><a className="link main-nav__link" href="/">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="/">О компании</a>
            </li>
          </ul>
        </nav>
        <CatalogSearch />
        <Link className="header__cart-link" to={AppRoute.Basket} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span>
          {guitars && <span className={`header__cart-count ${!guitars.length && 'visually-hidden'}`}>{guitarsCount}</span>}
        </Link>
      </div>
    </header>
  );
}
