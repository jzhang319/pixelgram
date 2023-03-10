from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from flask_login import current_user


class Photo(db.Model):
    __tablename__ = 'photos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(2000), nullable=False)

    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    user = db.relationship("User", back_populates="photos")

    comments = db.relationship(
        "Comment", back_populates="photo", cascade="all, delete-orphan")
    reactions = db.relationship(
        "Reaction", back_populates="photo", cascade="all, delete-orphan")

    def find_reaction_length(self):
        return len(self.reactions)

    def user_reacted(self):
        user_liked = []
        for reaction in self.reactions:
            user_liked.append(reaction.user_id)
        return user_liked

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'url': self.url,
            'caption': self.caption,
            'date_created': self.created_at,
            'updated_at': self.updated_at,
            'comments': {comment.id: comment.to_dict() for comment in self.comments},
            'reactions': {reaction.id: reaction.to_dict() for reaction in self.reactions},
            'user': self.user.to_post_dict(),
            'reaction_length': self.find_reaction_length(),
            'user_reacted': self.user_reacted(),
        }
