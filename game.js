// Random sentence generator
const sentences = [
  'The quick brown fox jumps.',
  'Speed is key.',
  'Type quickly and win.',
  'React with accuracy.',
  'Javascript is fun.',
  'Learn to type fast.'
];

let startTime, endTime;
let wordCount = 0;
let totalRaces = 0;
let totalWPM = 0;
let user = { username: '', purchased: false }; // User data

// Selecting elements
const textToType = document.getElementById('text-to-type');
const textInput = document.getElementById('text-input');
const raceBtn = document.getElementById('raceBtn');
const currentWPM = document.getElementById('currentWPM');
const averageWPM = document.getElementById('averageWPM');
const botProgress = document.getElementById('bot-progress');
const playerProgress = document.getElementById('player-progress');
const botContainer = document.getElementById('bot-container');

// Check if user is already logged in
function checkLogin() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    user = storedUser;
    alert(`Welcome back, ${user.username}!`);
  }
}

// Start a new race
raceBtn.addEventListener('click', () => {
  const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
  textToType.textContent = randomSentence;
  textInput.value = '';
  textInput.disabled = false;
  textInput.focus();
  startTime = new Date().getTime();
  botProgress.style.width = '0%'; // Reset bot progress
  playerProgress.style.width = '0%'; // Reset player progress
  wordCount = 0; // Reset word count
});

// Handle typing input
textInput.addEventListener('input', () => {
  const typedText = textInput.value;
  const sentence = textToType.textContent;

  // Allow continuous typing
  if (typedText === sentence) {
    endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000 / 60; // Time in minutes
    const wordsTyped = sentence.split(' ').length;
    const wpm = Math.round(wordsTyped / timeTaken);

    // Update stats
    wordCount++;
    totalRaces++;
    totalWPM += wpm;

    currentWPM.textContent = wpm;
    averageWPM.textContent = Math.round(totalWPM / totalRaces);

    // Move the player's progress
    playerProgress.style.width = (wordCount * 10) + '%'; // 10% per word

    textInput.value = ''; // Clear input for next word
    textInput.focus(); // Focus on the input field

    // Simulate bot typing
    simulateBotRace(wpm);
  }
});

// Basic bot simulation
function simulateBotRace(playerWPM) {
  const botWPM = Math.floor(Math.random() * (playerWPM + 10 - 20) + 20); // Bot speed is random, but competitive
  let botWordsTyped = 0; // Keep track of the bot's progress
  let botTime = 0;
  let botInterval = setInterval(() => {
    botWordsTyped++;
    botProgress.style.width = (botWordsTyped * 10) + '%'; // Move bot's progress

    if (botWordsTyped >= 10) { // Assuming bot also types 10 words
      clearInterval(botInterval);
      if (botWPM > playerWPM) {
        alert("Bot won!");
      } else {
        alert("You won!");
      }
    }
  }, 1000); // Bot types every second
}

// Basic login functionality (demo purpose, no backend)
const loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('loginForm');
const signupBtn = document.getElementById('signupBtn');
const signupForm = document.getElementById('signupForm');
const storeBtn = document.getElementById('storeBtn');
const store = document.getElementById('store');
const closeStore = document.getElementById('closeStore');
const betaBtn = document.getElementById('betaBtn');
const betaFeatures = document.getElementById('betaFeatures');
const stripePayment = document.getElementById('stripePayment');

// Check for user login on page load
checkLogin();

// Toggle forms and store
loginBtn.addEventListener('click', () => loginForm.style.display = 'block');
signupBtn.addEventListener('click', () => signupForm.style.display = 'block');
storeBtn.addEventListener('click', () => store.style.display = 'block');
closeStore.addEventListener('click', () => store.style.display = 'none');

// Close forms and store
document.getElementById('closeLoginForm').addEventListener('click', () => loginForm.style.display = 'none');
document.getElementById('closeSignupForm').addEventListener('click', () => signupForm.style.display = 'none');

// Beta feature access with payment check
betaBtn.addEventListener('click', () => {
  if (user.purchased) {
    betaFeatures.style.display = 'block';
    stripePayment.style.display = 'none';
  } else {
    stripePayment.style.display = 'block';
  }
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;

  // Set user and store in local storage
  user.username = username;
  localStorage.setItem('user', JSON.stringify(user));
  alert(`Welcome ${user.username}!`);
  loginForm.style.display = 'none';
});

// Handle signup form validation
document.getElementById('signUpForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const age = document.getElementById('age').value;
  const reason = document.getElementById('reason').value;

  if (age < 13) {
    document.getElementById('error-message').textContent = 'You must be at least 13 years old to sign up.';
    return;
  }

  if (reason.length < 10) {
    document.getElementById('error-message').textContent = 'Please provide a valid reason (at least 10 characters).';
    return;
  }

  // Add user to database logic here (backend)
  user.username = username;
  localStorage.setItem('user', JSON.stringify(user));
  alert(`Welcome ${username}!`);
  signupForm.style.display = 'none';
});

// Example backend integration for Stripe webhook (not implemented, but here's the flow)
// Backend webhook on payment success -> set `user.purchased = true` -> enable beta features.