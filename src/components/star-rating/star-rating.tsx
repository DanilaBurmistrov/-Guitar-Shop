import { STARS_COUNT } from '../../const';

type StarRatingProps = {
  ratingNumber: 1 | 2 | 3 | 4 | 5
}

export default function StarRating({ratingNumber}: StarRatingProps): JSX.Element {
  return (
    <>
      {
        Array.from({ length: STARS_COUNT }, (v, k) => k).map((_, ind) => (
          <svg key={_} width="12" height="11" aria-hidden="true">
            <title>Star</title>
            <use xlinkHref={ratingNumber >= (ind + 1) ? '#icon-full-star' : '#icon-star'}></use>
          </svg>))
      }
    </>
  );
}
