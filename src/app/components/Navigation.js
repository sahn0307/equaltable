// src/app/components/Navigation.js
export default function Navigation({ currentStage, totalStages, nextStage, prevStage }) {
    return (
      <div className="navigation flex justify-between items-center mt-8">
        {currentStage > 1 && (
          <button 
            onClick={prevStage} 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        )}
        {currentStage < totalStages && (
          <button 
            onClick={nextStage} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-auto"
          >
            Next
          </button>
        )}
      </div>
    );
  }
  