'use strict';

const navBar = document.querySelector('.nav-bar');
const profileSection = document.querySelector('.profile-text-section');
const projectSection = document.querySelector('.project-section');
const resumeSection = document.querySelector('.resume-section');
const contactSection = document.querySelector('.contact-section');
const hiddenSections = [projectSection, resumeSection, contactSection];

// Importing and running my resume script - Written by myself
import { generateResume } from './resume.js';
generateResume('./data/resume.json');

// Importing and running my Intersection Observer API functionality
// Based on 3rd party code as requested in task - see intersection.js for more info
import { setIntersectionObservers } from './intersection.js';
setIntersectionObservers(navBar, profileSection, hiddenSections);

// Implementing smooth scrolling nav - Written by myself
// setting event listener on navbar, instead of having one for each button
navBar.addEventListener('click', e => {
  // prevent normal link click behavior
  e.preventDefault();
  // as the listener is on the bar, i need to check that the click happend
  // on one of the links, i do this by checking that the target has a href
  if (e.target.href) {
    // select the section to scroll to by ID, as the getAttribute will get
    // the href value like #resume for example, then scroll to it smoothly
    const sectionId = e.target.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
  }
});
