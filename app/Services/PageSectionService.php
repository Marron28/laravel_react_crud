<?php

namespace App\Services;

use App\Models\PageSection;

class PageSectionService
{
    public function getAll()
    {
        return PageSection::with('setting')->orderBy('created_at', 'asc')->get();
    }

    public function find(PageSection $pageSection): PageSection
    {
        return $pageSection->load(['setting', 'posts']);
    }

    public function create(array $data): PageSection
    {
        $section = PageSection::create(['name' => $data['name']]);

        $section->setting()->create([
            'subtitle' => $data['subtitle'] ?? null,
            'is_visible' => $data['is_visible'] ?? true,
        ]);

        return $section->load('setting');
    }

    public function update(PageSection $pageSection, array $data): PageSection
    {
        if (isset($data['name'])) {
            $pageSection->update(['name' => $data['name']]);
        }

        if (array_key_exists('subtitle', $data) || array_key_exists('is_visible', $data)) {
            $setting = $pageSection->setting;

            if ($setting) {
                $setting->update([
                    'subtitle' => $data['subtitle'] ?? $setting->subtitle,
                    'is_visible' => $data['is_visible'] ?? $setting->is_visible,
                ]);
            } else {
                $pageSection->setting()->create([
                    'subtitle' => $data['subtitle'] ?? null,
                    'is_visible' => $data['is_visible'] ?? true,
                ]);
            }
        }

        return $pageSection->fresh(['setting']);
    }

    public function destroy(PageSection $pageSection): void
    {
        $pageSection->delete();
    }
}
