"use client"

import { useState, useEffect } from "react"
import { Users, FileText, Send, Plus, Search, Trash2, Utensils, LogOut, Save, X, Edit3 } from "lucide-react"
import { useRouter } from "next/navigation"

type User = {
    id: number
    name: string
    status: 'Activo' | 'Pendiente'
    plan: string
}

type Dish = {
    id: number
    name: string
    type: 'Desayuno' | 'Comida' | 'Cena' | 'Snack'
    calories: number
}

export default function AdminDashboard() {
    const router = useRouter()
    // Estado local para "empezar en blanco" como pidió el usuario, pero permitiendo añadir.
    const [users, setUsers] = useState<User[]>([])
    const [dishes, setDishes] = useState<Dish[]>([
        { id: 1, name: "Tortilla Francesa", type: 'Cena', calories: 200 },
        { id: 2, name: "Pollo al Curry", type: 'Comida', calories: 450 }
    ]) // Base de datos de platos inicial

    const [selectedUser, setSelectedUser] = useState<number | null>(null)
    const [activeView, setActiveView] = useState<'users' | 'dishes'>('users')
    const [showNewUserModal, setShowNewUserModal] = useState(false)

    // Estado para formulario nuevo usuario
    const [newUser, setNewUser] = useState({ name: '', plan: 'Básico' })

    // Estado para gestión de Menús (Edición)
    const [isEditingMenu, setIsEditingMenu] = useState(false)
    const [menuText, setMenuText] = useState("Sin planificación generada.")

    const handleLogout = () => {
        document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        router.push('/login')
    }

    const handleDeleteUser = (id: number, e: React.MouseEvent) => {
        e.stopPropagation()
        if (confirm("¿Seguro que quieres eliminar a este paciente?")) {
            setUsers(users.filter(u => u.id !== id))
            if (selectedUser === id) setSelectedUser(null)
        }
    }

    const handleAddUser = () => {
        if (!newUser.name) return
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
        setUsers([...users, { id: newId, name: newUser.name, status: 'Pendiente', plan: newUser.plan }])
        setNewUser({ name: '', plan: 'Básico' })
        setShowNewUserModal(false)
    }

    const handleGenerateMenu = () => {
        alert("¡Menú Generado con éxito! (Simulación de IA)")
        setMenuText(`Lunes: Ensalada Variada\nMartes: Pollo al Horno\nMiércoles: Pescado Azul\n...`)
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border p-6 hidden md:flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-8 text-primary">AdminPanel</h1>
                    <nav className="space-y-4">
                        <div
                            onClick={() => setActiveView('users')}
                            className={`flex items-center gap-3 p-3 rounded-lg font-medium cursor-pointer transition-colors ${activeView === 'users' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent'}`}
                        >
                            <Users size={20} /> Pacientes
                        </div>
                        <div
                            onClick={() => setActiveView('dishes')}
                            className={`flex items-center gap-3 p-3 rounded-lg font-medium cursor-pointer transition-colors ${activeView === 'dishes' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent'}`}
                        >
                            <Utensils size={20} /> Base de Datos Platos
                        </div>
                    </nav>
                </div>

                <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors font-medium">
                    <LogOut size={20} /> Cerrar Sesión
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">

                {/* VISTA: PACIENTES */}
                {activeView === 'users' && (
                    <>
                        <header className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold">Gestión de Pacientes</h2>
                            <button
                                onClick={() => setShowNewUserModal(true)}
                                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20"
                            >
                                <Plus size={18} /> Añadir Paciente Manual
                            </button>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Lista Usuarios */}
                            <div className="bg-card rounded-xl border border-border shadow-sm h-[500px] flex flex-col">
                                <div className="p-4 border-b border-border">
                                    <h3 className="font-semibold mb-2">Lista de Pacientes</h3>
                                    {users.length === 0 && <p className="text-sm text-muted-foreground italic">No hay pacientes. Añade uno.</p>}
                                </div>
                                <div className="overflow-y-auto flex-1 p-2 space-y-2">
                                    {users.map(user => (
                                        <div
                                            key={user.id}
                                            onClick={() => setSelectedUser(user.id)}
                                            className={`p-3 rounded-lg flex justify-between items-center cursor-pointer transition-colors border border-transparent ${selectedUser === user.id ? "bg-primary/5 border-primary/20" : "hover:bg-accent"}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{user.name}</p>
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${user.status === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                        {user.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <button onClick={(e) => handleDeleteUser(user.id, e)} className="text-muted-foreground hover:text-destructive p-2">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Detalle Usuario / Planificador */}
                            <div className="lg:col-span-2 space-y-6">
                                {selectedUser ? (
                                    <>
                                        {/* Tarjeta de Control */}
                                        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h3 className="text-xl font-bold">Planificación: {users.find(u => u.id === selectedUser)?.name}</h3>
                                                    <p className="text-sm text-muted-foreground">Estado: {users.find(u => u.id === selectedUser)?.status}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={handleGenerateMenu} className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:scale-105 transition-transform">
                                                        ✨ Generar Menú Auto
                                                    </button>
                                                    <button onClick={() => window.open("https://wa.me/", "_blank")} className="bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1ebd59]">
                                                        <Send size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Editor de Menú */}
                                            <div className="bg-muted/30 p-4 rounded-xl border border-dashed border-border min-h-[200px] relative">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-semibold text-sm">Vista Previa del Menú</h4>
                                                    <button
                                                        onClick={() => setIsEditingMenu(!isEditingMenu)}
                                                        className="text-primary text-xs flex items-center gap-1 hover:underline"
                                                    >
                                                        {isEditingMenu ? <><Save size={12} /> Guardar</> : <><Edit3 size={12} /> Editar Manualmente</>}
                                                    </button>
                                                </div>

                                                {isEditingMenu ? (
                                                    <textarea
                                                        value={menuText}
                                                        onChange={(e) => setMenuText(e.target.value)}
                                                        className="w-full h-40 bg-background p-2 rounded-md border border-input focus:ring-2 focus:ring-primary text-sm font-mono"
                                                    />
                                                ) : (
                                                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">{menuText}</pre>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-xl p-8">
                                        <p>Selecciona un paciente para ver su plan</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* VISTA: BASE DE DATOS PLATOS */}
                {activeView === 'dishes' && (
                    <div className="max-w-4xl">
                        <header className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold">Base de Datos de Platos</h2>
                            <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                <Plus size={18} /> Añadir Plato
                            </button>
                        </header>
                        <div className="bg-card rounded-xl border border-border overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-muted text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="p-4">Nombre</th>
                                        <th className="p-4">Tipo</th>
                                        <th className="p-4">Calorías</th>
                                        <th className="p-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {dishes.map(dish => (
                                        <tr key={dish.id} className="hover:bg-accent/50">
                                            <td className="p-4 font-medium">{dish.name}</td>
                                            <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{dish.type}</span></td>
                                            <td className="p-4 text-muted-foreground">{dish.calories} kcal</td>
                                            <td className="p-4 text-destructive cursor-pointer hover:underline">Eliminar</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Modal Nuevo Usuario */}
                {showNewUserModal && (
                    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-card p-6 rounded-xl shadow-2xl border border-border w-full max-w-sm">
                            <h3 className="text-xl font-bold mb-4">Nuevo Paciente</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Nombre</label>
                                    <input
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        className="w-full p-2 rounded-md bg-muted border border-input mt-1"
                                        placeholder="Nombre completo"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Plan</label>
                                    <select
                                        value={newUser.plan}
                                        onChange={(e) => setNewUser({ ...newUser, plan: e.target.value })}
                                        className="w-full p-2 rounded-md bg-muted border border-input mt-1"
                                    >
                                        <option>Básico</option>
                                        <option>NutriPro</option>
                                        <option>Premium</option>
                                    </select>
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <button onClick={() => setShowNewUserModal(false)} className="flex-1 py-2 rounded-lg hover:bg-accent transition-colors">Cancelar</button>
                                    <button onClick={handleAddUser} className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90">Crear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    )
}
