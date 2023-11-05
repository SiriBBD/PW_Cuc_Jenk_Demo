pipeline {
  agent { 
    docker { 
      image 'jenkins/jenkins:lts'
      args '-v C:\\Users\\bbdnet10214\\Documents\\PW_Cuc_Jenk_Demo:C:/ProgramData/Jenkins/.jenkins/workspace/PlayWright_Demo'
    } 
  }
  stages {
    stage('install playwright') {
      steps {
        sh '''
          npm i -D @playwright/test
          npx playwright install
        '''
      }
    }
    stage('help') {
      steps {
        sh 'npx playwright test --help'
      }
    }
    stage('test') {
      steps {
        script {
            docker.image('jenkins/jenkins:lts').inside("-v C:\\Users\\bbdnet10214\\Documents\\PW_Cuc_Jenk_Demo:C:/ProgramData/Jenkins/.jenkins/workspace/PlayWright_Demo") {
                sh '''
                  npm run build
                  npm run test
                  npm run report
                '''
            }
        }
      }

      post {
        success {
          archiveArtifacts(artifacts: 'homepage-*.png', followSymlinks: false)
          sh 'rm -rf *.png'
        }
      }
       
      
    }
  }
}
