#!/usr/bin/env bash

echo "Start init..."
echo branch is $TRAVIS_BRANCH
# how to encrypt sensitive files: https://docs.travis-ci.com/user/encrypting-files/

# import ssh keys
openssl aes-256-cbc -K $encrypted_949978aab690_key -iv $encrypted_949978aab690_iv -in .travis/assets.zip.enc -out assets.zip -d

unzip assets.zip -d assets

# Start SSH agent
#eval $(ssh-agent -s)

chmod 600 ./assets/largier_bb_key
chmod 600 ./assets/server_key

cp ./assets/largier_bb_key ~/.ssh/
cp ./assets/server_key ~/.ssh/

# get server host
serverHost=`cat ./assets/server_host`
# replace all server_host placeholder in config file
sed -i 's/${server_host}/'$serverHost'/g' config
# append to ~/.ssh/config file
cat ./assets/config >> ~/.ssh/config

ssh-keyscan $serverHost >> ~/.ssh/known_hosts

echo "Import ssh keys done"
echo "Finish init."