
import { selectError, selectIsLoading } from '../../features/breedsChart/slices/selectors';
import { useAppSelector } from '../../store/store';
import ErrorBox from '../ErrorBox/ErrorBox';
import LoadingSpinner from '../LoadingSpinner/LodingSpinner';
import styles from './card.module.css';

type CardProps = {
    children: React.ReactNode,
    renderTitle?: () => React.ReactNode,
    customErrorMessage?: string
}

const Card = ({ children, renderTitle, customErrorMessage }: CardProps) => {
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectError)

    return <div className={styles.card}>
        { renderTitle && renderTitle() }
        { isLoading ? <LoadingSpinner /> :
            error ? <ErrorBox errorMessage={ customErrorMessage ? customErrorMessage : error } /> :
                children }
    </div>
}

export default Card