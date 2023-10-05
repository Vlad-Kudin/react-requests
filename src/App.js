import React, { useState, useEffect, useCallback } from "react";

import JokeList from "./components/JokeList";
import AddJoke from "./components/AddJoke";
import "./App.css";

function App() {

  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJokesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_ten');
      if (!response.ok) {
        throw new Error('Is there something wrong!')
      }
      const data = await response.json();
      setJokes(data);
    } catch(e) {
      setError(e.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchJokesHandler();
  }, [fetchJokesHandler]);

  async function addJokeHandler(joke) {
    const response = await fetch("https://react-course-http-8220d-default-rtdb.firebaseio.io.com/jokes.json", {
      method: 'POST',
      body: JSON.stringify(joke),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data)
  }

  let content = <p>Jokes not found.</p>;

  if (jokes !== null && jokes !== undefined && jokes.length > 0) content = <JokeList jokes={jokes} />;

  if (error) content = <p>{error}</p>;

  if (isLoading) content = <p>Jokes is loading...</p>;

  return (
    <React.Fragment>
      <section>
        <AddJoke onAddJoke={addJokeHandler}></AddJoke>
      </section>
      <section>
        <button onClick={fetchJokesHandler}>Fetch Jokes</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
