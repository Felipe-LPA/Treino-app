/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import myExercises from '../../Files/treinos';
import './Training.css';

export default function Training(props) {
  const {
    start,
    setName,
    name,
    setSeriesCount,
    setDificult,
    setTraining,
    setTimer,
    dificult,
    seriesCount,
  } = props;
  /* função auxiliar deletar o gif do elemento html */
  const handleDeleteImage = () => {
    const divImg = document.querySelector('.imgExemple');
    divImg.innerHTML = '';
  };
  /* função auxiliar incluir o gif do elemento html */
  const showImage = (gif) => {
    const divImg = document.querySelector('.imgExemple');
    const img = document.createElement('img');
    img.src = `gifs/${gif}`;
    divImg.appendChild(img);
  };
  /* função para definir o estado de Name conforme o imput for atualizado */
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  /* função para definir o estado de seriesCount conforme o imput for atualizado */
  const handleInputSeries = (e) => {
    setSeriesCount(Number(e.target.value));
  };
  /* função para definir o estado de dificult conforme o imput for atualizado */
  const handleSelectDificult = (e) => {
    setDificult(e.target.value);
  };
  /* função auxiliar para verificar se o checkbox está selecionado, caso esteja retorna um obj
  com os atributos que correspondem com o treino selecionado */
  const isChecked = () => {
    /* seleção do elemento html que estão contidas as checkbox com opções de exercícios */
    const divCheckbox = document.querySelector('.formCheckbox');
    /* seleção de todos os imputs dentro da div */
    const inputs = divCheckbox.querySelectorAll('input');
    /* verificação de checkboxs selecionados */
    const arrayTraining = Array.from(inputs)
      .filter((item) => item.checked)
      .map((item) => ({
        videoLink: item.getAttribute('data-videolink'),
        name: item.id,
        records: {
          bestTime: '01:15',
          lastTime: '01:45',
          worstTime: '02:35',
        },
      }));
    const arrayWithRest = [];
    /* laço para incluir a repetição de exercícios conforme estado de seriesCount */
    for (let i = 1; i <= seriesCount; i += 1) {
      // eslint-disable-next-line no-restricted-syntax
      for (const arr of arrayTraining) {
        arrayWithRest.push(arr);
        /* incluir um descanso a cada exercício incluído */
        arrayWithRest.push({
          videoLink: '',
          name: 'Descanso',
          records: {
            bestTime: '',
            lastTime: '',
            worstTime: '',
          },
        });
      }
    }
    // pop para retirar o ultimo descanso do arrray
    arrayWithRest.pop();
    return arrayWithRest;
  };
  /* função auxiliar que recebe como parametro o array com os nomes dos exercícios
  selecionados e busca no arquivo de treinos seus tempos de execução complementares */
  const defineTimer = (arrayOfName) => {
    const partialTime = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const nameArr of arrayOfName) {
      partialTime.push(
        ...myExercises
          .filter((item) => item.name === nameArr)
          .map((item) => {
            /* condição para caso a dificuldaee esteja no tempo de execuço como a prancha */
            if (item.time > 0) return item.time;
            return item.howMuch[dificult];
          }),
      );
    }
    /* definição do tempo total com base no tempo parcial dos exercícios */
    const totalTime = partialTime.reduce((ac, time) => ac + Number(time), 0);
    return { partialTime, totalTime };
  };
  /* função que utiliza as funções auxiliares para determinar quais foram os exercícios
  selecionados com suas informações complementares conforme definido no arquivo trainos.js e
  define os estados Training e Time com estas informações. */
  const handleChangeExercises = () => {
    const inputsChecked = isChecked();
    const arrayElSelected = inputsChecked.map((item) => item.name);
    const timerChecked = defineTimer(arrayElSelected);
    setTraining(inputsChecked);
    setTimer({
      totalTime: timerChecked.totalTime,
      partialTime: timerChecked.partialTime,
    });
  };
  /* useEffect para realizar a atualização dos exercícios selecionados conforme é realizada
  a mundaça de dificuldade e de series. */
  useEffect(() => {
    handleChangeExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seriesCount, dificult]);

  return (
    <div className="App">
      <form onSubmit={start} className="container">
        <div className="formFields">
          <label htmlFor="name"> Nome: </label>
          <input
            required="required"
            type="text"
            id="name"
            onChange={handleChangeName}
            value={name}
          />
        </div>

        <br />

        <div className="formFields">
          <label htmlFor="level"> Series: </label>
          <ul className="formRadios">
            <li className="formRadio">
              <input
                defaultChecked
                id="um"
                onInput={handleInputSeries}
                type="radio"
                value="1"
                name="set"
              />
              {' '}
              <label htmlFor="um">1</label>
            </li>
            <li className="formRadio">
              <input
                id="dois"
                onInput={handleInputSeries}
                type="radio"
                value="2"
                name="set"
              />
              {' '}
              <label htmlFor="dois">2</label>
            </li>
            <li className="formRadio">
              <input
                id="tres"
                onInput={handleInputSeries}
                type="radio"
                value="3"
                name="set"
              />
              {' '}
              <label htmlFor="tres">3</label>
            </li>
            <li className="formRadio">
              <input
                id="quatro"
                onInput={handleInputSeries}
                type="radio"
                value="4"
                name="set"
              />
              {' '}
              <label htmlFor="quatro">4</label>
            </li>
            <li className="formRadio">
              <input
                id="cinco"
                onInput={handleInputSeries}
                type="radio"
                value="5"
                name="set"
              />
              {' '}
              <label htmlFor="cinco">5</label>
            </li>
          </ul>
        </div>

        <br />

        <div className="formFields">
          <label htmlFor="set"> Dificuldade: </label>
          <select type="text" id="set" onChange={handleSelectDificult}>
            <option data-rest="60" value="principiante">
              1 - (principiante)
            </option>
            <option data-rest="50" value="amador">
              2 - (amador)
            </option>
            <option data-rest="40" value="intermediario">
              3 - (intermediário)
            </option>
            <option data-rest="30" value="avancado">
              4 - (avançado)
            </option>
            <option data-rest="30" value="profissional">
              5 - (profissional)
            </option>
          </select>
        </div>

        <br />

        <div className="formFields">
          <label> Exercícios: </label>
          <div className="formCheckbox">
            <ul>
              {myExercises.map((item) => {
                /* map para exibição dos exercícios disponíveis para seleção, e excessão do descanso
                presente no arquivo myExercises */
                if (item.name === 'Descanso') return;
                // eslint-disable-next-line consistent-return
                return (
                  <li
                    key={item.name}
                    onMouseOut={handleDeleteImage}
                    onMouseOver={() => {
                      showImage(item.gif);
                    }}
                    onBlur={handleDeleteImage}
                    onFocus={() => {
                      showImage(item.gif);
                    }}
                  >
                    <input
                      onInput={handleChangeExercises}
                      type="checkbox"
                      id={item.name}
                      data-videolink={item.videoLink}
                    />
                    <label htmlFor={item.name}>{item.name}</label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <br />

        <div className="imgExemple" />

        <br />

        <button type="submit" id="send">
          Começar
        </button>
      </form>
    </div>
  );
}

Training.propTypes = {
  start: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setSeriesCount: PropTypes.func.isRequired,
  setDificult: PropTypes.func.isRequired,
  setTraining: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
  dificult: PropTypes.string.isRequired,
  seriesCount: PropTypes.number.isRequired,
};
