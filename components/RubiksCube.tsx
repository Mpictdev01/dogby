"use client";

import React from "react";
import Image from "next/image";

const RubiksCube = () => {
  // Finalized settings
  const scale = 1.4;
  const x = -20;
  const y = 0;

  const images = [
    "/meme/images_1.avif", // Front
    "/meme/images_2.avif", // Back
    "/meme/images_3.avif", // Left
    "/meme/images_4.avif", // Right
    "/meme/images_5.avif", // Top
    "/meme/images_6.avif", // Bottom
  ];

  const faces = ["front", "back", "left", "right", "top", "bottom"];

  return (
    <div className="relative py-20 flex justify-center items-center w-full">
      <div 
        className="my-loader"
        style={{
            transform: `scale(${scale}) translate(${x}px, ${y}px)`
        }}
      >
        <div className="rubiks-cube">
          {faces.map((face, index) => (
            <div key={face} className={`face ${face}`}>
                <div className="relative w-full h-full border border-black bg-white">
                    <Image 
                        src={images[index]} 
                        alt={`Meme ${index + 1}`} 
                        fill 
                        className="object-cover" 
                    />
                </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .my-loader {
          width: 200px;
          height: 200px;
          perspective: 1000px;
          margin: 0 auto;
        }

        .rubiks-cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: my-rotateCube 10s infinite linear;
        }

        .face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }

        .face.front { transform: translateZ(100px); }
        .face.back { transform: rotateY(180deg) translateZ(100px); }
        .face.left { transform: rotateY(-90deg) translateZ(100px); }
        .face.right { transform: rotateY(90deg) translateZ(100px); }
        .face.top { transform: rotateX(90deg) translateZ(100px); }
        .face.bottom { transform: rotateX(-90deg) translateZ(100px); }

        @keyframes my-rotateCube {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default RubiksCube;
