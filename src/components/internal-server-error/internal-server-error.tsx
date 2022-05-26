import Footer from '../footer/footer';
import Header from '../header/header';
import { useStyles } from './styles';

export default function InternalServerError(): JSX.Element {

  const classes = useStyles();

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <div className={classes.container}>
            <h1 className={classes.text}>500 Internal Server Error</h1>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


