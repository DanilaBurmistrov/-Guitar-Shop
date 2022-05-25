import { AppRoute } from '../../const';
import { Route, Routes } from 'react-router-dom';
import MainScreen from '../main-screen/main-screen';
import PageNotFound from '../page-not-found/page-not-found';
import CatalogScreen from '../catalog-screen/catalog-screen';
import ProductPage from '../product-page/product-page';
import InternalServerError from '../internal-server-error/internal-server-error';

export default function App(): JSX.Element {

  return (
    <Routes>
      <Route
        path={AppRoute.MainScreen}
        element={<MainScreen />}
      />
      <Route
        path={AppRoute.CatalogPage}
        element={<CatalogScreen />}
      />
      <Route
        path={AppRoute.ProductPage}
        element={<ProductPage />}
      />
      <Route
        path={AppRoute.ServerError}
        element={<InternalServerError /> }
      />
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  );
}
