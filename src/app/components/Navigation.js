// src/app/components/Navigation.js
export default function Navigation({ currentStage, totalStages, nextStage, prevStage }) {
    return (
      <div className="navigation">
        {currentStage > 1 && (
          <button onClick={prevStage} className="btn-secondary">Back</button>
        )}
        {currentStage < totalStages && (
          <button onClick={nextStage} className="btn-primary">Next</button>
        )}
      </div>
    );
  }
  