export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  // Move 'dark-banner' class to parent element
  if (block.classList.contains('dark-banner')) {
    block.classList.remove('dark-banner');
    block.parentElement?.parentElement.classList.add('dark-banner');
    block.parentElement?.parentElement?.classList.add('dark-banner');
  } else if (block.classList.contains('pink-banner')) {
    block.classList.remove('pink-banner');
    block.parentElement?.parentElement.classList.add('pink-banner');
    block.parentElement?.parentElement.classList.add('pink-banner');
  }

  // Move 'dark-banner' class to parent element
  if (block.classList.contains('transparent-button')) {
    const btns = block.querySelectorAll('.button');
    btns.forEach((btn) => btn.classList.add('white-btn-text'));
  } else if (block.classList.contains('dark-button')) {
    const btns = block.querySelectorAll('.button');
    btns.forEach((btn) => btn.classList.add('dark-button'));
  }
}
