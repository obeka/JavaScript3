'use strict';

{
  function fetchJSON(url, cb) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `${response.status} - ${response.statusText}. Check your search terms.`,
          );
        }
        return response.json();
      })
      .then((data) => {
        cb(null, data);
        console.log(data[1].contributors_url);
      })
      .catch((error) => cb(error, null));
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text' && typeof value == 'object') {
        tableCreator(elem, value);
      } else if (key === 'text' && typeof value == 'string') {
        //If value returns as a string which means just error message, here prints error code on the page
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderRepoDetails(repo, ul) {
    createAndAppend('li', ul, {
      text: repo,
    });
  }

  function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const repoContainer = document.querySelector('.repo-container');
      const ul = createAndAppend('ul', repoContainer);
      //Firstly sorts alphabetically(sort), then takes the first 10 item from array(slice), than use them(forEach).
      repos
        .sort((a, b) =>
          a.name.localeCompare(b.name, 'en', {
            ignorePunctuation: true,
          }),
        )
        .slice(0, 10)
        .forEach((repo) => {
          //console.log(repo.name);
          renderRepoDetails(repo, ul);
        });
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);

  //This function takes the response(object format), then use it to create tables into li tags, so
  //handling li becomes much more easier and flexible with tables.
  function tableCreator(li, repoValues) {
    //Firstly, we collect what we use to display in an object, doing so if we need to show new repo infos in the
    //future, we just add new properties into this object and it will be displayed on the page. For example you can
    // add a new property and a value like id: repoValues.id, you will see id added to the table
    const repoInfos = {
      repository: [repoValues.html_url, repoValues.name],
      description: repoValues.description,
      forks: repoValues.forks,
      updated: new Date(repoValues.updated_at).toLocaleString(),
    };

    const table = document.createElement('table');

    //Here we use our newly created obj(repoInfos) to create table cells.
    Object.entries(repoInfos).forEach(([key, value]) => {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      const td = document.createElement('td');
      th.textContent = key[0].toUpperCase() + key.slice(1);
      if (value == null) {
        td.textContent = ': Not avaliable';
      } else if (value.length == 2) {
        td.innerHTML = `: <a href="${value[0]}">${value[1]}</a>`;
      } else {
        td.textContent = ': ' + value;
      }
      tr.append(th);
      tr.append(td);
      table.append(tr);
    });

    li.append(table);
  }

  function contributorCreator() {
    const selectMenu = document.querySelector('select');
    selectMenu.addEventListener('change', (e) => {
      console.log(e);
    });
  }
  contributorCreator();
}
