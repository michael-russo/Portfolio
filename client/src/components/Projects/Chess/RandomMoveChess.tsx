import { useState } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";

type ChessMove = {
  from: string;
  to: string;
  promotion?: string;
};

export default function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess());

  const [fen, setFen] = useState(game.fen());

  function makeAMove(move: ChessMove) {
    const gameCopy = game;
    const result = gameCopy.move(move);
    setGame(gameCopy);
    setFen(gameCopy.fen());
    return result;
  }

  function makeRandomMove() {
    const possibleMoves = game.moves() as unknown as ChessMove[];
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return;
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare: any, targetSquare: any, piece: any) {
    const validMoves = game.moves({ square: sourceSquare as Square });

    let isValid = false;

    validMoves.forEach((move) => {
      if (move.includes(targetSquare)) {
        isValid = true;
      }
    });

    if (isValid) {
      const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      // illegal move
      if (move === null) return false;
      setTimeout(makeRandomMove, 500);
      return true;
    }

    return false;
  }

  return <Chessboard position={fen} onPieceDrop={onDrop} />;
}
