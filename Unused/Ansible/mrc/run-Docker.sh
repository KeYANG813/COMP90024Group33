#!/bin/bash

ansible-playbook -i hosts -u ubuntu --key-file=~/.ssh/test.pem --ask-become-pass Docker.yaml