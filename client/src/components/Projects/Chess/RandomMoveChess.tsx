import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

type ChessMove = {
  from: string;
  to: string;
  promotion: string;
};

export default function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess());

  const [fen, setFen] = useState(game.fen());

  function makeAMove(move: ChessMove) {
    const gameCopy = game;
    const result = gameCopy.move(move);
    setGame(gameCopy);
    setFen(gameCopy.fen());
    return result; // null if the move was illegal, the move object if the move was legal
  }

  useEffect(() => {
    console.log("New FEN:", fen);
  }, [fen]); // Dependency array

  function makeRandomMove() {
    const possibleMoves = game.moves() as unknown as ChessMove[];
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare: any, targetSquare: any) {
    // console.log("onDrop", sourceSquare, targetSquare);
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    setTimeout(makeRandomMove, 500);
    return true;
  }

  return <Chessboard position={fen} onPieceDrop={onDrop} />;
}
