import { createOptimizedPicture } from '../../scripts/aem.js';

function updateActiveSlide(block) {
  const slides = block.querySelectorAll('.carousel-slide');
  const indicators = block.querySelectorAll('.carousel-indicator');

  slides.forEach((slide, index) => {
    if (slide.classList.contains('carousel-slide-active')) {
      indicators[index]?.classList.add('carousel-indicator-active');
    } else {
      indicators[index]?.classList.remove('carousel-indicator-active');
    }
  });
}

function showSlide(block, slideIndex = 0) {
  const slides = block.querySelectorAll('.carousel-slide');
  const indicators = block.querySelectorAll('.carousel-indicator');

  let newSlideIndex = slideIndex;
  if (slideIndex >= slides.length) {
    newSlideIndex = 0;
  } else if (slideIndex < 0) {
    newSlideIndex = slides.length - 1;
  }

  slides.forEach((slide, index) => {
    slide.classList.toggle('carousel-slide-active', index === newSlideIndex);
    indicators[index]?.classList.toggle('carousel-indicator-active', index === newSlideIndex);
  });
}

function bindEvents(block) {
  const slides = block.querySelectorAll('.carousel-slide');
  const nextButton = block.querySelector('.carousel-navigation-button.carousel-navigation-next');
  const prevButton = block.querySelector('.carousel-navigation-button.carousel-navigation-prev');
  const indicators = block.querySelectorAll('.carousel-indicator');

  nextButton?.addEventListener('click', () => {
    const activeSlide = block.querySelector('.carousel-slide-active');
    const activeSlideIndex = [...slides].indexOf(activeSlide);
    showSlide(block, activeSlideIndex + 1);
  });

  prevButton?.addEventListener('click', () => {
    const activeSlide = block.querySelector('.carousel-slide-active');
    const activeSlideIndex = [...slides].indexOf(activeSlide);
    showSlide(block, activeSlideIndex - 1);
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(block, index);
    });
  });
}

function createNavigationButtons(block) {
  const nav = document.createElement('div');
  nav.className = 'carousel-navigation';

  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-navigation-button carousel-navigation-prev';
  prevButton.setAttribute('aria-label', 'Previous slide');
  prevButton.innerHTML = '<span>&#8249;</span>';

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-navigation-button carousel-navigation-next';
  nextButton.setAttribute('aria-label', 'Next slide');
  nextButton.innerHTML = '<span>&#8250;</span>';

  nav.append(prevButton, nextButton);
  return nav;
}

function createIndicators(block, slidesCount) {
  const indicators = document.createElement('div');
  indicators.className = 'carousel-indicators';

  for (let i = 0; i < slidesCount; i += 1) {
    const indicator = document.createElement('button');
    indicator.className = 'carousel-indicator';
    indicator.setAttribute('aria-label', `Slide ${i + 1}`);
    if (i === 0) indicator.classList.add('carousel-indicator-active');
    indicators.append(indicator);
  }

  return indicators;
}

export default function decorate(block) {
  // Create slides wrapper
  const slidesWrapper = document.createElement('div');
  slidesWrapper.className = 'carousel-slides';

  // Transform each row into a slide
  [...block.children].forEach((row, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    if (index === 0) slide.classList.add('carousel-slide-active');

    // First cell is the image
    const imageCell = row.children[0];
    if (imageCell) {
      const imageDiv = document.createElement('div');
      imageDiv.className = 'carousel-slide-image';
      imageDiv.append(...imageCell.children);
      slide.append(imageDiv);
    }

    // Second cell is the content
    const contentCell = row.children[1];
    if (contentCell) {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'carousel-slide-content';
      contentDiv.append(...contentCell.children);
      slide.append(contentDiv);
    }

    slidesWrapper.append(slide);
  });

  // Optimize images
  slidesWrapper.querySelectorAll('picture > img').forEach((img) => {
    const newPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(newPicture);
  });

  // Clear block and add new structure
  block.textContent = '';
  block.append(slidesWrapper);

  // Add navigation if more than one slide
  const slidesCount = slidesWrapper.children.length;
  if (slidesCount > 1) {
    const nav = createNavigationButtons(block);
    const indicators = createIndicators(block, slidesCount);
    block.append(nav, indicators);
    bindEvents(block);
  }
}
