from flask import Flask, jsonify,send_from_directory
from flask_cors import CORS, cross_origin

from api.users import apiUser
from api.userProfile import apiProfile
from api.send import apiSend
from api.inbox import apiInbox
from api.newPost import apiNewPost



from db import create_app
from db.initialize_db import createDB

app = create_app()
CORS(app ,supports_credentials=True, headers=['Content-Type'], expose_headers=["Access-Control-Allow-Origin", "Access_Token","refresh_token"],)
createDB()


#Kayıt Alanları
app.register_blueprint(apiUser)
app.register_blueprint(apiProfile)
app.register_blueprint(apiInbox)
app.register_blueprint(apiSend)
app.register_blueprint(apiNewPost)


@app.route('/<path:filename>')  
def send_file(filename):  
    print(app.static_folder)
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True, use_debugger=False, use_reloader=True)