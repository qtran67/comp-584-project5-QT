const { tween, styler, spring, keyframes } = window.popmotion;

const jokeBox = document.getElementById('joke');
const button = document.getElementById('jokeBtn');

const boxStyler = styler(jokeBox);
const buttonStyler = styler(button);

function animateJoke() {
  // Dramatic entrance (like a strike)
  tween({
    from: { opacity: 0, y: 80 },
    to: { opacity: 1, y: 0 },
    duration: 500
  }).start(v => boxStyler.set(v));

  // Impact bounce
  spring({
    from: 0.7,
    to: 1,
    stiffness: 250,
    damping: 12
  }).start(scale => boxStyler.set({ scale }));

  // Quick rotation strike
  keyframes({
    values: [0, -10, 8, -4, 2, 0],
    duration: 400
  }).start(rotate => boxStyler.set({ rotate }));
}

button.addEventListener('click', () => {
  // Punch animation
  spring({
    from: 1,
    to: 1.3,
    stiffness: 400,
    damping: 8
  }).start({
    update: scale => buttonStyler.set({ scale }),
    complete: () => {
      tween({ from: 1.3, to: 1, duration: 150 })
        .start(scale => buttonStyler.set({ scale }));
    }
  });

  getJoke();
});

async function getJoke() {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();

    // Add dramatic delay like "charging power"
    jokeBox.innerText = "...channeling Chuck Norris energy...";

    setTimeout(() => {
      jokeBox.innerText = data.value;
      animateJoke();
    }, 400);

  } catch (error) {
    jokeBox.innerText = 'Even Chuck Norris couldn\'t fetch that joke.';
  }
}