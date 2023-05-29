import './OffersList.css';

export default function OfferList({apiResponse}) {

    const items = apiResponse?.items?.sort((a, b) => {
        const dateA = new Date(a.published);
        const dateB = new Date(b.published);
        return dateB - dateA;
      });

    return (
        <>
        {apiResponse ? apiResponse.totalResults === 0 ? 
        <h2>¡Lo sentimos! No hay resultados. Intenta cambiando los parámetros de búsqueda</h2>
        :
        <table className="OffersList">
            <thead>
                <tr>
                    <th>Puesto</th>
                    <th>Empresa</th>
                    <th>Provincia</th>
                    <th>Experiencia</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { items && items.map((i, index) => 
                    <tr className="Offer" key={index}> 
                        <td>{i.title}</td>
                        <td><a href={i.author.uri} target="_blank" className="Offer__author__btn">{i.author.name}</a></td>    
                        <td>{i.province.value}</td>
                        <td>{i.experienceMin.value}</td>
                        <td><a href={i.link} target="_blank" className="Offer__btn">Ver oferta</a></td>
                    </tr>)
                }
            </tbody>
        </table>
        :
        <div>Cargando...</div>
        }
        </>
    )
}