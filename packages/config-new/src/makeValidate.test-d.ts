import { expectAssignable, expectNotAssignable } from "tsd";

import { Db, Ens, Directories } from "test/schemas";

import type { ProjectConfig } from "./types";
import type { Schema } from "./spec";

import { Validator, makeValidate } from "./makeValidate";

export namespace Environments {
  export namespace SingleSchema {
    // for an unknown config
    declare const config: ProjectConfig<Schema>;

    // construct validator from the single schema validator, then
    // perform validation
    //
    const validate: Validator<Db.Schema> = makeValidate([Db.validate]);

    validate(config);

    // test that validate's type assertions guarantee we can now assign our
    // unknown config to the single schema (but not another schema!)
    expectAssignable<ProjectConfig<Db.Schema>>(config);
    expectNotAssignable<ProjectConfig<Ens.Schema>>(config);
  }

  export namespace DualSchema {
    // for an unknown config
    declare const config: ProjectConfig<Schema>;

    // construct validator from both schema validators, then
    // perform validation
    //
    const validate: Validator<Db.Schema & Ens.Schema> = makeValidate([
      Db.validate,
      Ens.validate
    ]);

    validate(config);

    // test that validate's type assertions guarantee we can now assign our
    // unknown config to either schema individually, or both together.
    expectAssignable<ProjectConfig<Db.Schema>>(config);
    expectAssignable<ProjectConfig<Ens.Schema>>(config);
    expectAssignable<ProjectConfig<Db.Schema & Ens.Schema>>(config);
  }
}

export namespace Properties {
  // for an unknown config
  declare const config: ProjectConfig<Schema>;

  // make validator for directories schema + validate
  //
  const validate: Validator<Directories.Schema> = makeValidate([
    Directories.validate
  ]);

  validate(config);

  // test for assignabilitiy
  expectAssignable<ProjectConfig<Directories.Schema>>(config);
}