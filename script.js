    const images = document.querySelectorAll('.car-image');
    const sections = document.querySelectorAll('.section-number');
    let currentIndex = 0;
    let autoSwitch;

    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });

      sections.forEach((sec, i) => {
        sec.classList.toggle('active', i === index);
      });

      currentIndex = index;
    }

    function startAutoSwitch() {
      autoSwitch = setInterval(() => {
        let nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
      }, 3500);
    }

    sections.forEach((sec, i) => {
      sec.addEventListener('click', () => {
        clearInterval(autoSwitch);
        showImage(i);
        startAutoSwitch();
      });
    });

    startAutoSwitch();