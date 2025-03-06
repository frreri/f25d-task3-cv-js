'use strict';

import { getJsonData, createElement } from './helperFunctions.js';

const createGithubSlider = async () => {
  const gitHubRepos = await getJsonData(
    'https://api.github.com/users/frreri/repos'
  );

  const projContainer = document.querySelector('.project-slider');

  let repoNum = 0;

  gitHubRepos.forEach(repo => {
    repoNum++;

    const projSlide = createElement('div', 'project-slide');

    const projContent = createElement('div', 'project-slide-content');
    projSlide.append(projContent);

    projContent.append(createElement('h3', null, `Project: ${repo.name}`));
    if (repo.description) {
      projContent.append(
        createElement('p', null, `Description: ${repo.description}`)
      );
    }
    if (repo.language) {
      projContent.append(
        createElement('p', null, `Primary language: ${repo.language}`)
      );
    }

    projContent.append(
      createElement('span', 'slide-num', `${repoNum}/${gitHubRepos.length}`)
    );

    const projLink = createElement('a', 'project-link-btn', 'Go to Github');
    projLink.href = repo.html_url;
    projLink.target = '_blank';
    projContent.append(projLink);

    projContainer.append(projSlide);
    console.log(repo);
  });

  const slides = document.querySelectorAll('.project-slide');
  const btnLeft = document.querySelector('.project-slider-btn--left');
  const btnRight = document.querySelector('.project-slider-btn--right');
  const loadingAnim = document.querySelector('.loading-anim');

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  const goToSlide = slide => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = () => {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  goToSlide(0);

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  loadingAnim.classList.add('loading-hidden');
};

export { createGithubSlider };
