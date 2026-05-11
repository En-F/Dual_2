<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\TareaController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('tareas',TareaController::class)->except(['index','show']);

});

Route::resource('tareas',TareaController::class)->only(['index','show']);


require __DIR__.'/settings.php';
