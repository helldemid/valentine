import React, { useState } from 'react';
import mainGif from '../src/media/cute.gif';
import noGif from '../src/media/fight.gif';
import kiss from '../src/media/kiss.gif';

const titles = {
  main: "Ти будеш моєю Валентинкою?",
  no: "Альо, ти що там задумала?",
  yes: "Ти моя бусінка🥰"
}

function getRandomPosition() {
  const maxX = window.innerWidth - 50;
  const maxY = window.innerHeight - 50;

  return { left: Math.floor(Math.random() * (maxX + 1)), top: Math.floor(Math.random() * (maxY + 1)) };
}

function Buttons({ onNoClick, onYesClick, onNoEntered, isVisible }) {
  return (
    <div className='main-buttons' style={{ display: isVisible ? 'flex' : 'none' }}>
      <button id='no' onClick={onNoClick} onMouseEnter={onNoEntered}>Ні</button>
      <button id='yes' onClick={onYesClick}>Так!</button>
    </div>
  )
}

function App() {

  const [currentTitle, setCurrentTitle] = useState(titles.main);
  const [currentGif, setCurrentGif] = useState(mainGif);
  const [isVisible, setVisibility] = useState(true);
  const [isVisibleButtons, setVisibilityOfButtons] = useState(true);
  const [isNoButtonClicked, setIsNoButtonClicked] = useState(false);

  const moveButton = () => {
    const elem = document.getElementById("no");
    elem.style.position = 'absolute';
    elem.style.left = `${getRandomPosition().left}px`;
    elem.style.top = `${getRandomPosition().top}px`;
  }

  const handleNoClick = () => {
    setCurrentTitle(titles.no);
    setCurrentGif(noGif);
    setVisibility(false);
    if(!isNoButtonClicked) {
      setIsNoButtonClicked(true);
      moveButton()
    } else {
      moveButton()
    }
  }

  const handleYesClick = () => {
    setCurrentTitle(titles.yes);
    setCurrentGif(kiss);
    setVisibility(false);
    setVisibilityOfButtons(false);
  }

  const handleNoEntered = () => {
    if (isNoButtonClicked) {
      moveButton();
    }
  }

  return (
    <section className="main">
      <img className="main-gif" src={currentGif} alt="Щось пішло не так(" />
      <h1 style={{ display: isVisible ? 'block' : 'none' }}>Привіт, красуня!</h1>
      <p>{currentTitle}</p>
      <Buttons onNoClick={handleNoClick} onYesClick={handleYesClick} onNoEntered={handleNoEntered} isVisible={isVisibleButtons}></Buttons>
    </section>
  );
}

export default App;
