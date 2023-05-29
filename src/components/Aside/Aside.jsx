import './Aside.css';
import Form from '../Form/Form.jsx';
import { useState, useRef, useEffect } from 'react'; 

export default function Aside({savedSearch, setCallTo, setTitle, handleSaveSearch}) {

    const [ showModal, setShowModal ] = useState(false);
    const searchRef = useRef([])

    useEffect(() => {}, [savedSearch])

    const handleModal = () => {
        setShowModal(!showModal);
    }

    const updatedData = savedSearch.map(obj => {
        const params = Object.entries(obj)
          .filter(([key]) => key !== 'text' || 'params')
          .map(([key, value]) => `${key}=${value.value}`)
          .join('&');
        return { ...obj, params };
      });
    
    const handleClick = async (e, params, title) => {
        if (e.target.closest('.search').classList.contains('selected')) {
            e.target.closest('.search').classList.remove('selected');
        } else {
                const searchElements = document.querySelectorAll('.search');
                searchElements.forEach((element) => {
                    element.classList.remove('selected');
                    e.target.closest('.search').classList.add('selected');
                })
            setTitle(title.value)
            setCallTo(params + "&maxResults=40")
        }
      };

    const handleRemoveStorage = () => {
        localStorage.clear();
        handleSaveSearch([]);
    }

    return (
        <aside className="Aside">
            <h3>Búsquedas guardadas <span className="Aside__btn Aside__btn--delete" onClick={handleRemoveStorage}>🗑️</span><span className={showModal ? 'Aside__btn hide' : 'Aside__btn open'} onClick={handleModal}></span></h3>

            {showModal && <>
                            <div className="Modal__background" onClick={handleModal}></div>
                            <Form className="Modal__form" handleSaveSearch={handleSaveSearch} />
                          </>
             }

            { updatedData.map((search, index) => {
            const { q, sinceDate, province, teleworking, workday, education, contractType, params } = search;
            return <div className="search" key={index} id={index} ref={e => searchRef.current.push(e)} params={params} onClick={(e) => handleClick(e,params, q)}>
                        <span>Palabra clave: <strong>{q?.value}</strong></span>
                        <span>Fecha: <strong>{sinceDate?.text}</strong></span>
                        <span>Provincia: <strong>{province?.text} </strong></span>
                        <span>Modalidad: <strong>{teleworking?.text}</strong></span>
                        <span>Jornada laboral: <strong>{workday?.text}</strong></span>
                        <span>Estudios minimos: <strong>{education?.text}</strong></span>
                        <span>Tipo de contrato: <strong>{contractType?.text}</strong></span>
                    </div>
            })}
        </aside>
    )   
}