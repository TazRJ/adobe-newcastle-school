import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const children = [...block.children[0].children[0].children];

  // init containers
  const pictureDiv = block.children[0].children[0].children[0];
  const bannerDiv = document.createElement('div');
  bannerDiv.classList.add('hero-banner-wrapper');

  // loop through heroContents and if the idx is not 0, thena append it to a div. If it is a 0, then save picture in a const

  children.forEach((child, idx) => {
    if (idx !== 0 && !child.querySelector('picture')) {
      bannerDiv.appendChild(child);
    }
  });

  // Optimize the image
  const img = pictureDiv.querySelector('picture > img');
  if (img) {
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
    pictureDiv.querySelector('picture').replaceWith(optimized);
  }

  // Clear and rebuild the block
  block.textContent = '';
  block.append(pictureDiv, bannerDiv);
}
