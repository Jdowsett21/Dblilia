import React from 'react';

function Banner({ currentBlog }) {
  const backgroundImage = `/uploads/${currentBlog.userId}/blog/${currentBlog.image}`;
  return (
    <div className='banner'>
      <img className='banner__img' src={backgroundImage} alt='First slide' />
      <h1 className='banner__header '>{currentBlog.title}</h1>
    </div>
  );
}

export default Banner;
