import {Link} from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import { useStyles } from './styles';

export default function PageNotFound(): JSX.Element {

  const classes = useStyles();

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <div className={classes.container}>
            <h1 className={classes.text}>404 Page not found</h1>
            <Link to="/">Go to main page</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
