'use strict';

{
  function fetchJSON(url, cb) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `${response.status} - ${response.statusText}. Check your search terms.`,
          )
        }
        return response.json()
      })
      .then(data => cb(null, data))
      .catch(error => cb(error, null))
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderRepoDetails(repo, li, tableCreator) {
    const table = createAndAppend('table', li);
    tableCreator(table, repo);
  }

  function main(url) {
    fetchJSON(url, (err, repos) => {
      console.log(repos)
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const ul = createAndAppend('ul', root);
      repos
        .sort((a, b) =>
          a.name.localeCompare(b.name, 'en', {
            ignorePunctuation: true,
          }),
        )
        .slice(0, 10)
        .forEach(repo => {
          const li = createAndAppend('li', ul)
          renderRepoDetails(repo, li, tableCreator)
        })

    });
  }

  function tableCreator(table, repo) {
    const tableArr = [repo.name, repo.description, repo.forks, repo.updated_at]
    const names = ['Repository', 'Description', 'Forks', 'Updated']
    tableArr.forEach((item, index) => {
      const tr = createAndAppend('tr', table)
      createAndAppend('th', tr, {
        text: names[index]
      })
      createAndAppend('td', tr, {
        text: `: ${item}`
      })
    })
  }
  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}