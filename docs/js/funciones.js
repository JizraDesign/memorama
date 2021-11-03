let timer = "";

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
                s = "00";
            }
            document.querySelector( "#clock" ).textContent =  m+":"+s;
            
        }, 1000);  
    }  
}

export { getParameterByName, saveData, time}