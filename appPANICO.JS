let panicodesc = false
let panicolig = true

let som = new Audio("sound/alarme.mp3")

let stream;
let track;


const botao = document.getElementById('button');
const panicoligImg = document.getElementById('on');
botao.addEventListener('mousedown', (event) => {
   event.preventDefault()
   
       botao.src = "img/panico ligado.png"
       som.play("sound/alarme.mp3")
   
})
botao.addEventListener('mouseup', (event) => {
   event.preventDefault()
   
       botao.src = "img/panico.png"
       som.pause()
   
})

botao.addEventListener('touchstart', (event) =>{
   event.preventDefault()
   if (panicolig === true && panicodesc === false){
       botao.src = "img/panico ligado.png"
       som.play()
   }
})
botao.addEventListener('touchend', (event) =>{
   event.preventDefault()
   if (panicolig === false && panicodesc === true){
       botao.src = "img/panico.png"
       som.pause()
   }
})

// Lanterna (torch)
async function inicializarLanterna() { //variaveis de apoio
    //solicita aceso à câmera traseira sem exibir o video 
    try {
        // Solicita acesso à câmera traseira sem exibir o vídeo
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        })
        
        // Obtém o track do vídeo para controlar a lanterna
        track = stream.getVideoTracks()[0]
        
        // Verifica se o dispositivo suporta o uso da lanterna
        const capabilities = track.getCapabilities()
        if (!capabilities.torch) {
            console.log("Lanterna não suportada no dispositivo.")
            return
        }
    } catch (error) {
        console.error(`Erro ao inicializar a lanterna: ${error}`)
    }
}



//lanterna (torch é igual a tocha)

async function inicializarLanterna() {
    //try-cat (tratamento de exceções)
    try {
        // Solicita acesso à câmera traseira sem exibir o vídeo
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        })
        
        // Obtém o track do vídeo para controlar a lanterna
        track = stream.getVideoTracks()[0]
        
        // Verifica se o dispositivo suporta o uso da lanterna
        const capabilities = track.getCapabilities()
        if (!capabilities.torch) {
            console.log("Lanterna não suportada no dispositivo.")
            return
        }
    } catch (error) {
        console.error(`Erro ao inicializar a lanterna: ${error}`)
    }
}

async function ligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: true }] })
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }
}

// Função para desligar a lanterna sem parar o stream
async function desligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: false }] })
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }
}