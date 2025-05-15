import Realm, { ObjectSchema } from 'realm';

export class Player extends Realm.Object<Player> {
  _id = new Realm.BSON.ObjectId();
  title!: string;
  description?: string;
  createdAt!: Date;
  isCompleted!: boolean;

  static schema: ObjectSchema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      title: 'string',
      description: 'string?',
      createdAt: 'date',
      isCompleted: 'bool',
    },
  };
}

// export default class Player extends Realm.Object<Player> {
//   static schema: Realm.ObjectSchema  = {
//     name: 'Player',
//     primaryKey: '_id',
//     properties: {
//       _id: 'objectId',
//       name: 'string',
//       solgan: 'string',
//       pic: 'string',
//       avatar: 'string',
//     },
//   };

//   _id = new Realm.BSON.ObjectId();
//   name!: string;
//   solgan?: string;
//   pic?: string;
//   avatar?: string;
// }
