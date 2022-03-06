// https://www.youtube.com/watch?v=6XmDdIRmg84

let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').addEventListener('click', () => {
  searchForm.classList.toggle('active');
})

let loginBtn = document.querySelector('#login-btn');
let loginContainer = document.querySelector('.login-form-container');
let loginCloseBtn = document.querySelector('#close-login-btn');


loginBtn.addEventListener('click', () => {
  loginContainer.classList.toggle('active');
})

loginCloseBtn.addEventListener('click', () => {
  loginContainer.classList.remove('active');
})

window.onscroll = () => {
  searchForm.classList.remove('active');

  if (window.scrollY > 80) {
    document.querySelector('.header .header-2').classList.add('active');
  }
  else {
    document.querySelector('.header .header-2').classList.remove('active');
  }
}

window.onload = () => {
  if (window.scrollY > 80) {
    document.querySelector('.header .header-2').classList.add('active');
  }
  else {
    document.querySelector('.header .header-2').classList.remove('active');
  }
  document.querySelector('.loader-container').classList.remove('active');
}



let swiper = new Swiper(".books-slider", {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 4500,
    disableInteraction: false,
  },

  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

let swiper2 = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableInteraction: false,
  },

  breakpoints: {
    1: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let swiper3 = new Swiper(".arrivals-slider", {
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

let swiper4 = new Swiper(".reviews-slider", {
  spaceBetween: 20,
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  breakpoints: {
    1: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

let swiper5 = new Swiper(".blogs-slider", {
  spaceBetween: 20,
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  breakpoints: {
    1: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});