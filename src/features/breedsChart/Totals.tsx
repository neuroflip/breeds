import Card from "../../components/Card/Card"
import { useAppSelector } from "../../store/store"
import { selectTotalBreedsAmount, selectTotalImagesAmount } from "./slices/selectors"

const renderTitle = () => <h1>Totals</h1>

const Totals = () => {
    const totalBreeds = useAppSelector(selectTotalBreedsAmount)
    const totalImages = useAppSelector(selectTotalImagesAmount)

    return <Card renderTitle={ renderTitle } customErrorMessage="No data available">
            <p>Total Breeds: { totalBreeds }</p>
            <p>Total Images: { totalImages }</p>
        </Card>
}

export default Totals