import { Container, Heading, Section } from 'components';
import { useEffect, useState } from 'react';
import { getCountries } from 'service/countryApi';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fatchData = async () => {
      setIsLoader(true);
      setError(null);
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoader(false);
      }
    };
    fatchData();
  }, []);
  console.log(countries);

  return (
    <Section>
      <Container>
        <Heading title="Home" bottom />
      </Container>
    </Section>
  );
};

export default Home;
