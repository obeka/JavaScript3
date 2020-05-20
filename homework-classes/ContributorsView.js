'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      this.container.innerText = '';
      const contributorHeader = createAndAppend('p', this.container, {
        class: 'contributor-header'
      });
      contributorHeader.innerText = 'Contributions';
      const ul = createAndAppend('ul', this.container);
      contributors.forEach((person) => {
        const li = createAndAppend('li', ul);
        const div = createAndAppend('div', li, {
          class: 'contributors-avatar'
        });
        createAndAppend('img', div, {
          src: person.avatar_url
        });
        createAndAppend('a', div, {
          text: person.login,
          href: person.html_url
        });
        createAndAppend('span', li, {
          text: person.contributions,
          class: 'contribution-counts'
        });
      });
    }
  }

  window.ContributorsView = ContributorsView;
}
