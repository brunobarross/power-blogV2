
export default function getNoticias() {

    let pagina = 1;

 
    const url = 'https://api.currentsapi.services/v1/available/categories:'



    const wrapper = document.querySelector('[data-js="noticias"]')

    const loader = document.querySelector('.loader')



    const getPosts = async () => {
        const response = await fetch('https://api.currentsapi.services/v1/search?' +
        `page_number=${pagina}&` + 'page_size=5&' + 'region=BR&' + 'language=pt&' +
        'apiKey=REM4gJuyFwfGNm9CtbtVbi3vhF-DI20JecYd6RoVHuHbMYN1');
        //    const data = await response.json(); //espera a promise ser resolvida e atribui o valor da promise a variavel data;
        return response.json();    
    }


    const getNews = async () => {
        const posts = await getPosts();
        console.log(posts)
        const noticias = posts.news;

        const postsTemplate = noticias.map(({title, description, url, category, published }) =>{
            let data = published.substr(0, 10).replace('-', '/').replace('-', '/');
            return ` <div class="blog__conteudo-wrapper-item">
            <div class="blog__conteudo-wrapper-item-nav">
                <span class="data__publicacao" data-dia="${data}">${data}</span>
                <span></span>
                <a href="#" class="btn__favorite"></a>
            </div>
            <div class="blog__conteudo-wrapper-item-texto">
                <h2 class="titulo__materia" data-titulo="${title}">${title}</h2>
                <p class="texto__materia" data-texto="${description}">${description}</p>
                <a href="${url}" target="_blank" class="ver_mais">Ler mais</a>

            </div>
        </div>
        `
        }).join('');

        wrapper.innerHTML += postsTemplate;
        filtrarNoticias();
    }



    /* atualizar de hora em hora */
    // setInterval(mostrarNoticias, 1000 * 60 * 60)
    getNews()



    const getNextPosts = () =>{
        pagina++;
        console.log(pagina)
        getNews();
    
    }
    
    const removeLoader = () =>{
        setTimeout(() =>{
            loader.classList.remove('show');
            getNextPosts();
        }, 1000)
    }
    
    
    const showLoader = () =>{
        loader.classList.add('show');
        removeLoader();
    }
    
    
    
    window.addEventListener('scroll', () => {
        const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
    
        const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10;
        if(isPageBottomAlmostReached) {
            showLoader();
        } 
    
    })




    function filtrarNoticias() {
        const btnBusca = document.querySelector('#btnBusca');
        const inptBusca = document.querySelector('#inptBusca')
        const noticiasItem = document.querySelectorAll(".blog__conteudo-wrapper-item")
        /* limpar busca */
        function limpar(index) {
            noticiasItem.forEach((div) => {
                div.style.display = "block";
            })
        }

        /* função que remove caracteres especiais*/
        function removeEspeciais(div) {
            return div.innerHTML.toUpperCase().replace(/[ÀÁÂÃÄÅ]/g, "A");
        }

        /* filtro da busca */
        function filtro(e) {
            console.log(e)
            noticiasItem.forEach((div, index) => {
                const valorInput = inptBusca.value.toUpperCase().replace(/[ÀÁÂÃÄÅ]/g, "A");
                if (removeEspeciais(div).indexOf(valorInput) == -1) {
                    div.style.display = "none";
                    inptBusca.addEventListener("input", function () {
                        limpar(index);
                    })
                }
            })
        }

        /* evento de clique nas teclas dentro do campo de busca*/
        inptBusca.addEventListener('keyup', filtro)
    }

   
}

