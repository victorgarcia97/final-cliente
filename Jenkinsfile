pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
                nodejs(nodeJSInstallationName: 'node12') {
                    sh 'npm install'
                    sh 'ng build'
                }
            }
        }
    }
}