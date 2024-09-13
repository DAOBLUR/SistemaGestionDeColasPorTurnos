pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                // Comandos para compilar tu aplicación, si es necesario
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                // Comandos para ejecutar pruebas, si es necesario
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Detener el servidor si ya está corriendo
                script {
                    def serverRunning = sh(script: "ps aux | grep 'node server/server.js' | grep -v grep", returnStatus: true) == 0
                    if (serverRunning) {
                        echo 'Stopping existing server...'
                        sh 'pkill -f "node server/server.js"'
                    }
                }
                // Iniciar el servidor
                sh 'nohup node server/server.js &'
            }
        }
    }
}