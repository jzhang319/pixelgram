from flask_socketio import SocketIO, emit
import os


# configure cors_allowed_origins from SOCKET_CORS_ORIGINS (comma-separated).
# In production, an unset/empty var denies all origins rather than falling
# back to "*" -- only development gets the permissive default.
_origins_env = os.environ.get('SOCKET_CORS_ORIGINS')
if _origins_env:
    origins = [origin.strip() for origin in _origins_env.split(',') if origin.strip()]
elif os.environ.get('FLASK_ENV') == 'production':
    origins = []
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)
