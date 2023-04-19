import "./App.css";
import { useState, useEffect } from "react";

function GitHubUser({ name, location, avatar }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{location}</p>
      <img src={avatar} height={150} alt={name} />
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.github.com/users/brameldering`)
      .then((response) => response.json())
      .then(setData)
      .then(() => setIsLoading(false))
      .catch(setError);
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;
  if (!data) return null;

  return <GitHubUser name={data.name} location={data.location} avatar={data.avatar_url} />;
}

export default App;
