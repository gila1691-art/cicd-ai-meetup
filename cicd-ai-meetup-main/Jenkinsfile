// Jenkinsfile התחלתי — תרגיל 5
// המשימה: בקשו מ-AI להמיר את ה-workflow של GitHub Actions שבניתן ל-Jenkinsfile,
// והשלימו את השלבים החסרים (Lint, Test + פרסום תוצאות JUnit, הודעת סטטוס).
pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Install') {
            steps {
                sh 'node --version && npm --version'
                sh 'npm ci'
            }
        }

        // TODO: stage('Lint')

        // TODO: stage('Test') + junit 'reports/junit.xml'
    }

    // TODO: post { success { ... } failure { ... } }
}
