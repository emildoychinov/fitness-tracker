#!/bin/bash
kubectl apply -f postgres.yaml
kubectl wait --for=condition=Ready pod -l app=postgres
docker build -t fitness-tracker .
kubectl apply -f server.yaml
kubectl wait --for=condition=Ready pod -l app=server
SERVER = $(kubectl get pods -l app=server -o jsonpath='{.items[0].metadata.name}')
kubectl exec -it $SERVER -- bash -c "mkdir src/migrations"
kubectl exec -it $SERVER -- bash -c "npm run typeorm:generate-migration"
kubectl exec -it $SERVER -- bash -c "mv *-migrations.ts src/migrations"
kubectl exec -it $SERVER -- bash -c "npm run build"
kubectl exec -it $SERVER -- bash -c "npm run typeorm:run-migrations"
kubectl autoscale deployment server-deployment --cpu-percent=50 --min=1 --max=10