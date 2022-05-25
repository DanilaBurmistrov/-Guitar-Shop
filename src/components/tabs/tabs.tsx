import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GUITAR_TYPE } from '../../const';
import { Guitar } from '../../types/types';


type TabsProps = {
  guitar: Guitar;
}

export default function Tabs({guitar}: TabsProps): JSX.Element {

  const [activeTab, setActiveTab] = useState('#characteristics');

  const {hash} = useLocation();

  useEffect(() => {
    if(hash) {
      setActiveTab(hash);
    }
  }, [hash]);

  return (
    <div className="tabs">
      <Link to={'#characteristics'} className={`button ${activeTab !== '#characteristics' && 'button--black-border'} button--medium tabs__button`} >Характеристики</Link>
      <Link to={'#description'} className={`button ${activeTab !== '#description' && 'button--black-border'} button--medium tabs__button`} >Описание</Link>
      <div className="tabs__content" id="characteristics">
        {
          activeTab === '#characteristics' ?
            <table className="tabs__table">
              <tr className="tabs__table-row">
                <td className="tabs__title">Артикул:</td>
                <td className="tabs__value">{guitar.vendorCode}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Тип:</td>
                <td className="tabs__value">{GUITAR_TYPE[guitar.type]}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Количество струн:</td>
                <td className="tabs__value">{guitar.stringCount} струнная</td>
              </tr>
            </table>
            : <p className="tabs__product-description">{guitar.description}</p>
        }
      </div>
    </div>
  );
}
