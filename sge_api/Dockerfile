FROM python:3.11.3

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo de dependências para o diretório de trabalho
COPY ./requirements.txt /app/requirements.txt

# Instala as dependências do Python
RUN pip3 install --no-cache-dir --upgrade pip && \
    pip3 install --no-cache-dir -r requirements.txt \
    pip install gunicorn

# Copia o código fonte para o diretório de trabalho
COPY . /app

# Copia o arquivo .container.env para dentro do container e renomeia para .env
COPY ./.container.env /app/.env

# Expõe a porta 5000 do contêiner
EXPOSE 5000

# Inicia o servidor Flask
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app"]