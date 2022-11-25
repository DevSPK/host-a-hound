from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User, db, Host
from sqlalchemy.orm import joinedload
from sqlalchemy import desc
from .auth_routes import validation_errors_to_error_messages

host_routes = Blueprint('host', __name__)


@host_routes.get('/test')
def test_route():
    return 'host'

@host_routes.get('/')
def get_hosts():
    """
    Query for all hosts and returns them in a list of host dictionaries
    """
    
    hosts = Host.query.all()
    return {'hosts': [host.to_dict() for host in hosts]}
    
    
@host_routes.get('/<int:id>')
def get_host_by_id(id):
    """
    Query hosts by host id and returns the host
    """
    
    host = Host.query.get(id)
    
    if not host:
        return {
            "message": "Host could not be found"
        }, 404
        
    return host.to_dict()
        
        
@host_routes.delete('/<int:id>')
@login_required
def delete_host(id):
    """
    Delete a host by host id
    """
    current_host = Host.query.get(id)
    
    if current_host == None:
        return {"message": "Host could not be found"}, 404

    if current_host.user_id != int(current_user.get_id()):
        return {"message": "Forbidden"}, 403

    db.session.delete(current_host)
    db.session.commit()

    return { "message": "Successfully deleted" }