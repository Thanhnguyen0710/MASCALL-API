pipeline {
    agent any
    stages {
        stage("Build docker image") {
            steps {
                script {
                    bat "docker build -t thanhnc2000/mascall-api:1.0.0 ."
                    
                }
            }
        }
        stage("push image docker hub") {
            steps {
                script {
                    bat "docker push thanhnc2000/mascall-api:1.0.0"
                }
            }
        }
        stage("run container") {
            steps{
                bat "docker-compose up -d"
            }
        }
    }
}