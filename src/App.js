import './App.css';
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({ 
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

const FIVE_FLIGHTS = gql`
{
  launches(limit: 5) {
    launch_date_utc
    launch_success
    rocket {
      rocket_name
    }
    links {
      video_link
    }
    details
  }
}
`;

function FiveFlights() {
  const {loading, error, data} = useQuery(FIVE_FLIGHTS);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Something  went wrong. Error: </p>;

  return data.launches.map(({launch_date_utc, launch_success,rocket, links, details}) => (
    <div key={rocket.rocket_name}>
      <h2>
        {rocket.rocket_name}
      </h2>
      <h3>
        Launch date: {launch_date_utc} ({(launch_success) ? "Success": "Failure" })
      </h3>
      <p>
        <bold>Watch it on <a href={links.video_link}>YouTube</a>!</bold>
      </p>
      <p>
        {(details != null) ? details : "No further details available."}
      </p>
    </div>
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
    <div>
      <h2>SpaceX - Five Flights 🚀</h2>
      <FiveFlights />
    </div>
    </ApolloProvider>
  );
}

export default App;
