#!/bin/bash

# 1 Define a variável de ambiente HOST_IP_ADDRESS
export HOST_IP_ADDRESS=$(hostname -I | awk '{print $1}')

cd ~/sge

# 2 Atualiza a variável de ambiente HOST_IP_ADDRESS em sge_app/.env.production
docker-compose up -d --no-deps --build scripts

# Aguarda até que o contêiner do serviço scripts pare de ser executado
while [ $(docker-compose ps | grep scripts | grep -c "Up") -eq 1 ]; do
    sleep 1
done

# 3 Inicializa o SGE (exceto o serviço scripts)
docker-compose up -d --build $(docker-compose config --services | grep -v scripts)
