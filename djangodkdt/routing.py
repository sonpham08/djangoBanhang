from django.urls import path
from channels.http import AsgiHandler
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import chat.routing
# from .consumers import ChatConsumer

application = ProtocolTypeRouter({

    # "websocket": AuthMiddlewareStack(
    #     URLRouter([
    #         # URLRouter just takes standard Django path() or url() entries.
    #         path("ws/violations/", ChatConsumer),
    #     ]),

    # ),

    'websocket': AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})