variable "region" {
  type    = string
  default = "us-east-1"
}

variable "instance_type" {
  type    = string
  default = "t2.medium"
}

variable "key_name" {
  type    = string
  default = "vockey"
}

#Dominios
variable "duckdns_domain" {
  type    = string
  default = "sushimiyu.duckdns.org"
}

variable "duckdns_backend_domain" {
  type    = string
  default = "sushimiyu-api.duckdns.org"
}