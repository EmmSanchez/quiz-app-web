/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

export function CircleProgressBar({ targetPercentage }) {
  const [percentage, setPercentage] = useState(0); // Inicializamos en 0%
  const radius = 85;
  const circleWidth = '200';
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  useEffect(() => {
    let start = 0;
    const increment = 1;

    const interval = setInterval(() => {
      start += increment;
      if (start >= targetPercentage) {
        start = targetPercentage;
        clearInterval(interval);
      }
      setPercentage(start);
    }, 10);

    return () => clearInterval(interval);
  }, [targetPercentage]);

  const [startColor, endColor] =
    percentage <= 33
      ? ['#ff0000', '#ff6666']
      : percentage <= 70
        ? ['#ffff00', '#ffff99']
        : ['#00ff00', '#66ff66'];

  return (
    <div className="">
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <defs>
          <linearGradient id="gradient-id" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>

        {/* Círculo de fondo */}
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          className="fill-none stroke-[#09090b]"
        />

        {/* Círculo con gradiente y animación */}
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          className="fill-none"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            transition: 'stroke-dashoffset 0.1s ease',
          }}
          stroke="url(#gradient-id)"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />

        {/* Texto con el porcentaje */}
        <text
          x="50%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
          fill={endColor}
          className="text-5xl font-medium"
        >
          {Math.round(percentage)}%
        </text>
      </svg>
    </div>
  );
}
