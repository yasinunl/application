from flask import Flask, jsonify, Blueprint, request
from db.models import User
from db.models import UserProfile
from flask_jwt_extended import (unset_jwt_cookies,create_refresh_token,
    create_access_token, set_access_cookies, jwt_required, get_jwt_identity,
    )


apiUser = Blueprint('apiUser', __name__, url_prefix='/api/user')

@apiUser.route('/')
def getAll():
    try:
        allUsers = User.get_all()
        users = []
        for user in allUsers:
            users.append({'id': user.id, 'fistname': user.firstname, 'lastname': user.lastname, 'email': user.email, 'password': user.password})
        return jsonify({'users':users, 'success': True})
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message':'There was an error'})

@apiUser.route('/getuser', methods= ["POST"])
@jwt_required()
def getuser():
    identity = get_jwt_identity()
    user = User.get_by_id(identity)
    userObj = {'firstname': user.firstname, 'lastname': user.lastname, 'email': user.email}
    return jsonify({'success': True, 'data': userObj})



@apiUser.route('/create', methods=['POST'])
def create_user():
    try:
        firstname = request.form.get('firstname')
        lastname = request.form.get('lastname')
        email = request.form.get('email')
        password = request.form.get('password')
        User.add_user(firstname=firstname, lastname=lastname, email=email, password=password)
        user_id = User.get_by_email_pass(email=email, password=password)
        UserProfile.add_user_profile(user_id=user_id)
        return jsonify({'success': True, 'message':'User added successfully'})
    except Exception as e:
        print(e)
        return jsonify({'success': False,'message':'There was an error'})
    
@apiUser.route('/login', methods=['POST'])
def login():
    try:
        email = request.form.get('email')
        password = request.form.get('password')
        id = User.get_by_email_pass(email=email, password=password)
        if id is not None:
            accessToken = create_access_token(identity = id)
            resp = jsonify({'success': True,'message':'User logged in successfully'})
            resp.headers = {
                "content-type": "application/json",
                "Access_Token": accessToken,
                'refresh_token': create_refresh_token(identity = id)
            }
            return resp
        else:
            return jsonify({'success': False,'message':'User not found'})
    except Exception as e:
        print(e)
        return jsonify({'success': False,'message':'There was an error'})

@apiUser.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    accessToken = create_access_token(identity=identity)
    resp = jsonify({})
    resp.headers = {
        "content-type": "application/json",
        "Access_Token": accessToken,
        'refresh_token': create_refresh_token(identity = identity)
    }
    return resp

@apiUser.route('/<int:id>', methods=['GET', 'PUT'])
def get_user(id):
    try:
        user = User.get_by_id(id)
        if user is not None:
            if request.method == 'GET':
                userObj = {'firstname': user.firstname, 'lastname': user.lastname, 'email': user.email}
                return jsonify({'success': True, 'user': userObj})
                
            elif request.method == 'PUT':
                firstname = request.form.get('firstname')
                lastname = request.form.get('lastname')
                email = request.form.get('email')
                password = request.form.get('password')
                
                if firstname == None:
                    firstname = user.firstname
                if lastname == None:
                    lastname = user.lastname
                if email == None:
                    email = user.email
                if password == None:
                    password = user.password
                User.update_user(id, first_name=firstname, last_name=lastname, email=email, password=password)
                return jsonify({'success': True, 'message':'Updated user successfully'})
        else:
            return jsonify({'success': False,'message': 'User not found'})
    except Exception as e:
        print(e)
        return jsonify({'success': False,'message': 'There was an error'})

@apiUser.route('/active_user/<int:id>', methods=['GET'])
def active_user(id):
    try:
        User.activate_user(id)
        return jsonify({'success': True,'message':'User activated successfully'})
    except Exception as e:
        print(e)
        return jsonify({'success': False,'message':'There was an error'})

@apiUser.route('/deactivate_user/<int:id>', methods=['GET'])
def deactivate_user(id):
    try:
        User.deactivate_user(id)
        return jsonify({'success': True,'message':'User deactivated successfully'})
    except Exception as e:
        print(e)
        return jsonify({'success': False,'message':'There was an error'})
