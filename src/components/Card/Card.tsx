
import { selectError, selectIsLoading } from '../../features/breedsChart/slices/selectors';
import { useAppSelector } from '../../store/hooks';
import ErrorBox from '../ErrorBox/ErrorBox';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './styles/card.module.css';

type CardProps = {
    children: React.ReactNode,
    renderTitle?: () => React.ReactNode,
    customErrorMessage?: string
}

const Card = ({ children, renderTitle, customErrorMessage }: CardProps) => {
    const isLoading = useAppSelector(selectIsLoading)
    const error = useAppSelector(selectError)

    return <article className={styles.card}>
        { renderTitle && renderTitle() }
        { isLoading ? <LoadingSpinner /> :
            error ? <ErrorBox errorMessage={ customErrorMessage ? customErrorMessage : error } /> :
                children }
    </article>
}

export default Card