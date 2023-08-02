#!/bin/bash
set -e

# Função para criar o banco de dados
create_database() {
  echo "Creating database: $POSTGRES_DB"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE "$POSTGRES_DB";
    GRANT ALL PRIVILEGES ON DATABASE "$POSTGRES_DB" TO "$POSTGRES_USER";
EOSQL
  echo "Database created successfully"
}

# Executa a função de criação do banco se a variável de ambiente POSTGRES_DB estiver definida
if [ -n "$POSTGRES_DB" ]; then
  create_database
fi

# Inicializa o serviço do PostgreSQL
exec "$@"
