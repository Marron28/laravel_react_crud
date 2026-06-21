<?php

namespace Database\Seeders;

use App\Models\PageSection;
use Illuminate\Database\Seeder;

class PageSectionSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            [
                'name' => 'Unique Home Page',
                'subtitle' => 'Showcase your homepage layouts',
            ],
            [
                'name' => 'Stunning Inner Pages',
                'subtitle' => 'Beautiful inner page templates',
            ],
            [
                'name' => 'Our Features',
                'subtitle' => 'Highlight key product features',
            ],
        ];

        foreach ($sections as $section) {
            $pageSection = PageSection::firstOrCreate(['name' => $section['name']]);

            $pageSection->setting()->firstOrCreate(
                ['page_section_id' => $pageSection->id],
                [
                    'subtitle' => $section['subtitle'],
                    'is_visible' => true,
                ]
            );
        }
    }
}
