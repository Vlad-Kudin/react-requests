import React, { useState } from "react";

import JokeList from "./components/JokeList";
import "./App.css";

function App() {
  // const dummyJokes = [
  //   {
  //     id: 1,
  //     type: "general",
  //     setup: "What do you call a bee that lives in America?",
  //     punchline: "A USB.",
  //   },
  //   {
  //     id: 2,
  //     type: "programming",
  //     setup: "What's the best thing about a Boolean?",
  //     punchline: "Even if you're wrong, you're only off by a bit.",
  //   },
  // ];

  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchJokesHandler() {
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
  }

  let content = <p>Jokes not found.</p>;

  if (jokes.length > 0) content = <JokeList jokes={jokes} />;

  if (error) content = <p>{error}</p>;

  if (isLoading) content = <p>Jokes is loading...</p>;

  return (
    <React.Fragment>
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
