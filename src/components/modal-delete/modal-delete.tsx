import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGuitarImgForSrcSet } from '../utils/utils';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { deleteGuitarFromBasket } from '../../store/basket-process-data/basket-process-data';
import { InitialGuitar } from '../../types/types';

type ModallDeleteProps = {
  setIsDeleteModalOpened: React.Dispatch<React.SetStateAction<boolean>>,
  guitar: InitialGuitar,
}

export default function ModalDelete ({setIsDeleteModalOpened, guitar}: ModallDeleteProps): JSX.Element {

  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const firstAutofocusRef = useRef<HTMLButtonElement>(null);
  const lastAutofocusRef = useRef<HTMLButtonElement>(null);

  function handleEscKeydown(evt: KeyboardEvent) {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      setIsDeleteModalOpened(false);
    }
  }

  function handleModalOverlayClick(evt: MouseEvent) {
    evt.preventDefault();
    setIsDeleteModalOpened(false);
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
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal ref={modalOverlayRef}></div>
        <div className="modal__content">
          <span tabIndex={1} onFocus={(evt) => {lastAutofocusRef.current?.focus();}}/>
          <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
          <div className="modal__info">
            <img src={`/${guitar.previewImg}`} srcSet={`/${getGuitarImgForSrcSet(guitar.previewImg)}@2x.jpg 2x`} width="67" height="137" alt={guitar.name} />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase"> Гитара {guitar.name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
              <p className="modal__product-params">{guitar.type}, {guitar.stringCount} струнная</p>
              <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{guitar.price} ₽</span></p>
            </div>
          </div>
          <div className="modal__button-container">
            <button className="button button--small modal__button" onClick={() => [dispatch(deleteGuitarFromBasket(guitar.id)), setIsDeleteModalOpened(false)]} ref={firstAutofocusRef} tabIndex={2}>Удалить товар</button>
            <Link className="button button--black-border button--small modal__button modal__button--right" to={AppRoute.MainScreen} onClick={() => setIsDeleteModalOpened(false)} tabIndex={3}>Продолжить покупки</Link>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={() => setIsDeleteModalOpened(false)} autoFocus ref={lastAutofocusRef} tabIndex={4}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
          <span tabIndex={5} onFocus={(evt) => {firstAutofocusRef.current?.focus();}}/>
        </div>
      </div>
    </div>
  );
}
