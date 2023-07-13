#!/bin/bash
kubectl delete service postgres-service server-service
kubectl delete statefulset postgres-statefulset
kubectl delete deployment server-deployment
sleep 45s
docker rmi fitness-tracker
kubectl delete hpa server-deployment