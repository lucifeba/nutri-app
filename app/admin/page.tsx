"use client"

import { useState } from "react"
import { Users, FileText, Send, Plus, Search } from "lucide-react"

export default function AdminDashboard() {
    const [selectedUser, setSelectedUser] = useState<number | null>(null)

    // Mock Users
    const users = [
        { id: 1, name: "Juan Pérez", status: "Active", plan: "NutriPro" },
        { id: 2, name: "Maria García", status: "Pending", plan: "Basic" },
        { id: 3, name: "Carlos Lopez", status: "Active", plan: "NutriPro" },
    ]

    const handleGenerateMenu = () => {
        alert("Generating Menu for " + users.find(u => u.id === selectedUser)?.name)
        // Here we would call the API to generate the menu based on Anamnesis
    }

    const handleSendWhatsapp = (phone = "34676002647") => {
        window.open(`https://wa.me/${phone}?text=Hola, ya tienes tu nueva planificación disponible.`, '_blank')
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border p-6 hidden md:block">
                <h1 className="text-2xl font-bold mb-8 text-primary">AdminPanel</h1>
                <nav className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-accent rounded-lg text-primary font-medium cursor-pointer">
                        <Users size={20} /> Users
                    </div>
                    <div className="flex items-center gap-3 p-3 text-muted-foreground hover:bg-accent/50 rounded-lg cursor-pointer transition-colors">
                        <FileText size={20} /> Content
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Patient Management</h2>
                    <div className="flex gap-4">
                        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90">
                            <Plus size={18} /> Add Patient
                        </button>
                    </div>
                </header>

                {/* User List */}
                <div className="bg-card rounded-xl border border-border shadow-sm mb-8">
                    <div className="p-4 border-b border-border flex justify-between items-center">
                        <h3 className="font-semibold">Recent Patients</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <input className="pl-9 pr-4 py-2 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Search..." />
                        </div>
                    </div>
                    <div className="divide-y divide-border">
                        {users.map(user => (
                            <div
                                key={user.id}
                                onClick={() => setSelectedUser(user.id)}
                                className={`p-4 flex justify-between items-center cursor-pointer hover:bg-accent/30 transition-colors ${selectedUser === user.id ? "bg-accent/50" : ""}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-muted-foreground">{user.plan}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {user.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Panel */}
                {selectedUser && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <h3 className="text-xl font-bold mb-4">Actions for {users.find(u => u.id === selectedUser)?.name}</h3>
                            <div className="space-y-4">
                                <button
                                    onClick={handleGenerateMenu}
                                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex justify-between items-center"
                                >
                                    Generate Weekly Menu <span>✨</span>
                                </button>
                                <button className="w-full bg-card border-2 border-primary text-primary p-4 rounded-xl font-medium hover:bg-primary/5 transition-colors">
                                    View Anamnesis
                                </button>
                            </div>
                        </div>

                        <div className="bg-card p-6 rounded-xl border border-border">
                            <h3 className="text-xl font-bold mb-4">Communication</h3>
                            <textarea className="w-full h-32 bg-muted rounded-lg p-3 text-sm mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Type a message..." defaultValue="Hola, tu menú semanal ya está listo. ¡A por todas!" />
                            <button
                                onClick={() => handleSendWhatsapp()}
                                className="w-full bg-[#25D366] text-white p-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[#128C7E] transition-colors"
                            >
                                <Send size={18} /> Send via WhatsApp
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
