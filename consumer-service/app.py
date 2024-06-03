#!/usr/bin/env python
import os,sys
from src.services.rabbit_stream import RabbitStreamService
from src.configs.rabbitmq import RabbitMQConfig
from flask import Flask

app = Flask(__name__)

rabbit_conf = {
	"host": RabbitMQConfig.HOST,
	"port": RabbitMQConfig.PORT,
	"username": RabbitMQConfig.USERNAME,
	"password": RabbitMQConfig.PASSWORD,
}

def main():
	try:
		RabbitStreamService(rabbit_conf=rabbit_conf).run()
	except KeyboardInterrupt:
		try: 
			print("Exiting consumer service")
			sys.exit(0)
		except SystemExit:
			os._exit(0)

@app.route('/')
def hello():
	return 'Hello, World!'

if __name__ == '__main__':
	main()

	# if os.environ.get('DEVELOPMENT') != 'production':
	# 	app.run(port=8080,debug=True)
	# else:
	# 	from waitress import serve
	# 	serve(app, host="0.0.0.0", port=8080)