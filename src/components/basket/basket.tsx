import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCoupon } from '../../store/api-action';
import { selectBasketGuitars, selectDiscount, selectSubtotal, selectTotal } from '../../store/selectors';
import BasketItem from '../basket-item/basket-item';
import Footer from '../footer/footer';
import Header from '../header/header';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export default function Basket(): JSX.Element {

  const guitars = useAppSelector((selectBasketGuitars));
  const subtotal = useAppSelector(selectSubtotal);
  const discount = useAppSelector(selectDiscount);
  const total = useAppSelector(selectTotal);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | undefined>();

  const { register, handleSubmit, reset } = useForm({ mode: 'onSubmit' });

  const handleCouponSubmit: SubmitHandler<FieldValues> = ({coupon}) => {
    dispatch(fetchCoupon([coupon.trim(), setError]));
    reset();
  };

  return (
    <>
      <Header/>
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <div className="cart">
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><Link to='/' className="link">Главная</Link>
              </li>
              <li className="breadcrumbs__item"><Link to='/' className="link">Каталог</Link>
              </li>
              <li className="breadcrumbs__item"><a className="link" href="/">Корзина</a>
              </li>
            </ul>
            {guitars.map((guitar) => (
              <BasketItem key={guitar.id} guitar={guitar}/>
            ))}
            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" method="post" onSubmit={handleSubmit(handleCouponSubmit)}>
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input type="text" placeholder="Введите промокод" id="coupon" {...register('coupon')}/>
                    <p className={`form-input__message ${error === 'dismiss' && 'form-input__message--error'} ${error === 'success' && 'form-input__message--success'}`}>
                      {error === 'success' && 'Промокод принят'} {error === 'dismiss' && 'Неверный промокод'}
                    </p>
                  </div>
                  <button className="button button--big coupon__button">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{subtotal} ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className={`cart__total-value ${discount && 'cart__total-value--bonus '}`}>{discount > 0 ? '-' : ''} {discount} ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{total} ₽</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}
