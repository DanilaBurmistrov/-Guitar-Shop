import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type ModalAddSuccessProps = {
  setIsAModalAddSuccessOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalAddSuccess({setIsAModalAddSuccessOpened}: ModalAddSuccessProps): JSX.Element {

  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const firstAutofocusRef = useRef<HTMLButtonElement>(null);
  const lastAutofocusRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  function handleEscKeydown(evt: KeyboardEvent) {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      setIsAModalAddSuccessOpened(false);
    }
  }

  function handleModalOverlayClick(evt: MouseEvent) {
    evt.preventDefault();
    setIsAModalAddSuccessOpened(false);
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
    <div className="modal is-active modal--success modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal ref={modalOverlayRef}></div>
        <div className="modal__content">
          <span tabIndex={1} onFocus={(evt) => {lastAutofocusRef.current?.focus();}}/>
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Товар успешно добавлен в корзину</p>
          <div className="modal__button-container modal__button-container--add">
            <button className="button button--small modal__button" onClick={() => navigate(AppRoute.Basket)} ref={firstAutofocusRef} tabIndex={2}>Перейти в корзину</button>
            <button className="button button--black-border button--small modal__button modal__button--right" onClick={() => [setIsAModalAddSuccessOpened(false), navigate(AppRoute.MainScreen)]} tabIndex={3}>Продолжить покупки</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" autoFocus onClick={() => setIsAModalAddSuccessOpened(false)} ref={lastAutofocusRef} tabIndex={4}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
          <span tabIndex={5} onFocus={(evt) => {firstAutofocusRef.current?.focus();}}/>
        </div>
      </div>
    </div>
  );
}
