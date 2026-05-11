import { Head, Link, router } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import '../../../css/tarea.css';
import { route } from 'ziggy-js';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    esta_completada: boolean;
    prioridad: string;
}

interface Props {
    tareas: Tarea[];
}

export default function Dashboard({ tareas }: Props) {
    const handleEliminar = (id) => {
        router.delete(route('tareas.destroy', id), {
            preserveScroll: true,
            onBefore: () => confirm('¿Seguro que quieres borrar esta tarea?'),
        });
    };
    return (
        <>
            <Head title="Lista de Tareas" />
            <div className="mt-4">
                <Link href={route('tareas.create')} className="p-2">
                    <Button> Crear Tarea</Button>
                </Link>
            </div>
            {tareas.length > 0 && (
                <Table className="mt-3">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titulo</TableHead>
                            <TableHead>Descipcion</TableHead>
                            <TableHead>Prioridad</TableHead>
                            <TableHead className="w-[50px]">Estado</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tareas.map((tarea) => (
                            <TableRow key={tarea.id}>
                                <TableCell>
                                    <Link href={route('tareas.show', tarea.id)}>
                                        {tarea.titulo}
                                    </Link>
                                </TableCell>
                                <TableCell>{tarea.descripcion}</TableCell>
                                <TableCell>{tarea.prioridad}</TableCell>
                                <TableCell>
                                    {tarea.esta_completada ? (
                                        <div className="completado">
                                            Completada
                                        </div>
                                    ) : (
                                        <div className="pendiente">
                                            Pendiente
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={route('tareas.edit', tarea.id)}
                                        className="p-2"
                                    >
                                        <Button className="edit">
                                            {' '}
                                            Editar Tarea
                                        </Button>
                                    </Link>
                                    <Button
                                        className="eliminar"
                                        onClick={() => handleEliminar(tarea.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Tareas',
            href: '/tareas',
        },
    ],
};
