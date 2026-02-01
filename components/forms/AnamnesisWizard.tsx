"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, SubmitHandler } from "react-hook-form"
import { ChevronRight, Check, Activity, Utensils, User, HeartPulse } from "lucide-react"
import * as XLSX from 'xlsx'

type FormInputs = {
    fullName: string
    age: number
    weight: number
    height: number
    goal: string
    activityLevel: string
    dietaryRestrictions: string[]
    favoriteFoods: string
    dislikedFoods: string
    medicalHistory: string
    supplements: string
}

const steps = [
    { id: 1, title: "Personal Data", icon: User },
    { id: 2, title: "Physical Stats", icon: Activity },
    { id: 3, title: "Nutrition", icon: Utensils },
    { id: 4, title: "Health & Goals", icon: HeartPulse },
]

export default function AnamnesisWizard() {
    const [currentStep, setCurrentStep] = useState(1)
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setIsSubmitting(true)
        // Simulate API call and Excel generation
        console.log("Submitting data:", data)

        // Create Excel
        const worksheet = XLSX.utils.json_to_sheet([data])
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Anamnesis")
        // In a real app, send this blob to the backend or Trigger download
        // XLSX.writeFile(workbook, "anamnesis_data.xlsx") 

        // TODO: Send to backend
        setTimeout(() => {
            setIsSubmitting(false)
            alert("¡Listo! Cuestionario enviado. Revisa tu correo pronto.")
        }, 2000)
    }

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

    return (
        <div className="w-full max-w-2xl mx-auto bg-card p-8 rounded-2xl shadow-xl border border-border/50 backdrop-blur-sm">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-2">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className={`flex flex-col items-center ${step.id <= currentStep ? "text-primary" : "text-muted-foreground"}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors duration-300 ${step.id <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}>
                                <step.icon size={20} />
                            </div>
                            <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                        </div>
                    ))}
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                                Let's get to know you
                            </h2>
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input
                                    {...register("fullName", { required: true })}
                                    className="w-full p-3 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary transition-all"
                                    placeholder="Juan Pérez"
                                />
                                {errors.fullName && <span className="text-destructive text-sm">Required</span>}
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-bold">Physical Stats</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Age</label>
                                    <input type="number" {...register("age", { required: true })} className="w-full p-3 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                                    <input type="number" step="0.1" {...register("weight", { required: true })} className="w-full p-3 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Height (cm)</label>
                                    <input type="number" {...register("height", { required: true })} className="w-full p-3 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-bold">Nutritional Habits</h2>
                            <div>
                                <label className="block text-sm font-medium mb-1">Favorite Foods</label>
                                <textarea {...register("favoriteFoods")} className="w-full p-3 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary" placeholder="Pasta, Chicken, Fruits..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Disliked Foods / Allergies</label>
                                <textarea {...register("dislikedFoods")} className="w-full p-3 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary" placeholder="Broccoli, Nuts..." />
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-bold">Final Details</h2>
                            <div>
                                <label className="block text-sm font-medium mb-1">Main Goal</label>
                                <select {...register("goal")} className="w-full p-3 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary">
                                    <option value="lose_weight">Lose Weight</option>
                                    <option value="gain_muscle">Gain Muscle</option>
                                    <option value="performance">Improve Performance</option>
                                    <option value="maintenance">Maintenance</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Medical History</label>
                                <textarea {...register("medicalHistory")} className="w-full p-3 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary" placeholder="Any injuries, diseases..." />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`px-6 py-2 rounded-xl transition-colors ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"}`}
                    >
                        Back
                    </button>

                    {currentStep < steps.length ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="bg-primary text-primary-foreground px-6 py-2 rounded-xl flex items-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                        >
                            Next <ChevronRight size={18} className="ml-1" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-2 rounded-xl flex items-center hover:opacity-90 transition-all shadow-lg shadow-primary/25 disabled:opacity-70"
                        >
                            {isSubmitting ? "Sending..." : "Complete & Send"} <Check size={18} className="ml-2" />
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
