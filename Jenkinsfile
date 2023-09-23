pipeline {
    agent any
    stages {
        stage("Build docker image") {
            steps {
                script {
                    bat """
                    curl -d parse_mode="HTML" -d chat_id=-831789349 -d text="Service name: <strong>Mascall-api</strong> Status: <strong>START DEPLOY</strong>"  https://api.telegram.org/bot5894657515:AAEKCr-v0DBzPb6uoiyWXJeVuJzT2Tuk5vc/sendMessage
                    """
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
            curl -d parse_mode="HTML" -d chat_id=-831789349 -d text="Service name: <strong>Mascall-api</strong> Status: <strong>SUCCESS</strong>"  https://api.telegram.org/bot5894657515:AAEKCr-v0DBzPb6uoiyWXJeVuJzT2Tuk5vc/sendMessage
            """
        }
        unstable {
            echo "unstable state"
        }
        failure {
            bat """
            curl -d parse_mode="HTML" -d chat_id=-831789349 -d text="Service name: <strong>Mascall-api</strong> Status: <strong>FAILURE</strong>"  https://api.telegram.org/bot5894657515:AAEKCr-v0DBzPb6uoiyWXJeVuJzT2Tuk5vc/sendMessage
            """
        }
        changed {
            echo "change state"
        }
    }
}