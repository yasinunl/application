from flask import Flask, jsonify, Blueprint, request
from db.models import UserProfile
from db.models import User
from db.models import NewPost
import os
from werkzeug.utils import secure_filename
from flask_jwt_extended import (unset_jwt_cookies,
    create_access_token, set_access_cookies, jwt_required, get_jwt_identity)
import jwt
apiProfile = Blueprint('apiProfile', __name__, url_prefix='/api/userProfile')

@apiProfile.route('/', methods=['GET'])
def get_all_profiles():
    try:
        profiles = UserProfile.query.all()
        userProfiles = []
        for profile in profiles:
            user = User.get_by_id(id = profile.user_id)
            userProfiles.append({
            'name': user.firstname + " " + user.lastname,
            'job': profile.job,
            'title': profile.title,
            'description': profile.description,
            'image': profile.image,
            'frontend': profile.frontend,
            'backend': profile.backend,
            'github': profile.github,
            'linkedin': profile.linkedin,
            'twitter': profile.twitter,
            'email': user.email,
            'user_id': profile.user_id,
            'locations': profile.locations
        })
        return jsonify({'data':userProfiles, 'success':True})
    except Exception as e:
        print(e)
        return jsonify({'success':False, 'message':'There was an error'})

@apiProfile.route('/getinfos', methods=['GET'])
def get_profiles_infos():
    try:
        profiles = UserProfile.get_all()
        userProfiles = []
        for profile in profiles:
            if profile.description is not None and profile.job is not None:
                user = User.get_by_id(id = profile.user_id)
                userProfiles.append({
                'name': user.firstname + " " + user.lastname,
                'description': profile.description,
                'frontend': profile.frontend,
                'backend': profile.backend,
                'job': profile.job,
                "id": profile.id,
        })
        return jsonify({'data':userProfiles, 'success':True})
    except Exception as e:
        print(e)
        return jsonify({'success':False, 'message':'There was an error'})


@apiProfile.route('/nouser', methods=['POST'])
@jwt_required()
def get_profiles_nouser():
    try:
        identity = get_jwt_identity()
        profiles = UserProfile.get_all()
        userProfiles = []
        for profile in profiles:
            if profile.description is not None and profile.job is not None and identity != profile.user_id:
                user = User.get_by_id(id = profile.user_id)
                userProfiles.append({
                'name': user.firstname + " " + user.lastname,
                'description': profile.description,
                'frontend': profile.frontend,
                'backend': profile.backend,
                'job': profile.job,
                "id": profile.id
        })
        return jsonify({'data':userProfiles, 'success':True})
    except Exception as e:
        print(e)
        return jsonify({'success':False, 'message':'There was an error'})


@apiProfile.route('/user_profile', methods=['GET'])
@jwt_required()
def user_profile():
        identity = get_jwt_identity()
        profile = UserProfile.get_by_user_id(user_id = identity)
        user = User.get_by_id(id = profile.user_id)
        return jsonify({
                'name': user.firstname + " " + user.lastname,
                'job': profile.job,
                'title': profile.title,
                'description': profile.description,
                'image': profile.image,
                'frontend': profile.frontend,
                'backend': profile.backend,
                'github': profile.github,
                'linkedin': profile.linkedin,
                'twitter': profile.twitter,
                'email': user.email,
                'locations': profile.locations

        })


@apiProfile.route('/<int:id>', methods=['GET', 'PUT'])
def get_profile(id):
    try:
        profile = UserProfile.get_by_id(id = id)
        if profile is None:
            return jsonify({'success':False, 'message':'Profile not found'})
        user = User.get_by_id(id = profile.user_id)
        jobCounter = len(NewPost.get_by_id_all(user_id = profile.user_id))
        if request.method == 'GET':
            return jsonify({
                'name': user.firstname + " " + user.lastname,
                'job': profile.job,
                'title': profile.title,
                'description': profile.description,
                'image': profile.image,
                'frontend': profile.frontend,
                'backend': profile.backend,
                'github': profile.github,
                'linkedin': profile.linkedin,
                'twitter': profile.twitter,
                'email': user.email,
                "job_cound": jobCounter
        })
        elif request.method == 'PUT':
            job = request.form.get('job')
            title = request.form.get('title')
            description = request.form.get('description')
            image = request.form.get('image')
            frontend = request.form.get('frontend')
            backend = request.form.get('backend')
            github = request.form.get('github')
            linkedin = request.form.get('linkedin')
            twitter = request.form.get('twitter')
            locations = request.form.get('locations')
            if job == None:
                job = profile.job
            if title == None:
                title = profile.title
            if description == None:
                description = profile.description
            if image == None:
                image = profile.image
            if frontend == None:
                frontend = profile.frontend
            if backend == None:
                backend = profile.backend
            if github == None:
                github = profile.github
            if linkedin == None:
                linkedin = profile.linkedin
            if twitter == None:
                twitter = profile.twitter
            if locations == None:
                locations = profile.locations
            UserProfile.update_user_profile(user_id=id, job=job, title=title,
                                            description=description, backend=backend, github=github,
                                            linkedin=linkedin, twitter=twitter, locations=locations, image=image, frontend=frontend)
            return jsonify({'success':True, 'message':'Profile updated successfully'})
    except Exception as e:
        print(e)
        return jsonify({'success':False,'message':'There was an error'})

@apiProfile.route("/update_profile", methods=['POST'])
@jwt_required()
def update_user_profile():
    try:
        identity = get_jwt_identity()
        profile = UserProfile.get_by_user_id(identity)
        user = User.get_by_id(id = profile.user_id)
        job = request.form.get('job')
        title = request.form.get('title')
        description = request.form.get('description')
        try:
            image = request.files["image"]
        except:
            image = None
        frontend = None
        backend = None
        github = request.form.get('github')
        linkedin = None
        twitter = None
        locations = request.form.get('locations')
        if job == None:
            job = profile.job
        if title == None:
            title = profile.title
        if description == None:
            description = profile.description
        if image == None:
            email = profile.image
        else:
            email = ""
            for a in user.email:
                if a != "@":
                    email = email + a
                else:
                    break
            email = email + ".jpg"
            image.save('db/static/images/'+secure_filename(email))
        if frontend == None:
            frontend = profile.frontend
        if backend == None:
            backend = profile.backend
        if github == None:
            github = profile.github
        if linkedin == None:
            linkedin = profile.linkedin
        if twitter == None:
            twitter = profile.twitter
        if locations == None:
            locations = profile.locations
        
        
        UserProfile.update_user_profile(user_id=identity, job=job, title=title,
                                        description=description, backend=backend, github=github,
                                        linkedin=linkedin, twitter=twitter, locations=locations, image=email, frontend=frontend)
        return jsonify({'success':True, 'message':'Profile updated successfully'})
    except Exception as e:
        print(e)
        return jsonify({'success':False,'message':'There was an error'})