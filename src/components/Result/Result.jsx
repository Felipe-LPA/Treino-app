/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './Result.css';

export default function Result(props) {
  const {
    name,
    timeFormat,
    dataTraining,
    restSpended,
    isEmptyTraining,
    isEmptyRest,
  } = props;

  /* função para realizar a conta e mostrar o tempo real despendido com o treino
  e os descansos. */
  const showTotalTimeSpended = () => {
    let TimeSpendedTraining = 0;
    let TimeSpendedRest = 0;
    if (dataTraining) {
      TimeSpendedTraining = dataTraining
        .map((data) => data.time)
        .reduce((data, cc) => cc + data, 0);
    }
    if (restSpended) TimeSpendedRest = restSpended.reduce((data, cc) => cc + data, 0);
    return TimeSpendedTraining + TimeSpendedRest;
  };
  /* funçã]o para resetar o app e voltar para a tela inicial com seus estados iniciais */
  const reset = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className="Result">
      {isEmptyTraining && (
        <h1>Nenhum treino realizado</h1>
      )}
      {!isEmptyTraining && (
        <div id="successResult">
          <h1>{name}</h1>
          <h1>
            Tempo Total do Treino:
            {' '}
            {timeFormat(showTotalTimeSpended())}
          </h1>
          {!isEmptyRest && (
          <h2>
            Tempo Total de descanso:
            {' '}
            {timeFormat(
              restSpended.reduce((cc, item) => cc + item), 0,
            )}
          </h2>
          )}
          <br />
          <ul>
            {dataTraining.map((item) => (
              <li key={item.key}>
                <h2>
                  {`${item.name} `}
                  :
                  {` ${timeFormat(item.time)}`}
                </h2>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button type="button" onClick={reset}>
        Reiniciar
      </button>
    </div>
  );
}

Result.propTypes = {
  name: PropTypes.string.isRequired,
  dataTraining: PropTypes.array.isRequired,
  timeFormat: PropTypes.func.isRequired,
  restSpended: PropTypes.array,
  isEmptyTraining: PropTypes.bool.isRequired,
  isEmptyRest: PropTypes.bool.isRequired,
};

Result.defaultProps = {
  restSpended: undefined,
};
