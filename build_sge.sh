#!/bin/bash

# 1 Define a variável de ambiente HOST_IP_ADDRESS
HOST_IP_ADDRESS=$(hostname -I | awk '{print $1}')
export HOST_IP_ADDRESS

cd ~/sge || exit

# 1.1 Cria uma cópia temporária dos arquivos sge_app/.env.production, sge_api/.container.env e nginx/nginx.conf
cp sge_app/.env.production sge_app/.env.production.bak
cp sge_api/.container.env sge_api/.container.env.bak
cp nginx/nginx.conf nginx/nginx.conf.bak

# 2 Atualiza a variável de ambiente em sge_app/.env.production, sge_api/.container.env e nginx/nginx.conf
sed -i "s/^REACT_APP_API_HOST=.*/REACT_APP_API_HOST=$HOST_IP_ADDRESS\/api/" sge_app/.env.production
sed -i "s/^ALLOWED_ORIGINS=.*/ALLOWED_ORIGINS=http:\/\/$HOST_IP_ADDRESS/" sge_api/.container.env
sed -i "s/^  server_name .*/  server_name $HOST_IP_ADDRESS;/" nginx/nginx.conf

# Garante a configuração das variáveis
while ! grep -q "^REACT_APP_API_HOST=$HOST_IP_ADDRESS" sge_app/.env.production || \
      ! grep -q "^ALLOWED_ORIGINS=http://$HOST_IP_ADDRESS" sge_api/.container.env || \
      ! grep -q "^  server_name $HOST_IP_ADDRESS;" nginx/nginx.conf; do
    sleep 1
done

# 3 Inicializa o SGE
docker-compose up -d --build

# Aguarda a conclusão do comando docker-compose
wait $!

# 4 Restaura o conteúdo original dos arquivos sge_app/.env.production, sge_api/.container.env e nginx/nginx.conf
mv sge_app/.env.production.bak sge_app/.env.production
mv sge_api/.container.env.bak sge_api/.container.env
mv nginx/nginx.conf.bak nginx/nginx.conf
