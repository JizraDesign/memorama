const btnSettings = document.querySelector("#settings"),
    btnMusic = document.querySelector("#music"),
    btnEffects = document.querySelector("#effects"),
    btnsSettings = document.querySelectorAll(".btn.setting");

let effectOpt = true,
    musicOpt = true,
    musicTheme;

function audio(tipo, pista){
    
    if(tipo === true){
        const reproducir = new Audio();
        reproducir.src = pista;
        reproducir.play();
        return reproducir;
    };
    
};

btnSettings.addEventListener("click", () => {
    btnSettings.parentNode.parentNode.classList.toggle("active");
    if(btnSettings.parentNode.parentNode.classList.contains("active")){    
        btnsSettings.forEach( (btn, i) => btn.style=`transform: translateY(-${110 * i}%)`);
    }else{
        btnsSettings.forEach( btn => btn.removeAttribute("style"));
    }
});

btnMusic.addEventListener("click", () => {
    try {
        if(musicTheme.paused){
            btnMusic.querySelector("i").classList.add("fa-volume-up");
            btnMusic.querySelector("i").classList.remove("fa-volume-mute");
            musicTheme.play();
        }else{
            btnMusic.querySelector("i").classList.remove("fa-volume-up");
            btnMusic.querySelector("i").classList.add("fa-volume-mute");
            musicTheme.pause();
        };
    } catch (error) {
        btnMusic.remove()
    }
    
});

btnEffects.addEventListener("click", () => {
    if(effectOpt === true){
        effectOpt = false;
        btnEffects.classList.add("off");
    }else{
        if(btnEffects.classList.contains("off")){
            btnEffects.classList.remove("off")
        };
        effectOpt = true;
    };
})