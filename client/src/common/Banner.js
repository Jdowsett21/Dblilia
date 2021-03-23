import React, { useEffect, useState } from 'react';

function Banner({ currentBlog }) {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    setBackgroundImage(
      `${window.location.origin}${process.env.REACT_APP_API_URL}/blog/blogImage/${currentBlog.image}`
    );
  }, [currentBlog.image]);

  return (
    <div className='banner'>
      <img className='banner__img' src={backgroundImage} alt='First slide' />
      <h1 className='banner__header '>{currentBlog.title}</h1>
    </div>
  );
}

export default Banner;
