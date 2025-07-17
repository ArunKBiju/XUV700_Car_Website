window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash && window.location.hash !== '#home') {
    window.location.hash = '#home';
  }

  const images = document.querySelectorAll('.car-image');
  const numbers = document.querySelectorAll('.section-number');
  let currentIndex = 0;
  let sliderInterval;

  function showImage(index) {
    images.forEach((img, i) => img.classList.toggle('active', i === index));
    numbers.forEach((num, i) => num.classList.toggle('active', i === index));
    currentIndex = index;
  }

  function startSlider() {
    sliderInterval = setInterval(() => {
      showImage((currentIndex + 1) % images.length);
    }, 3000);
  }

  function stopSlider() {
    clearInterval(sliderInterval);
  }

  numbers.forEach((num, idx) => {
    num.addEventListener('click', () => {
      stopSlider();
      showImage(idx);
      startSlider();
    });
  });

  if (images.length && numbers.length) {
    showImage(0);
    startSlider();
  }

  const header = document.querySelector('header');
  const aboutSection = document.getElementById('about');
  if (header && aboutSection) {
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        header.style.backgroundColor = entry.isIntersecting ? '#FFFFFF' : 'transparent';
      });
    }, { threshold: 0.8 }).observe(aboutSection);
  }

  const footer = document.querySelector('footer');
  const homeSection = document.getElementById('home');
  if (footer && homeSection) {
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        footer.style.backgroundColor = entry.isIntersecting ? 'transparent' : '#FFFFFF';
      });
    }, { threshold: 0.1 }).observe(homeSection);
  }

  const video = document.getElementById('about-video');
  if (aboutSection && video) {
    video.pause();

    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.5 }).observe(aboutSection);

    video.addEventListener('click', () => {
      video.paused ? video.play() : video.pause();
    });
  }
});
