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

// Selecting elements
const textToType = document.getElementById('text-to-type');
const textInput = document.getElementById('text-input');
const raceBtn = document.getElementById('raceBtn');
const currentWPM = document.getElementById('currentWPM');
const averageWPM = document.getElementById('averageWPM');

// Start a new race
raceBtn.addEventListener('click', () => {
  const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
  textToType.textContent = randomSentence;
  textInput.value = '';
  textInput.disabled = false;
  textInput.focus();
  startTime = new Date().getTime();
});

// Handle typing input
textInput.addEventListener('input', () => {
  const typedText = textInput.value;
  const sentence = textToType.textContent;

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

    textInput.disabled = true;

    // Simulate a bot typing
    simulateBotRace(wpm);
  }
});

// Basic bot simulation
function simulateBotRace(playerWPM) {
  const botWPM = Math.floor(Math.random() * (playerWPM + 10 - 20) + 20); // Bot speed is random, but competitive
  const botProgress = document.getElementById('bot-progress');
  let botTime = 0;
  let botInterval = setInterval(() => {
    botTime += 1;
    botProgress.style.width = (botTime / 100) * 100 + '%'; // Simulate bot progress
    
    if (botTime >= 100) {
      clearInterval(botInterval);
      if (botWPM > playerWPM) {
        alert("Bot won!");
      } else {
        alert("You won!");
      }
    }
  }, 100);
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
  const hasPurchased = false; // Change to true if payment confirmed (logic required on the backend)

  if (hasPurchased) {
    betaFeatures.style.display = 'block';
    stripePayment.style.display = 'none';
  } else {
    stripePayment.style.display = 'block';
  }
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
  alert(`Welcome ${username}!`);
  signupForm.style.display = 'none';
});

// Example backend integration for Stripe webhook (not implemented, but here's the flow)
// Backend webhook on payment success -> set `hasPurchased = true` -> enable beta features.