<?php

namespace App\Services;

use App\Models\PageSection;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class PostService
{
    public function getAll(?string $sectionName = null)
    {
        return Post::with('pageSection')
            ->when($sectionName, function ($query) use ($sectionName) {
                $query->whereHas('pageSection', function ($q) use ($sectionName) {
                    $q->where('name', $sectionName);
                });
            })
            ->orderBy('created_at', 'asc')
            ->get();
    }

    public function create(array $data): Post
    {
        $section = PageSection::where('name', $data['section_name'])->first();

        if (! $section) {
            throw new \RuntimeException('Section not found.');
        }

        $imagePath = null;
        if (isset($data['image'])) {
            $imagePath = $data['image']->store('posts', 'public');
        }

        return Post::create([
            'page_section_id' => $section->id,
            'title' => $data['title'],
            'description' => $data['description'],
            'image' => $imagePath,
        ]);
    }

    public function update(Post $post, array $data): Post
    {
        if (isset($data['image'])) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }

            $data['image'] = $data['image']->store('posts', 'public');
        } else {
            unset($data['image']);
        }

        $post->update($data);

        return $post->fresh();
    }

    public function destroy(Post $post): void
    {
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->delete();
    }
}
