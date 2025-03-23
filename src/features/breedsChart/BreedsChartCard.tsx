import ResponsivePieChart from "./components/ResponsivePieChart/ResponsivePieChart"
import Card from "../../components/Card/Card"
import useBreedsChartCard from "./hooks/useBreedsChartCard"

const BreedsChartCard = () => {
  const { renderTitle, breedImagesPercent } = useBreedsChartCard()

  return <Card renderTitle={renderTitle}>
      <ResponsivePieChart data={ breedImagesPercent } />
    </Card>
}

export default BreedsChartCard