import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', paddingTop: '58px' }}>
        <Sidebar />
        <main style={{
          flex: 1,
          marginLeft: 0,
          padding: '2rem 1.5rem',
          maxWidth: '700px',
        }} className="main-content">
          {children}
        </main>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .main-content { margin-left: 220px !important; }
        }
      `}</style>
    </>
  )
}
