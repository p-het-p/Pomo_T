import { motion } from 'motion/react';

interface AnimatedClockFrameProps {
  isRunning: boolean;
  currentTime?: Date;
  showClock?: boolean;
}

export function AnimatedClockFrame({ isRunning, currentTime, showClock }: AnimatedClockFrameProps) {
  // Create 60 tick marks (like a clock)
  const tickMarks = Array.from({ length: 60 }, (_, i) => i);

  // Calculate initial rotation based on current second when showing clock
  const getInitialRotation = () => {
    if (showClock && currentTime) {
      const seconds = currentTime.getSeconds();
      const milliseconds = currentTime.getMilliseconds();
      return (seconds + milliseconds / 1000) * 6; // Smooth second hand position
    }
    return 0;
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative">
        {/* Stationary red tick under 12 o'clock position */}
        <svg
          width="500"
          height="500"
          viewBox="0 0 500 500"
          className="w-[240px] h-[240px] xs:w-[280px] xs:h-[280px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] absolute inset-0"
        >
          <line
            x1="250"
            y1="30"
            x2="250"
            y2="50"
            stroke="#ef4444"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Rotating clock frame */}
        <motion.div
          className="relative"
          initial={{ rotate: showClock ? getInitialRotation() : 0 }}
          animate={{ 
            rotate: showClock ? getInitialRotation() + 360 : (isRunning ? 360 : 0)
          }}
          transition={
            showClock 
              ? { 
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop"
                }
              : {
                  duration: 60,
                  repeat: isRunning ? Infinity : 0,
                  ease: "linear",
                  repeatType: "loop"
                }
          }
        >
          <svg
            width="500"
            height="500"
            viewBox="0 0 500 500"
            className="w-[240px] h-[240px] xs:w-[280px] xs:h-[280px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]"
          >
            {tickMarks.map((tick) => {
              const angle = (tick * 6 - 90) * (Math.PI / 180); // 6 degrees per tick, start from top
              const isMainTick = tick % 5 === 0; // Every 5th tick is longer (12 main divisions)
              const radius = 240;
              const tickLength = isMainTick ? 20 : 12;
              const tickWidth = isMainTick ? 3 : 2;
              
              const x1 = 250 + Math.cos(angle) * (radius - tickLength);
              const y1 = 250 + Math.sin(angle) * (radius - tickLength);
              const x2 = 250 + Math.cos(angle) * radius;
              const y2 = 250 + Math.sin(angle) * radius;

              return (
                <line
                  key={tick}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth={tickWidth}
                  strokeLinecap="round"
                  className="text-foreground/40"
                />
              );
            })}
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
