import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/tarea.css';
import { route } from 'ziggy-js';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    esta_completada: boolean;
    prioridad: string;
}

interface Props {
    tarea: Tarea;
}

export default function Create({ tarea }: Props) {
    const { data, setData, post, processing, errors, setError, clearErrors } =
        useForm({
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            prioridad: tarea.prioridad,
            esta_completada: tarea.esta_completada,
            _method: 'PUT',
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();

        let tieneErrores = false;

        const regextitulo = /^[a-zA-ZÀ-ÿ\s'"]+$/;

        if (data.titulo && !regextitulo.test(data.titulo)) {
            setError(
                'titulo',
                'El título solo puede contener letras y (comillas).',
            );
            tieneErrores = true;
        }

        const camposObligatorios = [
            { id: 'titulo', valor: data.titulo, nombre: 'Título' },
            {
                id: 'descripcion',
                valor: data.descripcion,
                nombre: 'Descripcion',
            },
            { id: 'prioridad', valor: data.prioridad, nombre: 'Prioridad' },
            {
                id: 'esta_completa',
                valor: data.esta_completada,
                nombre: 'Esta Completada',
            },
        ];

        camposObligatorios.forEach((campo) => {
            if (
                campo.valor === null ||
                campo.valor === undefined ||
                campo.valor.toString().trim() === ''
            ) {
                setError(
                    campo.id as any,
                    `El campo ${campo.nombre} es obligatorio.`,
                );
                tieneErrores = true;
            }
        });

        if (tieneErrores) return;

        post(route('tareas.update', tarea.id), { forceFormData: true });
    };

    return (
        <>
            <Head title="Crear Tarea" />

            <div className="mx-auto mt-10 max-w-2xl rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Nueva Tarea
                    </h1>
                    <p className="text-sm text-gray-500">
                        Organiza tus tareas del día a día.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="titulo"
                            className="font-semibold text-gray-700"
                        >
                            Título
                        </Label>
                        <Input
                            id="titulo"
                            value={data.titulo}
                            name="titulo"
                            className="w-full focus-visible:ring-blue-500"
                            placeholder="Ej: Comprar materiales de oficina"
                            onChange={(e) => setData('titulo', e.target.value)}
                        />
                        {errors.titulo && (
                            <span className="text-sm text-red-500">
                                {errors.titulo}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="descripcion"
                            className="font-semibold text-gray-700"
                        >
                            Descripción
                        </Label>
                        <textarea
                            id="descripcion"
                            value={data.descripcion}
                            name="descripcion"
                            className="flex min-h-[100px] w-full rounded-md border border-gray-200 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-blue-500 focus:ring-blue-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Detalles adicionales sobre la tarea..."
                            onChange={(e) =>
                                setData('descripcion', e.target.value)
                            }
                        />
                        {errors.descripcion && (
                            <span className="text-sm text-red-500">
                                {errors.descripcion}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label className="font-semibold text-gray-700">
                                Prioridad
                            </Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                value={data.prioridad}
                                onChange={(e) =>
                                    setData('prioridad', e.target.value)
                                }
                            >
                                <option value="">--Selecciona--</option>
                                <option value="baja">Baja</option>
                                <option value="media">Media</option>
                                <option value="alta">Alta</option>
                            </select>
                            {errors.prioridad && (
                                <span className="text-sm text-red-500">
                                    {errors.prioridad}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 pt-8">
                            <input
                                type="checkbox"
                                id="completada"
                                checked={data.esta_completada}
                                onChange={(e) =>
                                    setData('esta_completada', e.target.checked)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label
                                htmlFor="completada"
                                className="cursor-pointer text-sm font-medium"
                            >
                                ¿Está completada?
                            </Label>
                            {errors.esta_completada && (
                                <span className="text-sm text-red-500">
                                    {errors.esta_completada}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 border-t pt-4">
                        <Link
                            href={route('tareas.index')}
                            className="text-sm text-gray-600 hover:underline"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : 'Editar Tarea'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
