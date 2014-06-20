<?php
class TodoTableSeeder extends Seeder {

	public function run()
	{
		DB::table('todos')->delete();

		$user = User::first();
		
		Todo::create([
			'title' => '今天中午记得吃饭',
			'completed' => 1,
			'user_id' => $user->id
		]);
		
		Todo::create([
			'title' => '明天中午记得吃饭',
			'completed' => 0,
			'user_id' => $user->id
		]);
	}

}