
class UserModel:
    def __init__(self, db_connection):
        self.db = db_connection
        self.cursor = self.db.cursor()

    # Autenticacion del usuario
    def authenticate_user(self, nip, password):
        query = "SELECT * FROM usuarios WHERE nip = %s AND pass = %s"
        self.cursor.execute(query, (nip, password))
        user = self.cursor.fetchone()
        return user
    
    # Listar todos los usuarios
    def get_all_users(self):
        query = "SELECT * FROM usuarios"
        self.cursor.execute(query)
        users = self.cursor.fetchall()
        return users

    # Buscar usuario por NIP
    def get_user_by_nip(self, nip):
        query = "SELECT * FROM usuarios WHERE nip = %s"
        self.cursor.execute(query, (nip,))
        user = self.cursor.fetchone()
        return user
    
    # Crear usuario
    def create_user(self, user_data):

        query = "INSERT INTO usuarios (nip, primer_nombre, segundo_nombre, tercer_nombre, primer_apellido, " \
                "segundo_apellido, telefono, correo, pass, id_rol, token, id_estatus, codigo_verificacion) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'Halcon0x0#', %s, 'H0x0#', %s, 'H0x0#')"
        self.cursor.execute(query, user_data)
        self.db.commit()
        return self.cursor.lastrowid
    
    # Actualziar usuario
    def update_user(self, nip, user_data):
        query = "UPDATE usuarios SET primer_nombre = %s, segundo_nombre = %s, tercer_nombre = %s, " \
                "primer_apellido = %s, segundo_apellido = %s, telefono = %s, correo = %s, " \
                "pass = %s, id_rol = %s, token = %s, id_estatus = %s, avatar = %s, intentos_fallidos = %s, " \
                "codigo_verificacion = %s WHERE nip = %s"
        user_data.append(nip)
        self.cursor.execute(query, user_data)
        self.db.commit()
        return self.cursor.rowcount

    # Eliminar usuario
    def delete_user(self, nip):
        query = "DELETE FROM usuarios WHERE nip = %s"
        self.cursor.execute(query, (nip,))
        self.db.commit()
        return self.cursor.rowcount

    