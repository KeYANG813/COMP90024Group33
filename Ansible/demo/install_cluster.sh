 #!/bin/bash
  . ./openrc.sh; ansible-playbook -i hosts -u ubuntu --key-file=~/.ssh/id_alwyn --ask-become-pass setEnv.yaml
  sh ./deploy_cluster.sh
