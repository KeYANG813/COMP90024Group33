#!/bin/bash

. ./openrc.sh; ansible-playbook -i hosts run_crawler_cloud.yaml
# . ./openrc.sh; ansible-playbook -i hosts -u ubuntu --key-file=~/.ssh/test.pem run_crawler_cloud.yaml