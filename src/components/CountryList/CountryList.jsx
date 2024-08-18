import { Link, useLocation } from 'react-router-dom';
import { Grid, GridItem } from '..';

export const CountryList = ({ countries }) => {
  const location = useLocation();

  return (
    <>
      <Grid>
        {countries.map(({ id, flag, country }) => (
          <GridItem key={id}>
            <Link state={location} to={`/country/${id}`}>
              <img src={flag} alt={country} />
            </Link>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
