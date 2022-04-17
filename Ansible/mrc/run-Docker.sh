#!/bin/bash

ansible-playbook -i hosts -u ubuntu --key-file=~/.ssh/id_alwyn --ask-become-pass wordpress.yaml