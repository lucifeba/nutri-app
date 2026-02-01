"use client"

import { useState } from "react"
import { MessageCircle, RefreshCw, ChevronLeft, ChevronRight, LogOut, Check } from "lucide-react"
import { useRouter } from "next/navigation"

type Meal = {
    name: string
    calories: number
    protein: number
}

type MenuDay = {
    day: string
    meals: {
        breakfast: Meal
        lunch: Meal
        dinner: Meal
        snack: Meal
    }
}

const mockMenu: MenuDay[] = [
    { day: "Lunes", meals: { breakfast: { name: "Gachas de Avena con Frutos Rojos", calories: 350, protein: 12 }, lunch: { name: "Ensalada de Pollo a la Plancha", calories: 450, protein: 40 }, dinner: { name: "Salmón con Espárragos", calories: 500, protein: 35 }, snack: { name: "Yogur Griego", calories: 150, protein: 15 } } },
    { day: "Martes", meals: { breakfast: { name: "Tostada de Aguacate", calories: 400, protein: 10 }, lunch: { name: "Wrap de Pavo y Queso", calories: 420, protein: 30 }, dinner: { name: "Filete Magro con Verduras", calories: 600, protein: 50 }, snack: { name: "Manzana y Almendras", calories: 200, protein: 5 } } },
]

export default function PatientDashboard() {
    const router = useRouter()
    const [currentDayIndex, setCurrentDayIndex] = useState(0)
    const currentDay = mockMenu[currentDayIndex]

    // Estado Modal Intercambio
    const [isSwapModalOpen, setIsSwapModalOpen] = useState(false)
    const [swapTarget, setSwapTarget] = useState<string>("")

    const nextDay = () => setCurrentDayIndex((prev) => (prev + 1) % mockMenu.length)
    const prevDay = () => setCurrentDayIndex((prev) => (prev - 1 + mockMenu.length) % mockMenu.length)

    const handleLogout = () => {
        document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        router.push('/login')
    }

    const openSwapModal = (mealType: string) => {
        setSwapTarget(mealType)
        setIsSwapModalOpen(true)
    }

    const confirmSwap = (newDish: string) => {
        // Aquí iría la lógica real para actualizar el menú
        alert(`Has intercambiado tu ${swapTarget} por: ${newDish}`)
        setIsSwapModalOpen(false)
    }

    const mealLabels: Record<string, string> = {
        breakfast: "Desayuno",
        lunch: "Comida",
        dinner: "Cena",
        snack: "Merienda/Snack"
    }

    return (
        <div className="min-h-screen bg-background pb-20 md:pb-0">
            <header className="bg-card p-4 shadow-sm border-b border-border flex justify-between items-center sticky top-0 z-10">
                <div className="font-bold text-xl">Mi<span className="text-primary">Plan</span></div>
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">Yo</div>
                    <button onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <main className="max-w-md mx-auto p-4 space-y-6">

                {/* Date Navigator */}
                <div className="flex justify-between items-center bg-card p-4 rounded-2xl shadow-sm border border-border">
                    <button onClick={prevDay} className="p-2 hover:bg-accent rounded-full transition-colors"><ChevronLeft /></button>
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Menú del Día</p>
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">{currentDay.day}</h2>
                    </div>
                    <button onClick={nextDay} className="p-2 hover:bg-accent rounded-full transition-colors"><ChevronRight /></button>
                </div>

                {/* Meals */}
                <div className="space-y-4">
                    {Object.entries(currentDay.meals).map(([type, meal]) => (
                        <div key={type} className="bg-card p-5 rounded-2xl border border-border shadow-sm relative group overflow-hidden">
                            {/* Decorative gradient */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />

                            <div className="flex justify-between items-start mb-2 relative z-10">
                                <span className="text-xs uppercase font-bold text-primary tracking-wider">{mealLabels[type] || type}</span>
                                <button onClick={() => openSwapModal(mealLabels[type])} className="text-muted-foreground hover:text-primary transition-colors bg-accent/50 px-2 py-1 rounded text-xs flex items-center gap-1">
                                    <RefreshCw size={12} /> Intercambiar
                                </button>
                            </div>
                            <h3 className="font-bold text-lg mb-1 relative z-10">{meal.name}</h3>
                            <div className="flex gap-3 text-sm text-muted-foreground relative z-10">
                                <span>🔥 {meal.calories} kcal</span>
                                <span>💪 {meal.protein}g prot</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Change Request Box */}
                <div className="bg-accent/30 p-4 rounded-xl border border-primary/20 mt-8">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                        <MessageCircle size={16} className="text-primary" /> Solicitar Cambios
                    </h4>
                    <div className="flex gap-2">
                        <button
                            onClick={() => window.open(`https://wa.me/34676002647?text=Hola, quiero solicitar un cambio en mi menú del ${currentDay.day}`, '_blank')}
                            className="flex-1 bg-card border border-border py-2 rounded-lg text-sm font-medium hover:bg-white hover:text-primary transition-all shadow-sm"
                        >
                            WhatsApp
                        </button>
                        <button className="flex-1 bg-card border border-border py-2 rounded-lg text-sm font-medium hover:bg-white hover:text-primary transition-all shadow-sm">
                            Email
                        </button>
                    </div>
                </div>

            </main>

            {/* MODAL INTERCAMBIO */}
            {isSwapModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card w-full max-w-md rounded-2xl p-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Opciones para {swapTarget}</h3>
                            <button onClick={() => setIsSwapModalOpen(false)} className="p-2 hover:bg-accent rounded-full"><div className="i-lucide-x" />Cerrar</button>
                        </div>
                        <div className="space-y-3">
                            {["Opción Ligera (Ensalada)", "Opción Proteica (Pollo)", "Opción Vegetariana (Tofu)"].map((opt, i) => (
                                <div key={i} onClick={() => confirmSwap(opt)} className="p-4 border border-border rounded-xl hover:bg-primary/5 hover:border-primary cursor-pointer transition-all flex justify-between items-center">
                                    <span className="font-medium">{opt}</span>
                                    <div className="w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-white">
                                        <Check size={14} className="opacity-0 group-hover:opacity-100" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
