FROM ubuntu:latest

WORKDIR /app

# Copia os arquivos para a imagem
COPY . .

RUN apt-get update && apt-get install -y iproute2

# Torna todos os scripts na pasta /app executáveis
RUN find /app -type f -name "*.sh" -exec chmod +x {} \;

# Define o comando padrão da imagem para executar todos os scripts na pasta /app
CMD find /app -type f -name "*.sh" -exec {} \;

#Este Dockerfile copia todos os arquivos do contexto de construção para a imagem na pasta /app, usa o comando find para localizar todos os arquivos com a extensão .sh na pasta /app e usa o comando chmod para torná-los executáveis. Em seguida, ele define o comando padrão da imagem para usar o comando find novamente para localizar todos os arquivos com a extensão .sh na pasta /app e executá-los.

#Observe que este Dockerfile executará todos os scripts na pasta /app em ordem alfabética. Se você precisar controlar a ordem em que os scripts são executados, pode modificar o comando CMD para especificar a ordem desejada.