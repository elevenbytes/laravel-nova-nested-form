<?php

namespace Elbytes\NestedForm\Fields;

use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Http\Requests\NovaRequest;

class HiddenBelongsTo extends BelongsTo
{
    public function __construct($name, $attribute = null, $resource = null, $nullable = true)
    {
        parent::__construct($name, $attribute, $resource);
        $this->hideFromIndex();
        $this->hideFromDetail();
        $this->hideWhenCreating();
        $this->hideWhenUpdating();
        if ($nullable) {
            $this->nullable();
        }
    }

    public function resolve($resource, $attribute = null)
    {
        $attribute = $attribute ?? $this->attribute;
        $this->value = $resource->{$attribute};

        if ($this->value instanceof \Illuminate\Database\Eloquent\Model) {
            $this->value = $this->value->getKey();
        }

        return $this;
    }

    public function fill(NovaRequest $request, $model)
    {
        $this->fillAttribute($request, $this->attribute, $model);
    }

    public function meta()
    {
        return array_merge(parent::meta(), [
            'asHtml' => true,
        ]);
    }

    public function renderComponent($type, array $data)
    {
        return '<input type="hidden" name="'.$this->attribute.'" value="'.$this->value.'">';
    }
}
