#!/bin/bash

# Recupera o endereço IP do host
IP_ADDRESS=$HOST_IP_ADDRESS

# Cria um arquivo temporário
temp_file=$(mktemp)

# Copia o conteúdo do arquivo .env.production para o arquivo temporário
cat /app/.env.production > $temp_file

# Atualiza a variável REACT_APP_API_HOST no arquivo temporário
sed -i "s/^REACT_APP_API_HOST=.*/REACT_APP_API_HOST=$IP_ADDRESS/" $temp_file

# Copia o conteúdo do arquivo temporário de volta para o arquivo .env.production
cat $temp_file > /app/.env.production

# Remove o arquivo temporário
rm $temp_file
