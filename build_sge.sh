#!/bin/bash

# 1 Define a variável de ambiente HOST_IP_ADDRESS
HOST_IP_ADDRESS=$(hostname -I | awk '{print $1}')
export HOST_IP_ADDRESS

cd ~/sge || exit

# 1.1 Cria uma cópia temporária do arquivo sge_app/.env.production
cp sge_app/.env.production sge_app/.env.production.bak

# 2 Atualiza a variável de ambiente em sge_app/.env.production
sed -i "s/^REACT_APP_API_HOST=.*/REACT_APP_API_HOST=$HOST_IP_ADDRESS/" sge_app/.env.production

# Garante a configuração das variáveis
while ! grep -q "^REACT_APP_API_HOST=$HOST_IP_ADDRESS" sge_app/.env.production; do
    sleep 1
done

# 3 Inicializa o SGE
docker-compose up -d --build

# Aguarda a conclusão do comando docker-compose
wait $!

# 4 Restaura o conteúdo original do arquivo sge_app/.env.production
mv sge_app/.env.production.bak sge_app/.env.production
