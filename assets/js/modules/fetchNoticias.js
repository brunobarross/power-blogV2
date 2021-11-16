
export default function getNoticias() {

    let pagina = 1;

    let valor;


    const url = 'https://api.currentsapi.services/v1/available/categories:'



    const wrapper = document.querySelector('[data-js="noticias"]')
    const inptBusca = document.querySelector('#inptBusca')
    const loader = document.querySelector('.loader')



    const getPosts = async () => {
        const response = await fetch('https://api.currentsapi.services/v1/latest-news?' + `category=${valor}&` +
            `page_number=${pagina}&` + 'page_size=6&' + 'language=pt&' + 'country=BR&' +
            'apiKey=REM4gJuyFwfGNm9CtbtVbi3vhF-DI20JecYd6RoVHuHbMYN1');
        //    const data = await response.json(); //espera a promise ser resolvida e atribui o valor da promise a variavel data;

        console.log(response)
        return response.json();

    }



    const getNews = async () => {
        const posts = await getPosts();
        console.log(posts)
        const noticias = posts.news;
        const postsTemplate = noticias.map(({ title, description, url, category, published, image }) => {
            let data = published.substr(0, 10).replace('-', '/').replace('-', '/');

            if (image != 'None') {
                return `<div class="blog__conteudo-wrapper-item">
                <div class="blog__conteudo-wrapper-item-foto">
                    <img src="${image}">
                </div>    
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
            }
            return `<div class="blog__conteudo-wrapper-item">    
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
        searchNews()


    }


    getNews()

    filterCategory()


    function filterCategory() {
        const select = document.querySelector('.filtro select');
        select.addEventListener('change', (e) => {
            switch (e.target.value) {
                case 'Geral':
                    wrapper.innerHTML = '';
                    valor = undefined;
                    getNews();
                    break;
                case 'Esporte':
                    wrapper.innerHTML = '';
                    valor = 'sports';
                    getNews();
                    break;
                case 'Economia':
                    wrapper.innerHTML = '';
                    valor = 'economy';
                    getNews();
                    break;
                case 'Mundo':
                    wrapper.innerHTML = '';
                    valor = 'world';
                    getNews();
                    break;
                case 'Politica':
                    wrapper.innerHTML = '';
                    valor = 'politics';
                    getNews();
                    break;


            }
        });

    }
    /* atualizar de hora em hora */
    setInterval(getNews, 1000 * 60 * 60)




    const getNextPosts = () => {
        pagina++
        console.log(pagina)
        getNews();

    }


    const removeLoader = () => {
        setTimeout(() => {
            loader.classList.remove('show');
            getNextPosts();
        }, 1000)
    }


    const showLoader = () => {
        loader.classList.add('show');
        removeLoader();
    }



    window.addEventListener('scroll', () => {
        const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
        const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10;
        if (isPageBottomAlmostReached) {
            showLoader();
        }

    })





    function searchNews() {
        const newsItem = document.querySelectorAll(".blog__conteudo-wrapper-item")

        /* limpar busca */
        function limpar(index) {
            newsItem.forEach((div) => {
                div.style.display = "block";
            })
        }

        /* função que remove caracteres especiais*/
        function removeEspeciais(div) {
            return div.innerHTML.toUpperCase().replace(/[ÀÁÂÃÄÅ]/g, "A");
        }


        /* filtro da busca */
        function filtro(e) {
            newsItem.forEach((div, index) => {
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

