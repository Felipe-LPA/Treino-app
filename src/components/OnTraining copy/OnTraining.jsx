/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './OnTraining.css';

export default function OnTraining(props) {
  const {
    training,
    next,
    currentTotalTime,
    currentPartialTime,
    countPartialTimer,
    setIsRunning,
    isRunning,
    itsOver,
    timeFormat,
  } = props;
  /* função utilizada no botão playAndPause para dar play e pause no cronômetro */
  const playAndPause = () => {
    document.getElementById('playAndPause').blur();
    if (isRunning === true) setIsRunning(false);
    else if (isRunning === false) setIsRunning(true);
  };
  return (
    <div className="onTraining">
      <div className="totalTimer" id="totalTimer">
        <span>Tempo total: </span>
        {timeFormat(currentTotalTime)}
      </div>
      <h1>{training[countPartialTimer].name}</h1>
      <div className="partialTimer" id="partialTimer">
        {timeFormat(currentPartialTime)}
      </div>
      {/* <div className="records">
        <div>
          <span>Último Tempo: </span>
          {training[countPartialTimer].records.lastTime}
        </div>
        <div>
          <span>Melhor Tempo: </span>
          {training[countPartialTimer].records.bestTime}
        </div>
        <div>
          <span>Pior Tempo: </span>
          {training[countPartialTimer].records.worstTime}
        </div>
      </div> */}
      <br />
      <button type="button" id="next" onClick={next}>
        Próximo
      </button>
      <button type="button" id="playAndPause" onClick={playAndPause}>
        {isRunning ? 'Pausar' : 'Continuar'}
      </button>
      <button type="button" id="itsOver" onClick={itsOver}>Encerrar</button>
    </div>
  );
}

OnTraining.propTypes = {
  training: PropTypes.array.isRequired,
  next: PropTypes.func.isRequired,
  currentTotalTime: PropTypes.number.isRequired,
  currentPartialTime: PropTypes.number.isRequired,
  countPartialTimer: PropTypes.number.isRequired,
  setIsRunning: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  itsOver: PropTypes.func.isRequired,
  timeFormat: PropTypes.func.isRequired,
};
