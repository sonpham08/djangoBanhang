# djangodkdt1.2
# djangodkdt

#backend
# install python3, pip3, django and set up virtualenv for application
sudo apt update
sudo apt-get -y upgrade
sudo apt-get install -y python3-pip

virtualenv -p python3 env
source env/bin/active
pip3 install Django

# install librabry that system require
pip install -r requirements.txt

# running server
python3 manage.py runserver


#frontend
cd frontend/
npm install
npm run build
npm start

# account of Admin
username: admin
password: 123