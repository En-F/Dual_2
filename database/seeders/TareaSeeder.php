<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tarea;


class TareaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tareas = [
        [
            'titulo' => 'Tarea 1',
            'descripcion' => 'Descripción de la uno',
            'prioridad' => 'baja',
        ],
        [
            'titulo' => 'Tarea 2',
            'descripcion' => 'Descripción de la dos',
            'prioridad' => 'media',
        ],
        [
            'titulo' => 'Tarea 3',
            'descripcion' => 'Descripción de la tres',
            'prioridad' => 'alta',
        ],
        [
            'titulo' => 'Tarea 4',
            'descripcion' => 'Descripción de la cuatro',
            'prioridad' => 'baja',
            'esta_completada' => false,
        ],
    ];

        foreach($tareas as $tarea) {
            Tarea::create($tarea);
        }
    }
}
