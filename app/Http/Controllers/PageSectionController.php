<?php

namespace App\Http\Controllers;

use App\Models\PageSection;
use App\Services\PageSectionService;
use Illuminate\Http\Request;

class PageSectionController extends Controller
{
    public function __construct(protected PageSectionService $pageSectionService) {}

    public function index()
    {
        return response()->json($this->pageSectionService->getAll());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:page_sections,name',
            'subtitle' => 'nullable|string|max:255',
            'is_visible' => 'sometimes|boolean',
        ]);

        return response()->json($this->pageSectionService->create($validated), 201);
    }

    public function show(PageSection $pageSection)
    {
        return response()->json($this->pageSectionService->find($pageSection));
    }

    public function update(Request $request, PageSection $pageSection)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|unique:page_sections,name,'.$pageSection->id,
            'subtitle' => 'nullable|string|max:255',
            'is_visible' => 'sometimes|boolean',
        ]);

        return response()->json($this->pageSectionService->update($pageSection, $validated));
    }

    public function destroy(PageSection $pageSection)
    {
        $this->pageSectionService->destroy($pageSection);

        return response()->json(['message' => 'Deleted successfully']);
    }
}
