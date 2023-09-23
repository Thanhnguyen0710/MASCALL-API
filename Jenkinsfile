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
            steps {
                script {
                    bat "docker-compose up -d"
                }
            }
        }
    }

    post {
        always {
            echo "alaways"
        }
        success {
        bat """
            curl -d chat_id=-831789349 -d text="\ud83d\ude21 \ud83d\ude21 \ud83d\ude21 \nJobname: Mascall-api \nStatus: SUCCESS"  https://api.telegram.org/bot5894657515:AAEKCr-v0DBzPb6uoiyWXJeVuJzT2Tuk5vc/sendMessage
            """
        }
        unstable {
            echo "unstable state"
        }
        failure {
            bat """
            curl -X POST \
            -H 'Content-Type: application/json' \
            -d '{"chat_id": "-831789349", "text": " \ud83d\ude21 \ud83d\ude21 \ud83d\ude21 \nJobname: Mascall-api \nStatus: FAILURE  ", "disable_notification": true}' \
            https://api.telegram.org/bot5894657515:AAEKCr-v0DBzPb6uoiyWXJeVuJzT2Tuk5vc/sendMessage
            """
        }
        changed {
            echo "change state"
        }
    }
}