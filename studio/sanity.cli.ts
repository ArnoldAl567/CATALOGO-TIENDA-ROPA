import {defineCliConfig} from 'sanity/cli'
import project from '../sanity.project.json'

export default defineCliConfig({
  deployment: {
    appId: 'hc6f6aoy8ax2nt6b6sgn63g4',
  },
  api: {
    projectId: project.projectId,
    dataset: project.dataset,
  },
  server: {
    hostname: '127.0.0.1',
    port: 3333,
  },
})
