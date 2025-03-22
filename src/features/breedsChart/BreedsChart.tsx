import ResponsivePieChart from "./components/ResponsivePieChart/ResponsivePieChart"
import Card from "../../components/Card/Card"
import useBreedsChart from "./hooks/useBreedsChart"

const BreedsChart = () => {
  const { renderTitle, breedImagesPercent } = useBreedsChart()

  return <Card renderTitle={renderTitle}>
      <ResponsivePieChart data={ breedImagesPercent } />
    </Card>
}

export default BreedsChart