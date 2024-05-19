import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";
import { Camera } from "@mediapipe/camera_utils";
import { Holistic, Results } from "@mediapipe/holistic";
import StartImage from "./start_image.png";

import ProjectsHeader from "../../Header/ProjectsHeader";
import Header from "../../Header/Header";
import { GRID1 } from "./gridStates";

interface GridNode {
  x: number;
  y: number;
}

const WebcamGame: React.FC = () => {
  const [fingerLocations, setFingerLocations] = useState<
    { x: number; y: number }[]
  >([]);

  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [gridState, setGridState] = useState<number>(0);

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startImage = useMemo(() => {
    const startImage = new Image();
    startImage.src = StartImage;
    return startImage;
  }, []);

  const addFingerLocation = (results: Results) => {
    if (!results.rightHandLandmarks) return;
    const indexTip = results.rightHandLandmarks[8];
    if (!indexTip) return;
    setFingerLocations((prev) => {
      return [...prev, indexTip];
    });
  };

  useEffect(() => {
    // console.log(fingerLocations);
  }, [fingerLocations]);

  const isFingerTouching = (
    indexTip: { x: number; y: number },
    canvasElement: HTMLCanvasElement
  ) => {
    const maxX = 50;
    const maxY = canvasElement.height - (canvasElement.height - 50);
    const fingerX = indexTip.x * canvasElement.width;
    const fingerY = indexTip.y * canvasElement.height;

    return fingerY <= maxY && fingerX <= maxX;
  };

  const traceFingerLocation = useCallback(
    (
      results: Results,
      canvasElement: HTMLCanvasElement,
      canvasCtx: CanvasRenderingContext2D
    ) => {
      if (!results.rightHandLandmarks) return;
      const indexTip = results.rightHandLandmarks[8];
      let color = isFingerTouching(indexTip, canvasElement);

      canvasCtx.fillStyle = "green"; // Color for the index finger tip

      canvasCtx.beginPath();
      canvasCtx.arc(
        indexTip.x * canvasElement.width,
        indexTip.y * canvasElement.height,
        5,
        0,
        2 * Math.PI
      );
      canvasCtx.fillStyle = "green"; // Color for the index finger tip
      canvasCtx.fill();

      return color;
    },
    []
  );

  const displayGrid = useCallback(
    (canvasCtx: CanvasRenderingContext2D, canvasElement: HTMLCanvasElement) => {
      const gridSize = 10;
      const newNodes: GridNode[] = [];

      // Draw grid lines and fill random squares
      canvasCtx.strokeStyle = "black";
      canvasCtx.lineWidth = 2;
      let i = 0;
      for (let y = 0; y < canvasElement.height; y += gridSize) {
        for (let x = 0; x < canvasElement.width; x += gridSize) {
          //   canvasCtx.beginPath();
          //   canvasCtx.moveTo(x, 0);
          //   canvasCtx.lineTo(x, canvasElement.height);
          //   canvasCtx.stroke();

          //   canvasCtx.beginPath();
          //   canvasCtx.moveTo(0, y);
          //   canvasCtx.lineTo(canvasElement.width, y);
          //   canvasCtx.stroke();

          // Randomly fill the square with a 50% chance
          if (GRID1[i] > 0.5) {
            canvasCtx.fillStyle = "#8e918f"; // Semi-transparent blue color
            canvasCtx.fillRect(x, y, gridSize, gridSize);
          } else {
            // Add a node in the center of the non-filled square
            newNodes.push({ x: x + gridSize / 2, y: y + gridSize / 2 });
          }
          i += 1;
        }
      }
      // Set the new nodes to the state
      //   drawNodes(canvasCtx, newNodes);
    },
    []
  );

  const drawNodes = (
    canvasCtx: CanvasRenderingContext2D,
    nodes: GridNode[]
  ) => {
    canvasCtx.fillStyle = "red"; // Color for the nodes
    nodes.forEach((node) => {
      canvasCtx.beginPath();
      canvasCtx.arc(node.x, node.y, 5, 0, 2 * Math.PI);
      canvasCtx.fill();
    });
  };

  const onResults = useCallback(
    (results: Results) => {
      if (!webcamRef.current?.video || !canvasRef.current) return;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext("2d");
      if (canvasCtx == null) throw new Error("Could not get context");
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      // Only overwrite existing pixels.
      canvasCtx.globalCompositeOperation = "source-in";
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = "destination-atop";
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      canvasCtx.globalCompositeOperation = "source-over";
      if (!isGameStarted) {
        canvasCtx.drawImage(startImage, 0, 0, 50, 50);
      }
      canvasCtx.beginPath();

      const isFingerOnStart = traceFingerLocation(
        results,
        canvasElement,
        canvasCtx
      );

      if (isFingerOnStart && !isGameStarted) {
        setIsGameStarted(true);
      }

      if (isGameStarted) {
        addFingerLocation(results);
        displayGrid(canvasCtx, canvasElement);
      }

      canvasCtx.restore();
    },
    [
      displayGrid,
      isGameStarted,
      setIsGameStarted,
      startImage,
      traceFingerLocation,
    ]
  );

  useEffect(() => {
    const holistic = new Holistic({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });
    holistic.setOptions({
      selfieMode: true,
      modelComplexity: 2,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    holistic.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      if (!webcamRef.current?.video) return;
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          if (!webcamRef.current?.video) return;
          await holistic.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, [onResults]);

  return (
    <div className="App">
      <Header />
      <ProjectsHeader />
      <main>
        <div id="BasicBoard">
          <Webcam
            ref={webcamRef}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 9,
              width: 1200,
              height: 800,
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 9,
              width: 1200,
              height: 800,
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default WebcamGame;
