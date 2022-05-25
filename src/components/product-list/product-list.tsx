import { useState, useEffect } from 'react';
import { GUITAR_PER_PAGE } from '../../const';
import { Guitars } from '../../types/types';
import ProductCard from '../product-card/product-card';

type ProductListProps = {
  guitars: Guitars
}

export default function ProductList({guitars}: ProductListProps): JSX.Element {

  const [renderedGuitarsCount] = useState(GUITAR_PER_PAGE);

  const [guitarsForRender, setGuitarsForRender] = useState(guitars.slice(0, GUITAR_PER_PAGE));

  useEffect(() => {
    setGuitarsForRender(guitars.slice(0, renderedGuitarsCount));
    return () => {
      setGuitarsForRender([]);
    };
  }, [renderedGuitarsCount, guitars]);

  return (
    <div className="cards catalog__cards">
      {guitarsForRender.map((guitar) => <ProductCard key={guitar.id} guitar={guitar} />,
      )}
    </div>
  );
}
