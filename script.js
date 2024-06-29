window.addEventListener("load", function() {
    const loaderContainer = document.querySelector(".loader");
    const content = document.querySelector(".content");
  
    // After a delay (simulate loading time)
    setTimeout(() => {
      content.style.opacity = 1;
      loaderContainer.style.display = "none"; /* Make content visible with transition */
    }, 1990);
  });



  // Replace with your project owner, repository name, and file path
const owner = "briannjara";
const repo = "30_days";
const filepath = "guide.md";

// Function to fetch and update content
function updateGuide() {
  fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filepath}`)
    .then(response => response.json())
    .then(data => {
      // Decode base64 encoded content (if applicable for Markdown files)
      const decodedContent = atob(data.content);
      // Assuming your target DIV has id="guide-content"
      const guideElement = document.getElementById("guide-content");
      guideElement.innerText = decodedContent;
    })
    .catch(error => console.error(error));
}

// Call the function to update content on page load or a button click
updateGuide();


// github projects
document.addEventListener("DOMContentLoaded", () => {
  const username = 'briannjara';
  const token = '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';

  async function fetchGitHubProjects() {
      const response = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
              'Authorization': `token ${token}`
          }
      });

      if (!response.ok) {
          throw new Error('Failed to fetch GitHub repositories');
      }

      const projects = await response.json();
      return projects;
  }

  function createProjectElement(project) {
      const projectElement = document.createElement('div');
      projectElement.classList.add('project');

      projectElement.innerHTML = `
          <i class="fa-brands fa-github"></i>
          <h2><a href="${project.html_url}" target="_blank">${project.name}</a></h2>
          <p>${project.description || 'Explore my projects from here'}</p>
          <p>Stars: ${project.stargazers_count}</p>
          <p>Forks: ${project.forks_count}</p>
      `;

      return projectElement;
  }

  async function displayGitHubProjects() {
      try {
          const projects = await fetchGitHubProjects();
          const projectsContainer = document.getElementById('github-projects');
          projectsContainer.innerHTML = ''; // Clear any existing content

          projects.forEach(project => {
              const projectElement = createProjectElement(project);
              projectsContainer.appendChild(projectElement);
          });
      } catch (error) {
          console.error(error);
      }
  }

  displayGitHubProjects();
});

