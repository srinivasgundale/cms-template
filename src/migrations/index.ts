import * as migration_20260627_153308 from './20260627_153308';
import * as migration_20260629_082449 from './20260629_082449';
import * as migration_20260630_040426 from './20260630_040426';
import * as migration_20260630_043059 from './20260630_043059';

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
    name: '20260630_043059'
  },
];
