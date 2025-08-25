<template>
  <div class="rules-page">
    <!-- semitransparencia -->
    <div class="overlay">
      <div class="container">
        <h1 class="irish-grover">Reglas del Juego</h1>

        <div class="content-section">
          <h2 class="comfortaa">¿Cómo jugar?</h2>
          <!-- reglas del juego con images -->
          <ul class="rules-list comfortaa">
            <li>
              <img src="/icons/personas.svg" alt="Jugadores" class="rule-icon" />
              <span>El juego es para <strong>2 jugadores</strong>.</span>
            </li>
            <li>
              <img src="/icons/pensar.svg" alt="Número secreto" class="rule-icon" />
              <span>Un jugador piensa un número secreto dentro del rango acordado.</span>
            </li>
            <li>
              <img src="/icons/adivinar.svg" alt="Adivinar" class="rule-icon" />
              <span>El otro jugador debe adivinar el número ingresando intentos.</span>
            </li>
            <li>
              <img src="/icons/arriba.svg" alt="Más pequeño" class="rule-icon" />
              <span>Si el número ingresado es mayor, se mostrará la pista: "El número es más pequeño".</span>
            </li>
            <li>
              <img src="/icons/abajo.svg" alt="Más grande" class="rule-icon" />
              <span>Si el número ingresado es menor, se mostrará la pista: "El número es más grande".</span>
            </li>
            <li>
              <img src="/icons/premio.svg" alt="Ganador" class="rule-icon" />
              <span>El juego termina cuando el jugador adivina el número correctamente.</span>
            </li>
            <li>
              <img src="/icons/historial.svg" alt="Historial" class="rule-icon" />
              <span>Se lleva un historial de partidas, indicando los jugadores y el ganador.</span>
            </li>
          </ul>

        </div>

        <div class="divider"></div>

        <!-- regresar a la página principal -->
        <button class="back-button irish-grover" @click="goBack">Volver</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RulesPage",
  methods: {
    goBack() {
      //hago uso de las rutas del vue router
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
/* Importamos las tipografías */
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Irish+Grover&display=swap');

.irish-grover {
  font-family: "Irish Grover", system-ui;
  font-weight: 400;
  font-style: normal;
}

.comfortaa {
  font-family: "Comfortaa", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

.rules-page {
  background-image: url('../public/juegofondo.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  padding: 20px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 600px;
  padding: 30px;
  text-align: center;
}

h1 {
  color: #F36868;
  margin-bottom: 25px;
  font-size: 3rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;
}

.rules-list {
  list-style: none;
  padding: 0;
  text-align: left;
  line-height: 1.8;
  font-size: 1.1rem;
  color: #2c3e50;
}

.rules-list li {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 30px 0;
}

.back-button {
  background-color: #f3686879;
  color: #F36868; /* definimos el color del texto */
  font-size: 2rem;
  font-weight: bold;
  padding: 15px 125px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
}

/* se hace el efecto hover para nuestro boton de volver */
.back-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

/* iconos de las reglas */
.rule-icon {
  width: 28px;
  height: 28px;
  margin-right: 10px;
}
.rules-list li {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}
.rules-list span {
  flex: 1;
}

/* ajustes responsivos para pantallas pequeñas */
@media (max-width: 768px) {
  .container {
    padding: 20px;
    width: 95%;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>