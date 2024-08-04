import { Toaster } from 'react-hot-toast';

export default function Toast() {
    return (
        <Toaster
            position="bottom-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                // Define default options
                className: 'bg-neutral-50 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 border border-neutral-100 dark:border-neutral-800 rounded-full text-sm font-medium shadow-sm ',
                duration: 3500,
            }}
        />
    );
}
