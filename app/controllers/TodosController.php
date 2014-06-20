<?php

class TodosController extends \BaseController {

	/**
	 * Display a listing of todos
	 *
	 * @return Response
	 */
	public function index()
	{
		$todos = Todo::all();

		return Response::json($todos);
	}

	/**
	 * Store a newly created todo in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$data = Input::all();
		
		$validator = Validator::make($data, Todo::$rules);

		if ($validator->fails())
		{
			return Response::json(array(
				'error' => 1,
				'messages' => $validator->messages()->all(),
			));
		}
		
		$data['user_id'] = 1;
		$data['completed'] = 0;

		$todo = new Todo;
		$todo->title = 'hello world.';
		$todo->completed = 0;
		$todo->user_id = 1;
		$todo->save();

		return Response::json(array(
			'error' => 0,
			'messages' => '添加成功',
		));
	}

	/**
	 * Update the specified todo in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$todo = Todo::findOrFail($id);

		$validator = Validator::make($data = Input::all(), Todo::$rules);

		if ($validator->fails())
		{
			return Redirect::back()->withErrors($validator)->withInput();
		}

		$todo->update($data);

		return Redirect::route('todos.index');
	}

	/**
	 * Remove the specified todo from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		Todo::destroy($id);

		return Redirect::route('todos.index');
	}

}
