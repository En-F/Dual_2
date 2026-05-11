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
            'titulo' => 'Comer con los abuelos',
            'descripcion' => 'Descripción de la uno',
            'prioridad' => 'baja',
        ],
        [
            'titulo' => 'Sacar al perro a pasear',
            'descripcion' => 'Descripción de la dos',
            'prioridad' => 'media',
        ],
        [
            'titulo' => 'Hacer el TFG',
            'descripcion' => 'Descripción de la tres',
            'prioridad' => 'alta',
        ],
        [
            'titulo' => 'Jugar videojuegos',
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
