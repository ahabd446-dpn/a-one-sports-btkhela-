import { useState, useEffect } from "react";
import { Joyride, Step, EventData as CallBackProps, STATUS } from "react-joyride";

interface TourGuideProps {
  steps: Step[];
  tourKey: string;
}

export function TourGuide({ steps, tourKey }: TourGuideProps) {
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Check if the user has seen this tour before
    const hasSeenTour = localStorage.getItem(`tour_completed_${tourKey}`);
    if (!hasSeenTour) {
      // Small delay to ensure elements are rendered
      const timer = setTimeout(() => {
        setRun(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [tourKey]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem(`tour_completed_${tourKey}`, "true");
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: "#a3e635", // Primary theme color
          textColor: "#fff",
          backgroundColor: "#111",
          arrowColor: "#111",
          overlayColor: "rgba(0, 0, 0, 0.7)",
        },
        buttonNext: {
          backgroundColor: "#a3e635",
          color: "#000",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontSize: "10px",
          borderRadius: "8px",
          padding: "10px 16px",
        },
        buttonBack: {
          color: "#aaa",
          marginRight: "10px",
          fontSize: "12px",
        },
        buttonSkip: {
          color: "#aaa",
          fontSize: "12px",
        },
        tooltip: {
          borderRadius: "16px",
          border: "1px solid #1f1f1f",
          fontFamily: "'Inter', sans-serif",
        },
        tooltipContainer: {
          textAlign: "left",
        },
        tooltipTitle: {
          fontWeight: "900",
          fontSize: "16px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "8px",
          color: "#a3e635",
        },
        tooltipContent: {
          fontSize: "13px",
          color: "#ccc",
          lineHeight: "1.5",
        }
      }}
    />
  );
}
