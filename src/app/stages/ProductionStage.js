// src/app/stages/ProductionStage.js
export default function ProductionStage() {
    return (
      <div className="stage">
        <h2>Production Stage</h2>
        <p>Carbon emissions from farms per 1 kg of roasted beans:</p>
        <div className="static-value">
          <span>1.64 kg</span> {/* Static value displayed to the user */}
        </div>
        <p className="reference">
          Please enter the carbon emissions associated with 1 kg of coffee from your farm, or use the preset value.
        </p>
        <p className="reference">
          References: 
          <ul>
            <li>(2020) Life cycle assessment synthesis of the carbon footprint of Arabica coffee</li>
            <li>(2018) Environmental impact assessment...</li>
          </ul>
        </p>
      </div>
    );
  }
  