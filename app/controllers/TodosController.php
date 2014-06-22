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
		
		/*
		$validator = Validator::make($data, Todo::$rules);

		if ($validator->fails())
		{
			return Response::json(array(
				'error' => 1,
				'messages' => $validator->messages()->all(),
			));
		}
		*/
		
		$todo = new Todo;
		$todo->title = $data['title'];
		$todo->completed = 0;
		$todo->user_id = 1;
		$todo->save();

		return Response::json(array(
			'error' => 0,
			'todo_id' => $todo->id,
			'messages' => '添加成功',
		));
	}

	/**
	 * Complete the specified todo from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function complete()
	{
		$id = Input::get('id');
		$todo = Todo::find($id);
		
		if ( $todo ) {
			$todo->completed = 1;
			$todo->save();
			$result = array(
				'error' => 0,
				'messages' => '搞定',
			);
		} else {
			$result = array(
				'error' => 1,
				'messages' => '未找到记录',
			);
		}
		return Response::json($result);
	}

	/**
	 * Move the specified todo from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function move()
	{
		$id = Input::get('id');
		$point = Input::get('point');
		
		$todo = Todo::find($id);
		
		if ( $todo ) {
			$todo->point = $point;
			$todo->save();
			$result = array(
				'error' => 0,
				'messages' => '移动成功',
			);
		} else {
			$result = array(
				'error' => 1,
				'messages' => '未找到记录',
			);
		}
		return Response::json($result);
	}
	
	
	/**
	 * Remove the specified todo from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy()
	{
		$id = Input::get('id');
		$todo = Todo::find($id);
		
		if ( $todo ) {
			$todo->delete();
			$result = array(
				'error' => 0,
				'messages' => '删除成功',
			);
		} else {
			$result = array(
				'error' => 1,
				'messages' => '未找到记录(id='.$id.')',
			);
		}
		return Response::json($result);
	}

}
