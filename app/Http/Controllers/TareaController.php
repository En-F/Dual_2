<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTareaRequest;
use App\Http\Requests\UpdateTareaRequest;
use App\Models\Tarea;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TareaController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('tareas/index',[
            'tareas'=>Tarea::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Tarea::class);

        return inertia('tareas/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTareaRequest $request)
    {

        $datos = $request->validated();

        Tarea::create($datos);

        return redirect()->route('tareas.index');

    }

    /**
     * Display the specified resource.
     */
    public function show(Tarea $tarea)
    {
        return inertia('tareas/show',[
            'tarea' => $tarea
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tarea $tarea)
    {
        return inertia('tareas/edit',[
            'tarea' => $tarea
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTareaRequest $request, Tarea $tarea)
    {
        $this->authorize('update', $tarea);

        $datos =$request->validated();

        $tarea->update($datos);

        return redirect()->route('tareas.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tarea $tarea)
    {

        $this->authorize('delete', $tarea);

        $tarea->delete();

        return redirect()->route('tareas.index');
    }
}
