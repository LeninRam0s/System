from flask import Flask, render_template, redirect, request, Response, session, flash, url_for
from config import config
from flask_mysqldb import MySQL
import bcrypt
from werkzeug.security import check_password_hash
from database.respaldo import respaldar_base_de_datos

# Llamada a la función para realizar el respaldo y compresión
#respaldar_base_de_datos()



app = Flask(__name__, static_url_path='/static')

# Conexion BD
try:
    # Configuración de MySQL
    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = ''
    app.config['MYSQL_DB'] = 'systempnc'
    app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
    
    # Inicializar la extensión MySQL
    mysql = MySQL(app)
except Exception as e:
    print(f"Error al configurar MySQL: {str(e)}")
# Fin conexion bd


# RUTAS
   
@app.route('/')
def index():
    return render_template('./auth/viewLogin.html')

@app.route('/inicio')
def inicio():
    return render_template('./menu/inicio.html')

@app.route('/admin')
def admin():
    return render_template('auth/admin.html')

@app.route('/usuarios', methods=['GET', 'POST'])
def usuarios():
    return render_template('./auth/usuarios.html')

@app.route('/homicidios', methods=['GET', 'POST'])
def homicidios():
    return render_template('./menu/homicidios.html')

@app.route('/lesionados', methods=['GET', 'POST'])
def lesionados():
    return render_template('./menu/lesionados.html')

@app.route('/graficos', methods=['GET', 'POST'])
def motocicletas():
    return render_template('./menu/graficos.html')

@app.route('/usr1')
def usr1():
    return render_template('auth/user1.html')

@app.route('/usr2')
def usr2():
    return render_template('auth/user2.html')

#CRUD VIDA
#Listar ✅
@app.route('/vida')
def vida():
    cursor = mysql.connection.cursor()
    cursor.callproc('ListarVida')
    vehiculo = cursor.fetchall()
    cursor.close()
   
    # print(data[0])
    # Confirmar la transacción
    mysql.connection.commit() 
    
    return render_template('./auth/registrarVida.html', vidas = vehiculo)

# Registrar vida ✅
@app.route('/addVida', methods=['POST'])
def addVida():
    if request.method == 'POST':
        # Obtener los datos del formulario
        fecha = request.form['txtFecha']
        hora = request.form['txtHora']
        direccion = request.form['txtDireccion']
        coordenadas = request.form['txtCoordenadas']
        nombre = request.form['txtNombre']
        edad = request.form['txtEdad']
        sexo = request.form['txtSexo']
        delito = request.form['txtDelito']
        arma = request.form['txtArma']
        nacionalidad = request.form['txtNacionalidad']
        movil = request.form['txtMovil']

        # Llama al procedimiento almacenado para crear el usuario
        cursor = mysql.connection.cursor()
        cursor.callproc('CrearVida', (fecha, hora, direccion, coordenadas,
                                         nombre, edad, sexo, delito, arma,
                                         nacionalidad, movil))
        cursor.close()  # Cierra el cursor después de usarlo
        # Confirmar la transacción
        mysql.connection.commit()

        flash('Guardado Exitosamente!')
        return redirect(url_for('vida'))

#Obtener victimas por id
@app.route('/obtenerVida/<id>')
def obtenerVida(id):
    cursor = mysql.connection.cursor()
    cursor.callproc('ObtenerVida', (id,))
    data = cursor.fetchall()
    cursor.close()
    # Confirmar la transacción
    mysql.connection.commit()
    return render_template('auth/editarVida.html', vidas = data[0])

#Editar vida
@app.route('/editarVida/<id>', methods=['POST'])
def editarVida(id):
    if request.method == 'POST':
        # Obtener los datos del formulario
        fecha = request.form['txtFecha']
        hora = request.form['txtHora']
        direccion = request.form['txtDireccion']
        coordenadas = request.form['txtCoordenadas']
        nombre = request.form['txtNombre']
        edad = request.form['txtEdad']
        sexo = request.form['txtSexo']
        delito = request.form['txtDelito']
        arma = request.form['txtArma']
        nacionalidad = request.form['txtNacionalidad']
        movil = request.form['txtMovil']

        # Llama al procedimiento almacenado para crear el usuario
        cursor = mysql.connection.cursor()
        cursor.callproc('ActualizarVida', (id, fecha, hora, direccion, coordenadas,
                                         nombre, edad, sexo, delito, arma,
                                         nacionalidad, movil))
        cursor.close()  # Cierra el cursor después de usarlo
        # Confirmar la transacción
        mysql.connection.commit()
    flash('Actualizado con Exito')
    #return render_template('auth/registrarUser.html')
    return redirect(url_for('vida'))

# Eliminar vida✅
@app.route('/eliminarVida/<string:id>')
def eliminarVida(id):
    # Aquí estás llamando al procedimiento almacenado para eliminar un vehiculo por su ID
    cursor = mysql.connection.cursor()
    cursor.callproc('EliminarVida', (id,))
    cursor.close()
    # Confirmar la transacción
    mysql.connection.commit()   
    flash('Eliminado Satisfactoriamente ✅')
    return redirect('/vida')  # Redirigir a la página de registro de vehiculos


#CRUD VEHICULOS Y MOTOCICLETAS
@app.route('/vehiculos')
def vehiculos():
    cursor = mysql.connection.cursor()
    cursor.callproc('ObtenerVehiculos')
    vehiculo = cursor.fetchall()
    cursor.close()
   
    # print(data[0])
    # Confirmar la transacción
    mysql.connection.commit() 
    
    return render_template('./auth/registrarVehiculos.html', vehiculos = vehiculo)

# Registrar vehiculos
@app.route('/addV', methods=['POST'])
def addV():
    if request.method == 'POST':
        # Obtener los datos del formulario
        fecha = request.form['txtFecha']
        hora = request.form['txtHora']
        direccion = request.form['txtDireccion']
        coordenadas = request.form['txtCoordenadas']
        nombre = request.form['txtNombre']
        edad = request.form['txtEdad']
        sexo = request.form['txtSexo']
        delito = request.form['txtDelito']
        tipo = request.form['txtVehiculo']
        placa = request.form['txtPlaca']
        modelo = request.form['txtModelo']
        marca = request.form['txtMarca']
        color = request.form['txtColor']

        # Llama al procedimiento almacenado para crear el usuario
        cursor = mysql.connection.cursor()
        cursor.callproc('RegistrarVehiculos', (fecha, hora, direccion, coordenadas,
                                         nombre, edad, sexo, delito, tipo,
                                         placa, modelo, marca, color))
        cursor.close()  # Cierra el cursor después de usarlo
        # Confirmar la transacción
        mysql.connection.commit()

        flash('Vehículo Guardado Exitosamente!')
        return redirect(url_for('vehiculos'))

#Obtener victimas por id
@app.route('/obtenerV/<id>')
def obtenerV(id):
    cursor = mysql.connection.cursor()
    cursor.callproc('ObtenerVehiculoPorId', (id,))
    data = cursor.fetchall()
    cursor.close()
    # Confirmar la transacción
    mysql.connection.commit()
    return render_template('auth/editarVehiculos.html', vehiculos = data[0])

#Editar vehiculos
@app.route('/editarV/<id>', methods=['POST'])
def editarV(id):
    if request.method == 'POST':
        # Obtener los datos del formulario
        fecha = request.form['txtFecha']
        hora = request.form['txtHora']
        direccion = request.form['txtDireccion']
        coordenadas = request.form['txtCoordenadas']
        nombre = request.form['txtNombre']
        edad = request.form['txtEdad']
        sexo = request.form['txtSexo']
        delito = request.form['txtDelito']
        tipo = request.form['txtVehiculo']
        placa = request.form['txtPlaca']
        modelo = request.form['txtModelo']
        marca = request.form['txtMarca']
        color = request.form['txtColor']

        # Llama al procedimiento almacenado para crear el usuario
        cursor = mysql.connection.cursor()
        cursor.callproc('ActualizarVehiculo', (id, fecha, hora, direccion, coordenadas,
                                         nombre, edad, sexo, delito, tipo,
                                         placa, modelo, marca, color))
        cursor.close()  # Cierra el cursor después de usarlo
        # Confirmar la transacción
        mysql.connection.commit()
    flash('Vehiculo Actualizado con Exito')
    #return render_template('auth/registrarUser.html')
    return redirect(url_for('vehiculos'))

# Eliminar vehiculo
@app.route('/eliminarV/<string:id>')
def eliminarV(id):
    # Aquí estás llamando al procedimiento almacenado para eliminar un vehiculo por su ID
    cursor = mysql.connection.cursor()
    cursor.callproc('EliminarVehiculo', (id,))
    cursor.close()
    # Confirmar la transacción
    mysql.connection.commit()   
    flash('Vehiculo Eliminado Satisfactoriamente ✅')
    return redirect('/vehiculos')  # Redirigir a la página de registro de vehiculos

#CRUD USUARIOS
# Carga del formulario
@app.route('/registroU')
def registroU():
    # Aquí estás llamando al procedimiento almacenado para verificar la existencia del NIP
    cursor = mysql.connection.cursor()
    cursor.callproc('ListarUsuarios')
    data = cursor.fetchall()
    cursor.close()      
    mysql.connection.commit()
    return render_template('auth/registrarUser.html', usuarios = data)

# Registrar usuario
@app.route('/addU', methods=['POST'])
def addU():
    if request.method == 'POST':
        nip = request.form['txtNIP']
        primerNombre = request.form['txtPrimerNombre']
        segundoNombre = request.form['txtSegundoNombre']
        tercerNombre = request.form['txtTercerNombre']
        primerApellido = request.form['txtPrimerApellido']
        segundoApellido = request.form['txtSegundoApellido']
        telefono = request.form['txtTelefono']
        correo = request.form['txtCorreo']
        rol = request.form['txtRol']
        estatus = request.form['txtEstatus']
        
        # Aquí estás llamando al procedimiento almacenado para verificar la existencia del NIP
        cursor = mysql.connection.cursor()
        cursor.callproc('VerificarNIP', (nip,))
        result = cursor.fetchall()
        cursor.close()

        # Comprueba si el NIP ya existe
        if result:
            flash('El usuario con NIP {} ya existe.'.format(nip))
            return redirect('/registroU')
        else:
            # El NIP no existe, procedemos a registrarlo

            # Establece la contraseña predeterminada como el NIP
            contrasena = nip

            # Encripta la contraseña usando bcrypt
            hashed_password = bcrypt.hashpw(contrasena.encode('utf-8'), bcrypt.gensalt())

            # Llama al procedimiento almacenado para crear el usuario
            cursor = mysql.connection.cursor()
            cursor.callproc('CrearUsuario', (nip, primerNombre, segundoNombre, tercerNombre,
                                            primerApellido, segundoApellido, telefono, correo,
                                            hashed_password, rol, estatus))
            cursor.close()  # Cierra el cursor después de usarlo

            # Confirmar la transacción
            mysql.connection.commit()

            print("NIP:", nip)
            print("Contraseña:", contrasena)
            print("Hashed Password:", hashed_password)

            flash('Usuario Guardado Exitosamente!')
            return redirect(url_for('registroU'))

#Obtener usuario por NIP
@app.route('/obtenerU/<nip>')
def obtenerU(nip):
    cursor = mysql.connection.cursor()
    cursor.callproc('ObtenerUsuarioEdit', (nip,))
    data = cursor.fetchall()
    cursor.close()
    # Confirmar la transacción
    mysql.connection.commit()
    return render_template('auth/editarUser.html', usuario = data[0])

#Editar usuario
@app.route('/editarU/<id>', methods=['POST'])
def editarU(id):
    if request.method == 'POST':
        nombre1 = request.form['txtPrimerNombre']
        nombre2 = request.form['txtSegundoNombre']
        nombre3 = request.form['txtTercerNombre']
        apellido1 = request.form['txtPrimerApellido']
        apellido2 = request.form['txtSegundoApellido']
        tel = request.form['txtTelefono']
        mail = request.form['txtCorreo']
        rol = request.form['txtRol']
        estatus = request.form['txtEstatus']
        clave = request.form['txtPassword']
        
        # Verifica si la clave está vacía
        if not clave:
            # Genera el hash usando el id como contraseña
            hashed_password = bcrypt.hashpw(id.encode('utf-8'), bcrypt.gensalt())
        else:
            # Genera el hash usando la clave proporcionada
            hashed_password = bcrypt.hashpw(clave.encode('utf-8'), bcrypt.gensalt())

        cursor = mysql.connection.cursor()

        # Llamada al procedimiento almacenado para obtener un usuario por su NIP
        cursor.callproc('ActualizarUsuario', (id, nombre1, nombre2, nombre3, apellido1, apellido2, tel, mail, hashed_password, rol, estatus))
        data = cursor.fetchall()
        cursor.close()
        # Confirmar la transacción
        mysql.connection.commit()
    flash('Usuario Actualizado con Exito')
    #return render_template('auth/registrarUser.html')
    return redirect(url_for('registroU'))

# Eliminar usuario
@app.route('/eliminarU/<string:id>')
def eliminarU(id):
    # Aquí estás llamando al procedimiento almacenado para eliminar un usuario por su ID
    cursor = mysql.connection.cursor()
    cursor.callproc('EliminarUsuario', (id,))
    cursor.close()
    # Confirmar la transacción
    mysql.connection.commit()   
    flash('Usuario Eliminado Satisfactoriamente')
    return redirect('/registroU')  # Redirigir a la página de registro de usuarios o a donde desees

# FUNCION LOGIN
@app.route('/acceso-login', methods=['POST'])
def login():
    if request.method == 'POST' and 'txtNIP' in request.form and 'txtPassword' in request.form:
        _nip = request.form['txtNIP']
        _password = request.form['txtPassword']

        cur = mysql.connection.cursor()
        cur.execute('SELECT pass FROM usuarios WHERE nip = %s', (_nip,))
        hashed_password = cur.fetchone()

        if hashed_password and bcrypt.checkpw(_password.encode('utf-8'), hashed_password['pass'].encode('utf-8')):
            # La contraseña coincide
            session['logueado'] = True
            session['nip'] = _nip
            return render_template('./auth/graficos.html')
        else:
            # La contraseña no coincide o el usuario no existe
            return render_template('./auth/viewLogin.html', mensaje="NIP o Contraseña Incorrecta")

# Fin de la Función Login
if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.secret_key="virus_11"
    app.run()