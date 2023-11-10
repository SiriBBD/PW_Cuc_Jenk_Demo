pipeline {
  agent { 
    docker { 
      //image 'jenkins/jenkins:lts'
      //args '-v C:\\Users\\bbdnet10214\\Documents\\PW_Cuc_Jenk_Demo:C:/ProgramData/Jenkins/.jenkins/workspace/PlayWright_Demo/'
    } 
  }
  stages {
    stage('install playwright') {
      steps {
        sh '''
          npm install
          npm run update
          npm i -D @playwright/test
          npx playwright install
          npm install @cucumber/cucumber -D
          npm install ts-node -D
          npm install multiple-cucumber-html-reporter --save-dev
          npm install fs-extra -D
                    
        '''
      }
    }
    stage('test') {
      
      steps {
        sh '''
          npm run test
          npm run report
        '''
                           
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
