import React, { useState, useEffect, useRef } from 'react';
// Image
import searchIcon from '../../images/search-icon.svg';

//Styles
import { Wrapper, Content } from './SearchBar.styles';

const SearchBar = ({ setSearchTerm }) => {
  //explicit return for some logic
  const [state, setState] = useState('');
  const initial = useRef(true); //using ref won't trigger a re-render

  // timeout
  // use effect always triggers on the initial render
  // don't want to trigger fetch when this component mounts
  // only want it to trigger when user has typed something in
  useEffect(() => {
    // skip the initial render in the useEffect()
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt='search-icon' />
        <input
          type='text'
          placeholder='Search Movie'
          onChange={(event) => setState(event.currentTarget.value)} //gives value in input field
          value={state}
        />
      </Content>
    </Wrapper>
  );
};

export default SearchBar;
