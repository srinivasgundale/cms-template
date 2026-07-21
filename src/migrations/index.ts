import * as migration_20260627_153308 from './20260627_153308'
import * as migration_20260629_082449 from './20260629_082449'
import * as migration_20260630_040426 from './20260630_040426'
import * as migration_20260630_043059 from './20260630_043059'
import * as migration_20260630_060937 from './20260630_060937'
import * as migration_20260630_081008 from './20260630_081008'
import * as migration_20260630_083004 from './20260630_083004'
import * as migration_20260701_023021 from './20260701_023021'
import * as migration_20260701_035041 from './20260701_035041'
import * as migration_20260701_074623 from './20260701_074623'
import * as migration_20260702_042507 from './20260702_042507'
import * as migration_20260719_145900 from './20260719_145900'
import * as migration_20260721_team_redesign from './20260721_team_redesign'

export const migrations = [
  {
    up: migration_20260627_153308.up,
    down: migration_20260627_153308.down,
    name: '20260627_153308',
  },
  {
    up: migration_20260629_082449.up,
    down: migration_20260629_082449.down,
    name: '20260629_082449',
  },
  {
    up: migration_20260630_040426.up,
    down: migration_20260630_040426.down,
    name: '20260630_040426',
  },
  {
    up: migration_20260630_043059.up,
    down: migration_20260630_043059.down,
    name: '20260630_043059',
  },
  {
    up: migration_20260630_060937.up,
    down: migration_20260630_060937.down,
    name: '20260630_060937',
  },
  {
    up: migration_20260630_081008.up,
    down: migration_20260630_081008.down,
    name: '20260630_081008',
  },
  {
    up: migration_20260630_083004.up,
    down: migration_20260630_083004.down,
    name: '20260630_083004',
  },
  {
    up: migration_20260701_023021.up,
    down: migration_20260701_023021.down,
    name: '20260701_023021',
  },
  {
    up: migration_20260701_035041.up,
    down: migration_20260701_035041.down,
    name: '20260701_035041',
  },
  {
    up: migration_20260701_074623.up,
    down: migration_20260701_074623.down,
    name: '20260701_074623',
  },
  {
    up: migration_20260702_042507.up,
    down: migration_20260702_042507.down,
    name: '20260702_042507',
  },
  {
    up: migration_20260719_145900.up,
    down: migration_20260719_145900.down,
    name: '20260719_145900',
  },
  {
    up: migration_20260721_team_redesign.up,
    down: migration_20260721_team_redesign.down,
    name: '20260721_team_redesign',
  },
]
