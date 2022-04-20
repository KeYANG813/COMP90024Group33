#!/bin/bash

. ./openrc.sh; ansible-playbook --ask-become-pass install-docker.yaml
