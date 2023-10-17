import bcrypt

# Función para generar un hash a partir de una contraseña
def generar_hash(contrasena):
    # Generar un hash a partir de la contraseña usando bcrypt
    return bcrypt.hashpw(contrasena.encode('utf-8'), bcrypt.gensalt())

# Función para verificar que una contraseña coincida con un hash
def verificar_contrasena(contrasena, hash_almacenado):
    # Verificar si la contraseña coincide con el hash almacenado
    return bcrypt.checkpw(contrasena.encode('utf-8'), hash_almacenado)

# Contraseña ingresada por el usuario
contrasena_ingresada = "11111-P"  # Reemplaza con la contraseña ingresada

# Generar un hash a partir de la contraseña
hash_generado = generar_hash(contrasena_ingresada)

# Simular almacenamiento del hash en la base de datos
hash_almacenado_en_bd = hash_generado

# Verificar si la contraseña ingresada coincide con el hash almacenado
if verificar_contrasena(contrasena_ingresada, hash_almacenado_en_bd):
    print("La contraseña es válida.")
    # Imprimir el hash generado
    print("Hash generado:", hash_generado)
else:
    print("La contraseña es incorrecta.")
    print("Hash generado:", hash_generado)

