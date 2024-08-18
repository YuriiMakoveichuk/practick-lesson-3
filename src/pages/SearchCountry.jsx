import {
  Container,
  CountryList,
  Heading,
  Loader,
  SearchForm,
  Section,
} from 'components';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/countryApi';

const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const region = searchParams.get('query');

  useEffect(() => {
    if (!region) {
      return;
    }
    const fatchData = async () => {
      setIsLoader(true);
      setError(null);
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoader(false);
      }
    };
    fatchData();
  }, [region]);

  const handleSubmit = value => {
    setSearchParams({ query: value });
  };
  const location = useLocation();
  console.log(location);
  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handleSubmit} />
        {countries.length > 0 && <CountryList countries={countries} />}
        {isLoader && <Loader />}
        {error && <Heading title="Somethins title errer" bottom />}
      </Container>
    </Section>
  );
};
export default SearchCountry;
