from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Photo(db.Model):
  __tablename__ = 'photos'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  url = db.Column(db.String(255), nullable=False)
  detail = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=func.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=func.now(), onupdate=func.now())

  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  user = db.relationship("User", back_populates="photos")

  comments = db.relationship("Comment", back_populates="photo", cascade="all, delete-orphan")
  reactions = db.relationship("Reaction", back_populates="photo", cascade="all, delete-orphan")

  def to_dict(self):
    return {
      'id': self.id,
      'url': self.url,
      'detail': self.detail,
      'user_id': self.user_id,
      'date_created': self.created_at,
      'updated_at': self.updated_at
    }
