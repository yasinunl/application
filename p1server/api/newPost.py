from flask import Flask, jsonify, Blueprint, request
from datetime import datetime
from db.models import NewPost
from flask_jwt_extended import (unset_jwt_cookies,create_refresh_token,
    create_access_token, set_access_cookies, jwt_required, get_jwt_identity,
    )
apiNewPost= Blueprint('apiNewPost', __name__, url_prefix='/api/new_post')

@apiNewPost.route('/', methods=['GET'])
def getAllPost():
    try:
        postsModel = NewPost.get_all()
        posts = []
        for post in postsModel:
            posts.append({
                'id': post.id,
                'title': post.title,
                'description': post.description,
                'payment_method': post.payment_method,
                'date': post.date,
                'user_id': post.user_id,
                'steps': post.steps,
            })
        return jsonify({'success': True, 'data': posts})
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message':'There was an error'})
    
@apiNewPost.route('/nouser', methods=['POST'])
@jwt_required()
def getAllPostWithoutUsers():
    try:
        identity = get_jwt_identity()
        postsModel = NewPost.get_all()
        posts = []
        for post in postsModel:
            if str(identity) != str(post.user_id):
                posts.append({
                    'id': post.id,
                    'title': post.title,
                    'description': post.description,
                    'payment_method': post.payment_method,
                    'date': post.date,
                    'user_id': post.user_id,
                    'steps': post.steps,
                })
        return jsonify({'success': True, 'data': posts})
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message':'There was an error'})

@apiNewPost.route('/add', methods=['POST'])
@jwt_required()
def addNewPost():
    try:
        identity = get_jwt_identity()
        now = datetime.now()
        ourDate = now.strftime("%d %b, %Y")
        user_id = identity
        title = request.form.get('title')
        i = 0
        while True:
            try:
                newFile = request.files['file-'+str(i)]
            except:
                newFile = None
            if newFile == None:
                break
            else:
                newFile.save("db/static/images/" + newFile.filename)
            i = i + 1
        description = request.form.get('description')
        payment_method = request.form.get('payment_method')
        steps = request.form.get('steps')
        files = request.form.get('files')
        date = ourDate
        NewPost.add_post(user_id=user_id, title=title, description=description, payment_method=payment_method, steps=steps, files=files, date=date)
        return jsonify({'success': True, 'message':'Post created successfully'})
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message':'There was an error'})

@apiNewPost.route('/user_id/<int:user_id>', methods=['GET'])
def get_user_id(user_id):
    try:
        postsModel = NewPost.get_by_id_all(user_id)
        posts = []
        for post in postsModel:
            posts.append({
                'id': post.id,
                'user_id': post.user_id,
                'title': post.title,
                'description': post.description,
                'payment_method': post.payment_method,
               'steps': post.steps,
                'files': post.files,
                'date': post.date
            })
        return jsonify({'success': True, 'data': posts})
    except Exception as e:
        print(e)
        return jsonify({'success': False,'message':'There was an error'})

@apiNewPost.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_post(id):
    try:
        post = NewPost.get_post_by_id(id)
        if post is None:
            return jsonify({'success': False, 'message': 'Post could not be found'})
        if request.method == 'GET':
            postJson = {
                    'title': post.title,
                    'description': post.description,
                    'payment_method': post.payment_method,
                'steps': post.steps,
                    'files': post.files,
                    'date': post.date
            }
            return jsonify({'success': True, 'data': postJson})
        if request.method == 'PUT':
            now = datetime.now()
            ourDate = now.strftime("%d %b, %Y")
            date = ourDate
            title = request.form.get('title')
            description = request.form.get('description')
            payment_method = request.form.get('payment_method')
            steps = request.form.get('steps')
            files = request.form.get('files')
            if title is None:
                title = post.title
            if description is None:
                description = post.description
            if payment_method is None:
                payment_method = post.payment_method
            if steps is None:
                steps = post.steps
            if files is None:
                files = post.files
            NewPost.update_post(id, title, description, payment_method, steps, files, date)
            return jsonify({'success': True,'message': 'Post updated successfully'})
        if request.method == 'DELETE':
            NewPost.delete_post(id)
            return jsonify({'success': True,'message': 'Post deleted successfully'})
    except Exception as e:
        print(e)
        return jsonify({'success': False,'message': 'There was an error'})