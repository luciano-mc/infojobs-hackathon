import './OffersDetails.css';

export default function OffersDetails({apiResponse, callTo, setCallTo}) {

    const { items } = apiResponse;
    
    function countPropertyValues(items, propertyName) {
        const count = {};

        items?.forEach((item) => {
          const value = item[propertyName].value;
          if (value in count) {
            count[value]++;
          } else {
            count[value] = 1;
          }
        });
        
        return count;
      }
      
      const salaryAverage = (obj) => {
        let propertyTotalSum = 0;
        let valueTotalSum = 0;

        Object.entries(obj).map((entry) => {
          if (entry[0] !== '') {            
            const key = parseInt(entry[0].replace(/\./g, ""));
            const value = entry[1];
            propertyTotalSum += key * value;
            valueTotalSum += value;
          }})
        const average = Math.round(propertyTotalSum / valueTotalSum);

        return average
      }

      const totalSalaryMin = countPropertyValues(items, 'salaryMin');
      const salaryMinLength = Object.entries(totalSalaryMin).length;

      const totalSalaryMax = countPropertyValues(items, 'salaryMax');
      const salaryMaxLength = Object.entries(totalSalaryMax).length;

      const totalExperienceMin = (countPropertyValues(items, 'experienceMin'));
      const totalStudyMin = (countPropertyValues(items, 'study'));

    return (
  <div className="OffersDetails">
    {items ? (
        <>
          <div className="Details">
            <h3 className="Details__title">Sueldos</h3>
            <div className="Details__box">
              <span className="Details__box__number">{ parseInt((salaryAverage(totalSalaryMin) + salaryAverage(totalSalaryMax)) / 2)} €</span>  
              <span className="Details__box__title">SUELDO GENERAL PROMEDIO</span>
            </div>

            <div className="Details__box">
              <span className="Details__box__number">{salaryAverage(totalSalaryMin)} € </span>  
              <span className="Details__box__title">SUELDO MÍNIMO PROMEDIO</span>
              <span className="Details__box__total">{salaryMinLength} de un total de {items?.length} ofertas</span>
            </div>

            <div className="Details__box">
              <span className="Details__box__number">{salaryAverage(totalSalaryMax)} € </span>  
              <span className="Details__box__title">SUELDO MÁXIMO PROMEDIO</span>
              <span className="Details__box__total">{salaryMaxLength} de un total de {items?.length} ofertas</span>
            </div>
            <span className="Details__description">*Las estadísticas son basadas en las ofertas por página. Ten en cuenta que no todas especifican salario y/o experiencia</span>
          </div>

          <div className="Details">
            <h3 className="Details__title">Experiencia Mínima</h3>
             { totalExperienceMin && Object.entries(totalExperienceMin).map((experience, index) => {
              return <div className="Details__box" key={index}>
                      <span className="Details__box__number">{experience[1]}</span>
                      <span className="Details__box__title">{experience[0].toUpperCase()}</span>
                      <span className="Details__box__total">{experience[1]} de un total de {items?.length} ofertas</span>
                    </div>
              })}
          </div>

          <div className="Details">
            <h3 className="Details__title">Estudios Mínimos</h3>
             { totalStudyMin && Object.entries(totalStudyMin).map((study, index) => {
              return <div className="Details__box" key={index}>
                      <span className="Details__box__number">{study[1]}</span>
                      <span className="Details__box__title">{study[0].toUpperCase()}</span>
                      <span className="Details__box__total">{study[1]} de un total de {items?.length} ofertas</span>
                    </div>
              })}
          </div>
        </>
    ) : (
      <div>Cargando...</div>
    )}
    </div>
  )
}