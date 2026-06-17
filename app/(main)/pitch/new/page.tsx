import { PitchForm } from '@/components/investors/PitchForm'

export const dynamic = 'force-dynamic'

export default function NewPitchPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Projekt einreichen</h1>
      <p className="text-muted-foreground">Stelle dein Projekt vor und finde den richtigen Investor.</p>
      <PitchForm />
    </div>
  )
}
