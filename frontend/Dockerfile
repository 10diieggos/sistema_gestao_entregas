# local deste arquivo: ./frontend/Dockerfile

# Use a imagem oficial do Node.js como base
FROM node:18.16.0

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Inicie a aplicação
CMD ["npm", "start"]
