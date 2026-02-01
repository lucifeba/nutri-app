import AnamnesisWizard from "@/components/forms/AnamnesisWizard"

export default function AnamnesisPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />
            </div>

            <div className="z-10 w-full max-w-4xl text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    Diseña tu <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Nutrición Ideal</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Completa este formulario para que podamos crear una estrategia nutricional hecha 100% a tu medida.
                </p>
            </div>

            <div className="z-10 w-full">
                <AnamnesisWizard />
            </div>
        </div>
    )
}
