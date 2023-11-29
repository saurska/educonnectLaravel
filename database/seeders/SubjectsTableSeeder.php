<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $subjects = [
            'Wireless Communication',
            'Grid Computing',
            'Cloud Computing',
            'Cryptography & Network Security',
        ];

        foreach ($subjects as $subject) {
            DB::table('subjects')->insert(['name' => $subject]);
        }
    }
}
