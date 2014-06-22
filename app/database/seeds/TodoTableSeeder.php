<?php
class TodoTableSeeder extends Seeder {

	public function run()
	{
		DB::table('todos')->delete();

		$user = User::first();
		
		Todo::create([
			'title' => '鼠标双击页面，可以增加便签。',
			'completed' => 1,
			'user_id' => $user->id,
			'point' => '50,50'
		]);
		
		Todo::create([
			'title' => '今天晚上不加班，回家！',
			'completed' => 0,
			'user_id' => $user->id,
			'point' => '450,250'
		]);
	}

}