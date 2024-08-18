import {
  Container,
  CountryInfo,
  GoBackBtn,
  Heading,
  Loader,
  Section,
} from 'components';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

const Country = () => {
  const [country, setCountry] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(null);

  const { countryId } = useParams();

  const location = useLocation();
  const goBack = useRef(location?.state ?? '/');

  useEffect(() => {
    const fatchData = async () => {
      setIsLoader(true);
      setError(null);
      try {
        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoader(false);
      }
    };
    fatchData();
  }, [countryId]);
  console.log(location);
  return (
    <Section>
      <Container>
        <GoBackBtn path={goBack.current}>Back to countries</GoBackBtn>
        {country && <CountryInfo {...country} />}
        {isLoader && <Loader />}
        {error && <Heading title="Somethins title errer" bottom />}
      </Container>
    </Section>
  );
};
export default Country;
