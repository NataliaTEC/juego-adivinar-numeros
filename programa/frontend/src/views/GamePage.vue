<template>
  <div class="game-container">
    <!-- Capa semitransparente -->
    <div class="overlay">
      <div class="container">
        <h1 class="irish-grover">Adivinar números</h1>

        <div class="tabs">
          <div class="tab comfortaa" :class="{active: activeTab === 'game'}" @click="activeTab = 'game'">Juego</div>
          <div class="tab comfortaa" :class="{active: activeTab === 'history'}" @click="activeTab = 'history'">Historial</div>
        </div>

        <!-- Pantalla de juego -->
        <div v-if="activeTab === 'game' && !gameStarted" class="content-section">
          <h2 class="comfortaa">Configuración de Jugadores</h2>

          <div class="form-group">
            <label for="player1" class="comfortaa">Jugador 1:</label>
            <input type="text" id="player1" v-model="player1" placeholder="Nombre del jugador 1">
          </div>
          
          <div class="form-group">
            <label for="player2" class="comfortaa">Jugador 2:</label>
            <input type="text" id="player2" v-model="player2" placeholder="Nombre del jugador 2">
          </div>
          
          <button class="play-button irish-grover" @click="startGame" :disabled="!player1 || !player2">
            <span class="button-text">Jugar</span>
          </button>
        </div>
        
        <!-- Pantalla de juego activo -->
        <div v-if="activeTab === 'game' && gameStarted" class="game-screen">
          <div v-if="!gameFinished">
            <h2>Ronda {{ currentRound }} de 6</h2>
            <div class="game-info">
              <p><strong>Jugador actual:</strong> {{ currentPlayer }}</p>
              <p><strong>Intentos en esta ronda:</strong> {{ currentAttempts }}</p>
            </div>
            
            <div v-if="!roundFinished">
              <div class="form-group">
                <label for="guess">Adivina el número (entre 1 y 100):</label>
                <input type="number" id="guess" v-model.number="currentGuess" min="1" max="100" @keyup.enter="checkGuess">
              </div>
              <button class="check-button irish-grover" @click="checkGuess">Comprobar</button>

              <div v-if="hint" class="hint">
                {{ hint }}
              </div>
            </div>
            
            <div v-else>
              <div class="attempts">
                <h3>¡{{ currentPlayer }} ha adivinado el número!</h3>
                <p>Número de intentos: {{ currentAttempts }}</p>
                <p>Tiempo: {{ currentTime }} segundos</p>
              </div>
              <button class="check-button irish-grover" @click="nextRound">Siguiente Ronda</button>
            </div>
          </div>
          
          <div v-else class="results-screen">
            <h2>Resultados Finales</h2>
            <table class="results-table">
              <tr>
                <th>Jugador</th>
                <th>Intentos Totales</th>
                <th>Tiempo Total</th>
              </tr>
              <tr>
                <td>{{ player1 }}</td>
                <td>{{ results.player1.attempts }}</td>
                <td>{{ results.player1.time }} segundos</td>
              </tr>
              <tr>
                <td>{{ player2 }}</td>
                <td>{{ results.player2.attempts }}</td>
                <td>{{ results.player2.time }} segundos</td>
              </tr>
            </table>
            
            <div class="winner">
              <p v-if="results.winner">{{ results.winner }} es el ganador!</p>
              <p v-else>¡Es un empate!</p>
            </div>
            
            <button class="check-button irish-grover" @click="saveGame">Guardar Partida</button>
            <button class="check-button irish-grover" @click="resetGame">Jugar de Nuevo</button>
          </div>
        </div>
        
        <!-- Pantalla de historial -->
        <div v-if="activeTab === 'history'" class="content-section">
          <h2 class="comfortaa">Historial de Partidas</h2>
          <p v-if="history.length === 0">No hay partidas en el historial.</p>
          <div v-else>
            <div v-for="(game, index) in history" :key="index" class="game-history">
              <h3>Partida {{ index + 1 }} - {{ formatDate(game.created_at) }}</h3>
              <table class="results-table">
                <tr>
                  <th>Jugador</th>
                  <th>Intentos</th>
                  <th>Tiempo</th>
                </tr>
                <tr>
                  <td>{{ game.player1 }}</td>
                  <td>{{ game.player1_attempts }}</td>
                  <td>{{ game.player1_time }} segundos</td>
                </tr>
                <tr>
                  <td>{{ game.player2 }}</td>
                  <td>{{ game.player2_attempts }}</td>
                  <td>{{ game.player2_time }} segundos</td>
                </tr>
              </table>
              <p><strong>Ganador:</strong> {{ game.winner || 'Empate' }}</p>
            </div>
          </div>
        </div>
        
        <div class="divider"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GamePage',
  data() {
    return {
      player1: '',
      player2: '',
      gameStarted: false,
      gameFinished: false,
      activeTab: 'game',
      currentRound: 1,
      currentPlayer: '',
      currentAttempts: 0,
      currentGuess: null,
      hint: '',
      roundFinished: false,
      roundStartTime: 0,
      currentTime: 0,
      targetNumber: 0,
      results: {
        player1: { attempts: 0, time: 0 },
        player2: { attempts: 0, time: 0 },
        winner: null
      },
      history: []
    }
  },
  created() {
    this.generateTargetNumber();
    this.loadHistory();
  },
  methods: {
    startGame() {
      this.gameStarted = true;
      this.currentPlayer = this.player1;
      this.roundStartTime = Date.now();
    },
    
    generateTargetNumber() {
      this.targetNumber = Math.floor(Math.random() * 100) + 1;
    },
    
    checkGuess() {
      if (!this.currentGuess || this.currentGuess < 1 || this.currentGuess > 100) {
        this.hint = 'Por favor, introduce un número entre 1 y 100';
        return;
      }
      
      this.currentAttempts++;
      
      if (this.currentGuess === this.targetNumber) {
        this.roundFinished = true;
        this.currentTime = Math.floor((Date.now() - this.roundStartTime) / 1000);
        
        // actualizo resultados del jugador actual
        const playerKey = this.currentPlayer === this.player1 ? 'player1' : 'player2';
        this.results[playerKey].attempts += this.currentAttempts;
        this.results[playerKey].time += this.currentTime;
        
      } else if (this.currentGuess < this.targetNumber) {
        this.hint = 'El número es mayor';
      } else {
        this.hint = 'El número es menor';
      }
      
      this.currentGuess = null;
    },
    
    nextRound() {
      if (this.currentRound >= 6) {
        this.finishGame();
        return;
      }
      
      this.currentRound++;
      this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
      this.currentAttempts = 0;
      this.hint = '';
      this.roundFinished = false;
      this.roundStartTime = Date.now();
      this.generateTargetNumber();
    },
    
    finishGame() {
      this.gameFinished = true;
      
      // Determinar el ganador
      const p1Score = this.results.player1.attempts + this.results.player1.time;
      const p2Score = this.results.player2.attempts + this.results.player2.time;
      
      if (p1Score < p2Score) {
        this.results.winner = this.player1;
      } else if (p2Score < p1Score) {
        this.results.winner = this.player2;
      }
    },
    
    resetGame() {
      this.gameStarted = false;
      this.gameFinished = false;
      this.currentRound = 1;
      this.currentAttempts = 0;
      this.currentGuess = null;
      this.hint = '';
      this.roundFinished = false;
      this.currentTime = 0;
      this.results = {
        player1: { attempts: 0, time: 0 },
        player2: { attempts: 0, time: 0 },
        winner: null
      };
      this.generateTargetNumber();
    },
    
    saveGame() {
      const gameData = {
        player1: this.player1,
        player2: this.player2,
        player1_attempts: this.results.player1.attempts,
        player2_attempts: this.results.player2.attempts,
        player1_time: this.results.player1.time,
        player2_time: this.results.player2.time,
        winner: this.results.winner,
        created_at: new Date().toISOString()
      };
      
      // Guardar en localStorage (simulando base de datos)
      const savedGames = JSON.parse(localStorage.getItem('numberBattleGames') || '[]');
      savedGames.push(gameData);
      localStorage.setItem('numberBattleGames', JSON.stringify(savedGames));
      
      // Recargar historial
      this.loadHistory();
      
      alert('Partida guardada correctamente');
    },
    
    loadHistory() {
      this.history = JSON.parse(localStorage.getItem('numberBattleGames') || '[]');
    },
    
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
  }
}
</script>

<style scoped>
/* importamos las diferentes tipografias que vamos a utilizar */
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

.game-container {
  background-image: url('../public/juegofondo.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
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
  max-width: 600px;
  padding: 30px;
  text-align: center;
  max-height: 90vh;
  overflow-y: auto;
}

h1 {
  color: #3498db;
  margin-bottom: 25px;
  font-size: 3rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #e0e0e0;
}

.tab {
  padding: 12px 25px;
  cursor: pointer;
  font-weight: bold;
  color: #7f8c8d;
  transition: all 0.3s;
}

.tab.active {
  color: #3498db;
  border-bottom: 3px solid #3498db;
}

.tab:hover {
  background-color: #f8f9fa;
}

.content-section {
  margin: 20px 0;
}

h2 {
  color: #3498db;
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #2c3e50;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #3498db;
  outline: none;
}

.play-button {
  background-color: #3498db57;
  color: #3498db; /* definimos el color del texto */
  font-size: 2rem;
  font-weight: bold;
  padding: 15px 125px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
  margin-top: 20px;
}

/* se hace el efecto hover para nuestro boton de jugar */
.play-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.check-button {
  background-color: #3498db57;
  color: #3498db; /* definimos el color del texto */
  font-size: 2rem;
  font-weight: bold;
  padding: 15px 125px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
  margin-top: 20px;
}

/* se hace el efecto hover para nuestro boton */
.check-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.game-info {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.hint {
  margin-top: 15px;
  padding: 10px;
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
}

.attempts {
  background-color: #d4edda;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.results-screen {
  text-align: center;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.results-table th, .results-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.results-table th {
  background-color: #f2f2f2;
}

.winner {
  margin: 20px 0;
  font-size: 1.2em;
  font-weight: bold;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 30px 0;
}

.game-history {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: left;
}

.game-history h3 {
  margin-top: 0;
  color: #2c3e50;
}

.game-history p {
  margin: 5px 0;
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
    width: 95%;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .tab {
    padding: 10px 15px;
  }
  
  .play-button {
    padding: 15px 60px;
    font-size: 1.5rem;
  }
}
</style>
