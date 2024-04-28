from machine import Pin, PWM 
import time

import network   #import des fonction lier au wifi
import urequests	#import des fonction lier au requetes http
import utime	#import des fonction lier au temps
import ujson	#import des fonction lier aà la convertion en Json

led = [PWM(Pin(18,mode=Pin.OUT)), PWM(Pin(17,mode=Pin.OUT)), PWM(Pin(16,mode=Pin.OUT))]

wlan = network.WLAN(network.STA_IF) # met la raspi en mode client wifi
wlan.active(True) # active le mode client wifi

ssid = 'Samsung_Sam_sung'
password = 'snhh9169'
wlan.connect(ssid, password) # connecte la raspi au réseau
url = "http://192.168.119.171:3000/house"

def setColor(maison):
    print(maisons[maison])
    c = maisons[maison]
    for i in range(3):
        led[i].duty_u16(c[i]*256)

maisons = {
    "Gryffindor": [16,0,0],
    "Hufflepuff": [10,10,0],
    "RavenClaw": [0,0,16],
    "Slytherin": [0,16,0]
    }

while not wlan.isconnected():
    print("pas co")
    utime.sleep(1)
    pass

while(True):
    try:
        print("GET")
        r = urequests.get(url) # lance une requete sur l'url
        print(r.json()["message"])
        h = r.json()["message"]# traite sa reponse en Json
        setColor(h)
        r.close() # ferme la demande
    except Exception as e:
        print(e)