import './styles.css';
import Methods  from '../../utils/methods';


function Card ({ id, city, imageUrl, bestFlight, bestHotel, bestPackagePrice }) {

 
  let inboundDate = null;
  let outboundDate = null;


  if (bestFlight) {
    inboundDate = bestFlight.inboundDate;
    outboundDate = bestFlight.inboundDate;
  }

  return (
    <div className="card" key={id} >
      <img src={imageUrl} alt={city} />
      <div className="content">
        <div>
          <h3>{city}</h3>
          <p>R$ {bestPackagePrice}00</p>
        </div>
        <div>
          <p>ida</p>
          <p>{Methods.getData(outboundDate)}</p>

        </div>
        <div>
          <p>volta</p>
          <p>{Methods.getData(inboundDate)}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
