#import promtest
import requests
from time import sleep
from random import randint
import jwt

def put_json_or_error(link, payload):
	sleep(0.05)
	try:
		res = requests.put(link, payload)
		if res.status_code != 200:
			print("ERROR: Cannot put {0} : {1}".format(link, res.status_code))
		#exit(1)
		resjson = res.json()
		return resjson
	except Exception:
		print("ERROR: Cannot put {0}".format(link))
		exit(1)

def post_json_or_error_new(link, payload):
    sleep(0.05)
    try:
        res = requests.post(link, payload)
        if res.status_code != 200:
            print("ERROR: Cannot post {0} : {1}".format(link, res.status_code))
				#exit(1)
        resjson = res.json()
        return resjson
    except Exception:
        print("ERROR: Cannot post {0}".format(link))
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


userN = 20
#user_pairs = promtest.create_users(userN)
# get id of each user
# create promises

proms = []
promN = 5
usernames = ["alice00", "alice01", "alice02", "alice03", "alice04", "alice05", "alice06", "alice07", "alice08", "alice09",
			 "alice10", "alice11", "alice12", "alice13", "alice14", "alice15", "alice16", "alice17", "alice18", "alice19"]
password1s = ["passWd00", "passWd01", "passWd02", "passWd03", "passWd04", "passWd05", "passWd06", "passWd07", "passWd08", "passWd09",
			  "passWd00", "passWd01", "passWd02", "passWd03", "passWd04", "passWd05", "passWd06", "passWd07", "passWd08", "passWd09"]
password2s = ["passWd00", "passWd01", "passWd02", "passWd03", "passWd04", "passWd05", "passWd06", "passWd07", "passWd08", "passWd09",
			  "passWd00", "passWd01", "passWd02", "passWd03", "passWd04", "passWd05", "passWd06", "passWd07", "passWd08", "passWd09"]
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
	if decode_token != payload:
		exit(1)
print("******************************************************************************************************************")
print("3. Checking users http://localhost:8000/users/.")
users = []
link = "http://localhost:8000/users/"
for i in range(0, userN):
	username = usernames[i]
	age = proms[i]['age']
	alert_start_time = proms[i]['alert_start_time']*60*60*1000
	alert_interval = proms[i]['alert_interval']*60*1000
	payload = {'username': username}
	result = post_json_or_error_new(link, payload)
	if (result['user']['username']==username) and (str(result['age'] == str(age))) and (str(result['setting']['alert_start_time'])==str(alert_start_time)) and (str(result['setting']['alert_interval'])==str(alert_interval)):
		print('\t'+ str(username) + '\'s information is same (username: ' + str(result['user']['username']) + '  age: ' + str(result['age']) + '  alert_start_time: ' + str(result['setting']['alert_start_time']) + '  alert_interval: ' + str(result['setting']['alert_interval']))
	else:
		print('\t'+str(username) + '\'s information is wrong')
		exit(1)


link = "http://localhost:8000/timeline/"
usercount = []
usertime = []
for i in range(0, userN):
	sun = int(randint(0, 60*60*24*1000))
	mon = int(randint(0, 60*60*24*1000))
	tue = int(randint(0, 60*60*24*1000))
	wed = int(randint(0, 60*60*24*1000))
	thu = int(randint(0, 60*60*24*1000))
	fri = int(randint(0, 60*60*24*1000))
	sat = int(randint(0, 60*60*24*1000))
	sunc = int(randint(0, 7))
	monc = int(randint(0, 7))
	tuec = int(randint(0, 7))
	wedc = int(randint(0, 7))
	thuc = int(randint(0, 7))
	fric = int(randint(0, 7))
	satc = int(randint(0, 7))
	usertime.append([sun, mon, tue, wed, thu, fri, sat])
	usercount.append([sunc, monc, tuec, wedc, thuc, fric, satc])
	alink = link + str(i + 1) + '/'
	payload = {
				'sun_average': sun, 'sun_count': sunc,
				'mon_average': mon, 'mon_count': monc,
				'tue_average': tue, 'tue_count': tuec,
				'wed_average': wed, 'wed_count': wedc,
				'thu_average': thu, 'thu_count': thuc,
				'fri_average': fri, 'fri_count': fric,
				'sat_average': sat, 'sat_count': satc}
	put_json_or_error(alink, payload)

print("TEST SUCCESSFUL (further tests will be added)")
