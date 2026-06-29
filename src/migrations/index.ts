import * as migration_20260627_153308 from './20260627_153308';
import * as migration_20260629_072815 from './20260629_072815';

export const migrations = [
  {
    up: migration_20260627_153308.up,
    down: migration_20260627_153308.down,
    name: '20260627_153308',
  },
  {
    up: migration_20260629_072815.up,
    down: migration_20260629_072815.down,
    name: '20260629_072815'
  },
];
