import './style.css'
import Experience from './experience.js'

const experience = new Experience(document.querySelector(".experience-canvas"))

var textWrapper = document.querySelector('.hero-main-title');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.hero-main-title .letter',
    translateY: [-100,0],
    easing: "easeOutExpo",
    duration: 1400,
    delay: (el, i) => 30 * i
  }).add({
    targets: '.hero-main-title',
    opacity: 1,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });