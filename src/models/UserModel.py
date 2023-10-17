
from .entities.User import User

@classmethod
class ModelUser():
    def login(self, db,user):
        try:
            cur = db.connection.cursor()
            sql = "SELECT nip, pass, CONCAT(primer_nombre, ' ', primer_apellido) AS fullname FROM usuarios WHERE nip = '{}}'".format(user.nip)
            cursor.execute(sql)
            row=cursor.fetchone()
            if row != None:
                user=User(row[0],User.check_password(row[1],user.password),row[3])
                return user
            else:
                return None
        except Exception as ex:
            raise Exception(ex)