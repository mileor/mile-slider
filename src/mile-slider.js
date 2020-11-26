/*
  Mile-slider
  Author: Mileor
*/

function renderMileSlider({
  container,
  animationDuration,
  animationType,
  height,
  slidesToShow,
  gap,
  activeSlideStyles
  }) {
  const sliderContainer      = document.querySelector(`#${container}`);
  const sliderContentWrapper = document.querySelector(`#${container} .mile-slider__content div`);
  const sliderContent        = document.querySelectorAll(`#${container} .mile-slider__content div div`);
  const nextButton           = document.querySelector(`#${container} .mile-slider__nav-button--right`);
  const prevButton           = document.querySelector(`#${container} .mile-slider__nav-button--left`);
  const containerWidth       = sliderContainer.getBoundingClientRect().width;
  const slides               = sliderContent.length;

  const ANIMATION      = `transform ${animationDuration}ms ${animationType}`;
  const SLIDER_HEIGHT  = height;
  let SLIDES_TO_SHOW   = slidesToShow > slides ? slides : slidesToShow;
  const SLIDES_GAP     = gap;

  if (window.screen.width <= 480) {
    SLIDES_TO_SHOW = 1;
  } else if (window.screen.width <= 768) {
    SLIDES_TO_SHOW = 3;
  }

  const columnWidth       = (containerWidth - (SLIDES_GAP * (SLIDES_TO_SHOW - 1))) / SLIDES_TO_SHOW;
  let currentNavButton    = null;
  let currentPosition     = SLIDES_TO_SHOW * (- columnWidth - SLIDES_GAP);
  let isDisableNavButtons = false;

  sliderContentWrapper.style['grid-template-columns'] = `repeat(auto-fit, ${columnWidth}px)`;
  sliderContentWrapper.style['grid-gap']              = `${SLIDES_GAP}px`;
  sliderContentWrapper.style['grid-template-rows']    = `${SLIDER_HEIGHT}px`;

  function setCurrentPosition() {
    sliderContentWrapper.style.transform = `translateX(${currentPosition}px)`;
  }

  function setAnimation() {
    setTimeout(() => {
      sliderContentWrapper.style.transition = ANIMATION;
    }, 0)
  }

  function clearAnimation() {
    sliderContentWrapper.style.transition = 'none';
  }

  function setActiveSlide() {
    if (SLIDES_TO_SHOW % 2 !== 0) {
      document.querySelectorAll(`#${container} .mile-slider__content div div`).forEach(slide => {
        slide.classList.remove("mile-slider__active");
        slide.removeAttribute("style");
        const containerOffset = sliderContainer.getBoundingClientRect().left;
        const sliderOffset = slide.getBoundingClientRect().left - containerOffset;
        const roundedNumberOfSlides = Math.round(((SLIDES_TO_SHOW - 1) / 2));
        if (Math.round(roundedNumberOfSlides * (columnWidth + SLIDES_GAP)) === Math.round(sliderOffset)) {
          slide.classList.add("mile-slider__active");
          const activeSlide = document.querySelector('.mile-slider__active');
          for (let style in activeSlideStyles) {
            activeSlide.style[style] = activeSlideStyles[style];
          }
        }
      })
    }
  }

  setCurrentPosition();
  setAnimation();

  for (let i = 0; i <= SLIDES_TO_SHOW - 1; i++) {
    const clone = sliderContent[i].cloneNode(true);
    clone.classList.add("mile-slider__clone");
    sliderContentWrapper.append(clone);
  }

  for (let i = slides - 1; slides - i <= SLIDES_TO_SHOW; i--) {
    const clone = sliderContent[i].cloneNode(true);
    clone.classList.add("mile-slider__clone");
    sliderContentWrapper.prepend(clone);
  }

  function nextSlideHandler() {
    if (currentNavButton === 'next') {
      isDisableNavButtons = false;
      const maxSliderRightOffset = (slides + SLIDES_TO_SHOW) * (columnWidth + SLIDES_GAP);
      if (Math.round(maxSliderRightOffset) === Math.round(Math.abs(currentPosition))) {
        currentPosition = SLIDES_TO_SHOW * (- columnWidth - SLIDES_GAP);
        clearAnimation();
        setCurrentPosition();
      }
      setTimeout(() => {
        setActiveSlide();
      }, animationDuration / 3)
      setAnimation();
      sliderContentWrapper.removeEventListener("transitionend", nextSlideHandler);
    }
  }

  function prevSlideHandler() {
    if (currentNavButton === 'prev') {
      isDisableNavButtons = false;
      if (currentPosition + columnWidth > 0) {
        currentPosition = sliderContent.length * (- columnWidth - SLIDES_GAP);
        clearAnimation();
        setCurrentPosition();
      }
      setTimeout(() => {
        setActiveSlide();
      }, animationDuration / 3)
      setAnimation();
      sliderContentWrapper.removeEventListener("transitionend", nextSlideHandler);
    }
  }

  function next() {
    if (isDisableNavButtons) return;
    isDisableNavButtons = true;
    currentPosition = currentPosition - (columnWidth + SLIDES_GAP);
    setCurrentPosition();
    currentNavButton = 'next';
    sliderContentWrapper.addEventListener("transitionend", nextSlideHandler);
  }

  function prev() {
    if (isDisableNavButtons) return;
    isDisableNavButtons = true;
    currentPosition = currentPosition + (columnWidth + SLIDES_GAP);
    setCurrentPosition();
    currentNavButton = 'prev';
    sliderContentWrapper.addEventListener("transitionend", prevSlideHandler);
  }

  nextButton.addEventListener("click", next);
  prevButton.addEventListener("click", prev);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      prev()
    } else if (event.key === 'ArrowRight') {
      next();
    }
  });

  setTimeout(() => {
    setActiveSlide();
  }, animationDuration)
}

export function mileSlider({
  container,
  animationDuration = 600,
  animationType = 'linear',
  height = 332,
  slidesToShow = 3,
  gap = 24,
  activeSlideStyles = {}
  } = {}) {
  renderMileSlider({
    container,
    animationDuration,
    animationType,
    height,
    slidesToShow,
    gap,
    activeSlideStyles
  });

  window.addEventListener("resize", () => {
    document.querySelector(`#${container} .mile-slider__content div`).style.transition = 'none';
    document.querySelectorAll(`#${container} .mile-slider__clone`).forEach(clone => clone.remove());
    renderMileSlider({
      container,
      animationDuration,
      animationType,
      height,
      slidesToShow,
      gap,
      activeSlideStyles
    });
  })
}
