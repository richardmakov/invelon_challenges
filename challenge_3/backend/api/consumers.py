import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from datetime import datetime

# WebSocket consumer that sends the current time to the client every 5 seconds
class ClockConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        while True:
            now = datetime.now().strftime('%H:%M:%S')
            await self.send(json.dumps({'hora': now}))
            await asyncio.sleep(5)

    async def disconnect(self, close_code):
        pass
