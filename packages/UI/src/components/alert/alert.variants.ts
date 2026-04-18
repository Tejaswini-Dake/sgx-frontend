import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid ' +
    'has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] ' +
    'has-[>svg]:gap-x-3 gap-y-0.5 items-start ' +
    '[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
        success:
          'text-[var(--sgx-green)] bg-card border-[var(--sgx-green)]/30 [&>svg]:text-current',
        warning:
          'text-[var(--sgx-yellow)] bg-card border-[var(--sgx-yellow)]/40 [&>svg]:text-current',
        info:
          'text-[var(--sgx-light-blue)] bg-card border-[var(--sgx-light-blue)]/30 [&>svg]:text-current',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
