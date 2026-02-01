"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, User } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'patient' | 'admin'>('patient')
    const [formData, setFormData] = useState({ username: '', password: '' })
    const [error, setError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (activeTab === 'admin') {
            if (formData.username === 'APDSPORT' && formData.password === 'Pavicornio.8460') {
                document.cookie = "auth=admin; path=/"
                router.push('/admin')
            } else {
                setError('Credenciales de administrador incorrectas')
            }
        } else {
            // Patient Login Flow (Mock for MVP functionality)
            if (formData.username && formData.password) {
                document.cookie = `auth=patient; user=${formData.username}; path=/`
                router.push('/dashboard')
            } else {
                setError('Por favor introduce usuario y contraseña')
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[100px]" />

            <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-2xl border border-border relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-foreground mb-2">Bienvenido a <span className="text-primary">ProNutri</span></h1>
                    <p className="text-muted-foreground text-sm">Accede a tu panel personalizado</p>
                </div>

                <div className="flex bg-muted rounded-lg p-1 mb-6">
                    <button
                        onClick={() => setActiveTab('patient')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'patient' ? 'bg-card shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Soy Paciente
                    </button>
                    <button
                        onClick={() => setActiveTab('admin')}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'admin' ? 'bg-card shadow text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Soy Admin
                    </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Usuario</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full pl-10 p-3 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary transition-all"
                                placeholder={activeTab === 'admin' ? 'APDSPORT' : 'Tu Usuario'}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full pl-10 p-3 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && <p className="text-destructive text-sm font-medium text-center">{error}</p>}

                    <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                        {activeTab === 'admin' ? 'Entrar como Admin' : 'Entrar como Paciente'}
                    </button>
                </form>

                {activeTab === 'patient' && (
                    <p className="text-center mt-6 text-xs text-muted-foreground">
                        ¿No tienes cuenta? <span className="text-primary font-bold cursor-pointer hover:underline">Solicita acceso a tu nutricionista</span>
                    </p>
                )}
            </div>
        </div>
    )
}
