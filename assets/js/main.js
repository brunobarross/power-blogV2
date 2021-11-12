import getNoticias from '../js/modules/fetchNoticias.js'

getNoticias();


function scrollMenu() {
    const menu = document.querySelector('.blog__header');


    window.addEventListener('scroll', animaMenu);

    function animaMenu() {
        const windowTop = window.pageYOffset;
        if ((windowTop) > menu.offsetTop) {
            menu.classList.add("scroll");
        } else {
            menu.classList.remove("scroll");
        }

        
    }
}
scrollMenu();