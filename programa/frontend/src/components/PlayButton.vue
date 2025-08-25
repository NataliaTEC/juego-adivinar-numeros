<template>
  <button class="play-button irish-grover-regular" @click="goToGame">
    <span class="button-text">Jugar</span>
  </button>
</template>

<script setup>
function goToGame() {
  console.log("Ir a la pantalla de reglas 📜");
}
</script>

<style scoped>
/* importamos la fuente de  google fonts*/
@import url('https://fonts.googleapis.com/css2?family=Irish+Grover&display=swap');

.play-button {
  background-color: white;
  color: #7b4ab9; /* definimos el color del texto */
  font-size: 1.5rem;
  font-weight: bold;
  padding: 15px 100px;
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

/* aplicamos la fuente deseada para nuestro boton de jugar */
.irish-grover-regular {
  font-family: "Irish Grover", system-ui;
  font-weight: 400;
  font-style: normal;
}
</style>


<template>
  <div class="home-page">
    <JugarButton @jugar-clicked="iniciarJuego" />
    <ReglasButton @reglas-clicked="mostrarReglas" />
  </div>
</template>

<script>
import JugarButton from '../components/PlayButton.vue';
import ReglasButton from '../components/RulesButton.vue';

export default {
  name: 'HomePage',
  components: {
    JugarButton,
    ReglasButton
  },
  methods: {
    iniciarJuego() {
      console.log('Iniciando juego...');
    },
    mostrarReglas() {
      console.log('Mostrando reglas...');
    }
  }
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;  
  justify-content: center; 
  align-items: center;
  width: 400px;      
  height: 400px;
  background-color: #b99c9c;
  gap: 12px;                
}
</style>