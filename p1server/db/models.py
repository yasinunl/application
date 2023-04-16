from dataclasses import dataclass
from db import db
from sqlalchemy import desc

@dataclass
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(64), nullable=False)
    lastname = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    activated = db.Column(db.Boolean, default=True)

    def __init__(self, id, firstname, lastname, email, password, activated):
        self.id = id
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
        self.activated = activated

    @classmethod
    def get_all(cls):
        return cls.query.order_by(desc('id')).all()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def get_by_email_pass(cls, email, password):
        user = cls.query.filter_by(email=email, password=password).first()
        if user is not None:
            return user.id
        return None
    
    @classmethod
    def add_user(cls, firstname, lastname, email, password):
        user = cls(None, firstname, lastname, email, password, True)
        db.session.add(user)
        db.session.commit()
    
    @classmethod
    def activate_user(cls, id):
        user = cls.query.filter_by(id=id).first()
        user.activated = True
        db.session.commit()
    
    @classmethod
    def deactivate_user(cls, id):
        user = cls.query.filter_by(id=id).first()
        user.activated = False
        db.session.commit()
    
    @classmethod
    def update_user(cls, id, first_name, last_name, email, password):
        user = cls.query.filter_by(id=id).first()
        user.firstname = first_name
        user.lastname = last_name
        user.email = email
        user.password = password
        db.session.commit()
    
@dataclass
class UserProfile(db.Model):
    __tablename__ = 'user_profile'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    job = db.Column(db.String(255))
    title = db.Column(db.String(128))
    description = db.Column(db.String(4096))
    image = db.Column(db.String(128))
    frontend = db.Column(db.String(1280))
    backend = db.Column(db.String(1280))
    github = db.Column(db.String(128))
    twitter = db.Column(db.String(128))
    linkedin = db.Column(db.String(128))
    locations = db.Column(db.String(128))

    def __init__(self, id, user_id, job, title, description, image, frontend, backend, github, twitter, linkedin, locations):
        self.id = id
        self.user_id = user_id
        self.job = job
        self.title = title
        self.description = description
        self.image = image
        self.frontend = frontend
        self.backend = backend
        self.github = github
        self.twitter = twitter
        self.linkedin = linkedin
        self.locations = locations

    @classmethod
    def get_all(cls):
        return cls.query.order_by(desc('id')).all()
    
    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(id=id).first()
    
    @classmethod
    def get_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).first()
    
    @classmethod
    def add_user_profile(cls, user_id):
        user_profile = cls(None, user_id,None,None,None,None,None,None,None,None,None,None)
        db.session.add(user_profile)
        db.session.commit()
    
    @classmethod
    def update_user_profile(cls, user_id, job, title, description, image, frontend, backend, github, twitter, linkedin, locations):
        user_profile = cls.query.filter_by(user_id=user_id).first()
        user_profile.title = title
        user_profile.description = description
        user_profile.image = image
        user_profile.frontend = frontend
        user_profile.backend = backend
        user_profile.github = github
        user_profile.twitter = twitter
        user_profile.linkedin = linkedin
        user_profile.locations = locations
        user_profile.job = job
        db.session.commit()

@dataclass
class SendMessage(db.Model):
    __tablename__ = 'sendMessage'
    id = db.Column(db.Integer, primary_key=True)
    from_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    to_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(128))
    description = db.Column(db.String(4096))
    file = db.Column(db.String(128))
    date = db.Column(db.String(128))
    active = db.Column(db.Boolean, default=True)
    
    def __init__(self, id, from_user_id, to_user_id, title, description, file, date, active):
        self.id = id
        self.from_user_id = from_user_id
        self.to_user_id = to_user_id
        self.title = title
        self.description = description
        self.file = file
        self.date = date
        self.active = active
    
    @classmethod
    def get_all(cls):
        return cls.query.order_by(desc('id')).all()

    @classmethod
    def get_by_id_all(cls, from_user_id):
        return cls.query.filter_by(from_user_id=from_user_id).order_by(desc('id')).all()
    
    @classmethod
    def get_message_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def delete_by_user(cls, id):
        message = cls.query.filter_by(id=id).first()
        db.session.delete(message)
        db.session.commit()
    
    @classmethod
    def active_message(cls, id, active):
        message = cls.query.filter_by(id=id).first()
        message.active = active
        db.session.commit()
    
    
    @classmethod
    def add_message(cls, from_user_id, to_user_id,
                    title, description, file, date):
        message = cls(None, from_user_id, to_user_id, title, description, file, date, True)
        db.session.add(message)
        db.session.commit()

@dataclass
class Inbox(db.Model):
    __tablename__ = 'inbox'
    id = db.Column(db.Integer, primary_key=True)
    from_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    to_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(128))
    description = db.Column(db.String(4096))
    file = db.Column(db.String(128))
    date = db.Column(db.String(128))
    active = db.Column(db.Boolean, default=True)
    seen = db.Column(db.Boolean, default= False)
    
    def __init__(self, id, from_user_id, to_user_id, title, description, file, date, active, seen):
        self.id = id
        self.from_user_id = from_user_id
        self.to_user_id = to_user_id
        self.title = title
        self.description = description
        self.file = file
        self.date = date
        self.active = active
        self.seen = seen
    
    @classmethod
    def get_all(cls):
        return cls.query.order_by(desc('id')).all()

    @classmethod
    def get_by_id_all(cls, to_user_id):
        return cls.query.filter_by(to_user_id=to_user_id).order_by(desc('id')).all()
    
    @classmethod
    def get_message_by_id(cls, id):
        message = cls.query.filter_by(id=id).first()
        return message

    @classmethod
    def delete_by_user(cls, id):
        message = cls.query.filter_by(id=id).first()
        db.session.delete(message)
        db.session.commit()
    
    @classmethod
    def active_message(cls, id, active):
        message = cls.query.filter_by(id=id).first()
        message.active = active
        db.session.commit()
    
    @classmethod
    def seen_message(cls, id):
        message = cls.query.filter_by(id=id).first()
        message.seen = True
        db.session.commit()
    
    @classmethod
    def add_message(cls, from_user_id, to_user_id,
                    title, description, file, date):
        message = cls(None, from_user_id, to_user_id, title, description, file, date, True, False)
        db.session.add(message)
        db.session.commit()

@dataclass
class NewPost(db.Model):
    __tablename__ = 'new_post'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(128))
    description = db.Column(db.String(4096))
    payment_method = db.Column(db.String(128))
    steps = db.Column(db.String(8000))
    files = db.Column(db.String(1000))
    date = db.Column(db.String(128))
    
    def __init__(self, id, user_id, title, description, payment_method, steps, files, date):
        self.id = id
        self.user_id = user_id
        self.title = title
        self.description = description
        self.payment_method = payment_method
        self.steps = steps
        self.files = files
        self.date = date
    
    @classmethod
    def get_all(cls):
        return cls.query.order_by(desc('id')).all()
    
    @classmethod
    def get_by_id_all(cls, user_id):
        return cls.query.filter_by(user_id=user_id).order_by(desc('id')).all()
    
    @classmethod
    def get_post_by_id(cls, id):
        return cls.query.filter_by(id=id).first()
    
    @classmethod
    def delete_post(cls, id):
        post = cls.query.filter_by(id=id).first()
        db.session.delete(post)
        db.session.commit()
    
    @classmethod
    def update_post(cls, id, title, description, payment_method, steps, files, date):
        post = cls.query.filter_by(id=id).first()
        post.title = title
        post.description = description
        post.payment_method = payment_method
        post.steps = steps
        post.files = files
        post.date = date
        db.session.commit()
    
    @classmethod
    def add_post(cls, user_id, title, description, payment_method, steps, files, date):
        post = cls(None, user_id, title, description, payment_method, steps, files, date)
        db.session.add(post)
        db.session.commit()


