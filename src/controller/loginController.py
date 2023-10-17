from flask import Flask, render_template, request, redirect, url_for
from models import UserModel

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', method=['POST'])
def user():
    username=request.form['txtNIP']
    password=request.form['txtPassword']

    model = UserModel()
    user = model.authenticate_user(username, password)

    if user:
        #Exitoso
        return f'Login exitoso para el usuario: {username[1]}'
    else:
        return 'Login fallido, Verifica tus credenciales'
    if __name__ == "__main__":
        app.run(debug=True)