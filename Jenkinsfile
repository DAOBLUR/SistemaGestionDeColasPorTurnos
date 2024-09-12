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
                // Comandos para desplegar tu aplicación
                sh 'node server/server.js'
            }
        }
    }
}
