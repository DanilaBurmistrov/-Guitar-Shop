import { useState, useEffect } from 'react';
import { COMMENTS_COUNT_PER_STEP } from '../../const';
import { Comments } from '../../types/types';
import { sortReviewsByDate } from '../utils/utils';
import ModalReview from '../modal-review/modal-review';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import ProductReview from '../product-review/product-review';
import { ShowMoreButton } from '../show-more-button/show-more-button';

type ProductReviewListProps = {
  reviews: Comments,
  guitarName: string,
  id: number,
}

export default function ProductReviewList({reviews, guitarName, id}: ProductReviewListProps): JSX.Element {

  const sortedReviews = sortReviewsByDate(reviews);

  const [reviewsForRender, setReviewsForRender] = useState(sortedReviews.slice(0, COMMENTS_COUNT_PER_STEP));

  const [renderedReviewsCount, setRenderedReviewsCount] = useState(COMMENTS_COUNT_PER_STEP);

  const [isReviewFormModalOpened, setIsReviewFormModalOpened] = useState(false);

  const [isSuccessReviewModalOpened, setIsSuccessReviewModalOpened] = useState(false);

  useEffect(() => {
    setReviewsForRender(sortedReviews.slice(0, renderedReviewsCount));
    return () => {
      setReviewsForRender([]);
    };
  }, [renderedReviewsCount]);

  useEffect(() => {
    setReviewsForRender(sortedReviews.slice(0, COMMENTS_COUNT_PER_STEP));
    return () => {
      setReviewsForRender([]);
    };
  }, [reviews]);

  function handleShowMoreButtonClick() {
    setRenderedReviewsCount(renderedReviewsCount + COMMENTS_COUNT_PER_STEP);
  }

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  if(isReviewFormModalOpened || isSuccessReviewModalOpened) {
    document.body.style.overflow = 'hidden';
  }
  else {
    document.body.style.overflow = 'unset';
  }

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <button className="button button--red-border button--big reviews__sumbit-button" onClick={() => setIsReviewFormModalOpened(true)}>
        Оставить отзыв
      </button>
      {reviewsForRender.map((review) => <ProductReview key={review.id} review={review} />,)}
      {
        renderedReviewsCount <  reviews.length && <ShowMoreButton onClick={handleShowMoreButtonClick} />
      }
      <button className="button button--up button--red-border button--big reviews__up-button" onClick={topFunction}>
        Наверх
      </button>
      {isReviewFormModalOpened && <ModalReview id={id} guitarName={guitarName} setIsFormModalOpened={setIsReviewFormModalOpened} setIsSuccessReviewModalOpened={setIsSuccessReviewModalOpened} />}
      {isSuccessReviewModalOpened && <ModalSuccessReview setIsSuccessReviewModalOpened={setIsSuccessReviewModalOpened}/> }
    </section>
  );
}
