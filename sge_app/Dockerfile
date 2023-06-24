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

# Crie uma versão de produção do aplicativo
RUN npm run build

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Inicie a aplicação em modo de produção usando o script personalizado start:prod
CMD ["npm", "run", "start:prod"]