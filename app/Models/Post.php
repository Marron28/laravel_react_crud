<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    protected $fillable = ['page_section_id', 'title', 'description', 'image'];

    public function pageSection(): BelongsTo
    {
        return $this->belongsTo(PageSection::class);
    }
}
