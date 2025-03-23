import Card from "../../components/Card/Card"
import { useAppSelector } from "../../store/hooks"
import { selectTotalBreedsAmount, selectTotalImagesAmount } from "./slices/selectors"

const renderTitle = () => <h1>Totals</h1>

const TotalsCard = () => {
    const totalBreeds = useAppSelector(selectTotalBreedsAmount)
    const totalImages = useAppSelector(selectTotalImagesAmount)

    return <Card renderTitle={ renderTitle } customErrorMessage="No data available">
            <p>Total Breeds: { totalBreeds }</p>
            <p>Total Images: { totalImages }</p>
        </Card>
}

export default TotalsCard