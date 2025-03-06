'use strict';

// functions here Written by myself
// Separated these functions into their own file from resume.js to be able to use them if/when i implement github interaction
const getJsonData = async path => {
  try {
    const result = await fetch(path);
    if (result.ok) {
      return await result.json();
    } else {
      throw Error('Error reading JSON-data');
    }
  } catch (err) {
    console.log(err);
  }
};

// created a function for element creation, as i was typing alot of same things over and over
const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (text) element.textContent = text;
  return element;
};

export { getJsonData, createElement };
