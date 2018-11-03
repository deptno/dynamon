import {Docker} from 'docker-cli-js'

// ref: https://github.com/aws-samples/aws-sam-java-rest/issues/1#issuecomment-416271548
export async function dynamodbLocal(port = 8000) {
  const docker = new Docker()
  console.log('Pulling DynamoDB local')
  await docker.command('pull amazon/dynamodb-local')
  docker.command(`run --name dynamon-db --rm -p ${port}:8000 amazon/dynamodb-local`)
  console.log('Running DynamoDB local.')

  return {
    name: 'Dynamon Local DB',
    region: 'local',
    endpoint: `http://localhost:${port}`
  }
}