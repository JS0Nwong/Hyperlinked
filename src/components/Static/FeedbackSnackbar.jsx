import { useBoundStore } from '../../utils/storeBinder'

export default function FeedbackSnackbar() {
    const { snackbarMessage, setSnackbar } = useBoundStore()

    return (
        <div>
            {snackbarMessage}
        </div>
    )
}
