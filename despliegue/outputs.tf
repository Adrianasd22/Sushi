output "frontend_ip" {
    value = aws_eip.frontend_ip.public_ip
}

output "backend_ip" {
    value = aws_eip.backend_ip.public_ip
}
