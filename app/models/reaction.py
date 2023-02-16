from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Reaction(db.Model):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    user = db.relationship("User", back_populates="reactions")

    photo_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("photos.id")), nullable=False)
    photo = db.relationship("Photo", back_populates="reactions")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'photo_id': self.photo_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
