import Form from '../Form/Form.jsx';
import Aside from '../Aside/Aside.jsx';
import OffersList from '../OffersList/OffersList.jsx';
import OffersDetails from '../OffersDetails/OffersDetails.jsx';
import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './Dashboard.css';

export async function callApi (param) {
    const res = await fetch(`https://infojobs-hackathon-db.vercel.app/api/data/${param}`);
    const data = await res.json()
    return data;
}

export default function Dashboard() {

    const [ callTo, setCallTo ] = useState('');
    const [ apiResponse, setApiResponse ] = useState([]);
    const [ title, setTitle ] = useState('Todas las ofertas');
    const [ savedSearch, setSavedSearch ] = useState(JSON.parse(localStorage.getItem('searchs')) || []);

    useEffect(() => {
        const savedSearchs = JSON.parse(localStorage.getItem('searchs'))
        if (savedSearchs?.length > 0) {
            setSavedSearch(savedSearchs)
            console.log((savedSearchs[0].params))
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await callApi(callTo);
            setApiResponse(data);
        }
        fetchData();

    }, [callTo])

    let page = 1

    // Setea la página a mostrar, luego la agrega en la llamada a la api (callTo);
    const handlePage = (direction) => {
      let newPage = direction === 'next' ? page + 1 : page - 1;
      newPage = Math.max(newPage, 1);
    
      const pageParam = `&page=${newPage}`;
      const pageRegex = /&page=\d+/;
    
      if (callTo.includes('&page=')) {
        setCallTo(callTo.replace(pageRegex, pageParam));
      } else {
        setCallTo(callTo + pageParam);
      }
    
      page = newPage;
    };

    const handleSaveSearch = (newTotalSearchs) => {
        setSavedSearch(newTotalSearchs);
        localStorage.setItem('searchs', JSON.stringify(newTotalSearchs));
      };

    return (
        <main className="Dashboard">
            { savedSearch.length > 0 ? 
            <>
                <h2 className="Dashboard__title">Mostrando resultados para: <span className="highlighted">{title} </span></h2> 
                <p className="Dashboard__description">Resultados totales: <span className="totalOffers">{apiResponse?.totalResults}</span> - Mostrando  <b>{apiResponse?.currentResults}</b> por página y por mas reciente</p>
                <div className="row">
                    <Aside savedSearch={savedSearch} setCallTo={setCallTo} setTitle={setTitle} handleSaveSearch={handleSaveSearch} />
                    <Tabs className="Tabs">
                        <TabList className="TabList">
                            <Tab>Lista de ofertas</Tab>
                            <Tab>Detalles</Tab>
                            <div className="Tab__btns">
                                <span onClick={() => handlePage("previous")}>🡸</span>
                                <span onClick={() => handlePage("next")}>🡺</span>
                            </div>
                        </TabList>
                        <TabPanel className="TabPanel">
                            <OffersList apiResponse={apiResponse}/>
                        </TabPanel>
                        <TabPanel className="TabPanel">
                            <OffersDetails apiResponse={apiResponse} callTo={callTo} setCallTo={setCallTo} />
                        </TabPanel>
                    </Tabs>
                </div>
            </>
            :
            <>
                <h2>Guarda una búsqueda para empezar, luego haga click sobre la misma</h2>
                <Form className="form" handleSaveSearch={handleSaveSearch} />
            </>
            }
        </main>
    )
}

