import { useState, useEffect } from 'react';
import API from '../API';
// Helpers
import { isPersistedState } from '../helpers';

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const movie = await API.fetchMovie(movieId);
        const credits = await API.fetchCredits(movieId);
        // Get directors only
        const directors = credits.crew.filter(
          (member) => member.job === 'Director'
        );

        setState({
          ...movie,
          actors: credits.cast,
          directors,
        });

        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    const sessionState = isPersistedState(movieId); //each movie is stored in sessionState with its own id
    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }

    fetchMovie();
  }, [movieId]);

  // Write to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(movieId);
  }, [movieId, state]);

  return { state, loading, error };
};
