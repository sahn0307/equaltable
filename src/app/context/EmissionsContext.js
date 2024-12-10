'use client'
import { createContext, useContext, useState, useCallback } from 'react'

const EmissionsContext = createContext()

export const useEmissionsContext = () => useContext(EmissionsContext)

export const EmissionsProvider = ({ children }) => {
	const [productionData, setProductionData] = useState({
		monthlyCoffeeUsage: 0,
		carbonEmissionsPerKg: 0
	})

	const [transportData, setTransportData] = useState({
		farmToPortDistance: 0,
		portToDomesticDistance: 0,
		domesticDistance: 0,
		transportType: {
			farmToPort: 'truck',
			portToDomestic: 'ship',
			domestic: 'truck'
		}
	})

	const [processingData, setProcessingData] = useState({
		roasterType: 'electric',
		powerConsumption: 0,
		gasConsumption: 0,
		usageTime: 0,
		productionQuantity: 0,
		smokeEliminator: 'none'
	})

	const [extractionData, setExtractionData] = useState({
		grinderType: 'electric',
		powerConsumption: 0,
		usageTime: 0,
		productionQuantity: 0,
		extractorPower: 'no',
		extractorPowerConsumption: 0
	})

	const [disposalData, setDisposalData] = useState({
		wasteMass: 0,
		packagingType: 'LDPE',
		disposalMethod: 'landfill',
		isRecycled: 'no'
	})

      // Add methods for form state persistence
  const saveFormState = useCallback(() => {
    const formState = {
      productionData,
      transportData,
      processingData,
      extractionData,
      disposalData
    }
    sessionStorage.setItem('formState', JSON.stringify(formState))
  }, [productionData, transportData, processingData, extractionData, disposalData])

  const restoreFormState = useCallback(() => {
    const saved = sessionStorage.getItem('formState')
    if (saved) {
      const state = JSON.parse(saved)
      setProductionData(state.productionData)
      setTransportData(state.transportData)
      setProcessingData(state.processingData)
      setExtractionData(state.extractionData)
      setDisposalData(state.disposalData)
      sessionStorage.removeItem('formState')
    }
  }, [])

	return (
		<EmissionsContext.Provider
			value={{
				productionData,
				setProductionData,
				transportData,
				setTransportData,
				processingData,
				setProcessingData,
				extractionData,
				setExtractionData,
				disposalData,
                setDisposalData,
                saveFormState,
                restoreFormState
			}}>
			{children}
		</EmissionsContext.Provider>
	)
}
