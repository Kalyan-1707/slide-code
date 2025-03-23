import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, HelpCircle, MousePointer, Move } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface InstructionsOverlayProps {
  isOpen?: boolean;
  onClose?: () => void;
  firstTime?: boolean;
}

const InstructionsOverlay = ({
  isOpen = true,
  onClose = () => {},
  firstTime = true,
}: InstructionsOverlayProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to SlideCode!",
      description:
        "Slide the tiles to arrange them in the winning sequence: 80136653",
      icon: <HelpCircle className="h-12 w-12 text-primary" />,
      content: (
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          <div className="grid grid-cols-3 gap-2 w-48 h-48 bg-slate-100 p-2 rounded-md">
            {[8, 0, 1, 3, 6, 6, 5, 3, null].map((num, index) => (
              <div
                key={index}
                className={`flex items-center justify-center w-14 h-14 rounded-md ${num === null ? "bg-transparent" : "bg-white shadow-md"}`}
              >
                {num !== null && (
                  <span className="text-2xl font-bold">{num}</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-center text-muted-foreground mt-4">
            This is the winning arrangement you need to achieve!
          </p>
        </div>
      ),
    },
    {
      title: "How to Play",
      description:
        "Move tiles by clicking or dragging them into the empty space",
      icon: <MousePointer className="h-12 w-12 text-primary" />,
      content: (
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          <motion.div
            className="grid grid-cols-3 gap-2 w-48 h-48 bg-slate-100 p-2 rounded-md relative"
            initial={{ opacity: 1 }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, null].map((num, index) => (
              <div
                key={index}
                className={`flex items-center justify-center w-14 h-14 rounded-md ${num === null ? "bg-transparent" : "bg-white shadow-md"}`}
              >
                {num !== null && (
                  <span className="text-2xl font-bold">{num}</span>
                )}
              </div>
            ))}
            <motion.div
              className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                x: [0, 20, 0],
                y: [0, 20, 0],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
              }}
            >
              <Move className="h-8 w-8 text-primary opacity-70" />
            </motion.div>
          </motion.div>
          <p className="text-sm text-center text-muted-foreground mt-4">
            Only tiles adjacent to the empty space can be moved.
          </p>
        </div>
      ),
    },
    {
      title: "Track Your Progress",
      description:
        "Challenge yourself to solve the puzzle with fewer moves and in less time",
      icon: <ArrowRight className="h-12 w-12 text-primary" />,
      content: (
        <div className="flex flex-col items-center justify-center space-y-6 py-6">
          <div className="flex space-x-8 items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">00:42</div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">24</div>
              <div className="text-sm text-muted-foreground">Moves</div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full max-w-xs">
            <div className="flex justify-between items-center">
              <span className="text-sm">Difficulty:</span>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Easy
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Medium
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  Hard
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="mb-4">{currentStepData.icon}</div>
          <DialogTitle className="text-xl">{currentStepData.title}</DialogTitle>
          <DialogDescription className="mt-1">
            {currentStepData.description}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gray-50 rounded-md">{currentStepData.content}</div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <div className="flex items-center space-x-1">
            {steps.map((_, index) => (
              <span
                key={index}
                className={`block w-2 h-2 rounded-full ${index === currentStep ? "bg-primary" : "bg-gray-300"}`}
              />
            ))}
          </div>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Start Playing" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionsOverlay;
