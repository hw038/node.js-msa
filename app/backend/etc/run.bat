@echo off
START "distributor" node ../common/distributor.js
START "goods" node ../goods/microservice_goods.js
START "members" node ../members/microservice_members.js
START "purchases" node ../purchases/microservice_purchases.js
START "gate" node ../common/gate.js

