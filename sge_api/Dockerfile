FROM python:3.11.3

# Instala o pipenv
RUN pip install --upgrade pip && \
    pip install --no-cache-dir pipenv

# Define o diretório de trabalho
WORKDIR /app

# Copia o Pipfile e o Pipfile.lock para o diretório de trabalho
COPY ./Pipfile /app/Pipfile
COPY ./Pipfile.lock /app/Pipfile.lock

# Instala as dependências do Python usando o pipenv
RUN pipenv install --system --deploy

# Copia o código fonte para o diretório de trabalho
COPY . /app

# Copia o arquivo .container.env para dentro do container e renomeia para .env
COPY ./.container.env /app/.env

# Expõe a porta 5000 do contêiner
EXPOSE 5000

# Inicia o servidor Flask
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app"]