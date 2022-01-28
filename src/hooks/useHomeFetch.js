import { useState, useEffect, useRef } from 'react';
import API from '../API';

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
}; // state to reset stuff if neeed

export const useHomeFetch = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async (page, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      //always use setter to modify the state, always provide it with a new value
      // not mutate the state!
      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial render
  useEffect(() => {
    fetchMovies(1);
  }, []); //trigger only on mount, dependency array for the useEffect will only run once

  return { state: state, loading, error };
};
