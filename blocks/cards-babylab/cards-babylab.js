import baseDecorate from '../cards/cards.js';

export default function decorate(block) {
  // Call base cards decoration
  baseDecorate(block);

  // Apply background images from img elements to li elements
  const listItems = block.querySelectorAll('ul > li');
  listItems.forEach((li) => {
    const img = li.querySelector('img');
    if (img && img.src) {
      // Set background image on the li element
      li.style.backgroundImage = `url('${img.src}')`;
    }
  });
}
