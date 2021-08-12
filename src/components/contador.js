window.addEventListener('load', () => {
  // Tempo, em segundos, que queremos.
  let sec = 20;
  const secFix = sec;

  const countDiv = document.querySelector('#timer');

  const secPass = () => {
    let min = Math.floor(sec / 60);
    let segundosRestantes = sec % 60;

    if (segundosRestantes < 10) segundosRestantes = `0${segundosRestantes}`;

    if (min < 10) min = `0${min}`;

    if (sec >= (secFix / 3) * 2) countDiv.classList = 'timer-full';
    else if (sec >= secFix / 3) countDiv.classList = 'timer-mid';
    else if (sec <= secFix / 3) countDiv.classList = 'timer-end';

    if (sec > 0) {
      countDiv.innerHTML = `${min}:${segundosRestantes}`;
      sec -= 1;
    } else {
      countDiv.innerHTML = 'Acabou!';
      // eslint-disable-next-line no-use-before-define
      clearInterval(countdowm);
    }
  };
  const countdowm = setInterval(secPass, 1000);
});
