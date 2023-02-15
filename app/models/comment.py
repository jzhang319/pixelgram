from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    comment = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=func.now(), onupdate=func.now())

    photo_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("photos.id")), nullable=False)
    photo = db.relationship("Photo", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'photo_id': self.photo_id,
            'comment': self.comment,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
