"use client"

import { useState } from "react"
import { MessageCircle, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"

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
    { day: "Miércoles", meals: { breakfast: { name: "Huevos Revueltos", calories: 380, protein: 20 }, lunch: { name: "Arroz con Merluza", calories: 500, protein: 35 }, dinner: { name: "Tortilla de Calabacín", calories: 400, protein: 15 }, snack: { name: "Batido de Proteína", calories: 120, protein: 25 } } },
]

export default function PatientDashboard() {
    const [currentDayIndex, setCurrentDayIndex] = useState(0)
    const currentDay = mockMenu[currentDayIndex]

    const nextDay = () => setCurrentDayIndex((prev) => (prev + 1) % mockMenu.length)
    const prevDay = () => setCurrentDayIndex((prev) => (prev - 1 + mockMenu.length) % mockMenu.length)

    const handleSwap = (mealType: string) => {
        alert(`Cambiando ${mealType}... Abriendo lista de intercambios equivalentes.`)
    }

    // Traducción visual de las comidas
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
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">Yo</div>
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
                                <button onClick={() => handleSwap(mealLabels[type])} className="text-muted-foreground hover:text-primary transition-colors bg-accent/50 px-2 py-1 rounded text-xs">
                                    🔄 Intercambiar
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
                    <p className="text-xs text-muted-foreground mb-3">¿Algo no te encaja? Avísame.</p>
                    <button
                        onClick={() => window.open(`https://wa.me/34676002647?text=Hola, quiero solicitar un cambio en mi menú del ${currentDay.day}`, '_blank')}
                        className="w-full bg-card border border-border py-2 rounded-lg text-sm font-medium hover:bg-white hover:text-primary transition-all shadow-sm"
                    >
                        Enviar Solicitud por WhatsApp
                    </button>
                </div>

            </main>
        </div>
    )
}
