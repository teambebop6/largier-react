#!/usr/bin/env bash

openssl aes-256-cbc -K $encrypted_083bf98aaaa9_key -iv $encrypted_083bf98aaaa9_iv -in id_rsa_largier.enc -out id_rsa_largier -d

# Start SSH agent
eval $(ssh-agent -s)

# Set the permission of the key
chmod 600 id_rsa_largier

# Add the private key to the system
ssh-add id_rsa_largier

git clone git@github.com:flaudre/largier-secret.git largier-secret
