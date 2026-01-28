variable "region" {
  type = string
  default = "us-east-1"
  description = "AWS region"
}

variable "instance-type-be" {
    type = string
    default = "t2.medium"
}

variable "instance-type-fe" {
    type = string
    default = "t2.large"
}

variable "key-name" {
    type = string
    default = "vockey"
}

variable "domain" {
  type = string
  default = "sushimiyu.es"
}

data "aws_vpc" "default_vpc" {
  default = true
}

data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
  filter {
    name = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["099720109477"] #Cannonical
}