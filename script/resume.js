'use strict';

const generateResume = async jsonFile => {
  const getJsonData = async file => {
    try {
      const result = await fetch(file);
      if (result.ok) {
        return await result.json();
      } else {
        throw Error('Error reading JSON-file');
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

  const displayResume = resume => {
    const resumeName = document.getElementById('resume-name');
    const resumeTitle = document.getElementById('resume-title');
    const resumeSummary = document.getElementById('resume-summary');
    const jobsContainer = document.getElementById('jobs-container');
    const educationContainer = document.getElementById('education-container');
    const skillList = document.getElementById('skill-list');

    resumeName.textContent = resume.name;
    resumeTitle.textContent = resume.title;
    resumeSummary.textContent = resume.summary;

    // Adding jobs to jobs container
    resume.jobs.forEach(job => {
      const jobDiv = createElement('div');

      jobDiv.append(createElement('h4', null, job.company));
      jobDiv.append(createElement('p', 'job-duration', job.duration));

      const roleList = createElement('ul', 'role-list');
      jobDiv.append(roleList);

      job.roles.forEach(role => {
        const roleItem = createElement('li');

        roleItem.append(createElement('p', 'role-title', role.role));
        roleItem.append(createElement('p', 'role-duration', role.duration));

        const roleDescList = createElement('ul', 'role-description-list');
        roleItem.append(roleDescList);

        role.roleDescriptionList.forEach(listItem => {
          roleDescList.append(createElement('li', null, listItem));
        });

        roleList.append(roleItem);
      });

      jobsContainer.append(jobDiv);
    });

    // Adding educations to education container
    resume.education.forEach(education => {
      const educationDiv = createElement('div');

      educationDiv.append(createElement('h4', null, education.school));

      const educationList = createElement('ul', 'education-list');
      educationDiv.append(educationList);

      const educationListItem = createElement('li');
      educationList.append(educationListItem);

      educationListItem.append(
        createElement('p', 'education-title', education.education)
      );
      educationListItem.append(
        createElement('p', 'education-duration', education.duration)
      );

      const educationDescList = createElement(
        'ul',
        'education-description-list'
      );
      educationListItem.append(educationDescList);

      education.descriptionList.forEach(listItem => {
        educationDescList.append(createElement('li', null, listItem));
      });

      educationContainer.append(educationDiv);
    });

    // Adding skills to skill list
    resume.skills.forEach(skill => {
      skillList.append(createElement('li', null, skill));
    });
  };

  const resume = await getJsonData(jsonFile);
  displayResume(resume);
};

export { generateResume };
