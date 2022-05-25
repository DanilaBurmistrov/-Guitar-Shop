type ShowMoreButtonProps = {
  onClick: () => void;
}

export function ShowMoreButton({onClick}: ShowMoreButtonProps): JSX.Element {

  return (
    <button className="button button--medium reviews__more-button" type="button" onClick={onClick}>
          Показать еще отзывы
    </button>
  );
}
