pipeline {
    agent any
    triggers {
        pollSCM('*/1 * * * *') // Verifica cambios cada 1 minuto
    }
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
    post {
        always {
            emailext (
                to: 'kpachac@ulasalle.edu.pe, email2@example.com',
                subject: "Build \${currentBuild.fullDisplayName}",
                body: "New Commit: \${env.CHANGE_ID}\n\nChanges:\n\${currentBuild.changeSets, showPaths=false, format=\"%a: %r %m\\n\"}",
                attachLog: true
            )
        }
    }
}