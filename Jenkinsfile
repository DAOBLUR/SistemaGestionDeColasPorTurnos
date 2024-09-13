pipeline {
    agent any
    triggers {
        pollSCM('*/1 * * * *') // Verifica cambios cada 1 minuto
    }
    stages {
        stage('Build') {
            steps {
                script {
                    COMMIT_HASH = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    COMMIT_MESSAGE = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    COMMIT_AUTHOR = sh(script: "git log -1 --pretty=%an", returnStdout: true).trim()
                    COMMIT_DATE = sh(script: "git log -1 --pretty=%cd", returnStdout: true).trim()
                }

                echo """
                Building...
                Commit: ${COMMIT_HASH}
                Author: ${COMMIT_AUTHOR}
                Date: ${COMMIT_DATE}
                Message: ${COMMIT_MESSAGE}
                """

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
                sh 'dotnet run --project /apps/Email-Services/EmailServices.csproj -- k kpachac@ulasalle.edu.pe karlo'

                echo 'Deploying...'
                script {
                    // Detener el servidor si ya está corriendo
                    def serverRunning = sh(script: "ps aux | grep 'node server/server.js' | grep -v grep", returnStatus: true) == 0
                    if (serverRunning) {
                        echo 'Stopping existing server...'
                        sh 'pkill -f "node server/server.js"'
                    }
                }
                // Iniciar el servidor
                
                
                sh 'node server/server.js'
                
                
            }
        }
    }
}