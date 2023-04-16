from flask import Flask, jsonify, Blueprint, request
from db.models import SendMessage, Inbox, NewPost, UserProfile, User
from datetime import datetime
from flask_jwt_extended import (unset_jwt_cookies,
    create_access_token, set_access_cookies, jwt_required, get_jwt_identity)
timestamp = 1528797322
date_time = datetime.fromtimestamp(timestamp)
apiSend = Blueprint('apiSend', __name__, url_prefix='/api/send')

@apiSend.route('/', methods=['GET'])
def getMessage():
    AllMessages = SendMessage.query.all()
    messages = []
    for message in AllMessages:
        messages.append({
            'id': message.id,
            'from_user_id': message.from_user_id,
            'to_user_id': message.to_user_id,
            'title': message.title,
            'description': message.description,
            'file': message.file,
            'date': message.date,
            'active': message.active
        })
    return jsonify({'success':True, 'data':messages})

@apiSend.route('/add', methods=['POST'])
@jwt_required()
def postMessage():
    try:
        id = get_jwt_identity()
        messageID = request.form.get("messageID")
        nameOfMessage = request.form.get('nameOfMessage')
        if nameOfMessage == 'job':
            to_user_id = NewPost.get_post_by_id(messageID).user_id
        else:
            to_user_id = UserProfile.get_by_id(messageID).user_id
        title = request.form.get('title')
        description = request.form.get('description')
        from_user_id = id
        file = ""
        date = date_time.strftime("%m/%d/%Y, %H:%M")
        SendMessage.add_message(from_user_id, to_user_id, title, description, file, date)
        Inbox.add_message(from_user_id, to_user_id, title, description, file, date)
        return jsonify({'success': True, 'message': 'Sent message successfully'})
    except Exception as e:
        print(e)
        return jsonify({'success': False,'message': 'Something went wrong'})

@apiSend.route('/sendback', methods=['POST'])
def sendBackMessage():
    try:
        messageID = request.form.get('id')
        user = Inbox.get_message_by_id(messageID)
        from_user_id = user.to_user_id
        to_user_id = user.from_user_id
        title = user.title
        description = request.form.get('description')
        file = "yasin.jpeg"
        date = date_time.strftime("%m/%d/%Y, %H:%M")
        SendMessage.add_message(from_user_id, to_user_id, title, description, file, date)
        Inbox.add_message(from_user_id, to_user_id, title, description, file, date)
        return jsonify({'success': True, 'message': 'Sent message successfully'})
    except Exception as e:
        print(e)
        return jsonify({'success': False,'message': 'Something went wrong'})

@apiSend.route('/sendagain', methods=['POST'])
def sendAgainMessage():
    try:
        messageID = request.form.get('id')
        user = SendMessage.get_message_by_id(messageID)
        from_user_id = user.from_user_id 
        to_user_id = user.to_user_id
        title = user.title
        description = request.form.get('description')
        file = "yasin.jpeg"
        date = date_time.strftime("%m/%d/%Y, %H:%M")
        SendMessage.add_message(from_user_id, to_user_id, title, description, file, date)
        return jsonify({'success': True, 'message': 'Sent message successfully'})
    except Exception as e:
        print(e)
        return jsonify({'success': False,'message': 'Something went wrong'})


@apiSend.route('/<int:id>', methods=['GET','DELETE', 'PUT'])
def deleteMessage(id):
    try:
        inbox = SendMessage.get_message_by_id(id)
        userName = User.get_by_id(inbox.from_user_id).firstname + " " + User.get_by_id(inbox.from_user_id).lastname
        foto = UserProfile.get_by_user_id(inbox.from_user_id).image
        if request.method == 'GET':
            inboxObj = {
                "name": userName,
                "foto": foto,
                'title': inbox.title,
                'description': inbox.description,
                'date': inbox.date,
            }
            return jsonify({'success':True, 'data':inboxObj})
        if request.method == 'DELETE':
            SendMessage.delete_by_user(id)
            return jsonify({'success':True,'message':'Message deleted successfully'})
        elif request.method == 'PUT':
            SendMessage.active_message(id, not inbox.active)
    except Exception as e:
        print(e)
        return jsonify({'success':False,'message':'There was an error'})

@apiSend.route('/user', methods=['POST'])
@jwt_required()
def getMessageByUserId():
    try:
        identity = get_jwt_identity()
        inbox = SendMessage.get_by_id_all(from_user_id=identity)
        messages = []
        for message in inbox:
            userName = User.get_by_id(message.from_user_id).firstname + " " + User.get_by_id(message.from_user_id).lastname
            messages.append({
                'id': message.id,
                'from_user_name': userName,
                'date': message.date,
            })
        return jsonify({'success':True, 'data':messages})
    except Exception as e:
        print(e)
        return jsonify({'success':False,'message':'There was an error'})

