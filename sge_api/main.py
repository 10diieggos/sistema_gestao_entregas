import os
from dotenv import load_dotenv
from src.server.instance import server
from src.controllers import *

load_dotenv()

host = os.getenv('API_HOST')
port = os.getenv('API_PORT')
debug = os.getenv('API_DEBUG')


if __name__ == '__main__':
  server.run(host, port, debug)