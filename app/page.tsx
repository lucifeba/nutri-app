import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden selection:bg-primary selection:text-white">

      {/* Navbar Placeholder */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
        <div className="text-2xl font-bold tracking-tighter">
          PRO<span className="text-primary">NUTRI</span>
        </div>
        <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
          Soy Admin
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="z-10 text-center max-w-5xl px-4 animate-in fade-in zoom-in duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-primary/20 text-sm font-medium mb-8 backdrop-blur-md">
          <Star size={14} className="text-primary fill-primary" />
          <span className="text-foreground/80">Nutrición de Alto Rendimiento en España</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
          Tu cuerpo es tu <br />
          <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Mejor Activo
          </span>
        </h1>

        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          Propuestas de menús semanales adaptadas a tu vida, tus gustos y el sistema español de nutrición.
          Gamifica tu salud y alcanza el siguiente nivel.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/anamnesis"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-primary px-8 font-medium text-primary-foreground shadow-2xl transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:ring-2 hover:ring-primary/50 hover:ring-offset-2"
          >
            <span className="mr-2">Rellenar Cuestionario Inicial</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/login"
            className="px-8 py-3 rounded-md font-medium text-foreground hover:bg-accent/50 transition-colors"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-[100px] animate-pulse" />
      </div>

    </main>
  )
}
