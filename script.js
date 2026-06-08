// --- LOADER ---
window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) loader.style.display = "none";
    }, 1800);
});

// --- CONTROLE GLOBAL DE MÍDIA (MÚSICAS E VÍDEOS) ---
const allAudios = document.querySelectorAll("audio");
const allVideos = document.querySelectorAll("video");
const currentMusicText = document.getElementById("currentMusic");

// Função para pausar absolutamente tudo
function stopAllMedia() {
    allAudios.forEach(a => {
        a.pause();
        a.currentTime = 0;
    });
    allVideos.forEach(v => {
        v.pause();
    });
}

// Lógica para Áudios (index.html)
allAudios.forEach(audio => {
    audio.addEventListener("play", () => {
        // Pausa outros áudios e vídeos
        allAudios.forEach(other => { if (other !== audio) { other.pause(); other.currentTime = 0; } });
        allVideos.forEach(v => v.pause());

        // Atualiza o rodapé
        const musicName = audio.closest('.card-content').querySelector("h3").innerText;
        if (currentMusicText) currentMusicText.innerText = "🎵 Tocando: " + musicName;
    });
});

// Lógica para Vídeos (videos.html)
allVideos.forEach(video => {
    video.addEventListener("play", () => {
        // Pausa outros vídeos e qualquer áudio que esteja tocando
        allVideos.forEach(other => { if (other !== video) other.pause(); });
        allAudios.forEach(a => { a.pause(); a.currentTime = 0; });
    });
});

// --- PESQUISA (UNIFICADA) ---
const searchMusic = document.getElementById("searchInput");
const searchVideo = document.getElementById("videoSearch");

function filterCards(input, cardClass) {
    if (input) {
        input.addEventListener("keyup", () => {
            const value = input.value.toLowerCase();
            const cards = document.querySelectorAll(cardClass);
            cards.forEach(card => {
                const title = card.querySelector("h3").innerText.toLowerCase();
                card.style.display = title.includes(value) ? "block" : "none";
            });
        });
    }
}

filterCards(searchMusic, ".card");
filterCards(searchVideo, ".video-card");

// --- BOTÕES DE CURTIR (MÚSICA E VÍDEO) ---
function handleLikeButtons(selector, likedClass, textOn, textOff) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle(likedClass);
            button.innerHTML = button.classList.contains(likedClass) ? textOn : textOff;
        });
    });
}

// --- TEMA E OUTROS ---
const toggle = document.getElementById("themeToggle");
if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("light");
    });
}

// --- LOGIN ---
const loginButton = document.getElementById("loginButton");
const passwordInput = document.getElementById("passwordInput");
const loginScreen = document.getElementById("loginScreen");
const errorMessage = document.getElementById("errorMessage");
const ACCESS_PASSWORD = "Bruno2026";

if (loginButton) {
    loginButton.addEventListener("click", () => {
        if (passwordInput.value === ACCESS_PASSWORD) {
            loginScreen.style.display = "none";
        } else {
            errorMessage.style.display = "block";
            passwordInput.value = "";
        }
    });
}

// --- TÍTULO DINÂMICO ---
const titles = ["🎧 MusicDias", "🔥 Sua vibe musical", "🎬 Área de vídeos", "🌌 Música & emoção"];
let index = 0;
setInterval(() => {
    document.title = titles[index];
    index = (index + 1) % titles.length;
}, 3000);

// --- PARTICULAS ---
if(document.getElementById("particles-js") && typeof particlesJS !== 'undefined'){
    particlesJS("particles-js", {
        particles: {
            number: { value: 80 },
            color: { value: "#ff00aa" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            line_linked: { enable: true, color: "#6a00ff", opacity: 0.4 },
            move: { enable: true, speed: 2 }
        }
    });
}

