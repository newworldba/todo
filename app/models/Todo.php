<?php

class Todo extends \Eloquent {
	protected $fillable = [];
	
	protected $table = 'todos';
	
	static $rules = array(
		'title' => 'required|between:1,140',
	);
	
}