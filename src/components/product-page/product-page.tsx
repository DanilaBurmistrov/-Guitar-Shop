import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOneGuitarCard } from '../../store/api-action';
import { getOneGuitarCard, getOneGuitarCardDataLoadedStatus } from '../../store/selectors';
import Footer from '../footer/footer';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import ProductDetailedCard from '../product-detailed-card/product-detailed-card';
import ProductReviewList from '../product-review-list/product-review-list';


export default function ProductPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const {id} = useParams();

  useEffect( () => {
    if(id) {
      dispatch(fetchOneGuitarCard(id));
    }

  }, [dispatch, id]);

  const guitarCardData = useAppSelector(getOneGuitarCard);
  const isOneGuitarCardDataLoaded = useAppSelector(getOneGuitarCardDataLoadedStatus);

  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{guitarCardData?.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link to='/' className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link to='/' className="link">Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><a className="link" href="/">{guitarCardData?.name}</a>
            </li>
          </ul>
          {
            !isOneGuitarCardDataLoaded ? <LoadingScreen />
              :
              (guitarCardData &&
              <>
                <ProductDetailedCard guitar={guitarCardData}/>

                <ProductReviewList reviews={guitarCardData.comments} guitarName={guitarCardData.name} id={guitarCardData.id}/>
              </>
              )
          }
        </div>
      </main>

      <Footer />

    </div>
  );
}
