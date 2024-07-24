export const themes = {
    dark: {
        primary: 'bg-neutral-800',
        secondary: 'bg-neutral-700',
        neutral: 'bg-neutral-800',
        neutralSecondary: 'bg-neutral-700',
    },
    light: {
        primary: 'bg-neutral-200',
        secondary: 'bg-neutral-300',
        neutral: 'bg-neutral-100',
        neutralSecondary: 'bg-neutral-200',
    },
    system: {
        primary: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'bg-neutral-800' : 'bg-neutral-100',
        secondary: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'bg-neutral-700' : 'bg-neutral-200',
        neutral: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'bg-neutral-800' : 'bg-neutral-100',
        neutralSecondary: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'bg-neutral-700' : 'bg-neutral-200',
    }
}