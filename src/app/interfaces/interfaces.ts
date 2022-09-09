/* eslint-disable @typescript-eslint/naming-convention */

export interface AccountInfo {
    pub_key: string;
    balance: number;
}

export interface PrefundedAccountInfo extends AccountInfo {
    index: number;
    priv_key: string;
}

export interface aeDevmodeStartEnvVars {
    AE__SYSTEM__DEV_MODE: true;
    AE__SYSTEM__PLUGINS: string;
    AE__CHAIN__DB_PATH: string;
}
