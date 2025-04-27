import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              'h-9 px-4 py-2 border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md text-sm font-medium',
            socialButtonsBlockButton:
              'h-9 px-4 py-2 border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md text-sm font-medium flex items-center justify-center gap-2',
            clFooter: 'display: none',
          },
        }}
      />
      <p className="text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          href="/sign-up"
          className="text-primary hover:underline font-medium"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
