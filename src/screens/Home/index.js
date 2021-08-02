import { useState } from 'react';
import { Card } from '../../components';
import { months, years } from '../../utils/contants';
import Api from '../../services/Api';
import './styles.css';

import Methods from '../../utils/methods';
import { DEFAULT_MESSAGES } from '../../utils/contants'


function Home () {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState(null)
  const [iataCodes, setIataCodes] = useState(null)
  const [hotels, setHotels] = useState(null)

  const [packagesBySearch, setPackagesBySearch] = useState(null)



  const [formDestination, setFormInput] = useState('')
  const [formMonth, setFormMonth] = useState(1)
  const [formYear, setFormYear] = useState(2021)
  const [isSearchFinish, setIsSearchFinish] = useState(false)


  const [error, setError] = useState(false)
  const [errorDescription, setErrorDescription] = useState(false)

  const [isEmpty, setIsEmpty] = useState(false)
  const [fieldEmpty, setFieldEmpty] = useState('')


  const [isShowMessage, setIsShowMessage] = useState(true)
  const [message, setMessage] = useState(DEFAULT_MESSAGES.INITIAL_RENDER)



  const handleGetValues = async () => {
    await Promise.all([
      Api.flight(),
      Api.hotels(),
      Api.iataCodes()])
      .then(response => {
        const [fli, htlS, codes] = response
        setFlights(fli)
        setHotels(htlS)
        setIataCodes(codes)

      }).catch(err => {
        throw err
      })

  }
  const handleFullPackge = () => {

    const keys = {
      iata: 'iata',
      arrivalAirport: "arrivalAirport",
      price: 'price',
      pricePerNight: 'pricePerNight'
    }
    const fullPackages = iataCodes.map(element => {
      const groups = {
        flightAgrouped: agroupByIataName(flights, element.id, keys.arrivalAirport),
        hotelsAgrouped: agroupByIataName(hotels, element.id, keys.iata),
      }

      const bestFlight = minPrice(groups.flightAgrouped, keys.price);
      const bestHotel = minPrice(groups.hotelsAgrouped, keys.pricePerNight);



      let days = 1;
      let bestPackagePrice = 0
      if (bestFlight) {
        const { outboundDate, inboundDate, price } = bestFlight
        days = Math.floor(((inboundDate - outboundDate) / 1000) / (3600 * 24))
        if (bestHotel) {
          const { pricePerNight } = bestHotel
          bestPackagePrice = price + pricePerNight * days;
        }
      }


      return {
        ...element,
        bestFlight,
        bestPackagePrice,
      };
    });

    return fullPackages
  };

  const agroupByIataName = (array, iataName, keyName) => {
    const filtered = array.filter(item => {
      return item[keyName] === iataName
    })

    return filtered.length === 0 ? null : filtered;
  }

  const minPrice = (array) => {
    if (!array) {
      return null;
    }
    let indexMin = 0;
    let min = array[indexMin].price

    for (let i = 1; i < array.length; i++) {
      let v = array[i].y;
      if (v < min) {
        indexMin = i
        min = v;
      }
    }
    return array[indexMin];
  }


  const handleSearchPackage = async () => {
    if (formDestination && formMonth && formYear) {
      
      setError(false)
      setIsEmpty(false)
      setIsSearchFinish(false)
      setIsShowMessage(false)

      try {
        setLoading(true)
        await handleGetValues()
        const packages = handleFullPackge();

        let destinations = []


        formDestination.split(',').forEach(element => {
          const filtered = packages.filter(item => {
            if (item.bestFlight) {
              const data = Methods.getData(item.bestFlight.outboundDate);
              const [, m, y] = data.split('/');


              const isValidValue = (element.toUpperCase() === item.id || element.toUpperCase() === item.city.toUpperCase()) && formMonth === m && formYear === y;
              return isValidValue
            }
            return false
          });

          destinations = [...destinations, ...filtered]
        });
        setLoading(false)
        if (destinations.length === 0) {
          setIsShowMessage(true)
          setIsEmpty(false)
          setMessage(DEFAULT_MESSAGES.IS_EMPTY)
        }


        setPackagesBySearch(destinations)
        setIsSearchFinish(true)
      } catch (error) {
        setMessage(DEFAULT_MESSAGES.FATAL_ERROR)
        setErrorDescription(DEFAULT_MESSAGES.FATAL_ERROR)
        setError(true)
        setLoading(false)
        setIsShowMessage(true)

      }
    } else {

      setIsEmpty(true)
      if (!formDestination) {
        return setFieldEmpty("Digite um destino")
      }

      if (!formMonth) {
        return setFieldEmpty("Selecione o mês.")
      }

      return setFieldEmpty("Selecione o ano.")
    }
  }

  return (
    <div className="app">
      <div className="form-input">
        <div>
          <div className="origin">
            <label>Origem: Belo horizonte - MG</label>
          </div>
          <input type="text" value={formDestination} onChange={(e) => setFormInput(e.target.value)} placeholder="Destino" />
        </div>

        <div>
          <select value={formMonth} onChange={e => setFormMonth(e.target.value)}>
            {months.map((option) => (
              <option key={option.id} value={option.id}>{option.value}</option>
            ))}
          </select>

        </div>
        <div>
          <select value={formYear} onChange={e => setFormYear(e.target.value)}>
            {years.map((option) => (
              <option key={option.id} value={option.value}>{option.value}</option>
            ))}
          </select>


        </div>

        <button onClick={handleSearchPackage}>Procurar</button>


      </div>

      <div className={isEmpty ? "warning show" : "warning close"}>
        <span>{fieldEmpty}</span>
      </div>

      {isShowMessage && !loading && <div className="first-render">
        <p>{message}</p>
      </div>}
      {loading ? (
        <div className="lds-dual-ring"></div>

      ) : isSearchFinish ? (
        <div className="container">
          {packagesBySearch.map((item, index) => {
            const { city, imageUrl, bestFlight, bestHotel, bestPackagePrice } = item
            return (
              <Card
                id={index.toString()}
                city={city}
                imageUrl={imageUrl}
                bestFlight={bestFlight}
                bestHotel={bestHotel}
                bestPackagePrice={bestPackagePrice}
              />
            )
          })}
        </div>
      ) : (
        null
      )}

      <div className={error ? "alert show" : "alert close"}>
        <span>{errorDescription}</span>
      </div>


    </div>
  );
}

export default Home;
