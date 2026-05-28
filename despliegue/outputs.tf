output "frontend_ip" {
    value = aws_eip.frontend_ip.public_ip
}

output "backend_ip" {
    value = aws_eip.backend_ip.public_ip
}

output "s3_bucket_url" {
  value = "https://${aws_s3_bucket.imagenes.bucket}.s3.${var.region}.amazonaws.com"
}

output "SushiMiyu-Angular" {
    value = "http://http://sushimiyu.duckdns.org/"
}