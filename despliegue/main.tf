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

/* GRUPOS DE SEGURIDAD */

/* Frontend */
resource "aws_security_group" "frontend_sg" {
  name = "frontend-sg"
}

resource "aws_vpc_security_group_ingress_rule" "frontend_http" {
  security_group_id = aws_security_group.frontend_sg.id
  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 80
  to_port     = 80
  ip_protocol = "tcp"
}
resource "aws_vpc_security_group_ingress_rule" "frontend_https" {
  security_group_id = aws_security_group.frontend_sg.id
  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 443
  to_port     = 443
  ip_protocol = "tcp"
}
resource "aws_vpc_security_group_ingress_rule" "frontend_ssh" {
  security_group_id = aws_security_group.frontend_sg.id
  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 22
  to_port     = 22
  ip_protocol = "tcp"
}
resource "aws_vpc_security_group_egress_rule" "frontend_out" {
  security_group_id = aws_security_group.frontend_sg.id
  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "-1"
}

/* Backend */
resource "aws_security_group" "backend_sg" {
  name = "backend-sg"
}

resource "aws_vpc_security_group_ingress_rule" "backend_ssh" {
  security_group_id = aws_security_group.backend_sg.id
  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 22
  to_port     = 22
  ip_protocol = "tcp"
}

resource "aws_vpc_security_group_ingress_rule" "backend_api" {
  security_group_id = aws_security_group.backend_sg.id
  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 8080
  to_port     = 8080
  ip_protocol = "tcp"
}

resource "aws_vpc_security_group_ingress_rule" "backend_mysql" {
  security_group_id = aws_security_group.backend_sg.id
  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 3306
  to_port     = 3306
  ip_protocol = "tcp"
}

resource "aws_vpc_security_group_egress_rule" "backend_out" {
  security_group_id = aws_security_group.backend_sg.id
  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "-1"
}

/* FRONTEND EC2 */
resource "aws_instance" "frontend" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [
    aws_security_group.frontend_sg.id
  ]

  user_data = file("scripts/frontend.sh")

  tags = {
    Name = "frontend-sushi"
  }
}

resource "aws_eip" "frontend_ip" {
  instance = aws_instance.frontend.id
}

/* BACKEND EC2 */
resource "aws_instance" "backend" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [
    aws_security_group.backend_sg.id
  ]

  user_data = file("scripts/backend.sh")

  tags = {
    Name = "backend-sushi"
  }
}

resource "aws_eip" "backend_ip" {
  instance = aws_instance.backend.id
}

# S3 BUCKET PARA IMÁGENES

resource "aws_s3_bucket" "imagenes" {
  bucket = "sushi-imagenes-tfg"  

  tags = {
    Name = "sushi-imagenes-tfg"
  }
}

resource "aws_s3_bucket_public_access_block" "imagenes" {
  bucket = aws_s3_bucket.imagenes.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "imagenes_public" {
  bucket = aws_s3_bucket.imagenes.id
  depends_on = [aws_s3_bucket_public_access_block.imagenes]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.imagenes.arn}/*"
      }
    ]
  })
}

/* AMI UBUNTU */
data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  owners = ["099720109477"]
}