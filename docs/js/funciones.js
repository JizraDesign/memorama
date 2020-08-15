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
    if(document.querySelector('#nombre-jugador').textContent === "Jugador : "){
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
function cerrarModal(){
    document.querySelector('.modal').classList.remove('visible');
    setTimeout(() => {
        document.querySelector('.modal').remove();
        iniciarMemo();
    }, 500);
};