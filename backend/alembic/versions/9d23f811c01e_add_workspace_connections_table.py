"""add_workspace_connections_table

Revision ID: 9d23f811c01e
Revises: 8c11e99b811b
Create Date: 2026-11-24 10:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9d23f811c01e'
down_revision: Union[str, Sequence[str], None] = '8c11e99b811b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    tables = inspector.get_table_names()
    
    if 'workspace_connections' not in tables:
        op.create_table(
            'workspace_connections',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('user_id', sa.Integer(), nullable=False),
            sa.Column('service', sa.String(), nullable=False),
            sa.Column('access_token', sa.String(), nullable=False),
            sa.Column('refresh_token', sa.String(), nullable=True),
            sa.Column('token_expires_at', sa.DateTime(timezone=True), nullable=True),
            sa.Column('workspace_id', sa.String(), nullable=True),
            sa.Column('workspace_name', sa.String(), nullable=True),
            sa.Column('workspace_icon', sa.String(), nullable=True),
            sa.Column('is_active', sa.Boolean(), nullable=False, server_default=sa.text('true')),
            sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=True),
            sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
            sa.Column('last_synced_at', sa.DateTime(timezone=True), nullable=True),
            sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
            sa.PrimaryKeyConstraint('id')
        )
        op.create_index(op.f('ix_workspace_connections_id'), 'workspace_connections', ['id'], unique=False)
    else:
        indexes = [i['name'] for i in inspector.get_indexes('workspace_connections')]
        if 'ix_workspace_connections_id' not in indexes:
            op.create_index(op.f('ix_workspace_connections_id'), 'workspace_connections', ['id'], unique=False)


def downgrade() -> None:
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    tables = inspector.get_table_names()
    if 'workspace_connections' in tables:
        indexes = [i['name'] for i in inspector.get_indexes('workspace_connections')]
        if 'ix_workspace_connections_id' in indexes:
            op.drop_index(op.f('ix_workspace_connections_id'), table_name='workspace_connections')
        op.drop_table('workspace_connections')
