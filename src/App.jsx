import React, { useEffect, useState } from 'react';
import './App.css';
import Training from './components/Training/Training';
import OnTraining from './components/OnTraining copy/OnTraining';
import Result from './components/Result/Result';
// Hook personalizado para utilização do setInterval no React
import useInterval from './components/useInterval';

function App() {
  // armazenar o tempo total e o tempo parcial dos exercícios selecionados.
  const [timer, setTimer] = useState({
    totalTime: '',
    partialTime: [],
  });
  // Armazenar os exercícios selecionados.
  const [training, setTraining] = useState([]);
  // Controlar a tela que está sendo exibida.
  const [screen, setScreen] = useState(0);
  // Nome do usuário.
  const [name, setName] = useState('');
  // armazenar a quantidade de series que vão ser realizadas.
  const [seriesCount, setSeriesCount] = useState(1);
  // armazenar a dificuldade escolhida(por padrão no DOM é principiante).
  const [dificult, setDificult] = useState('principiante');
  // armazenar em tempo real o tempo de execução do exercício.
  const [currentPartialTime, setCurrentPartialTime] = useState();
  const [currentTotalTime, setCurrentTotalTime] = useState();
  // determina se o contador está rodando.
  const [isRunning, setIsRunning] = useState(false);
  // determina se o tempo do exercicio foi excedido.
  const [exceededPartialTime, setExceededPartialTime] = useState(false);
  const [exceededTotalTime, setExceededTotalTime] = useState(false);
  // contador utilizado para determinar qual exercício/pausa está sendo realizado no momento
  const [countPartialTimer, setCountPartialTimer] = useState(0);
  // array para armazenar os dados pós realização do exercício como o nome e o tempo de execução/
  const [dataTraining, setDataTraining] = useState([]);
  const [restSpended, setRestSpended] = useState([]);
  const [isEmptyTraining, setIsEmptyTraining] = useState(true);
  const [isEmptyRest, setIsEmptyRest] = useState(true);

  // utilizado para permitir a utilização de espaço e enter para passar para o próximo exercício.
  useEffect(() => {
    if (screen === 1) {
      document.addEventListener('keypress', (e) => {
        if (e.code === 'Enter' || e.code === 'Space') {
          document.getElementById('next').click();
        }
      });
    }
  }, [screen]);

  // utilizado para lógica aplicada para o exercício realizado atualmente de acordo com o
  // contador definido acima ( countPartialTimer )
  useEffect(() => {
    // condicional para impedir que seja aplicada a lógica e suas funções antes do
    // usuário determinar quais exercícios serão realizados.
    if (training.length !== 0) {
      /* condicional para que seja feita a atribuição do tempo do exercício após o
      fim de sua execução, ou seja, quando o contador estiver no descanso, e para
      evitar que a lógica seja aplicada após todos os exercícios estiverem concluídos */
      if (
        countPartialTimer === timer.partialTime.length
        || training[countPartialTimer].name === 'Descanso'
      ) {
        const AuxDataTraining = [...dataTraining];
        /* condicionais para diferencial a lógica da contagem do tempo do exercício
        para quando o tempo tiver sido excedido ou não */
        if (!exceededPartialTime) {
          AuxDataTraining[AuxDataTraining.length - 1].time
            -= currentPartialTime;
        } else {
          AuxDataTraining[AuxDataTraining.length - 1].time
            += currentPartialTime;
        }
        setDataTraining(AuxDataTraining);
        /* mesmas lógicas dos condicionais acima porém para o descanso. */
      } else {
        const restAux = [...restSpended];
        if (!exceededPartialTime) {
          restAux[restAux.length - 1] -= currentPartialTime;
        } else {
          restAux[restAux.length - 1] += currentPartialTime;
        }
        setRestSpended(restAux);
      }
      /* condicional para que novamente não seja aplicada a lógica quando
      todos os exercícios estiverem concluídos. */
      if (countPartialTimer < timer.partialTime.length) {
        /* define os tempos iniciais do exercício atual */
        setCurrentPartialTime(timer.partialTime[countPartialTimer]);
        setExceededPartialTime(false);
        /* inclui no array datatraining o valor inicial para que seja apenas
        atualizado o tempo após a execução do exercício */
        if (training[countPartialTimer].name !== 'Descanso') {
          const AuxDataTraining = [...dataTraining];
          AuxDataTraining.push({
            name: training[countPartialTimer].name,
            time: timer.partialTime[countPartialTimer],
            key: countPartialTimer,
          });
          setDataTraining(AuxDataTraining);
          /* a mesma lógica porém para o descanso */
        } else {
          const restAux = [...restSpended];
          restAux.push(timer.partialTime[countPartialTimer]);
          setRestSpended(restAux);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countPartialTimer]);

  // função utilizada no botão de iniciar treino.
  const start = (e) => {
    e.preventDefault();
    // condição para que o treino só inicie se algum treino for selecionado
    if (training.length !== 0) {
      /* define o tempo iniciar para Current TotalTime e partialTime de acordo
      com os treinos selecionados pelo usuário */
      setCurrentTotalTime(timer.totalTime);
      setCurrentPartialTime(timer.partialTime[countPartialTimer]);
      /* define o primeiro treino para o array DataTraining  */
      setDataTraining([
        {
          name: training[countPartialTimer].name,
          time: timer.partialTime[countPartialTimer],
          key: countPartialTimer,
        },
      ]);
      /* realiza a mudança da tela para o componente onTraining */
      // eslint-disable-next-line no-unused-expressions
      setScreen(1);
      // inicia o relógio
      setIsRunning(true);
    }
  };
  const auxPopOut = (Spended, setSpended) => {
    const auxSpended = [...Spended];
    auxSpended.pop();
    setSpended(auxSpended);
  };
  /* função para retirar o exercício/descanso que foi interronpido pelo botão encerrar */
  const popOut = (partialTime) => {
    if (partialTime === 'Descanso') {
      auxPopOut(restSpended, setRestSpended);
    } else {
      auxPopOut(dataTraining, setDataTraining);
    }
  };
  // função utilizada no botão de encerrar treino.
  const itsOver = () => {
    document.getElementById('itsOver').blur();
    setIsRunning(false);
    popOut(training[countPartialTimer].name);
    /* mudança da tela para o componente Result */
    setScreen(2);
  };
  // função utilizada no botão de mudar para o próximo exercício.
  const next = () => {
    document.getElementById('next').blur();
    setCountPartialTimer(countPartialTimer + 1);
    // condição para determinar fim do treino conforme todos os exercícios forem finalizados
    if (countPartialTimer >= timer.partialTime.length - 1) {
      setIsRunning(false);
      setScreen(2);
    }
    // condição para verificar se pelo menos 1 exercício/descanso foi finalizado
    if (isEmptyTraining) setIsEmptyTraining(false);
    if (countPartialTimer > 0) if (isEmptyRest) setIsEmptyRest(false);
  };
  /* função para ser usado no cronômetro para decrementar o contador, definir o excesso de tempo
  e definir a classe do contador caso tenha sido excedido o tempo do exercício */
  const decreaseTimer = (
    currentTime,
    setCurrentTime,
    className,
    exceeded,
    setExceeded,
  ) => {
    const timerEl = document.querySelector(`#${className}`);
    if (currentTime > 0 && !exceeded) {
      timerEl.className = className;
      setCurrentTime(currentTime - 1);
    } else {
      if (exceeded === false) {
        timerEl.classList = `${timerEl.className} exceeded-time-${className}`;
      }
      setExceeded(true);
      setCurrentTime(currentTime + 1);
    }
  };
  /* função para ser usada no hook personalizado useInterval */
  const secPass = () => {
    // decrease para o totalTimer
    decreaseTimer(
      currentTotalTime,
      setCurrentTotalTime,
      'totalTimer',
      exceededTotalTime,
      setExceededTotalTime,
    );
    // decrease para o partialTimer
    decreaseTimer(
      currentPartialTime,
      setCurrentPartialTime,
      'partialTimer',
      exceededPartialTime,
      setExceededPartialTime,
    );
  };
  /* utilização do hook personalizado useInterval */
  useInterval(secPass, isRunning ? 1000 : null);

  /* função auxiliar para incluir um 0 na formatação do tempo caso o mesmo seja um número
        de 0 a 9 */
  const twoDigitsTime = (time) => {
    let auxTime = time;
    if (time < 10) {
      auxTime = `0${time}`;
    }
    return auxTime;
  };
  /* função para formatação do tempo exibido do cronômetro */
  const timeFormat = (sec) => {
    const min = Math.floor(sec / 60);
    const secFormated = twoDigitsTime(sec % 60);
    const minFormated = twoDigitsTime(min % 60);
    const hourFormated = twoDigitsTime(Math.floor(min / 60));

    return `${hourFormated}:${minFormated}:${secFormated}`;
  };

  return (
    <div>
      {screen === 0 && (
        <Training
          start={start}
          setName={setName}
          name={name}
          setSeriesCount={setSeriesCount}
          setDificult={setDificult}
          training={training}
          setTraining={setTraining}
          setTimer={setTimer}
          dificult={dificult}
          seriesCount={seriesCount}
        />
      )}

      {screen === 1 && (
        <OnTraining
          timer={timer}
          training={training}
          next={next}
          currentTotalTime={currentTotalTime}
          currentPartialTime={currentPartialTime}
          countPartialTimer={countPartialTimer}
          setIsRunning={setIsRunning}
          isRunning={isRunning}
          itsOver={itsOver}
          setDataTraining={setDataTraining}
          dataTraining={dataTraining}
          timeFormat={timeFormat}
        />
      )}
      {screen === 2 && (
        <Result
          name={name}
          totalTime={timer.totalTime}
          currentTotalTime={currentTotalTime}
          exceededTotalTime={exceededTotalTime}
          dataTraining={dataTraining}
          timeFormat={timeFormat}
          restSpended={restSpended}
          isEmptyTraining={isEmptyTraining}
          currentPartialTime={currentPartialTime}
          isEmptyRest={isEmptyRest}
        />
      )}
    </div>
  );
}

export default App;
