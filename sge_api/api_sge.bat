@echo off
cd C:\Users\richl\OneDrive\onedrive\Documentos\MeusProjetos\sge\sge_api
if defined PIPENV_ACTIVE (
    echo Desativando o pipenv shell...
    exit
) else (
    echo Ativando o pipenv shell...
    pipenv shell
)