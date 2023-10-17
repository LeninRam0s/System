class DevelopmentConfig:
    DEBUG = True
    
config = {
    'development': DevelopmentConfig
    

}


# Configuración de MySQL

MYSQL_HOST = "localhost"
MYSQL_USER = "root"
MYSQL_PASSWORD = ""
MYSQL_DB = "systempnc"
MYSQL_CURSORCLASS = "DictCursor"
    