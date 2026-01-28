terraform {
    required_providers {
        aws = {
        source  = "hashicorp/aws"
        version = "~> 6.18.0"
        }
    }
}

provider "aws" {
    region = var.region
}


/*====== GRUPOS DE SEGURIDAD ====== */

/*-------Backend (BE) ------*/
resource "aws_security_group" "backend" {
  name        = "backend"
  description = "Allow Backend traffic"
}
resource "aws_vpc_security_group_ingress_rule" "be_ssh" {
  security_group_id = aws_security_group.bastion.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  to_port           = 22
  ip_protocol       = "TCP"
}
resource "aws_vpc_security_group_ingress_rule" "be_http" {
  security_group_id = aws_security_group.frontend.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  to_port           = 80
  ip_protocol       = "TCP"
}
resource "aws_vpc_security_group_egress_rule" "be_all" {
  security_group_id = aws_security_group.bastion.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}


/*-------Frontend------*/
resource "aws_security_group" "frontend" {
  name        = "frontend"
  description = "SSH and HTTP traffic to Frontend"
}
resource "aws_vpc_security_group_ingress_rule" "fe_ssh" {
  security_group_id        = aws_security_group.frontend.id
  referenced_security_group_id = aws_security_group.bastion.id
  from_port                = 22
  to_port                  = 22
  ip_protocol              = "TCP"
}
resource "aws_vpc_security_group_ingress_rule" "fe_http" {
  security_group_id = aws_security_group.frontend.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  to_port           = 80
  ip_protocol       = "TCP"
}
resource "aws_vpc_security_group_egress_rule" "fe_all" {
  security_group_id = aws_security_group.frontend.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}
