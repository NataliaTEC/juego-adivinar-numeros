<template>
    <div class="home-page">
        <div class = "overlay">
          <div class="container irish-grover-regular">
            <h1>Adivinar números</h1>
            <div class="divider"></div>
            <button class="play-button irish-grover-regular" @click="goToGame">
            <span class="button-text">Jugar</span>
            </button>

            <button class="rules-button irish-grover-regular" @click="goToRules">
                <span class="button-text">Reglas</span>
            </button>
            <div class="divider"></div>
          </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToGame() {
  router.push({ name: 'Game' })
}

function goToRules() {
  router.push({ name: 'Rules' })
}
</script>


<style scoped>
/* importamos la fuente de google fonts */
@import url('https://fonts.googleapis.com/css2?family=Irish+Grover&display=swap');
.home-page {
  background-image: url('public/juegofondo.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
        
body {
  background-color: rgb(255, 255, 255);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* para poner el fondo semitransparente para mejor legibilidad */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.356);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.container {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  padding: 30px;
  text-align: center;
}
        
h1 {
  color: #7b4ab9;
  margin-bottom: 25px;
  font-size: 2.5rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}
        
.form-group {
  margin-bottom: 20px;
  text-align: left;
}
          
.divider {
  height: 1px;
  background-color: #7d63a0;
  margin: 30px 0;
}
        
.play-button {
  background-color: #7a4ab983;
  color: #7b4ab9; /* definimos el color del texto */
  font-size: 2rem;
  font-weight: bold;
  padding: 18px 150px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
}

/* se hace el efecto hover para nuestro boton de jugar */
.play-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.rules-button {
  background-color: #7a4ab983;
  color: #7b4ab9; /* definimos el color del texto */
  font-size: 2rem;
  font-weight: bold;
  padding: 18px 150px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
  margin-top: 60px;
}

/* se hace el efecto hover para nuestro boton de reglas */
.rules-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

/* aplicamos la fuente deseada */
.irish-grover-regular {
  font-family: "Irish Grover", system-ui;
  font-weight: 400;
  font-style: normal;
}
        
@media (max-width: 768px) {
  .container {
      padding: 20px;
      width: 95%;
  }
            
  h1 {
      font-size: 2rem;
  }
}
</style>