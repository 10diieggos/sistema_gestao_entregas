#!/bin/bash

# Pergunta ao usuário qual é o sistema operacional do host
read -p "Qual é o sistema operacional do host? [windows/linux] " HOST_OS

if [ "$HOST_OS" == "windows" ]; then
  # Define a pasta atual como a pasta de trabalho (Windows)
  WORKDIR=$(echo $PWD | sed 's/\\/\//g' | sed 's/://')
else
  # Define a pasta atual como a pasta de trabalho (Linux)
  WORKDIR=$(pwd)
fi

# Pergunta ao usuário se a execução é na máquina de origem ou destino
read -p "Esta é a máquina de origem ou destino? [origem/destino] " MACHINE_TYPE

if [ "$MACHINE_TYPE" == "origem" ]; then
  # Execução na máquina de origem

  # Mostra a saída do comando docker volume ls
  echo "Volumes disponíveis:"
  docker volume ls

  # Pergunta ao usuário o nome do volume a ser transferido
  read -p "Digite o nome do volume a ser transferido: " VOLUME_NAME

  # Verifica se o volume existe
  if docker volume ls | grep -q "$VOLUME_NAME"; then
    # O volume existe, continua com a operação

    # Cria um diretório temporário para armazenar os dados do volume
    mkdir $WORKDIR/$VOLUME_NAME

    # Copia os dados do volume para o diretório temporário
    docker run --rm -v $VOLUME_NAME:/data -v $WORKDIR/$VOLUME_NAME:/backup alpine cp -a /data/. /backup/

    # Cria um arquivo tar contendo todos os dados do volume
    tar -czf $WORKDIR/$VOLUME_NAME.tar -C $WORKDIR/$VOLUME_NAME .

    # Remove o diretório temporário
    rm -rf $WORKDIR/$VOLUME_NAME

    # Informa ao usuário que o arquivo tar foi criado com sucesso
    echo "Arquivo tar criado com sucesso em $WORKDIR/$VOLUME_NAME.tar"
    echo "Transfira este arquivo para a máquina de destino e execute este script novamente na máquina de destino."
  else
    # O volume não existe, informa ao usuário e encerra o script
    echo "O volume $VOLUME_NAME não existe nesta máquina. Encerrando o script."
    exit 1
  fi
elif [ "$MACHINE_TYPE" == "destino" ]; then
  # Execução na máquina de destino

  # Pergunta ao usuário o nome do volume a ser transferido
  read -p "Digite o nome do volume a ser transferido: " VOLUME_NAME

  # Verifica se o arquivo tar está presente na pasta de trabalho
  if [ -f "$WORKDIR/$VOLUME_NAME.tar" ]; then
    # O arquivo tar está presente, continua com a operação

    # Verifica se um volume Docker com o mesmo nome já existe na máquina de destino
    if docker volume ls | grep -q "$VOLUME_NAME"; then
      # O volume já existe, pergunta ao usuário como proceder
      read -p "Um volume com o nome $VOLUME_NAME já existe nesta máquina. Deseja sobrescrevê-lo, criar um volume com outro nome ou cancelar a operação? [sobrescrever/outro_nome/cancelar] " VOLUME_ACTION

      if [ "$VOLUME_ACTION" == "sobrescrever" ]; then
        # Sobrescreve o volume existente
        echo "Sobrescrevendo o volume existente..."
      elif [ "$VOLUME_ACTION" == "outro_nome" ]; then
        # Cria um volume com outro nome, pergunta ao usuário o novo nome do volume
        read -p "Digite o novo nome do volume: " NEW_VOLUME_NAME
        VOLUME_NAME=$NEW_VOLUME_NAME
      else
        # Cancela a operação e encerra o script
        echo "Operação cancelada pelo usuário. Encerrando o script."
        exit 0
      fi
    fi

    # Cria um volume Docker com o mesmo nome do volume que você deseja transferir (ou com um novo nome, se especificado pelo usuário)
    docker volume create $VOLUME_NAME

    if [ "$HOST_OS" == "windows" ]; then
      # Descompacta o arquivo tar dentro do diretório do volume Docker que acabou de ser criado (Windows)
      tar -xzf $WORKDIR/$VOLUME_NAME.tar -C C:\ProgramData\Docker\volumes\$VOLUME_NAME\_data --strip 1
    else
      # Descompacta o arquivo tar dentro do diretório do volume Docker que acabou de ser criado (Linux)
      tar -xzf $WORKDIR/$VOLUME_NAME.tar -C /var/lib/docker/volumes/$VOLUME_NAME/_data --strip 1
    fi

    # Informa ao usuário que a operação foi concluída com sucesso
    echo "Volume Docker transferido com sucesso para esta máquina."
  else
    # O arquivo tar não está presente, informa ao usuário e encerra o script
    echo "O arquivo tar $WORKDIR/$VOLUME_NAME.tar não foi encontrado nesta máquina. Encerrando o script."
    exit 1
  fi
else
  # Tipo de máquina inválido, informa ao usuário e encerra o script.
  echo "Tipo de máquina inválido. Encerrando o script."
  exit 1
fi
