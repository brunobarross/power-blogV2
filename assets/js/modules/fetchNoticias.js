
export default function getNoticias() {

    let pagina = 1;

    let pais = 'BR';
    let idioma = 'pt';
    let categoria = undefined;

    let ativo = false;

    const wrapper = document.querySelector('[data-js="noticias"]')
    const inptBusca = document.querySelector('#inptBusca')
    const loader = document.querySelector('.loader')



    /* executa e remove o loading ao carregar a página */

    const loading = () => {
        loader.classList.add('show');
        removeLoading();
    }

    const removeLoading = () => {
        setInterval(() => {
            loader.classList.remove('show');
        }, 1000)
    }

    loading();



    const getPosts = async () => {
        const response = await fetch('https://api.currentsapi.services/v1/latest-news?' + `category=${categoria}&` +
            `page_number=${pagina}&` + 'page_size=6&' + `language=${idioma}&` + `country=${pais}&` +
            'apiKey=o-CiQo9PEN-SzlLKFW8HiLAhnO0rr1_kB7DSAA1CSB_FJW3q');
        //    const data = await response.json(); //espera a promise ser resolvida e atribui o valor da promise a variavel data;

        console.log(response)
        return response.json();
    }



    const getNews = async () => {
        const posts = await getPosts();
        console.log(posts)
        const noticias = posts.news;
        const postsTemplate = noticias.map(({ title, description, url, category, published, image }) => {
            let data = published.substr(0, 10).replace('-', '/').replace('-', '/').split('/').reverse().join('/');
            // if (image != 'None') {
            return `<div class="blog__conteudo-wrapper-item">
                ${image != 'None' ? `
                <div class="blog__conteudo-wrapper-item-foto">
                    <img src="${image}">
                </div>
                `: `  <div class="blog__conteudo-wrapper-item-foto">
            </div>` }    
                <div class="blog__conteudo-wrapper-item-texto">
                    <div class="blog__conteudo-wrapper-item-texto-informacoes">
                        <span class="data__publicacao" data-dia="${data}">${data}</span>
                        <span></span>
                        <a href="#" class="btn__favorite"></a>
                    </div>
                    <h2 class="titulo__materia" data-titulo="${title}">${title}</h2>
                    <p class="texto__materia" data-texto="${description}">${description}</p>
                    <a href="${url}" target="_blank" class="ver_mais">Ler mais</a>
                </div>
            </div>
            `
        });
        wrapper.innerHTML += postsTemplate.join('');
        searchNews();
    }


    getNews()
    filterCountry()
    filterCategory()
  



    /* atualizar noticias de hora em hora */
    setInterval(getNews, 1000 * 60 * 60)



    /* acrescenta mais um em página para mostrar mais publicações*/
    const getNextPosts = () => {
        pagina++
        console.log(pagina)
        getNews();
    }


    /* remover animação de loading */
    const removeLoader = () => {
        setTimeout(() => {
            loader.classList.remove('show');
            getNextPosts();
            ativo = false;
        }, 1000)
    }


    /* adiciona animação de loading ao final da página */
    const showLoader = () => {
        ativo = true;
        loader.classList.add('show');
        removeLoader();
    }



    /* adicionar evento ao chegar no fim da página */

    window.addEventListener('scroll', () => {
        const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
        console.log(clientHeight, scrollHeight, scrollTop)
        const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10;
        if (isPageBottomAlmostReached && !ativo) {
            showLoader();
        }
    })



    /* busca de noticias*/
    function searchNews() {
        const newsItem = document.querySelectorAll(".blog__conteudo-wrapper-item")
        /* limpar busca */
        function limpar(index) {
            newsItem.forEach((div) => {
                div.style.display = "block";
            })
        }

        /* função que remove caracteres especiais*/
        function removeSpecialChars(div) {
            return div.innerHTML.toUpperCase().replace(/[ÀÁÂÃÄÅ]/g, "A");
        }


        /* filtro da busca */
        function filtro(e) {
            newsItem.forEach((div, index) => {
                const valorInput = inptBusca.value.toUpperCase().replace(/[ÀÁÂÃÄÅ]/g, "A");
                if (removeSpecialChars(div).indexOf(valorInput) == -1) {
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


    /* filtrar por categorias*/
    function filterCategory() {
        const select = document.querySelector('#filtroCategoria');
        select.addEventListener('change', (e) => {
            switch (e.target.value) {
                case 'Geral':
                    wrapper.innerHTML = '';
                    categoria = undefined;
                    getNews();
                    loading();
                    break;
                case 'Esporte':
                    wrapper.innerHTML = '';
                    categoria = 'sports';
                    getNews();
                    loading();
                    break;
                case 'Economia':
                    wrapper.innerHTML = '';
                    categoria = 'economy';
                    getNews();
                    loading();
                    break;
                case 'Mundo':
                    wrapper.innerHTML = '';
                    categoria = 'world';
                    getNews();
                    loading();
                    break;
                case 'Politica':
                    wrapper.innerHTML = '';
                    categoria = 'politics';
                    getNews();
                    loading();
                    break;
            }
        });

    }

    function filterCountry() {
        const selectCountry = document.querySelector('#filtroPais');
        selectCountry.addEventListener('change', (e) => {
            console.log(e.target)
            switch (e.target.value) {
                case 'Brasil':
                    wrapper.innerHTML = '';
                    pais = 'BR';
                    idioma = 'pt';
                    getNews();
                    loading();
                    break;
                case 'Internacional':
                    wrapper.innerHTML = '';
                    pais = 'US';
                    idioma = 'en';
                    getNews();
                    loading();
                    break;
            }
        });

    }

}

