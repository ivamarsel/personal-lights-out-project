import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

    static defaultProps = {
        nRows: 5,
        nCols: 5,
        chanceLightStartsOn: 0.25
    }

    constructor(props) {
        super(props);
        this.state = {
            hasWon: false,
            board: this.createBoard()
        }
        this.flipCellsAround = this.flipCellsAround.bind(this)

    }


    createBoard() {
        let board = []
        // we are looping over the nRows and nCols
        // each time of this loop we are making a row 
        for (let y = 0; y < this.props.nRows; y++) {
            let row = [];
            for (let x = 0; x < this.props.nCols; x++) {
                row.push(Math.random() < this.props.chanceLightStartsOn)
                // the result of the < is a Boolean that will be pushed into the empty row[]
            }
            board.push(row);
            // and then this individual row[] is pushed into the board []
        }
        return board
    }


    flipCellsAround(coord) {
        let { nCols, nRows } = this.props;
        let board = this.state.board;

        // '0-1222'.split('-') --> ['0', '1'].map(Number) --> [0, 1]
        // let [y, x] = [0, 1];
        let [y, x] = coord.split("-").map(Number);


        function flipCell(y, x) {
            // if this coord is actually on board, flip it

            if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
                board[y][x] = !board[y][x];
            }
        }


        // Flip iitial cell
        flipCell(y, x);

        flipCell(y, x - 1); //flip left

        flipCell(y, x + 1); // flip right

        flipCell(y - 1, x); //flip above

        flipCell(y + 1, x); // flip below


        // win when every cell is turned off
        // TODO: determine is the game has been won

        //We use .every() instead a For loop for the board nested arrays.
        //for each row we do another row.every and check that for each cell the value is !cell a.k.a (false)
        //every cell in every row should be false
        let hasWon = board.every(row => row.every(cell => !cell))

        this.setState({ board: board, hasWon: hasWon });
    }



    render() {

        if (this.state.hasWon) {
            return (
                <div className="Board-title">
                    <div className="winner">
                        <span className="neon-orange">You</span>
                        <span className="neon-blue">WIN!!!</span>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="Board-title">
                    <div className="neon-orange">Lights</div>
                    <div className="neon-blue">Out</div>
                </div>

                <table className="Board">
                    <tbody>
                        {this.state.board.map((tr, y) => (
                            <tr key={y}>
                                {tr.map((bool, x) => {
                                    const coord = `${y}-${x}`;
                                    return <Cell key={coord} flipCellsAroundMe={() => this.flipCellsAround(coord)} isLit={bool} />
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        )
        // if the game is won, just show a winning msg & render nothing else
    }
}
export default Board;

//REFACTORED RENDER 
/** Render game board or winning message. */
// makeTable() {
//     let tblBoard = [];
//     for (let y = 0; y < this.props.nrows; y++) {
//       let row = [];
//       for (let x = 0; x < this.props.ncols; x++) {
//         let coord = `${y}-${x}`;
//         row.push(
//           <Cell
//             key={coord}
//             isLit={this.state.board[y][x]}
//             flipCellsAroundMe={() => this.flipCellsAround(coord)}
//           />
//         );
//       }
//       tblBoard.push(<tr key={y}>{row}</tr>);
//     }
//     return (
//       <table className='Board'>
//         <tbody>{tblBoard}</tbody>
//       </table>
//     );
//   }
//   render() {
//     return (
//       <div>
//         {this.state.hasWon ? (
//           <div className='winner'>
//             <span className='neon-orange'>YOU</span>
//             <span className='neon-blue'>WIN!</span>
//           </div>
//         ) : (
//           <div>
//             <div className='Board-title'>
//               <div className='neon-orange'>Lights</div>
//               <div className='neon-blue'>Out</div>
//             </div>
//             {this.makeTable()}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default Board;


