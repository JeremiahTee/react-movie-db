import React from 'react';

import { Image } from './Thumb.styles';

const Thumb = (
  { image, movieId, clickable } //explicit return since will only return jsx
) => (
  <div>
    <Image src={image} alt='movie-thumb' />
  </div>
);

export default Thumb;
