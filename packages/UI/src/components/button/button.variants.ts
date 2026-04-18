import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all ' +
    'disabled:pointer-events-none disabled:opacity-50 ' +
    '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 ' +
    'outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--sgx-blue)] ' +
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--sgx-blue)] hover:bg-[#061544] text-white',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        danger: 'bg-destructive text-white hover:bg-destructive/90',
        success: 'bg-[var(--sgx-green)] hover:bg-[#05bf2a] text-[var(--sgx-blue)]',
        warning: 'bg-[#FFCC00] hover:bg-[#e6b800] text-[var(--sgx-blue)]',
        lightblue: 'bg-[var(--sgx-light-blue)] hover:bg-[#006b88] text-white',
        ghost:
          'bg-transparent border border-[var(--sgx-blue)] text-[var(--sgx-blue)] hover:bg-[var(--sgx-light-gray)]',
        white: 'bg-white text-[var(--sgx-dark-gray)] hover:bg-gray-100 border border-gray-200',
        outline:
          'bg-transparent border border-[rgba(95,96,98,0.15)] text-[var(--sgx-dark-gray)] ' +
          'hover:border-[var(--sgx-light-blue)] hover:text-[var(--sgx-light-blue)]',
        neutral: '',
      },
      size: {
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-sm',
        md: 'h-9 px-4 py-2 has-[>svg]:px-3 text-base',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4 text-lg',
      },
      radius: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      radius: 'lg',
    },
  },
);
