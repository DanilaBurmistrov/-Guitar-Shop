import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { addToBasket } from '../../store/basket-process-data/basket-process-data';
import { Guitar } from '../../types/types';
import { getGuitarImgForSrcSet } from '../utils/utils';


type ModallAddProps = {
  setIsAddToBasketModalOpened: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAModalAddSuccessOpened: React.Dispatch<React.SetStateAction<boolean>>,
  guitar: Guitar,
}

export default function ModallAdd({setIsAddToBasketModalOpened, guitar, setIsAModalAddSuccessOpened}: ModallAddProps): JSX.Element {

  const firstAutofocusRef = useRef<HTMLButtonElement>(null);
  const lastAutofocusRef = useRef<HTMLButtonElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { name, vendorCode, stringCount, type, price, previewImg } = guitar;

  function handleEscKeydown(evt: KeyboardEvent) {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      setIsAddToBasketModalOpened(false);
    }
  }

  function handleModalOverlayClick(evt: MouseEvent) {
    evt.preventDefault();
    setIsAddToBasketModalOpened(false);
  }

  useEffect(() => {
    const modalOverlay = modalOverlayRef.current;

    if(modalOverlay) {
      modalOverlay.addEventListener('click', handleModalOverlayClick);
    }

    if(modalOverlayRef.current) {
      document.addEventListener('keydown', handleEscKeydown);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);

      if(modalOverlay) {
        modalOverlay.removeEventListener('click', handleModalOverlayClick);
      }
    };
  });

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal ref={modalOverlayRef}></div>
        <div className="modal__content">
          <span tabIndex={1} onFocus={(evt) => {lastAutofocusRef.current?.focus();}}/>
          <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
          <div className="modal__info"><img className='modal__img' src={`/${previewImg}`} srcSet={`/${getGuitarImgForSrcSet(previewImg)}@2x.jpg 2x`} width={55} height={130} alt={name} />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase"> Гитара {name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
              <p className="modal__product-params">{type}, {stringCount} струнная</p>
              <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{price} ₽</span></p>
            </div>
          </div>
          <div className="modal__button-container">
            <button className="button button--red button--big modal__button modal__button--add" onClick={() => [dispatch(addToBasket(guitar)), setIsAModalAddSuccessOpened(true), setIsAddToBasketModalOpened(false)]} ref={firstAutofocusRef} tabIndex={2}>Добавить в корзину</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" autoFocus onClick={() => setIsAddToBasketModalOpened(false)} ref={lastAutofocusRef} tabIndex={3}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
          <span tabIndex={4} onFocus={(evt) => {firstAutofocusRef.current?.focus();}}/>
        </div>
      </div>
    </div>
  );
}


