pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/Thanhnguyen0710/MASCALL-API'
            }
        }
        stage("Build docker images") {
            steps {
                script {
                    sh "docker build -t thanhnc2000/mascall-api:1.0.0 ."
                }
            }
        }
    }
}