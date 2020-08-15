const url = 'json/memorama.json',
    contMemorama = document.querySelector('.cont__memorama'),
    aciertosSpan = document.querySelector('#aciertos');
let oportunidades, $lvl = 0, victoria, intentos, aciertos; 
myAlert('alert', 'ok', 'Bienvenido', 'Diviértete jugando memorama de animalitos que no tiene animalitos, puchale al cráneo para comenzar');
function iniciarMemo(){
    document.querySelector('#nivel-jugador').innerHTML = 'Nivel : ';
    if($lvl === 0){
        document.querySelector('#nivel-jugador').innerHTML += 'Facil';
        oportunidades = 6;
    }else if($lvl === 1){
        document.querySelector('#nivel-jugador').innerHTML += 'Medio';
        oportunidades = 4;
    }else if($lvl === 2){
        document.querySelector('#nivel-jugador').innerHTML += 'Dificil';
        oportunidades = 2;
    }else if($lvl === 3){
        document.querySelector('#nivel-jugador').innerHTML += 'Perfecto';
        oportunidades = 0;
    };
    localStorage.setItem('clave', '');
    localStorage.setItem('clave-id', '');
    contMemorama.innerHTML = "";
    repartir();
    setTimeout(() => {
        iniciarJuego();
    }, 300);
    function repartir(){
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const array = data.tarjetas.concat(data.tarjetas);
            mezclarArreglo(array);
            for(item of array){
                let tarjetaItem = contMemorama.appendChild(document.createElement('div'));
                    tarjetaItem.setAttribute('class', 'tarjeta block');
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
        vidas(oportunidades, intentos);
        aciertosSpan.textContent = aciertos;
        let tarjeta = document.querySelectorAll('.tarjeta');
        
        for(let i = 0; i < tarjeta.length; i++){
            setTimeout(() => {
                aciertos = 0;
                intentos = 0;
                aciertosSpan.textContent = aciertos;
                vidas(oportunidades, intentos);
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
                        match(localStorage.getItem('clave'), clave);
                    }else{
                        voltear();
                    };
                    function match(clave1, clave2){
                        audio('sounds/windows-exclamacion.mp3');
                        if(clave1 === clave2){
                            aciertos++;
                            aciertosSpan.textContent = aciertos;
                            tarjeta.forEach(clave=>{
                                if(clave.dataset.clave == clave1){
                                    clave.classList.add('block');
                                };
                            });
                            localStorage.setItem('clave', '');
                        };
                        if(aciertos === victoria){
                            audio('sounds/ganar.mp3');
                            $lvl++;
                            if($lvl >= 4){
                                myAlert('alert', 'ok', 'Felicidades!!', 'Ganaste todos los niveles');
                            }else{
                                myAlert('alert', 'ok', 'Felicidades!!', 'Subiste de nivel');
                            };
                        };
                    };
                    function voltear(){
                        audio('sounds/windows_error.mp3');
                        if(localStorage.getItem('clave-id') != claveId){
                            intentos++;
                            vidas(oportunidades, intentos);
                        };
                        setTimeout(() => {
                            tarjeta.forEach(clave=>{
                                if(!clave.classList.contains('block')){
                                    clave.classList.add('rotate'); 
                                };
                            });
                            localStorage.setItem('clave', '');
                            localStorage.setItem('clave-id', '');
                        }, 500);
                        if(oportunidades - intentos <= 0){
                            tarjeta.forEach(clave=>{
                                clave.classList.add('block');
                            });
                            audio('sounds/perder.mp3');
                            $lvl = 0;
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
    function vidas(oportunidades, intentos){
        let vidasCont = document.querySelector('#vidas');
        vidasCont.innerHTML = "";
        let jugadas = oportunidades - intentos;
        for(let i = 0; i < jugadas; i++){
            let vida = vidasCont.appendChild(document.createElement('i'));
                vida.setAttribute('class', 'heart-red fas fa-heart');
        };
    };
};
function formulario(){
    let contModal = document.querySelector('.cont__modal');
    let form = contModal.appendChild(document.createElement('form'));
        form.setAttribute('id', 'lvl');
        form.setAttribute('class', 'lvl');
    let iptNombre = form.appendChild(document.createElement('input'));
        iptNombre.setAttribute('type', 'text');
        iptNombre.setAttribute('id','nombre');
        iptNombre.setAttribute('class','nombre');
        iptNombre.setAttribute('name','nombre');
        iptNombre.setAttribute('placeholder', 'Pon tu nombre aqui');
    // let selectLvl = form.appendChild(document.createElement('select'));
    //     selectLvl.setAttribute('id', 'nivel');
    //     selectLvl.setAttribute('name', 'nivel');
    // let optLvl = selectLvl.appendChild(document.createElement('option'));
    //     optLvl.setAttribute('value', '');
    //     optLvl.setAttribute('selected', '');
    //     optLvl.setAttribute('disabled', '');
    //     optLvl.textContent = 'Selecciona tu nivel';
    // optLvl = selectLvl.appendChild(document.createElement('option'));
    //     optLvl.setAttribute('value', '0');
    //     optLvl.textContent = 'Facil';
    // optLvl = selectLvl.appendChild(document.createElement('option'));
    //     optLvl.setAttribute('value', '1');
    //     optLvl.textContent = 'Medio';
    // optLvl = selectLvl.appendChild(document.createElement('option'));
    //     optLvl.setAttribute('value', '2');
    //     optLvl.textContent = 'Dificil';
    let label = form.appendChild(document.createElement('label'));
        label.setAttribute('for', 'enviar');
        label.setAttribute('id', 'btn__cerrar-modal');
        label.setAttribute('class', 'btn__cerrar-modal');
    let iconLabel = label.appendChild(document.createElement('i'));
        iconLabel.setAttribute('class', 'fas fa-skull');
    let iptSubmit = form.appendChild(document.createElement('input'));
        iptSubmit.setAttribute('type', 'submit');
        iptSubmit.setAttribute('name', 'enviar');
        iptSubmit.setAttribute('id', 'enviar');

    const formLvl = document.querySelector('#lvl'),
        nombre = document.querySelector('#nombre'),
        nivel = document.querySelector('#nivel');
    nombre.addEventListener('keyup', ()=> {
        if(nombre.value.length >= 1){
            nombre.classList.add('active');
        }else{
            nombre.classList.remove('active');
        };
    });
    formLvl.addEventListener('submit', e=> {
        e.preventDefault();
        if(nombre.value === ""){

            return false;
        };
        document.querySelector('#nombre-jugador').innerHTML += nombre.value;
        // $lvl = nivel.value;
        cerrarModal();
    });
};