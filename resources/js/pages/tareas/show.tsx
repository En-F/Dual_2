import { Head, Link, router } from '@inertiajs/react';

export default function Show({ tarea }) {
    return (
        <div className="min-h-screen bg-gray-50/50 px-4 py-12 sm:px-6">
            <Head title={`Tarea: ${tarea.titulo}`} />

            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <Link
                        href={route('tareas.index')}
                        className="group flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
                    >
                        <span className="mr-2 transition-transform group-hover:-translate-x-1">
                            ←
                        </span>
                        Volver al listado de tareas
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-sm">
                            <div className="mb-6 flex items-center gap-4">
                                <span
                                    className={`rounded-full px-4 py-1.5 text-xs font-black tracking-widest uppercase ${
                                        tarea.prioridad === 'alta'
                                            ? 'border border-red-100 bg-red-50 text-red-600'
                                            : tarea.prioridad === 'media'
                                              ? 'border border-yellow-100 bg-yellow-50 text-yellow-600'
                                              : 'border border-green-100 bg-green-50 text-green-600'
                                    }`}
                                >
                                    Prioridad {tarea.prioridad}
                                </span>
                                {tarea.esta_completada ? (
                                    <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-black tracking-widest text-blue-600 uppercase">
                                        Completada ✅
                                    </span>
                                ) : (
                                    <span className="rounded-full border border-gray-100 bg-gray-50 px-4 py-1.5 text-xs font-black tracking-widest text-gray-400 uppercase">
                                        Pendiente ⏳
                                    </span>
                                )}
                            </div>

                            <h1 className="mb-8 text-5xl leading-tight font-black text-gray-900">
                                {tarea.titulo}
                            </h1>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase">
                                    Descripción detallada
                                </h3>
                                <div className="rounded-2xl border-gray-100 bg-gray-50 p-8">
                                    <p className="text-xl leading-relaxed whitespace-pre-wrap text-gray-700 italic">
                                        {tarea.descripcion ||
                                            'Esta tarea no tiene una descripción detallada todavía.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl bg-gray-900 p-8 text-white shadow-2xl">
                            <h3 className="border-b border-gray-700 text-lg font-bold text-black">
                                Detalles del Registro
                            </h3>

                            <div className="mb-8 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">
                                        Creada el
                                    </p>
                                    <p className="text-sm font-medium text-gray-700">
                                        {new Date(
                                            tarea.created_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
