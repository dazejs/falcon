import { Entity, table, autoIncrementPrimaryColumn } from '@dazejs/framework';

@table('apps')
export class AppEntity extends Entity {
  @autoIncrementPrimaryColumn()
  id: number;
}