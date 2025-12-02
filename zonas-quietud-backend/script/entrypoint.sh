#!/bin/sh

# 1. Crear la carpeta keys si no existe
mkdir -p keys

# 2. Decodificar la llave PRIVADA desde la variable y crear el archivo
if [ -n "$JWT_PRIVATE_KEY_BASE64" ]; then
    echo "$JWT_PRIVATE_KEY_BASE64" | base64 -d > keys/private_key.pem
    echo "✅ Llave Privada generada exitosamente"
fi

# 3. Decodificar la llave PÚBLICA desde la variable y crear el archivo
if [ -n "$JWT_PUBLIC_KEY_BASE64" ]; then
    echo "$JWT_PUBLIC_KEY_BASE64" | base64 -d > keys/public_key.pem
    echo "✅ Llave Pública generada exitosamente"
fi

# 4. Arrancar la aplicación Java (pasa el control al comando original)
exec "$@"