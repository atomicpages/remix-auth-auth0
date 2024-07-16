"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Auth0Strategy: () => Auth0Strategy,
  Auth0StrategyDefaultName: () => Auth0StrategyDefaultName,
  Auth0StrategyDefaultScope: () => Auth0StrategyDefaultScope,
  Auth0StrategyScopeSeperator: () => Auth0StrategyScopeSeperator
});
module.exports = __toCommonJS(src_exports);
var import_remix_auth_oauth2 = require("remix-auth-oauth2");
var Auth0StrategyDefaultName = "auth0";
var Auth0StrategyDefaultScope = "openid profile email";
var Auth0StrategyScopeSeperator = " ";
var Auth0Strategy = class extends import_remix_auth_oauth2.OAuth2Strategy {
  constructor(options, verify) {
    super(
      {
        authorizationEndpoint: `https://${options.domain}/authorize`,
        tokenEndpoint: `https://${options.domain}/oauth/token`,
        tokenRevocationEndpoint: `https://${options.domain}/oauth/revoke`,
        clientId: options.clientID,
        clientSecret: options.clientSecret,
        redirectURI: options.callbackURL
      },
      verify
    );
    this.name = Auth0StrategyDefaultName;
    this.userInfoURL = `https://${options.domain}/userinfo`;
    this.scope = this.getScope(options.scope);
    this.audience = options.audience;
    this.organization = options.organization;
    this.invitation = options.invitation;
    this.connection = options.connection;
    this.fetchProfile = this.scope.join(Auth0StrategyScopeSeperator).includes("openid");
  }
  // Allow users the option to pass a scope string, or typed array
  getScope(scope) {
    if (!scope) {
      return [Auth0StrategyDefaultScope];
    } else if (typeof scope === "string") {
      return scope.split(Auth0StrategyScopeSeperator);
    }
    return scope;
  }
  authorizationParams(params) {
    params.set("scope", this.scope.join(Auth0StrategyScopeSeperator));
    if (this.audience) {
      params.set("audience", this.audience);
    }
    if (this.organization) {
      params.set("organization", this.organization);
    }
    if (this.invitation) {
      params.set("invitation", this.invitation);
    }
    if (this.connection) {
      params.set("connection", this.connection);
    }
    return params;
  }
  async userProfile({
    access_token: accessToken
  }) {
    const profile = {
      provider: Auth0StrategyDefaultName
    };
    if (!this.fetchProfile) {
      return profile;
    }
    const response = await fetch(this.userInfoURL, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const data = await response.json();
    profile._json = data;
    if (data.sub) {
      profile.id = data.sub;
    }
    if (data.name) {
      profile.displayName = data.name;
    }
    if (data.family_name || data.given_name || data.middle_name) {
      profile.name = {};
      if (data.family_name) {
        profile.name.familyName = data.family_name;
      }
      if (data.given_name) {
        profile.name.givenName = data.given_name;
      }
      if (data.middle_name) {
        profile.name.middleName = data.middle_name;
      }
    }
    if (data.email) {
      profile.emails = [{ value: data.email }];
    }
    if (data.picture) {
      profile.photos = [{ value: data.picture }];
    }
    if (data.org_id) {
      profile.organizationId = data.org_id;
    }
    if (data.org_name) {
      profile.organizationName = data.org_name;
    }
    return profile;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Auth0Strategy,
  Auth0StrategyDefaultName,
  Auth0StrategyDefaultScope,
  Auth0StrategyScopeSeperator
});
//# sourceMappingURL=index.js.map