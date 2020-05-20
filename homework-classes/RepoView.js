'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      this.container.innerText = ''
      const table = createAndAppend('table', this.container)
      const tableArr = [repo.name, repo.description, repo.forks, new Date(repo.updated_at).toDateString()];
      const names = ['Repository', 'Description', 'Forks', 'Updated'];
      tableArr.forEach((item, index) => {
        const tr = createAndAppend('tr', table);
        createAndAppend('th', tr, {
          text: names[index],
        });
        createAndAppend('td', tr, {
          text: `: ${item}`,
        });
      });
    }
  }

  window.RepoView = RepoView;
}
