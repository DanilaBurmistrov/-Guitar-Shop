import Footer from '../footer/footer';
import Header from '../header/header';

export default function InternalServerError(): JSX.Element {
  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <div style={{marginBottom: 40}}>
            <h1 className="page-title" style={{textAlign: 'center'}}>500 Internal Server Error</h1>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


