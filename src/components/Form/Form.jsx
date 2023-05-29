import './Form.css';
import { useState } from 'react';

export default function Form({className, handleSaveSearch}) {

    const [totalSearchs, setTotalSearchs] = useState(JSON.parse(localStorage.getItem('searchs')) || [])
    const [search, setSearch] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearch({
            ...search,
            [ name ]: {value,
            'text': e.target.nextElementSibling.innerText},
            params: Object.entries(search)
            .filter(([key]) => key !== 'params')
            .map(([key, value]) => `${key}=${value.value}`)
            .join('&')
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const newTotalSearchs = [...totalSearchs, search];
        setTotalSearchs(newTotalSearchs);
        handleSaveSearch(newTotalSearchs);
        localStorage.setItem('searchs', JSON.stringify(newTotalSearchs));
      };
      

    return (
        <form className={className} action="" onSubmit={handleSubmit}>
            <div>
                <input type="text" id="keyword" name="q" onChange={handleChange} />
                <label htmlFor="keyword">Palabra clave</label>
            </div>

            <div>
                <label htmlFor="date">Fecha</label>
                <div className="row">
                    <input type="radio" id="date" name="sinceDate" value="ANY" onChange={handleChange}/><span>Cualquier fecha</span>
                </div>
                <div className="row">
                    <input type="radio" name="sinceDate" value="_24_HOURS" onChange={handleChange}/><span>Últimas 24hs</span>
                </div>
                <div className="row">
                    <input type="radio" name="sinceDate" value="_7_DAYS" onChange={handleChange}/><span>Últimos 7 días</span>
                </div>
                <div className="row">
                    <input type="radio" name="sinceDate" value="_15_DAYS" onChange={handleChange}/><span>Últimos 15 días</span>
                </div>
            </div>

            <div>
                <label htmlFor="provincia">Provincia</label>
                <div className="row">
                    <input type="radio" id="provincia" name="province" value="barcelona" onChange={handleChange}/><span>Barcelona</span>
                </div>
                <div className="row">
                    <input type="radio" name="province" value="madrid" onChange={handleChange}/><span>Madrid</span>
                </div>
                <div className="row">
                    <input type="radio" name="province" value="valencia-valencia" onChange={handleChange}/><span>Valencia</span>
                </div>
                <div className="row">
                    <input type="radio" name="province" value="sevilla" onChange={handleChange}/><span>Sevilla</span>
                </div>
            </div>

            <div>
                <label htmlFor="teleworking">Modalidad</label>
                <div className="row">
                    <input type="radio" id="teleworking" name="teleworking" value="teletrabajo-posible" onChange={handleChange}/><span>Híbrido</span>
                </div>
                <div className="row">
                    <input type="radio" name="teleworking" value="solo-teletrabajo" onChange={handleChange}/><span>Sólo teletrabajo</span>
                </div>
                <div className="row">
                    <input type="radio" name="teleworking" value="trabajo-solo-presencial" onChange={handleChange}/><span>Presencial</span>
                </div>                
            </div>

            <div>
                <label htmlFor="workday">Jornada laboral</label>
                <div className="row">
                    <input type="radio" id="workday" name="workday" value="completa" onChange={handleChange}/><span>Tiempo Completo</span>
                </div>
                <div className="row">
                    <input type="radio" name="workday" value="indiferente" onChange={handleChange}/><span>Indiferente</span>
                </div>
                <div className="row">
                    <input type="radio" name="workday" value="intensiva-manana" onChange={handleChange}/><span>Intensiva - Mañana</span>
                </div>
                <div className="row">
                    <input type="radio" name="workday" value="intensiva-tarde" onChange={handleChange}/><span>Intensiva - Tarde</span>
                </div>
            </div>

            <div>
                <label htmlFor="education">Estudios minimos</label>
                <div className="row">
                    <input type="radio" id="education" name="education" value="ciclo-formativo-grado-superior" onChange={handleChange}/><span>Ciclo Formativo Grado Superior</span>
                </div>
                <div className="row">
                    <input type="radio" name="education" value="ciclo-formativo-grado-medio" onChange={handleChange}/><span>Ciclo Formativo Grado Medio</span>
                </div>
                <div className="row">
                   <input type="radio" name="education" value="grado" onChange={handleChange}/><span>Grado</span>
                </div>
                <div className="row">
                   <input type="radio" name="education" value="sin-estudios" onChange={handleChange}/><span>Sin Estudios</span>
                </div>
            </div>

            <div>
                <label htmlFor="contract">Tipos de contrato</label>
                <div className="row">
                    <input type="radio" id="contract" name="contractType" value="indefinido" onChange={handleChange} /><span>Indefinido</span>
                </div>
                <div className="row">
                    <input type="radio" name="contractType" value="otros-contratos" onChange={handleChange} /><span>Otros contratos</span>
                </div>  
                <div className="row">
                    <input type="radio" name="contractType" value="a-tiempo-parcial" onChange={handleChange} /><span>Tiempo parcial</span>
                </div>  
                <div className="row">
                    <input type="radio" name="contractType" value="de-relevo" onChange={handleChange} /><span>De relevo</span>
                </div>  
            </div>

            <div className="row form__btns__container">
                <button type="reset" className="form__btns">RESET</button>
                <button type="submit" className="form__btns">GUARDAR</button>
            </div>
        </form>
    )
}