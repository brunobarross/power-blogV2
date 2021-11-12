export default function getNoticias() {


    // const url = `https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=1e2560598184480183fc18b9161c6d0b`


    const url = 'https://api.currentsapi.services/v1/latest-news?' +
        'language=pt&' +
        'apiKey=REM4gJuyFwfGNm9CtbtVbi3vhF-DI20JecYd6RoVHuHbMYN1';

    var req = new Request(url);


    const wrapper = document.querySelector('[data-js="noticias"]')


    function mostrarNoticias() {
        let saida = "";
        let ultimasNoticias;
        fetch(req).then((response) => {
            return response.json();
        }).then((noticias) => {
            saida = saida = "";
            ultimasNoticias = noticias.news;
            console.log(ultimasNoticias)
            for (let i = 1; i <= 15; i++) {
                let data = ultimasNoticias[i].published.substr(0, 10).replace('-', '/').replace('-', '/');

                saida += `
    <div class="blog__conteudo-wrapper-item">
        <div class="blog__conteudo-wrapper-item-nav">
            <span class="data__publicacao" data-dia="${data}">${data}</span>
            <a href="#" class="btn__favorite"></a>
        </div>
        <div class="blog__conteudo-wrapper-item-texto">
            <h2 class="titulo__materia" data-titulo="${ultimasNoticias[i].title}">${ultimasNoticias[i].title}</h2>
            <p class="texto__materia" data-texto="${ultimasNoticias[i].description}">${ultimasNoticias[i].description}</p>
            <a href="${ultimasNoticias[i].url}" target="_blank" class="ver_mais">Ler mais</a>
        </div>
    </div>
    `
                wrapper.innerHTML = saida;
            }
            /* executa função de filtrar a busca*/
            filtrarNoticias()
        })


    }

    /* atualizar de hora em hora */
    setInterval(mostrarNoticias, 1000 * 60 * 60)
    mostrarNoticias()



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