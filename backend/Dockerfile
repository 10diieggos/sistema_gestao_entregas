FROM python:3.11.3

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo de dependências para o diretório de trabalho
COPY ./requirements.txt /app/requirements.txt

# Instala as dependências do Python
RUN pip3 install --no-cache-dir --upgrade pip && \
    pip3 install --no-cache-dir -r requirements.txt

# Copia o código fonte para o diretório de trabalho
COPY . /app

# Define as variáveis de ambiente
ENV LANG pt_BR.UTF-8

# Expõe a porta 5000 do contêiner
EXPOSE 5000

# Inicia o servidor Flask
CMD ["python3", "app.py"]