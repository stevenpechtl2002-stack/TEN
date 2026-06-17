import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Users, MessageSquare, TrendingUp, MessageCircle } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Communities',
    description: 'Erstelle und tritt Communities für Unternehmer bei. Teile Wissen, baue Netzwerke.',
  },
  {
    icon: MessageSquare,
    title: 'Fragen & Antworten',
    description: 'Stelle Fragen als Neuling und lerne direkt von erfahrenen Unternehmern.',
  },
  {
    icon: TrendingUp,
    title: 'Investoren',
    description: 'Pitch dein Projekt und verbinde dich mit den richtigen Investoren.',
  },
  {
    icon: MessageCircle,
    title: 'Direkte Vernetzung',
    description: 'Chatte privat mit anderen Unternehmern und bau echte Beziehungen auf.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-xl">TEN</span>
        <div className="flex gap-3">
          <Button variant="ghost">
            <Link href="/auth">Anmelden</Link>
          </Button>
          <Button>
            <Link href="/auth">Registrieren</Link>
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20 space-y-20">
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Die Plattform für Unternehmer
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Verbinde dich mit Unternehmern, stelle Fragen, finde Investoren und baue
            echte Beziehungen auf.
          </p>
          <Button size="lg">
            <Link href="/auth">Jetzt kostenlos starten</Link>
          </Button>
        </section>

        <section className="grid sm:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="border rounded-lg p-6 space-y-3">
              <Icon className="h-8 w-8 text-primary" />
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          ))}
        </section>

        <section className="text-center space-y-4 border-t pt-12">
          <h2 className="text-2xl font-bold">Bereit loszulegen?</h2>
          <p className="text-muted-foreground">Kostenlos registrieren und sofort loslegen.</p>
          <Button size="lg">
            <Link href="/auth">Konto erstellen</Link>
          </Button>
        </section>
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © 2026 TEN — The Entrepreneur Network
      </footer>
    </div>
  )
}
