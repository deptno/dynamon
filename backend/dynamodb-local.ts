import {Docker} from 'docker-cli-js'

// ref: https://github.com/aws-samples/aws-sam-java-rest/issues/1#issuecomment-416271548
export async function dynamodbLocal(port = 8000) {
  const docker = new Docker()

  console.log('Pulling DynamoDB local')
  console.log('Running DynamoDB local.')

  await docker.command('pull amazon/dynamodb-local')
  docker.command(`run -d --name dynamon-db --rm -p ${port}:8000 amazon/dynamodb-local`)
    .catch(e => {
      console.warn(e)
      console.log('DynamoDB local is already running.')
    })

  return {
    name    : 'Dynamon Local DB',
    region  : 'local',
    endpoint: `http://localhost:${port}`,
  }
}