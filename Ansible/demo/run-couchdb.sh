#!/bin/bash

. ./openrc.sh; ansible-playbook -i hosts -u ubuntu --key-file=~/.ssh/id_alwyn --ask-become-pass deploy-couchdb.yaml

