#include <Arduino.h>
#include <IRremote.h>
#include <IRremote.hpp>
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "OMANEA-SKP";
const char* password = "Amplatitsamiducregina";
const char* mqtt_server = "broker.mqtt-dashboard.com";
int SEND_PIN = 16;
WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE  (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

void setup_wifi() {

  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String message = String(((char*)payload));
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  
  Serial.println();
  uint8_t len = 32;
  uint8_t reapeats = 5;
  for( int i = 0; i < reapeats; i ++) {
    IrSender.sendNEC(message.toInt(), len);
    delay(300);
  }

}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      client.subscribe("mariusAlc/SRIC/IR/RC");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  pinMode(SEND_PIN, OUTPUT);
  Serial.begin(115200);
  IrSender.begin(SEND_PIN);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  Serial.println("IR Sender ready");
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
