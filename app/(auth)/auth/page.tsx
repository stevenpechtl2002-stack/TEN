import { AuthForm } from '@/components/auth/AuthForm'

export const dynamic = 'force-dynamic'

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">TEN</h1>
          <p className="text-muted-foreground mt-1">Die Plattform für Unternehmer</p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
