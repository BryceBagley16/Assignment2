// select all of the slides
const slides = document.querySelectorAll(".slide");

// loop through slides and use the transform property to align them next to each other (unselected slides are hidden using CSS)
slides.forEach((slide, indx) => { slide.style.transform = `translateX(${indx * 100}%)`; });

// set button variables
const nextSlide = document.querySelector(".btn-next");
const prevSlide = document.querySelector(".btn-prev");
const randSlide = document.querySelector(".btn-rand");

// load page on random slide function
let curSlide = Math.floor(Math.random() * slides.length);
slides.forEach((slide, indx) => { slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`; });

// set number of slides for use below
let maxSlide = slides.length - 1;

// event listener for next button
nextSlide.addEventListener("click", function () {
  // goes back to the first slide if currently on the last slide
  if (curSlide === maxSlide) {
    curSlide = 0;
  } 
  // otherwise go to the next slide
  else {
    curSlide++;
  }
  // function for moving the slides
  slides.forEach((slide, indx) => { slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`; });
});

// event listener for previous button
prevSlide.addEventListener("click", function () {
  // goes to the last slide if currently on the first slide
  if (curSlide === 0) {
    curSlide = maxSlide;
  }
  // otherwise go to the previous slide
  else {
    curSlide--;
  }
  // function for moving the slides
  slides.forEach((slide, indx) => { slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`; });
});

// event listener for random button
randSlide.addEventListener("click", function () {
  // select a random slide
  curSlide = Math.floor(Math.random() * slides.length);

  // function for moving the slides
  slides.forEach((slide, indx) => { slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`; });
});