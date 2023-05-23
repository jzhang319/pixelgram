"""empty message

Revision ID: 0c5c64addb29
Revises:
Create Date: 2023-03-04 14:37:39.369007

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'ffdc0a98111c'  # '0c5c64addb29'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(
                        length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.Column('profile_url', sa.String(
                        length=255), nullable=True),
                    sa.Column('created_at', sa.DateTime(timezone=True),
                              server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.Column('updated_at', sa.DateTime(timezone=True),
                              server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('followers',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('follower_id', sa.Integer(), nullable=False),
                    sa.Column('created_at', sa.DateTime(timezone=True),
                              server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.Column('updated_at', sa.DateTime(timezone=True),
                              server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE followers SET SCHEMA {SCHEMA};")

    op.create_table('photos',
                    sa.Column('id', sa.Integer(),
                              autoincrement=True, nullable=False),
                    sa.Column('url', sa.String(length=255), nullable=False),
                    sa.Column('caption', sa.String(
                        length=2000), nullable=False),
                    sa.Column('created_at', sa.DateTime(timezone=True),
                              server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.Column('updated_at', sa.DateTime(timezone=True),
                              server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE photos SET SCHEMA {SCHEMA};")

    op.create_table('comments',
                    sa.Column('id', sa.Integer(),
                              autoincrement=True, nullable=False),
                    sa.Column('comment', sa.String(
                        length=255), nullable=False),
                    sa.Column('created_at', sa.DateTime(timezone=True),
                              server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.Column('updated_at', sa.DateTime(timezone=True),
                              server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.Column('photo_id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['photo_id'], ['photos.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")

    op.create_table('reactions',
                    sa.Column('id', sa.Integer(),
                              autoincrement=True, nullable=False),
                    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text(
                        '(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.Column('updated_at', sa.DateTime(timezone=True),
                              server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('photo_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['photo_id'], ['photos.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE reactions SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reactions')
    op.drop_table('comments')
    op.drop_table('photos')
    op.drop_table('followers')
    op.drop_table('users')
    # ### end Alembic commands ###
