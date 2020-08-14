
let oportunidades = 8;
const contMemorama = document.querySelector('.cont__memorama'),
    jugadasSpan = document.querySelector('#jugadas'),
    intentosSpan = document.querySelector('#intentos'),
    aciertosSpan = document.querySelector('#aciertos');
let victoria; 
myAlert('alert', 'ok', 'Bienvenido', 'Diviértete jugando memorama de animalitos que no tiene animalitos, puchale al cráneo para comenzar');

function iniciarMemo(){
    localStorage.setItem('clave', '');
    localStorage.setItem('clave-id', '');
    contMemorama.innerHTML = "";
    repartir();
    // repartir();
    setTimeout(() => {
        iniciarJuego();
    }, 300);
    function repartir(){
        fetch('json/memorama.json')
        .then(res => res.json())
        .then(data => {
            const array = data.tarjetas.concat(data.tarjetas);
            mezclarArreglo(array);
            for(item of array){
                let tarjetaItem = contMemorama.appendChild(document.createElement('div'));
                    tarjetaItem.setAttribute('class', 'tarjeta');
                    tarjetaItem.setAttribute('data-clave', item.clave);
                    tarjetaItem.setAttribute('data-id', "");
                let tDelantera = tarjetaItem.appendChild(document.createElement('div'));
                    tDelantera.setAttribute('class', 'delantera');
                let imgDelantera = tDelantera.appendChild(document.createElement('img'));
                fetch(item.img)
                .then(res => res.blob())
                .then(data => {
                    let urlImg = URL.createObjectURL(data);
                    imgDelantera.setAttribute('src', urlImg);
                });
                let tTrasera = tarjetaItem.appendChild(document.createElement('div'));
                    tTrasera.setAttribute('class', 'trasera');
                let imgTrasera = tTrasera.appendChild(document.createElement('img'));
                    imgTrasera.setAttribute('src', 'https://jizradesign.github.io/img/logo-icon-512x512.png');
            };
            victoria = array.length / 2;
        })
        .catch(error => {
            console.log('Error : ');
            console.log(error);
        });
    };
    function iniciarJuego(){
        intentosSpan.textContent = oportunidades;
        jugadasSpan.textContent = 0;
        aciertosSpan.textContent = 0;
        let tarjeta = document.querySelectorAll('.tarjeta');
        
        for(let i = 0; i < tarjeta.length; i++){
            setTimeout(() => {
                jugadas = 0;
                aciertos = 0;
                tarjeta[i].classList.remove('block');
                tarjeta[i].classList.add('rotate');
            }, 1000);
            tarjeta[i].dataset.id=i+1;
            tarjeta[i].addEventListener('click', () =>{
                if(!tarjeta[i].classList.contains('block')){
                    tarjeta[i].classList.toggle('rotate');
                    let clave = tarjeta[i].dataset.clave;
                    let claveId = tarjeta[i].dataset.id;
                    if(localStorage.getItem('clave') === ''){
                        localStorage.setItem('clave', clave);
                        localStorage.setItem('clave-id', claveId);
                    }else if(localStorage.getItem('clave') === clave && localStorage.getItem('clave-id') != claveId){
                        match(localStorage.getItem('clave'), clave)
                    }else{
                        voltear();
                    };
                    function match(clave1, clave2){
                        audio('sounds/windows-exclamacion.mp3')
                        console.log('match');
                        if(clave1 === clave2){
                            jugadas++;
                            aciertos++
                            aciertosSpan.textContent = aciertos;
                            jugadasSpan.textContent = jugadas;
                            tarjeta.forEach(clave=>{
                                if(clave.dataset.clave == clave1){
                                    clave.classList.add('block');
                                }
                            })
                            localStorage.setItem('clave', '');
                        };
                        if(aciertos === victoria){
                            audio('sounds/ganar.mp3');
                            myAlert('alert', 'ok', 'Felicidades!!', 'Gracias por jugar');
                        };
                    };
                    function voltear(){
                        audio('sounds/windows_error.mp3');
                        console.log('voltear');
                        if(localStorage.getItem('clave-id') != claveId){
                            jugadas++;
                            jugadasSpan.textContent = jugadas;
                        }
                        setTimeout(() => {
                            tarjeta.forEach(clave=>{
                                if(!clave.classList.contains('block')){
                                    clave.classList.add('rotate'); 
                                };
                            })
                            localStorage.setItem('clave', '');
                            localStorage.setItem('clave-id', '');
                        }, 500);
                        if(jugadas >= oportunidades){
                            tarjeta.forEach(clave=>{
                                clave.classList.add('block');
                            });
                            audio('sounds/perder.mp3');
                            myAlert('alert', 'fail', 'Mala suerte!!', 'Animo, no pasa nada. Inténtalo de nuevo');
                        };
                    };
                };
            });
        };  
    };
    function mezclarArreglo(arreglo){
        for (let i = arreglo.length - 1; i > 0; i--) {
            let indiceAleatorio = Math.floor(Math.random() * (i + 1));
            let temporal = arreglo[i];
            arreglo[i] = arreglo[indiceAleatorio];
            arreglo[indiceAleatorio] = temporal;
        };
    };
};
function myAlert(tipo, estado, titulo, mensaje){
    modal();
    let icono;
    if(estado === "ok"){
        icono = 'icon-ok far fa-smile-beam';
    }else if(estado === "fail"){
        icono = 'icon-fail fas fa-frown-open';
    };
    let contModal = document.querySelector('.cont__modal');
    let title = contModal.appendChild(document.createElement('h3'));
        title.setAttribute('id', 'title__alert');
        title.setAttribute('class', 'title__alert');
        title.textContent = titulo;
    let contMensaje = contModal.appendChild(document.createElement('p'));
        contMensaje.setAttribute('id', 'cont__alert');
        contMensaje.setAttribute('class', 'cont__alert');
        contMensaje.textContent = mensaje;
    let iconAlert = contModal.appendChild(document.createElement('i'));
        iconAlert.setAttribute('class', icono);
};
function modal(){
    let modal = document.body.appendChild(document.createElement('div'));
        modal.setAttribute('id', 'modal');
        modal.setAttribute('class', 'modal');
    let contModal = modal.appendChild(document.createElement('div'));
        contModal.setAttribute('id', 'cont__modal');
        contModal.setAttribute('class', 'cont__modal');
    let btnCerrarModal = modal.appendChild(document.createElement('div'));
        btnCerrarModal.setAttribute('id', 'btn__cerrar-modal');
        btnCerrarModal.setAttribute('class', 'btn__cerrar-modal');
    let iconCerrarModal = btnCerrarModal.appendChild(document.createElement('i'));
        iconCerrarModal.setAttribute('class','fas fa-skull');
        iconCerrarModal.setAttribute('title','Cerrar ventana');
        setTimeout(() => {
            document.querySelector('.modal').classList.add('visible');
        }, 300);
        document.querySelector('#btn__cerrar-modal').addEventListener('click', cerrarModal);
};
function cerrarModal(){
    document.querySelector('.modal').classList.remove('visible');
    setTimeout(() => {
        document.querySelector('.modal').remove();
        iniciarMemo();
    }, 500);
};