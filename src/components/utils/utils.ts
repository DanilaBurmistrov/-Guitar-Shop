import { Comments } from '../../types/types';

export function sortReviewsByDate(reviews: Comments) {

  const arrayForSort = [...reviews];
  return arrayForSort.sort((reviewA,reviewB)=> {
    const dateA = new Date(reviewA.createAt) as unknown as number;
    const dateB = new Date(reviewB.createAt) as unknown as number;
    return  dateB - dateA;
  });
}
