import Swiper from 'swiper';
import { Navigation, Autoplay, Grid } from 'swiper/modules';

Swiper.use([Navigation, Autoplay, Grid]);
import { Fancybox } from "@fancyapps/ui";



window.addEventListener('DOMContentLoaded', () => {

   let menuIcon = document.querySelector('#menu-icon');
   let menuIconLink = document.querySelector('#menu-icon use');
   let navbar = document.querySelector('.navbar'); 
   
   menuIcon.addEventListener('click', () => {
      menuIconLink.setAttribute('xlink:href', 'img/icons/icons.svg#bx-menu');
      menuIcon.classList.toggle('svg-bx-x-dims');
      if (menuIcon.classList.contains('svg-bx-x-dims')) {
         menuIconLink.setAttribute('xlink:href', 'img/icons/icons.svg#bx-x');
      } 
      
      navbar.classList.toggle('active');
   });

   // scroll sections
   let sections = document.querySelectorAll('section');
   let navLinks = document.querySelectorAll('header nav a');

   window.addEventListener('scroll', () => {
      sections.forEach(section => {
         let top = window.scrollY;
         let offset = section.offsetTop - 100;
         let height = section.offsetHeight;
         let id = section.getAttribute('id');

         if (top >= offset && top < offset + height) {
            //active navbar links
            navLinks.forEach(link => {
               link.classList.remove('active');
               document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });

            //Active sections for animation on scroll
            section.classList.add('show-animate');
         } else {
            //If want to use animation that repeats on scroll use this
            section.classList.remove('show-animate');
         }
         
      });

      //sticky header
      let header = document.querySelector('header');
      header.classList.toggle('sticky', window.scrollY > 100);

      //remove toggle icon and navbar when click navbar links (scroll)
      menuIcon.classList.remove('svg-bx-x-dims');
      menuIconLink.setAttribute('xlink:href', 'img/icons/icons.svg#bx-menu');
      navbar.classList.remove('active'); 

      //Animation footer on scroll
      let footer = document.querySelector('footer');
      footer.classList.toggle('show-animate', window.innerHeight + window.scrollY + 1 >= document.scrollingElement.scrollHeight);
   });
   
   //Copy email to clipboard
   let footerBtn = document.getElementById('footer__mail-btn');
   footerBtn.addEventListener('click', function() {
      const _this = this;

      navigator.clipboard.writeText(document.getElementById('footer__mail-text').innerText)
         .then(function() {
            _this.innerHTML = `<svg class="svg-bx-check-dims">
                              <use xlink:href="img/icons/icons.svg#bx-check"></use>
                           </svg>`;

            setTimeout(() => {
               _this.innerHTML = `<svg class="svg-bx-copy-dims">
                                    <use xlink:href="img/icons/icons.svg#bx-copy"></use>
                                 </svg>`;
            }, 1500);
         });
   });

});
