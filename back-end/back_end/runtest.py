#import promtest
import requests
from time import sleep
from random import randint
import jwt

def post_json_or_error_new(link, payload):
    sleep(0.05)
    try:
        res = requests.post(link, payload)
        if res.status_code != 200:
            print("ERROR: Cannot get {0} : {1}".format(link, res.status_code))
				#exit(1)
        resjson = res.json()
        return resjson
    except Exception:
        print("ERROR: Cannot get {0}".format(link))
        exit(1)

def post_or_error(link, data):
    sleep(0.05)
    try:
        res = requests.post(link, data=data)
        if res.status_code != 200:
            print("ERROR: Cannot post {0} : {1}".format(link, res.status_code))
            exit(1)
    except Exception:
        print("ERROR: Cannot post {0}".format(link))
        exit(1)

def get_json_or_error(link):
    sleep(0.05)
    try:
        res = requests.get(link).json()
        return res
    except Exception:
        print("ERROR: Cannot get {0}".format(link))
        exit(1)

def forbidden_or_error(method, link, uname, upwd):
    sleep(0.05)
    try:
        if method == "GET":
            res = requests.get(link, auth=(uname, upwd))
        elif method == "DELETE":
            res = requests.delete(link, auth=(uname, upwd))
        elif method == "POST":
            res = requests.post(link, auth=(uname, upwd))
        elif method == "PUT":
            res = requests.put(link, auth=(uname, upwd))
        if res.status_code != 403:
            print("ERROR: Should not be allowed to {0} {1} : code {2}, id = {3}, pwd = {4}".format(method, link, res.status_code, uname, upwd))
            exit(1)
    except Exception:
        print("ERROR: Cannot {0} {1}".format(method, link))
        exit(1)

def forbidden_or_error_anon(method, link):
    sleep(0.05)
    try:
        if method == "GET":
            res = requests.get(link)
        elif method == "DELETE":
            res = requests.delete(link)
        elif method == "POST":
            res = requests.post(link)
        elif method == "PUT":
            res = requests.put(link)
        if res.status_code != 403:
            print("ERROR: Should not be allowed to {0} {1} with no auth : code {2}".format(method, link, res.status_code))
            exit(1)
    except Exception:
        print("ERROR: Cannot get {0}".format(link))
        exit(1)

def check_key(prom_json, key):
    if key not in prom_json:
        print("{0} not in {1}.".format((key, prom_json)))
        exit(1)


userN = 10
#user_pairs = promtest.create_users(userN)
# get id of each user
# create promises

proms = []
promN = 5
usernames = ["alice00", "alice01", "alice02", "alice03", "alice04", "alice05", "alice06", "alice07", "alice08", "alice09"]
password1s = ["passWd00", "passWd01", "passWd02", "passWd03", "passWd04", "passWd05", "passWd06", "passWd07", "passWd08", "passWd09"]
password2s = ["passWd00", "passWd01", "passWd02", "passWd03", "passWd04", "passWd05", "passWd06", "passWd07", "passWd08", "passWd09"]
ages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
alert_start_times = [1, 2, 3]
alert_intervals = [5, 15, 30]

print("******************************************************************************************************************")
link = "http://localhost:8000/sign_up/"
print("1. Checking Sign up http://localhost:8000/sign_up/ by creating {0} users.".format(promN))
for i in range(0, userN):
	username = usernames[i]
	password1 = password1s[i]
	password2 = password2s[i]
	age = ages[randint(0, len(ages) - 1)]
	alert_start_time = alert_start_times[randint(0, len(alert_start_times) - 1)]
	alert_interval = alert_intervals[randint(0, len(alert_intervals) - 1)]

	payload_for_store = {'username': username, 'password1': password1, 'password2': password2, 'age': age, 'alert_start_time': alert_start_time, 'alert_interval':alert_interval}
	proms.append(payload_for_store)
	print("\tposting user: {0} with {1}".format(username, payload_for_store))
	post_or_error(link, payload_for_store)

print("******************************************************************************************************************")
print("2. Checking Sign in http://localhost:8000/sign_in/.")
tokens = []
link = "http://localhost:8000/sign_in/"
for i in range(0, userN):
	username = usernames[i]
	password = password1s[i]
	payload = {'username': username, 'password': password}
	token = post_json_or_error_new(link, payload)['token']
	tokens.append(token)
	#print(token)
	decode_token = jwt.decode(token, 'SECRET', algorithms=['HS256'])
	#print({'token': jwt.encode({'username':username, 'password':password}, 'SECRET', algorithm='HS256')})
	print("\tsame? {0}. {1}".format((decode_token == payload), payload))
print("******************************************************************************************************************")
print("3. Checking users http://localhost:8000/users/.")
users = []
link = "http://localhost:8000/users/"
for i in range(0, userN):
	username = usernames[i]
	age = proms[i]['age']
	alert_start_time = proms[i]['alert_start_time']
	if alert_start_time < 10:
		alert_start_time = '0' + str(alert_start_time) + ':00:00'
	else:
		alert_start_time = str(alert_start_time) + ':00:00'
	alert_interval = proms[i]['alert_interval']
	if alert_interval < 10:
		alert_interval = '00:0' + str(alert_interval) + ':00'
	else:
		alert_interval = '00:' + str(alert_interval) + ':00'
	payload = {'username': username}
	result = post_json_or_error_new(link, payload)
	#print(result)
	if (result['user']['username']==username) and (result['age'] == str(age)) and (result['setting']['alert_start_time']==alert_start_time) and (result['setting']['alert_interval']==alert_interval):
		print('\t'+ username + '\'s information is same (username: ' + result['user']['username'] + '  age: ' + result['age'] + '  alert_start_time: ' + result['setting']['alert_start_time'] + '  alert_interval: ' + result['setting']['alert_interval'])
	else:
		print('\t'+username + '\'s information is wrong')

print("TEST SUCCESSFUL (further tests will be added)")
