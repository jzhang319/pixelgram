from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())

    photos = db.relationship('Photo', back_populates='user')
    reactions = db.relationship("Reaction", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")

    followers = db.relationship(
        'Follower', foreign_keys="Follower.user_id", back_populates='user')
    following = db.relationship(
        'Follower', foreign_keys="Follower.follower_id", back_populates='follower')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def number_followers(self):
        return len(self.followers)

    def number_following(self):
        return len(self.following)

    def number_posts(self):
        return len(self.photos)

    def user_followings(self):
        user_followings = []
        for following in self.following:
            user_followings.append(following.user_id)
        return user_followings

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_url': self.profile_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'photos': {photo.id: photo.to_dict() for photo in self.photos},
            'reactions': {reaction.id: reaction.to_dict() for reaction in self.reactions},
            'comments': {comment.id: comment.to_dict() for comment in self.comments},
            'followers': {follower.id: follower.to_dict() for follower in self.followers},
            'following': {follower.id: follower.to_dict() for follower in self.following},
            'number_followers': self.number_followers(),
            'number_following': self.number_following(),
            'number_posts': self.number_posts(),
            'user_followings': self.user_followings()
        }

    def to_post_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'profile_url': self.profile_url,
        }
