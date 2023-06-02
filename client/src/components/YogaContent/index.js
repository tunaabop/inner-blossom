//code below will be used for the yoga component


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const images = ['cat-cow.PNG', 'childs-pose.PNG', 'cobblers-pose.PNG', 'cobra-pose.PNG', 'corpse-pose.PNG', 'Downward-dog.PNG', 'half-forward-bend.PNG', 'half-lord-of-the-fishes.PNG', 'happy-baby.PNG', 'head-to-knee-pose.PNG', 'knee-chest-and-chin-pose.PNG', 'mountain-pose.PNG', 'plank-pose.PNG', 'seated-forward-bend.PNG', 'staff-pose.PNG', 'supine-spinal-twist.PNG', 'tree-pose.PNG', 'warrior1.PNG', 'wide-angle-straddle.PNG' ];
const usedImages = [];
// var fs = require('fs');
// var files = fs.readdirSync('../../images/');
// console.log(files);
//generate image
function getRandomImage() {
  if (images.length === 0) {
    images.push(...usedImages);
    usedImages.length = 0;
  }
  // calculate random
  const index = Math.floor(Math.random() * images.length);
  const image = images[index];
  images.splice(index, 1);
  usedImages.push(image);
  return image;
}
//the generator
function YogaContent() {
  const [imageSrc, setImageSrc] = useState('');

  function loadImage() {
    const image = getRandomImage();
    setImageSrc(require(`../../images/${image}`));
  }
//button
  return (
    <div>
      {Auth.loggedIn() ? (
         <>
      <img src={imageSrc}/>
      <button className="btn btn-lg btn-info m-2" onClick={loadImage}>Load Image</button>
    </>
      ) : (
          <p>
            You need to be logged in. Please{' '}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
    </div>
  );
}

export default YogaContent;