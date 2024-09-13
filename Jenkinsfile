pipeline {
    agent any
    triggers {
        pollSCM('*/1 * * * *')
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

                /*echo """
                Building...
                Commit: ${COMMIT_HASH}
                Author: ${COMMIT_AUTHOR}
                Date: ${COMMIT_DATE}
                Message: ${COMMIT_MESSAGE}
                """*/
                sh "dotnet run --project /apps/Email-Services/EmailServices.csproj -- ${COMMIT_HASH} ${COMMIT_AUTHOR} ${COMMIT_DATE} ${COMMIT_MESSAGE}"

                echo 'Building...'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                script {
                    def serverRunning = sh(script: "ps aux | grep 'node server/server.js' | grep -v grep", returnStatus: true) == 0
                    if (serverRunning) {
                        echo 'Stopping existing server...'
                        sh 'pkill -f "node server/server.js"'
                    }
                }
                
                sh 'node server/server.js'
            }
        }
    }
}