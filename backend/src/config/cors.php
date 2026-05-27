<?php

return [

    'paths' => ['api/*', 'storage/*', '*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:4200', 'http://localhost:5173', 'http://13.217.186.186', 'https://13.217.186.186', 'http://localhost'],

    'allowed_headers' => ['*'],

    'allowed_origins_patterns' => [],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
