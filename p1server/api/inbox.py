from flask import Flask, jsonify, Blueprint, request
from db.models import Inbox
from db.models import User
from db.models import UserProfile
from flask_jwt_extended import (unset_jwt_cookies,create_refresh_token,
    create_access_token, set_access_cookies, jwt_required, get_jwt_identity,
    )
apiInbox = Blueprint('apiInbox', __name__, url_prefix='/api/inbox')

@apiInbox.route('/', methods=['GET'])
def getMessage():
    AllMessages = Inbox.get_all()
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
            'active': message.active,
            'seen' : message.seen
        })
    return jsonify({'success':True, 'data':messages})

@apiInbox.route('/<int:id>', methods=['GET','DELETE', 'PUT'])
def deleteMessage(id):
    try:
        inbox = Inbox.get_message_by_id(id)
        if request.method == 'GET':
            userName = User.get_by_id(inbox.from_user_id).firstname + " " + User.get_by_id(inbox.from_user_id).lastname
            foto = UserProfile.get_by_user_id(inbox.from_user_id).image
            inboxObj = {
                "name": userName,
                "foto": foto,
                'title': inbox.title,
                'description': inbox.description,
                'file': inbox.file,
                'date': inbox.date,
            }
            return jsonify({'success':True, 'data':inboxObj})
        if request.method == 'DELETE':
            Inbox.active_message(id, not inbox.active)
            return jsonify({'success':True,'message':'Message deleted successfully'})
        elif request.method == 'PUT':
            foto = UserProfile.get_by_user_id(inbox.from_user_id).image
            inboxObj = {
                'from_user_id': inbox.from_user_id,
                'to_user_id': inbox.to_user_id,
            }
    except Exception as e:
        print(e)
        return jsonify({'success':False,'message':'There was an error'})

@apiInbox.route('/user', methods=['POST'])
@jwt_required()
def getMessageByUserId():
    try:
        identity = get_jwt_identity()
        inbox = Inbox.get_by_id_all(to_user_id=identity)
        messages = []
        for message in inbox:
            userName = User.get_by_id(message.from_user_id).firstname + " " + User.get_by_id(message.from_user_id).lastname
            messages.append({
                'id': message.id,
                'from_user_name': userName,
                'date': message.date,
                'seen' : message.seen
            })
        return jsonify({'success':True, 'data':messages})
    except Exception as e:
        print(e)
        return jsonify({'success':False,'message':'There was an error'})
    
@apiInbox.route('/see/<int:id>', methods=['POST'])
def seen(id):
    message = Inbox.seen_message(id)
    return jsonify({'success':True, 'message':"Message seen"})




