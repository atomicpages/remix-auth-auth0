import { OAuth2Profile, OAuth2Strategy, OAuth2StrategyVerifyParams, TokenResponseBody } from 'remix-auth-oauth2';
import { StrategyVerifyCallback } from 'remix-auth';

interface Auth0StrategyOptions {
    domain: string;
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope?: Auth0Scope[] | string;
    audience?: string;
    organization?: string;
    invitation?: string;
    connection?: string;
}
/**
 * @see https://auth0.com/docs/get-started/apis/scopes/openid-connect-scopes#standard-claims
 */
type Auth0Scope = "openid" | "profile" | "email" | string;
interface Auth0Profile extends OAuth2Profile {
    _json?: Auth0UserInfo;
    organizationId?: string;
    organizationName?: string;
}
interface Auth0ExtraParams extends Record<string, unknown> {
    id_token?: string;
    scope: string;
    expires_in: number;
    token_type: "Bearer";
}
interface Auth0UserInfo {
    sub?: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    middle_name?: string;
    nickname?: string;
    preferred_username?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email?: string;
    email_verified?: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    phone_number?: string;
    phone_number_verified?: boolean;
    address?: {
        country?: string;
    };
    updated_at?: string;
    org_id?: string;
    org_name?: string;
}
declare const Auth0StrategyDefaultName = "auth0";
declare const Auth0StrategyDefaultScope: Auth0Scope;
declare const Auth0StrategyScopeSeperator = " ";
declare class Auth0Strategy<User> extends OAuth2Strategy<User, Auth0Profile, Auth0ExtraParams> {
    name: string;
    private userInfoURL;
    private scope;
    private audience?;
    private organization?;
    private invitation?;
    private connection?;
    private fetchProfile;
    constructor(options: Auth0StrategyOptions, verify: StrategyVerifyCallback<User, OAuth2StrategyVerifyParams<Auth0Profile, Auth0ExtraParams>>);
    private getScope;
    protected authorizationParams(params: URLSearchParams): URLSearchParams;
    protected userProfile({ access_token: accessToken, }: TokenResponseBody): Promise<Auth0Profile>;
}

export { type Auth0ExtraParams, type Auth0Profile, type Auth0Scope, Auth0Strategy, Auth0StrategyDefaultName, Auth0StrategyDefaultScope, type Auth0StrategyOptions, Auth0StrategyScopeSeperator };
