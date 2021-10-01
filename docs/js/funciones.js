let timer = "";
/**
 * Funcion para lanzar dialogo tipo alerta
 * @param {string} estado ok | fail
 * @param {string} titulo Titulo de la alerta
 * @param {string} mensaje Mensaje de la alerta
 */
function myAlert( tipo, estado, titulo, mensaje ) {
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
    
    if(document.querySelector('#nombre-jugador').textContent === " Jugador : " && estado == "ok"){
        formulario();

    }else{
        let btnCerrarModal = contModal.appendChild(document.createElement('div'));
            btnCerrarModal.setAttribute('id', 'btn__cerrar-modal');
            btnCerrarModal.setAttribute('class', 'btn__cerrar-modal');
        let iconCerrarModal = btnCerrarModal.appendChild(document.createElement('i'));
            iconCerrarModal.setAttribute('class','fas fa-skull');
            iconCerrarModal.setAttribute('title','Cerrar ventana');
        document.querySelector('#btn__cerrar-modal').addEventListener('click', cerrarModal);
        
    };     
};

/**
 * Funcion para pintar modal
 */
function modal(){
    let modal = document.body.appendChild(document.createElement('div'));
        modal.setAttribute('id', 'modal');
        modal.setAttribute('class', 'modal');
    let contModal = modal.appendChild(document.createElement('div'));
        contModal.setAttribute('id', 'cont__modal');
        contModal.setAttribute('class', 'cont__modal');
    setTimeout(() => {
        document.querySelector('.modal').classList.add('visible');
    }, 300);
};

/**
 * Funcion para cerrar modal
 */
function cerrarModal(){
    document.querySelector('.modal').classList.remove('visible');
    setTimeout(() => {
        document.querySelector('.modal').remove();
        iniciarMemo();
    }, 500);
};

/**
 * Pintar formulario de inicio
 */
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
    let label = form.appendChild(document.createElement('label'));
        label.setAttribute('for', 'enviar');
        label.setAttribute('id', 'btn__cerrar-modal');
        label.setAttribute('class', 'btn__cerrar-modal');
    let iconLabel = label.appendChild(document.createElement('i'));
        iconLabel.setAttribute('class', 'fas fa-skull');
        iconLabel.setAttribute('title', 'Entrar');
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

/**
 * Cacha parametros del url
 * @param {string} name parametro a buscar en url
 * @returns valor del parametro
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};


/**
 * Funcion para guardar datos
 * @param {string} lvl nivel
 * @param {string} name nombre de jugador
 * @param {string} status win | lose
 */
function saveData( lvl, name, status ) {

    name = name.replace( /\ Jugador : /, "" );

    if ( lvl === 0 ) {
        lvl = "easy";
    } else if ( lvl === 1 ) {
        lvl = "medium";
    } else if ( lvl === 2 ) {
        lvl = "hard";
    } else if ( lvl === 3 ) {
        lvl = "perfect";
    };

    let data = {
        "date": new Date().getTime(),
        "lvl": lvl,
        "name": name,
        "status": status,
        "time": document.querySelector( "#clock" ).textContent
    };

    console.log( data );
};

function time( accion ) {
    let m = 0;
    let s = 0;

    if ( accion == "stop" ) {
        clearInterval( timer );
        document.querySelector( "#clock" ).textContent = "0:00";

    } else {
        timer = setInterval(() => {
            s++;
            s < 10 ? s = "0"+s : s;
            if ( s === 60 ) {
                m++;
                m < 10 ? m = "0"+m : m;
                s = 00;
            }
            document.querySelector( "#clock" ).textContent =  m+":"+s;
            
        }, 1000);  
    }

    
}