import * as migration_20260627_153308 from './20260627_153308';
import * as migration_20260629_082449 from './20260629_082449';
import * as migration_20260630_040426 from './20260630_040426';
import * as migration_20260630_043059 from './20260630_043059';
import * as migration_20260630_060937 from './20260630_060937';
import * as migration_20260630_081008 from './20260630_081008';
import * as migration_20260630_083004 from './20260630_083004';
import * as migration_20260701_023021 from './20260701_023021';

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
    name: '20260701_023021'
  },
];
