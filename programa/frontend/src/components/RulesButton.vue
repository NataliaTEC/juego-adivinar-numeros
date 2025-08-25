<template>
  <button class="rules-button irish-grover-regular" @click="goToGame">
    <span class="button-text">Reglas</span>
  </button>
</template>

<script setup>
function goToGame() {
  console.log("Ir a la pantalla de reglas 📜");
}
</script>

<style scoped>
/* Importar la fuente de Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Irish+Grover&display=swap');

.rules-button {
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
  margin-top: 60px;
}

/* se hace el efecto hover para nuestro boton de reglas */
.rules-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

/* aplicamos la fuente deseada para nuestro boton de reglas */
.irish-grover-regular {
  font-family: "Irish Grover", system-ui;
  font-weight: 400;
  font-style: normal;
}
</style>