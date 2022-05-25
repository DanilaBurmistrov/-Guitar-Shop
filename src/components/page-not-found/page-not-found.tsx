import {Link} from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';

export default function PageNotFound(): JSX.Element {
  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <div style={{marginBottom: 40}}>
            <h1 className="page-title" style={{textAlign: 'center'}}>404 Page not found</h1>
            <Link to="/">Go to main page</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
