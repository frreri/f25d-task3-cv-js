// Intersection Observer API
// with intersection observer, it will only trigger when the observed element
// starts or stops intersecting with the viewport (visible or not)

// -- As requested I've implemented functionality from 3rd party --
// -- I don't like copying completely so I've made some own modifictations --
// -- Below code is based on parts from Jonas Schemdmann's udemy course --
// -- From a section about the Intersection Observer API--
// -- I made it a module to import in my main JS for organization --
// -- https://www.udemy.com/course/the-complete-javascript-course/ --

const setIntersectionObservers = (navBar, profileSection, sectionsToReveal) => {
  ///////////////////////////////////////////////////////
  ////// START OF CODE BASED ON ABOVE UDEMY COURSE //////
  ///////////////////////////////////////////////////////
  // fixed navbar when profile section no longer visible
  const fixedNav = entries => {
    const [entry] = entries;
    if (!entry.isIntersecting) navBar.classList.add('nav-fixed');
    else navBar.classList.remove('nav-fixed');
  };

  const profileObserver = new IntersectionObserver(fixedNav, {
    root: null,
    threshold: 0,
  });
  profileObserver.observe(profileSection);

  // Revealing sections when scrolled to
  const showSection = (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('hidden');
      observer.unobserve(entry.target);
    });
  };

  const sectionObserver = new IntersectionObserver(showSection, {
    root: null,
    threshold: 0.1,
  });

  sectionsToReveal.forEach(section => {
    section.classList.add('hidden');
    sectionObserver.observe(section);
  });
  /////////////////////////////////////////////////////
  ////// END OF CODE BASED ON ABOVE UDEMY COURSE //////
  /////////////////////////////////////////////////////
};

export { setIntersectionObservers };
