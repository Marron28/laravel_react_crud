<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function __construct(protected PostService $postService) {}

    public function index(Request $request)
    {
        return response()->json($this->postService->getAll($request->section));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'section_name' => 'required|string|exists:page_sections,name',
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        try {
            $post = $this->postService->create($validated);
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }

        return response()->json($post, 201);
    }

    public function show(Post $post)
    {
        $post->load('pageSection');

        return response()->json([
            ...$post->toArray(),
            'section_name' => $post->pageSection?->name,
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        return response()->json($this->postService->update($post, $validated));
    }

    public function destroy(Post $post)
    {
        $this->postService->destroy($post);

        return response()->json(['message' => 'Deleted successfully']);
    }
}
