import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    let wordRandom = randomWord();
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: wordRandom, isWinner: false };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    let keyVal = 0;
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={keyVal += 1}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  handleRestart() {
    let wordRandom = randomWord();
    this.setState({
      nWrong: 0, 
      guessed: new Set(), 
      answer: wordRandom, 
      isWinner: false
    });
  }

  isLoser() {
    if(this.state.nWrong === this.props.maxWrong) {
      return true;
    }
    return false;
  }

  isWinner() {
    if(this.guessedWord().join("") === this.state.answer) {
      return true;
    }
    return false;
  }

  /** render: render game */
  render() {
    // const renderBtnArea = () => {
    //   if(this.isLoser()) {
    //     return "You Lose!"

    //   } else if(this.isWinner()) {
    //     return "You Win!"

    //   } else {
    //     return this.generateButtons()

    //   }
    // }

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img 
          src={this.props.images[this.state.nWrong]} 
          alt={`${this.state.nWrong}/${this.props.maxWrong}`}
        />
        <p className='Hangman-guesses'>{`Number Wrong: ${this.state.nWrong} out 
        of ${this.props.maxWrong}`}</p>
        <p className='Hangman-word'>
          {!this.isLoser()
            ? this.guessedWord()
            : this.state.answer
          }
        </p>

        <p className='Hangman-btns'>
          {this.isLoser()
            ? "You Lose!"
            : this.generateButtons()
          }
          {this.isWinner() && "You Win!"}
          {/* {renderBtnArea()} */}
        </p>

        <button 
          id='restartBtn'
          onClick={this.handleRestart}
        >
          Restart
        </button>        
      </div>
    );
  }
}

export default Hangman;
