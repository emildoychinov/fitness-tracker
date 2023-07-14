#!/bin/bash
SERVER=$(kubectl get pods -l app=server -o jsonpath='{.items[0].metadata.name}')
kubectl exec -it $SERVER -- bash -c "npm run typeorm -- -d ./typeOrm.config.ts schema:drop"
kubectl delete service postgres-service server-service
kubectl delete statefulset postgres-statefulset
kubectl delete deployment server-deployment
sleep 20s
docker rmi fitness-tracker
kubectl delete hpa server-deployment