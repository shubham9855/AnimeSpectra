import React, { useState, useEffect, useRef } from "react";
import "./Game.css";
import running1 from "../../images/running(1).png";
import running2 from "../../images/running(2).png";
import running3 from "../../images/running(3).png";
import jumping from "../../images/jumping.png";
import ducking from "../../images/ducking.png";
import bird from "../../images/bird.png";
import tree from "../../images/tree.png";

export const Game = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [isDucking, setIsDucking] = useState(false);
  const [score, setScore] = useState(0);
  const [obstaclePosition, setObstaclePosition] = useState(0);
  const [isBird, setIsBird] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const characterRef = useRef(null);

  const runningImages = [running1, running2, running3];
  const [currentRunningImage, setCurrentRunningImage] = useState(running1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGameRunning) {
        if (e.key === "ArrowUp" && !isJumping && !isDucking) {
          jump();
        } else if (e.key === "ArrowDown" && !isDucking && !isJumping) {
          duck();
        }
      }
    };

    const handleSwipeStart = (e) => {
      if (isGameRunning) {
        e.changedTouches[0].startY = e.changedTouches[0].clientY;
      }
    };

    const handleSwipeEnd = (e) => {
      if (isGameRunning) {
        const touch = e.changedTouches[0];
        const swipeDirection = touch.clientY - touch.startY;
        if (swipeDirection < -50 && !isJumping && !isDucking) {
          jump();
        } else if (swipeDirection > 50 && !isDucking && !isJumping) {
          duck();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleSwipeStart);
    window.addEventListener("touchend", handleSwipeEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleSwipeStart);
      window.removeEventListener("touchend", handleSwipeEnd);
    };
  }, [isJumping, isDucking, isGameRunning]);

  useEffect(() => {
    let gameInterval;
    if (isGameRunning) {
      gameInterval = setInterval(() => {
        if (score >= 0 && score <= 300)
          setObstaclePosition((prev) =>
            prev < 100 ? prev + 2 : resetObstacle()
          );
        else if (score > 300 && score <= 600)
          setObstaclePosition((prev) =>
            prev < 100 ? prev + 4 : resetObstacle()
          );
        else if (score > 600 && score <= 900)
          setObstaclePosition((prev) =>
            prev < 100 ? prev + 6 : resetObstacle()
          );
        else if (score > 900 && score <= 1200)
          setObstaclePosition((prev) =>
            prev < 100 ? prev + 8 : resetObstacle()
          );
        else
          setObstaclePosition((prev) =>
            prev < 100 ? prev + 12 : resetObstacle()
          );

        setScore((prev) => prev + 1);

        if (obstaclePosition === 72) {
          if ((isBird && !isDucking) || (isBird && isJumping)) {
            endGame();
          } else if (!isBird && !isJumping) {
            endGame();
          }
        }

        // Change running image
        if (!isJumping && !isDucking) {
          setCurrentRunningImage((prev) => {
            const currentIndex = runningImages.indexOf(prev);
            const nextIndex = (currentIndex + 1) % runningImages.length;
            return runningImages[nextIndex];
          });
        }
      }, 50);
    }

    return () => {
      clearInterval(gameInterval);
    };
  }, [isGameRunning, score, isJumping, isDucking, obstaclePosition, isBird]);

  const jump = () => {
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 500);
  };

  const duck = () => {
    setIsDucking(true);
    setTimeout(() => {
      setIsDucking(false);
    }, 500);
  };

  const resetObstacle = () => {
    setIsBird(Math.random() < 0.4);
    setObstaclePosition(0);
    return 100;
  };

  const endGame = () => {
    alert("Game Over!");
    setIsGameRunning(false);
    setScore(0);
    setObstaclePosition(0);
    setIsBird(false);
  };

  const startGame = () => {
    setIsGameRunning(true);
    setScore(0);
    setObstaclePosition(0);
    setIsBird(false);
  };

  return (
    <div className="game-container">
      <div className="score">
        Score: {score}
        {!isGameRunning && (
          <button onClick={startGame} className="start-button">
            Start Game
          </button>
        )}
      </div>
      {isGameRunning && (
        <>
          <img
            ref={characterRef}
            className={`character ${isJumping ? "jump" : ""} ${
              isDucking ? "duck" : ""
            }`}
            src={
              isJumping ? jumping : isDucking ? ducking : currentRunningImage
            }
            alt="character"
          />
          <img
            className={`obstacle ${isBird ? "bird" : ""}`}
            src={isBird ? bird : tree}
            alt="obstacle"
            style={{ right: `${obstaclePosition}%` }}
          />
        </>
      )}
    </div>
  );
};

export default Game;
