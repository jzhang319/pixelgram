from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Photo(db.Model):
    __tablename__ = 'photos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=func.now())

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    user = db.relationship("User", back_populates="photos")

    comments = db.relationship(
        "Comment", back_populates="photo", cascade="all, delete-orphan")
    reactions = db.relationship(
        "Reaction", back_populates="photo", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'url': self.url,
            'caption': self.caption,
            'date_created': self.created_at,
            'updated_at': self.updated_at,
            'comments': {comment.id: comment.to_dict() for comment in self.comments},
            'reactions': {reaction.id: reaction.to_dict() for reaction in self.reactions}
        }
