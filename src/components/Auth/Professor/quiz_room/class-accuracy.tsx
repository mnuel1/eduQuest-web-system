import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ClassAccuracyProps {
  accuracy: number;
  noHeader?: boolean;
  height?: number;
  bgColor?: string;
}

const ClassAccuracy: React.FC<ClassAccuracyProps> = ({
  accuracy,
  noHeader = false,
  height = 12,
  bgColor = "bg-gray-700",
}) => {
  const [prevAccuracy, setPrevAccuracy] = useState(accuracy);

  useEffect(() => {
    setPrevAccuracy(accuracy);
  }, [accuracy]);

  const accuracyChanged = prevAccuracy !== accuracy;

  return (
    <div className="mb-4 flex w-full flex-col items-center justify-center">
      {!noHeader && (
        <div className="mb-2 text-xl font-bold">Class Accuracy</div>
      )}
      <div className={`relative h-${height} w-full`}>
        {/* Background bar */}
        <div className={`absolute h-full w-full rounded ${bgColor}`}></div>

        {/* Accuracy fill */}
        <motion.div
          className="absolute h-full rounded bg-green-500"
          initial={{ width: `${prevAccuracy}%` }}
          animate={{ width: `${accuracy}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>

        {/* Pixelated box with accuracy */}
        <motion.div
          className="absolute top-1/2 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-sm border-4 border-yellow-400 bg-white text-xs font-bold text-black"
          initial={{ left: `calc(${prevAccuracy}% - 20px)` }}
          animate={{ left: `calc(${accuracy}% - 20px)` }}
          transition={{ duration: 0.5 }}
          style={{
            imageRendering: "pixelated",
            boxShadow: "0 0 0 2px #000",
          }}
        >
          <motion.span
            animate={{
              scale: accuracyChanged ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {accuracy.toFixed(0)}%
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default ClassAccuracy;
