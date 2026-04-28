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
        'total'      => $this->total,
        'user_id'       => $this->user_id,
        /**
         * Mismo problema que con el modelo
         * 
         * Devolvemos productos pero el entidad-relacion tenemos bebidas y platos por separado
         * 
         * Voy a dejarlo como productos porque tiene mas sentido y es algo mas facil de entender,
         * pero no se si será mucho problema a la hora de enlazarlo con la tabla de alergenos.
         * No deberia serlo
         */
        'products'   => $this->whenLoaded('products', function () {
            return $this->products->map(fn($p) => [     
                'id'         => $p->id,
                'name'       => $p->name,
                'quantity'   => $p->pivot->quantity,
                'unit_price' => $p->pivot->unit_price,
            ]);
        }),
        'created_at' => $this->created_at,
    ];
}
}