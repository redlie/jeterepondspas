Developpement environnement :
Mac OS X 10.6
What's required ?
NodeJS
NodeJitsu
NPM (demeteorizer, jitsu)
Meteor
Xcode with a command line tool to compile some code with the node fibers library


Create the Meteor app :
meteor create jeterepondspas
cd jeterepondspas

npm install demeteorizer
npm install jitsu
meteor add accounts-ui
meteor add accounts-password
meteor add email
meteor remove autopublish


Nodejitsu build and deployment :
demeteorizer
cd .demeteorizer
jitsu deploy

jitsu will tell you some information (here the answers)

subdomain: jeterepondspas
engine.nodes: enter
is this ok ? yes
is this ok ? yes