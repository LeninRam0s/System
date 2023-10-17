from flask import Flask, render_template, request, redirect, url_for
from models import UserModel

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('viewVida.html')

@app.route('/vida', method=['POST'])
def vida():
    username=request.form['txtNIP']
    password=request.form['txtPassword']

    model = UserModel()
    vida = model.authenticate_user(username, password)

    if vida:
        #Exitoso
        return f'Login exitoso para el usuario: {username[1]}'
    else:
        return 'Login fallido, Verifica tus credenciales'
    if __name__ == "__main__":
        app.run(debug=True)