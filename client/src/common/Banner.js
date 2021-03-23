import React, { useEffect, useState } from 'react';

function Banner({ currentBlog }) {
  // STATE THAT SETS BACKGROUND IMAGE FOR BLOG POST
  const [backgroundImage, setBackgroundImage] = useState('');

  // BLOG IMAGE SET UPON RENDERING
  // window.location.origin ENSURES THAT THE CORRECT URL IS BEING PULLED
  // THE BELOW URL IS A ROUTE IN THE BLOG ROUTES
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
