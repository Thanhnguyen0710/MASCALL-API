pipeline {
    agent any
    stages {
        stage("Build docker images") {
            steps {
                script {
                    bat "docker build -t thanhnc2000/mascall-api:1.0.0 ."
                    
                }
            }
        }
        stage("push image docker hub") {
            steps {
                script {
                    bat "docker login -u thanhnc2000 -p Thanhnguyen2k"
                    bat "docker push thanhnc2000/mascall-api:1.0.0"
                }
            }
        }
    }
}