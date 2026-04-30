<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'status', 'total', 'notes'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 
     * Esta funcion esta pendiente de cambio ya que nosotros no tenemos
     * unicamente productos, tenemos platos y bebidas pero en las migraciones esta
     * definido como productos, por lo que o se mantiene asi y se cambia el diagrama
     * entidad relacion (más sentido y menos trabajoso o se cambia todo lo relacionado
     * con productos por platos y bebidas, lo cual es más trabajoso)
     * 
     */
    public function products()
    {
        return $this->belongsToMany(Product::class)
                    ->withPivot('quantity', 'unit_price');
    }
}
