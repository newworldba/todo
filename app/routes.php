<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/


Route::get('/', array('before' => 'auth.basic', function()
{
	return View::make('index');
}));


Route::group(array('before' => 'auth'), function (){
	$todos = 'TodosController';
	Route::get('/todos', "$todos@index");
	Route::post('/todos', "$todos@store");
	Route::post('/complete', "$todos@complete");
	Route::post('/delete', "$todos@destroy");
	Route::post('/move', "$todos@move");
});

