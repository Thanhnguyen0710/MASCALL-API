pipeline {
    agent any
    stages {
        stage("Build docker image") {
            steps {
                
                bat """
                    curl -d chat_id=-831789349 -d text="\ud83d\udcaa \ud83d\udcaa \ud83d\udcaa Jobname: Mascall-api Status: Start deploy"  https://api.telegram.org/bot5894657515:AAEKCr-v0DBzPb6uoiyWXJeVuJzT2Tuk5vc/sendMessage
                    """
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
            curl -d chat_id=-831789349 -d text="\ud83d\udc4b ud83d\udc4b ud83d\udc4b Jobname: Mascall-api \nStatus: SUCCESS"  https://api.telegram.org/bot5894657515:AAEKCr-v0DBzPb6uoiyWXJeVuJzT2Tuk5vc/sendMessage
            """
        }
        unstable {
            echo "unstable state"
        }
        failure {
            bat """
            curl -d chat_id=-831789349 -d text="\u2620\ufe0f \u2620\ufe0f \u2620\ufe0f Jobname: Mascall-api \nStatus: FAILURE"  https://api.telegram.org/bot5894657515:AAEKCr-v0DBzPb6uoiyWXJeVuJzT2Tuk5vc/sendMessage
            """
        }
        changed {
            echo "change state"
        }
    }
}