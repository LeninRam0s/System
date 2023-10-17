import os
from datetime import datetime
import zipfile
from threading import Timer

def respaldar_base_de_datos():
    # Obtenemos la fecha actual
    fecha = datetime.today().strftime('%Y_%m_%d_%H_%M')
    
    # Nombre del archivo de respaldo
    respaldo = f"C:\\CopiaBD\\SystemPNC_{fecha}.sql"
    
    # Ubicacion del mysqldump
    pathBase = "C:\\xampp\\mysql\\bin\\mysqldump.exe"
    
    # Nombre del archivo comprimido
    archivoZip = f"C:\\CopiaBD\\SystemPNC_{fecha}.zip"
    
    try:
        # Usuario = root, y la base de datos = systempnc
        os.popen(f"{pathBase} -u root --routines --triggers systempnc > {respaldo}")
        print(f"Base respaldada correctamente en {respaldo}")
    except Exception as e:
        print("Ocurrió un error. No se pudo respaldar la base de datos.")
        print("Error:", str(e))
        return
    
    print('Comprimendo el Respaldo, Esperando...')
    
    # Comprimir respaldo
    def comprimir():
        # Comprimimos el archivo obtenido
        with zipfile.ZipFile(archivoZip, 'w') as ArchivoZip:
            ArchivoZip.write(respaldo, compress_type=zipfile.ZIP_DEFLATED)
        print("Archivo comprimido en:", archivoZip)
    
    t = Timer(3, comprimir)  
    t.start()

# Llamada a la función para realizar el respaldo y compresión
respaldar_base_de_datos()
