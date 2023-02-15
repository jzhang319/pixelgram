from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Follower(db.Model):
    __tablename__ = 'followers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, nullable=False)
    followed_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=func.now(), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'following_id': self.following_id,
            'followed_id': self.follower_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
