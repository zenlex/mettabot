const msgContainer = document.getElementById('message');
const msgBg = document.getElementById('messagebg');
const API_URL = window.location.origin + '/api'

const setContent = (url) => {
  const text = fetch(url)
  .then(response => response.json())
  .then(({text}) => {
  msgContainer.textContent = text;
  msgBg.textContent = text;
  }
  )
}

//add random animation
const animationClasses = ['gradientmask', 'waterwave', 'jumping-shadows'];
const animindex = Math.floor(Math.random() * animationClasses.length);
// const animindex = 0; //for debugging CSS
msgContainer.className = animationClasses[animindex];
msgBg.className = animationClasses[animindex];

setContent(API_URL)