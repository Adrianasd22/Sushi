<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'mode'       => $this->mode,
            'address'    => $this->address,
            'phone'      => $this->phone,
            'notes'      => $this->notes,
            'total'      => $this->total,

            'user'       => $this->whenLoaded('user', fn() => [
                'id'    => $this->user->id,
                'name'  => $this->user->name,
                'email' => $this->user->email,
            ]),

            'products'   => $this->whenLoaded('products', function () {
                return $this->products->map(fn($p) => [
                    'id'         => $p->id,
                    'name'       => $p->name,
                    'quantity'   => $p->pivot->quantity,
                    'unit_price' => $p->pivot->unit_price,
                ]);
            }),
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
