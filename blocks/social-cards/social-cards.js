import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'social-cards-card-image';
      } else {
        div.className = 'social-cards-card-body';

        // Wrap non-button <p> tags in a .card-text container
        const paragraphs = [...div.querySelectorAll('p')];
        const textWrapper = document.createElement('div');
        textWrapper.className = 'social-card-text';

        paragraphs.forEach((p) => {
          if (!p.classList.contains('button-container')) {
            textWrapper.appendChild(p);
          }
        });

        // Only insert if there are paragraphs to wrap
        if (textWrapper.children.length > 0) {
          div.insertBefore(textWrapper, div.firstChild);
        }
      }
    });

    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
