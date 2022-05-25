import { useEffect, useRef } from 'react';

type ModalSuccessReviewProps = {
  setIsSuccessReviewModalOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalSuccessReview({setIsSuccessReviewModalOpened}: ModalSuccessReviewProps): JSX.Element {

  const modalSuccessOverlayRef = useRef<HTMLDivElement>(null);

  const firstAutofocusRef = useRef<HTMLButtonElement>(null);

  const lastAutofocusRef = useRef<HTMLButtonElement>(null);

  function handleEscKeydown(evt: KeyboardEvent) {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      setIsSuccessReviewModalOpened(false);
    }
  }

  function handleModalSuccessOverlayClick(evt: MouseEvent) {
    evt.preventDefault();
    setIsSuccessReviewModalOpened(false);
  }

  useEffect(() => {
    const modaSuccesslOverlay = modalSuccessOverlayRef.current;

    if(modaSuccesslOverlay) {
      modaSuccesslOverlay.addEventListener('click', handleModalSuccessOverlayClick);
      document.addEventListener('keydown', handleEscKeydown);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);

      if(modaSuccesslOverlay) {
        modaSuccesslOverlay.removeEventListener('click', handleModalSuccessOverlayClick);
      }
    };

  });

  return (
    <div className="modal is-active modal--success modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal ref={modalSuccessOverlayRef}></div>
        <div className="modal__content">
          <span tabIndex={1} onFocus={(evt) => {lastAutofocusRef.current?.focus();}}/>
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Спасибо за ваш отзыв!</p>
          <div className="modal__button-container modal__button-container--review">
            <button className="button button--small modal__button modal__button--review" onClick={()=> {setIsSuccessReviewModalOpened(false);}} ref={firstAutofocusRef} tabIndex={2}>К покупкам!</button>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" autoFocus onClick={(evt)=> {setIsSuccessReviewModalOpened(false);}} ref={lastAutofocusRef} tabIndex={3}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
          <span tabIndex={4} onFocus={(evt) => {firstAutofocusRef.current?.focus();}}/>
        </div>
      </div>
    </div>
  );
}
