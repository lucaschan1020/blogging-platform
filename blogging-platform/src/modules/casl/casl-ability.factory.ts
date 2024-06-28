import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Blog } from 'src/models';
import { TokenContent } from 'src/types/token-content.type';

export enum AppActions {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type AppSubjects = InferSubjects<typeof Blog | 'all', true>;
export type AppAbility = MongoAbility<[AppActions, AppSubjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: TokenContent) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    can(AppActions.Create, Blog);
    can(AppActions.Read, Blog);
    can(AppActions.Update, Blog, { createdById: user.userId });
    can(AppActions.Delete, Blog, { createdById: user.userId });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<AppSubjects>,
    });
  }
}
